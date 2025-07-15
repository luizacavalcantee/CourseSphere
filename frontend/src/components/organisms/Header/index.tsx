'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { Logo } from '@/assets';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-tr from-blue-500 to-primary shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="CourseSphere Logo" width={32} height={32} />
          <h1 className="hidden sm:inline text-xl font-bold text-white">CourseSphere</h1>
        </Link>
        
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-white hidden sm:inline">Olá, {user?.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 text-primary bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className='sm:inline font-medium'>Sair</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
