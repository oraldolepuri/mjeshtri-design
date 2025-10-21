import { ArrowLeft, Bell, MessageCircle, CheckCircle, Star, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import type { UserRole } from '../../App';

interface NotificationsProps {
  userRole: UserRole;
  onBack: () => void;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export default function Notifications({ userRole, onBack }: NotificationsProps) {
  const isCustomer = userRole === 'customer';

  // Customer notification settings
  const [customerSettings, setCustomerSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-offers',
      title: 'New Offers',
      description: 'Get notified when laborers send you offers',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'offer-updates',
      title: 'Offer Updates',
      description: 'Updates on your pending offers',
      icon: Clock,
      enabled: true,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'New messages from laborers',
      icon: MessageCircle,
      enabled: true,
    },
    {
      id: 'job-completed',
      title: 'Job Completed',
      description: 'When a laborer marks your job as complete',
      icon: CheckCircle,
      enabled: true,
    },
    {
      id: 'reminders',
      title: 'Reminders',
      description: 'Reminders to review completed jobs',
      icon: Star,
      enabled: false,
    },
  ]);

  // Labor notification settings
  const [laborSettings, setLaborSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-gigs',
      title: 'New Gigs',
      description: 'Get notified about new gigs in your area',
      icon: TrendingUp,
      enabled: true,
    },
    {
      id: 'offer-accepted',
      title: 'Offer Accepted',
      description: 'When a customer accepts your offer',
      icon: CheckCircle,
      enabled: true,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'New messages from customers',
      icon: MessageCircle,
      enabled: true,
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: 'When you receive a new review',
      icon: Star,
      enabled: true,
    },
    {
      id: 'low-credits',
      title: 'Low Credits',
      description: 'Alert when your credits are running low',
      icon: DollarSign,
      enabled: true,
    },
    {
      id: 'promotional',
      title: 'Promotional',
      description: 'Special offers and platform updates',
      icon: Bell,
      enabled: false,
    },
  ]);

  const settings = isCustomer ? customerSettings : laborSettings;
  const setSettings = isCustomer ? setCustomerSettings : setLaborSettings;

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const enabledCount = settings.filter(s => s.enabled).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0077FF] to-[#0055CC] pt-12 pb-20 px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl">Notifications</h1>
          <div className="w-10" />
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-white text-2xl mb-2">Stay Updated</h2>
          <p className="text-white/80 text-sm">
            {enabledCount} of {settings.length} notifications enabled
          </p>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="px-6 -mt-12 relative z-20 space-y-4 pb-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-medium p-4 flex gap-3">
          <button
            onClick={() => setSettings(settings.map(s => ({ ...s, enabled: true })))}
            className="flex-1 py-3 rounded-xl bg-[#0077FF] text-white hover:bg-[#0066EE] transition-colors active:scale-95"
          >
            Enable All
          </button>
          <button
            onClick={() => setSettings(settings.map(s => ({ ...s, enabled: false })))}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors active:scale-95"
          >
            Disable All
          </button>
        </div>

        {/* Notification Categories */}
        <div className="bg-white rounded-2xl shadow-medium p-6 space-y-6">
          <div>
            <h3 className="text-gray-900 mb-1">Notification Preferences</h3>
            <p className="text-gray-500 text-sm">Choose what updates you want to receive</p>
          </div>

          <div className="space-y-4">
            {settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <div
                  key={setting.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    setting.enabled ? 'bg-[#0077FF]/10' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      setting.enabled ? 'text-[#0077FF]' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 mb-1">{setting.title}</h4>
                    <p className="text-gray-500 text-sm">{setting.description}</p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                    className="flex-shrink-0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Notification Methods */}
        <div className="bg-white rounded-2xl shadow-medium p-6 space-y-4">
          <h3 className="text-gray-900">Delivery Methods</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div>
                <p className="text-gray-900">Push Notifications</p>
                <p className="text-gray-500 text-sm">Receive alerts on your device</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div>
                <p className="text-gray-900">Email Notifications</p>
                <p className="text-gray-500 text-sm">Get updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div>
                <p className="text-gray-900">SMS Notifications</p>
                <p className="text-gray-500 text-sm">Text message alerts</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Do Not Disturb */}
        <div className="bg-white rounded-2xl shadow-medium p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-gray-900 mb-1">Do Not Disturb</h3>
              <p className="text-gray-500 text-sm">Silence notifications during specific hours</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex gap-3 opacity-50 pointer-events-none">
            <div className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">From</p>
              <p className="text-gray-900">22:00</p>
            </div>
            <div className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Until</p>
              <p className="text-gray-900">08:00</p>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-blue-900 text-sm">
            <strong>Note:</strong> Important notifications like job completions and accepted offers will always be delivered, even if some settings are disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
