import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { CourseForm } from '@/features/courses/components/form';
import { useCourses } from '@/features/courses/hooks/use-courses';
import { CourseFormData } from '@/features/courses/types';

export default function CourseFormPage() {
   const { id } = useParams<{ id?: string }>();
   const navigate = useNavigate();
   const { getCourse, addCourse, updateCourse } = useCourses();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const course = id ? getCourse(id) : undefined;
   const isEditMode = !!course;

   const handleSubmit = async (data: CourseFormData) => {
      setIsSubmitting(true);
      try {
         if (isEditMode && id) {
            await updateCourse(id, data);
            navigate(`/courses/${id}`);
         } else {
            const newId = await addCourse(data);
            navigate(`/courses/${newId}`);
         }
      } finally {
         setIsSubmitting(false);
      }
   };

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

         <div className='mx-auto max-w-4xl'>
            <CourseForm
               course={course}
               onSubmit={handleSubmit}
               isSubmitting={isSubmitting}
            />
         </div>
      </>
   );
}
