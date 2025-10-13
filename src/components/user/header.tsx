// src/components/user/Sidebar.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Home,
  CheckSquare,
  Users,
  Megaphone,
  Building2,
  Bot,
  FolderKanban,
} from 'lucide-react';

import { appRoutesObj } from 'src/app.paths';
import { SizesEnum, VariantsEnum } from 'src/core/enums/tam.enums';
import { useUserDataStore } from 'src/core/stores/userData.store';
import { ParsedTokenType } from 'src/core/types/user.type';
import { Button } from '../common/ui/Button';
import { useRoomStore } from 'src/core/stores/roomStore';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openTasksSection, setOpenTasksSection] = useState(true);
  const [openOrgSection, setOpenOrgSection] = useState(true);
  const [openMyTasksSubmenu, setOpenMyTasksSubmenu] = useState(false);
  const [openMyRoomsSubmenu, setOpenMyRoomsSubmenu] = useState(false);

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

  const { rooms, loading, fetchRooms } = useRoomStore();

  const handleProjectsClick = async () => {
    if (rooms.length === 0) {
      await fetchRooms(); // استدعاء عند الضغط فقط
    }
    setOpenMyRoomsSubmenu((prev) => !prev);
  };

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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col justify-between border-r border-white/10 bg-tamPurple-tam text-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:flex md:translate-x-0`}
      >
        <button
          className="absolute right-4 top-4 text-white md:hidden"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Top Section */}
        <div className="p-6 pt-14 md:pt-6">
          <Link to={appRoutesObj.getBasePath()}>
            <img
              loading="lazy"
              src="/assets/images/tam_logo.webp"
              alt="Tam Logo"
              className="mb-8 h-12 w-auto"
            />
          </Link>

          <div className="mb-6">
            <Link
              to={appRoutesObj.getChatBotPath()}
              className="hover:bg-tamPurple-dark fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-tamPurple-tam text-white shadow-md transition hover:scale-105"
            >
              <Bot className="h-6 w-6" />
            </Link>
          </div>

          {/* Workspace */}
          <div
            className="mb-1 flex cursor-pointer items-center justify-between text-xs uppercase tracking-wider text-white/60"
            onClick={() => setOpenTasksSection((prev) => !prev)}
          >
            <span>Workspace</span>
            <span>{openTasksSection ? '–' : '+'}</span>
          </div>

          {openTasksSection && (
            <nav className="mb-6 space-y-2">
              <Link
                to={appRoutesObj.getHomePath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 transition duration-200 hover:bg-white hover:text-tamPurple-tam"
              >
                <Home className="h-5 w-5" />
                <span>Overview</span>
              </Link>

              {/* Tasks */}
              <div>
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition duration-200 hover:bg-white hover:text-tamPurple-tam"
                  onClick={() => setOpenMyTasksSubmenu((prev) => !prev)}
                >
                  <CheckSquare className="h-5 w-5" />
                  <span>Tasks</span>
                  <span className="ml-auto">
                    {openMyTasksSubmenu ? '–' : '+'}
                  </span>
                </button>

                {openMyTasksSubmenu && (
                  <div className="ml-8 flex flex-col space-y-1">
                    <Link
                      to={appRoutesObj.getMyTasksPath()}
                      className="rounded-lg px-4 py-1 text-sm hover:bg-white hover:text-tamPurple-tam"
                    >
                      My Tasks
                    </Link>
                    <Link
                      to={appRoutesObj.getAllTasksWorkspacePath()}
                      className="rounded-lg px-4 py-1 text-sm hover:bg-white hover:text-tamPurple-tam"
                    >
                      All Tasks
                    </Link>
                  </div>
                )}
              </div>

              {/* Projects */}
              <div>
                <button
                  onClick={handleProjectsClick}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition duration-200 hover:bg-white hover:text-tamPurple-tam"
                >
                  <FolderKanban className="h-5 w-5" />
                  <span>Projects</span>
                  <span className="ml-auto">
                    {openMyRoomsSubmenu ? '–' : '+'}
                  </span>
                </button>

                {openMyRoomsSubmenu && (
                  <div className="ml-8 flex flex-col space-y-1">
                    {loading && (
                      <p className="text-xs text-white/50">Loading...</p>
                    )}

                    {!loading &&
                      Array.isArray(rooms) &&
                      rooms.map((room) => (
                        <Link
                          key={room.id}
                          to={`/projects/${room.id}`}
                          className="rounded-lg px-4 py-1 text-sm hover:bg-white hover:text-tamPurple-tam"
                        >
                          {room.name}
                        </Link>
                      ))}

                    {/* {!loading && rooms.length === 0 && (
      <p className="text-xs text-white/50">No projects yet.</p>
    )} */}
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Organization */}
          <div
            className="mb-1 mt-6 flex cursor-pointer items-center justify-between text-xs uppercase tracking-wider text-white/60"
            onClick={() => setOpenOrgSection((prev) => !prev)}
          >
            <span>Organization</span>
            <span>{openOrgSection ? '–' : '+'}</span>
          </div>

          {openOrgSection && (
            <nav className="space-y-2">
              <Link
                to={appRoutesObj.getAnnouncementPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white hover:text-tamPurple-tam"
              >
                <Megaphone className="h-5 w-5" />
                <span>Announcements</span>
              </Link>
              <Link
                to={appRoutesObj.getMembersPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white hover:text-tamPurple-tam"
              >
                <Users className="h-5 w-5" />
                <span>Members</span>
              </Link>
              <Link
                to={appRoutesObj.getDepartmentPath()}
                className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white hover:text-tamPurple-tam"
              >
                <Building2 className="h-5 w-5" />
                <span>Departments</span>
              </Link>
            </nav>
          )}
        </div>

        {/* Bottom Section */}
        <div className="space-y-3 border-t border-white/10 p-6">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate(appRoutesObj.getLoginPath())}
                size={SizesEnum.Medium}
                variant={VariantsEnum.Outline}
                className="w-full border-white text-white hover:bg-white hover:text-tamPurple-tam"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate(appRoutesObj.getRegisterPath())}
                size={SizesEnum.Medium}
                variant={VariantsEnum.Outline}
                className="w-full border-white text-white hover:bg-white hover:text-tamPurple-tam"
              >
                Register
              </Button>
            </>
          ) : (
            <p className="text-sm text-white">
              Welcome,{' '}
              <span className="font-semibold">{tokenData?.sub ?? 'User'}</span>
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
