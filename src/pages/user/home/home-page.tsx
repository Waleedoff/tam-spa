import OverviewBanner from 'src/components/user/dashboard/OverviewBanner';
import RecentTasksList from 'src/components/user/dashboard/RecentTasksList';
import TaskProgressChart from 'src/components/user/dashboard/TaskProgressChart';
import TaskStatsCards from 'src/components/user/dashboard/TaskStatsCards';
import WeeklyActivityChart from 'src/components/user/dashboard/WeeklyActivityChart';

export default function HomePage() {
  return (
    <div className="min-h-screen space-x-10 bg-gray-50 p-6 pl-64">
      <OverviewBanner />
      <TaskStatsCards />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <TaskProgressChart />
        <WeeklyActivityChart />
      </div>
      <div className="mt-8">
        <RecentTasksList />
      </div>
    </div>
  );
}
