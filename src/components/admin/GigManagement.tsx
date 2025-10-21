import { useState } from 'react';
import {
  ArrowLeft, Search, Filter, Briefcase, MapPin, DollarSign, Clock,
  User, AlertCircle, CheckCircle, XCircle, Eye, Ban, MessageSquare
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface GigManagementProps {
  onBack: () => void;
}

interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  status: 'open' | 'in-progress' | 'completed' | 'disputed' | 'cancelled';
  customer: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  offers: number;
  assignedLabor?: {
    id: string;
    name: string;
  };
  flagged?: boolean;
  flagReason?: string;
}

const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Fix leaking bathroom pipe',
    description: 'My bathroom sink has been leaking for 2 days. Need urgent help.',
    category: 'Plumber',
    budget: 5000,
    location: 'Tirana, Albania',
    status: 'open',
    customer: {
      id: 'c1',
      name: 'Ana Krasniqi',
      email: 'ana@example.com'
    },
    createdAt: '2025-10-20T10:00:00Z',
    offers: 5
  },
  {
    id: '2',
    title: 'Install ceiling fan in bedroom',
    description: 'Need someone to install a ceiling fan. I already have the fan.',
    category: 'Electrician',
    budget: 3500,
    location: 'Tirana, Albania',
    status: 'in-progress',
    customer: {
      id: 'c2',
      name: 'Besart Hoxha',
      email: 'besart@example.com'
    },
    createdAt: '2025-10-19T14:30:00Z',
    offers: 3,
    assignedLabor: {
      id: 'l1',
      name: 'Arben Hoxha'
    }
  },
  {
    id: '3',
    title: 'Paint living room walls',
    description: 'Looking for experienced painter to paint my living room. About 25 square meters.',
    category: 'Painter',
    budget: 8000,
    location: 'Durrës, Albania',
    status: 'completed',
    customer: {
      id: 'c3',
      name: 'Erjon Mema',
      email: 'erjon@example.com'
    },
    createdAt: '2025-10-15T09:00:00Z',
    offers: 7,
    assignedLabor: {
      id: 'l2',
      name: 'Elena Krasniqi'
    }
  },
  {
    id: '4',
    title: 'Fix broken door lock',
    description: 'Front door lock is broken and needs replacement.',
    category: 'Handyman',
    budget: 2500,
    location: 'Vlorë, Albania',
    status: 'disputed',
    customer: {
      id: 'c4',
      name: 'Linda Berisha',
      email: 'linda@example.com'
    },
    createdAt: '2025-10-18T11:15:00Z',
    offers: 2,
    assignedLabor: {
      id: 'l3',
      name: 'Dritan Marku'
    },
    flagged: true,
    flagReason: 'Customer claims work was not completed properly'
  },
  {
    id: '5',
    title: 'Emergency electrical repair',
    description: 'Power outage in half of the apartment. Need immediate assistance.',
    category: 'Electrician',
    budget: 6000,
    location: 'Tirana, Albania',
    status: 'open',
    customer: {
      id: 'c5',
      name: 'Klea Marku',
      email: 'klea@example.com'
    },
    createdAt: '2025-10-21T07:30:00Z',
    offers: 1,
    flagged: true,
    flagReason: 'Reported as potentially fraudulent by system'
  },
];

