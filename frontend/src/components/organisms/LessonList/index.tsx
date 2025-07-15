'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useAuth } from '@/contexts/AuthContext';
import { LessonItem } from '@/components/molecules/LessonItem';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  status: 'draft' | 'published' | 'archived';
  publish_date: string;
  course_id: number;
  creator_id: number;
  video_url?: string;
}

export const LessonList = ({ courseId, courseCreatorId }: { courseId: string, courseCreatorId: number }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: lessons, error, isLoading } = 
    useSWR<Lesson[]>(`http://localhost:3001/lessons?course_id=${courseId}`, fetcher);

  const filteredLessons = useMemo(() => {
    if (!lessons) return [];

    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  if (isLoading) return <p className="text-center text-gray-500 py-4">Carregando aulas...</p>;
  if (error) return <p className="text-center text-red-500 py-4">Falha ao carregar as aulas.</p>;
  
  const canCreateLesson = user?.id === courseCreatorId;

return (
    <div className="rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {canCreateLesson && (
          <Link href={`/courses/${courseId}/lessons/new`} className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <PlusCircle size={18} />
            ADICIONAR AULA
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">Status</option>
          <option value="draft">Em Rascunho</option>
          <option value="published">Publicada</option>
          <option value="archived">Arquivada</option>
        </select>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {filteredLessons.length > 0 ? (
          <div>
            {filteredLessons.map(lesson => (
              <LessonItem key={lesson.id} lesson={lesson} courseCreatorId={courseCreatorId} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 p-10">Nenhuma aula encontrada com os filtros atuais.</p>
        )}
      </div>
    </div>
  );
};