import { AuthProvider } from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CourseSphere',
  description: 'Desafio prático',
  icons: {
    icon: [
      {
        url: '/icons/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}