export default function GigManagement({ onBack }: GigManagementProps) {
  const [gigs] = useState<Gig[]>(mockGigs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showGigDetails, setShowGigDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'flagged'>('all');

  const categories = ['All Categories', 'Plumber', 'Electrician', 'Painter', 'Handyman', 'Carpentry', 'HVAC', 'Cleaning'];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || gig.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || gig.category === filterCategory;
    const matchesFlagged = activeTab === 'all' || (activeTab === 'flagged' && gig.flagged);
    return matchesSearch && matchesStatus && matchesCategory && matchesFlagged;
  });

  const stats = {
    total: gigs.length,
    open: gigs.filter(g => g.status === 'open').length,
    inProgress: gigs.filter(g => g.status === 'in-progress').length,
    completed: gigs.filter(g => g.status === 'completed').length,
    disputed: gigs.filter(g => g.status === 'disputed').length,
    flagged: gigs.filter(g => g.flagged).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'disputed':
        return 'bg-red-100 text-red-700';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleGigAction = (action: string, gig: Gig) => {
    switch (action) {
      case 'view':
        setSelectedGig(gig);
        setShowGigDetails(true);
        break;
      case 'suspend':
        toast.success(`Gig "${gig.title}" has been suspended`);
        break;
      case 'resolve':
        toast.success(`Dispute for "${gig.title}" marked as resolved`);
        break;
      case 'unflag':
        toast.success(`Gig "${gig.title}" has been unflagged`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900">Gig Management</h1>
              <p className="text-gray-600 text-sm">Monitor and manage all platform gigs</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-blue-900">{stats.open}</p>
              <p className="text-xs text-blue-700">Open</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-yellow-900">{stats.inProgress}</p>
              <p className="text-xs text-yellow-700">In Progress</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-green-900">{stats.completed}</p>
              <p className="text-xs text-green-700">Completed</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-red-900">{stats.disputed}</p>
              <p className="text-xs text-red-700">Disputed</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-2xl text-orange-900">{stats.flagged}</p>
              <p className="text-xs text-orange-700">Flagged</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search gigs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px] rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px] rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-6 bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="all" className="rounded-lg">
              All Gigs ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="rounded-lg relative">
              Flagged
              {stats.flagged > 0 && (
                <Badge className="ml-2 bg-red-600 text-white">{stats.flagged}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    gig.flagged ? 'border-2 border-red-200' : ''
                  }`}
                >
                  {gig.flagged && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-red-900">
                          <strong>Flagged:</strong> {gig.flagReason}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{gig.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{gig.description}</p>
                        </div>
                        <Badge className={getStatusColor(gig.status)}>
                          {gig.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Badge className="bg-purple-100 text-purple-700">{gig.category}</Badge>
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {gig.budget.toLocaleString()} ALL
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {gig.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {gig.offers} offers
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(gig.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Customer</p>
                            <p className="text-sm text-gray-900">{gig.customer.name}</p>
                          </div>
                          {gig.assignedLabor && (
                            <div>
                              <p className="text-xs text-gray-500">Assigned Labor</p>
                              <p className="text-sm text-gray-900">{gig.assignedLabor.name}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleGigAction('view', gig)}
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          {gig.flagged && (
                            <Button
                              onClick={() => handleGigAction('unflag', gig)}
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-green-200 text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Clear Flag
                            </Button>
                          )}
                          {gig.status === 'disputed' && (
                            <Button
                              onClick={() => handleGigAction('resolve', gig)}
                              size="sm"
                              className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredGigs.length === 0 && (
                <div className="text-center py-16">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No gigs found</h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Gig Details Dialog */}
      <Dialog open={showGigDetails} onOpenChange={setShowGigDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gig Details</DialogTitle>
            <DialogDescription>View complete gig information and manage status</DialogDescription>
          </DialogHeader>
          {selectedGig && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h2 className="text-gray-900 mb-1">{selectedGig.title}</h2>
                  <p className="text-gray-600 text-sm">ID: {selectedGig.id}</p>
                </div>
                <Badge className={getStatusColor(selectedGig.status)}>
                  {selectedGig.status}
                </Badge>
              </div>

              {/* Flag Warning */}
              {selectedGig.flagged && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-900 mb-1"><strong>This gig has been flagged</strong></p>
                      <p className="text-sm text-red-700">{selectedGig.flagReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-900 bg-gray-50 rounded-xl p-4">{selectedGig.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <Badge className="bg-purple-100 text-purple-700">{selectedGig.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Budget</p>
                  <p className="text-gray-900">{selectedGig.budget.toLocaleString()} ALL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-900">{selectedGig.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created</p>
                  <p className="text-gray-900">{new Date(selectedGig.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Offers Received</p>
                  <p className="text-gray-900">{selectedGig.offers}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-gray-900">{selectedGig.customer.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-gray-900">{selectedGig.customer.email}</span>
                  </div>
                </div>
              </div>

              {/* Assigned Labor */}
              {selectedGig.assignedLabor && (
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="text-gray-900 mb-2">Assigned Labor</h3>
                  <p className="text-gray-900">{selectedGig.assignedLabor.name}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedGig.flagged && (
                  <Button
                    onClick={() => {
                      handleGigAction('unflag', selectedGig);
                      setShowGigDetails(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Clear Flag
                  </Button>
                )}
                {selectedGig.status === 'disputed' && (
                  <Button
                    onClick={() => {
                      handleGigAction('resolve', selectedGig);
                      setShowGigDetails(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Resolve Dispute
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleGigAction('suspend', selectedGig);
                    setShowGigDetails(false);
                  }}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend Gig
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
