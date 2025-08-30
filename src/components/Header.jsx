import * as React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links.json';
import assets from '../data/assets.json';

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row bg-gray-900 text-white items-center justify-between sticky top-0">
            <div className="p-4">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="h-12 md:h-20 w-auto -mb-2 md:my-0" />
                </Link>
            </div>
            <nav className="flex h-full items-center">
                <Link to="/rejestracja" className="flex items-center h-full py-3 md:py-10 px-10 text-2xl " >
                    Rejestracja
                </Link>
                <a href={links.Rules} target="_blank" rel="noopener noreferrer" className="flex items-center h-full py-3 md:py-10 px-10 text-2xl" >
                    Regulamin
                </a>
            </nav>
        </header>
    );
};

export default Header;
