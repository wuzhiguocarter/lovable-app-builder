import { LayoutDashboard, Users, TrendingUp, FileText, Settings, AlertTriangle, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: '监控看板', icon: LayoutDashboard },
  { id: 'customers', label: '客户明细', icon: Users },
  { id: 'analysis', label: '行业分析', icon: Building2 },
  { id: 'trends', label: '趋势预测', icon: TrendingUp },
  { id: 'alerts', label: '预警管理', icon: AlertTriangle },
  { id: 'reports', label: '报表导出', icon: FileText },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">房贷预警系统</h1>
            <p className="text-xs text-muted-foreground">Risk Monitor v2.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'nav-item w-full text-left',
              activeTab === item.id && 'active'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="nav-item w-full text-left">
          <Settings className="w-5 h-5" />
          <span>系统设置</span>
        </button>
        <div className="mt-4 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">系统运行正常</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            最后更新: {new Date().toLocaleString('zh-CN')}
          </p>
        </div>
      </div>
    </aside>
  );
}
