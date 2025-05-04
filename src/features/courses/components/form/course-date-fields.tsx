import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/shared/components/ui/popover';
import { cn } from '@/shared/lib/utils';

import { CourseFormValues } from '@/features/courses/types';

interface CourseDateFieldsProps {
   form: UseFormReturn<CourseFormValues>;
   isSubmitting: boolean;
}

export function CourseDateFields({
   form,
   isSubmitting,
}: CourseDateFieldsProps) {
   return (
      <div className='grid grid-cols-2 gap-3'>
         <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
               <FormItem className='flex flex-col'>
                  <FormLabel>Start Date*</FormLabel>
                  <Popover>
                     <PopoverTrigger asChild>
                        <FormControl>
                           <Button
                              variant={'outline'}
                              className={cn(
                                 'text-left font-normal',
                                 !field.value && 'text-muted-foreground'
                              )}
                              disabled={isSubmitting}
                           >
                              {field.value ? (
                                 format(new Date(field.value), 'MMM d, yyyy')
                              ) : (
                                 <span>Select date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                           </Button>
                        </FormControl>
                     </PopoverTrigger>
                     <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                           mode='single'
                           selected={
                              field.value ? new Date(field.value) : undefined
                           }
                           onSelect={(date) =>
                              field.onChange(
                                 date ? format(date, 'yyyy-MM-dd') : ''
                              )
                           }
                           initialFocus
                           className='pointer-events-auto'
                        />
                     </PopoverContent>
                  </Popover>
                  <FormMessage />
               </FormItem>
            )}
         />

         <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
               <FormItem className='flex flex-col'>
                  <FormLabel>End Date*</FormLabel>
                  <Popover>
                     <PopoverTrigger asChild>
                        <FormControl>
                           <Button
                              variant={'outline'}
                              className={cn(
                                 'text-left font-normal',
                                 !field.value && 'text-muted-foreground'
                              )}
                              disabled={isSubmitting}
                           >
                              {field.value ? (
                                 format(new Date(field.value), 'MMM d, yyyy')
                              ) : (
                                 <span>Select date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                           </Button>
                        </FormControl>
                     </PopoverTrigger>
                     <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                           mode='single'
                           selected={
                              field.value ? new Date(field.value) : undefined
                           }
                           onSelect={(date) =>
                              field.onChange(
                                 date ? format(date, 'yyyy-MM-dd') : ''
                              )
                           }
                           fromDate={
                              form.watch('startDate')
                                 ? new Date(form.watch('startDate'))
                                 : undefined
                           }
                           initialFocus
                           className='pointer-events-auto'
                        />
                     </PopoverContent>
                  </Popover>
                  <FormMessage />
               </FormItem>
            )}
         />
      </div>
   );
}
