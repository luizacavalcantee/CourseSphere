import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  const baseClasses = "absolute -top-3 left-0 text-sm text-gray-500";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <label className={combinedClasses} {...props}>
      {children}
    </label>
  );
};