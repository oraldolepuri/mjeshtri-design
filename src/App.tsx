import { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import './i18n/config';
import { Button } from './components/ui/button';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import CustomerDashboard from './components/customer/CustomerDashboard';
import CreateGig from './components/customer/CreateGig';
import GigDetails from './components/customer/GigDetails';
import LeaveReview from './components/customer/LeaveReview';
import CustomerProfile from './components/customer/CustomerProfile';
import EditCustomerProfile from './components/customer/EditCustomerProfile';
import LaborDashboard from './components/labor/LaborDashboard';
import GigBrowser from './components/labor/GigBrowser';
import SendOffer from './components/labor/SendOffer';
import CreditManagement from './components/labor/CreditManagement';
import LaborProfile from './components/labor/LaborProfile';
import EditLaborProfile from './components/labor/EditLaborProfile';
import Chat from './components/shared/Chat';
import BottomNav from './components/shared/BottomNav';
import Notifications from './components/shared/Notifications';
import NotificationInbox from './components/shared/NotificationInbox';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import LaborerVerification from './components/admin/LaborerVerification';
import GigManagement from './components/admin/GigManagement';
import FinancialManagement from './components/admin/FinancialManagement';
import Analytics from './components/admin/Analytics';
import SystemSettings from './components/admin/SystemSettings';
import RealtimeAnalytics from './components/admin/RealtimeAnalytics';
import BulkNotifications from './components/admin/BulkNotifications';
import AdvancedReporting from './components/admin/AdvancedReporting';
import PlatformAnnouncements from './components/admin/PlatformAnnouncements';
import AllAdminFeatures from './components/admin/AllAdminFeatures';
import AdminLayout from './components/admin/AdminLayout';

export type UserRole = 'customer' | 'labor' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  credits?: number;
}

export interface Gig {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  category: string;
  budget?: number;
  location: string;
  photos?: string[];
  status: 'open' | 'accepted' | 'completed' | 'reviewed';
  createdAt: string;
  offers?: Offer[];
  acceptedOfferId?: string;
}

