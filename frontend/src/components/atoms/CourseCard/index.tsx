import { CalendarIcon } from "lucide-react";

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
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 min-h-14">
        {course.name}
      </h3>
    <p className="mb-3 font-normal text-gray-600 line-clamp-2">
      {course.description || "Este curso não possui uma descrição."}
    </p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Início: {formatDate(course.start_date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Término: {formatDate(course.end_date)}</span>
          </div>
        </div>
        <a
          href={`/courses/${course.id}`}
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primaryHover transition-colors"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  );
};
