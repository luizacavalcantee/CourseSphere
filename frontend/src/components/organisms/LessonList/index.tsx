"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { toast } from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";
import type { Lesson } from "@/types";

import { LessonItem } from "@/components/molecules/LessonItem";
import { Modal } from "@/components/molecules/Modal";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import Pagination from "@/components/molecules/Pagination";

export const LessonList = ({
  courseId,
  courseCreatorId,
}: {
  courseId: string;
  courseCreatorId: string;
}) => {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const LESSONS_PER_PAGE = 5;

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

  const totalPages = Math.ceil(filteredLessons.length / LESSONS_PER_PAGE);
  const startIndex = (currentPage - 1) * LESSONS_PER_PAGE;
  const endIndex = startIndex + LESSONS_PER_PAGE;
  const paginatedLessons = filteredLessons.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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
    return <p className="text-center text-gray-500 py-4">Carregando aulas...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-4">
        Falha ao carregar as aulas.
      </p>
    );

  return (
    <>
      <div className="rounded-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6 gap-4">
          <Link
            href={`/courses/${courseId}/lessons/new`}
            className="flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primaryHover transition-colors"
          >
            <PlusCircle size={18} />
            ADICIONAR AULA
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="Procurando alguma aula específica? Digite aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-56 flex-shrink-0"
          >
            <option value="all">Filtrar por Status</option>
            <option value="draft">Em Rascunho</option>
            <option value="published">Publicada</option>
            <option value="archived">Arquivada</option>
          </Select>
        </div>

        <div className="bg-white rounded-md border border-gray-200">
          {paginatedLessons.length > 0 ? (
            <div>
              {paginatedLessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  courseCreatorId={courseCreatorId}
                  onDeleteClick={handleOpenDeleteModal}
                  courseId={courseId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-6 md:p-10">
              <p>Nenhuma aula encontrada com os filtros atuais.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Confirmar Exclusão"
      >
        <p className="text-gray-700">
          Você tem certeza que deseja excluir a aula "
          <strong>{lessonToDelete?.title}</strong>"?
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="red" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </div>
      </Modal>
    </>
  );
};