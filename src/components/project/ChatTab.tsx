// src/components/project/ChatTab.tsx
import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useChatSocket } from 'src/hooks/useChatSocket';
import { useChatStore } from 'src/core/stores/chatStore';
import { getRoomChatsService } from 'src/services/https-service';
import { useRoomMembersStore } from 'src/core/stores/roomMembersStore';

interface ChatTabProps {
  roomId: string;
  username: string;
}

export default function ChatTab({ roomId, username }: ChatTabProps) {
  const [newMessage, setNewMessage] = useState('');
  const { messages, addMessage, clearMessages } = useChatStore();
  const { sendMessage } = useChatSocket(roomId, username);
  const { members, fetchMembers } = useRoomMembersStore();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getRoomChatsService(roomId);
        const msgs = response ?? [];

        clearMessages();

        msgs.forEach((msg: any) => {
          addMessage({
            id: msg.id,
            sender: msg.username,
            text: msg.content,
            me: msg.username === username,
          });
        });
      } catch (error) {
        console.error('❌ Failed to fetch messages:', error);
      }
    };

    fetchMessages();
    fetchMembers(roomId);
  }, [roomId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex h-[75vh] rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* قائمة الأعضاء على اليسار */}
      <div className="w-64 border-r p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Members</h2>
        <div className="h-[calc(100%-2rem)] pr-2">
        {members.map((member) => (
  <div key={member.id} className="flex items-center gap-3 mb-3">
    <div className="relative h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800">
      {member.full_name[0]?.toUpperCase()}
      <span
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
          member.is_online ? 'bg-green-500' : 'bg-gray-400'
        }`}
        title={member.is_online ? 'Online' : 'Offline'}
      />
    </div>
    <div>
      <div className="text-sm font-medium text-gray-800">{member.full_name}</div>
      <div className="text-xs text-gray-500">{member.department}</div>
    </div>
  </div>
))}

        </div>
      </div>

      {/* المحادثة على اليمين */}
      <div className="flex flex-col flex-1 justify-between p-4">
        {/* الرسائل */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 h-full">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow ${
                msg.me
                  ? 'ml-auto bg-blue-100 text-blue-800'
                  : 'mr-auto bg-gray-100 text-gray-800'
              }`}
            >
              <p className="break-words">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* إدخال رسالة */}
        <div className="mt-4 flex items-center gap-2 border-t pt-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 rounded-md border px-3 py-2 text-sm shadow-sm"
            placeholder="اكتب رسالة..."
          />
          <button
            onClick={handleSend}
            className="rounded-md bg-tamPurple-tam p-2 text-white hover:bg-black"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
