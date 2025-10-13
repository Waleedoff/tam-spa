// src/core/stores/memberStore.ts
import { create } from 'zustand';
import { toast } from 'react-toastify';
import { UserRegiterType } from 'src/core/types/user.type';
import {
  getAllMembersService,
  getTasksByUserIdService,
} from 'src/services/https-service';

type TaskType = {
  id: string;
  title: string;
  desription?: string;
  status: string;
  priority: string;
  created: string;
};

type UserStore = {
  users: UserRegiterType[];
  loading: boolean;
  selectedUserTasks: TaskType[];
  showTasksModal: boolean;
  q: string;
  setQuery: (q: string) => void;
  fetchUsers: (query: string) => Promise<void>;
  fetchUserTasks: (userId: string) => Promise<void>;
  closeModal: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  selectedUserTasks: [],
  showTasksModal: false,
  q: '',
  setQuery: (q) => set({ q }),

  fetchUsers: async (query) => {
    set({ loading: true });
    try {
      const data = await getAllMembersService(query);
      set({ users: data });
    } catch {
      toast.error('Cannot fetch users');
    } finally {
      set({ loading: false });
    }
  },

  fetchUserTasks: async (userId) => {
    try {
      const tasks = await getTasksByUserIdService(userId);
      set({ selectedUserTasks: tasks || [], showTasksModal: true });
    } catch {
      toast.error('Could not fetch tasks');
    }
  },

  closeModal: () => set({ showTasksModal: false }),
}));
