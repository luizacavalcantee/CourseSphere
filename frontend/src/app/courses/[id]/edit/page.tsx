"use client";

import { CourseForm } from "@/components/organisms/CourseForm";
import { useAuth } from "@/contexts/AuthContext";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PageTitle } from "@/components/molecules/PageTitle";

interface Course {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  creator_id: number;
  instructors: number[];
}

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const { user } = useAuth();

  const {
    data: course,
    error,
    isLoading: isCourseLoading,
  } = useSWR<Course>(`http://localhost:3001/courses/${params.id}`, fetcher);

  if (isCourseLoading) {
    return <div className="text-center p-8">Carregando formulário...</div>;
  }

  if (error || !course) {
    return <div className="text-center p-8">Curso não encontrado ou falha ao carregar.</div>;
  }

  if (user?.id !== course.creator_id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600">Acesso Negado</h1>
        <p className="mt-2 text-gray-600">
          Você não tem permissão para editar este curso.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-16 my-8">
      <PageTitle title="Editar Curso" />
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <CourseForm course={course} />
      </div>
    </div>
  );
}
