// 'use client';

// export const dynamic = 'force-dynamic'; //  "Don't try to statically pre-render this page — render it dynamically at runtime. This removes the pre-render error."



// import { useSearchParams } from 'next/navigation'

// export default function Watch() {
//   const videoPrefix = 'https://storage.googleapis.com/demo-processed-videos/';
//   const videoSrc = useSearchParams().get('v');

//   return (
//     <div className='flex flex-col items-center justify-center py-6  space-y-10'>
//       <h1>Watch Page</h1>
//       { <video controls src={videoPrefix + videoSrc}/> }
//     </div>
//   );
// }




'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function VideoPlayer() {
  const videoPrefix = 'https://storage.googleapis.com/demo-processed-videos/';
  const videoSrc = useSearchParams().get('v');

  return (
    <div className='flex flex-col items-center justify-center py-6 space-y-10'>
      <h1>Watch Page</h1>
      {videoSrc && <video controls src={videoPrefix + videoSrc} className="w-full max-w-4xl" />}
    </div>
  );
}

export default function Watch() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-6">Loading...</div>}>
      <VideoPlayer />
    </Suspense>
  );
}
