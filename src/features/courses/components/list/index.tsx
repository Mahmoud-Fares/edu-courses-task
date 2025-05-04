import { useState } from 'react';

import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { CourseCardGrid } from '@/features/courses/components/list/course-card-grid';
import { CourseSearchBar } from '@/features/courses/components/list/course-searchbar';
import { DeleteCourseDialog } from '@/features/courses/components/list/delete-course-dialog';
import { SkeletonGrid } from '@/features/courses/components/list/skeleton-grid';
import { Course } from '@/features/courses/types';

interface CoursesListProps {
   courses: Course[];
   isLoading: boolean;
   onDeleteCourse: (id: string) => Promise<boolean>;
}

export function CoursesList({
   courses,
   isLoading,
   onDeleteCourse,
}: CoursesListProps) {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');
   const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

   const handleAddCourse = () => {
      navigate('/courses/new');
   };

   const handleDeleteClick = (id: string) => {
      setCourseToDelete(id);
   };

   const clearSearch = () => {
      setSearchQuery('');
   };

   return (
      <div className='w-full space-y-6'>
         <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <CourseSearchBar
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
            />

            <Button
               className='bg-edu-purple hover:bg-edu-blue'
               onClick={handleAddCourse}
            >
               <Plus className='mr-2 h-4 w-4' />
               Add New Course
            </Button>
         </div>

         {isLoading ? (
            <SkeletonGrid />
         ) : (
            <CourseCardGrid
               courses={courses}
               searchQuery={searchQuery}
               onDeleteClick={handleDeleteClick}
               onClearSearch={clearSearch}
            />
         )}

         <DeleteCourseDialog
            courseId={courseToDelete}
            onClose={() => setCourseToDelete(null)}
            onConfirm={onDeleteCourse}
         />
      </div>
   );
}
