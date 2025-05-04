import { Button } from '@/shared/components/ui/button';

import { CourseCard } from '@/features/courses/components/course-card';
import { Course } from '@/features/courses/types';

interface CourseCardGridProps {
   courses: Course[];
   searchQuery: string;
   onDeleteClick: (id: string) => void;
   onClearSearch: () => void;
}

export function CourseCardGrid({
   courses,
   searchQuery,
   onDeleteClick,
   onClearSearch,
}: CourseCardGridProps) {
   // Filter courses based on search query
   const filteredCourses = courses.filter(
      (course) =>
         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         course.description.toLowerCase().includes(searchQuery.toLowerCase())
   );

   if (filteredCourses.length === 0) {
      return (
         <div className='py-12 text-center'>
            <p className='text-muted-foreground'>
               No courses found matching your search.
            </p>
            {searchQuery && (
               <Button variant='ghost' onClick={onClearSearch} className='mt-2'>
                  Clear search
               </Button>
            )}
         </div>
      );
   }

   return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
         {filteredCourses.map((course) => (
            <CourseCard
               key={course.id}
               course={course}
               onDeleteClick={onDeleteClick}
            />
         ))}
      </div>
   );
}
