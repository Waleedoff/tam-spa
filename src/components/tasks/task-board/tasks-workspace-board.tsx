import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getWorkspaceTasksService } from 'src/services/https-service';

export default function TaskWorkspaceBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: 'Pending', status: 'PENDING', color: 'border-purple-500' },
    { title: 'In Progress', status: 'IN_PROGRESS', color: 'border-blue-500' },
    { title: 'Completed', status: 'COMPLETED', color: 'border-green-500' },
  ];

  const fetchTasks = async () => {
    try {
      const result = await getWorkspaceTasksService(searchQuery);
      setTasks(result || []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:pl-64">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="font-sans text-2xl text-tamPurple-tam">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) setShowSearch(false);
              }}
              autoFocus
              className="w-full max-w-xs rounded border px-3 py-2 transition-all"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="ml-0 text-tamPurple-tam hover:text-tamPurple-tam/80 sm:ml-4"
              title="Search tasks"
            >
              <Search className="absolute right-4 top-4 h-5 w-5 sm:static sm:ml-2" />
            </button>
          )}
        </h2>

      </div>

      {/* Modal */}
      

      {/* Task Columns */}
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
        {columns.map((col) => {
          const filteredTasks = tasks.filter(
            (t) =>
              t.status === col.status &&
              t.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            <div
              key={col.status}
              className="w-full shrink-0 snap-start md:w-auto md:snap-none"
            >
              <h3
                className={`mb-4 border-b-2 pb-1 text-lg font-semibold ${col.color}`}
              >
                {col.title}
              </h3>

              <div className="space-y-4">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-28 animate-pulse rounded-xl bg-gray-200 p-4 shadow"
                    />
                  ))
                ) : filteredTasks.length === 0 ? (
                  <div className="text-sm italic text-gray-400">No tasks</div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl border bg-white p-4 shadow transition hover:shadow-md"
                    >
                      <h4 className="text-base font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {task.description || 'No description'}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span>{task.status.replace('_', ' ')}</span>
                        {/* Optional: <span>👤 {task.assignee}</span> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
