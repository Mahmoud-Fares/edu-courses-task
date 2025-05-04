import { ReactNode } from 'react';

import { Outlet, ScrollRestoration } from 'react-router-dom';

import Container from '@/shared/components/container';

import { Footer } from '@/app/layouts/components/footer';
import { Header } from '@/app/layouts/components/header';

interface MainLayoutProps {
   children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
   return (
      <>
         <ScrollRestoration />

         <div className='flex min-h-screen flex-col'>
            <Header />

            <main className='flex-1'>
               <Container className='py-8'>{children ?? <Outlet />}</Container>
            </main>

            <Footer />
         </div>
      </>
   );
}
