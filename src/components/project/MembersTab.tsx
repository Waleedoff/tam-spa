import { useEffect } from 'react';
import { UserCard } from '../common/ui/UserCard';
import {useRoomMembersStore} from 'src/core/stores/roomMembersStore'
export default function MembersTab({ roomId }: { roomId: string }) {
  const { members, fetchMembers, loading } = useRoomMembersStore();

  useEffect(() => {
    fetchMembers(roomId);
  }, [roomId]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && members.map((member) => (
        <UserCard
          key={member.id}
          username={member.full_name}
          department={member.department}
          gender={member.gender}
        />
      ))}

      {!loading && members.length === 0 && (
        <p className="text-gray-500 col-span-full text-center">No members found.</p>
      )}
    </div>
  );
}
