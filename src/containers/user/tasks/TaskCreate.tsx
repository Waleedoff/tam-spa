import { useTaskStore } from 'src/core/stores/taskStore';
import TaskCreateForm from 'src/components/tasks/TaskForm';
import { taskCreateInitialValues } from 'src/components/tasks/task-create-form.data';
import { TaskCreateType } from 'src/core/types/user.type';
import TaskForm from 'src/components/tasks/TaskForm';

interface TaskCreateProps {
  onClose: () => void;
}

export default function TaskCreate({ onClose }: TaskCreateProps) {
  const createTask = useTaskStore((state) => state.createTask);

  const handleSubmit = async (data: TaskCreateType) => {
    await createTask(data);
    onClose();
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      onClose={onClose}
      data={taskCreateInitialValues}
      title="Create Task"
    />
  );
}
