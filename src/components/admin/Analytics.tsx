import {
  ArrowLeft, TrendingUp, Users, Briefcase, DollarSign, Star,
  Download, Calendar
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AnalyticsProps {
  onBack: () => void;
}

const userGrowthData = [
  { month: 'Jun', customers: 120, laborers: 180 },
  { month: 'Jul', customers: 160, laborers: 240 },
  { month: 'Aug', customers: 210, laborers: 310 },
  { month: 'Sep', customers: 290, laborers: 420 },
  { month: 'Oct', customers: 456, laborers: 778 },
];

const categoryPopularity = [
  { category: 'Plumber', gigs: 145, percentage: 28 },
  { category: 'Electrician', gigs: 123, percentage: 24 },
  { category: 'Painter', gigs: 98, percentage: 19 },
  { category: 'Handyman', gigs: 76, percentage: 15 },
  { category: 'Carpentry', gigs: 45, percentage: 9 },
  { category: 'Others', gigs: 25, percentage: 5 },
];

const topLaborers = [
  { name: 'Elena Krasniqi', rating: 4.95, jobs: 89, revenue: 125000 },
  { name: 'Arben Hoxha', rating: 4.8, jobs: 67, revenue: 98000 },
  { name: 'Besart Shehu', rating: 4.9, jobs: 55, revenue: 87000 },
  { name: 'Linda Berisha', rating: 4.75, jobs: 48, revenue: 72000 },
  { name: 'Dritan Marku', rating: 4.85, jobs: 42, revenue: 65000 },
];

const revenueData = [
  { month: 'Jun', revenue: 45000 },
  { month: 'Jul', revenue: 62000 },
  { month: 'Aug', revenue: 78000 },
  { month: 'Sep', revenue: 95000 },
  { month: 'Oct', revenue: 125000 },
];

export default function Analytics({ onBack }: AnalyticsProps) {
  const currentMonthRevenue = 125000;
  const previousMonthRevenue = 95000;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);

  const totalUsers = 1234;
  const previousTotalUsers = 1110;
  const userGrowth = ((totalUsers - previousTotalUsers) / previousTotalUsers * 100).toFixed(1);

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
              <h1 className="text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 text-sm">Platform performance insights and trends</p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px] rounded-xl">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#0077FF] hover:bg-[#0066EE] text-white rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+{userGrowth}%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl text-gray-900 mb-1">{totalUsers}</p>
            <p className="text-xs text-gray-500">+{totalUsers - previousTotalUsers} from last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+{revenueGrowth}%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-3xl text-gray-900 mb-1">{currentMonthRevenue.toLocaleString()} ALL</p>
            <p className="text-xs text-gray-500">+{(currentMonthRevenue - previousMonthRevenue).toLocaleString()} ALL from last month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+18%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Gigs</p>
            <p className="text-3xl text-gray-900 mb-1">87</p>
            <p className="text-xs text-gray-500">34 completed this week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+0.2</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
            <p className="text-3xl text-gray-900 mb-1">4.7</p>
            <p className="text-xs text-gray-500">Platform average rating</p>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">User Growth Trend</h2>
              <p className="text-sm text-gray-600">Monthly new user registrations</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm text-gray-600">Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                <span className="text-sm text-gray-600">Laborers</span>
              </div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {userGrowthData.map((data, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1 flex gap-2">
                    <div
                      className="bg-blue-600 rounded-lg h-10 flex items-center justify-end px-3 text-white text-sm transition-all hover:opacity-80"
                      style={{ width: `${(data.customers / 800) * 100}%` }}
                    >
                      {data.customers}
                    </div>
                    <div
                      className="bg-yellow-600 rounded-lg h-10 flex items-center justify-end px-3 text-white text-sm transition-all hover:opacity-80"
                      style={{ width: `${(data.laborers / 800) * 100}%` }}
                    >
                      {data.laborers}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Popularity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 mb-1">Category Popularity</h2>
            <p className="text-sm text-gray-600 mb-6">Gigs by service category</p>

            <div className="space-y-4">
              {categoryPopularity.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-900">{cat.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{cat.gigs} gigs</span>
                      <span className="text-sm text-gray-900">{cat.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 mb-1">Top Performing Laborers</h2>
            <p className="text-sm text-gray-600 mb-6">Highest-rated and most active</p>

            <div className="space-y-4">
              {topLaborers.map((laborer, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    #{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 text-sm mb-1">{laborer.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {laborer.rating}
                      </span>
                      <span>{laborer.jobs} jobs</span>
                      <span>{laborer.revenue.toLocaleString()} ALL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 mb-1">Revenue Trend</h2>
              <p className="text-sm text-gray-600">Monthly platform revenue (ALL)</p>
            </div>
          </div>

          <div className="space-y-4">
            {revenueData.map((data, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1">
                    <div
                      className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg h-12 flex items-center justify-between px-4 text-white transition-all hover:opacity-80"
                      style={{ width: `${(data.revenue / 150000) * 100}%` }}
                    >
                      <span className="text-sm">{data.revenue.toLocaleString()} ALL</span>
                      {idx > 0 && (
                        <TrendingUp className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-white mb-6">Platform Performance Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Completion Rate</p>
              <p className="text-3xl mb-1">94.5%</p>
              <p className="text-xs text-blue-100">Of accepted gigs</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Avg Response Time</p>
              <p className="text-3xl mb-1">2.4h</p>
              <p className="text-xs text-blue-100">Labor to customer</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Repeat Customers</p>
              <p className="text-3xl mb-1">67%</p>
              <p className="text-xs text-blue-100">Return rate</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Avg Gig Value</p>
              <p className="text-3xl mb-1">4,850</p>
              <p className="text-xs text-blue-100">ALL per gig</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
