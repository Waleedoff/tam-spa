import { TaskStatistics } from 'src/core/types/user.type';

type Props = {
  stats: TaskStatistics;
};

export default function TaskStatsCards({ stats }: Props) {
  const statList = [
    {
      title: 'Total Tasks',
      value: stats.pending_count + stats.in_progress + stats.completed,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'In Progress',
      value: stats.in_progress,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Pending',
      value: stats.pending_count,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {statList.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl p-5 shadow-md transition duration-200 hover:scale-[1.01] hover:shadow-lg ${stat.color}`}
        >
          <p className="text-sm font-medium text-gray-700">{stat.title}</p>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
