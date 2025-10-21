import { ArrowLeft, Save, Shield, Bell, DollarSign, Mail, Globe, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface SystemSettingsProps {
  onBack: () => void;
}

export default function SystemSettings({ onBack }: SystemSettingsProps) {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-5 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-slate-900">System Settings</h1>
              <p className="text-sm text-slate-600">Configure platform preferences</p>
            </div>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
            <TabsTrigger value="general" className="rounded-lg">General</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg">Notifications</TabsTrigger>
            <TabsTrigger value="payments" className="rounded-lg">Payments</TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-slate-900 mb-6">Platform Configuration</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Platform Name</Label>
                    <Input defaultValue="Mjeshtri" className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label>Support Email</Label>
                    <Input defaultValue="support@mjeshtri.com" className="mt-2 rounded-xl" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <p className="text-sm text-slate-900">Maintenance Mode</p>
                    <p className="text-xs text-slate-500">Temporarily disable platform access</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <p className="text-sm text-slate-900">New User Registrations</p>
                    <p className="text-xs text-slate-500">Allow new users to sign up</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-slate-900 mb-6">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="text-sm text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-500">Send email updates to users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="text-sm text-slate-900">Push Notifications</p>
                    <p className="text-xs text-slate-500">Send push notifications to mobile devices</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="text-sm text-slate-900">SMS Notifications</p>
                    <p className="text-xs text-slate-500">Send SMS for critical updates</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-slate-900 mb-6">Payment Configuration</h2>
              <div className="space-y-6">
                <div>
                  <Label>Credit Price (ALL)</Label>
                  <Input defaultValue="500" type="number" className="mt-2 rounded-xl" />
                </div>
                <div>
                  <Label>Platform Fee (%)</Label>
                  <Input defaultValue="10" type="number" className="mt-2 rounded-xl" />
                </div>
                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <p className="text-sm text-slate-900">Cash Payments</p>
                    <p className="text-xs text-slate-500">Accept cash payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-slate-900 mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="text-sm text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Require 2FA for admin access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="text-sm text-slate-900">Auto-logout</p>
                    <p className="text-xs text-slate-500">Automatically logout inactive sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
