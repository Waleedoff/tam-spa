import React from 'react';
import { formatDistanceToNow } from 'date-fns';

type TaskType = {
  id: string;
  title: string;
  desription?: string;
  status: string;
  priority: string;
  created: string;
};

interface TasksModalProps {
  tasks: TaskType[];
  onClose: () => void;
}

export default function TasksModal({ tasks, onClose }: TasksModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-4">
      <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-tamPurple-tam">User Tasks</h3>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            ✖ Close
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found for this user.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tasks.map((task) => (
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
                  {/* Priority */}
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
  );
}
