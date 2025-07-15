import { LessonForm } from "@/components/organisms/LessonForm";
import { PageTitle } from "@/components/molecules/PageTitle";

export default function NewLessonPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Adicionar Nova Aula" />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <LessonForm courseId={params.id} />
      </div>
    </div>
  );
}