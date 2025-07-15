"use client";

import type { User } from "@/types";
import InstructorListItem from "@/components/molecules/InstructorListItem";

interface InstructorListProps {
  instructors: User[];
  onRemove: (id: string) => void;
  isLoading: boolean;
  isSubmitting: boolean;
}

export default function InstructorList({
  instructors,
  onRemove,
  isLoading,
  isSubmitting,
}: InstructorListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Equipe de Instrutores</h2>
      {isLoading ? (
        <p>Carregando...</p>
      ) : instructors.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {instructors.map((instructor) => (
            <InstructorListItem
              key={instructor.id}
              instructor={instructor}
              onRemove={onRemove}
              disabled={isSubmitting}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Ainda não há instrutores colaboradores neste curso.
        </p>
      )}
    </div>
  );
}