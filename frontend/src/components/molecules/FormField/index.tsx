import { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export const FormField = ({ label, icon, id, ...props }: FormFieldProps) => {
  return (
    <div className="relative">
      <Label htmlFor={id}>{label}</Label>
      {icon && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <Input id={id} {...props} />
    </div>
  );
};