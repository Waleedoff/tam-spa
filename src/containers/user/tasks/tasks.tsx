import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TaskList from 'src/components/common/tasks/tasks-component';
import { getAllTasksService } from 'src/services/example-service';

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
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getAllTasksService(search);
        toast.success("Task created successfully!");
        console.log(setSearch);
        setTasks(result || []);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center pl-64">
        <span className="text-sm text-gray-500">Loading tasks...</span>
      </div>
    );
  }

  return <TaskList tasks={tasks} />;
}
