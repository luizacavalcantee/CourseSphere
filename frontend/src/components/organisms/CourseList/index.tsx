"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import type { Course } from "@/types";
import { CourseCard } from "@/components/molecules/CourseCard";
import Pagination from "@/components/molecules/Pagination";

export const CourseList = () => {
  const { user } = useAuth();
  const { data: courses, error, isLoading } = useSWR<Course[]>(
    "http://localhost:3001/courses",
    fetcher
  );

  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 6;

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando cursos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Falha ao carregar os cursos.</p>;
  }

  const userCourses =
    courses?.filter((course) =>
      course.instructors.map(String).includes(String(user?.id))
    ) || [];

  const totalPages = Math.ceil(userCourses.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const paginatedCourses = userCourses.slice(startIndex, endIndex);

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

      {paginatedCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          Você ainda não está associado a nenhum curso.
        </p>
      )}
    </div>
  );
};
