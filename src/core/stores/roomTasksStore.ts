import { getRoomTaskssService } from 'src/services/https-service';
import { create } from 'zustand';

type UserType = {
    id: string;
    full_name: string;
    department: string;
    role: string;
  };

  
type TaskType = {
  id: string;
  title: string;
  desription: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  user_info: UserType
};

type RoomTasksStore = {
  tasks: TaskType[];
  loading: boolean;
  fetchRoomTasks: (roomId: string) => Promise<void>;
  setTasks: (tasks: TaskType[]) => void;
};


export const useRoomTasksStore = create<RoomTasksStore>((set) => ({

  tasks: [],
  loading: false,
  setTasks: (tasks) => set({ tasks }),
  fetchRoomTasks: async (roomId) => {
    set({ loading: true });
    try {
      const result = await getRoomTaskssService(roomId);
      set({ tasks: result ?? [] });
    } finally {
      set({ loading: false });
    }
  },


  // tasks: [],
  // loading: false,
  // fetchRoomTasks: async (roomId: string) => {
  //   set({ loading: true });
  //   try {
  //     const data = await getRoomTaskssService(roomId);
  //     set({ tasks: data });
  //   } catch (error) {
  //     console.error('❌ Failed to fetch room tasks:', error);
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));
