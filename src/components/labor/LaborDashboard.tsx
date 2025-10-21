import { Bell, Search, Briefcase, MessageSquare, CheckCircle, User, Coins, Clock, MapPin, DollarSign, TrendingUp, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { User as UserType, Gig, Offer } from '../../App';

interface LaborDashboardProps {
  user: UserType;
  onNavigate: (screen: string, data?: any) => void;
  onLogout: () => void;
}

// Mock data
const newGigs: Gig[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Ana Krasniqi',
    title: 'Fix leaking bathroom pipe',
    description: 'Urgent plumbing needed. Sink has been leaking for 2 days.',
    category: 'Plumber',
    budget: 5000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-21T10:00:00Z',
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'Besart Hoxha',
    title: 'Install ceiling fan',
    description: 'Need to install a new ceiling fan in bedroom',
    category: 'Electrician',
    budget: 4000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-21T09:30:00Z',
  },
  {
    id: '6',
    customerId: 'c5',
    customerName: 'Mira Dervishi',
    title: 'Paint exterior walls',
    description: 'Need professional painting for house exterior',
    category: 'Painter',
    budget: 15000,
    location: 'Durrës, Albania',
    status: 'open',
    createdAt: '2025-10-21T08:00:00Z',
  },
];

const myOffers: Offer[] = [
  {
    id: 'o1',
    gigId: '3',
    laborId: 'l1',
    laborName: 'Current User',
    price: 6000,
    description: 'I can help with this job professionally',
    estimatedTime: '2 hours',
    status: 'pending',
    createdAt: '2025-10-20T14:00:00Z',
  },
  {
    id: 'o2',
    gigId: '4',
    laborId: 'l1',
    laborName: 'Current User',
    price: 8500,
    description: 'Experienced in this type of work',
    estimatedTime: '3 hours',
    status: 'pending',
    createdAt: '2025-10-20T10:00:00Z',
  },
];

const activeJobs: Gig[] = [
  {
    id: '4',
    customerId: 'c3',
    customerName: 'Erjon Mema',
    title: 'Paint living room walls',
    description: 'Need professional painting',
    category: 'Painter',
    location: 'Tirana, Albania',
    status: 'accepted',
    createdAt: '2025-10-19T10:00:00Z',
  },
];

const completedJobs: Gig[] = [
  {
    id: '5',
    customerId: 'c4',
    customerName: 'Linda Berisha',
    title: 'Fix electrical outlet',
    description: 'Outlet not working',
    category: 'Electrician',
    location: 'Tirana, Albania',
    status: 'completed',
    createdAt: '2025-10-15T10:00:00Z',
  },
  {
    id: '7',
    customerId: 'c6',
    customerName: 'Altin Rama',
    title: 'Install new sink',
    description: 'Kitchen sink installation',
    category: 'Plumber',
    location: 'Tirana, Albania',
    status: 'completed',
    createdAt: '2025-10-10T10:00:00Z',
  },
];

