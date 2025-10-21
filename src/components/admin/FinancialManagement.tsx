import { useState } from 'react';
import {
  ArrowLeft, DollarSign, TrendingUp, TrendingDown, Download, Search,
  CreditCard, Package, RefreshCw, CheckCircle, Clock, Calendar
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

interface FinancialManagementProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: 'credit_purchase' | 'platform_fee' | 'refund';
  user: {
    id: string;
    name: string;
    role: 'customer' | 'labor';
  };
  amount: number;
  credits?: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: 'cash' | 'bank_transfer';
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    type: 'credit_purchase',
    user: { id: 'l1', name: 'Arben Hoxha', role: 'labor' },
    amount: 5000,
    credits: 10,
    status: 'completed',
    date: '2025-10-21T10:30:00Z',
    paymentMethod: 'cash',
    description: '10 credits purchase'
  },
  {
    id: 'tx_002',
    type: 'platform_fee',
    user: { id: 'c1', name: 'Ana Krasniqi', role: 'customer' },
    amount: 450,
    status: 'completed',
    date: '2025-10-21T09:15:00Z',
    paymentMethod: 'cash',
    description: 'Platform fee for gig completion'
  },
  {
    id: 'tx_003',
    type: 'credit_purchase',
    user: { id: 'l2', name: 'Elena Krasniqi', role: 'labor' },
    amount: 10000,
    credits: 20,
    status: 'completed',
    date: '2025-10-20T15:45:00Z',
    paymentMethod: 'cash',
    description: '20 credits purchase'
  },
  {
    id: 'tx_004',
    type: 'refund',
    user: { id: 'l3', name: 'Besart Shehu', role: 'labor' },
    amount: 2500,
    credits: 5,
    status: 'completed',
    date: '2025-10-20T14:20:00Z',
    paymentMethod: 'cash',
    description: 'Refund for unused credits'
  },
  {
    id: 'tx_005',
    type: 'credit_purchase',
    user: { id: 'l4', name: 'Dritan Marku', role: 'labor' },
    amount: 2500,
    credits: 5,
    status: 'pending',
    date: '2025-10-21T11:00:00Z',
    paymentMethod: 'cash',
    description: '5 credits purchase - pending verification'
  },
];

export default function FinancialManagement({ onBack }: FinancialManagementProps) {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate stats
  const totalRevenue = transactions
    .filter(tx => tx.status === 'completed' && (tx.type === 'credit_purchase' || tx.type === 'platform_fee'))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalRefunds = transactions
    .filter(tx => tx.status === 'completed' && tx.type === 'refund')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const creditsSold = transactions
    .filter(tx => tx.status === 'completed' && tx.type === 'credit_purchase')
    .reduce((sum, tx) => sum + (tx.credits || 0), 0);

  const pendingAmount = transactions
    .filter(tx => tx.status === 'pending')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const todayRevenue = transactions
    .filter(tx => {
      const txDate = new Date(tx.date);
      const today = new Date();
      return txDate.toDateString() === today.toDateString() &&
             tx.status === 'completed' &&
             (tx.type === 'credit_purchase' || tx.type === 'platform_fee');
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit_purchase':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'platform_fee':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'refund':
        return <RefreshCw className="w-5 h-5 text-red-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'credit_purchase':
        return 'bg-blue-100 text-blue-700';
      case 'platform_fee':
        return 'bg-green-100 text-green-700';
      case 'refund':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
              <h1 className="text-gray-900">Financial Management</h1>
              <p className="text-gray-600 text-sm">Track revenue, transactions, and financial metrics</p>
            </div>
            <Button className="bg-[#0077FF] hover:bg-[#0066EE] text-white rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-sm opacity-90 mb-1">Total Revenue</p>
              <p className="text-2xl">{totalRevenue.toLocaleString()} ALL</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-sm opacity-90 mb-1">Credits Sold</p>
              <p className="text-2xl">{creditsSold}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-6 h-6" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-sm opacity-90 mb-1">Today's Revenue</p>
              <p className="text-2xl">{todayRevenue.toLocaleString()} ALL</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <RefreshCw className="w-6 h-6" />
                <TrendingDown className="w-4 h-4" />
              </div>
              <p className="text-sm opacity-90 mb-1">Total Refunds</p>
              <p className="text-2xl">{totalRefunds.toLocaleString()} ALL</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm opacity-90 mb-1">Pending</p>
              <p className="text-2xl">{pendingAmount.toLocaleString()} ALL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit_purchase">Credit Purchase</SelectItem>
                <SelectItem value="platform_fee">Platform Fee</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-gray-900">All Transactions</h2>
            <p className="text-gray-600 text-sm">Complete transaction history</p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(tx.type)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-gray-900 mb-1">{tx.description}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{tx.user.name}</span>
                          <span>•</span>
                          <span className="capitalize">{tx.user.role}</span>
                          <span>•</span>
                          <span>{new Date(tx.date).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg ${
                          tx.type === 'refund' ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {tx.type === 'refund' ? '-' : '+'}{tx.amount.toLocaleString()} ALL
                        </p>
                        {tx.credits && (
                          <p className="text-sm text-gray-500">{tx.credits} credits</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeBadgeColor(tx.type)}>
                        {tx.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-700">
                        {tx.paymentMethod}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-16">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
