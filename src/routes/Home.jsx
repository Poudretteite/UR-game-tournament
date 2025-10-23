import * as React from 'react';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import CountUp from '../components/ui/shadcn-io/countUp/count-up';

const h2 = "text-5xl font-semibold text-[#0443cc] italic";
const h3 = "text-3xl font-semibold";

const Home = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto tracking-widest text-white'>
            <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block z-20 drop-shadow-[0_0_20px_#1952ffaa]" />
            <ElectricBorder
            color="#1952ff"
            speed={0.5}
            chaos={2}
            thickness={2}
            style={{ borderRadius: 16 }}
            className="-z-10"
            >
                <div className="flex flex-col py-10  md:pt-32 text-center space-y-6 p-6 h-a bg-black shadow-lg shadow-gray-700/50 bg-opacity-30 rounded-2xl">
                    <p className='text-5xl md:text-6xl font-bold'>Ogólnopolski Turniej <br /> E-Sportowy</p>
                    <section>
                        <h2 className="text-4xl font-semibold text-[#0443cc] italic">Rejestracja dobiegła końca.</h2>
                        <h3 className="text-2xl">Do zobaczenia na turnieju! Śledźcie nasze social media, żeby być na bieżąco z najnowszymi informacjami.</h3>
                    </section>
                    <section>
                        <h2 className={h2}>Eliminacje</h2>
                        <h3 className={h3}>24 - 31.10.2025</h3>
                    </section>
                    <section>
                        <h2 className={h2}>Finał - LAN</h2>
                        <h3 className={h3}>12 Listopada</h3>
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
            </main>
            <Sponsors />
        </>
    )
}

export default Home