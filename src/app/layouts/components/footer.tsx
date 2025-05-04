import Container from '@/shared/components/container';

export const Footer = () => {
   return (
      <footer className='border-t py-6'>
         <Container className='text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Course Management Dashboard
         </Container>
      </footer>
   );
};
