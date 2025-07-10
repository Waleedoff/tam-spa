import { Pencil, Trash2 } from 'lucide-react';
import { TaskCreateType } from 'src/core/types/user.type';

interface TaskCardProps {
  data:TaskCreateType
  status: string;
  commentsCount?: number;
  people?: string[];
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
    LOW: 'bg-teal-500',
    MEDIUM: 'bg-orange-500',
    HIGH: 'bg-rose-500',
  };

  const priorityColor = priorityColors[data.priority.toUpperCase()] || 'bg-gray-300';

  return (
    <div className="group relative rounded-lg border bg-white p-4 shadow">
      {/* Top-right action buttons */}
      <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit?.(data.id)}
          className="text-gray-500 hover:text-tamPurple-tam"
          title="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete?.(data.id)}
          className="text-gray-500 hover:text-red-600"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Card content */}
      <h4 className="mb-1 text-sm font-semibold text-tamPurple-tam">{data.title}</h4>
      {data.desription && <p className="mb-2 text-sm text-gray-600">{data.desription}</p>}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1 capitalize">
          <span className={`h-2 w-2 rounded-full ${priorityColor}`}></span>
          {data.priority.toLowerCase()} priority
        </span>
        {commentsCount !== undefined && <span>{commentsCount} comments</span>}
      </div>
    </div>
  );
}
