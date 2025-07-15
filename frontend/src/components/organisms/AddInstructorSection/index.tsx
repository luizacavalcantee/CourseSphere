"use client";

import { Button } from "@/components/atoms/Button";
import SuggestedInstructorCard from "@/components/molecules/SuggestedInstructorCard";
import { RefreshCw, UserPlus } from "lucide-react";

interface RandomUser {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

interface AddInstructorSectionProps {
  suggestions?: RandomUser[];
  suggestionsError: any;
  isSubmitting: boolean;
  onOpenCreateModal: () => void;
  onRefreshSuggestions: () => void;
  onAddSuggested: (user: RandomUser) => void;
}

export default function AddInstructorSection({
  suggestions,
  suggestionsError,
  isSubmitting,
  onOpenCreateModal,
  onRefreshSuggestions,
  onAddSuggested,
}: AddInstructorSectionProps) {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Adicionar Novos Instrutores
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={onOpenCreateModal}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Criar Manualmente
          </Button>
          <Button
            variant="secondary"
            onClick={onRefreshSuggestions}
            disabled={isSubmitting || !suggestions}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Novas Sugestões
          </Button>
        </div>
      </div>
      {suggestionsError ? (
        <p className="text-red-500 text-center py-4">
          Não foi possível carregar sugestões.
        </p>
      ) : !suggestions ? (
        <p className="text-center py-4 text-gray-500">Carregando sugestões...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestions.map((s) => (
            <SuggestedInstructorCard
              key={s.login.uuid}
              instructor={s}
              onAdd={onAddSuggested}
              disabled={isSubmitting}
            />
          ))}
        </div>
      )}
    </div>
  );
}