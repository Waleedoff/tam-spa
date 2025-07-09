import { Card } from "src/components/common/ui/Card";

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
    { title: "Pending", status: "PENDING", color: "bg-yellow-100" },
    { title: "In Progress", status: "IN_PROGRESS", color: "bg-blue-100" },
    { title: "Completed", status: "COMPLETED", color: "bg-green-100" },
  ];

  return (
    <div className="min-h-screen pl-64 bg-gray-50 py-10 px-6">
     <h2 className="text-3xl ml-4 font-bold font-modern text-tamPurple-tam mb-8">
  Tasks Board
</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.status}>
            <h3 className="text-lg font-semibold mb-4">{col.title}</h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === col.status).map(task => (
                <Card
                  key={task.id}
                  title={task.title}
                //   color="White"
                //   variant="White"
                  className="shadow-sm hover:shadow-md border border-gray-200"
                >
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Priority: {task.priority}</span>
                    <span>Status: {task.status}</span>
                  </div>
                </Card>
              ))}
              {tasks.filter(t => t.status === col.status).length === 0 && (
                <div className="text-sm text-gray-400 italic">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
