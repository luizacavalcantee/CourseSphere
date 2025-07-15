"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "@/lib/schema";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/TextArea";
import { Button } from "@/components/atoms/Button";
import type { Course } from "@/types";

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: Course;
}

export const CourseForm = ({ course }: CourseFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const isEditMode = !!course;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: course?.name || "",
      description: course?.description || "",
      start_date: course?.start_date ? course.start_date.split("T")[0] : "",
      end_date: course?.end_date ? course.end_date.split("T")[0] : "",
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    console.log("Dados válidos, enviando:", data);

    const payload = {
      ...data,
      start_date: data.start_date,
      end_date: data.end_date,
      creator_id: isEditMode ? course.creator_id : user?.id,
      instructors: isEditMode ? course.instructors : [user?.id],
    };

    const url = isEditMode
      ? `http://localhost:3001/courses/${course.id}`
      : "http://localhost:3001/courses";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha ao salvar o curso.");

      toast.success(
        isEditMode
          ? "Curso atualizado com sucesso!"
          : "Curso criado com sucesso!"
      );
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onInvalid = (errors: FieldErrors<CourseFormData>) => {
    console.error("Erros de validação do formulário:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-6"
    >
      <div>
        <Label htmlFor="name">Nome do Curso</Label>
        <Input id="name" type="text" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea id="description" {...register("description")} rows={4} />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="start_date">Data de Início</Label>
          <Input
            id="start_date"
            type="date"
            max="9999-12-31"
            {...register("start_date")}
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.start_date.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="end_date">Data de Término</Label>
          <Input
            id="end_date"
            type="date"
            max="9999-12-31"
            {...register("end_date")}
          />
          {errors.end_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.end_date.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Salvando..."
            : isEditMode
              ? "Salvar Alterações"
              : "Criar Curso"}
        </Button>
      </div>
    </form>
  );
};
