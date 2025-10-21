import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, Briefcase, DollarSign, TrendingUp, LogOut, 
  ShieldCheck, AlertCircle, Activity, BarChart3, Settings as SettingsIcon,
  Bell, FileText, Megaphone, PieChart, Gift, Map, Code, FileSearch,
  LifeBuoy, Database, Sparkles, Menu, X, ChevronRight, Home
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: any;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  color?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function AdminLayout({ children, currentPage, onNavigate, onLogout, user }: AdminLayoutProps) {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navSections: NavSection[] = [
    {
      title: t('admin.menu.main'),
      items: [
        { id: 'admin-dashboard', label: t('nav.dashboard'), icon: Home, color: 'blue' },
      ]
    },
    {
      title: t('admin.menu.coreManagement'),
      items: [
        { id: 'admin-users', label: t('admin.users.title'), icon: Users, badge: '1.2K', color: 'blue' },
        { id: 'admin-gigs', label: t('admin.gigs.title'), icon: Briefcase, badge: '87', color: 'orange' },
        { id: 'admin-verification', label: t('admin.verification.title'), icon: ShieldCheck, badge: '12', color: 'green' },
        { id: 'admin-financial', label: t('admin.financial.title'), icon: DollarSign, color: 'emerald' },
        { id: 'admin-analytics', label: t('admin.analytics.title'), icon: BarChart3, color: 'purple' },
        { id: 'admin-settings', label: t('admin.settings.title'), icon: SettingsIcon, color: 'slate' },
      ]
    },
    {
      title: t('admin.menu.analyticsReports'),
      items: [
        { id: 'admin-realtime-analytics', label: t('admin.realtime.title'), icon: Activity, color: 'blue' },
        { id: 'admin-advanced-reporting', label: t('admin.reports.title'), icon: FileText, color: 'green' },
        { id: 'admin-revenue-forecast', label: 'Revenue Forecast', icon: TrendingUp, color: 'emerald' },
        { id: 'admin-report-builder', label: 'Custom Reports', icon: PieChart, color: 'violet' },
      ]
    },
    {
      title: t('admin.menu.communication'),
      items: [
        { id: 'admin-bulk-notifications', label: t('admin.notifications.title'), icon: Bell, color: 'purple' },
        { id: 'admin-announcements', label: t('admin.announcements.title'), icon: Megaphone, color: 'orange' },
        { id: 'admin-support-tickets', label: 'Support Tickets', icon: LifeBuoy, color: 'blue' },
      ]
    },
    {
      title: t('admin.menu.platformFeatures'),
      items: [
        { id: 'admin-ab-testing', label: 'A/B Testing', icon: PieChart, color: 'indigo' },
        { id: 'admin-rewards-program', label: 'Rewards Program', icon: Gift, color: 'yellow' },
        { id: 'admin-content-moderation', label: 'Content Moderation', icon: ShieldCheck, color: 'red' },
        { id: 'admin-geographic-map', label: 'Geographic Map', icon: Map, color: 'cyan' },
      ]
    },
    {
      title: t('admin.menu.systemSecurity'),
      items: [
        { id: 'admin-role-management', label: 'Role Management', icon: ShieldCheck, color: 'blue' },
        { id: 'admin-payment-gateway', label: 'Payment Config', icon: DollarSign, color: 'green' },
        { id: 'admin-api-management', label: 'API Management', icon: Code, color: 'indigo' },
        { id: 'admin-audit-log', label: 'Audit Log', icon: FileSearch, color: 'slate' },
        { id: 'admin-alert-rules', label: 'Alert Rules', icon: AlertCircle, color: 'orange' },
        { id: 'admin-database-backup', label: 'DB Backups', icon: Database, color: 'slate' },
      ]
    },
  ];

  const getIconColor = (color?: string) => {
    const colors: Record<string, string> = {
      blue: 'text-blue-600',
      orange: 'text-orange-600',
      green: 'text-green-600',
      emerald: 'text-emerald-600',
      purple: 'text-purple-600',
      slate: 'text-slate-600',
      red: 'text-red-600',
      indigo: 'text-indigo-600',
      yellow: 'text-yellow-600',
      cyan: 'text-cyan-600',
      violet: 'text-violet-600',
    };
    return colors[color || 'blue'];
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <h2 className="text-slate-900 truncate">{t('admin.panel')}</h2>
              <p className="text-xs text-slate-500 truncate">{t('app.name')} {t('admin.management')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {sidebarOpen && (
                <h3 className="px-3 mb-2 text-xs text-slate-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100'
                      } ${!sidebarOpen ? 'justify-center' : ''}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : getIconColor(item.color)}`} />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-left text-sm truncate">{item.label}</span>
                          {item.badge && !isActive && (
                            <Badge className="bg-slate-200 text-slate-700 border-slate-300 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.badge && isActive && (
                            <Badge className="bg-blue-500 text-white border-blue-400 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
              {idx < navSections.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        {sidebarOpen && (
          <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-600 truncate">{user?.email || 'admin@mjeshtri.al'}</p>
              </div>
            </div>
          </div>
        )}
        <Button
          onClick={onLogout}
          variant="outline"
          className={`w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 ${!sidebarOpen ? 'px-2' : ''}`}
        >
          <LogOut className="w-4 h-4" />
          {sidebarOpen && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-slate-900">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex w-10 h-10 rounded-xl bg-slate-100 items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-slate-900">
                {navSections
                  .flatMap(s => s.items)
                  .find(i => i.id === currentPage)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Manage your platform efficiently
              </p>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200 hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              System Online
            </Badge>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm lg:hidden">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
