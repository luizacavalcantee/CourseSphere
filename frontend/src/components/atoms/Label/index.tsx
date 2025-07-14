import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  const baseClasses = "block text-sm font-medium text-gray-700";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <label className={combinedClasses} {...props}>
      {children}
    </label>
  );
};