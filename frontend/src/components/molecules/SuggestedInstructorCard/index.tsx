"use client";

import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { UserPlus } from "lucide-react";

interface RandomUser {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail:string };
}

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
    <div className="text-center p-4 border border-gray-200 rounded-lg space-y-4 flex flex-col justify-between h-full hover:shadow-lg hover:border-primary transition-all duration-300">
      <div className="flex flex-col items-center gap-1">
        <Avatar
          src={instructor.picture.thumbnail}
          alt={`${instructor.name.first} ${instructor.name.last}`}
          size="medium"
        />
        <p className="font-semibold text-sm sm:text-base mt-2">{`${instructor.name.first} ${instructor.name.last}`}</p>
        <p className="text-xs text-gray-500 break-all w-full">{instructor.email}</p>
      </div>
      <Button
        variant="primary"
        className="w-full"
        onClick={() => onAdd(instructor)}
        disabled={disabled}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Adicionar
      </Button>
    </div>
  );
}