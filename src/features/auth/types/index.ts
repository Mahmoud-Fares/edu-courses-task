export interface User {
   email: string;
   name?: string;
}

export interface LoginFormData {
   email: string;
   password: string;
}

// Adding a new interface for the auth store state
export interface AuthState {
   user: User | null;
   isLoading: boolean;
   login: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
}
