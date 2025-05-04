'use no memo';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';

import { CourseBasicFields } from '@/features/courses/components/form/course-basic-fields';
import { CourseDateFields } from '@/features/courses/components/form/course-date-fields';
import { CourseImageUploader } from '@/features/courses/components/form/course-image-uploader';
import {
   Course,
   CourseFormData,
   CourseFormValues,
} from '@/features/courses/types';

const formSchema = z.object({
   title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
   description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters' }),
   imageUrl: z.string().optional(),
   startDate: z.string().min(1, { message: 'Start date is required' }),
   endDate: z.string().min(1, { message: 'End date is required' }),
   price: z.coerce.number().min(0, { message: 'Price must be positive' }),
});

interface CourseFormProps {
   course?: Course;
   onSubmit: (data: CourseFormData) => Promise<void>;
   isSubmitting: boolean;
}

export function CourseForm({
   course,
   onSubmit,
   isSubmitting,
}: CourseFormProps) {
   const navigate = useNavigate();

   const form = useForm<CourseFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: course?.title || '',
         description: course?.description || '',
         imageUrl: course?.imageUrl || '',
         startDate: course?.startDate || '',
         endDate: course?.endDate || '',
         price: course?.price || 0,
      },
   });

   const handleSubmit = async (values: CourseFormValues) => {
      const courseData: CourseFormData = {
         title: values.title,
         description: values.description,
         imageUrl: values.imageUrl,
         startDate: values.startDate,
         endDate: values.endDate,
         price: values.price,
      };

      await onSubmit(courseData);
   };

   return (
      <Card className='animate-fade-in w-full'>
         <CardHeader>
            <CardTitle className='text-xl font-bold'>
               {course ? 'Edit Course' : 'Add New Course'}
            </CardTitle>
         </CardHeader>

         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='space-y-6'
               >
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                     <div className='space-y-4 md:col-span-1'>
                        <CourseBasicFields
                           form={form}
                           isSubmitting={isSubmitting}
                        />
                        <CourseDateFields
                           form={form}
                           isSubmitting={isSubmitting}
                        />
                     </div>
                     <div className='space-y-4 md:col-span-1'>
                        <CourseImageUploader
                           form={form}
                           isSubmitting={isSubmitting}
                        />
                     </div>
                  </div>

                  <CardFooter className='flex justify-end gap-2 px-0 pb-0 pt-6'>
                     <Button
                        type='button'
                        variant='outline'
                        onClick={() => navigate('/courses')}
                        disabled={isSubmitting}
                     >
                        Cancel
                     </Button>
                     <Button
                        type='submit'
                        className='bg-edu-purple hover:bg-edu-blue'
                        disabled={isSubmitting}
                     >
                        {isSubmitting
                           ? 'Saving...'
                           : course
                             ? 'Update Course'
                             : 'Create Course'}
                     </Button>
                  </CardFooter>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
}
