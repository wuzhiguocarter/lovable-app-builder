import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { getIndustryAnalysis, industryDistribution } from '@/data/mockData';

const COLORS = ['hsl(0, 84%, 60%)', 'hsl(38, 92%, 50%)', 'hsl(280, 87%, 65%)', 'hsl(142, 76%, 36%)'];

export function IndustryAnalysis() {
  const [selectedIndustry, setSelectedIndustry] = useState('制造业');
  const analysis = getIndustryAnalysis(selectedIndustry);

  return (
    <div className="space-y-6">
      {/* Industry Selector */}
      <div className="chart-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">行业逾期原因分析</h3>
              <p className="text-sm text-muted-foreground">AI大模型驱动的深度分析</p>
            </div>
          </div>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-40 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {industryDistribution.map((item) => (
                <SelectItem key={item.industry} value={item.industry}>
                  {item.industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="stat-label">行业客户数</p>
          <p className="stat-value text-primary">{analysis.totalCustomers.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">逾期客户数</p>
          <p className="stat-value text-warning">{analysis.overdueCustomers}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">行业逾期率</p>
          <p className="stat-value text-danger">{analysis.overdueRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Reason Distribution */}
        <div className="chart-container h-[350px]">
          <h4 className="font-semibold mb-4">逾期原因构成</h4>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={analysis.reasons}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                dataKey="percentage"
                label={({ reason, percentage }) => `${reason} ${percentage}%`}
                labelLine={{ stroke: 'hsl(215, 20%, 55%)', strokeWidth: 1 }}
              >
                {analysis.reasons.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 11%)',
                  border: '1px solid hsl(222, 47%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 98%)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Factors */}
        <div className="chart-container h-[350px]">
          <h4 className="font-semibold mb-4">关键影响因素排序（决策树模型）</h4>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={analysis.riskFactors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
              <XAxis 
                type="number" 
                domain={[0, 1]}
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)' }}
                tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              />
              <YAxis 
                type="category" 
                dataKey="factor" 
                width={100}
                stroke="hsl(215, 20%, 55%)"
                tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 11%)',
                  border: '1px solid hsl(222, 47%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 98%)',
                }}
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, '重要性']}
              />
              <Bar dataKey="importance" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="chart-container">
        <h4 className="font-semibold mb-4">与全行业平均水平对比</h4>
        <div className="grid grid-cols-3 gap-4">
          {analysis.comparison.map((item) => (
            <div key={item.metric} className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">本行业</p>
                  <p className={`text-xl font-bold ${item.industry > item.average ? 'text-danger' : 'text-success'}`}>
                    {item.metric === '逾期率' ? `${item.industry}%` : 
                     item.metric === '平均逾期金额' ? `¥${item.industry.toLocaleString()}` : 
                     `${item.industry}天`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">全行业均值</p>
                  <p className="text-xl font-bold text-muted-foreground">
                    {item.metric === '逾期率' ? `${item.average}%` : 
                     item.metric === '平均逾期金额' ? `¥${item.average.toLocaleString()}` : 
                     `${item.average}天`}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {item.industry > item.average ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-danger" />
                    <span className="text-xs text-danger">高于平均 {((item.industry - item.average) / item.average * 100).toFixed(1)}%</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-xs text-success">低于平均 {((item.average - item.industry) / item.average * 100).toFixed(1)}%</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="chart-container border-l-4 border-primary">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">AI 分析报告</h4>
            <p className="text-muted-foreground leading-relaxed">{analysis.aiSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
