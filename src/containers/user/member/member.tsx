import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllMembersService } from 'src/services/https-service';
import { UserRegiterType } from 'src/core/types/user.type';
import { UserCard } from 'src/components/common/ui/UserCard';
import { UserX } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<UserRegiterType[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMembers = async (query: string) => 
  
  {
  setLoading(true);
  try {
  const data = await getAllMembersService(query);
  setUsers(data);
  }
  catch (error) {  
    toast.error('can not fetch data')  
  }
  finally{
      setLoading(false)
  }
  };
  
  useEffect(() => {
    fetchMembers(q);
  }, [q]);


  return (
      <div className="min-h-screen space-x-5 space-y-6 bg-gray-50 px-4 py-10 md:pl-64">
        <div className="ml-7 mb-6 max-w-md">
          <input
              type="text"
              placeholder="Search user..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              className="w-full max-w-xs rounded border px-3 py-2 transition-all"
            />
      </div>
      {/* 🧍‍♂️ Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p></p>
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
              specialization={user.specialization}
              gender={user.gender}
            />
          ))
        )}
      </div>
    </div>
  );
}