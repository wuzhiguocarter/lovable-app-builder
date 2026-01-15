import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { monthlyTrend } from '@/data/mockData';

export function MonthlyTrendChart() {
  return (
    <div className="chart-container h-[400px]">
      <h3 className="text-lg font-semibold mb-4">逾期趋势月度变化</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={monthlyTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
            tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 11%)',
              border: '1px solid hsl(222, 47%, 18%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
            formatter={(value: number, name: string) => {
              if (name === '逾期率') return [`${value}%`, name];
              if (name === '逾期金额') return [`¥${(value / 10000).toFixed(2)}万`, name];
              return [value, name];
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            formatter={(value) => <span style={{ color: 'hsl(210, 40%, 98%)' }}>{value}</span>}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="overdueRate"
            name="逾期率"
            stroke="hsl(0, 84%, 60%)"
            strokeWidth={2}
            dot={{ fill: 'hsl(0, 84%, 60%)', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="overdueAmount"
            name="逾期金额"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth={2}
            dot={{ fill: 'hsl(38, 92%, 50%)', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
