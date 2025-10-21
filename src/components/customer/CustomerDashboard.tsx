import { useTranslation } from 'react-i18next';
import { Bell, Plus, Clock, CheckCircle, User, MapPin, MessageCircle, TrendingUp, Coins, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import type { User as UserType, Gig } from '../../App';

interface CustomerDashboardProps {
  user: UserType;
  onNavigate: (screen: string, data?: any) => void;
  onLogout: () => void;
}

// Mock data
const mockGigs: Gig[] = [
  {
    id: '1',
    customerId: 'user1',
    customerName: 'John Doe',
    title: 'Fix leaking bathroom pipe',
    description: 'My bathroom sink has been leaking for 2 days. Need urgent help.',
    category: 'Plumber',
    budget: 5000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-20T10:00:00Z',
    offers: [
      {
        id: 'o1',
        gigId: '1',
        laborId: 'l1',
        laborName: 'Arben Hoxha',
        laborRating: 4.8,
        price: 4500,
        description: 'I can fix this today. I have 10 years of plumbing experience.',
        estimatedTime: '2 hours',
        status: 'pending',
        createdAt: '2025-10-20T11:00:00Z',
      },
      {
        id: 'o2',
        gigId: '1',
        laborId: 'l2',
        laborName: 'Besnik Shehu',
        laborRating: 4.9,
        price: 5500,
        description: 'Professional plumber with 15 years experience. Can come today.',
        estimatedTime: '1.5 hours',
        status: 'pending',
        createdAt: '2025-10-20T11:30:00Z',
      },
    ],
  },
  {
    id: '2',
    customerId: 'user1',
    customerName: 'John Doe',
    title: 'Install new ceiling lights',
    description: 'Need to install 3 LED ceiling lights in living room',
    category: 'Electrician',
    budget: 8000,
    location: 'Tirana, Albania',
    status: 'accepted',
    createdAt: '2025-10-18T14:00:00Z',
    acceptedOfferId: 'o3',
    offers: [
      {
        id: 'o3',
        gigId: '2',
        laborId: 'l3',
        laborName: 'Dritan Kola',
        laborRating: 5.0,
        price: 7500,
        description: 'Licensed electrician. Can install them professionally.',
        estimatedTime: '3 hours',
        status: 'accepted',
        createdAt: '2025-10-18T15:00:00Z',
      },
    ],
  },
];

const mockCompletedGigs: Gig[] = [
  {
    id: '3',
    customerId: 'user1',
    customerName: 'John Doe',
    title: 'Paint bedroom walls',
    description: 'Need to repaint 2 bedroom walls',
    category: 'Painter',
    location: 'Tirana, Albania',
    status: 'completed',
    createdAt: '2025-10-15T10:00:00Z',
  },
];

export default function CustomerDashboard({ user, onNavigate, onLogout }: CustomerDashboardProps) {
  const { t } = useTranslation();
  const activeGigs = mockGigs.filter(g => g.status === 'open' || g.status === 'accepted');
  const openGigs = activeGigs.filter(g => g.status === 'open');
  const inProgressGigs = activeGigs.filter(g => g.status === 'accepted');
  const pastGigs = mockCompletedGigs;
  const totalOffers = activeGigs.reduce((sum, gig) => sum + (gig.offers?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-br from-[#0077FF] to-[#0066DD] text-white px-6 pt-12 pb-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 border-2 border-white shadow-medium ring-4 ring-white/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-white text-[#0077FF]">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white/80 text-sm">{t('customer.dashboard.welcome')},</p>
                <h1 className="text-white">{user.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white">
                <LanguageSwitcher />
              </div>
              <button 
                onClick={() => onNavigate('notification-inbox')}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
                {totalOffers > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[#FDB913] rounded-full text-xs flex items-center justify-center animate-scale-in">
                    {totalOffers}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">{t('common.active')}</p>
              </div>
              <p className="text-white text-2xl">{activeGigs.length}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">{t('nav.offers')}</p>
              </div>
              <p className="text-white text-2xl">{totalOffers}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">Done</p>
              </div>
              <p className="text-white text-2xl">{pastGigs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Negative Margin to Overlap Header */}
      <div className="px-6 -mt-16 relative z-20 space-y-6">
        {/* Create Gig CTA */}
        <button
          onClick={() => onNavigate('create-gig')}
          className="w-full bg-white rounded-2xl p-6 shadow-medium hover:shadow-strong transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0077FF] to-[#0066DD] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-soft">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Post a New Gig</h3>
              <p className="text-gray-500 text-sm">Describe your problem and get offers from verified professionals</p>
            </div>
          </div>
        </button>

        {/* Open Gigs Awaiting Offers */}
        {openGigs.length > 0 && (
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-gray-900">Awaiting Offers</h2>
                <p className="text-gray-500 text-sm mt-1">Review and accept the best offer</p>
              </div>
              <Badge className="bg-blue-100 text-[#0077FF] border-0">
                {openGigs.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {openGigs.map((gig) => (
                <div
                  key={gig.id}
                  onClick={() => onNavigate('gig-details', { gig })}
                  className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all cursor-pointer active:scale-[0.99] group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{gig.title}</h3>
                        {gig.offers && gig.offers.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg animate-scale-in">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-700 text-xs">{gig.offers.length} new</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{gig.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-blue-200 text-[#0077FF] bg-blue-50">
                        {gig.category}
                      </Badge>
                      {gig.budget && (
                        <span className="text-gray-600 text-sm">Budget: {gig.budget} ALL</span>
                      )}
                    </div>
                    {gig.offers && gig.offers.length > 0 && (
                      <Button
                        variant="outline"
                        className="h-9 rounded-xl text-[#0077FF] border-[#0077FF] hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('gig-details', { gig });
                        }}
                      >
                        View Offers
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* In Progress Gigs */}
        {inProgressGigs.length > 0 && (
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-gray-900">In Progress</h2>
                <p className="text-gray-500 text-sm mt-1">Jobs currently being worked on</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-0">
                {inProgressGigs.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {inProgressGigs.map((gig) => {
                const acceptedOffer = gig.offers?.find(o => o.id === gig.acceptedOfferId);
                return (
                  <div
                    key={gig.id}
                    className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">{gig.title}</h3>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{gig.location}</span>
                        </div>
                      </div>
                    </div>

                    {acceptedOffer && (
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 border-2 border-white shadow-soft">
                            <AvatarImage src={acceptedOffer.laborAvatar} />
                            <AvatarFallback className="bg-[#0077FF] text-white">
                              {acceptedOffer.laborName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-gray-900">{acceptedOffer.laborName}</p>
                            <p className="text-gray-500 text-sm">{acceptedOffer.estimatedTime} • {acceptedOffer.price} ALL</p>
                          </div>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-gray-500 text-xs mt-2">Work in progress</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 h-11 rounded-xl group"
                        onClick={() => acceptedOffer && onNavigate('chat', { 
                          gig: gig,
                          chat: { 
                            userId: acceptedOffer.laborId, 
                            userName: acceptedOffer.laborName,
                            gigId: gig.id 
                          } 
                        })}
                      >
                        <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Message
                      </Button>
                      <Button
                        className="flex-1 h-11 bg-[#0077FF] hover:bg-[#0066DD] rounded-xl"
                        onClick={() => onNavigate('leave-review', { gig })}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State for No Active Gigs */}
        {activeGigs.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-soft animate-slide-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Active Gigs</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Post your first gig to connect with verified professionals in your area
            </p>
            <Button
              onClick={() => onNavigate('create-gig')}
              className="bg-[#0077FF] hover:bg-[#0066DD] rounded-xl h-12"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Gig
            </Button>
          </div>
        )}

        {/* Past Gigs */}
        {pastGigs.length > 0 && (
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-gray-900">Completed</h2>
                <p className="text-gray-500 text-sm mt-1">Your finished projects</p>
              </div>
            </div>
            <div className="space-y-3">
              {pastGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="bg-white rounded-2xl p-5 shadow-soft"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{gig.title}</h3>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Badge variant="outline" className="border-gray-200 text-gray-600">
                      {gig.category}
                    </Badge>
                    {gig.status === 'completed' && (
                      <Button
                        onClick={() => onNavigate('leave-review', { gig })}
                        variant="outline"
                        className="h-9 text-[#0077FF] border-[#0077FF] rounded-xl hover:bg-blue-50"
                      >
                        Leave Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-strong">
        <div className="flex items-center justify-around max-w-md mx-auto px-6 py-3 safe-area-inset-bottom">
          <button className="flex flex-col items-center gap-1 py-2 text-[#0077FF] group">
            <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center group-active:scale-95 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onNavigate('create-gig')}
            className="flex flex-col items-center gap-1 py-2 text-gray-500 group"
          >
            <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 group-active:scale-95 transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs">Create</span>
          </button>
          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 py-2 text-gray-500 group"
          >
            <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 group-active:scale-95 transition-all">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
