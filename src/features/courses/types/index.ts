export interface Course {
   id: string;
   title: string;
   description: string;
   imageUrl?: string;
   startDate: string;
   endDate: string;
   price: number;
   createdAt: string;
}

export interface CourseFormData {
   title: string;
   description: string;
   imageUrl?: string;
   imageFile?: File;
   startDate: string;
   endDate: string;
   price: number;
}

export type CourseFormValues = {
   title: string;
   description: string;
   imageUrl?: string;
   startDate: string;
   endDate: string;
   price: number;
};

export interface CoursesState {
   courses: Course[];
   isLoading: boolean;
   getCourse: (id: string) => Course | undefined;
   addCourse: (courseData: CourseFormData) => Promise<string>;
   updateCourse: (id: string, courseData: CourseFormData) => Promise<boolean>;
   deleteCourse: (id: string) => Promise<boolean>;
}
