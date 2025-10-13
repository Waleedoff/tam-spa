import React from 'react';
import { UserX } from 'lucide-react';
import { UserCard } from '../common/ui/UserCard';

type UserType = {
  id: string;
  username: string;
  department: string;
  gender: string;
};

interface MembersListProps {
  users: UserType[];
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
  onSelectUser: (userId: string) => void;
}

export default function MembersList({
  users,
  loading,
  query,
  setQuery,
  onSelectUser,
}: MembersListProps) {
  return (
    <div className="min-h-screen space-y-6 bg-gray-50 px-4 py-10 md:pl-64">
      {/* Search Input */}
      <div className="mb-6 ml-7 max-w-md">
        <input
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full max-w-xs rounded border px-3 py-2 transition-all"
        />
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500">
            <UserX size={48} className="mb-2" />
            <p className="text-lg font-medium">No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              username={user.username}
              department={user.department}
              gender={user.gender}
              onClick={() => onSelectUser(user.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
