import React from 'react';
import { Link } from 'react-router-dom';


function Button(props) {
    const { route, type, children, disabled, className, ...rest } = props;

    if (type === 'submit') {
        return (
            <div className="flex justify-center items-center text-xl font-bold">
                <button
                    type="submit"
                    disabled={disabled}
                    className={`block border px-10 py-3 transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'} ${className || ''}`}
                    {...rest}
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
                    className="flex justify-center items-center text-xl font-bold"
                >
                    {children}
                </Link>
            </div>
        );
    }
}

export default Button;