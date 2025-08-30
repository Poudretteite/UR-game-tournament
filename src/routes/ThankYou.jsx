import * as React from 'react';
import assets from '../data/assets.json';
import links from '../data/links.json';

const ThankYou = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                <div className="flex flex-col text-center space-y-6 p-6 h-a bg-gray-800">
                    <h2 className="text-5xl font-semibold py-3 text-white italic">Dziękujemy za rejestrację!</h2>
                    <img src={assets.logo} alt="logo" className="my-0 h-[6rem] md:h-[9.5rem] mx-auto" />
                    <h2 className="text-3xl font-semibold text-white">Formularz został wysłany pomyślnie.</h2>
                    <h3 className="text-xl font-semibold text-white">Potwiedzimy twoje zgłoszenie na podany adres e-mail.</h3>
                    <h3 className="text-xl font-semibold text-white">W przypadku problemów z potwierdzeniem zgłoszenia skontaktuj się z nami: {assets.form_email}</h3>
                </div>
            </main>
        </>
    )
}

export default ThankYou