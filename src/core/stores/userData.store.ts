import { create } from 'zustand';

type UserDataStoreType = {
  accessToken: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useUserDataStore = create<UserDataStoreType>((set) => ({
  accessToken: localStorage.getItem('token'),
  isLoggedIn: Boolean(localStorage.getItem('token')),

  setToken: (token: string) => {
    localStorage.setItem('token', token);
    set({ accessToken: token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ accessToken: null, isLoggedIn: false });
    window.location.href = '/';
  },
}));
