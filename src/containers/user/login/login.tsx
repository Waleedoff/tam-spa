// src/pages/Login.tsx
import LoginForm from 'src/components/user/login-form/login-form';
import { UserLoginType } from 'src/core/types/user.type';
import { postLoginService } from 'src/services/https-service';
import { useNavigate } from 'react-router-dom';
import { appRoutesObj } from 'src/app.paths';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (data: UserLoginType) => {
    try {
      await postLoginService(data);
      console.log(toast.success('Logged in successfully!'));
      toast.success('Logged in successfully!');
      navigate(appRoutesObj.getHomePath());
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
