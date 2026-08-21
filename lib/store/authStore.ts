import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (status: boolean) => void;
  clearAuth: () => void; // Функція для повного скидання авторизації 1 дією
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));