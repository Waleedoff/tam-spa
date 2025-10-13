// src/containers/project/ProjectContainer.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import OverviewTab from 'src/components/project/OverviewTab';
import MembersTab from 'src/components/project/MembersTab';
import ChatTab from 'src/components/project/ChatTab';
import TasksTab from 'src/components/project/TasksTab';
import { useRoomStore } from 'src/core/stores/roomStore';
import { useAuthStore } from 'src/core/stores/authStore';



const tabs = ['overview', 'tasks', 'chat', 'members'] as const;
type Tab = typeof tabs[number];

export default function ProjectContainer() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const {user} = useAuthStore();
  const { rooms } = useRoomStore();
  const room = rooms.find((r) => r.id === id);
  return (
    <div className="min-h-screen w-60% bg-gray-50 p-6 ml-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {room?.name ?? 'Loading...'}
          </h1>

          <div className="mt-1 flex items-center gap-3">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs 
                ${
                  room?.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-700'
                    : room?.status === 'COMPLETED'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
            >
              {room?.status.replace('_', ' ') ?? ''}
            </span>

  
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 capitalize ${
              activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {activeTab === 'overview' && <OverviewTab roomId={id!} />}
        {activeTab === 'tasks' && <TasksTab roomId={id!} />}
        {activeTab === 'chat' && <ChatTab roomId={id!} username={user?.username ?? 'me'} />}
        

        {activeTab === 'members' && <MembersTab roomId={id!} />}
      </div>
    </div>
  );
}
