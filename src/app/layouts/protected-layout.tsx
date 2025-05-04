import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

import MainLayout from './main-layout';

export default function AuthLayout() {
   const { isAuthenticated, isLoading } = useAuth();

   if (!isAuthenticated) return <Navigate to='/login' replace />;

   if (isLoading)
      return (
         <div className='flex min-h-screen items-center justify-center'>
            <div className='text-center'>
               <p className='text-muted-foreground'>Loading...</p>
            </div>
         </div>
      );

   return (
      <MainLayout>
         <Outlet />
      </MainLayout>
   );
}
