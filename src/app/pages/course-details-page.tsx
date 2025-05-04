import { useEffect, useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { CourseHeader } from '@/features/courses/components/details/course-header';
import { CourseInfo } from '@/features/courses/components/details/course-info';
import { CourseNotFound } from '@/features/courses/components/details/course-not-found';
import { CourseSidebar } from '@/features/courses/components/details/course-sidebar';
import { useCourses } from '@/features/courses/hooks/use-courses';

export default function CourseDetailsPage() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const { getCourse } = useCourses();
   const [isLoading, setIsLoading] = useState(true);
   const course = id ? getCourse(id) : undefined;

   useEffect(() => {
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
         setIsLoading(false);
         if (!course && !isLoading) {
            // Redirect if course not found
            navigate('/courses', { replace: true });
         }
      }, 300);

      return () => clearTimeout(timer);
   }, [course, navigate, isLoading]);

   return (
      <>
         <div className='mb-6 flex items-center'>
            <Button
               variant='ghost'
               size='sm'
               className='mr-2'
               onClick={() => navigate('/courses')}
            >
               <ArrowLeft className='mr-2 h-4 w-4' />
               Back to Courses
            </Button>
         </div>

         {isLoading ? (
            <div className='space-y-6'>
               <Skeleton className='h-8 w-1/3' />
               <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                  <div className='space-y-4 md:col-span-2'>
                     <Skeleton className='h-5 w-1/4' />
                     <Skeleton className='h-24 w-full' />
                     <Skeleton className='h-5 w-1/2' />
                     <Skeleton className='h-5 w-1/3' />
                  </div>
                  <div className='space-y-4'>
                     <Skeleton className='h-64 w-full' />
                     <Skeleton className='h-10 w-full' />
                  </div>
               </div>
            </div>
         ) : course ? (
            <>
               <CourseHeader id={course.id} title={course.title} />

               <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                  <div className='md:col-span-2'>
                     <CourseInfo
                        description={course.description}
                        startDate={course.startDate}
                        endDate={course.endDate}
                        price={course.price}
                        createdAt={course.createdAt}
                     />
                  </div>

                  <div>
                     <CourseSidebar
                        imageUrl={course.imageUrl}
                        title={course.title}
                        price={course.price}
                        startDate={course.startDate}
                        endDate={course.endDate}
                     />
                  </div>
               </div>
            </>
         ) : (
            <CourseNotFound />
         )}
      </>
   );
}
