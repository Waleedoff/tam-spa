import LoginForm from 'src/components/user/login-form/login-form';
import { UserLoginType } from 'src/core/types/user.type';
import { postLoginService } from 'src/services/example-service';
import { useNavigate } from 'react-router-dom';
import { appRoutesObj } from 'src/app.paths';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (data: UserLoginType) => {
    try {
      await postLoginService(data);
      navigate(appRoutesObj.getHomePath());
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return <LoginForm onSubmit={handleSubmit} />;
}
