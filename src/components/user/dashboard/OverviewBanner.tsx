import { jwtDecode } from 'jwt-decode';
import { ParsedTokenType } from 'src/core/types/user.type';

export default function OverviewBanner() {


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
      <div className="bg-gradient-to-r space-l-10 ml-6  from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold">Welcome back, <span className="font-semibold">{tokenData?.sub ?? 'User'}</span> 👋</h2>
        <p className="mt-1 text-sm">
          🎉 Complete all your tasks this week and enjoy your Thursday off!
        </p>
      </div>
    );
  }
  