import {  httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { functions } from './firebase';

// Define a minimal type that matches what the tutorial expects
interface UploadUrlResponse {
  url: string;
  [key: string]: unknown; // Allow other properties but ensure url exists
}



const generateUploadUrlFunction = httpsCallable<
  { fileExtension: string | undefined }, 
  UploadUrlResponse
>(functions, 'generateUploadUrl');

const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

export async function uploadVideo(file: File): Promise<Response> {
  const response: HttpsCallableResult<UploadUrlResponse> = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop()
  });

  // Upload the file to the signed URL
  const uploadResult = await fetch(response.data.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return uploadResult;
}


export async function getVideos() {
  const response = await getVideosFunction();
  return response.data as Video[];
}