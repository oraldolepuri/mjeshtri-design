import { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Download, Users, UserCheck, UserX, 
  MoreVertical, Mail, Phone, MapPin, Star, Briefcase, Calendar,
  Ban, CheckCircle, Eye, Shield, TrendingUp, DollarSign, ChevronDown,
  ArrowUpDown, X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Textarea } from '../ui/textarea';

interface UserManagementProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'labor';
  status: 'active' | 'suspended' | 'pending';
  location: string;
  joinedDate: string;
  avatar?: string;
  gigsPosted?: number;
  totalSpent?: number;
  rating?: number;
  completedJobs?: number;
  skills?: string[];
  verified?: boolean;
  credits?: number;
}

const initialUsers: User[] = [
  {
    id: '1', name: 'Ana Krasniqi', email: 'ana.krasniqi@example.com', phone: '+355 69 123 4567',
    role: 'customer', status: 'active', location: 'Tirana, Albania', joinedDate: '2025-09-15',
    gigsPosted: 12, totalSpent: 45000,
  },
  {
    id: '2', name: 'Arben Hoxha', email: 'arben.hoxha@example.com', phone: '+355 69 234 5678',
    role: 'labor', status: 'active', location: 'Tirana, Albania', joinedDate: '2025-08-20',
    rating: 4.8, completedJobs: 45, skills: ['Plumbing', 'Electrical'], verified: true, credits: 15,
  },
  {
    id: '3', name: 'Besart Shehu', email: 'besart.shehu@example.com', phone: '+355 69 345 6789',
    role: 'labor', status: 'active', location: 'Durrës, Albania', joinedDate: '2025-09-01',
    rating: 4.9, completedJobs: 67, skills: ['Carpentry', 'Painting'], verified: true, credits: 8,
  },
  {
    id: '4', name: 'Linda Berisha', email: 'linda.berisha@example.com', phone: '+355 69 456 7890',
    role: 'customer', status: 'pending', location: 'Vlorë, Albania', joinedDate: '2025-10-20',
    gigsPosted: 0, totalSpent: 0,
  },
  {
    id: '5', name: 'Dritan Marku', email: 'dritan.marku@example.com', phone: '+355 69 567 8901',
    role: 'labor', status: 'suspended', location: 'Shkodër, Albania', joinedDate: '2025-07-10',
    rating: 3.2, completedJobs: 12, skills: ['Electrician'], verified: false, credits: 2,
  },
  {
    id: '6', name: 'Elena Krasniqi', email: 'elena.krasniqi@example.com', phone: '+355 69 678 9012',
    role: 'labor', status: 'active', location: 'Tirana, Albania', joinedDate: '2025-08-05',
    rating: 4.95, completedJobs: 89, skills: ['Plumbing', 'HVAC'], verified: true, credits: 22,
  },
  {
    id: '7', name: 'Klea Marku', email: 'klea.marku@example.com', phone: '+355 69 789 0123',
    role: 'customer', status: 'active', location: 'Tirana, Albania', joinedDate: '2025-09-10',
    gigsPosted: 8, totalSpent: 28000,
  },
  {
    id: '8', name: 'Erjon Mema', email: 'erjon.mema@example.com', phone: '+355 69 890 1234',
    role: 'customer', status: 'active', location: 'Durrës, Albania', joinedDate: '2025-08-25',
    gigsPosted: 15, totalSpent: 52000,
  },
];

type SortField = 'name' | 'joinedDate' | 'rating' | 'gigsPosted' | 'completedJobs';
type SortOrder = 'asc' | 'desc';

