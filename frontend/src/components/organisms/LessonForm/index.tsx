"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema } from "@/lib/schema";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select"; // 1. Importe o seu componente Select
import type { Lesson } from "@/types";

type LessonFormData = z.infer<typeof lessonSchema>;

interface LessonFormProps {
  courseId: string;
  lesson?: Lesson;
}

export const LessonForm = ({ courseId, lesson }: LessonFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const isEditMode = !!lesson;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title || "",
      video_url: lesson?.video_url || "",
      status: lesson?.status || "draft",
      publish_date: lesson?.publish_date
        ? lesson.publish_date.split("T")[0]
        : "",
    },
  });

  const onSubmit = async (data: LessonFormData) => {
    // ...sua lógica de onSubmit permanece a mesma...
    if (new Date(data.publish_date) < new Date()) {
      toast.error("A data de publicação não pode ser no passado.");
      return;
    }

    const payload = {
      ...data,
      course_id: parseInt(courseId),
      creator_id: isEditMode ? lesson.creator_id : user?.id,
    };

    const url = isEditMode
      ? `http://localhost:3001/lessons/${lesson.id}`
      : "http://localhost:3001/lessons";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha ao salvar a aula.");

      toast.success(
        isEditMode ? "Aula atualizada!" : "Aula criada com sucesso!"
      );
      router.push(`/courses/${courseId}`);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const HandleReturn = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <Label htmlFor="title">Título da Aula</Label>
        <Input id="title" type="text" {...register("title")} />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="video_url">URL do Vídeo (Embed)</Label>
        <Input id="video_url" type="url" {...register("video_url")} />
        {errors.video_url && (
          <p className="mt-1 text-sm text-red-500">
            {errors.video_url.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="status">Status</Label>
          {/* 2. Substitua o <select> pelo seu componente <Select> */}
          <Select id="status" {...register("status")}>
            <option value="draft">Rascunho</option>
            <option value="published">Publicada</option>
            <option value="archived">Arquivada</option>
          </Select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="publish_date">Data de Publicação</Label>
          <Input id="publish_date" type="date" max="9999-12-31" {...register("publish_date")} />
          {errors.publish_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.publish_date.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={HandleReturn}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary disabled:bg-primary/70"
        >
          {isSubmitting
            ? "Salvando..."
            : isEditMode
            ? "Salvar Aula"
            : "Criar Aula"}
        </Button>
      </div>
    </form>
  );
};