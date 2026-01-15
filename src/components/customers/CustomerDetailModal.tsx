import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Mail, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import type { OverdueCustomer } from '@/data/mockData';

interface CustomerDetailModalProps {
  customer: OverdueCustomer | null;
  open: boolean;
  onClose: () => void;
}

export function CustomerDetailModal({ customer, open, onClose }: CustomerDetailModalProps) {
  if (!customer) return null;

  const riskLevel = customer.overdueCount >= 4 ? '高风险' : customer.overdueCount >= 2 ? '中风险' : '低风险';
  const riskColor = customer.overdueCount >= 4 ? 'text-danger' : customer.overdueCount >= 2 ? 'text-warning' : 'text-success';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {customer.customerName[0]}
            </div>
            <div>
              <span>{customer.customerName}</span>
              <span className="text-sm text-muted-foreground ml-2">({customer.customerId})</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Risk Alert */}
          <div className={`flex items-center gap-3 p-4 rounded-lg bg-card border border-border`}>
            <AlertTriangle className={`w-5 h-5 ${riskColor}`} />
            <div>
              <span className={`font-medium ${riskColor}`}>{riskLevel}</span>
              <span className="text-muted-foreground ml-2">
                累计逾期 {customer.overdueCount} 次，共 {customer.totalOverdueDays} 天
              </span>
            </div>
          </div>

          {/* Customer Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground">基本信息</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">年龄</span>
                  <span>{customer.age} 岁</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">职业</span>
                  <span>{customer.profession}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">行业</span>
                  <span>{customer.industry}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-muted-foreground">贷款信息</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">贷款金额</span>
                  <span className="font-medium">¥{customer.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">当前逾期金额</span>
                  <span className="font-medium text-danger">¥{customer.currentOverdueAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">逾期原因</span>
                  <span className="badge-status badge-warning">{customer.overdueReason}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-muted-foreground">联系方式</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{customer.customerId.toLowerCase()}@email.com</span>
              </div>
            </div>
          </div>

          {/* Overdue History */}
          <div className="space-y-4">
            <h4 className="font-medium text-muted-foreground">逾期历史</h4>
            <div className="space-y-2">
              {[...Array(Math.min(customer.overdueCount, 3))].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">2024-{String(12 - i).padStart(2, '0')}-{String(10 + i * 5).padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">逾期 {5 + i * 3} 天</span>
                    <span className="text-sm font-medium text-danger">¥{(customer.currentOverdueAmount / customer.overdueCount * (i + 1)).toFixed(0)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
