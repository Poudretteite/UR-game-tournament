import * as React from 'react';
import assets from '../data/assets.json';
import { BsTelephoneFill } from "react-icons/bs";
import { BsEnvelopeAt } from "react-icons/bs";

const Contact = () => {
    return (
        <>  
            <main className='max-w-4xl mx-auto'>
                <div className='flex flex-col w-full py-10 min-[1250px]:pt-40 pt-20 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center text-lg shadow-[inset_2px_2px_15px_#1952ff] text-white'>
                    <div className='flex flex-col'>
                        <h2 className="text-5xl font-bold text-[#1952ff]">Tomasz Knapik</h2>
                        <h3 className="text-xl font-semibold italic">Koordynator główny GAMEX TOURNAMENT</h3>
                        <div className="flex flex-col items-center py-5">
                            <div className="flex items-center gap-5">
                                <BsTelephoneFill /> 880 398 501</div>
                            <div className="flex items-center gap-5">
                                <BsEnvelopeAt /> tomasz.knapik@urz.pl</div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-5xl font-bold text-[#1952ff]">Dominika Dymon</h2>
                        <h3 className="text-xl font-semibold italic">Koordynator ds. Kontaktów Zewnętrznych</h3>
                        <div className="flex flex-col items-center py-5">
                            <div className="flex items-center gap-5">
                                <BsTelephoneFill /> 602 401 216
                            </div>
                            <div className="flex items-center gap-5">
                                <BsEnvelopeAt /> dominika.dymon@urz.pl</div>
                        </div>
                    </div>
                </div>
                <img 
                    src={assets.logo_text} 
                    alt="logo" 
                    className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden min-[1250px]:block drop-shadow-[0_0_20px_#022db0]" />
            </main>
        </>
    )
}

export default Contact