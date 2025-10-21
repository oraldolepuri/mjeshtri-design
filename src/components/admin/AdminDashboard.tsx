import { 
  Users, Briefcase, DollarSign, TrendingUp, LogOut, 
  ShieldCheck, AlertCircle, Activity, CheckCircle, Clock,
  BarChart3, UserCheck, Package, ArrowUpRight, ArrowDownRight,
  Eye, ChevronRight, Zap, Shield, Bell, FileText, Megaphone,
  PieChart, Gift, Map, Code, FileSearch, Settings as SettingsIcon,
  LifeBuoy, Database, Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import type { User as UserType } from '../../App';

interface AdminDashboardProps {
  user: UserType;
  onLogout: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

const stats = [
  { 
    label: 'Total Users', 
    value: '1,234', 
    subValue: '456 Customers • 778 Laborers', 
    icon: Users, 
    color: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
    change: '+12%', 
    changeType: 'up',
    trend: [45, 52, 48, 61, 69, 73, 82]
  },
  { 
    label: 'Active Gigs', 
    value: '87', 
    subValue: '34 Completed Today', 
    icon: Briefcase, 
    color: 'from-orange-500 to-orange-600',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-600',
    change: '+5%', 
    changeType: 'up',
    trend: [32, 38, 35, 42, 48, 52, 58]
  },
  { 
    label: 'Total Revenue', 
    value: '456K', 
    subValue: '45.6K This Week', 
    icon: DollarSign, 
    color: 'from-green-500 to-green-600',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-600',
    change: '+18%', 
    changeType: 'up',
    trend: [120, 135, 142, 158, 172, 189, 201]
  },
  { 
    label: 'Platform Health', 
    value: '98.5%', 
    subValue: 'All Systems Operational', 
    icon: Activity, 
    color: 'from-purple-500 to-purple-600',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
    change: '+1.2%', 
    changeType: 'up',
    trend: [95, 96, 97, 97, 98, 98, 99]
  },
];

const quickActions = [
  { label: 'Users', icon: Users, screen: 'admin-users', color: 'blue', badge: '1,234', description: 'Manage all users' },
  { label: 'Gigs', icon: Briefcase, screen: 'admin-gigs', color: 'orange', badge: '87', description: 'Monitor gigs' },
  { label: 'Verify', icon: ShieldCheck, screen: 'admin-verification', color: 'green', badge: '12', description: 'Approve laborers' },
  { label: 'Financial', icon: DollarSign, screen: 'admin-financial', color: 'emerald', description: 'View reports' },
  { label: 'Analytics', icon: BarChart3, screen: 'admin-analytics', color: 'purple', description: 'Platform insights' },
  { label: 'Settings', icon: Activity, screen: 'admin-settings', color: 'slate', description: 'System config' },
];

const recentActivity = [
  { type: 'user', message: 'Ana Krasniqi registered as customer', time: '2m ago', icon: UserCheck, color: 'blue', priority: 'low' },
  { type: 'gig', message: 'Gig "Fix leaking pipe" completed', time: '5m ago', icon: CheckCircle, color: 'green', priority: 'low' },
  { type: 'verification', message: 'Arben Hoxha verified successfully', time: '12m ago', icon: ShieldCheck, color: 'purple', priority: 'medium' },
  { type: 'payment', message: 'Besart Shehu purchased 10 credits', time: '15m ago', icon: Package, color: 'orange', priority: 'low' },
  { type: 'alert', message: 'Low rating alert: Electrical work', time: '23m ago', icon: AlertCircle, color: 'red', priority: 'high' },
  { type: 'gig', message: 'New gig posted: "Install ceiling fan"', time: '28m ago', icon: Briefcase, color: 'blue', priority: 'low' },
];

const pendingItems = [
  { label: 'Pending Verifications', count: 12, status: 'warning', screen: 'admin-verification', icon: Clock, color: 'from-amber-500 to-yellow-500' },
  { label: 'Flagged Reviews', count: 3, status: 'danger', screen: 'admin-reviews', icon: AlertCircle, color: 'from-red-500 to-rose-500' },
  { label: 'Disputed Gigs', count: 2, status: 'danger', screen: 'admin-disputes', icon: AlertCircle, color: 'from-orange-500 to-red-500' },
  { label: 'Support Tickets', count: 7, status: 'info', screen: 'admin-support', icon: Zap, color: 'from-blue-500 to-cyan-500' },
];

const systemServices = [
  { name: 'User Authentication', status: 'operational', uptime: 99.9, responseTime: '45ms' },
  { name: 'Database', status: 'operational', uptime: 99.8, responseTime: '12ms' },
  { name: 'Payment Processing', status: 'operational', uptime: 99.7, responseTime: '230ms' },
  { name: 'Notification Service', status: 'degraded', uptime: 97.2, responseTime: '890ms' },
  { name: 'Chat System', status: 'operational', uptime: 99.5, responseTime: '78ms' },
];

export default function AdminDashboard({ user, onLogout, onNavigate }: AdminDashboardProps) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-500/20' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:bg-orange-500/20' },
      green: { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-500/20' },
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200', hover: 'hover:bg-emerald-500/20' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-500/20' },
      slate: { bg: 'bg-slate-500/10', text: 'text-slate-600', border: 'border-slate-200', hover: 'hover:bg-slate-500/20' },
      red: { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-200', hover: 'hover:bg-red-500/20' },
      indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:bg-indigo-500/20' },
      yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:bg-yellow-500/20' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:bg-cyan-500/20' },
      violet: { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-200', hover: 'hover:bg-violet-500/20' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Welcome Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-gray-900 leading-tight mb-1">Welcome back, {user.name}!</h1>
            <p className="text-sm text-slate-600">Here's what's happening with your platform today</p>
          </div>

          {/* Priority Alerts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pendingItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onNavigate(item.screen)}
                className="group relative overflow-hidden p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-600 mb-0.5">{item.label}</p>
                      <p className="text-2xl text-slate-900">{item.count}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-8 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center backdrop-blur-sm`}>
                      <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {stat.changeType === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-3xl text-slate-900 tracking-tight">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.subValue}</p>
                  </div>

                  {/* Mini Trend Chart */}
                  <div className="mt-4 flex items-end gap-1 h-8">
                    {stat.trend.map((value, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-sm bg-gradient-to-t ${stat.color} opacity-60 group-hover:opacity-100 transition-all`}
                        style={{ height: `${(value / Math.max(...stat.trend)) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Enhanced */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-slate-900 mb-1">Quick Actions</h2>
              <p className="text-sm text-slate-600">Frequently accessed management tools</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = getColorClasses(action.color);
              return (
                <button
                  key={index}
                  onClick={() => onNavigate(action.screen)}
                  className={`group relative overflow-hidden p-5 rounded-2xl border ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative w-14 h-14 rounded-2xl ${colorClasses.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${colorClasses.text}`} />
                      {action.badge && (
                        <div className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                          {action.badge}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-900 mb-1">{action.label}</p>
                    <p className="text-xs text-slate-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-slate-900 mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Advanced Features
              </h2>
              <p className="text-sm text-slate-600">Comprehensive platform management tools</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[
              { label: 'Real-time Analytics', icon: Activity, screen: 'admin-realtime-analytics', color: 'blue' },
              { label: 'Bulk Notifications', icon: Bell, screen: 'admin-bulk-notifications', color: 'purple' },
              { label: 'Advanced Reports', icon: FileText, screen: 'admin-advanced-reporting', color: 'green' },
              { label: 'Announcements', icon: Megaphone, screen: 'admin-announcements', color: 'orange' },
              { label: 'A/B Testing', icon: PieChart, screen: 'admin-ab-testing', color: 'indigo' },
              { label: 'Payment Config', icon: DollarSign, screen: 'admin-payment-gateway', color: 'emerald' },
              { label: 'Rewards Program', icon: Gift, screen: 'admin-rewards-program', color: 'yellow' },
              { label: 'Content Moderation', icon: ShieldCheck, screen: 'admin-content-moderation', color: 'red' },
              { label: 'Role Management', icon: Shield, screen: 'admin-role-management', color: 'blue' },
              { label: 'Revenue Forecast', icon: TrendingUp, screen: 'admin-revenue-forecast', color: 'green' },
              { label: 'Geographic Map', icon: Map, screen: 'admin-geographic-map', color: 'cyan' },
              { label: 'API Management', icon: Code, screen: 'admin-api-management', color: 'indigo' },
              { label: 'Audit Log', icon: FileSearch, screen: 'admin-audit-log', color: 'slate' },
              { label: 'Alert Rules', icon: AlertCircle, screen: 'admin-alert-rules', color: 'orange' },
              { label: 'Report Builder', icon: BarChart3, screen: 'admin-report-builder', color: 'violet' },
              { label: 'Support Tickets', icon: LifeBuoy, screen: 'admin-support-tickets', color: 'blue' },
              { label: 'DB Backups', icon: Database, screen: 'admin-database-backup', color: 'slate' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = getColorClasses(feature.color);
              return (
                <button
                  key={index}
                  onClick={() => onNavigate(feature.screen)}
                  className={`group relative overflow-hidden p-4 rounded-2xl border ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <p className="text-xs text-slate-900">{feature.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Enhanced */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-slate-900 mb-1">Recent Activity</h2>
                  <p className="text-sm text-slate-600">Live platform events</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50 rounded-xl"
                  onClick={() => onNavigate('admin-activity-log')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                const colorClasses = getColorClasses(activity.color);
                return (
                  <div key={index} className="group flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${colorClasses.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${colorClasses.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 leading-relaxed">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-500">{activity.time}</p>
                        {activity.priority === 'high' && (
                          <Badge className="bg-red-100 text-red-700 text-xs">High Priority</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Status Enhanced */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-slate-900 mb-1">System Status</h2>
                  <p className="text-sm text-slate-600">Real-time health monitoring</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50 rounded-xl"
                  onClick={() => onNavigate('admin-system-health')}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {systemServices.map((service, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        service.status === 'operational' 
                          ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                          : 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                      } animate-pulse`}></div>
                      <span className="text-sm text-slate-900">{service.name}</span>
                    </div>
                    <Badge className={
                      service.status === 'operational'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }>
                      {service.status === 'operational' ? 'Operational' : 'Degraded'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Uptime</span>
                      <span className="text-slate-900">{service.uptime}%</span>
                    </div>
                    <Progress value={service.uptime} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Response Time</span>
                      <span className={`${service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {service.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Insights Enhanced */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-white mb-2">Today's Platform Insights</h2>
                <p className="text-blue-100 text-sm">Real-time metrics and performance indicators</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                <p className="text-blue-100 text-sm mb-2">New Signups</p>
                <p className="text-4xl text-white mb-1">24</p>
                <p className="text-xs text-blue-200">+8 from yesterday</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                <p className="text-blue-100 text-sm mb-2">Gigs Posted</p>
                <p className="text-4xl text-white mb-1">18</p>
                <p className="text-xs text-blue-200">+3 from yesterday</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                <p className="text-blue-100 text-sm mb-2">Offers Sent</p>
                <p className="text-4xl text-white mb-1">156</p>
                <p className="text-xs text-blue-200">+42 from yesterday</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                <p className="text-blue-100 text-sm mb-2">Revenue</p>
                <p className="text-4xl text-white mb-1">12.5K</p>
                <p className="text-xs text-blue-200">+2.3K from yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
