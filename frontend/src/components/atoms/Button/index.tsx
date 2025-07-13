import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
    const baseClasses =
        'w-full px-4 py-3 font-semibold text-white uppercase rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors';
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};
