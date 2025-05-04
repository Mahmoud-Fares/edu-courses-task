import { useEffect, useState } from 'react';

import { Upload, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { FormLabel } from '@/shared/components/ui/form';

import { CourseFormValues } from '@/features/courses/types';

interface CourseImageUploaderProps {
   form: UseFormReturn<CourseFormValues>;
   isSubmitting: boolean;
}

export function CourseImageUploader({
   form,
   isSubmitting,
}: CourseImageUploaderProps) {
   const [imagePreview, setImagePreview] = useState<string | undefined>(
      form.getValues('imageUrl')
   );

   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Set file size limit (2MB)
      if (file.size > 2 * 1024 * 1024) {
         form.setError('imageUrl', {
            type: 'manual',
            message: 'Image size should be less than 2MB',
         });
         return;
      }

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Store the file in the form (it will be converted to base64 on submit)
      const reader = new FileReader();
      reader.onloadend = () => {
         form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
   };

   const clearImage = () => {
      form.setValue('imageUrl', '');
      setImagePreview(undefined);
   };

   // Cleanup image preview URL on unmount
   useEffect(() => {
      return () => {
         if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
         }
      };
   }, [imagePreview]);

   return (
      <>
         <FormLabel className='mb-2 block'>Course Image</FormLabel>
         <div className='relative flex min-h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed p-4'>
            {imagePreview ? (
               <div className='relative h-full w-full'>
                  <img
                     src={imagePreview}
                     alt='Course preview'
                     className='h-full w-full rounded-md object-cover'
                  />
                  <Button
                     type='button'
                     variant='destructive'
                     size='icon'
                     className='absolute right-2 top-2 h-8 w-8'
                     onClick={clearImage}
                     disabled={isSubmitting}
                  >
                     <X className='h-4 w-4' />
                  </Button>
               </div>
            ) : (
               <label className='flex h-full w-full cursor-pointer flex-col items-center justify-center'>
                  <Upload className='h-8 w-8 text-muted-foreground' />
                  <span className='mt-2 text-sm text-muted-foreground'>
                     Upload an image
                  </span>
                  <input
                     type='file'
                     accept='image/*'
                     className='hidden'
                     onChange={handleImageUpload}
                     disabled={isSubmitting}
                  />
               </label>
            )}
         </div>
         {form.formState.errors.imageUrl && (
            <p className='text-sm font-medium text-destructive'>
               {form.formState.errors.imageUrl.message}
            </p>
         )}
      </>
   );
}
