"use client";

import { LessonForm } from "@/components/organisms/LessonForm";
import { useAuth } from "@/contexts/AuthContext";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import type { Lesson } from "@/types";
import { PageTitle } from "@/components/molecules/PageTitle";

interface EditLessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function EditLessonPage({ params }: EditLessonPageProps) {
  const { courseId, lessonId } = params;
  const { isLoading: isAuthLoading } = useAuth();

  const swrKey = lessonId ? `http://localhost:3001/lessons/${lessonId}` : null;

  const {
    data: lesson,
    error,
    isLoading: isLessonLoading,
  } = useSWR<Lesson>(swrKey, fetcher);

  const isLoading = isAuthLoading || isLessonLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Falha ao carregar os dados da aula.
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Aula não encontrada.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-16 my-8">
      <PageTitle title="Editar Aula" />
      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <LessonForm courseId={courseId} lesson={lesson} />
      </div>
    </div>
  );
}
