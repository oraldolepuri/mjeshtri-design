import { useState } from 'react';
import { ArrowLeft, Download, FileText, Calendar, Filter, TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../ui/badge';

interface AdvancedReportingProps {
  onBack: () => void;
}

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4'];

export default function AdvancedReporting({ onBack }: AdvancedReportingProps) {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState({
    users: true,
    revenue: true,
    gigs: true,
    engagement: true,
  });

  const revenueData = [
    { month: 'Apr', revenue: 45000, gigs: 120, users: 380 },
    { month: 'May', revenue: 52000, gigs: 145, users: 420 },
    { month: 'Jun', revenue: 48000, gigs: 135, users: 450 },
    { month: 'Jul', revenue: 61000, gigs: 168, users: 510 },
    { month: 'Aug', revenue: 69000, gigs: 189, users: 580 },
    { month: 'Sep', revenue: 73000, gigs: 201, users: 645 },
    { month: 'Oct', revenue: 82000, gigs: 234, users: 720 },
  ];

  const categoryData = [
    { name: 'Plumbing', value: 35, count: 245 },
    { name: 'Electrical', value: 28, count: 196 },
    { name: 'Carpentry', value: 18, count: 126 },
    { name: 'Painting', value: 12, count: 84 },
    { name: 'HVAC', value: 7, count: 49 },
  ];

  const userGrowthData = [
    { week: 'Week 1', customers: 45, laborers: 32 },
    { week: 'Week 2', customers: 52, laborers: 38 },
    { week: 'Week 3', customers: 48, laborers: 42 },
    { week: 'Week 4', customers: 61, laborers: 51 },
  ];

  const topPerformers = [
    { name: 'Elena Krasniqi', jobs: 89, rating: 4.95, revenue: 125000 },
    { name: 'Besart Shehu', jobs: 67, rating: 4.90, revenue: 98000 },
    { name: 'Arben Hoxha', jobs: 45, rating: 4.85, revenue: 76000 },
    { name: 'Dritan Marku', jobs: 38, rating: 4.82, revenue: 64000 },
    { name: 'Erjon Mema', jobs: 34, rating: 4.78, revenue: 58000 },
  ];

  const handleExport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}`, {
      description: 'Your download will start shortly'
    });
  };

  return (
    <div className="h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Generate comprehensive platform reports</p>
            <div className="flex gap-3">
              <Button
                onClick={() => handleExport('pdf')}
                variant="outline"
                className="rounded-xl"
              >
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button
                onClick={() => handleExport('csv')}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button
                onClick={() => handleExport('excel')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="mb-2 block">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Platform Overview</SelectItem>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="users">User Analytics</SelectItem>
                  <SelectItem value="engagement">Engagement Metrics</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label className="mb-3 block">Metrics to Include</Label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedMetrics.users}
                    onCheckedChange={(checked) => setSelectedMetrics({...selectedMetrics, users: !!checked})}
                  />
                  <span className="text-sm">Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedMetrics.revenue}
                    onCheckedChange={(checked) => setSelectedMetrics({...selectedMetrics, revenue: !!checked})}
                  />
                  <span className="text-sm">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedMetrics.gigs}
                    onCheckedChange={(checked) => setSelectedMetrics({...selectedMetrics, gigs: !!checked})}
                  />
                  <span className="text-sm">Gigs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedMetrics.engagement}
                    onCheckedChange={(checked) => setSelectedMetrics({...selectedMetrics, engagement: !!checked})}
                  />
                  <span className="text-sm">Engagement</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700 mb-1">Total Users</p>
            <p className="text-3xl text-blue-900 mb-1">1,234</p>
            <p className="text-xs text-blue-600">+18% from last month</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-green-700 mb-1">Total Revenue</p>
            <p className="text-3xl text-green-900 mb-1">456K</p>
            <p className="text-xs text-green-600">+24% from last month</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-orange-700 mb-1">Total Gigs</p>
            <p className="text-3xl text-orange-900 mb-1">1,292</p>
            <p className="text-xs text-orange-600">+15% from last month</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700 mb-1">Avg Rating</p>
            <p className="text-3xl text-purple-900 mb-1">4.8</p>
            <p className="text-xs text-purple-600">+0.2 from last month</p>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-slate-900 mb-6">Revenue & Activity Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748B" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Revenue (ALL)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="gigs" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Gigs"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-slate-900 mb-6">Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* User Growth */}
        <Card className="p-6">
          <h2 className="text-slate-900 mb-6">User Growth (Last 4 Weeks)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="customers" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Customers" />
              <Bar dataKey="laborers" fill="#F59E0B" radius={[8, 8, 0, 0]} name="Laborers" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Performers Table */}
        <Card className="p-6">
          <h2 className="text-slate-900 mb-6">Top Performing Laborers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Rank</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Jobs Completed</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Rating</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-600">Revenue Generated</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((performer, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-slate-200 text-slate-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {idx + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{performer.name}</td>
                    <td className="py-4 px-4 text-slate-900">{performer.jobs}</td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        ⭐ {performer.rating}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-900">{performer.revenue.toLocaleString()} ALL</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
