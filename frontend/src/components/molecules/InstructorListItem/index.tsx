"use client";

import type { User } from "@/types";
import { Trash } from "lucide-react";

interface InstructorListItemProps {
  instructor: User;
  onRemove: (instructor: User) => void;
  disabled: boolean;
}

export default function InstructorListItem({
  instructor,
  onRemove,
  disabled,
}: InstructorListItemProps) {
  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <span className="font-medium w-full">{instructor.name}</span>
      <button
        onClick={() => onRemove(instructor)}
        disabled={disabled}
        aria-label={`Remover ${instructor.name}`}
      >
        <Trash size={18} className="text-red-600 hover:text-red-800" />
      </button>
    </li>
  );
}