import { CalendarIcon } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <div className="bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col h-full">
        <div className="p-6 flex-grow">
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-gray-900 line-clamp-2">{course.name}</h3>
          {course.description && (
            <p className="mb-4 font-normal text-gray-700 text-sm line-clamp-3">{course.description}</p>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-md flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>Início: {formatDate(course.start_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>Término: {formatDate(course.end_date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};