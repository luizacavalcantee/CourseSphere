"use client";

import { useState } from "react";
import useSWR from "swr";

import type { User } from "@/types";
import { NewInstructorData } from "@/components/organisms/CreateInstructorForm";
import { useAuth } from "@/contexts/AuthContext";
import { fetcher } from "@/lib/fetcher";
import { useCourseInstructors } from "@/hooks/useCourseInstructors";

import { PageTitle } from "@/components/molecules/PageTitle";
import { Modal } from "@/components/molecules/Modal";
import { AlertTriangle } from "lucide-react";
import InstructorList from "@/components/organisms/InstructorList";
import AddInstructorSection from "@/components/organisms/AddInstructorSection";
import CreateInstructorForm from "@/components/organisms/CreateInstructorForm";
import { Button } from "@/components/atoms/Button";

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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [instructorToRemove, setInstructorToRemove] = useState<User | null>(
    null
  );

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

  const handleOpenConfirmModal = (instructor: User) => {
    setInstructorToRemove(instructor);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setInstructorToRemove(null);
  };

  const handleConfirmRemove = async () => {
    if (instructorToRemove) {
      await handleRemoveInstructor(instructorToRemove.id);
      handleCloseConfirmModal();
    }
  };

  if (courseDataError)
    return <div className="text-center p-8">Erro ao carregar os dados.</div>;
  if (isCourseDataLoading)
    return <div className="text-center p-8">Carregando...</div>;
  if (!loggedInUser)
    return <div className="text-center p-8">Faça login para continuar.</div>;

  if (!isCreator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center p-6 sm:p-8 bg-red-50 rounded-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-4 text-lg sm:text-xl font-semibold text-red-800">
            Acesso Negado
          </h2>
          <p className="mt-2 text-sm sm:text-base text-red-700">
            Apenas o criador do curso pode gerenciar os instrutores.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg space-y-6 md:space-y-8">
          <PageTitle title={`Gerenciar Instrutores: ${course?.name || ""}`} />

          <InstructorList
            instructors={currentInstructors}
            onRemove={handleOpenConfirmModal}
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
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Instrutor"
      >
        <CreateInstructorForm
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        title="Confirmar Remoção"
      >
        {instructorToRemove && (
          <div className="space-y-4">
            <p>
              Você tem certeza que deseja remover o instrutor{" "}
              <strong className="font-semibold">
                {instructorToRemove.name}
              </strong>
              ?
            </p>
            <p className="text-sm text-gray-600">
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                className="border-2 border-red-700 text-red-700"
                onClick={handleCloseConfirmModal}
              >
                Cancelar
              </Button>
              <Button
                variant="red"
                onClick={handleConfirmRemove}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Removendo..." : "Confirmar"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
