// src/core/stores/authStore.ts
import { create } from 'zustand';

export type AuthUser = {
  id: string;
  username: string;
  email?: string;
  full_name?: string;
  role?: string;
  department?: string;
};

type AuthStore = {
  user: AuthUser | null;
  setUser: (u: AuthUser) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
