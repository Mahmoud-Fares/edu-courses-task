import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/error-boundary';

const MainLayout = lazy(() => import('@/app/layouts/main-layout'));
const ProtectedLayout = lazy(() => import('@/app/layouts/protected-layout'));
const AuthLayout = lazy(() => import('@/app/layouts/auth-layout'));

const LoginPage = lazy(() => import('@/app/pages/login-page'));

const Index = lazy(() => import('@/app/pages'));
const CourseFormPage = lazy(() => import('@/app/pages/course-form-page'));
const CoursesPage = lazy(() => import('@/app/pages/courses-page'));
const CourseDetailsPage = lazy(() => import('@/app/pages/course-details-page'));

const NotFound = lazy(() => import('@/app/pages/not-found'));

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
   // Protected routes group
   {
      path: '/',
      element: <ProtectedLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            index: true,
            element: <Index />,
         },
         {
            path: 'courses',
            children: [
               {
                  index: true,
                  element: <CoursesPage />,
               },
               {
                  path: ':id',
                  element: <CourseDetailsPage />,
               },
               {
                  path: 'new',
                  element: <CourseFormPage />,
               },
               {
                  path: 'edit/:id',
                  element: <CourseFormPage />,
               },
            ],
         },
      ],
   },
   // Auth routes group
   {
      path: '/',
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: 'login',
            element: <LoginPage />,
         },
      ],
   },
]);
