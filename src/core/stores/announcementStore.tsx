import { create } from 'zustand';
import {
  GetAllAnnouncementService,
} from 'src/services/https-service';

interface Announcement {
  id: string;
  title: string;
  content: string;
  media_url: string;
  vote: {
    helpfull: number;
    unhelpfull: number;
  };
}

interface AnnouncementStore {
  announcements: Announcement[];
  loading: boolean;
  fetchAnnouncements: () => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  announcements: [],
  loading: false,
  fetchAnnouncements: async () => {
    set({ loading: true });
    try {
      const data = await GetAllAnnouncementService();
      set({ announcements: data });
    } catch (error) {
      console.error('Error loading announcements:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
