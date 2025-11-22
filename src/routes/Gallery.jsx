import * as React from 'react';
import assets from '../data/assets.json';

const galleryPhotos = import.meta.glob('../components/img/photos/*.{jpg,JPG}', {
    eager: true,
  });

const Gallery = () => {
    console.log(galleryPhotos);
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                    <div className='flex flex-col py-5 lg:pt-32 pb-10 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center text-lg shadow-[inset_2px_2px_15px_#1952ff]'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {Object.values(galleryPhotos).map((img, i) => (
                            <img className='border-double border-[#1952ff] border-4' key={i} src={img.default} alt={`photo-${i}`} />
                        ))}
                    </div> 
                </div>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden lg:block drop-shadow-[0_0_20px_#1952ff]" />
            </main>
        </>
    )
}

export default Gallery