import * as React from 'react';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import CountUp from '../components/ui/shadcn-io/countUp/count-up';
import TwitchEmbed from '../components/TwitchEmbed';

const h2 = "text-5xl font-semibold text-[#0443cc] italic";
const h3 = "text-3xl font-semibold";

const Home = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto tracking-widest text-white'>
            <ElectricBorder
            color="#1952ff"
            speed={0.5}
            chaos={2}
            thickness={2}
            style={{ borderRadius: 16 }}
            className='z-auto'
            >
                <div className="flex flex-col py-10 lg:pt-32 text-center space-y-6 p-6 h-a bg-black shadow-lg shadow-gray-700/50 bg-opacity-30 rounded-2xl">
                    <p className='text-5xl md:text-6xl font-bold'>Ogólnopolski Turniej<br />E-Sportowy</p>
                    <section>
                        <h2 className={h2}>Finał - LAN</h2>
                        <h3 className={h3}>12 Listopada</h3>
                        <h3 className={h3}>Zen.com Expo 8:00 - 16:00</h3>
                        <h3 className={h3}>Wszystkie informacje o festiwalu: 
                            <br /><a href='https://infopack.pfni.pl' className='underline' target='blank'>PFNI Infopack</a>
                        </h3>
                    </section>
                    <section className='outline-double outline-[#1952ffaa] outline-4'>
                        <TwitchEmbed />
                    </section>
                    <section>
                        <h2 className={h2}>Nagrody</h2>
                        <h3 className="text-2xl font-semibold pb-2 pt-5">I Miejsce</h3>
                        <CountUp
                            from={0}
                            to={2500}
                            separator=","
                            direction="up"
                            duration={0.02}
                            className="text-5xl font-semibold"
                        />&nbsp;ZŁ
                        <h3 className="text-2xl font-semibold pb-2 pt-5">II Miejsce</h3>
                        <CountUp
                            from={0}
                            to={1500}
                            separator=","
                            direction="up"
                            duration={0.02}
                            className="text-5xl font-semibold"
                        />&nbsp;ZŁ
                        <h3 className="text-2xl font-semibold pb-2 pt-5">III Miejsce</h3>
                        <CountUp
                            from={0}
                            to={1000}
                            separator=","
                            direction="up"
                            duration={0.02}
                            className="text-5xl font-semibold"
                        />&nbsp;ZŁ
                        <h3 className="text-2xl pb-2 pt-5">+ Łączna wartość nagród rzeczowych w wyskości 5 000 zł.</h3>
                    </section>
                </div>
                </ElectricBorder>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden lg:block drop-shadow-[0_0_20px_#1952ff]" />
            </main>
            <Sponsors />
        </>
    )
}

export default Home