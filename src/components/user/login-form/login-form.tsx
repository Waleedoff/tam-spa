import { useFormik } from "formik";
import { UserLoginType } from "src/core/types/user.type";
import { LoginFormData } from "./login-form.data";
import { loginValidationSchema } from "./login-form.validation";
import { InputField } from "src/components/common/ui/Input";
import { Button } from "src/components/common/ui/Button";

interface UserLoginProps {
  onSubmit: (values: UserLoginType) => void;
}

export default function LoginForm({ onSubmit }: UserLoginProps) {
  const formik = useFormik<UserLoginType>({
    initialValues: LoginFormData,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center pl-64 bg-gradient-to-br from-gray-50 to-white">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-tamPurple-tam">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
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
            isValid={formik.touched.username ? !formik.errors.username : undefined}
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
            isValid={formik.touched.password ? !formik.errors.password : undefined}
            error={formik.touched.password ? formik.errors.password : ''}
          />
        </div>

        <Button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="w-full rounded-xl bg-tamPurple-tam py-3 text-white hover:bg-tamPurple-dark transition-all duration-200 disabled:opacity-50"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
