import * as React from 'react';
import TwitchEmbed from '../components/TwitchEmbed';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';

const Home = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                <div className="flex flex-col text-center space-y-6 p-6 h-a bg-gray-800">
                    <img src={assets.logo} alt="logo" className="my-0 h-[6rem] md:h-[9.5rem] mx-auto hidden md:block" />
                    <h2 className="text-4xl font-semibold text-white">Ogólnopolski Turniej<br />E-Sportowy</h2>
                    <h3 className="text-3xl font-semibold text-white">Zapisy x - x.09.2025</h3>
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-4xl">
                        <TwitchEmbed />
                        </div>
                    </div>
                </div>
            </main>
            <Sponsors />
        </>
    )
}

export default Home