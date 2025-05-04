import { format } from 'date-fns';

import { Button } from '@/shared/components/ui/button';

interface CourseSidebarProps {
   imageUrl?: string;
   title: string;
   price: number;
   startDate: string;
   endDate: string;
}

export function CourseSidebar({
   imageUrl,
   title,
   price,
   startDate,
   endDate,
}: CourseSidebarProps) {
   const formatDate = (dateStr?: string) => {
      return dateStr ? format(new Date(dateStr), 'MMMM d, yyyy') : '';
   };

   return (
      <div className='sticky top-24 space-y-4'>
         {imageUrl ? (
            <img
               src={imageUrl}
               alt={title}
               className='h-auto w-full rounded-lg object-cover shadow-md'
            />
         ) : (
            <div className='flex aspect-video items-center justify-center rounded-lg bg-muted'>
               <p className='text-muted-foreground'>No image available</p>
            </div>
         )}
         <div className='rounded-lg border p-4 shadow-sm'>
            <p className='mb-1 text-lg font-semibold'>${price.toFixed(2)}</p>
            <p className='mb-4 text-sm text-muted-foreground'>
               From {formatDate(startDate)} to {formatDate(endDate)}
            </p>
            <Button className='w-full bg-edu-purple hover:bg-edu-blue'>
               Enroll Now
            </Button>
         </div>
      </div>
   );
}
