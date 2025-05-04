import { useCoursesStore } from '@/features/courses/stores/courses-store';

export function useCourses() {
   const courses = useCoursesStore((state) => state.courses);
   const isLoading = useCoursesStore((state) => state.isLoading);
   const getCourse = useCoursesStore((state) => state.getCourse);
   const addCourse = useCoursesStore((state) => state.addCourse);
   const updateCourse = useCoursesStore((state) => state.updateCourse);
   const deleteCourse = useCoursesStore((state) => state.deleteCourse);

   return {
      courses,
      isLoading,
      getCourse,
      addCourse,
      updateCourse,
      deleteCourse,
   };
}
