
import OverviewBanner from 'src/components/user/dashboard/OverviewBanner';
import TaskStatisticsContainer from 'src/containers/user/overview/TaskStatistics';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 md:px-6 lg:pl-64 space-y-6">

      <OverviewBanner />
     <TaskStatisticsContainer />;
      
    </div>
  );
}
