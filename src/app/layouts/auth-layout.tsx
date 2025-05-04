import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

export default function AuthLayout() {
   const { isAuthenticated } = useAuth();

   if (isAuthenticated) return <Navigate to='/courses' replace />;

   return (
      <div className='flex min-h-screen flex-col justify-center bg-edu-light p-4'>
         <Outlet />
      </div>
   );
}
