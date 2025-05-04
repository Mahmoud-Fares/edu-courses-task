import { CoursesList } from '@/features/courses/components/list';
import { useCourses } from '@/features/courses/hooks/use-courses';

export default function CoursesPage() {
   const { courses, isLoading, deleteCourse } = useCourses();

   return (
      <>
         <h1 className='mb-6 text-3xl font-bold'>Courses</h1>

         <CoursesList
            courses={courses}
            isLoading={isLoading}
            onDeleteCourse={deleteCourse}
         />
      </>
   );
}
