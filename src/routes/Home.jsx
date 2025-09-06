import * as React from 'react';
import TwitchEmbed from '../components/TwitchEmbed';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import FuzzyText from '../components/ui/shadcn-io/fuzzyText/fuzzy-text';
import CountUp from '../components/ui/shadcn-io/CountUp/count-up';

const h2 = "text-4xl font-semibold text-[#57aeb2] italic";
const h3 = "text-3xl font-semibold";

const Home = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto tracking-widest text-white'>
            <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block z-20 drop-shadow-[0_0_20px_#57aeb2aa]" />
            <ElectricBorder
            color="#7df9ff"
            speed={0.5}
            chaos={1.2}
            thickness={2}
            style={{ borderRadius: 16 }}
            className="-z-10"
            >
                <div className="flex flex-col py-10 md:pt-32 text-center space-y-6 p-6 h-a bg-black shadow-lg shadow-black/50 bg-opacity-30 rounded-2xl">
                    <FuzzyText fontFamily='League Spartan'>Ogólnopolski Turniej E-Sportowy</FuzzyText>
                    <section>
                        <h2 className={h2}>Zapisy</h2>
                        <h3 className={h3}>8 - 25.09.2025</h3>
                    </section>
                    <section>
                        <h2 className={h2}>Pula nagród</h2>
                        <CountUp
                            from={0}
                            to={10000}
                            separator=","
                            direction="up"
                            duration={0.08}
                            className="count-up-text text-5xl font-semibold"
                        />&nbsp;ZŁ
                    </section>
                    <section>
                        <h2 className={h2}>Kwalifikacje</h2>
                        <h3 className={h3}>3 - 26.10.2025</h3>
                    </section>
                    <section>
                        <h2 className={h2}>Finał</h2>
                        <h3 className={h3}>12 Listopada</h3>
                    </section>
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-4xl hidden">
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