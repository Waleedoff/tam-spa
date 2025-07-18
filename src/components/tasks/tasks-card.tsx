import { Pencil, Trash2 } from 'lucide-react';
import { TaskCreateType } from 'src/core/types/user.type';

interface TaskCardProps {
  data: TaskCreateType;
  status: string;
  commentsCount?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskCard({
  data,
  commentsCount,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const priorityColors: Record<string, string> = {
    LOW: 'bg-teal-400',
    MEDIUM: 'bg-yellow-400',
    HIGH: 'bg-red-400',
  };

  const priorityColor =
    priorityColors[data.priority.toUpperCase()] || 'bg-gray-300';

  return (
    <div className="group relative w-full rotate-[-0.4deg] rounded-xl bg-white p-4 shadow-xl shadow-indigo-100 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-2xl sm:w-60">
      {/* Top-right action buttons */}
      <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit?.(data.id)}
          className="text-gray-400 hover:text-tamPurple-tam"
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete?.(data.id)}
          className="text-gray-400 hover:text-red-600"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Card content */}
      <h4 className="mb-1 text-sm font-semibold text-gray-900">{data.title}</h4>

      {data.desription && (
        <p className="mb-2 text-sm leading-relaxed text-gray-600">
          {data.desription}
        </p>
      )}

      {/* Footer info */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1 capitalize">
          <span className={`h-2 w-2 rounded-full ${priorityColor}`} />
          {data.priority.toLowerCase()} priority
        </span>

        {commentsCount !== undefined && (
          <span className="flex items-center gap-1">💬 {commentsCount}</span>
        )}
      </div>
    </div>
  );
}
