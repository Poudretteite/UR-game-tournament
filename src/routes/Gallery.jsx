import * as React from 'react';
import assets from '../data/assets.json';

const galleryPhotos = import.meta.glob('../components/img/photos/*.{jpg,JPG}', {
    eager: true,
  });

const h3 = "text-4xl font-semibold pb-3";
const h2 = "text-3xl md:text-5xl font-semibold italic text-center pb-5 pt-5";
const span = "text-2xl italic font-normal";

const sponsorsData = [{
        name: 'AMD',
        img: '/img/logos/amd_logo.png',
        alt: 'AMD'
    },
    {
        name: 'CityFit',
        img: '/img/logos/cityfit_logo.png',
        alt: 'CityFit'
    },
    {
        name: 'PCI',
        img: '/img/logos/pci-logo.png',
        alt: 'PCI'
    },
    {
        name: 'Pekao',
        img: '/img/logos/pekao_logo.png',
        alt: 'Pekao'
    },
    {
        name: 'Samsung',
        img: '/img/logos/samsung_logo.png',
        alt: 'Samsung'
    },
    {
        name: 'Uniperks',
        img: '/img/logos/uniperks_logo.png',
        alt: 'Uniperks'
    }
];

const Gallery = () => {
    console.log(galleryPhotos);
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                    <div className='flex flex-col py-5 min-[1250px]:pt-32 pt-10 pb-10 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center text-lg shadow-[inset_2px_2px_15px_#1952ff] text-white'>
                    <div>
                        <h2 className='text-4xl md:text-6xl font-semibold text-center pb-5'>UR Gaming Tournament 2025</h2>
                        <div>
                            <h2 className={h2}>Zwycięzcy</h2>
                            <h3 className={h3}>1. HusariaMielec<br /><span className={span}>2500 zł + 2x Samsung Galaxy Watch 7</span></h3>
                            <h3 className={h3}>2. DosHermanos<br /><span className={span}>1500 zł + 2x Samsung Galaxy Watch 7</span></h3>
                            <h3 className={h3}>3. MyTuPoSiano<br /><span className={span}>1000 zł + Samsung Galaxy Watch 7 + Samsung Galaxy Fit 3</span></h3>
                            <h3 className={h3}>4. Copacabanos<br /><span className={span}>2x zegarki Samsung Galaxy Fit 3</span></h3>
                            <h3 className={h3}>5. GUDLAK<br /><span className={span}>2x zegarki Samsung Galaxy Fit 3</span></h3>
                        </div>
                        <section className='md:p-10'>
                            <h3 className={h3}>Drabinka górna</h3>
                            <img src="./img/drabinki_gorne.png" alt="drabinki_gorne" />
                        </section>
                        <section className='md:p-10'>
                            <h3 className={h3}>Drabinka przegranych</h3>
                            <img src="./img/drabinki_dolne.png" alt="drabinki_dolne" />
                        </section>
                        <div>
                            <h2 className={h2}>Galeria zdjęć</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {Object.values(galleryPhotos).map((img, i) => (
                                    <img className='border-double border-[#1952ff] border-4' key={i} src={img.default} alt={`photo-${i}`} />
                                ))}
                            </div> 
                        </div>
                        <div>
                            <h2 className={h2}>Partnerzy 2025</h2>
                            <div className="flex flex-wrap gap-14 items-center justify-center ">
                                {sponsorsData.map(({ name, img, alt }) => (
                                <div key={name}>
                                    <img style={{ maxHeight: '130px', maxWidth: '200px' }} src={img} alt={alt} />
                                </div>
                            ))}
                            <div>
                                <img style={{ maxHeight: '140px', maxWidth: '200px', margin: '2px'}} src="/img/logos/actina_logo.png" alt="actina" /> <hr />
                                <img style={{ maxHeight: '140px', maxWidth: '200px', margin: '2px'}} src="/img/logos/amd_logo.png" alt="AMD" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden min-[1250px]:block drop-shadow-[0_0_20px_#1952ff]" />
            </main>
        </>
    )
}

export default Gallery