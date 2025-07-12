import { useEffect, useState } from 'react';
import RecentTasksList from 'src/components/dashboard/RecentTasksList';
import TaskProgressChart from 'src/components/dashboard/TaskProgressChart';
import TaskStatsCards from 'src/components/dashboard/TaskStatsCards';
import WeeklyActivityChart from 'src/components/dashboard/WeeklyActivityChart';
import { TaskStatistics } from 'src/core/types/user.type';
import { getStatisticsService } from 'src/services/https-service';

export default function TaskStatisticsContainer() {
  const [data, setData] = useState<TaskStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const res = await getStatisticsService();
        setData(res);
      } catch (err) {
        console.error('Error fetching task statistics:', err);
        setError('تعذر تحميل إحصائيات المهام');
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  if (loading) return <p>جاري تحميل إحصائيات المهام...</p>;
  if (error || !data) return <p>{error || 'لا توجد بيانات'}</p>;

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 md:px-8">
      <TaskStatsCards stats={data} />

      <div className="scrollbar-hide flex flex-col gap-4 overflow-x-auto md:grid md:grid-cols-2">
        <div className="min-w-[320px]">
          <TaskProgressChart stats={data} />
        </div>
        <div className="min-w-[320px]">
          <WeeklyActivityChart />
        </div>
      </div>

      <RecentTasksList recentTasks={data.recent_tasks} />
    </div>
  );
}
