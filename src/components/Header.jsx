import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';

const Header = () => {
    return (
        <header className="flex flex-col lg:flex-row bg-transparent text-[#ffffffaa] items-center justify-between md:sticky top-0 z-20">
            <div className="p-4">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="hidden lg:flex h-12 lg:h-20 -mb-2 lg:my-0" />
                    <img src={assets.logo_text} alt="logo" className="flex lg:hidden h-[10rem] lg:h-[8rem] -mb-2 lg:my-0 drop-shadow-[0_0_20px_#1952ff]" />
                </Link>
            </div>
            <nav className="flex items-center">
                <Link to="/info" className="items-center text-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Dla Uczestników</h3>
                </Link>
                <Link to="/plan" className="items-center h-full py-3 mb-3 text-2xl px-2" >
                    <h3>Drabinki</h3>
                </Link>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="items-center h-full py-3 mb-3 text-2xl px-3" >
                    <h3>Regulamin</h3>
                </a>
            </nav>
        </header>
    );
};

export default Header;
