"use client";

import { Header } from "@/components/organisms/Header";
import { CourseForm } from "@/components/organisms/CourseForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageTitle } from "@/components/molecules/PageTitle";

export default function CreateCourse() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center mx-16 my-8">
        <PageTitle title="Criar Novo Curso" />
        
        <div className="w-full mx-auto p-8 bg-white rounded-lg shadow-md">
          <CourseForm />
        </div>
      </main>
    </div>
  );
}