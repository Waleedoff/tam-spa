interface TaskCardProps {
    title: string;
    desription?: string;
    priority: string;
    status: string;
    commentsCount?: number;
    people?: string[];
  }
  export function TaskCard({
    title,
    desription,
    priority,
    // status,
    commentsCount,
    // people,
  }: TaskCardProps) {
    const priorityColors: Record<string, string> = {
      LOW: "bg-teal-500",
      MEDIUM: "bg-orange-500",
      HIGH: "bg-rose-500",
    };
  
    const priorityColor = priorityColors[priority.toUpperCase()] || "bg-gray-300";
  
    return (
      <div className="bg-white rounded-lg shadow p-4 border relative">
        <h4 className="text-sm font-semibold text-tamPurple-tam mb-1">
  {title}
</h4>
  
        {desription && <p className="text-sm text-gray-600 mb-2">{desription}</p>}
  
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span className="flex items-center gap-1 capitalize">
            <span className={`w-2 h-2 rounded-full ${priorityColor}`}></span>
            {priority.toLowerCase()} priority
          </span>
          {commentsCount !== undefined && (
            <span>{commentsCount} comments</span>
          )}
        </div>
      </div>
    );
  }
  