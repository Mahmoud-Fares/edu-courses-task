import { cn } from '@/shared/lib/utils';

type ContainerProps = {
   children: React.ReactNode;
   className?: string;
};

export default function Container({ children, className }: ContainerProps) {
   return (
      <div className={cn('container mx-auto px-4 sm:px-6', className)}>
         {children}
      </div>
   );
}
