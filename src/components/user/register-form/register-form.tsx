import { useFormik } from "formik";
import { UserRegiterType } from "src/core/types/user.type";
import { RegisterFormData } from "./register-form.data";
import { registerValidationSchema } from "./register-form.validation";
import { InputField } from "src/components/common/ui/Input";
import { Button } from "src/components/common/ui/Button";

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

  return (
    <div className="min-h-screen flex items-center justify-center pl-64 bg-gradient-to-br from-gray-50 to-white">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg space-y-8 rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-tamPurple-tam">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm">
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
            isValid={formik.touched.full_name ? !formik.errors.full_name : undefined}
            error={formik.touched.full_name ? formik.errors.full_name : ''}
          />

          <InputField
            name="username"
            label="Username"
            placeholder="Choose a username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.username ? !formik.errors.username : undefined}
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
            isValid={formik.touched.password ? !formik.errors.password : undefined}
            error={formik.touched.password ? formik.errors.password : ''}
          />
        </div>

        <Button
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          className="w-full rounded-xl bg-tamPurple-tam py-3 text-white hover:bg-tamPurple-dark transition-all duration-200 disabled:opacity-50"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
