import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const data = [
  { day: 'Mon', tasks: 2 },
  { day: 'Tue', tasks: 3 },
  { day: 'Wed', tasks: 1 },
  { day: 'Thu', tasks: 4 },
  { day: 'Fri', tasks: 2 },
  { day: 'Sat', tasks: 0 },
  { day: 'Sun', tasks: 0 },
];

export default function WeeklyActivityChart() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold">Weekly Activity</h3>
      <BarChart width={350} height={250} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tasks" fill="#6366f1" />
      </BarChart>
    </div>
  );
}
