import { format } from 'date-fns';

interface CourseInfoProps {
   description: string;
   startDate: string;
   endDate: string;
   price: number;
   createdAt?: string;
}

export function CourseInfo({
   description,
   startDate,
   endDate,
   price,
   createdAt,
}: CourseInfoProps) {
   const formatDate = (dateStr?: string) => {
      return dateStr ? format(new Date(dateStr), 'MMMM d, yyyy') : '';
   };

   return (
      <div className='space-y-6'>
         <div>
            <h2 className='mb-3 text-xl font-semibold'>Description</h2>
            <p className='whitespace-pre-line text-muted-foreground'>
               {description}
            </p>
         </div>

         <div>
            <h2 className='mb-3 text-xl font-semibold'>Course Details</h2>
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
               <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                     Start Date
                  </dt>
                  <dd className='font-medium'>{formatDate(startDate)}</dd>
               </div>

               <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                     End Date
                  </dt>
                  <dd className='font-medium'>{formatDate(endDate)}</dd>
               </div>

               <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                     Price
                  </dt>
                  <dd className='text-edu-purple font-medium'>
                     ${price.toFixed(2)}
                  </dd>
               </div>

               {createdAt && (
                  <div>
                     <dt className='text-sm font-medium text-muted-foreground'>
                        Created
                     </dt>
                     <dd className='font-medium'>{formatDate(createdAt)}</dd>
                  </div>
               )}
            </dl>
         </div>
      </div>
   );
}
