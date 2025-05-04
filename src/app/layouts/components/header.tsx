import { useState } from 'react';

import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '@/shared/components/container';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useAuth } from '@/features/auth/hooks/use-auth';

export function Header() {
   const { user, logout } = useAuth();
   const navigate = useNavigate();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleLogout = () => {
      logout();
      navigate('/login');
   };

   const getUserInitials = () => {
      if (!user?.email) return 'U';
      return user.email.charAt(0).toUpperCase();
   };

   return (
      <header className='sticky top-0 z-40 border-b bg-white'>
         <Container className='flex h-16 items-center justify-between'>
            <Link to='/' className='flex items-center'>
               <span className='text-xl font-bold text-edu-purple'>
                  EduCourses
               </span>
            </Link>

            {/* Mobile menu button */}
            <div className='flex md:hidden'>
               <Button
                  variant='ghost'
                  className='mr-2'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                  {isMenuOpen ? (
                     <X className='h-5 w-5' />
                  ) : (
                     <Menu className='h-5 w-5' />
                  )}
               </Button>
            </div>

            {/* Desktop navigation */}
            <nav className='hidden items-center space-x-6 md:flex'>
               <Link
                  to='/courses'
                  className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
               >
                  Courses
               </Link>
               {user ? (
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant='ghost'
                           className='flex h-auto gap-0 p-0 hover:bg-transparent focus-visible:ring-0'
                        >
                           <Avatar className='h-8 w-8'>
                              <AvatarFallback>
                                 {getUserInitials()}
                              </AvatarFallback>
                           </Avatar>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align='end' className='w-56'>
                        <div className='flex items-center justify-start p-2'>
                           <div className='ml-2 space-y-1'>
                              <p className='text-sm font-medium'>
                                 {user.email}
                              </p>
                           </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           Log out
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               ) : (
                  <Button asChild className='bg-edu-purple hover:bg-edu-blue'>
                     <Link to='/login'>Sign in</Link>
                  </Button>
               )}
            </nav>

            {/* Mobile navigation */}
            {isMenuOpen && (
               <div className='absolute left-0 right-0 top-16 z-50 animate-fade-in space-y-4 border-b bg-white p-4 shadow-lg md:hidden'>
                  <div className='flex flex-col space-y-1'>
                     <Link
                        to='/courses'
                        className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                        onClick={() => setIsMenuOpen(false)}
                     >
                        Courses
                     </Link>
                     {user ? (
                        <Button
                           variant='ghost'
                           onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                           }}
                           className='justify-start'
                        >
                           Log out
                        </Button>
                     ) : (
                        <Button
                           asChild
                           className='bg-edu-purple hover:bg-edu-blue'
                           onClick={() => setIsMenuOpen(false)}
                        >
                           <Link to='/login'>Sign in</Link>
                        </Button>
                     )}
                  </div>
               </div>
            )}
         </Container>
      </header>
   );
}
