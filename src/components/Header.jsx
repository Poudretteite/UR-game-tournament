import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row bg-transparent text-[#ffffffaa] items-center justify-between md:sticky top-0 z-50">
            <div className="p-4">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="hidden md:flex h-12 md:h-20 -mb-2 md:my-0 " />
                    <img src={assets.logo_text} alt="logo" className="flex md:hidden h-[8rem] md:h-20 -mb-2 md:my-0 drop-shadow-[0_0_20px_#1952ff]" />
                </Link>
            </div>
            <nav className="flex items-center">
                <Link to="/info" className="items-center text-center h-full py-3 mb-3 md:py-10 text-2xl px-3" >
                    <h3>Dla Uczestników</h3>
                </Link>
                <Link to="/plan" className="items-center h-full py-3 mb-3 md:py-10 text-2xl px-2" >
                    <h3>Drabinki</h3>
                </Link>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="items-center h-full py-3 mb-3 md:py-10 text-2xl px-3" >
                    Regulamin
                </a>
            </nav>
        </header>
    );
};

export default Header;
