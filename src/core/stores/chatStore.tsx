// src/core/stores/chatStore.ts
import { getRoomChatsService } from 'src/services/https-service';
import { create } from 'zustand';

export type ChatMessage = {
  id?: string;
  sender: string;
  text: string;
  me: boolean;
};

type ChatStore = {
  roomId: string | null;
  messages: ChatMessage[];
  setRoomId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  clearMessages: () => void;
  fetchMessages: (roomId: string, currentUserId: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set) => ({
  roomId: null,
  messages: [],
  setRoomId: (id) => set({ roomId: id }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (msgs) => set({ messages: msgs }),
  clearMessages: () => set({ messages: [] }),
  
  
  fetchMessages: async (roomId) => {
    const response = await getRoomChatsService(roomId);
    console.log(response)
    const transformed = response.data.map((msg: any) => ({
      id: msg.id,
      sender: msg.user_id,
      text: msg.content,
      me: msg.user_id,
      gender: msg.gender
    }));

    set({ messages: transformed });
  },
}));
