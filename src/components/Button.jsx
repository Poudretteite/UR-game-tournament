import React from 'react';
import { Link } from 'react-router-dom';


function Button(props) {
    const { route, type, children } = props;

    if (type === 'submit') {
        return (
            <div className="flex justify-center items-center text-xl font-bold">
                <button
                    type="submit"
                    className="block border px-10 py-3"
                >
                    {children}
                </button>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center">
                <Link
                    to={route}
                    className="flex justify-center items-center w-fit rounded-[10px] bg-[var(--main-color)] text-white font-[Montserrat-SemiBold] px-6 py-2 uppercase transition-all hover:bg-[var(--main-color)] hover:text-white focus:bg-[var(--main-color)] focus:text-white"
                >
                    {children}
                </Link>
            </div>
        );
    }
}

export default Button;