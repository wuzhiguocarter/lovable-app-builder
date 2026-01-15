// 模拟数据 - 银行房贷逾期风险预警系统

export interface Customer {
  customerId: string;
  age: number;
  profession: string;
  industry: string;
  monthlyIncome: number;
  maritalStatus: string;
  educationLevel: string;
}

export interface Loan {
  loanId: string;
  customerId: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanToValue: number;
  monthlyRepayment: number;
  loanAge: number;
}

export interface RepaymentRecord {
  recordId: number;
  loanId: string;
  repaymentDate: string;
  dueDate: string;
  repaymentStatus: '正常' | '逾期';
  overdueDays: number;
  overdueAmount: number;
}

export interface OverdueCustomer {
  customerId: string;
  customerName: string;
  age: number;
  profession: string;
  industry: string;
  loanAmount: number;
  overdueCount: number;
  totalOverdueDays: number;
  currentOverdueAmount: number;
  phone: string;
  overdueReason: string;
}

// 逾期原因分布
export const overdueReasons = [
  { reason: '就业与收入问题', percentage: 45, subReasons: [
    { name: '失业', value: 20 },
    { name: '收入降低', value: 15 },
    { name: '行业不景气致薪资下滑', value: 10 },
  ]},
  { reason: '重大突发事件', percentage: 30, subReasons: [
    { name: '突发重大疾病', value: 12 },
    { name: '意外事件', value: 8 },
    { name: '家庭变故', value: 6 },
    { name: '自然灾害', value: 4 },
  ]},
  { reason: '资金周转问题', percentage: 15, subReasons: [
    { name: '创业失利', value: 7 },
    { name: '投资亏损', value: 5 },
    { name: '临时资金紧张', value: 3 },
  ]},
  { reason: '其他原因', percentage: 10, subReasons: [
    { name: '遗忘还款日期', value: 5 },
    { name: '银行系统故障', value: 3 },
    { name: '还款意愿改变', value: 2 },
  ]},
];

// 年龄段分布
export const ageDistribution = [
  { ageGroup: '25-34岁', count: 2350, overdueRate: 3.8 },
  { ageGroup: '35-44岁', count: 4120, overdueRate: 5.6 },
  { ageGroup: '45-50岁', count: 3280, overdueRate: 6.2 },
  { ageGroup: '51-60岁', count: 1850, overdueRate: 4.1 },
  { ageGroup: '60岁以上', count: 680, overdueRate: 2.9 },
];

// 账龄分布
export const loanAgeDistribution = [
  { period: '0-2年', count: 3200, overdueRate: 2.1 },
  { period: '2-5年', count: 4500, overdueRate: 4.2 },
  { period: '5-8年', count: 3800, overdueRate: 7.8 },
  { period: '8-10年', count: 2100, overdueRate: 5.3 },
  { period: '10年以上', count: 1200, overdueRate: 3.2 },
];

// 行业分布
export const industryDistribution = [
  { industry: '互联网', count: 2800, overdueRate: 4.5, overdueCount: 126 },
  { industry: '房地产', count: 2200, overdueRate: 8.2, overdueCount: 180 },
  { industry: '制造业', count: 3100, overdueRate: 6.8, overdueCount: 211 },
  { industry: '教育', count: 1800, overdueRate: 3.2, overdueCount: 58 },
  { industry: '金融', count: 1500, overdueRate: 2.8, overdueCount: 42 },
  { industry: '服务业', count: 2400, overdueRate: 5.1, overdueCount: 122 },
  { industry: '医疗', count: 1100, overdueRate: 2.4, overdueCount: 26 },
];

