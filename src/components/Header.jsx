import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row bg-transparent text-black items-center justify-between md:sticky top-0">
            <div className="p-4">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="hidden md:flex h-12 md:h-20 w-auto -mb-2 md:my-0" />
                    <img src={assets.logo_text} alt="logo" className="flex md:hidden h-[8rem] md:h-20 w-auto -mb-2 md:my-0" />
                </Link>
            </div>
            <nav className="flex items-center">
                <Link to="/rejestracja" className="items-center py-3 mb-5 md:py-5 px-10 text-2xl border border-black" >
                    Rejestracja
                </Link>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="items-center h-full py-3 mb-3 md:py-10 px-10 text-2xl" >
                    Regulamin
                </a>
            </nav>
        </header>
    );
};

export default Header;
