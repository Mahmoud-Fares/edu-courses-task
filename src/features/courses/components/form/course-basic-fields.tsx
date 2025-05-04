import { UseFormReturn } from 'react-hook-form';

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

import { CourseFormValues } from '@/features/courses/types';

interface CourseBasicFieldsProps {
   form: UseFormReturn<CourseFormValues>;
   isSubmitting: boolean;
}

export function CourseBasicFields({
   form,
   isSubmitting,
}: CourseBasicFieldsProps) {
   return (
      <>
         <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Course Title*</FormLabel>
                  <FormControl>
                     <Input
                        placeholder='Introduction to Web Development'
                        {...field}
                        disabled={isSubmitting}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Price ($)*</FormLabel>
                  <FormControl>
                     <Input
                        type='number'
                        placeholder='49.99'
                        {...field}
                        disabled={isSubmitting}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
               <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                     <Textarea
                        placeholder='Provide a detailed description of the course...'
                        className='min-h-[120px]'
                        {...field}
                        disabled={isSubmitting}
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   );
}
