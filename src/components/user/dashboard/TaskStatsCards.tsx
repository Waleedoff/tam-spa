const stats = [
  { title: 'Total Tasks', value: 18, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Completed', value: 9, color: 'bg-green-100 text-green-600' },
  { title: 'In Progress', value: 5, color: 'bg-blue-100 text-blue-600' },
  { title: 'Pending', value: 4, color: 'bg-yellow-100 text-yellow-600' },
];

export default function TaskStatsCards() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-xl p-4 shadow-sm ${stat.color}`}
        >
          <p className="text-sm">{stat.title}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
