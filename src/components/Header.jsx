import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';
import ShinyText from './ui/shadcn-io/shinyText/shiny-text';

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
            
            <nav className="flex w-full min-[800px]:w-auto justify-between min-[800px]:flex-1 h-20 h-full text-2xl">
                {/* <Link to="/info" className=" py-3 mb-3 px-3" >
                    <h3>Dla Uczestników</h3>
                </Link> 
                <p className="py-3 min-[800px]:hidden" >
                    |
                </p>*/}
                <Link to="/rejestracja" className="font-bold py-3 min-[800px]:text-3xl px-5 min-[800px]:grow" >
                    Rejestracja
                </Link>
                <p className="py-3 min-[800px]:hidden" >
                    |
                </p>
                {/* <Link to="/plan" className=" py-3 mb-3 px-2" >
                    <h3>Drabinki</h3>
                </Link> 
                <p className="py-3 min-[800px]:hidden" >
                    |
                </p>*/}
                <Link to="/gallery" className=" py-3 px-3" >
                    <h3>Archiwum</h3>
                </Link>
                <p className="py-3 min-[800px]:hidden" >
                    |
                </p>
                <Link to="/contact" className=" py-3 px-3" >
                    <h3>Kontakt</h3>
                </Link>
                <p className="py-3 min-[800px]:hidden" >
                    |
                </p>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="py-3 px-3" >
                    <h3>Regulamin</h3>
                </a>
            </nav>
        </header>
    );
};

export default Header;
