import { useFormik } from 'formik';
import { UserRegiterType } from 'src/core/types/user.type';
import { RegisterFormData } from './register-form.data';
import { registerValidationSchema } from './register-form.validation';
import { InputField } from 'src/components/common/ui/Input';
import { Button } from 'src/components/common/ui/Button';

interface UserRegisterProps {
  onSubmit: (values: UserRegiterType) => void;
}

export default function RegisterForm({ onSubmit }: UserRegisterProps) {
  const formik = useFormik<UserRegiterType>({
    initialValues: RegisterFormData,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  // src/constants/specialization.ts
  const specializationOptions = [
  { label: 'Developer', value: 'DEVELOPER' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'HR', value: 'HR' },
  { label: 'Finance', value: 'FINANCE' },
  { label: 'Hunter', value: 'HUNTER' },
];


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 md:pl-64">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-10"
      >
        <h2 className="text-center text-2xl font-bold text-tamPurple-tam sm:text-3xl">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500">
          Fill in your details to get started
        </p>

        <div className="space-y-5">
          <InputField
            name="full_name"
            label="Full Name"
            placeholder="Enter your full name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.full_name ? !formik.errors.full_name : undefined
            }
            error={formik.touched.full_name ? formik.errors.full_name : ''}
          />

          <InputField
            name="username"
            label="Username"
            placeholder="Choose a username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.username ? !formik.errors.username : undefined
            }
            error={formik.touched.username ? formik.errors.username : ''}
          />

          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.email ? !formik.errors.email : undefined}
            error={formik.touched.email ? formik.errors.email : ''}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Create a password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.password ? !formik.errors.password : undefined
            }
            error={formik.touched.password ? formik.errors.password : ''}
          />
          <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-1 block w-full rounded-md border ${
            formik.touched.gender && formik.errors.gender
              ? 'border-red-500'
              : 'border-gray-300'
          } shadow-sm focus:border-tamPurple-tam focus:ring focus:ring-tamPurple-tam/20`}
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.gender}</p>
        )}
      </div>

<div>
  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
    Specialization
  </label>
  <select
    id="specialization"
    name="specialization"
    value={formik.values.specialization}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className={`mt-1 block w-full rounded-md border ${
      formik.touched.specialization && formik.errors.specialization
        ? 'border-red-500'
        : 'border-gray-300'
    } shadow-sm focus:border-tamPurple-tam focus:ring focus:ring-tamPurple-tam/20`}
  >
   <option value="">Select specialization</option>
    {specializationOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>))}
  </select>
  {formik.touched.specialization && formik.errors.specialization && (
    <p className="mt-1 text-sm text-red-600">{formik.errors.specialization}</p>
  )}
</div>

        </div>

        <Button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="hover:bg-tamPurple-dark w-full rounded-xl bg-tamPurple-tam py-3 text-white transition-all duration-200 disabled:opacity-50"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
