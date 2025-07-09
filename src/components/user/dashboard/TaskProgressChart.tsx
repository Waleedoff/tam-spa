import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Completed', value: 9, color: '#34d399' },
  { name: 'In Progress', value: 5, color: '#60a5fa' },
  { name: 'Pending', value: 4, color: '#facc15' },
];

export default function TaskProgressChart() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold">Task Status Distribution</h3>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
