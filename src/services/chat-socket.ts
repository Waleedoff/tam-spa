// src/services/chat-socket.ts
import { useChatStore } from 'src/core/stores/chatStore';

let socket: WebSocket | null = null;

export function connectToChat(roomId: string, username: string) {
  socket = new WebSocket(`ws://localhost:3002/chat/ws/rooms/${roomId}`);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const { message, username: sender } = data;

    useChatStore.getState().addMessage({
      id: crypto.randomUUID(),
      sender,
      text: message,
      me: sender === username,
    });
  };

  socket.onclose = () => {
    console.log('🔌 WebSocket closed');
  };
}
