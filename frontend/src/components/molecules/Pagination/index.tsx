import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange } : PaginationProps) {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const baseButtonClasses = "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors";
    const arrowButtonClasses = `${baseButtonClasses} text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-300 disabled:pointer-events-none`;
    
    const numberButtonClasses = (page: number) => `
        ${baseButtonClasses}
        ${currentPage === page
            ? 'bg-blue-100 text-blue-600 font-bold pointer-events-none'
            : 'text-zinc-700 hover:bg-zinc-200'
        }
    `;

    return (
        <nav className="flex items-center justify-center gap-3">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={arrowButtonClasses}
                aria-label="Ir para a página anterior"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {currentPage > 1 && (
                <button onClick={() => handlePageClick(currentPage - 1)} className={numberButtonClasses(currentPage - 1)}>
                    {currentPage - 1}
                </button>
            )}

            <button onClick={() => handlePageClick(currentPage)} className={numberButtonClasses(currentPage)}>
                {currentPage}
            </button>

            {currentPage < totalPages && (
                <button onClick={() => handlePageClick(currentPage + 1)} className={numberButtonClasses(currentPage + 1)}>
                    {currentPage + 1}
                </button>
            )}

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={arrowButtonClasses}
                aria-label="Ir para a próxima página"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </nav>
    );
};
