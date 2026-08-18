import React from 'react'

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-slate-900',
    textColor = 'text-white',
    classname = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2.5 rounded-md font-medium text-sm
                ${bgColor} ${textColor}
                transition-colors duration-150
                hover:bg-slate-800
                active:bg-slate-950
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${classname}`}
            {...props}
        >
            {children}
        </button>
    );
}