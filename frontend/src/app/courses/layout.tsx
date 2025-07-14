'use client';

import { Header } from '@/components/organisms/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Carregando...
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    );
}
