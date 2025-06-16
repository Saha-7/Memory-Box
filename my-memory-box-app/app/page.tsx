// import styles from './page.module.css'
// import { getVideos } from './firebase/functions'
// import Link from 'next/link';
// import Image from 'next/image';


// export default async function Home() {

//   const videos = await getVideos();
//   console.log('Videos :', videos);

//   return (
//     <main className='m-4 p-4 pt-6 flex '>
//       {
//         videos.map((video)=>(
//           <Link key={video.id} href={`/watch?v=${video.filename}`} className='shadow-lg'>
//             <Image src={'/thumbnail.png'} alt='thumbnail' width={200} height={100} className='rounded' />
//             classname={styles.thumbnail}
//           </Link>
//         ))
//       }
//     </main>
//   )
// }


import { getVideos } from './firebase/functions'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const videos = await getVideos()
  console.log('Videos:', videos)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {videos.map((video) => (
          <Link 
            key={video.id} 
            href={`/watch?v=${video.filename}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                <Image 
                  src="/thumbnail.png" 
                  alt="Video thumbnail" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export const revalidate = 30;