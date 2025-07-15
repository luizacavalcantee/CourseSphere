"use client";

import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { UserPlus } from "lucide-react";

// Tipo para o usuário aleatório, necessário para as props do componente
interface RandomUser {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

// Props que o componente receberá
interface SuggestedInstructorCardProps {
  instructor: RandomUser;
  onAdd: (instructor: RandomUser) => void;
  disabled: boolean;
}

export default function SuggestedInstructorCard({
  instructor,
  onAdd,
  disabled,
}: SuggestedInstructorCardProps) {
  return (
    <div className="text-center p-4 border rounded-lg space-y-3 flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <Avatar
          src={instructor.picture.thumbnail}
          alt={`${instructor.name.first} ${instructor.name.last}`}
          size="medium"
          className="mx-auto"
        />
        <p className="font-semibold mt-2">{`${instructor.name.first} ${instructor.name.last}`}</p>
        <p className="text-xs text-gray-500 break-all">{instructor.email}</p>
      </div>
      <Button
        variant="primary"
        className="w-full mt-4"
        onClick={() => onAdd(instructor)}
        disabled={disabled}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Adicionar
      </Button>
    </div>
  );
}