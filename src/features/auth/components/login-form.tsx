'use no memo';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui/card';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

import { useAuth } from '@/features/auth/hooks/use-auth';

const formSchema = z.object({
   email: z.string().email({ message: 'Please enter a valid email address' }),
   password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onSubmit = async (values: FormValues) => {
      setIsSubmitting(true);
      try {
         const success = await login(values.email, values.password);
         if (success) {
            navigate('/courses');
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Card className='mx-auto w-full max-w-md animate-fade-in shadow-lg'>
         <CardHeader>
            <CardTitle className='text-center text-2xl font-bold'>
               Welcome Back
            </CardTitle>
            <CardDescription className='text-center'>
               Sign in to your course management dashboard
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
               >
                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='you@example.com'
                                 type='email'
                                 {...field}
                                 disabled={isSubmitting}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='password'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='••••••••'
                                 type='password'
                                 {...field}
                                 disabled={isSubmitting}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     type='submit'
                     className='w-full bg-edu-purple hover:bg-edu-blue'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className='flex justify-center'>
            <p className='text-sm text-muted-foreground'>
               Demo credentials: any email with a password of at least 6
               characters
            </p>
         </CardFooter>
      </Card>
   );
}
