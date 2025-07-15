import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const baseClasses =
            'w-full pt-4 pb-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors';

        const combinedClasses = `${baseClasses} ${className}`;

        return <input className={combinedClasses} ref={ref} {...props} />;
    }
);

Input.displayName = 'Input';