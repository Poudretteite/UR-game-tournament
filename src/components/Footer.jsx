import React from 'react';
import { BsTwitch } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a1b3e]">
            <div className=" flex flex-wrap items-center justify-center gap-4 pt-5">
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <BsFacebook className='text-white text-3xl'/>
                </a>
                <a
                    href="https://www.twitch.tv/urgamingtournament"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <BsTwitch className='text-white text-3xl'/>
                </a>
                <a
                    href="https://www.instagram.com/urgamingtournament"
                    target="_blank"
                    rel="noopener noreferrer"
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
            </div>
        </footer>
    );
};

export default Footer;