export default function UserManagement({ onBack, onNavigate }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'customer' | 'labor'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'activate' | 'verify' | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [sortField, setSortField] = useState<SortField>('joinedDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Stats calculation
  const stats = useMemo(() => ({
    total: users.length,
    customers: users.filter(u => u.role === 'customer').length,
    laborers: users.filter(u => u.role === 'labor').length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    pending: users.filter(u => u.status === 'pending').length,
    verified: users.filter(u => u.role === 'labor' && u.verified).length,
  }), [users]);

  // Filtering and sorting
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'joinedDate':
          aVal = new Date(a.joinedDate).getTime();
          bVal = new Date(b.joinedDate).getTime();
          break;
        case 'rating':
          aVal = a.rating || 0;
          bVal = b.rating || 0;
          break;
        case 'gigsPosted':
          aVal = a.gigsPosted || 0;
          bVal = b.gigsPosted || 0;
          break;
        case 'completedJobs':
          aVal = a.completedJobs || 0;
          bVal = b.completedJobs || 0;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchQuery, filterRole, filterStatus, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleUserAction = (action: string, user: User) => {
    setSelectedUser(user);
    switch (action) {
      case 'view':
        setShowUserDetails(true);
        break;
      case 'suspend':
        setActionType('suspend');
        setShowActionDialog(true);
        break;
      case 'activate':
        setActionType('activate');
        setShowActionDialog(true);
        break;
      case 'verify':
        setActionType('verify');
        setShowActionDialog(true);
        break;
      case 'message':
        toast.info(`Message feature for ${user.name} - Coming soon`);
        break;
      default:
        break;
    }
  };

  const confirmAction = () => {
    if (!selectedUser || !actionType) return;

    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        if (actionType === 'suspend') {
          toast.success(`${selectedUser.name} has been suspended`, {
            description: actionReason || 'No reason provided'
          });
          return { ...u, status: 'suspended' as const };
        } else if (actionType === 'activate') {
          toast.success(`${selectedUser.name} has been activated`);
          return { ...u, status: 'active' as const };
        } else if (actionType === 'verify') {
          toast.success(`${selectedUser.name} has been verified as a professional`);
          return { ...u, verified: true };
        }
      }
      return u;
    });

    setUsers(updatedUsers);
    setShowActionDialog(false);
    setShowUserDetails(false);
    setActionReason('');
    setSelectedUser(null);
    setActionType(null);
  };

  const exportData = () => {
    const csvData = filteredAndSortedUsers.map(u => ({
      Name: u.name,
      Email: u.email,
      Phone: u.phone,
      Role: u.role,
      Status: u.status,
      Location: u.location,
      Joined: u.joinedDate,
    }));
    
    toast.success(`Exporting ${csvData.length} users to CSV`, {
      description: 'Download will start shortly'
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterRole('all');
    setFilterStatus('all');
    setSortField('joinedDate');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all' || filterStatus !== 'all';

  return (
    <div className="h-full bg-slate-50">
      {/* Header Actions */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm text-slate-600">Manage and monitor all platform users</p>
            </div>
            <Button 
              onClick={exportData}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Enhanced Stats Bar */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mb-5">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
              <p className="text-2xl text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-700">Total</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center border border-green-200">
              <p className="text-2xl text-green-900">{stats.customers}</p>
              <p className="text-xs text-green-700">Customers</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 text-center border border-orange-200">
              <p className="text-2xl text-orange-900">{stats.laborers}</p>
              <p className="text-xs text-orange-700">Laborers</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 text-center border border-emerald-200">
              <p className="text-2xl text-emerald-900">{stats.active}</p>
              <p className="text-xs text-emerald-700">Active</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 text-center border border-red-200">
              <p className="text-2xl text-red-900">{stats.suspended}</p>
              <p className="text-xs text-red-700">Suspended</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 text-center border border-amber-200">
              <p className="text-2xl text-amber-900">{stats.pending}</p>
              <p className="text-xs text-amber-700">Pending</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
              <p className="text-2xl text-purple-900">{stats.verified}</p>
              <p className="text-xs text-purple-700">Verified</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-10 h-11 rounded-xl border-slate-200 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
              <SelectTrigger className="w-full md:w-[180px] h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
                <SelectItem value="labor">Laborers</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full md:w-[180px] h-11 rounded-xl border-slate-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-xl border-slate-200"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  User
                  <ArrowUpDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSort('joinedDate')}
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                >
                  Joined
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
              <span className="text-slate-500">{filteredAndSortedUsers.length} users</span>
            </div>
          </div>

          {/* User Cards */}
          <div className="divide-y divide-slate-100">
            {filteredAndSortedUsers.map((user) => (
              <div
                key={user.id}
                className="p-5 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <Avatar className="w-16 h-16 border-2 border-slate-200 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{user.name}</h3>
                      {user.role === 'labor' && user.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                      <Badge
                        className={
                          user.role === 'labor'
                            ? 'bg-orange-100 text-orange-700 border-orange-200'
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                        }
                      >
                        {user.role === 'labor' ? 'Laborer' : 'Customer'}
                      </Badge>
                      <Badge
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : user.status === 'suspended'
                            ? 'bg-red-100 text-red-700 border-red-200'
                            : 'bg-amber-100 text-amber-700 border-amber-200'
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {user.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {user.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                    {user.role === 'labor' && user.skills && (
                      <div className="flex flex-wrap gap-1.5">
                        {user.skills.map((skill, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-700 text-xs border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="hidden lg:flex items-center gap-8">
                    {user.role === 'customer' ? (
                      <>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-slate-500 mb-1">Gigs</p>
                          <p className="text-lg text-slate-900">{user.gigsPosted}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-slate-500 mb-1">Spent</p>
                          <p className="text-lg text-slate-900">{user.totalSpent?.toLocaleString()}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-slate-500 mb-1">Rating</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <p className="text-lg text-slate-900">{user.rating}</p>
                          </div>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-slate-500 mb-1">Jobs</p>
                          <p className="text-lg text-slate-900">{user.completedJobs}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-xs text-slate-500 mb-1">Credits</p>
                          <p className="text-lg text-slate-900">{user.credits}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem onClick={() => handleUserAction('view', user)}>
                        <Eye className="w-4 h-4 mr-3" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('message', user)}>
                        <Mail className="w-4 h-4 mr-3" />
                        Send Message
                      </DropdownMenuItem>
                      {user.role === 'labor' && !user.verified && (
                        <DropdownMenuItem onClick={() => handleUserAction('verify', user)}>
                          <Shield className="w-4 h-4 mr-3" />
                          Verify Laborer
                        </DropdownMenuItem>
                      )}
                      {user.status === 'active' ? (
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('suspend', user)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Ban className="w-4 h-4 mr-3" />
                          Suspend User
                        </DropdownMenuItem>
                      ) : user.status === 'suspended' ? (
                        <DropdownMenuItem 
                          onClick={() => handleUserAction('activate', user)}
                          className="text-green-600 focus:text-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-3" />
                          Activate User
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-500 text-sm mb-4">
                Try adjusting your search or filter criteria
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Complete user profile and activity information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* User Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <Avatar className="w-20 h-20 border-2 border-slate-200 shadow-sm">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-slate-900">{selectedUser.name}</h2>
                    {selectedUser.role === 'labor' && selectedUser.verified && (
                      <Badge className="bg-blue-600 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-600">{selectedUser.email}</p>
                </div>
                <Badge
                  className={
                    selectedUser.status === 'active'
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : selectedUser.status === 'suspended'
                      ? 'bg-red-100 text-red-700 border-red-200'
                      : 'bg-amber-100 text-amber-700 border-amber-200'
                  }
                >
                  {selectedUser.status}
                </Badge>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Phone</p>
                  <p className="text-slate-900">{selectedUser.phone}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="text-slate-900">{selectedUser.location}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Role</p>
                  <p className="text-slate-900 capitalize">{selectedUser.role}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Joined</p>
                  <p className="text-slate-900">{new Date(selectedUser.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Role-specific Info */}
              {selectedUser.role === 'customer' ? (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Customer Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Gigs Posted</p>
                      <p className="text-3xl text-slate-900">{selectedUser.gigsPosted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                      <p className="text-3xl text-slate-900">{selectedUser.totalSpent?.toLocaleString()} ALL</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    Laborer Statistics
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <p className="text-2xl text-slate-900">{selectedUser.rating}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Jobs</p>
                      <p className="text-2xl text-slate-900">{selectedUser.completedJobs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Credits</p>
                      <p className="text-2xl text-slate-900">{selectedUser.credits}</p>
                    </div>
                  </div>
                  {selectedUser.skills && (
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skills.map((skill, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-700 border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <DialogFooter className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleUserAction('message', selectedUser)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {selectedUser.status === 'active' ? (
                  <Button
                    onClick={() => handleUserAction('suspend', selectedUser)}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUserAction('activate', selectedUser)}
                    variant="outline"
                    className="flex-1 border-green-200 text-green-600 hover:bg-green-50 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'suspend' && 'Suspend User'}
              {actionType === 'activate' && 'Activate User'}
              {actionType === 'verify' && 'Verify Laborer'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'suspend' && 'This will temporarily restrict user access. You can reactivate them later.'}
              {actionType === 'activate' && 'This will restore full user access to the platform.'}
              {actionType === 'verify' && 'This will mark the laborer as verified and increase their credibility.'}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-600 mb-1">User</p>
                <p className="text-slate-900">{selectedUser.name}</p>
                <p className="text-sm text-slate-600">{selectedUser.email}</p>
              </div>
              {actionType === 'suspend' && (
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Reason for suspension (optional)</label>
                  <Textarea
                    placeholder="Enter reason..."
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              )}
              <DialogFooter className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowActionDialog(false);
                    setActionReason('');
                  }}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmAction}
                  className={`flex-1 rounded-xl ${
                    actionType === 'suspend' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {actionType === 'suspend' && 'Suspend'}
                  {actionType === 'activate' && 'Activate'}
                  {actionType === 'verify' && 'Verify'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
