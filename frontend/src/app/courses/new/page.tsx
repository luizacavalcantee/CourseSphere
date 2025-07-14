"use client";

import { CourseForm } from "@/components/organisms/CourseForm";
import { PageTitle } from "@/components/molecules/PageTitle";

export default function CreateCourse() {
  return (
    <div className="flex flex-col items-center justify-center mx-16 my-8">
      <PageTitle title="Criar Novo Curso" />

      <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <CourseForm />
      </div>
    </div>
  );
}
