import { ArrowLeft, Bell, MessageCircle, CheckCircle, DollarSign, Star, Clock, TrendingUp, Package, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';
import type { UserRole } from '../../App';

interface NotificationInboxProps {
  userRole: UserRole;
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

type NotificationType = 'offer' | 'message' | 'completion' | 'review' | 'credit' | 'gig' | 'accepted';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  userName?: string;
  actionData?: any;
}

export default function NotificationInbox({ userRole, onBack, onNavigate }: NotificationInboxProps) {
  const isCustomer = userRole === 'customer';

  // Mock gig data
  const mockGig1 = {
    id: '1',
    customerId: 'user1',
    customerName: 'John Doe',
    title: 'Fix leaking bathroom pipe',
    description: 'My bathroom sink has been leaking for 2 days. Need urgent help.',
    category: 'Plumber',
    budget: 5000,
    location: 'Tirana, Albania',
    status: 'open' as const,
    createdAt: '2025-10-20T10:00:00Z',
    offers: [
      {
        id: 'o1',
        gigId: '1',
        laborId: 'labor1',
        laborName: 'Arben Hoxha',
        laborRating: 4.8,
        laborCompletedJobs: 45,
        price: 4500,
        message: 'I have 10 years of experience in plumbing. I can fix this today.',
        estimatedDuration: '2-3 hours',
        createdAt: '2025-10-20T11:00:00Z',
        status: 'pending' as const
      },
      {
        id: 'o2',
        gigId: '1',
        laborId: 'labor2',
        laborName: 'Elena Krasniqi',
        laborRating: 4.9,
        laborCompletedJobs: 67,
        price: 5200,
        message: 'Licensed plumber with warranty on all work.',
        estimatedDuration: '3 hours',
        createdAt: '2025-10-20T11:15:00Z',
        status: 'pending' as const
      }
    ]
  };

  // Mock notifications for customers
  const [customerNotifications, setCustomerNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'offer',
      title: 'New Offer Received',
      message: 'Arben Hoxha sent you an offer for "Fix leaking bathroom pipe" - 4,500 ALL',
      timestamp: '5 min ago',
      isRead: false,
      userName: 'Arben Hoxha',
      avatar: '',
      actionData: { gig: mockGig1 }
    },
    {
      id: '2',
      type: 'offer',
      title: 'New Offer Received',
      message: 'Elena Krasniqi sent you an offer for "Fix leaking bathroom pipe" - 5,200 ALL',
      timestamp: '12 min ago',
      isRead: false,
      userName: 'Elena Krasniqi',
      avatar: '',
      actionData: { gig: mockGig1 }
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Arben: "I can start tomorrow morning if that works for you"',
      timestamp: '1 hour ago',
      isRead: false,
      userName: 'Arben Hoxha',
      avatar: '',
      actionData: { 
        screen: 'chat',
        chatData: {
          otherUser: {
            userId: 'labor1',
            userName: 'Arben Hoxha',
            gigId: '1'
          },
          gig: mockGig1
        }
      }
    },
    {
      id: '4',
      type: 'completion',
      title: 'Job Marked Complete',
      message: 'Arben Hoxha marked "Install new ceiling fan" as complete',
      timestamp: '2 hours ago',
      isRead: true,
      userName: 'Arben Hoxha',
      avatar: '',
      actionData: { showToast: 'This job has been completed!' }
    },
    {
      id: '5',
      type: 'offer',
      title: 'New Offer Received',
      message: 'Dritan Marku sent you an offer for "Electrical wiring inspection" - 8,000 ALL',
      timestamp: '1 day ago',
      isRead: true,
      userName: 'Dritan Marku',
      avatar: '',
      actionData: { gig: mockGig1 }
    }
  ]);

  // Mock notifications for laborers
  const [laborNotifications, setLaborNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'accepted',
      title: 'Offer Accepted! 🎉',
      message: 'Ana Krasniqi accepted your offer for "Fix leaking bathroom pipe"',
      timestamp: '10 min ago',
      isRead: false,
      userName: 'Ana Krasniqi',
      avatar: '',
      actionData: { 
        screen: 'chat',
        chatData: {
          otherUser: {
            userId: 'customer1',
            userName: 'Ana Krasniqi',
            gigId: '1'
          },
          gig: mockGig1
        }
      }
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Ana: "Can you come today at 3 PM?"',
      timestamp: '15 min ago',
      isRead: false,
      userName: 'Ana Krasniqi',
      avatar: '',
      actionData: { 
        screen: 'chat',
        chatData: {
          otherUser: {
            userId: 'customer1',
            userName: 'Ana Krasniqi',
            gigId: '1'
          },
          gig: mockGig1
        }
      }
    },
    {
      id: '3',
      type: 'gig',
      title: 'New Gig Posted',
      message: 'Plumbing job in your area - "Emergency pipe repair" - Budget: 6,000 ALL',
      timestamp: '30 min ago',
      isRead: false,
      actionData: { screen: 'gig-browser' }
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review Received',
      message: 'Ana Krasniqi left you a 5-star review: "Excellent work, very professional!"',
      timestamp: '2 hours ago',
      isRead: true,
      userName: 'Ana Krasniqi',
      avatar: '',
      actionData: { showToast: '⭐ Great job! Keep up the excellent work.' }
    },
    {
      id: '5',
      type: 'credit',
      title: 'Low Credit Alert',
      message: 'You have 2 credits remaining. Top up to continue sending offers.',
      timestamp: '5 hours ago',
      isRead: true,
      actionData: { screen: 'credit-management' }
    },
    {
      id: '6',
      type: 'gig',
      title: 'New Gig Posted',
      message: 'Electrical work in Tirana - "Install ceiling lights" - Budget: 4,500 ALL',
      timestamp: '1 day ago',
      isRead: true,
      actionData: { screen: 'gig-browser' }
    }
  ]);

  const notifications = isCustomer ? customerNotifications : laborNotifications;
  const setNotifications = isCustomer ? setCustomerNotifications : setLaborNotifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const allCount = notifications.length;

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const displayedNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'offer':
        return <DollarSign className="w-5 h-5 text-[#0077FF]" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-[#0077FF]" />;
      case 'completion':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-[#FDB913]" />;
      case 'credit':
        return <Package className="w-5 h-5 text-orange-600" />;
      case 'gig':
        return <TrendingUp className="w-5 h-5 text-[#0077FF]" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type and actionData
    if (notification.actionData) {
      if (notification.actionData.gig) {
        onNavigate('gig-details', { gig: notification.actionData.gig });
      } else if (notification.actionData.screen === 'chat' && notification.actionData.chatData) {
        // Navigate to chat with all necessary data
        onNavigate('chat', notification.actionData.chatData);
      } else if (notification.actionData.screen) {
        onNavigate(notification.actionData.screen);
      } else if (notification.actionData.showToast) {
        toast.info(notification.actionData.showToast);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-gray-900 text-xl">Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#0077FF] hover:text-[#0066EE]"
            >
              Mark all read
            </button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'unread')} className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-11">
              <TabsTrigger value="all" className="relative">
                All
                <Badge variant="secondary" className="ml-2 bg-gray-200 text-gray-700 text-xs">
                  {allCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-[#0077FF] text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-4 space-y-2">
        {displayedNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No {activeTab === 'unread' ? 'unread' : ''} notifications</h3>
            <p className="text-gray-500 text-sm">
              {activeTab === 'unread' 
                ? "You're all caught up!" 
                : "You'll see notifications here when you have activity"}
            </p>
          </div>
        ) : (
          displayedNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full text-left p-4 rounded-2xl transition-all active:scale-[0.98] ${
                notification.isRead 
                  ? 'bg-white hover:bg-gray-50' 
                  : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-[#0077FF]'
              }`}
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.isRead ? 'bg-gray-100' : 'bg-white'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-[#0077FF] rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className={`text-sm mb-2 line-clamp-2 ${
                    notification.isRead ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Quick Tip */}
      {displayedNotifications.length > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-blue-900 text-sm">
              💡 <strong>Tip:</strong> Tap any notification to view details and take action.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
