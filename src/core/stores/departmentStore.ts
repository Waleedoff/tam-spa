// src/store/department.store.ts
import { create } from 'zustand';
import { GetDepartmentsService } from 'src/services/https-service';

interface Member {
  username: string;
  email: string;
  role: string;
}

interface Department {
  department: string;
  members: Member[];
}

interface DepartmentStore {
  departments: Department[];
  loading: boolean;
  fetchDepartments: () => Promise<void>;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  loading: true,

  fetchDepartments: async () => {
    set({ loading: true });
    try {
      const data = await GetDepartmentsService();
      set({ departments: data });
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
