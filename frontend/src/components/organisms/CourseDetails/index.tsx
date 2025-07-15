"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Calendar, User as UserIcon, Trash2, Pencil } from "lucide-react";
import { PageTitle } from "@/components/molecules/PageTitle";
import { LessonList } from "../LessonList";
import { Modal } from "@/components/molecules/Modal";
import { Button } from "@/components/atoms/Button";
import type { Course, User, Lesson } from "@/types";

export const CourseDetails = ({ courseId }: { courseId: string }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: course,
    error: courseError,
    isLoading: courseLoading,
  } = useSWR<Course>(`http://localhost:3001/courses/${courseId}`, fetcher);

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR<User[]>("http://localhost:3001/users", fetcher);

  const isCreator =
    user && course && String(user.id) === String(course.creator_id);

  const handleConfirmDelete = async () => {
    if (!course) return;

    try {
      const lessonsResponse = await fetch(
        `http://localhost:3001/lessons?course_id=${course.id}`
      );
      if (!lessonsResponse.ok) {
        throw new Error("Falha ao buscar as aulas do curso para exclusão.");
      }
      const lessonsToDelete: Lesson[] = await lessonsResponse.json();

      const deleteLessonPromises = lessonsToDelete.map((lesson) =>
        fetch(`http://localhost:3001/lessons/${lesson.id}`, {
          method: "DELETE",
        })
      );

      const lessonDeleteResults = await Promise.all(deleteLessonPromises);

      for (const result of lessonDeleteResults) {
        if (!result.ok) {
          throw new Error("Ocorreu um erro ao excluir uma das aulas.");
        }
      }

      const courseResponse = await fetch(
        `http://localhost:3001/courses/${course.id}`,
        {
          method: "DELETE",
        }
      );

      if (!courseResponse.ok) {
        throw new Error("Falha ao excluir o curso.");
      }

      toast.success("Curso e suas aulas foram excluídos com sucesso!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (courseLoading || usersLoading)
    return <p>Carregando detalhes do curso...</p>;
  if (courseError || usersError) return <p>Falha ao carregar os dados.</p>;
  if (!course || !users) return <p>Curso ou usuários não encontrados.</p>;

  const courseInstructors = users.filter((u) =>
    course.instructors.includes(u.id)
  );

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <PageTitle title={course.name} />

          {isCreator && (
            <div className="flex items-center gap-3 ml-auto">
              <Link href={`/courses/${course.id}/edit`}>
                <Button variant="primary">
                  <Pencil size={16} className="mr-2" />
                  Editar
                </Button>
              </Link>
              <Button onClick={() => setIsDeleteModalOpen(true)} variant="red">
                <Trash2 size={16} className="mr-2" />
                Excluir
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 text-gray-600 mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} /> De {formatDate(course.start_date)} até{" "}
            {formatDate(course.end_date)}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Instrutores</h2>
            {isCreator && (
              <Link
                href={`/courses/${course.id}/instructors`}
                className="text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors"
              >
                GERENCIAR INSTRUTORES
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {courseInstructors.length > 0 ? (
              courseInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium border border-gray-200"
                >
                  {instructor.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Nenhum instrutor atribuído a este curso.
              </p>
            )}
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
          <p>{course.description || "Nenhuma descrição fornecida."}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Aulas do Curso</h2>
          <div className="p-6 bg-background rounded-md">
            <LessonList
              courseId={courseId}
              courseCreatorId={course.creator_id}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
      >
        <p className="text-justify">
          Você tem certeza que deseja excluir o curso "
          <strong>{course.name}</strong>"?
        </p>
        <p className="text-sm text-gray-600 mt-2 text-justify">
          Todas as aulas associadas a este curso também serão perdidas. Esta
          ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="secondary"
            className="border-2 border-red-700 text-red-700"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};
