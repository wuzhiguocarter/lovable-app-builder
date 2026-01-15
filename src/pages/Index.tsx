import { useState } from 'react';
import { Users, Wallet, AlertTriangle, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { OverdueReasonChart } from '@/components/dashboard/OverdueReasonChart';
import { AgeDistributionChart } from '@/components/dashboard/AgeDistributionChart';
import { LoanAgeTrendChart } from '@/components/dashboard/LoanAgeTrendChart';
import { IndustryChart } from '@/components/dashboard/IndustryChart';
import { MonthlyTrendChart } from '@/components/dashboard/MonthlyTrendChart';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { IndustryAnalysis } from '@/components/analysis/IndustryAnalysis';
import { summaryStats } from '@/data/mockData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('1y');

  const handleIndustryClick = (industry: string) => {
    setActiveTab('analysis');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Page Title */}
              <div>
                <h2 className="text-2xl font-bold">房贷逾期风险监控</h2>
                <p className="text-muted-foreground mt-1">实时掌握逾期状况，精准识别风险客户</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-6 gap-4">
                <StatCard
                  title="贷款客户总数"
                  value={summaryStats.totalCustomers.toLocaleString()}
                  subtitle="户"
                  icon={Users}
                />
                <StatCard
                  title="贷款总额"
                  value={`${(summaryStats.totalLoanAmount / 100000000).toFixed(2)}亿`}
                  subtitle="元"
                  icon={Wallet}
                />
                <StatCard
                  title="逾期客户数"
                  value={summaryStats.overdueLoans}
                  subtitle="户"
                  icon={AlertTriangle}
                  variant="warning"
                />
                <StatCard
                  title="整体逾期率"
                  value={`${summaryStats.overdueRate}%`}
                  icon={TrendingUp}
                  variant="danger"
                  trend={{ value: 0.2, isPositive: false }}
                />
                <StatCard
                  title="逾期金额"
                  value={`${(summaryStats.totalOverdueAmount / 10000).toFixed(0)}万`}
                  subtitle="元"
                  icon={DollarSign}
                  variant="danger"
                />
                <StatCard
                  title="平均逾期天数"
                  value={summaryStats.avgOverdueDays}
                  subtitle="天"
                  icon={Clock}
                  variant="warning"
                />
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-2 gap-6">
                <OverdueReasonChart />
                <AgeDistributionChart />
              </div>

              {/* Charts Row 2 */}
              <div className="grid grid-cols-2 gap-6">
                <LoanAgeTrendChart />
                <IndustryChart onIndustryClick={handleIndustryClick} />
              </div>

              {/* Monthly Trend */}
              <MonthlyTrendChart />
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">逾期客户明细</h2>
                <p className="text-muted-foreground mt-1">查看逾期客户详细信息，支持导出Excel/CSV</p>
              </div>
              <CustomerTable />
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">行业逾期分析</h2>
                <p className="text-muted-foreground mt-1">AI驱动的行业深度分析，识别关键风险因素</p>
              </div>
              <IndustryAnalysis />
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">趋势预测</h2>
                <p className="text-muted-foreground mt-1">基于历史数据的逾期趋势预测</p>
              </div>
              <MonthlyTrendChart />
              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">预测模型说明</h3>
                <p className="text-muted-foreground">
                  系统采用ARIMA时间序列模型和机器学习算法，结合宏观经济指标、行业景气度、季节性因素等多维数据，
                  预测未来3-6个月的逾期率走势。当前模型预测准确率达85%以上。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">预警管理</h2>
                <p className="text-muted-foreground mt-1">设置预警规则，及时发现风险客户</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card border-l-4 border-danger">
                  <p className="stat-label">高风险预警</p>
                  <p className="stat-value text-danger">{summaryStats.highRiskCustomers}</p>
                  <p className="text-sm text-muted-foreground mt-2">逾期≥3次或累计≥30天</p>
                </div>
                <div className="stat-card border-l-4 border-warning">
                  <p className="stat-label">中风险关注</p>
                  <p className="stat-value text-warning">328</p>
                  <p className="text-sm text-muted-foreground mt-2">逾期1-2次或累计15-30天</p>
                </div>
                <div className="stat-card border-l-4 border-success">
                  <p className="stat-label">正常客户</p>
                  <p className="stat-value text-success">{(summaryStats.totalCustomers - summaryStats.overdueLoans).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">无逾期记录</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">报表导出</h2>
                <p className="text-muted-foreground mt-1">生成并导出各类风险报表</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="chart-container cursor-pointer hover:border-primary transition-colors">
                  <h4 className="font-semibold">逾期汇总报表</h4>
                  <p className="text-sm text-muted-foreground mt-2">包含整体逾期率、金额、客户数等汇总数据</p>
                </div>
                <div className="chart-container cursor-pointer hover:border-primary transition-colors">
                  <h4 className="font-semibold">客户明细报表</h4>
                  <p className="text-sm text-muted-foreground mt-2">逾期客户详细清单，支持自定义字段</p>
                </div>
                <div className="chart-container cursor-pointer hover:border-primary transition-colors">
                  <h4 className="font-semibold">行业分析报表</h4>
                  <p className="text-sm text-muted-foreground mt-2">各行业逾期情况对比分析</p>
                </div>
                <div className="chart-container cursor-pointer hover:border-primary transition-colors">
                  <h4 className="font-semibold">趋势预测报表</h4>
                  <p className="text-sm text-muted-foreground mt-2">历史趋势与未来预测数据</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
