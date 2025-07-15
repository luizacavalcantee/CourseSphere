"use client";

import { CourseForm } from "@/components/organisms/CourseForm";
import { PageTitle } from "@/components/molecules/PageTitle";

export default function CreateCourse() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <PageTitle title="Criar Novo Curso" />
      </div>
      <div className="w-full mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <CourseForm />
      </div>
    </div>
  );
}