import { SelectHTMLAttributes, forwardRef, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...props }, ref) => {
        const baseClasses =
            'w-full pt-4 pb-2 min-h-[52px] bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors';

        const combinedClasses = `${baseClasses} ${className}`;

        return (
            <select className={combinedClasses} ref={ref} {...props}>
                {children}
            </select>
        );
    }
);

Select.displayName = 'Select';
