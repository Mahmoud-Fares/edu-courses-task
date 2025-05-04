import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className='flex flex-col items-center justify-center py-16'>
         <h1 className='text-4xl font-bold'>404</h1>
         <p className='mb-6 mt-2 text-xl text-muted-foreground'>
            Oops! The page you're looking for doesn't exist.
         </p>

         <Button
            className='bg-edu-purple hover:bg-edu-blue'
            onClick={() => navigate('/')}
         >
            Go Home
         </Button>
      </div>
   );
}
