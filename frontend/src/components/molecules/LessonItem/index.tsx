'use client';

import { FilePenLine, Trash2, Clapperboard, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getVideoThumbnail } from '@/utils/videoUtils';
import Image from 'next/image';
import type { Lesson } from '@/types';
import Link from 'next/link';

interface LessonItemProps {
  lesson: Lesson;
  courseCreatorId: string;
  onDeleteClick: (lesson: Lesson) => void;
  courseId: string;
}

const statusStyles = {
  draft: { text: 'Em Rascunho', bg: 'bg-gray-200', textColor: 'text-gray-800' },
  published: { text: 'Publicada', bg: 'bg-green-100', textColor: 'text-green-800' },
  archived: { text: 'Arquivada', bg: 'bg-orange-100', textColor: 'text-orange-800' },
};

export const LessonItem = ({ lesson, courseCreatorId, onDeleteClick, courseId }: LessonItemProps) => {
  const { user } = useAuth();
  const style = statusStyles[lesson.status];
  const canEditOrDelete = String(user?.id) === String(lesson.creator_id) || String(user?.id) === String(courseCreatorId);

  const thumbnailUrl = getVideoThumbnail(lesson.video_url ?? '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-white border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 w-full">
        <a 
          href={lesson.video_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative flex-shrink-0 w-28 sm:w-32 h-16 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden group"
        >
          {thumbnailUrl ? (
            <>
              <Image
                src={thumbnailUrl}
                alt={`Thumbnail da aula: ${lesson.title}`}
                fill={true}
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all">
                <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </>
          ) : (
            <Clapperboard className="w-8 h-8 text-gray-400" />
          )}
        </a>
        
        <div>
          <h4 className="font-semibold text-gray-800 text-base">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mt-1">Publicada em: {formatDate(lesson.publish_date)}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full md:w-auto md:gap-6">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${style.bg} ${style.textColor}`}>
          {style.text}
        </span>
        <div className="flex items-center gap-4">
          {canEditOrDelete && (
            <>
              <Link href={`/courses/${courseId}/lessons/${lesson.id}/edit`}>
                <FilePenLine size={18} className='text-primary hover:text-primaryHover transition-colors' />
              </Link>
              <button 
                onClick={() => onDeleteClick(lesson)}
                className="text-red-500 hover:text-red-700 transition-colors" 
                aria-label="Excluir aula"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};