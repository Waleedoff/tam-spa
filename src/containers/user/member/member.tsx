import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllMembersService,
  getTasksByUserIdService,
} from 'src/services/https-service';
import { UserRegiterType } from 'src/core/types/user.type';
import { UserCard } from 'src/components/common/ui/UserCard';
import { UserX } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Users() {
  const [users, setUsers] = useState<UserRegiterType[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUserTasks, setSelectedUserTasks] = useState<any[]>([]);
  const [showTasksModal, setShowTasksModal] = useState(false);

  const fetchMembers = async (query: string) => {
    setLoading(true);
    try {
      const data = await getAllMembersService(query);
      setUsers(data);
    } catch (error) {
      toast.error('Cannot fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = async (userId: string) => {
    try {
      const tasks = await getTasksByUserIdService(userId);
      setSelectedUserTasks(tasks || []);
      setShowTasksModal(true);
    } catch (err) {
      toast.error('Could not fetch tasks for this user');
    }
  };

  useEffect(() => {
    fetchMembers(q);
  }, [q]);

  return (
    <div className="min-h-screen space-x-5 space-y-6 bg-gray-50 px-4 py-10 md:pl-64">
      {/* Search */}
      <div className="mb-6 ml-7 max-w-md">
        <input
          type="text"
          placeholder="Search user..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          className="w-full max-w-xs rounded border px-3 py-2 transition-all"
        />
      </div>

      {/* Task Modal */}
      {showTasksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-tamPurple-tam">
                User Tasks
              </h3>
              <button
                onClick={() => setShowTasksModal(false)}
                className="text-sm text-gray-500 hover:text-red-500"
              >
                ✖ Close
              </button>
            </div>

            {selectedUserTasks.length === 0 ? (
              <p className="text-gray-500">No tasks found for this user.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {selectedUserTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="group relative w-full rounded-xl bg-white p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    <h4 className="mb-1 text-base font-semibold text-gray-900">
                      {task.title}
                    </h4>

                    {task.desription && (
                      <p className="mb-2 text-sm text-gray-600">
                        {task.desription}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
                      {/* Status */}
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium">
                        {task.status}
                      </span>

                      {/* Priority Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
                          task.priority === 'HIGH'
                            ? 'bg-red-100 text-red-600'
                            : task.priority === 'MEDIUM'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-teal-100 text-teal-600'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {task.priority.toLowerCase()} priority
                      </span>

                      {/* Date */}
                      <span className="inline-block text-gray-400">
                        {formatDistanceToNow(new Date(task.created), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
              specialization={user.department}
              gender={user.gender}
              onClick={() => handleSelectUser(user.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
