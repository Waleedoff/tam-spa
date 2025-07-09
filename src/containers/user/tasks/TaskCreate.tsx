import TaskCreateForm from 'src/components/common/tasks/TaskForm';
import { TaskCreateType } from 'src/core/types/user.type';
import { postCreateTaskService } from 'src/services/example-service';

interface TaskCreateProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function TaskCreate({ onSuccess, onClose }: TaskCreateProps) {
  const handleSubmit = async (data: TaskCreateType) => {
    try {
      await postCreateTaskService(data);
      onSuccess();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return <TaskCreateForm onSubmit={handleSubmit} onClose={onClose} />;
}
