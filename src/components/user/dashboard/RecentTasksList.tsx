const tasks = [
    { title: "Fix onboarding bug", status: "IN_PROGRESS" },
    { title: "Design system tokens", status: "PENDING" },
    { title: "Write API docs", status: "COMPLETED" },
  ];
  
  export default function RecentTasksList() {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
        <ul className="space-y-3">
          {tasks.map((task, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{task.title}</span>
              <span className="italic text-gray-500">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  