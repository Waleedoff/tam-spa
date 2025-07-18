import { useFormik } from 'formik';
import { InputField } from 'src/components/common/ui/Input';
import { Button } from 'src/components/common/ui/Button';
import { CreateAnnouncementFormData } from './announcement-form.data';
import { CreateAnnouncementValidationSchema } from './announcement-form.validation';
import { CreateAnnouncemnt } from 'src/core/types/user.type';

const DepartmentOptions = [
  'DEVOLOPER',
  'BUSINESS',
  'HR',
  'FINAINC',
  'HUNTER',
  'MARKETING',
];

const RoleOptions = ['MANAGER', 'EMP', 'TRAINER', 'FINAINC', 'HUNTER'];

interface AnnouncementFormProps {
  onSubmit: (values: CreateAnnouncemnt) => void;
}

export default function CreateAnnouncementForm({
  onSubmit,
}: AnnouncementFormProps) {
  const formik = useFormik({
    initialValues: CreateAnnouncementFormData,
    validationSchema: CreateAnnouncementValidationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  const handleCheckboxChange = (
    fieldName: 'target_roles' | 'target_departments',
    value: string,
  ) => {
    const selectedValues = formik.values[fieldName];
    const isSelected = selectedValues.includes(value);

    const updatedValues = isSelected
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    formik.setFieldValue(fieldName, updatedValues);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 md:pl-64">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-10"
      >
        <h2 className="text-center text-2xl font-bold text-tamPurple-tam sm:text-3xl">
          Create Announcement
        </h2>
        <p className="text-center text-sm text-gray-500">
          Share your message with your team
        </p>

        <div className="space-y-5">
          <InputField
            name="title"
            label="Title"
            placeholder="Announcement title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.title ? !formik.errors.title : undefined}
            error={formik.touched.title ? formik.errors.title : ''}
          />

          <InputField
            name="content"
            label="Content"
            placeholder="Write your announcement here..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.content ? !formik.errors.content : undefined
            }
            error={formik.touched.content ? formik.errors.content : ''}
          />

          {/* Target Roles */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Target Roles (Optional)
            </label>
            <div className="flex flex-wrap gap-3">
              {RoleOptions.map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formik.values.target_roles.includes(role)}
                    onChange={() => handleCheckboxChange('target_roles', role)}
                  />
                  {role}
                </label>
              ))}
            </div>
            {formik.touched.target_roles && formik.errors.target_roles && (
              <p className="mt-1 text-sm text-red-500">
                {(formik.errors.target_roles as string) ?? ''}
              </p>
            )}
          </div>

          {/* Target Departments */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Target Departments (Optional)
            </label>
            <div className="flex flex-wrap gap-3">
              {DepartmentOptions.map((dep) => (
                <label
                  key={dep}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formik.values.target_departments.includes(dep)}
                    onChange={() =>
                      handleCheckboxChange('target_departments', dep)
                    }
                  />
                  {dep}
                </label>
              ))}
            </div>
            {formik.touched.target_departments &&
              formik.errors.target_departments && (
                <p className="mt-1 text-sm text-red-500">
                  {(formik.errors.target_departments as string) ?? ''}
                </p>
              )}
          </div>
        </div>

        <Button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="hover:bg-tamPurple-dark w-full rounded-xl bg-tamPurple-tam py-3 text-white transition-all duration-200 disabled:opacity-50"
        >
          Create Announcement
        </Button>
      </form>
    </div>
  );
}
