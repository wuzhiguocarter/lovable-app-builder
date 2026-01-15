import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { overdueCustomers, type OverdueCustomer } from '@/data/mockData';
import { CustomerDetailModal } from './CustomerDetailModal';

export function CustomerTable() {
  const [sortField, setSortField] = useState<keyof OverdueCustomer>('currentOverdueAmount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCustomer, setSelectedCustomer] = useState<OverdueCustomer | null>(null);

  const handleSort = (field: keyof OverdueCustomer) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedCustomers = [...overdueCustomers].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const exportToCSV = () => {
    const headers = ['客户ID', '姓名', '年龄', '职业', '行业', '贷款金额', '逾期次数', '累计逾期天数', '当前逾期金额', '逾期原因'];
    const rows = overdueCustomers.map(c => [
      c.customerId, c.customerName, c.age, c.profession, c.industry,
      c.loanAmount, c.overdueCount, c.totalOverdueDays, c.currentOverdueAmount, c.overdueReason
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `逾期客户明细_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const SortIcon = ({ field }: { field: keyof OverdueCustomer }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="chart-container animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">逾期客户明细</h3>
          <p className="text-sm text-muted-foreground mt-1">共 {overdueCustomers.length} 条记录</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          导出CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>客户ID</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>职业</th>
              <th>行业</th>
              <th 
                className="cursor-pointer hover:text-primary"
                onClick={() => handleSort('loanAmount')}
              >
                <div className="flex items-center gap-1">
                  贷款金额 <SortIcon field="loanAmount" />
                </div>
              </th>
              <th 
                className="cursor-pointer hover:text-primary"
                onClick={() => handleSort('overdueCount')}
              >
                <div className="flex items-center gap-1">
                  逾期次数 <SortIcon field="overdueCount" />
                </div>
              </th>
              <th 
                className="cursor-pointer hover:text-primary"
                onClick={() => handleSort('totalOverdueDays')}
              >
                <div className="flex items-center gap-1">
                  累计逾期天数 <SortIcon field="totalOverdueDays" />
                </div>
              </th>
              <th 
                className="cursor-pointer hover:text-primary"
                onClick={() => handleSort('currentOverdueAmount')}
              >
                <div className="flex items-center gap-1">
                  当前逾期金额 <SortIcon field="currentOverdueAmount" />
                </div>
              </th>
              <th>逾期原因</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr key={customer.customerId}>
                <td className="font-mono text-primary">{customer.customerId}</td>
                <td>{customer.customerName}</td>
                <td>{customer.age}</td>
                <td>{customer.profession}</td>
                <td>{customer.industry}</td>
                <td>¥{customer.loanAmount.toLocaleString()}</td>
                <td>
                  <span className={`badge-status ${customer.overdueCount >= 3 ? 'badge-overdue' : 'badge-warning'}`}>
                    {customer.overdueCount}次
                  </span>
                </td>
                <td>
                  <span className={`badge-status ${customer.totalOverdueDays >= 30 ? 'badge-overdue' : 'badge-warning'}`}>
                    {customer.totalOverdueDays}天
                  </span>
                </td>
                <td className="text-danger font-medium">¥{customer.currentOverdueAmount.toLocaleString()}</td>
                <td>{customer.overdueReason}</td>
                <td>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <Eye className="w-4 h-4" />
                    详情
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerDetailModal
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
