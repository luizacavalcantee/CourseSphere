import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <Link href={`/courses/${course.id}`} className="block h-full group">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full">
        <div className="p-6 flex-grow">
          <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <p className="font-normal text-gray-600 text-sm line-clamp-2">
            {course.description || "Este curso não possui uma descrição."}
          </p>
        </div>
        <div className="px-6 py-4 bg-[#ffffff] border-t border-gray-200 mt-auto flex items-center justify-between text-sm rounded-b-lg">
          <div>
            <div className="flex items-center gap-2 text-gray-500">
              <CalendarIcon size={16} />
              <span>Início: {formatDate(course.start_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <CalendarIcon size={16} />
              <span>Término: {formatDate(course.end_date)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primaryHover transition-colors self-end">
            Ver detalhes
            <ArrowRightIcon size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};
