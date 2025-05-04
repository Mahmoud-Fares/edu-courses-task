import { Search } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';

interface CourseSearchBarProps {
   searchQuery: string;
   setSearchQuery: (query: string) => void;
}

export function CourseSearchBar({
   searchQuery,
   setSearchQuery,
}: CourseSearchBarProps) {
   return (
      <div className='relative max-w-md flex-1'>
         <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
         <Input
            placeholder='Search courses...'
            className='pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>
   );
}
