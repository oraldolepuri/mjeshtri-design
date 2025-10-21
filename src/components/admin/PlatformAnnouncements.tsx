import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash, Eye, EyeOff, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface PlatformAnnouncementsProps {
  onBack: () => void;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  active: boolean;
  startDate: string;
  endDate?: string;
  target: 'all' | 'customers' | 'laborers';
  position: 'top' | 'bottom';
}

export default function PlatformAnnouncements({ onBack }: PlatformAnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Platform Maintenance Scheduled',
      message: 'We will be performing scheduled maintenance on Oct 25, 2025 from 2:00 AM to 4:00 AM. Service may be temporarily unavailable.',
      type: 'warning',
      active: true,
      startDate: '2025-10-21',
      endDate: '2025-10-26',
      target: 'all',
      position: 'top',
    },
    {
      id: '2',
      title: 'New Features Available!',
      message: 'Check out our new real-time chat feature and improved search functionality.',
      type: 'success',
      active: true,
      startDate: '2025-10-20',
      target: 'all',
      position: 'bottom',
    },
    {
      id: '3',
      title: 'Special Offer for Laborers',
      message: 'Get 20% bonus credits on all purchases this week!',
      type: 'info',
      active: false,
      startDate: '2025-10-15',
      endDate: '2025-10-22',
      target: 'laborers',
      position: 'top',
    },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as Announcement['type'],
    target: 'all' as Announcement['target'],
    position: 'top' as Announcement['position'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  const handleSave = () => {
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id 
          ? { ...a, ...formData, active: editingAnnouncement.active }
          : a
      ));
      toast.success('Announcement updated successfully');
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        active: true,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast.success('Announcement created successfully');
    }
    setShowDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.success('Announcement deleted');
  };

  const toggleActive = (id: string) => {
    setAnnouncements(announcements.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      position: 'top',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
    setEditingAnnouncement(null);
  };

  const openEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      target: announcement.target,
      position: announcement.position,
      startDate: announcement.startDate,
      endDate: announcement.endDate || '',
    });
    setShowDialog(true);
  };

  const getTypeColor = (type: Announcement['type']) => {
    switch (type) {
      case 'info': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: 'text-blue-600' };
      case 'warning': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: 'text-amber-600' };
      case 'success': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: 'text-green-600' };
      case 'error': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: 'text-red-600' };
    }
  };

  return (
    <div className="h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Manage platform-wide announcements and alerts</p>
            <Button
              onClick={() => {
                resetForm();
                setShowDialog(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements List */}
          <div className="lg:col-span-2 space-y-4">
            {announcements.map((announcement) => {
              const colors = getTypeColor(announcement.type);
              return (
                <Card key={announcement.id} className={`p-6 ${announcement.active ? '' : 'opacity-60'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        {announcement.type === 'warning' && <AlertCircle className={`w-5 h-5 ${colors.icon}`} />}
                        {announcement.type === 'success' && <CheckCircle className={`w-5 h-5 ${colors.icon}`} />}
                        {announcement.type === 'info' && <AlertCircle className={`w-5 h-5 ${colors.icon}`} />}
                        {announcement.type === 'error' && <AlertCircle className={`w-5 h-5 ${colors.icon}`} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-slate-900">{announcement.title}</h3>
                          <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                            {announcement.type}
                          </Badge>
                          {announcement.active ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-600 border-slate-200">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{announcement.message}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {announcement.startDate}
                            {announcement.endDate && ` - ${announcement.endDate}`}
                          </span>
                          <span>Target: {announcement.target}</span>
                          <span>Position: {announcement.position}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(announcement.id)}
                        className="rounded-lg"
                      >
                        {announcement.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEdit(announcement)}
                        className="rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(announcement.id)}
                        className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}

            {announcements.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-slate-900 mb-2">No announcements</h3>
                <p className="text-slate-600 text-sm mb-4">Create your first platform announcement</p>
                <Button
                  onClick={() => {
                    resetForm();
                    setShowDialog(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Announcement
                </Button>
              </Card>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-slate-900 mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total</span>
                  <span className="text-lg text-slate-900">{announcements.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active</span>
                  <span className="text-lg text-green-600">{announcements.filter(a => a.active).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Inactive</span>
                  <span className="text-lg text-slate-600">{announcements.filter(a => !a.active).length}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-blue-900 mb-2">💡 Best Practices</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Keep messages concise and clear</li>
                <li>• Use warning type for maintenance</li>
                <li>• Set end dates for temporary alerts</li>
                <li>• Target specific user groups when relevant</li>
                <li>• Preview before activating</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? 'Edit' : 'Create'} Announcement</DialogTitle>
            <DialogDescription>
              {editingAnnouncement ? 'Update' : 'Create'} a platform-wide announcement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter announcement title..."
                className="rounded-xl"
              />
            </div>

            <div>
              <Label className="mb-2 block">Message</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Enter announcement message..."
                rows={4}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Target Audience</Label>
                <Select value={formData.target} onValueChange={(value: any) => setFormData({...formData, target: value})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="customers">Customers Only</SelectItem>
                    <SelectItem value="laborers">Laborers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="rounded-xl"
                />
              </div>

              <div>
                <Label className="mb-2 block">End Date (Optional)</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Position</Label>
              <Select value={formData.position} onValueChange={(value: any) => setFormData({...formData, position: value})}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top of Page</SelectItem>
                  <SelectItem value="bottom">Bottom of Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button onClick={() => setShowDialog(false)} variant="outline" className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              disabled={!formData.title || !formData.message}
            >
              {editingAnnouncement ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
