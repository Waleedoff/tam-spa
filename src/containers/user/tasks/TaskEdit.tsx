import { useTaskStore } from 'src/core/stores/taskStore';
import TaskForm from 'src/components/tasks/TaskForm';
import { TaskCreateType } from 'src/core/types/user.type';

interface TaskEditProps {
  task: TaskCreateType & { id: string };
  onClose: () => void;
}

export default function TaskEdit({ task, onClose }: TaskEditProps) {
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleSubmit = async (data: TaskCreateType) => {
    await updateTask(task.id, data);
    onClose();
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      onClose={onClose}
      data={task}
      title="Edit Task"
    />
  );
}
