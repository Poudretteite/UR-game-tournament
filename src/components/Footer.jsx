import React from 'react';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitch } from "react-icons/bs";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a1b3e]">
            <div className=" flex flex-wrap items-center justify-center gap-4 pt-5">
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitch"
                    className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <BsTwitch className='text-white text-3xl'/>
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <BsFacebook className='text-white text-3xl'/>
                </a>
                <a
                    href="https://www.instagram.com/samorzad.ur"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Samorządu Studentów UR"
                    className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <BsInstagram className='text-white text-3xl'/>
                </a>
            </div>
            <div className=" flex flex-col items-center justify-center text-center p-5">
                <p className="uppercase font-sans text-center text-sm lg:text-base font-semibold text-white">
                    UR Gaming ToURnament&nbsp;© {currentYear}
                    <span className="block lg:inline "> Samorząd Studentów UR</span>
                </p>
                <div className="text-xs text-gray-400 mt-1 font-sans">
                    <a 
                        href="https://www.ur.edu.pl/pl/deklaracja-dostepnosci-cyfrowej" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="underline hover:text-white transition-colors"
                    >
                        Deklaracja dostępności
                    </a>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2 max-w-xl px-4 font-sans">
                    Ten turniej nie jest powiązany ani sponsorowany przez Valve Corporation. / This competition is not affiliated with or sponsored by Valve Corporation.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
