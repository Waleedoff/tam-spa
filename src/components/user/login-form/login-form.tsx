import { useFormik } from 'formik';
import { UserLoginType } from 'src/core/types/user.type';
import { LoginFormData } from './login-form.data';
import { loginValidationSchema } from './login-form.validation';
import { InputField } from 'src/components/common/ui/Input';
import { Button } from 'src/components/common/ui/Button';

interface UserLoginProps {
  onSubmit: (values: UserLoginType) => void;
}

export default function LoginForm({ onSubmit }: UserLoginProps) {
  const formik = useFormik<UserLoginType>({
    initialValues: LoginFormData,
    validationSchema: loginValidationSchema,
    onSubmit: async (value) => {
      onSubmit(value);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 md:pl-64">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-10"
      >
        <h2 className="text-center text-2xl font-bold text-tamPurple-tam sm:text-3xl">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500">
          Please enter your credentials to continue
        </p>

        <div className="space-y-5">
          <InputField
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.username ? !formik.errors.username : undefined
            }
            error={formik.touched.username ? formik.errors.username : ''}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              formik.touched.password ? !formik.errors.password : undefined
            }
            error={formik.touched.password ? formik.errors.password : ''}
          />
        </div>

        <Button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="hover:bg-tamPurple-dark w-full rounded-xl bg-tamPurple-tam py-3 text-white transition-all duration-200 disabled:opacity-50"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
