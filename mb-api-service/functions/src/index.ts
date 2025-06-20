import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { Storage } from "@google-cloud/storage";
import { onCall } from "firebase-functions/v2/https";


initializeApp();
const firestore = getFirestore();
const storage = new Storage();

const rawVideoBucketName = "demo-raw-videos";

const videoCollectionId = "videos";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export const createUser = functions.auth.user().onCreate(async (user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
    createdAt: new Date().toISOString(),
  };

  try {
    await firestore
      .collection("users")
      .doc(user.uid)
      .set(userInfo);

    logger.info(`User created: ${JSON.stringify(userInfo)}`);
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    throw error;
  }
});

export const generateUploadUrl = onCall({ maxInstances: 1 }, async (request) => {
  // Check if the user is authentication
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated.",
    );
  }

  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);

  // Generate a unique filename for upload
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

  // Get a v4 signed URL for uploading file
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return { url, fileName };
});


export const getVideos = onCall({ maxInstances: 1 }, async () => {
  const querySnapshot =
    await firestore.collection(videoCollectionId).limit(10).get();
  return querySnapshot.docs.map((doc) => doc.data());
});


// import * as functions from "firebase-functions";
// import { initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
// import * as logger from "firebase-functions/logger";

// initializeApp();
// const firestore = getFirestore();

// export const createUser = functions.auth.user().onCreate((user) => {
//   const userInfo = {
//     uid: user.uid,
//     email: user.email,
//     photoUrl: user.photoURL,
//   };

//   return firestore
//     .collection("users")
//     .doc(user.uid)
//     .set(userInfo)
//     .then(() => {
//       logger.info(`User created: ${JSON.stringify(userInfo)}`);
//     });
// });