// 月度趋势
export const monthlyTrend = [
  { month: '2024-07', totalLoans: 12500, overdueLoans: 625, overdueRate: 5.0, overdueAmount: 5312500 },
  { month: '2024-08', totalLoans: 12680, overdueLoans: 647, overdueRate: 5.1, overdueAmount: 5499500 },
  { month: '2024-09', totalLoans: 12820, overdueLoans: 679, overdueRate: 5.3, overdueAmount: 5771500 },
  { month: '2024-10', totalLoans: 12950, overdueLoans: 700, overdueRate: 5.4, overdueAmount: 5950000 },
  { month: '2024-11', totalLoans: 13100, overdueLoans: 681, overdueRate: 5.2, overdueAmount: 5788500 },
  { month: '2024-12', totalLoans: 13280, overdueLoans: 691, overdueRate: 5.2, overdueAmount: 5873500 },
  { month: '2025-01', totalLoans: 13450, overdueLoans: 699, overdueRate: 5.2, overdueAmount: 5941500 },
];

// 逾期客户明细
export const overdueCustomers: OverdueCustomer[] = [
  { customerId: 'CUST20250001', customerName: '张伟', age: 42, profession: '项目经理', industry: '房地产', loanAmount: 1500000, overdueCount: 3, totalOverdueDays: 45, currentOverdueAmount: 25500, phone: '138****5521', overdueReason: '收入降低' },
  { customerId: 'CUST20250015', customerName: '李娜', age: 38, profession: '销售总监', industry: '制造业', loanAmount: 1200000, overdueCount: 2, totalOverdueDays: 30, currentOverdueAmount: 18000, phone: '139****8832', overdueReason: '失业' },
  { customerId: 'CUST20250023', customerName: '王强', age: 45, profession: '工程师', industry: '互联网', loanAmount: 2000000, overdueCount: 1, totalOverdueDays: 15, currentOverdueAmount: 12000, phone: '136****2245', overdueReason: '临时资金紧张' },
  { customerId: 'CUST20250034', customerName: '赵敏', age: 36, profession: '会计', industry: '教育', loanAmount: 800000, overdueCount: 4, totalOverdueDays: 60, currentOverdueAmount: 32000, phone: '137****6678', overdueReason: '家庭变故' },
  { customerId: 'CUST20250048', customerName: '陈刚', age: 48, profession: '个体户', industry: '服务业', loanAmount: 1800000, overdueCount: 2, totalOverdueDays: 25, currentOverdueAmount: 21500, phone: '135****9901', overdueReason: '创业失利' },
  { customerId: 'CUST20250056', customerName: '刘洋', age: 41, profession: '设计师', industry: '互联网', loanAmount: 950000, overdueCount: 1, totalOverdueDays: 10, currentOverdueAmount: 8500, phone: '138****3312', overdueReason: '遗忘还款日期' },
  { customerId: 'CUST20250067', customerName: '周芳', age: 35, profession: '医生', industry: '医疗', loanAmount: 1100000, overdueCount: 1, totalOverdueDays: 8, currentOverdueAmount: 9200, phone: '139****4456', overdueReason: '银行系统故障' },
  { customerId: 'CUST20250078', customerName: '吴军', age: 50, profession: '厂长', industry: '制造业', loanAmount: 2500000, overdueCount: 5, totalOverdueDays: 90, currentOverdueAmount: 75000, phone: '136****7789', overdueReason: '行业不景气致薪资下滑' },
  { customerId: 'CUST20250089', customerName: '郑丽', age: 39, profession: '教师', industry: '教育', loanAmount: 650000, overdueCount: 1, totalOverdueDays: 5, currentOverdueAmount: 5500, phone: '137****8823', overdueReason: '临时资金紧张' },
  { customerId: 'CUST20250095', customerName: '孙涛', age: 44, profession: '销售', industry: '房地产', loanAmount: 1350000, overdueCount: 3, totalOverdueDays: 42, currentOverdueAmount: 28000, phone: '135****1156', overdueReason: '失业' },
];

// 汇总统计
export const summaryStats = {
  totalCustomers: 13450,
  totalLoans: 13450,
  totalLoanAmount: 18672500000, // 186.73亿
  overdueLoans: 699,
  overdueRate: 5.2,
  totalOverdueAmount: 59415000, // 5941.5万
  avgOverdueDays: 28,
  highRiskCustomers: 156,
};

