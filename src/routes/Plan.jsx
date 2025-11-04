import * as React from 'react';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import assets from '../data/assets.json';

const Plan = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto tracking-widest text-white'>
            <ElectricBorder
            color="#1952ff"
            speed={0.5}
            chaos={2}
            thickness={2}
            style={{ borderRadius: 16 }}
            className="-z-10"
            >
                <div className="flex flex-col py-10  md:pt-32 items-center space-y-6 p-6 h-a bg-black shadow-lg shadow-gray-700/50 bg-opacity-30 rounded-2xl mx-auto">
                    <img src="./img/drabinki.png" alt="drabinki" className='w-auto md:w-[600px] py-10' />
                </div>
                </ElectricBorder>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 h-[6rem] md:h-[13rem] hidden md:block drop-shadow-[0_0_20px_#1952ff]" />
            </main>
        </>
    )
}

export default Plan