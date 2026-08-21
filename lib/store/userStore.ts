import { create } from 'zustand';

export interface User {
  email: string;
  username?: string;
  avatar?: string;
}

export interface UserDraft {
  avatar?: string;
  username?: string;
  email: string;
  password: string;
}

interface UserStore {
  user: User | null;              
  draft: UserDraft;               
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setDraft: (draft: UserDraft) => void;
  setIsAuthenticated: (status: boolean) => void;
  resetDraft: () => void;
}

const INITIAL_DRAFT: UserDraft = {
  avatar: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
  username: '',
  email: '',
  password: '',
};

export const useDraftStore = create<UserStore>()((set) => ({
  user: null,
  draft: INITIAL_DRAFT,
  isAuthenticated: false,

  setUser: (user) => set({ user }),
  setDraft: (draft) => set({ draft }),
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
  resetDraft: () => set({ draft: INITIAL_DRAFT, user: null }),
}));