import { useState } from 'react';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

interface DeleteCourseDialogProps {
   courseId: string | null;
   onClose: () => void;
   onConfirm: (id: string) => Promise<boolean>;
}

export function DeleteCourseDialog({
   courseId,
   onClose,
   onConfirm,
}: DeleteCourseDialogProps) {
   const [isDeleting, setIsDeleting] = useState(false);

   const handleConfirmDelete = async () => {
      if (!courseId) return;

      setIsDeleting(true);
      try {
         await onConfirm(courseId);
      } finally {
         setIsDeleting(false);
         onClose();
      }
   };

   return (
      <AlertDialog
         open={!!courseId}
         onOpenChange={(open) => !open && onClose()}
      >
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This course will be permanently
                  deleted.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={isDeleting}>
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className='bg-destructive hover:bg-destructive/90'
               >
                  {isDeleting ? 'Deleting...' : 'Delete'}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
