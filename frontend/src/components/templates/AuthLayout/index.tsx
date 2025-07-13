import Image from 'next/image';
import { LoginBackground } from '@/assets';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center w-full p-8 md:w-1/2 lg:w-2/5 xl:w-1/3">
        {children}
      </div>
      <div
        className="hidden bg-cover bg-center md:block md:w-1/2 lg:w-3/5 xl:w-2/3"
        style={{ backgroundImage: `url(${LoginBackground.src})` }}
      />
    </div>
  );
};