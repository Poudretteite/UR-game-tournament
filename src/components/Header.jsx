import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';
import ShinyText from './ui/shadcn-io/shinyText/shiny-text';

const Header = () => {
    return (
        <header className="flex flex-col min-[1250px]:flex-row bg-transparent text-[#ffffffaa] items-center justify-between md:sticky top-0 z-20">
            <div className="p-4">
                <Link to="/">
                    <picture>
                        <source media="(min-width: 1250px)" srcSet={assets.logo} />
                        <img 
                            src={assets.logo_text} 
                            alt="Logo turnieju" 
                            fetchPriority="high"
                            className="h-[10rem] min-[1250px]:h-20 -mb-2 lg:my-0 drop-shadow-[0_0_20px_#1952ff] lg:drop-shadow-none" 
                        />
                    </picture>
                </Link>
            </div>
            
            <nav className="flex items-center">
                {/* <Link to="/info" className="items-center text-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Dla Uczestników</h3>
                </Link> */}
                {/* <Link to="/rejestracja" className="items-center py-3 mb-5 md:py-5 px-5 text-2xl border border-white rounded shadow-[inset_1px_3px_6px_#ffffff55]" >
                    Rejestracja
                </Link> */}
                {/* <Link to="/plan" className="items-center h-full py-3 mb-3 text-2xl px-2" >
                    <h3>Drabinki</h3>
                </Link> */}
                <Link to="/gallery" className="items-center text-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Archiwum</h3>
                </Link>
                <Link to="/contact" className="items-center text-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Kontakt</h3>
                </Link>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="items-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Regulamin</h3>
                </a>
            </nav>
        </header>
    );
};

export default Header;
