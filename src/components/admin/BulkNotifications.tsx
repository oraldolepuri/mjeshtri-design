import { useState } from 'react';
import { ArrowLeft, Send, Users, Filter, Mail, Bell, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface BulkNotificationsProps {
  onBack: () => void;
}

export default function BulkNotifications({ onBack }: BulkNotificationsProps) {
  const [targetAudience, setTargetAudience] = useState<string>('all');
  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const audienceStats = {
    all: 1234,
    customers: 456,
    laborers: 778,
    active: 1089,
    inactive: 145,
    verified: 612,
    new: 87,
  };

  const recentCampaigns = [
    { id: 1, title: 'Platform Maintenance', sent: 1234, opened: 892, clicked: 234, date: '2025-10-20', status: 'completed' },
    { id: 2, title: 'New Features Available', sent: 1089, opened: 765, clicked: 321, date: '2025-10-18', status: 'completed' },
    { id: 3, title: 'Credit Bonus Offer', sent: 778, opened: 654, clicked: 456, date: '2025-10-15', status: 'completed' },
    { id: 4, title: 'Welcome to Mjeshtri', sent: 87, opened: 72, clicked: 45, date: '2025-10-21', status: 'scheduled' },
  ];

  const handleSend = () => {
    setShowConfirm(false);
    toast.success('Notification sent successfully', {
      description: `Sent to ${audienceStats[targetAudience as keyof typeof audienceStats]} users`,
    });
    setTitle('');
    setMessage('');
  };

  const recipientCount = audienceStats[targetAudience as keyof typeof audienceStats];

  return (
    <div className="h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <p className="text-sm text-slate-600">Send notifications to multiple users at once</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compose Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-slate-900 mb-6">Compose Notification</h2>
              
              <div className="space-y-5">
                {/* Target Audience */}
                <div>
                  <Label className="mb-2 block">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users ({audienceStats.all})</SelectItem>
                      <SelectItem value="customers">Customers ({audienceStats.customers})</SelectItem>
                      <SelectItem value="laborers">Laborers ({audienceStats.laborers})</SelectItem>
                      <SelectItem value="active">Active Users ({audienceStats.active})</SelectItem>
                      <SelectItem value="inactive">Inactive Users ({audienceStats.inactive})</SelectItem>
                      <SelectItem value="verified">Verified Laborers ({audienceStats.verified})</SelectItem>
                      <SelectItem value="new">New Users (Last 7 days) ({audienceStats.new})</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500 mt-2">
                    This will send to {recipientCount} users
                  </p>
                </div>

                {/* Channels */}
                <div>
                  <Label className="mb-3 block">Notification Channels</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                      <Checkbox 
                        checked={channels.email}
                        onCheckedChange={(checked) => setChannels({...channels, email: !!checked})}
                      />
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">Email</p>
                        <p className="text-xs text-slate-500">Send via email</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                      <Checkbox 
                        checked={channels.push}
                        onCheckedChange={(checked) => setChannels({...channels, push: !!checked})}
                      />
                      <Bell className="w-5 h-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">Push Notification</p>
                        <p className="text-xs text-slate-500">Send push to mobile</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                      <Checkbox 
                        checked={channels.sms}
                        onCheckedChange={(checked) => setChannels({...channels, sms: !!checked})}
                      />
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">SMS</p>
                        <p className="text-xs text-slate-500">Send via text message</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">Premium</Badge>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Label className="mb-2 block">Notification Title</Label>
                  <Input
                    placeholder="Enter notification title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label className="mb-2 block">Message</Label>
                  <Textarea
                    placeholder="Enter your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="rounded-xl"
                  />
                  <p className="text-sm text-slate-500 mt-2">{message.length}/500 characters</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => setShowPreview(true)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                    disabled={!title || !message}
                  >
                    Preview
                  </Button>
                  <Button
                    onClick={() => setShowConfirm(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    disabled={!title || !message}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats & History */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h2 className="text-slate-900 mb-4">Campaign Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Sent (30d)</span>
                  <span className="text-lg text-slate-900">3,188</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Avg Open Rate</span>
                  <span className="text-lg text-green-600">72.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Avg Click Rate</span>
                  <span className="text-lg text-blue-600">28.3%</span>
                </div>
              </div>
            </Card>

            {/* Recent Campaigns */}
            <Card className="p-6">
              <h2 className="text-slate-900 mb-4">Recent Campaigns</h2>
              <div className="space-y-3">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-slate-900">{campaign.title}</p>
                      <Badge className={
                        campaign.status === 'completed'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500">Sent</p>
                        <p className="text-slate-900">{campaign.sent}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Opened</p>
                        <p className="text-slate-900">{campaign.opened}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Clicked</p>
                        <p className="text-slate-900">{campaign.clicked}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{campaign.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Preview</DialogTitle>
            <DialogDescription>Preview how your notification will appear</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Email Preview */}
            {channels.email && (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                  <p className="text-sm mb-1">Email</p>
                  <h3 className="text-lg">{title || 'Notification Title'}</h3>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {message || 'Your message will appear here...'}
                  </p>
                </div>
              </div>
            )}

            {/* Push Preview */}
            {channels.push && (
              <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">{title || 'Notification Title'}</p>
                    <p className="text-xs text-slate-600">{message || 'Your message...'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)} variant="outline" className="rounded-xl">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Send</DialogTitle>
            <DialogDescription>
              You are about to send this notification to {recipientCount} users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-900">Recipients: {recipientCount} users</p>
              </div>
              <div className="space-y-1 text-xs text-blue-700">
                {channels.email && <p>✓ Email notification</p>}
                {channels.push && <p>✓ Push notification</p>}
                {channels.sms && <p>✓ SMS notification</p>}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-900 mb-2">{title}</p>
              <p className="text-xs text-slate-600">{message}</p>
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button onClick={() => setShowConfirm(false)} variant="outline" className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSend} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
