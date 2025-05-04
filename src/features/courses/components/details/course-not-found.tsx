import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export function CourseNotFound() {
   const navigate = useNavigate();

   return (
      <div className='py-12 text-center'>
         <h2 className='text-2xl font-bold'>Course not found</h2>
         <p className='mt-2 text-muted-foreground'>
            The course you're looking for doesn't exist or has been removed.
         </p>
         <Button
            className='bg-edu-purple hover:bg-edu-blue mt-4'
            onClick={() => navigate('/courses')}
         >
            Browse All Courses
         </Button>
      </div>
   );
}
