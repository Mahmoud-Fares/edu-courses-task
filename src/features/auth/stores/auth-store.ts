import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthState, User } from '@/features/auth/types';

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         user: null,
         isLoading: false,

         login: async (email: string, password: string): Promise<boolean> => {
            set({ isLoading: true });

            try {
               // Simulate API delay
               await new Promise((resolve) => setTimeout(resolve, 800));

               // Simple validation - in a real app, this would be server-side
               if (password.length < 6) {
                  toast.error('Invalid credentials. Please try again.');
                  return false;
               }

               const newUser: User = { email };
               set({ user: newUser, isLoading: false });

               toast.success('Login successful!');
               return true;
            } catch (error) {
               toast.error('Login failed. Please try again.');
               return false;
            } finally {
               set({ isLoading: false });
            }
         },

         logout: () => {
            set({ user: null });
            toast.info('You have been logged out');
         },
      }),

      {
         name: 'eduUser',

         partialize: (state) => ({
            user: state.user,
         }),
      }
   )
);
