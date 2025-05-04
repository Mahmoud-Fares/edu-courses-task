export function SkeletonGrid() {
   return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
         {[...Array(3)].map((_, i) => (
            <div key={i} className='animate-pulse'>
               <div className='h-48 rounded-t-md bg-muted' />
               <div className='space-y-4 p-4'>
                  <div className='h-4 w-3/4 rounded bg-muted' />
                  <div className='h-3 w-1/2 rounded bg-muted' />
                  <div className='h-10 rounded bg-muted' />
                  <div className='h-8 rounded bg-muted' />
               </div>
            </div>
         ))}
      </div>
   );
}
