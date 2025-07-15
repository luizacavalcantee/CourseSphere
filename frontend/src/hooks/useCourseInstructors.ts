import { useState, useMemo, useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-hot-toast";

import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/contexts/AuthContext";

import type { Course, User } from "@/types";
import type { NewInstructorData } from "@/components/organisms/CreateInstructorForm";

export function useCourseInstructors(courseId: string) {
    const { user: loggedInUser } = useAuth();
    const { mutate } = useSWRConfig();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        data: course,
        error: courseError,
        mutate: mutateCourse,
    } = useSWR<Course>(
        courseId ? `http://localhost:3001/courses/${courseId}` : null,
        fetcher
    );

    const {
        data: allUsers,
        error: usersError,
        mutate: mutateUsers,
    } = useSWR<User[]>("http://localhost:3001/users", fetcher);

    const currentInstructors = useMemo(
        () => allUsers?.filter((u) => course?.instructors.includes(u.id)) || [],
        [allUsers, course]
    );

    const isCreator = useMemo(
        () => loggedInUser?.id === course?.creator_id,
        [loggedInUser, course]
    );

    const createAndAddInstructor = useCallback(
        async (newUserData: NewInstructorData) => {
            if (!course) return false;
            setIsSubmitting(true);
            try {
                const newUserResponse = await fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUserData),
                });
                if (!newUserResponse.ok) {
                    const errorData = await newUserResponse.json();
                    throw new Error(errorData.message || "Este e-mail já está em uso.");
                }
                const createdUser: User = await newUserResponse.json();

                const updatedInstructorIds = [...course.instructors, createdUser.id];
                await fetch(`http://localhost:3001/courses/${courseId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ instructors: updatedInstructorIds }),
                });

                toast.success(`${createdUser.name} foi adicionado(a) como instrutor(a)!`);
                mutateCourse();
                mutateUsers();

                return true;
            } catch (error) {
                toast.error((error as Error).message || "Falha ao adicionar o instrutor.");
                return false;
            } finally {
                setIsSubmitting(false);
            }
        },
        [course, courseId, mutateCourse, mutateUsers]
    );

const handleRemoveInstructor = useCallback(
  async (instructorIdToRemove: string) => {
    if (!course || !allUsers) return;

    if (instructorIdToRemove === course.creator_id) {
      toast.error("O criador do curso não pode ser removido.");
      return;
    }

    setIsSubmitting(true);


    const updatedInstructorIds = course.instructors.filter(
      (id) => id !== instructorIdToRemove
    );

    const removedInstructorName = allUsers.find(
      (u) => u.id === instructorIdToRemove
    )?.name;

    mutateCourse(
      { ...course, instructors: updatedInstructorIds },
      false
    );

    try {
      await fetch(`http://localhost:3001/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instructors: updatedInstructorIds }),
      });

      toast.success(
        `${removedInstructorName || "Instrutor"} removido(a) com sucesso!`
      );
    } catch (error) {
      toast.error("Falha ao remover o instrutor.");
      mutateCourse(course, false);
    } finally {
      setIsSubmitting(false);
    }
  },
  [course, allUsers, courseId, mutateCourse]
);

    return {
        course,
        currentInstructors,
        error: courseError || usersError,
        isLoading: !courseError && !usersError && !course && !allUsers,
        isCreator,
        isSubmitting,
        createAndAddInstructor,
        handleRemoveInstructor,
    };
}
