import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Course, CourseFormData, CoursesState } from '@/features/courses/types';

// Sample courses data for initial state
const COURSES: Course[] = [
   {
      id: '1',
      title: 'Introduction to React',
      description:
         'Learn the basics of React including components, props, and state management.',
      imageUrl:
         'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
      startDate: '2023-06-01',
      endDate: '2023-08-30',
      price: 49.99,
      createdAt: '2023-05-15T10:00:00Z',
   },
   {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      description:
         'Dive deep into JavaScript design patterns, functional programming, and performance optimization.',
      imageUrl:
         'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop',
      startDate: '2023-07-15',
      endDate: '2023-10-15',
      price: 79.99,
      createdAt: '2023-05-20T10:00:00Z',
   },
   {
      id: '3',
      title: 'Full Stack Development',
      description:
         'Build end-to-end applications with React, Node.js, and MongoDB.',
      imageUrl:
         'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop',
      startDate: '2023-08-01',
      endDate: '2023-12-31',
      price: 129.99,
      createdAt: '2023-06-01T10:00:00Z',
   },
];

export const useCoursesStore = create<CoursesState>()(
   persist(
      (set, get) => ({
         courses: COURSES,
         isLoading: false,

         getCourse: (id: string) => {
            return get().courses.find((course) => course.id === id);
         },

         addCourse: async (courseData: CourseFormData): Promise<string> => {
            try {
               const newCourse: Course = {
                  id: uuidv4(),
                  ...courseData,
                  createdAt: new Date().toISOString(),
               };

               const updatedCourses = [...get().courses, newCourse];

               set({ courses: updatedCourses });

               toast.success('Course added successfully');
               return newCourse.id;
            } catch (error) {
               console.error('Error adding course:', error);
               toast.error('Failed to add course');
               throw error;
            }
         },

         updateCourse: async (
            id: string,
            courseData: CourseFormData
         ): Promise<boolean> => {
            try {
               const courseIndex = get().courses.findIndex(
                  (course) => course.id === id
               );
               if (courseIndex === -1) {
                  toast.error('Course not found');
                  return false;
               }

               const updatedCourses = [...get().courses];
               updatedCourses[courseIndex] = {
                  ...updatedCourses[courseIndex],
                  ...courseData,
               };

               set({ courses: updatedCourses });

               toast.success('Course updated successfully');
               return true;
            } catch (error) {
               console.error('Error updating course:', error);
               toast.error('Failed to update course');
               return false;
            }
         },

         deleteCourse: async (id: string): Promise<boolean> => {
            try {
               const updatedCourses = get().courses.filter(
                  (course) => course.id !== id
               );
               if (updatedCourses.length === get().courses.length) {
                  toast.error('Course not found');
                  return false;
               }

               set({ courses: updatedCourses });

               toast.success('Course deleted successfully');
               return true;
            } catch (error) {
               console.error('Error deleting course:', error);
               toast.error('Failed to delete course');
               return false;
            }
         },
      }),
      {
         name: 'eduCourses',

         partialize: (state) => ({
            courses: state.courses,
         }),
      }
   )
);
