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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Adicionar Novos Instrutores</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={onOpenCreateModal}
            disabled={isSubmitting}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Criar Manualmente
          </Button>
          <Button
            variant="secondary"
            onClick={onRefreshSuggestions}
            disabled={isSubmitting || !suggestions}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Novas Sugestões
          </Button>
        </div>
      </div>
      {suggestionsError ? (
        <p className="text-red-500">Não foi possível carregar sugestões.</p>
      ) : !suggestions ? (
        <p>Carregando sugestões...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
