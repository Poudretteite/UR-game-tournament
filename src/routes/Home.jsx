import * as React from 'react';
import assets from '../data/assets.json';
import Sponsors from '../components/Sponsors';
import ElectricBorder from '../components/ui/shadcn-io/electricBorder/electric-border';
import CountUp from '../components/ui/shadcn-io/countUp/count-up';
import TwitchEmbed from '../components/TwitchEmbed';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitch } from "react-icons/bs";

const h2 = "text-5xl font-semibold text-[#0443cc] italic";
const h3 = "text-4xl font-semibold pb-3";
const span = "text-2xl italic font-normal";
const title = 'text-5xl font-bold text-[#0443cc] uppercase pt-5';

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
                <div className="flex flex-col py-10 min-[800px]:pt-44 text-center space-y-6 p-6 h-a bg-black shadow-lg shadow-gray-700/50 bg-opacity-30 rounded-2xl">
                    <p className='text-5xl md:text-6xl font-bold'>ogólnopolski turniej e-sportowy Counter-Strike 2</p>
                    <section className='text-xl font-thin'>
                        GameX ToURnament to ogólnopolski turniej e-sportowy organizowany przez Samorząd Studentów Uniwersytetu Rzeszowskiego. Wydarzenie skierowane jest do wszystkich 
                        miłośników rywalizacji w Counter-Strike 2, którzy chcą zmierzyć się z najlepszymi drużynami z całej Polski i powalczyć o zwycięstwo w prestiżowych rozgrywkach. <br />
                        Turniej składa się z kilku etapów. Po zakończeniu zapisów uczestnicy wezmą udział w internetowych eliminacjach, które wyłonią najlepsze zespoły awansujące do fazy 
                        finałowej. Najważniejsze mecze turnieju zostaną rozegrane podczas wydarzenia stacjonarnego.
                    </section>
                    <p className={title}>Harmonogram</p>
                    <section className='pl-10 text-4xl'>
                        <p><span className='font-bold'>17 sierpnia – 13 września</span> <br /> <span className='font-thin'>zapisy drużyn,</span></p>
                        <p><span className='font-bold'>21 września – 30 października</span> <br /> <span className='font-thin'>eliminacje online,</span></p>
                        <p><span className='font-bold'>20–21 listopada</span> <br /> <span className='font-thin'>ćwierćfinały oraz wielki finał turnieju.</span></p>
                    </section>
                    <p className={title}>Miejsce finałów</p>
                    <section className='text-xl font-thin'>
                        Finałowa część GameX ToURnament odbędzie się w <span className='font-bold'>Podkarpackim Centrum Innowacji w Rzeszowie</span>, gdzie najlepsze drużyny wyłonione podczas 
                        eliminacji zmierzą się w walce o tytuł mistrza turnieju. To właśnie tutaj rozegrane zostaną ćwierćfinały oraz finał wydarzenia w obecności publiczności.
                    </section>
                    <p className={title}>Transmisja</p>
                    <section className='text-xl font-thin'>
                        Najważniejsze spotkania turnieju będą transmitowane na żywo na platformie Twitch. 
                        Dzięki temu rozgrywki będzie można śledzić zarówno na miejscu, jak i online, kibicując najlepszym drużynom z całej Polski.
                    </section>
                    <p className={title}>Dołącz do rywalizacji!</p>
                    <section className='text-xl font-thin'>
                        Zbierz swoją drużynę, zgłoś się do turnieju i zmierz się z najlepszymi zespołami w Polsce. 
                        Czekają na Was emocjonujące mecze, sportowa rywalizacja oraz finał w Podkarpackim Centrum Innowacji w Rzeszowie.
                    </section>
                    <section className='text-xl font-thin'>
                        Szczegółowe informacje dotyczące regulaminu, zapisów, harmonogramu rozgrywek, puli nagród oraz atrakcji towarzyszących zostaną opublikowane już wkrótce. 
                        Śledź stronę wydarzenia oraz nasze media społecznościowe, aby być na bieżąco i nie przegapić żadnych aktualności.
                    </section>
                    <div className=" flex flex-wrap items-center justify-center gap-4">
                                    <a
                                        href=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                                    >
                                        <BsTwitch className='text-white text-3xl'/>
                                    </a>
                                    <a
                                        href=""
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                                    >
                                        <BsFacebook className='text-white text-3xl'/>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/samorzad.ur"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                                    >
                                        <BsInstagram className='text-white text-3xl'/>
                                    </a>
                                </div>
                </div>
                </ElectricBorder>
                <img 
                    src={assets.logo_text} 
                    alt="logo" 
                    className="absolute top-16 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden min-[800px]:block drop-shadow-[0_0_20px_#022db0]" />
            </main>
            <Sponsors />
        </>
    )
}

export default Home