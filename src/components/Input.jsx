import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        classname = '',
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className='inline-block mb-1.5 pl-0.5 text-sm font-medium text-slate-600'
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`px-3 py-2.5 rounded-md text-sm
                    bg-white text-slate-900 placeholder:text-slate-400
                    border border-slate-200
                    outline-none
                    transition-colors duration-150
                    hover:border-slate-300
                    focus:border-slate-400 focus:ring-2 focus:ring-slate-100
                    disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
                    w-full ${classname}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;