export default function LaborDashboard({ user, onNavigate, onLogout }: LaborDashboardProps) {
  const totalEarnings = completedJobs.length * 6500; // Mock calculation
  const successRate = 95;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-br from-[#FDB913] to-[#E5A60F] text-white px-6 pt-12 pb-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14 border-2 border-white shadow-medium ring-4 ring-white/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-white text-[#FDB913]">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white/80 text-sm">Welcome back,</p>
                <h1 className="text-white">{user.name}</h1>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('notification-inbox')}
              className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#0077FF] rounded-full text-xs flex items-center justify-center animate-scale-in">
                2
              </span>
            </button>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">Jobs</p>
              </div>
              <p className="text-white text-2xl">{completedJobs.length}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">Rating</p>
              </div>
              <p className="text-white text-2xl">4.9</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-white/80" />
                <p className="text-white/80 text-xs">Success</p>
              </div>
              <p className="text-white text-2xl">{successRate}%</p>
            </div>
          </div>

          {/* Credits Card */}
          <div className="bg-white rounded-2xl p-5 shadow-medium">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FDB913] to-[#E5A60F] rounded-xl flex items-center justify-center shadow-soft">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Available Credits</p>
                  <p className="text-gray-900 text-2xl">{user.credits || 0}</p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('credit-management')}
                className="bg-gradient-to-r from-[#FDB913] to-[#E5A60F] hover:from-[#E5A60F] hover:to-[#FDB913] text-white h-10 rounded-xl shadow-soft"
              >
                Buy More
              </Button>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#0077FF] mt-0.5 flex-shrink-0" />
              <p className="text-[#0077FF] text-xs">Each offer costs 1 credit. Buy credits to send more offers and win jobs!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Negative Margin to Overlap Header */}
      <div className="px-6 -mt-16 relative z-20">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-white rounded-2xl p-1.5 shadow-medium mb-6 h-auto">
            <TabsTrigger value="new" className="rounded-xl data-[state=active]:bg-[#0077FF] data-[state=active]:text-white py-2.5">
              New
            </TabsTrigger>
            <TabsTrigger value="offers" className="rounded-xl data-[state=active]:bg-[#0077FF] data-[state=active]:text-white py-2.5">
              Offers
            </TabsTrigger>
            <TabsTrigger value="active" className="rounded-xl data-[state=active]:bg-[#0077FF] data-[state=active]:text-white py-2.5">
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl data-[state=active]:bg-[#0077FF] data-[state=active]:text-white py-2.5">
              Done
            </TabsTrigger>
          </TabsList>

          {/* New Gigs Tab */}
          <TabsContent value="new" className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-gray-900">Available Gigs</h2>
                <p className="text-gray-500 text-sm mt-1">Send offers to win jobs</p>
              </div>
              <button
                onClick={() => onNavigate('gig-browser')}
                className="text-[#0077FF] text-sm hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {newGigs.map((gig, index) => (
                <div
                  key={gig.id}
                  onClick={() => onNavigate('send-offer', { gig })}
                  className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all cursor-pointer active:scale-[0.99] group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{gig.title}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {gig.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{gig.location.split(',')[0]}</span>
                    </div>
                    {gig.budget && (
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{gig.budget.toLocaleString()} ALL</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Badge variant="outline" className="border-blue-200 text-[#0077FF] bg-blue-50">
                      {gig.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">
                        {new Date(gig.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#0077FF] hover:bg-[#0066DD] rounded-xl h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('send-offer', { gig });
                        }}
                      >
                        Send Offer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* My Offers Tab */}
          <TabsContent value="offers" className="space-y-4 animate-slide-up">
            <div className="mb-4">
              <h2 className="text-gray-900">My Offers</h2>
              <p className="text-gray-500 text-sm mt-1">Track your pending offers</p>
            </div>

            {myOffers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">No offers sent yet</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Browse available gigs and send offers to get started
                </p>
                <Button
                  onClick={() => onNavigate('gig-browser')}
                  className="bg-[#0077FF] hover:bg-[#0066DD] rounded-xl h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Gigs
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-2xl p-5 shadow-soft"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">Gig Title Here</h3>
                          <Badge className="bg-yellow-100 text-yellow-700 border-0">
                            Pending
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {offer.description}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Sent {new Date(offer.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 text-sm">{offer.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-gray-900">{offer.price.toLocaleString()} ALL</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Jobs Tab */}
          <TabsContent value="active" className="space-y-4 animate-slide-up">
            <div className="mb-4">
              <h2 className="text-gray-900">Active Jobs</h2>
              <p className="text-gray-500 text-sm mt-1">Jobs you're currently working on</p>
            </div>

            {activeJobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">No active jobs</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                  Jobs you accept will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeJobs.map((gig) => (
                  <div
                    key={gig.id}
                    className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-gray-900">{gig.title}</h3>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            In Progress
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Customer: {gig.customerName}
                        </p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{gig.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Button
                        variant="outline"
                        className="flex-1 h-11 rounded-xl group"
                        onClick={() => onNavigate('chat', {
                          gig: gig,
                          chat: {
                            userId: gig.customerId,
                            userName: gig.customerName,
                            gigId: gig.id
                          }
                        })}
                      >
                        <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Message
                      </Button>
                      <Button
                        className="flex-1 h-11 bg-[#0077FF] hover:bg-[#0066DD] rounded-xl"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Done
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed" className="space-y-4 animate-slide-up">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900">Completed Jobs</h2>
                  <p className="text-gray-500 text-sm mt-1">Your work history</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">Total Earnings</p>
                  <p className="text-green-600">{totalEarnings.toLocaleString()} ALL</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {completedJobs.map((gig) => (
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
                      <p className="text-gray-600 text-sm mb-2">
                        Customer: {gig.customerName}
                      </p>
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
                    <span className="text-gray-500 text-sm">
                      {new Date(gig.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-strong">
        <div className="flex items-center justify-around max-w-md mx-auto px-6 py-3 safe-area-inset-bottom">
          <button className="flex flex-col items-center gap-1 py-2 text-[#FDB913] group">
            <div className="w-11 h-11 bg-yellow-100 rounded-2xl flex items-center justify-center group-active:scale-95 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onNavigate('gig-browser')}
            className="flex flex-col items-center gap-1 py-2 text-gray-500 group"
          >
            <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 group-active:scale-95 transition-all">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xs">Browse</span>
          </button>
          <button
            onClick={() => onNavigate('labor-profile')}
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
