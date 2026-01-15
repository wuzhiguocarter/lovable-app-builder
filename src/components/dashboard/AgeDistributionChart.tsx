import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ageDistribution } from '@/data/mockData';

export function AgeDistributionChart() {
  const getBarColor = (rate: number) => {
    if (rate >= 6) return 'hsl(0, 84%, 60%)';
    if (rate >= 5) return 'hsl(38, 92%, 50%)';
    return 'hsl(217, 91%, 60%)';
  };

  return (
    <div className="chart-container h-[400px]">
      <h3 className="text-lg font-semibold mb-4">年龄段逾期分布</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={ageDistribution} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
          <XAxis 
            type="number" 
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
          />
          <YAxis 
            type="category" 
            dataKey="ageGroup" 
            width={80}
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 11%)',
              border: '1px solid hsl(222, 47%, 18%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'overdueRate') return [`${value}%`, '逾期率'];
              return [value, '客户数'];
            }}
          />
          <Bar dataKey="overdueRate" name="overdueRate" radius={[0, 4, 4, 0]}>
            {ageDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.overdueRate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-danger" />
          <span className="text-xs text-muted-foreground">高风险 ≥6%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-warning" />
          <span className="text-xs text-muted-foreground">中风险 5-6%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">低风险 &lt;5%</span>
        </div>
      </div>
    </div>
  );
}
