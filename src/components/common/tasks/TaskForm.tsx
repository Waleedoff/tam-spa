// src/components/tasks/task-create-form/task-create-form.tsx
import { useFormik } from 'formik';

import { InputField } from 'src/components/common/ui/Input';
import { Button } from 'src/components/common/ui/Button';
import { TaskCreateType } from 'src/core/types/user.type';
import { taskCreateInitialValues } from './task-create-form.data';
import { taskCreateValidationSchema } from './task-form.validation';

interface TaskCreateFormProps {
  onSubmit: (values: TaskCreateType) => void;
  onClose: () => void;
}

export default function TaskCreateForm({
  onSubmit,
  onClose,
}: TaskCreateFormProps) {
  const formik = useFormik<TaskCreateType>({
    initialValues: taskCreateInitialValues,
    validationSchema: taskCreateValidationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-tamPurple-tam">
        Create New Task
      </h2>

      <InputField
        name="title"
        label="Title"
        placeholder="Enter task title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isValid={formik.touched.title ? !formik.errors.title : undefined}
        error={formik.touched.title ? formik.errors.title : ''}
      />

      <InputField
        name="desription"
        label="Description"
        placeholder="Enter task description"
        value={formik.values.desription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isValid={
          formik.touched.desription ? !formik.errors.desription : undefined
        }
        error={formik.touched.desription ? formik.errors.desription : ''}
      />

      <InputField
        name="priority"
        label="Priority"
        placeholder="LOW / MEDIUM / HIGH"
        value={formik.values.priority}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isValid={formik.touched.priority ? !formik.errors.priority : undefined}
        error={formik.touched.priority ? formik.errors.priority : ''}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-black"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-tamPurple-tam text-white">
          Create
        </Button>
      </div>
    </form>
  );
}
