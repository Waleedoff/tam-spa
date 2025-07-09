import { useNavigate } from "react-router-dom";
import { UserRegiterType } from "src/core/types/user.type";
import { postRegisterService } from "src/services/example-service";
import RegisterForm from "src/components/user/register-form/register-form";
import { appRoutesObj } from "src/app.paths";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: UserRegiterType) => {
    try {
      await postRegisterService(data);
      navigate(appRoutesObj.getLoginPath());
   
    } catch (error) {
      console.error("Error in registration:", error);
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
