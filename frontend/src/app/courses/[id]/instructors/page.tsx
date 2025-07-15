"use client";

import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import { fetcher } from "@/lib/fetcher";
import { useCourseInstructors } from "@/hooks/useCourseInstructors";
import type { NewInstructorData } from "@/components/organisms/CreateInstructorForm";
import { PageTitle } from "@/components/molecules/PageTitle";
import { Modal } from "@/components/molecules/Modal";
import { AlertTriangle } from "lucide-react";
import InstructorList from "@/components/organisms/InstructorList";
import AddInstructorSection from "@/components/organisms/AddInstructorSection";
import CreateInstructorForm from "@/components/organisms/CreateInstructorForm";

interface RandomUser {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

interface RandomUserResponse {
  results: RandomUser[];
}

export default function ManageInstructorsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: courseId } = params;
  const { user: loggedInUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    course,
    currentInstructors,
    error: courseDataError,
    isLoading: isCourseDataLoading,
    isCreator,
    isSubmitting,
    createAndAddInstructor,
    handleRemoveInstructor,
  } = useCourseInstructors(courseId);

  const {
    data: suggestions,
    error: suggestionsError,
    mutate: mutateSuggestions,
  } = useSWR<RandomUserResponse>(
    "https://randomuser.me/api/?results=4&nat=us,br,fr,gb",
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleAddSuggestedInstructor = async (suggestedUser: RandomUser) => {
    const success = await createAndAddInstructor({
      name: `${suggestedUser.name.first} ${suggestedUser.name.last}`,
      email: suggestedUser.email,
      password: "password123",
    });

    if (success) {
      mutateSuggestions(
        (currentData) => ({
          ...currentData!,
          results: currentData!.results.filter(
            (s) => s.login.uuid !== suggestedUser.login.uuid
          ),
        }),
        false
      );
    }
  };

  const handleFormSubmit = async (data: NewInstructorData) => {
    const success = await createAndAddInstructor(data);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  if (courseDataError) return <p>Erro ao carregar os dados do curso.</p>;
  if (!loggedInUser) return <p>Faça login para continuar.</p>;

  if (!isCourseDataLoading && !isCreator) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
        <h2 className="mt-4 text-xl font-semibold text-red-800">
          Acesso Negado
        </h2>
        <p className="mt-2 text-red-700">
          Apenas o criador do curso pode gerenciar os instrutores.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
        <PageTitle title={`Gerenciar Instrutores: ${course?.name || "Carregando..."}`} />

        <InstructorList
          instructors={currentInstructors}
          onRemove={handleRemoveInstructor}
          isLoading={isCourseDataLoading}
          isSubmitting={isSubmitting}
        />

        <AddInstructorSection
          suggestions={suggestions?.results}
          suggestionsError={suggestionsError}
          isSubmitting={isSubmitting}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onRefreshSuggestions={mutateSuggestions}
          onAddSuggested={handleAddSuggestedInstructor}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Instrutor Manualmente"
      >
        <CreateInstructorForm
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </>
  );
}
