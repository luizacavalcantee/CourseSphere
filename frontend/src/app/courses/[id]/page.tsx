"use client";

import { CourseDetails } from "@/components/organisms/CourseDetails";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseDetails courseId={params.id} />
    </div>
  );
}