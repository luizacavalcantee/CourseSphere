export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number | string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  creator_id: number | string;
  instructors: (number | string)[];
}

export interface Lesson {
  id: number | string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  publish_date: string;
  creator_id: number | string;
  video_url?: string;
  course_id: number | string;
}