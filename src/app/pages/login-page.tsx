import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
   return (
      <>
         <div className='mb-6 text-center'>
            <h1 className='text-3xl font-bold text-edu-purple'>
               Course Management
            </h1>
            <p className='text-muted-foreground'>
               Sign in to access your dashboard
            </p>
         </div>

         <LoginForm />
      </>
   );
}
