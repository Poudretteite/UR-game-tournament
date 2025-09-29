import * as React from 'react';
import assets from '../data/assets.json';
import links from '../data/links.json';

const ThankYou = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block z-20 drop-shadow-[0_0_20px_#1952ff]" />
                    <div className='flex flex-col py-10 md:pt-32 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center shadow-[inset_2px_2px_15px_#1952ff]'>
                    <h2 className="text-6xl font-semibold py-3 text-white italic">Dziękujemy za rejestrację!</h2>
                    <h2 className="text-3xl font-semibold text-white">Formularz został wysłany pomyślnie.</h2>
                    <h3 className="text-xl text-white">Potwiedzimy twoje zgłoszenie na podany adres e-mail.</h3>
                </div>
            </main>
        </>
    )
}

export default ThankYou