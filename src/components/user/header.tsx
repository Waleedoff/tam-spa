import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Home, CheckSquare, Users, Megaphone, Building2 } from 'lucide-react';

import { appRoutesObj } from 'src/app.paths';
import { SizesEnum, VariantsEnum } from 'src/core/enums/tam.enums';
import { useUserDataStore } from 'src/core/stores/userData.store';
import { ParsedTokenType } from 'src/core/types/user.type';
import { Button } from '../common/ui/Button';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openTasksSection, setOpenTasksSection] = useState(true);
  const [openOrgSection, setOpenOrgSection] = useState(true);

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
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-md bg-tamPurple-tam p-2 text-white shadow-md md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col justify-between border-r border-white/10 bg-tamPurple-tam text-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:flex md:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <button className="absolute right-4 top-4 text-white md:hidden" onClick={() => setIsOpen(false)}>
          ✕
        </button>

        {/* Top Section - Logo + Navigation */}
        <div className="p-6 pt-14 md:pt-6">
          <Link to={appRoutesObj.getBasePath()}>
            <img
              loading="lazy"
              src="/assets/images/tam_logo.webp"
              alt="Tam Logo"
              className="mb-8 h-12 w-auto"
            />
          </Link>

          {/* 🧩 Task Workspace Section */}
          <div
            className="flex items-center justify-between text-xs uppercase tracking-wider text-white/60 cursor-pointer mb-1"
            onClick={() => setOpenTasksSection(prev => !prev)}
          >
            <span>Task Workspace</span>
            <span>{openTasksSection ? '–' : '+'}</span>
          </div>

          {openTasksSection && (
            <nav className="space-y-2 mb-6">
              <Link
                to={appRoutesObj.getHomePath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <Home className="h-5 w-5" />
                <span>Overview</span>
              </Link>
              <Link
                to={appRoutesObj.getMyTasksPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <CheckSquare className="h-5 w-5" />
                <span>My Tasks</span>
              </Link>
            </nav>
          )}

          {/* 🏢 Organization Section */}
          <div
            className="flex items-center justify-between text-xs uppercase tracking-wider text-white/60 cursor-pointer mb-1 mt-6"
            onClick={() => setOpenOrgSection(prev => !prev)}
          >
            <span>Organization</span>
            <span>{openOrgSection ? '–' : '+'}</span>
          </div>

          {openOrgSection && (
            <nav className="space-y-2">
              <Link
                to={appRoutesObj.getAnnouncementPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <Users className="h-5 w-5" />
                <span>Announcements</span>
              </Link>
              <Link
                to={appRoutesObj.getMembersPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <Megaphone className="h-5 w-5" />
                <span>Members</span>
              </Link>
              <Link
                to={appRoutesObj.getDepartmentPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <Building2 className="h-5 w-5" />
                <span>Departments</span>
              </Link>
            </nav>
          )}
        </div>

        {/* Bottom Section - Auth Info */}
        <div className="space-y-3 border-t border-white/10 p-6">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate(appRoutesObj.getLoginPath())}
                size={SizesEnum.Medium}
                variant={VariantsEnum.Outline}
                className="w-full !rounded-xl border-white text-white transition hover:bg-white hover:text-tamPurple-tam"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate(appRoutesObj.getRegisterPath())}
                size={SizesEnum.Medium}
                variant={VariantsEnum.Outline}
                className="w-full !rounded-xl border-white text-white transition hover:bg-white hover:text-tamPurple-tam"
              >
                Register
              </Button>
            </>
          ) : (
            <p className="text-sm text-white">
              Welcome, <span className="font-semibold">{tokenData?.sub ?? 'User'}</span>
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
