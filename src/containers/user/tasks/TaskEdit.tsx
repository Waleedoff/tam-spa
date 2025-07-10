import { TaskCreateType } from 'src/core/types/user.type';
import TaskForm from 'src/components/common/tasks/TaskForm'; // أو أي form مشابه

interface TaskEditProps {
  task: TaskCreateType;
  onSuccess: (data: TaskCreateType) => void;
  onClose: () => void;
}

export default function TaskEdit({ task, onSuccess, onClose }: TaskEditProps) {
  return (
    <TaskForm
      onClose={onClose}
      onSubmit={onSuccess}
      data={task}
      title={'Edit Task'}
    />
  );
}
