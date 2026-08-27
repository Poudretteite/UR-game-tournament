import * as React from 'react';
import assets from '../data/assets.json';
import { BsEnvelopeAt } from "react-icons/bs";

const Contact = () => {
    return (
        <>  
            <main className='max-w-4xl mx-auto'>
                <div className='flex flex-col py-10 md:pt-44 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center text-lg shadow-[inset_2px_2px_15px_#1952ff] text-white'>
                    <div className='flex flex-col'>
                        <h2 className="text-5xl font-bold text-[#1952ff]">Tomasz Knapik</h2>
                        <h3 className="text-xl font-semibold italic">Koordynator główny GAMEX TOURNAMENT</h3>
                        <div className="flex flex-col items-center py-5">
                            <a href="mailto:tomasz.knapik@urz.pl" className="flex items-center gap-3 hover:text-blue-400 transition-colors text-xl">
                                <BsEnvelopeAt className="text-2xl" /> tomasz.knapik@urz.pl
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-5xl font-bold text-[#1952ff]">Dominika Dymon</h2>
                        <h3 className="text-xl font-semibold italic">Koordynator ds. Kontaktów Zewnętrznych</h3>
                        <div className="flex flex-col items-center py-5">
                            <a href="mailto:dominika.dymon@urz.pl" className="flex items-center gap-3 hover:text-blue-400 transition-colors text-xl">
                                <BsEnvelopeAt className="text-2xl" /> dominika.dymon@urz.pl
                            </a>
                        </div>
                    </div>
                </div>
                <img 
                    src={assets.logo_text} 
                    alt="logo" 
                    className="absolute top-16 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden min-[800px]:block drop-shadow-[0_0_20px_#022db0]" />
            </main>
        </>
    )
}

export default Contact