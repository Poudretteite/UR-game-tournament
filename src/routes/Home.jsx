import * as React from 'react';
import TwitchEmbed from '../components/TwitchEmbed';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';

const h2 = "text-4xl font-semibold text-[#0033a0]";

const Home = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto tracking-widest text-white'>
            <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block z-20" />
            <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.5}
            thickness={2}
            style={{ borderRadius: 16 }}
            className="-z-10"
            >
                <div className="flex flex-col pt-32 text-center space-y-6 p-6 h-a bg-black shadow-lg shadow-black/50 bg-opacity-50 rounded">
                    <h1 className="text-5xl font-semibold ">Ogólnopolski Turniej<br />E-Sportowy</h1>
                    <h2  className={h2}>Zapisy</h2>
                    <h3 className="text-3xl font-semibold ">Zapisy x - x.09.2025</h3>
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-4xl">
                        <TwitchEmbed />
                        </div>
                    </div>
                </div>
                </ElectricBorder>
            </main>
            <Sponsors />
        </>
    )
}

export default Home