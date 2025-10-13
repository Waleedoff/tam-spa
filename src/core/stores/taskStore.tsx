import { create } from 'zustand';
import {
  getAllTasksService,
  postCreateTaskService,
  putUpdateTaskService,
  putUpdateStatusTaskService,
  deleteTaskService,
} from 'src/services/https-service';
import { TaskCreateType } from 'src/core/types/user.type';

type TaskType = TaskCreateType & { id: string };

type TaskStore = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
  fetchTasks: (query?: string) => Promise<void>;
  createTask: (data: TaskCreateType) => Promise<void>;
  updateTask: (id: string, data: TaskCreateType) => Promise<void>;
  updateTaskStatus: (id: string, status: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (query = '') => {
    set({ loading: true, error: null });
    try {
      const data = await getAllTasksService(query);
      set({ tasks: data || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

//   fetchWorkspaceTasks: async (query = ' ') => {
//     set({loading: true, error:  null});
//     try {
//         const data = await getWorkspaceTasksService(query);
//         set({tasks: data ||  [], loading: false});

//     } catch (error) {
//         set({error: "Failed to fetch workspace tasks", loading: false})
        
//     }
//   },

  createTask: async (data) => {
    set({ loading: true, error: null });
    try {
      await postCreateTaskService(data);
      await get().fetchTasks();
    } catch (error) {
      set({ error: 'Failed to create task' });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await putUpdateTaskService(id, data);
      await get().fetchTasks();
    } catch (error) {
      set({ error: 'Failed to update task' });
    } finally {
      set({ loading: false });
    }
  },

  updateTaskStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await putUpdateStatusTaskService(id, status);
      await get().fetchTasks();
    } catch (error) {
      set({ error: 'Failed to update task status' });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTaskService(id);
      await get().fetchTasks();
    } catch (error) {
      set({ error: 'Failed to delete task' });
    } finally {
      set({ loading: false });
    }
  },
}));
