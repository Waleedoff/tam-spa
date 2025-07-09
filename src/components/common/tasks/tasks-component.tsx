import { Card } from 'src/components/common/ui/Card';

interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
}

interface TaskBoardProps {
  tasks: TaskType[];
}

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const columns = [
    { title: 'Pending', status: 'PENDING', color: 'bg-yellow-100' },
    { title: 'In Progress', status: 'IN_PROGRESS', color: 'bg-blue-100' },
    { title: 'Completed', status: 'COMPLETED', color: 'bg-green-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 pl-64">
      <h2 className="mb-8 ml-4 font-modern text-3xl font-bold text-tamPurple-tam">
        Tasks Board
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((col) => (
          <div key={col.status}>
            <h3 className="mb-4 text-lg font-semibold">{col.title}</h3>
            <div className="space-y-4">
              {tasks
                .filter((t) => t.status === col.status)
                .map((task) => (
                  <Card
                    key={task.id}
                    title={task.title}
                    //   color="White"
                    //   variant="White"
                    className="border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Priority: {task.priority}</span>
                      <span>Status: {task.status}</span>
                    </div>
                  </Card>
                ))}
              {tasks.filter((t) => t.status === col.status).length === 0 && (
                <div className="text-sm italic text-gray-400">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
