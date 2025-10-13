import { useEffect, useRef } from "react";
import { useChatStore } from "src/core/stores/chatStore";

// src/hooks/useChatSocket.ts
export function useChatSocket(roomId: string, username: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const { addMessage, setRoomId, clearMessages } = useChatStore();

  useEffect(() => {
    setRoomId(roomId);
    clearMessages();
    const token = localStorage.getItem('token');
    const socket = new WebSocket(`ws://localhost:3002/chat/ws/rooms/${roomId}?token=${token}`);
    
    socketRef.current = socket;

    socket.onopen = () => console.log('✅ WebSocket connected');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addMessage({
        sender: data.username,
        text: data.message,
        me: data.username === username,

      });
    };

    socket.onclose = () => console.log('❌ WebSocket closed');
    socket.onerror = (e) => console.error('WebSocket error:', e);

    return () => {
      socket.close();
    };
  }, [roomId]);

  const sendMessage = (text: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({ content: text, room_id: roomId }));
    addMessage({ sender: username,  text, me: true });
  };

  return { sendMessage };
}
