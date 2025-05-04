import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/shared/components/ui/card';

import { Course } from '@/features/courses/types';

interface CourseCardProps {
   course: Course;
   onDeleteClick: (id: string) => void;
}

export function CourseCard({ course, onDeleteClick }: CourseCardProps) {
   const navigate = useNavigate();

   const formatDate = (dateStr: string) => {
      return format(new Date(dateStr), 'MMM d, yyyy');
   };

   const handleViewDetails = () => {
      navigate(`/courses/${course.id}`);
   };

   const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/courses/edit/${course.id}`);
   };

   const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDeleteClick(course.id);
   };

   return (
      <Card
         className='group animate-fade-in cursor-pointer overflow-hidden transition-all hover:shadow-lg'
         onClick={handleViewDetails}
      >
         <div className='relative h-48 overflow-hidden'>
            {course.imageUrl ? (
               <img
                  src={course.imageUrl}
                  alt={course.title}
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
               />
            ) : (
               <div className='flex h-full w-full items-center justify-center bg-muted'>
                  <p className='text-muted-foreground'>No image available</p>
               </div>
            )}
         </div>
         <CardHeader className='p-4 pb-0'>
            <h3 className='line-clamp-1 text-lg font-bold'>{course.title}</h3>
            <div className='mt-1 flex items-center justify-between'>
               <p className='text-sm text-muted-foreground'>
                  {formatDate(course.startDate)} - {formatDate(course.endDate)}
               </p>
               <p className='font-medium text-edu-purple'>
                  ${course.price.toFixed(2)}
               </p>
            </div>
         </CardHeader>
         <CardContent className='p-4 pt-2'>
            <p className='line-clamp-2 text-sm'>{course.description}</p>
         </CardContent>
         <CardFooter className='flex justify-between p-4 pt-0'>
            <Button variant='outline' size='sm' onClick={handleEdit}>
               Edit
            </Button>
            <Button
               variant='outline'
               size='sm'
               className='text-destructive hover:bg-destructive/10 hover:text-destructive'
               onClick={handleDelete}
            >
               Delete
            </Button>
         </CardFooter>
      </Card>
   );
}
