"use client";

import { FormEvent } from "react";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-hot-toast";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";

export interface NewInstructorData {
  name: string;
  email: string;
  password?: string;
}

interface CreateInstructorFormProps {
  isSubmitting: boolean;
  onSubmit: (data: NewInstructorData) => void;
  onCancel: () => void;
}

export default function CreateInstructorForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: CreateInstructorFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }
    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome Completo</Label>
        <Input type="text" name="name" id="name" required />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" name="email" id="email" required />
      </div>
      <div>
        <Label htmlFor="password">Senha (mín. 6 caracteres)</Label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
        />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar e Adicionar"}
        </Button>
      </div>
    </form>
  );
}
