// src/components/tasks/task-create-form/task-create-form.tsx
import { useFormik } from 'formik';

import { InputField } from 'src/components/common/ui/Input';
import { Button } from 'src/components/common/ui/Button';
import { TaskCreateType } from 'src/core/types/user.type';
import { taskCreateValidationSchema } from './task-form.validation';

interface TaskCreateFormProps {
  onSubmit: (values: TaskCreateType) => void;
  onClose: () => void;
  data: TaskCreateType;
  title: string;
}

export default function TaskCreateForm({
  onSubmit,
  onClose,
  data,
  title,
}: TaskCreateFormProps) {
  const formik = useFormik<TaskCreateType>({
    initialValues: data,
    validationSchema: taskCreateValidationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 p-4 sm:p-6 w-full"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-tamPurple-tam">
        {title}
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

      <div>
        <label htmlFor="priority" className="mb-1 block font-medium">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Select priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        {formik.touched.priority && formik.errors.priority && (
          <div className="mt-1 text-sm text-red-500">
            {formik.errors.priority}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-black w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-tamPurple-tam text-white w-full sm:w-auto"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
