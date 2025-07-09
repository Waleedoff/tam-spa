import OverviewBanner from "src/components/user/dashboard/OverviewBanner";
import RecentTasksList from "src/components/user/dashboard/RecentTasksList";
import TaskProgressChart from "src/components/user/dashboard/TaskProgressChart";
import TaskStatsCards from "src/components/user/dashboard/TaskStatsCards";
import WeeklyActivityChart from "src/components/user/dashboard/WeeklyActivityChart";

export default function HomePage() {
  return (
    <div className="pl-64 p-6 space-x-10 bg-gray-50 min-h-screen">
      <OverviewBanner />
      <TaskStatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TaskProgressChart />
        <WeeklyActivityChart />
      </div>
      <div className="mt-8">
        <RecentTasksList />
      </div>
    </div>
  );
}
