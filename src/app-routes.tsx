import React from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { appRoutesObj } from './app.paths';
import TasksPage from './pages/user/tasks-page/tasks-page';
import HomePage from './pages/user/dashboard-page/dashboard-page';

const LoginPage = React.lazy(
  () => import('./pages/user/login-page/login-page'),
);
const RegisterPage = React.lazy(
  () => import('./pages/user/register-page/register-page'),
);

const AnnouncementPage = React.lazy(() => import ('./pages/announcement/announcement-page'))
const MemberPage = React.lazy(() => import('./pages/user/members/member-page'));
const DepartmentPage = React.lazy(() => import ('./pages/department/department-page'))
const withSuspense = (WrappedComponent: JSX.Element) => {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
      {WrappedComponent}
    </Suspense>
  );
};

export function AppRouting() {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
      <Routes>
        <Route
          key="registerPage"
          path={appRoutesObj.getRegisterPath()}
          element={withSuspense(<RegisterPage />)}
        />

        <Route
          key="homePage"
          path={appRoutesObj.getHomePath()}
          element={withSuspense(<HomePage />)}
        />

        <Route
          key="loginPage"
          path={appRoutesObj.getLoginPath()}
          element={withSuspense(<LoginPage />)}
        />

        <Route
          key="tasksPage"
          path={appRoutesObj.getTasksrPath()}
          element={withSuspense(<TasksPage />)}
        />
        <Route
          key="memeberPage"
          path={appRoutesObj.getMembersPath()}
          element={withSuspense(<MemberPage />)}
        />
        <Route
          key="announcmentPage"
          path={appRoutesObj.getAnnouncementPath()}
          element={withSuspense(<AnnouncementPage />)}
        />
        <Route
          key="departmentPage"
          path={appRoutesObj.getDepartmentPath()}
          element={withSuspense(<DepartmentPage />)}
        />
      </Routes>
    </Suspense>
  );
}
