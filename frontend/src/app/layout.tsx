import type { Metadata } from 'next';

import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'CourseSphere',
  description: 'Desafio prático',
  icons: {
    icon: [
      {
        url: "/icons/icon.png",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}