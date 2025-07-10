import { Link } from 'react-router-dom';
import { appRoutesObj } from 'src/app.paths';
import { SizesEnum, VariantsEnum } from 'src/core/enums/tam.enums';
import { jwtDecode } from 'jwt-decode';
import { Home, CheckSquare, Target } from 'lucide-react';

import { Button } from '../common/Button';
import { useUserDataStore } from 'src/core/stores/userData.store';
import { ParsedTokenType } from 'src/core/types/user.type';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserDataStore();

  const storagetoken = localStorage.getItem('token') ?? '';

  const decodeToken = (token: string): ParsedTokenType | null => {
    try {
      return jwtDecode<ParsedTokenType>(token);
    } catch {
      return null;
    }
  };

  const tokenData = decodeToken(storagetoken);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col justify-between border-r border-white/10 bg-tamPurple-tam text-white shadow-xl">
      {/* Top Section - Logo */}
      <div className="p-6">
        <Link to={appRoutesObj.getBasePath()}>
          <img
            loading="lazy"
            src="/assets/images/tam_logo.webp"
            alt="Illustration"
            className="mb-8 h-12 w-auto"
          />
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-2">
          <Link
            to={appRoutesObj.getHomePath()}
            className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
          >
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Link>

          <Link
            to={appRoutesObj.getMyTasksPath()} // تأكد من وجوده في appRoutesObj
            className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
          >
            <CheckSquare className="h-5 w-5" />
            <span>My Tasks</span>
          </Link>

          <Link
            to={appRoutesObj.getBasePath()} // تأكد من وجوده في appRoutesObj
            className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
          >
            <Target className="h-5 w-5" />
            <span>Goals</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Section - Auth Info */}
      <div className="space-y-3 border-t border-white/10 p-6">
        {!isLoggedIn ? (
          <Button
            onClick={() => navigate(appRoutesObj.getLoginPath())}
            size={SizesEnum.Medium}
            variant={VariantsEnum.Outline}
            className="w-full !rounded-xl border-white text-white transition hover:bg-white hover:text-tamPurple-tam"
          >
            Login
          </Button>
        ) : (
          <p className="text-sm text-white">
            Welcome,{' '}
            <span className="font-semibold">{tokenData?.sub ?? 'User'}</span>
          </p>
        )}
        {!isLoggedIn ? (
          <Button
            onClick={() => navigate(appRoutesObj.getRegisterPath())}
            size={SizesEnum.Medium}
            variant={VariantsEnum.Outline}
            className="w-full !rounded-xl border-white text-white transition hover:bg-white hover:text-tamPurple-tam"
          >
            Register
          </Button>
        ) : (
          <p></p>
        )}
      </div>
    </aside>
  );
}
