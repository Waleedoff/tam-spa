import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { TaskStatistics } from 'src/core/types/user.type';

type Props = {
  stats: TaskStatistics;
};

export default function TaskProgressChart({ stats }: Props) {
  const chartData = [
    { name: 'Completed', value: stats.completed, color: '#34d399' },
    { name: 'In Progress', value: stats.in_progress, color: '#60a5fa' },
    { name: 'Pending', value: stats.pending_count, color: '#facc15' },
  ];

  return (
    <div className="w-full min-w-[320px] rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Task Status Distribution
      </h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
