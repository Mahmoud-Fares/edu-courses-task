import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

interface CourseHeaderProps {
   id: string;
   title: string;
}

export function CourseHeader({ id, title }: CourseHeaderProps) {
   const navigate = useNavigate();

   return (
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
         <h1 className='text-3xl font-bold'>{title}</h1>
         <Button
            onClick={() => navigate(`/courses/edit/${id}`)}
            className='bg-edu-purple hover:bg-edu-blue'
         >
            <Edit className='mr-2 h-4 w-4' />
            Edit Course
         </Button>
      </div>
   );
}
