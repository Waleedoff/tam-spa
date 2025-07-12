import { taskCreateInitialValues } from 'src/components/tasks/task-create-form.data';
import TaskCreateForm from 'src/components/tasks/TaskForm';
import { TaskCreateType } from 'src/core/types/user.type';

interface TaskCreateProps {
  onSuccess: (data: TaskCreateType) => void;
  onClose: () => void;
}

export default function TaskCreate({ onSuccess, onClose }: TaskCreateProps) {
  return (
    <TaskCreateForm
      onSubmit={onSuccess}
      onClose={onClose}
      data={taskCreateInitialValues}
      title={'Create Task'}
    />
  );
}
