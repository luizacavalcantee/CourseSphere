import { z } from 'zod';

export const courseSchema = z.object({
  name: z.string().min(3, { message: "O nome do curso deve ter no mínimo 3 caracteres." }),
  description: z.string().max(500, { message: "A descrição não pode exceder 500 caracteres." }).optional().or(z.literal('')),
  start_date: z.string().min(1, { message: "A data de início é obrigatória." }),
  end_date: z.string().min(1, { message: "A data de término é obrigatória." }),
});

export const lessonSchema = z.object({
  title: z.string().min(3, { message: "O título da aula deve ter no mínimo 3 caracteres." }),
  video_url: z.string().url({ message: "Por favor, insira uma URL válida." }).optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived'], {
    errorMap: () => ({ message: 'Por favor, selecione um status.' }),
  }),
  publish_date: z.string().min(1, { message: "A data de publicação é obrigatória." }),
});