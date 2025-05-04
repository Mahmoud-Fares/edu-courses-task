import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

const Index = () => {
   const { isAuthenticated } = useAuth();

   if (isAuthenticated) return <Navigate to='/courses' replace />;
   return <Navigate to='/login' replace />;
};

export default Index;
