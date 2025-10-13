import { create } from 'zustand';
import { getRoomMembersService } from 'src/services/https-service';

type Member = {
  id: string;
  full_name: string;
  email: string;
  gender: string;
  is_online: boolean;
  department: string;
};

type RoomMembersStore = {
  members: Member[];
  loading: boolean;
  error: string | null;
  fetchMembers: (roomId: string) => Promise<void>;
};

export const useRoomMembersStore = create<RoomMembersStore>((set) => ({
  members: [],
  loading: false,
  error: null,
  fetchMembers: async (roomId) => {
    set({ loading: true, error: null });
    try {
      const data = await getRoomMembersService(roomId);
      set({ members: data || [], loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch members', loading: false });
    }
  },
}));
