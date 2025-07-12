import { RecentTask } from 'src/core/types/user.type';

type Props = {
  recentTasks: RecentTask[];
};

export default function RecentTasksList({ recentTasks }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Tasks</h3>
      <ul className="space-y-4">
        {recentTasks.map((task, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-sm text-gray-700"
          >
            <span className="max-w-[65%] truncate">{task.task}</span>
            <span
              className={`rounded-md px-2 py-1 text-xs italic ${
                task.status === 'COMPLETED'
                  ? 'bg-green-100 text-green-600'
                  : task.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-yellow-100 text-yellow-600'
              }`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
