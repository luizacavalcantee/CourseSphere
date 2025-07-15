"use client";

import { CourseForm } from "@/components/organisms/CourseForm";
import { useAuth } from "@/contexts/AuthContext";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PageTitle } from "@/components/molecules/PageTitle";
import type { Course } from "@/types";

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

  if (String(user?.id) !== String(course.creator_id)) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600">Acesso Negado</h1>
        <p className="mt-2 text-gray-600">
          Você não tem permissão para editar este curso.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <PageTitle title="Editar Curso" />
      </div>
      <div className="w-full mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <CourseForm course={course} />
      </div>
    </div>
  );
}