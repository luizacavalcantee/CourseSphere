import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
}

export const Button = ({
    children,
    className,
    variant = 'primary',
    ...props
}: ButtonProps) => {
    const baseClasses =
        'w-full px-4 py-3 font-semibold uppercase rounded-md focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primaryHover',
        secondary:
            'border-2 border-primary bg-white hover:bg-gray-100 text-primary',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};