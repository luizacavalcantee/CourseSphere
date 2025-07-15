"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import { LessonItem } from "@/components/molecules/LessonItem";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Modal } from "@/components/molecules/Modal";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-hot-toast";
import type { Lesson } from '@/types';
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";

export const LessonList = ({
  courseId,
  courseCreatorId,
}: {
  courseId: string;
  courseCreatorId: number;
}) => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  const apiUrl = `http://localhost:3001/lessons?course_id=${courseId}`;
  const {
    data: lessons,
    error,
    isLoading,
    mutate,
  } = useSWR<Lesson[]>(apiUrl, fetcher);

  const filteredLessons = useMemo(() => {
    if (!lessons) return [];

    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  const canCreateLesson = String(user?.id) === String(courseCreatorId);

  const handleOpenDeleteModal = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setLessonToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!lessonToDelete) return;

    try {
      await fetch(`http://localhost:3001/lessons/${lessonToDelete.id}`, {
        method: "DELETE",
      });
      toast.success("Aula excluída com sucesso!");
      mutate();
    } catch (err) {
      toast.error("Falha ao excluir a aula.");
    } finally {
      handleCloseDeleteModal();
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-4">Carregando aulas...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 py-4">
        Falha ao carregar as aulas.
      </p>
    );

return (
    <>
      <div className="rounded-lg">
        <div className="flex justify-between items-center mb-4">
          {canCreateLesson && (
            <Link href={`/courses/${courseId}/lessons/new`} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primaryHover transition-colors">
              <PlusCircle size={18} />
              ADICIONAR AULA
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Procurando alguma aula específica? Digite aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-primaryLight"

          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="md:w-1/3"
          >
            <option value="all">Status</option>
            <option value="draft">Em Rascunho</option>
            <option value="published">Publicada</option>
            <option value="archived">Arquivada</option>
          </Select>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          {filteredLessons.length > 0 ? (
            <div>
              {filteredLessons.map(lesson => (
                <LessonItem 
                  key={lesson.id} 
                  lesson={lesson} 
                  courseCreatorId={courseCreatorId}
                  onDeleteClick={handleOpenDeleteModal}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 p-10">Nenhuma aula encontrada com os filtros atuais.</p>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCloseDeleteModal} 
        title="Confirmar Exclusão"
      >
        <p>Você tem certeza que deseja excluir a aula "{lessonToDelete?.title}"?</p>
        <p className="text-sm text-black mt-2">Esta ação não pode ser desfeita.</p>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={handleCloseDeleteModal} className="bg-white border-2 border-red-700 hover:bg-gray-100 text-red-700">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
            Excluir
          </Button>
        </div>
      </Modal>
    </>
  );
};