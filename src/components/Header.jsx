import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';

const Header = () => {
    return (
        <header className="flex flex-col min-[800px]:flex-row bg-transparent text-[#ffffff] font-light items-center md:sticky top-0 z-20">
            <div className="p-4">
                <Link to="/">
                    <picture>
                        <source media="(min-width: 800px)" srcSet={assets.logo} />
                        <img 
                            src={assets.logo_text} 
                            alt="Logo turnieju" 
                            fetchPriority="high"
                            className="min-[800px]:h-20 -mb-2 lg:my-0 drop-shadow-[0_0_20px_#1952ff] min-[800px]:drop-shadow-none" 
                        />
                    </picture>
                </Link>
            </div>
            
            <nav className="flex w-full min-[800px]:w-auto items-center justify-center min-[800px]:justify-between min-[800px]:flex-1 min-[800px]:-mt-10 h-auto min-[800px]:h-20 text-base min-[400px]:text-lg sm:text-xl min-[800px]:text-2xl flex-wrap gap-2 sm:gap-4 px-2">
                <Link to="/rejestracja" className="font-bold py-2 px-2 sm:px-4 min-[800px]:text-3xl hover:text-blue-400 transition-colors">
                    Rejestracja
                </Link>
                <span aria-hidden="true" className="text-gray-500 select-none min-[800px]:hidden">|</span>
                
                <div className="flex items-center gap-2 sm:gap-4 min-[800px]:gap-6 min-[800px]:ml-auto">
                    <Link to="/gallery" className="py-2 px-2 sm:px-3 hover:text-blue-400 transition-colors">
                        <span>Archiwum</span>
                    </Link>
                    <span aria-hidden="true" className="text-gray-500 select-none min-[800px]:hidden">|</span>
                    <Link to="/contact" className="py-2 px-2 sm:px-3 hover:text-blue-400 transition-colors">
                        <span>Kontakt</span>
                    </Link>
                    <span aria-hidden="true" className="text-gray-500 select-none min-[800px]:hidden">|</span>
                    <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="py-2 px-2 sm:px-3 hover:text-blue-400 transition-colors">
                        <span>Regulamin</span>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
