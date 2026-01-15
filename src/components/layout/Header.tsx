import { Bell, Search, User, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export function Header({ timeRange, onTimeRangeChange }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户ID、姓名..."
          className="pl-10 bg-secondary border-border"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-32 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">近1个月</SelectItem>
              <SelectItem value="3m">近3个月</SelectItem>
              <SelectItem value="6m">近6个月</SelectItem>
              <SelectItem value="1y">近1年</SelectItem>
              <SelectItem value="3y">近3年</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-danger-foreground text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium">管理员</p>
            <p className="text-xs text-muted-foreground">风控部门</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
