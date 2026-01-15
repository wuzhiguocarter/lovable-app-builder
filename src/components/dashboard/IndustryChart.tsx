import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { industryDistribution } from '@/data/mockData';

interface IndustryChartProps {
  onIndustryClick?: (industry: string) => void;
}

export function IndustryChart({ onIndustryClick }: IndustryChartProps) {
  const getBarColor = (rate: number) => {
    if (rate >= 7) return 'hsl(0, 84%, 60%)';
    if (rate >= 5) return 'hsl(38, 92%, 50%)';
    return 'hsl(142, 76%, 36%)';
  };

  const handleClick = (data: any) => {
    if (onIndustryClick && data?.activePayload?.[0]?.payload?.industry) {
      onIndustryClick(data.activePayload[0].payload.industry);
    }
  };

  return (
    <div className="chart-container h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">行业逾期率分布</h3>
        <span className="text-xs text-muted-foreground">点击柱状图查看详情</span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={industryDistribution} onClick={handleClick}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
          <XAxis 
            dataKey="industry" 
            stroke="hsl(215, 20%, 55%)"
            tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
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
            formatter={(value: number, name: string) => {
              if (name === 'overdueRate') return [`${value}%`, '逾期率'];
              return [value, '逾期客户数'];
            }}
            labelFormatter={(label) => `${label}行业`}
          />
          <Bar dataKey="overdueRate" name="overdueRate" radius={[4, 4, 0, 0]} cursor="pointer">
            {industryDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.overdueRate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
