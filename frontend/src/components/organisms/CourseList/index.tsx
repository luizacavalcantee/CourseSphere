"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import { CourseCard } from "@/components/atoms/CourseCard";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  instructors: number[];
}

export const CourseList = () => {
  const { user } = useAuth();
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR<Course[]>("http://localhost:3001/courses", fetcher);

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando cursos...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Falha ao carregar os cursos.</p>
    );
  }

  const userCourses =
    courses?.filter((course) =>
      course.instructors.map(String).includes(String(user?.id))
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-black">Seus Cursos</h2>
        <Link
          href="/courses/new"
          className="px-4 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
        >
          Criar Novo Curso
        </Link>
      </div>

      {userCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Você ainda não está associado a nenhum curso.
        </p>
      )}
    </div>
  );
};
