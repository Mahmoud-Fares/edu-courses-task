import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/shared/components/ui/sonner';

import { router } from '@/app/router';

const App = () => (
   <>
      <RouterProvider router={router} />
      <Toaster />
   </>
);

export default App;
