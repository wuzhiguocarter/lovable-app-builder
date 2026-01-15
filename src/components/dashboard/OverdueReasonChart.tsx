import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { overdueReasons } from '@/data/mockData';

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(38, 92%, 50%)', 'hsl(280, 87%, 65%)', 'hsl(142, 76%, 36%)'];

export function OverdueReasonChart() {
  const data = overdueReasons.map((item, index) => ({
    name: item.reason,
    value: item.percentage,
    fill: COLORS[index],
  }));

  return (
    <div className="chart-container h-[400px]">
      <h3 className="text-lg font-semibold mb-4">逾期原因分布</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
            labelLine={{ stroke: 'hsl(215, 20%, 55%)', strokeWidth: 1 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 11%)',
              border: '1px solid hsl(222, 47%, 18%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
            formatter={(value: number) => [`${value}%`, '占比']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span style={{ color: 'hsl(210, 40%, 98%)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
