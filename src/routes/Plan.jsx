import * as React from 'react';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import assets from '../data/assets.json';

const h2 = "text-3xl md:text-5xl font-semibold italic text-center pb-5";

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
                <div className="flex flex-col py-10 lg:pt-32 items-center p-6 bg-black shadow-lg shadow-gray-700/50 bg-opacity-30 rounded-2xl mx-auto">
                    <section className='md:p-10'>
                        <h2 className={h2}>Drabinka rozgrywek</h2>
                        <img src="./img/drabinki_gorne.png" alt="drabinki_gorne" />
                    </section>
                </div>
                </ElectricBorder>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden lg:block drop-shadow-[0_0_20px_#1952ff]" />
            </main>
        </>
    )
}

export default Plan