// 行业逾期原因分析（AI分析结果模拟）
export interface IndustryAnalysis {
  industry: string;
  totalCustomers: number;
  overdueCustomers: number;
  overdueRate: number;
  reasons: { reason: string; percentage: number }[];
  comparison: { metric: string; industry: number; average: number }[];
  riskFactors: { factor: string; importance: number }[];
  aiSummary: string;
}

export const getIndustryAnalysis = (industry: string): IndustryAnalysis => {
  const analyses: Record<string, IndustryAnalysis> = {
    '制造业': {
      industry: '制造业',
      totalCustomers: 3100,
      overdueCustomers: 211,
      overdueRate: 6.8,
      reasons: [
        { reason: '收入减少', percentage: 65 },
        { reason: '失业', percentage: 20 },
        { reason: '其他原因', percentage: 15 },
      ],
      comparison: [
        { metric: '逾期率', industry: 6.8, average: 5.2 },
        { metric: '平均逾期天数', industry: 35, average: 28 },
        { metric: '平均逾期金额', industry: 28500, average: 21000 },
      ],
      riskFactors: [
        { factor: '月收入变动', importance: 0.85 },
        { factor: '账龄', importance: 0.72 },
        { factor: '贷款价值比', importance: 0.68 },
        { factor: '年龄', importance: 0.55 },
        { factor: '教育程度', importance: 0.42 },
      ],
      aiSummary: '制造业逾期客户分析显示，65%的逾期主要源于收入减少，这与当前制造业面临的产能过剩、订单减少密切相关。20%的客户因失业导致还款困难，反映出行业结构性调整带来的就业压力。建议针对该行业客户实施差异化风险管理策略，对高风险客户提前介入，提供还款方案调整服务。',
    },
    '房地产': {
      industry: '房地产',
      totalCustomers: 2200,
      overdueCustomers: 180,
      overdueRate: 8.2,
      reasons: [
        { reason: '失业', percentage: 45 },
        { reason: '收入减少', percentage: 35 },
        { reason: '投资亏损', percentage: 12 },
        { reason: '其他原因', percentage: 8 },
      ],
      comparison: [
        { metric: '逾期率', industry: 8.2, average: 5.2 },
        { metric: '平均逾期天数', industry: 42, average: 28 },
        { metric: '平均逾期金额', industry: 35000, average: 21000 },
      ],
      riskFactors: [
        { factor: '就业状态', importance: 0.92 },
        { factor: '月收入', importance: 0.78 },
        { factor: '贷款金额', importance: 0.65 },
        { factor: '账龄', importance: 0.58 },
        { factor: '婚姻状况', importance: 0.35 },
      ],
      aiSummary: '房地产行业逾期率高达8.2%，显著高于全行业平均水平。45%的逾期客户因失业导致，反映出房地产行业调整对从业人员就业的冲击。建议密切关注该行业客户的就业状态变化，建立行业预警机制，对失业客户及时提供还款缓冲方案。',
    },
    '互联网': {
      industry: '互联网',
      totalCustomers: 2800,
      overdueCustomers: 126,
      overdueRate: 4.5,
      reasons: [
        { reason: '失业', percentage: 38 },
        { reason: '收入减少', percentage: 28 },
        { reason: '临时资金紧张', percentage: 22 },
        { reason: '其他原因', percentage: 12 },
      ],
      comparison: [
        { metric: '逾期率', industry: 4.5, average: 5.2 },
        { metric: '平均逾期天数', industry: 18, average: 28 },
        { metric: '平均逾期金额', industry: 15000, average: 21000 },
      ],
      riskFactors: [
        { factor: '就业状态', importance: 0.75 },
        { factor: '年龄', importance: 0.62 },
        { factor: '月收入', importance: 0.58 },
        { factor: '账龄', importance: 0.48 },
        { factor: '教育程度', importance: 0.38 },
      ],
      aiSummary: '互联网行业整体逾期率为4.5%，低于全行业平均水平。虽然失业是主要原因（38%），但该行业客户平均逾期天数和金额较低，显示出较强的自我修复能力。建议针对该行业保持现有风控策略，重点关注中大型互联网公司裁员动态。',
    },
  };

  return analyses[industry] || analyses['制造业'];
};
