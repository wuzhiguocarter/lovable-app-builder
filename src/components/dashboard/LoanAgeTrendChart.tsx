import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { loanAgeDistribution } from '@/data/mockData';

export function LoanAgeTrendChart() {
  return (
    <div className="chart-container h-[400px]">
      <h3 className="text-lg font-semibold mb-4">账龄与逾期率关系</h3>
      <p className="text-sm text-muted-foreground mb-4">5-8年账龄风险最高，符合国际公认规律</p>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={loanAgeDistribution}>
          <defs>
            <linearGradient id="colorOverdue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
          <XAxis 
            dataKey="period" 
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
          />
          <YAxis 
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 11%)',
              border: '1px solid hsl(222, 47%, 18%)',
              borderRadius: '8px',
              color: 'hsl(210, 40%, 98%)',
            }}
            formatter={(value: number) => [`${value}%`, '逾期率']}
          />
          <Area
            type="monotone"
            dataKey="overdueRate"
            stroke="hsl(0, 84%, 60%)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorOverdue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
