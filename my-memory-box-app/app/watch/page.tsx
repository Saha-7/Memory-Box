'use client';

import { useSearchParams } from 'next/navigation'

export default function Watch() {
  const videoPrefix = 'https://storage.googleapis.com/demo-processed-videos/';
  const videoSrc = useSearchParams().get('v');

  return (
    <div className='flex flex-col items-center justify-center py-6  space-y-10'>
      <h1>Watch Page</h1>
      { <video controls src={videoPrefix + videoSrc}/> }
    </div>
  );
}
