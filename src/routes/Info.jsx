import * as React from 'react';
import assets from '../data/assets.json';

const sec = 'text-white';
const ul = 'list-decimal px-5 md:px-24 text-left space-y-1';
const inside_ul = 'list-disc list-inside';
const h2 = "text-3xl font-semibold text-white py-5";

const Info = () => {
    return (
        <>
            <main className='max-w-4xl mx-auto'>
                <img src={assets.logo_text} alt="logo" className="absolute top-3 left-1/2 -translate-x-1/2 -mb-28 md:h-[13rem] hidden lg:block drop-shadow-[0_0_20px_#1952ff]" />
                    <div className='flex flex-col py-5 lg:pt-32 pb-10 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl text-center text-lg shadow-[inset_2px_2px_15px_#1952ff]'>
                    <h2 className="text-4xl font-semibold pt-3 text-white italic">Informacje o Turnieju.</h2>
                    <section className={sec}>
                        <h2 className={h2}>System rozgrywek</h2>
                        <ul className={ul}>
                            <li>Etap I – Eliminacje online (BO3).</li>
                            <ul className={inside_ul}>
                                <li>Pojedyncza eliminacja.</li>
                                <li>Zwycięzcy awansują do finału.</li>
                            </ul>
                            <li>Etap II – Finał stacjonarny.</li>
                            <ul className={inside_ul}>
                                <li>2 grupy po 8 drużyn.</li>
                                <li>Mecze do półfinałów - BO1, półfinały i finały - BO3.</li>
                            </ul>
                        </ul>
                    </section>
                    <section className={sec}>
                        <h2 className={h2}>Harmonogram</h2>
                        <ul className={ul}>
                            <li><b>8:00 - 8:45</b> Rejestracja zawodników</li>
                            <li><b>9:00 - 9:30</b> Lewa strona drabinki - 1/8</li>
                            <li><b>9:45 - 10:15</b> Prawa strona drabinki - 1/8</li>
                            <li><b>10:30 - 11:00</b> Ćwierćfinały</li>
                            <li><b>11:15 - 11:45</b> Drabinka przegranych</li>
                            <li><b>12:00 - 12:30</b> Ćwierćfinały przegranych</li>
                            <li><b>12:45 - 14:15</b> BO3 półfinały </li>
                            <li><b>14:30 - 16:00</b> BO3 Finały + 3, 4, 5 Miejsce</li>
                            <li><b>16:00 - 16:30</b> Wręczenie nagród</li>
                        </ul>
                    </section>
                    <section className={sec}>
                        <h2 className={h2}>Pula map</h2>
                        <ul className={ul}>
                            <li>Rooftop</li>
                            <li>Overpass</li>
                            <li>Vertigo</li>
                            <li>Nuke</li>
                            <li>Inferno</li>
                        </ul>
                    </section>
                    <section className={sec}>
                        <h2 className={h2}>Pauzy i zasady</h2>
                        <ul className={ul}>
                            <li>3 pauzy taktyczne (1 min każda) + 1 w dogrywce.</li>
                            <li>Dogrywka: <b>MR3, $8000</b>.</li>
                            <li>Banowanie map:</li>
                            <ul className={inside_ul}>
                                <li><b>BO1</b>: BAN, BAN, BAN, BAN, DECIDER.</li>
                                <li><b>BO3</b>: PICK, PICK, BAN, BAN, DECIDER</li>
                            </ul>
                        </ul>
                    </section>
                    <section className={sec}>
                        <h2 className={h2}>Sprzęt i komunikacja</h2>
                        <ul className={ul}>
                            <li>Podczas finału komputery i monitory zapewnia organizator.</li>
                            <li>Na finał gracze przynoszą własne peryferia (myszka, klawiatura, słuchawki itp.).</li>
                            <li>Podczas eliminacji online obowiązkowa obecność drużyny na serwerze Discord.</li>
                            <li>Każdy zawodnik gra na zgłoszonym koncie Steam.</li>
                        </ul>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Info