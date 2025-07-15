import { z } from 'zod';

const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "A data deve estar no formato AAAA-MM-DD.",
});

export const courseSchema = z.object({
    name: z.string().min(3, { message: "O nome do curso deve ter no mínimo 3 caracteres." }),
    description: z.string().max(500, { message: "A descrição não pode exceder 500 caracteres." }).optional().or(z.literal('')),
  start_date: dateStringSchema,
  end_date: dateStringSchema,
}).refine(data => data.end_date > data.start_date, {
    message: "A data de término deve ser posterior à data de início.",
    path: ["end_date"],
});

export const lessonSchema = z.object({
  title: z.string().min(3, { message: "O título da aula deve ter no mínimo 3 caracteres." }),
  video_url: z.string().url({ message: "Por favor, insira uma URL válida." }).optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived'], {
    errorMap: () => ({ message: 'Por favor, selecione um status.' }),
  }),
  publish_date: z.string().min(1, { message: "A data de publicação é obrigatória." }),
});