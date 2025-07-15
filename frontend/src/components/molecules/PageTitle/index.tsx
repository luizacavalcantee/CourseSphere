'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 w-full mb-6">
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Voltar para a página anterior"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="text-gray-700" />
      </button>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 truncate">
        {title}
      </h1>
    </div>
  );
};