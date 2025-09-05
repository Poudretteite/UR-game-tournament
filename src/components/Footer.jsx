import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#041539]">
            <div className=" flex flex-wrap items-center justify-center gap-4 pt-5">
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <img
                        src="/src/components/icons/facebook.png"
                        alt="Facebook"
                        className="w-full h-full object-contain rounded-full"
                    />
                </a>
                <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <img 
                        className="w-full h-full object-contain rounded-full"
                        src="/src/components/icons/X.png"
                        alt="Twitter/X"
                    />
                </a>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
                >
                    <img
                        src="/src/components/icons/instagram.png"
                        alt="Instagram"
                        className="w-full h-full object-contain rounded-full"
                    />
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
