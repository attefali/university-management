import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: '1',
            name: 'مدير النظام',
            email: email,
            role: 'ADMIN',
            avatar: '👨‍💼',
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem('auth_token', 'mock_token_' + Date.now());
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth_token');
      },

      checkAuth: () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          set({
            user: {
              id: '1',
              name: 'مدير النظام',
              email: 'admin@university.edu',
              role: 'ADMIN',
              avatar: '👨‍💼',
            },
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
