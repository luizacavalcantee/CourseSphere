"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Calendar, User as UserIcon } from "lucide-react";
import { PageTitle } from "@/components/molecules/PageTitle";
import { LessonList } from "../LessonList";

interface Course {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  creator_id: number;
  instructors: number[];
}
interface User {
  id: number;
  name: string;
}

export const CourseDetails = ({ courseId }: { courseId: string }) => {
  const { user } = useAuth();

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

  if (courseLoading || usersLoading)
    return <p>Carregando detalhes do curso...</p>;
  if (courseError || usersError) return <p>Falha ao carregar os dados.</p>;
  if (!course) return <p>Curso não encontrado.</p>;

  const instructorNames = users
    ?.filter((u) => course.instructors.includes(u.id))
    .map((u) => u.name)
    .join(", ");

  const isCreator = String(user?.id) === String(course.creator_id);
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-start mb-4">
        <PageTitle title={course.name} />

        {isCreator && (
          <Link
            href={`/courses/${course.id}/edit`}
            className="px-4 ml-auto py-2 font-semibold text-white bg-primary rounded-md hover:bg-primaryHover transition-colors whitespace-nowrap"
          >
            Editar Curso
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6 text-gray-600 mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} /> De {formatDate(course.start_date)} até{" "}
          {formatDate(course.end_date)}
        </div>
        <div className="flex items-center gap-2">
          <UserIcon size={16} /> Instrutores: {instructorNames || "Nenhum"}
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
        <p>{course.description || "Nenhuma descrição fornecida."}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Aulas do Curso</h2>
        <div className="p-6 bg-background rounded-md text-center text-gray-500">
          <LessonList courseId={courseId} courseCreatorId={course.creator_id} />
        </div>
      </div>
    </div>
  );
};
