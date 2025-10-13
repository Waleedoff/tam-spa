// src/core/stores/roomStore.ts
import { create } from 'zustand';
import { getAllRoomsService } from 'src/services/https-service';
import { RoomType } from '../types/user.type';

type RoomStore = {
  rooms: RoomType[];
  loading: boolean;
  fetchRooms: () => Promise<void>;
};

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  loading: false,
  fetchRooms: async () => {
    set({ loading: true });
    try {
      const res = await getAllRoomsService(); // ⚠️ يرجع array مباشرة
      console.log('✅ Rooms fetched:', res); // ✅ طبع الـ array مباشرة
      set({ rooms: res }); // ✅ حفظ الـ array
    } catch (err) {
      console.error('❌ Failed to fetch rooms', err);
    } finally {
      set({ loading: false });
    }
  },
}));