export interface Offer {
  id: string;
  gigId: string;
  laborId: string;
  laborName: string;
  laborAvatar?: string;
  laborRating?: number;
  price: number;
  description: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  gigId: string;
  customerId: string;
  customerName: string;
  laborId: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  image?: string;
  timestamp: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('onboarding');
  const [user, setUser] = useState<User | null>(null);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [chatWith, setChatWith] = useState<{ userId: string; userName: string; gigId: string } | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'customer') {
      setCurrentScreen('customer-dashboard');
    } else if (userData.role === 'labor') {
      setCurrentScreen('labor-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentScreen('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  const navigate = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    if (data?.gig) setSelectedGig(data.gig);
    if (data?.offer) setSelectedOffer(data.offer);
    if (data?.chat) setChatWith(data.chat);
    // Handle chat data with both otherUser and gig
    if (data?.otherUser && data?.gig) {
      setChatWith(data.otherUser);
      setSelectedGig(data.gig);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentScreen('auth')} />;
      
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      
      // Customer Screens
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            user={user!}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );
      
      case 'create-gig':
        return (
          <CreateGig
            user={user!}
            onBack={() => navigate('customer-dashboard')}
            onGigCreated={(gig) => {
              navigate('customer-dashboard');
            }}
          />
        );
      
      case 'gig-details':
        return (
          <GigDetails
            gig={selectedGig!}
            user={user!}
            onBack={() => navigate('customer-dashboard')}
            onAcceptOffer={(offer) => {
              navigate('chat', { 
                gig: selectedGig,
                chat: { 
                  userId: offer.laborId, 
                  userName: offer.laborName,
                  gigId: selectedGig!.id 
                } 
              });
            }}
          />
        );
      
      case 'leave-review':
        return (
          <LeaveReview
            gig={selectedGig!}
            user={user!}
            onBack={() => navigate('customer-dashboard')}
            onReviewSubmitted={() => navigate('customer-dashboard')}
          />
        );
      
      case 'customer-profile':
        return (
          <CustomerProfile
            user={user!}
            onBack={() => navigate('customer-dashboard')}
            onLogout={handleLogout}
            onNavigate={navigate}
          />
        );
      
      case 'edit-customer-profile':
        return (
          <EditCustomerProfile
            user={user!}
            onBack={() => navigate('customer-profile')}
            onSave={(updatedUser) => {
              setUser({ ...user!, ...updatedUser });
            }}
          />
        );
      
      // Labor Screens
      case 'labor-dashboard':
        return (
          <LaborDashboard
            user={user!}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        );
      
      case 'gig-browser':
        return (
          <GigBrowser
            user={user!}
            onBack={() => navigate('labor-dashboard')}
            onSelectGig={(gig) => navigate('send-offer', { gig })}
          />
        );
      
      case 'send-offer':
        return (
          <SendOffer
            gig={selectedGig!}
            user={user!}
            onBack={() => navigate('gig-browser')}
            onOfferSent={() => navigate('labor-dashboard')}
          />
        );
      
      case 'credit-management':
        return (
          <CreditManagement
            user={user!}
            onBack={() => {
              if (user?.role === 'customer') {
                navigate('customer-dashboard');
              } else {
                navigate('labor-dashboard');
              }
            }}
            onCreditsUpdated={(newCredits) => {
              setUser({ ...user!, credits: newCredits });
            }}
          />
        );
      
      case 'labor-profile':
        return (
          <LaborProfile
            user={user!}
            onBack={() => navigate('labor-dashboard')}
            onLogout={handleLogout}
            onNavigate={navigate}
          />
        );
      
      case 'edit-labor-profile':
        return (
          <EditLaborProfile
            user={user!}
            onBack={() => navigate('labor-profile')}
            onSave={(updatedUser) => {
              setUser({ ...user!, ...updatedUser });
            }}
          />
        );
      
      // Shared Screens
      case 'notification-inbox':
        return (
          <NotificationInbox
            userRole={user!.role}
            onBack={() => {
              if (user?.role === 'customer') {
                navigate('customer-dashboard');
              } else {
                navigate('labor-dashboard');
              }
            }}
            onNavigate={navigate}
          />
        );
      
      case 'notifications':
        return (
          <Notifications
            userRole={user!.role}
            onBack={() => {
              if (user?.role === 'customer') {
                navigate('customer-profile');
              } else {
                navigate('labor-profile');
              }
            }}
          />
        );
      case 'chat':
        return (
          <Chat
            currentUser={user!}
            otherUser={chatWith!}
            gig={selectedGig!}
            onBack={() => {
              if (user?.role === 'customer') {
                navigate('customer-dashboard');
              } else {
                navigate('labor-dashboard');
              }
            }}
            onMarkComplete={(gigId) => {
              if (user?.role === 'customer') {
                navigate('leave-review', { gig: selectedGig });
              } else {
                navigate('labor-dashboard');
              }
            }}
          />
        );
      
      // Admin Screens - All wrapped in AdminLayout
      case 'admin-dashboard':
      case 'admin-users':
      case 'admin-gigs':
      case 'admin-verification':
      case 'admin-financial':
      case 'admin-analytics':
      case 'admin-settings':
      case 'admin-realtime-analytics':
      case 'admin-bulk-notifications':
      case 'admin-advanced-reporting':
      case 'admin-announcements':
      case 'admin-ab-testing':
      case 'admin-payment-gateway':
      case 'admin-rewards-program':
      case 'admin-content-moderation':
      case 'admin-role-management':
      case 'admin-revenue-forecast':
      case 'admin-geographic-map':
      case 'admin-api-management':
      case 'admin-audit-log':
      case 'admin-alert-rules':
      case 'admin-report-builder':
      case 'admin-support-tickets':
      case 'admin-database-backup':
        return (
          <AdminLayout
            currentPage={currentScreen}
            onNavigate={navigate}
            onLogout={handleLogout}
            user={user!}
          >
            {currentScreen === 'admin-dashboard' && (
              <AdminDashboard
                user={user!}
                onLogout={handleLogout}
                onNavigate={navigate}
              />
            )}
            {currentScreen === 'admin-users' && (
              <UserManagement
                onBack={() => navigate('admin-dashboard')}
                onNavigate={navigate}
              />
            )}
            {currentScreen === 'admin-gigs' && (
              <GigManagement onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-verification' && (
              <LaborerVerification onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-financial' && (
              <FinancialManagement onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-analytics' && (
              <Analytics onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-settings' && (
              <SystemSettings onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-realtime-analytics' && (
              <RealtimeAnalytics onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-bulk-notifications' && (
              <BulkNotifications onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-advanced-reporting' && (
              <AdvancedReporting onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-announcements' && (
              <PlatformAnnouncements onBack={() => navigate('admin-dashboard')} />
            )}
            {currentScreen === 'admin-ab-testing' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="ab-testing" />
            )}
            {currentScreen === 'admin-payment-gateway' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="payment-gateway" />
            )}
            {currentScreen === 'admin-rewards-program' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="rewards-program" />
            )}
            {currentScreen === 'admin-content-moderation' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="content-moderation" />
            )}
            {currentScreen === 'admin-role-management' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="role-management" />
            )}
            {currentScreen === 'admin-revenue-forecast' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="revenue-forecast" />
            )}
            {currentScreen === 'admin-geographic-map' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="geographic-map" />
            )}
            {currentScreen === 'admin-api-management' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="api-management" />
            )}
            {currentScreen === 'admin-audit-log' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="audit-log" />
            )}
            {currentScreen === 'admin-alert-rules' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="alert-rules" />
            )}
            {currentScreen === 'admin-report-builder' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="report-builder" />
            )}
            {currentScreen === 'admin-support-tickets' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="support-tickets" />
            )}
            {currentScreen === 'admin-database-backup' && (
              <AllAdminFeatures onBack={() => navigate('admin-dashboard')} feature="database-backup" />
            )}
          </AdminLayout>
        );
      
      // Placeholder screens for other admin features
      case 'admin-reviews':
      case 'admin-disputes':
      case 'admin-support':
      case 'admin-activity-log':
      case 'admin-system-health':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => navigate('admin-dashboard')}
                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-slate-900 mb-2">
                  {currentScreen.replace('admin-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <p className="text-slate-600 mb-6">This feature is coming soon</p>
                <Button 
                  onClick={() => navigate('admin-dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <Onboarding onComplete={() => setCurrentScreen('auth')} />;
    }
  };

  const showBottomNav = user && (user.role === 'customer' || user.role === 'labor') && 
    currentScreen !== 'onboarding' && currentScreen !== 'auth';

  return (
    <>
      <div className="min-h-screen bg-gray-50" style={{ paddingBottom: showBottomNav ? '80px' : '0' }}>
        {renderScreen()}
      </div>
      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          userRole={user!.role}
          onNavigate={navigate}
        />
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
