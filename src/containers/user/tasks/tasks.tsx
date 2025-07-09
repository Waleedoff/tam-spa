import { useEffect, useState } from "react";
import TaskList from "src/components/common/tasks/tasks-component";
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

  if (loading) {
    return (
      <div className="pl-64 h-screen flex items-center justify-center">
        <span className="text-gray-500 text-sm">Loading tasks...</span>
      </div>
    );
  }

  return <TaskList tasks={tasks} />;
}
