import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ className, ...props }: TextareaProps) => {
  const baseClasses =
    'w-full pt-4 pb-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-colors';

  const combinedClasses = `${baseClasses} ${className}`;

  return <textarea className={combinedClasses} {...props} />;
};