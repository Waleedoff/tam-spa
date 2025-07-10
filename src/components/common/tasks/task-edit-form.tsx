import { useFormik } from "formik";
import { InputField } from "src/components/common/ui/Input";
import { Button } from "src/components/common/ui/Button";
import { TaskCreateType } from "src/core/types/user.type";
import { taskEditValidationSchema } from "./task-edit-form.validation";

interface TaskEditFormProps {
  initialValues: TaskCreateType & { id: string };
  onSubmit: (values: TaskCreateType & { id: string }) => void;
  onClose: () => void;
}

export default function TaskEditForm({ initialValues, onSubmit, onClose }: TaskEditFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: taskEditValidationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-tamPurple-tam">Edit Task</h2>

      <InputField
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isValid={formik.touched.title ? !formik.errors.title : undefined}
        error={formik.touched.title ? formik.errors.title : ""}
      />

      <InputField
        name="desription"
        label="Description"
        value={formik.values.desription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isValid={formik.touched.desription ? !formik.errors.desription : undefined}
        error={formik.touched.desription ? formik.errors.desription : ""}
      />

      <div>
        <label className="block font-medium mb-1">Priority</label>
        <select
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        {formik.touched.priority && formik.errors.priority && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.priority}</div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onClose} className="bg-gray-200 text-black">
          Cancel
        </Button>
        <Button type="submit" className="bg-tamPurple-tam text-white">
          Save
        </Button>
      </div>
    </form>
  );
}
