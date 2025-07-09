import { useEffect, useState } from "react";
import TaskBoard from "src/components/common/tasks/tasks-board";
import { getAllTasksService } from "src/services/example-service";

type TaskType = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getAllTasksService();
        setTasks(result || []);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // This is what updates the task's status when dragged between columns
  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Optionally: Send updated status to your backend here
    // await updateTaskStatus(taskId, newStatus);
  };

  if (loading) {
    return (
      <div className="pl-64 h-screen flex items-center justify-center">
        <span className="text-gray-500 text-sm">Loading tasks...</span>
      </div>
    );
  }

  return <TaskBoard tasks={tasks} onStatusChange={handleStatusChange} />;
}
