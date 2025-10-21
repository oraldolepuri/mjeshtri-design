import { useState, useEffect } from 'react';
import { ArrowLeft, Activity, Users, DollarSign, TrendingUp, RefreshCw, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '../ui/badge';

interface RealtimeAnalyticsProps {
  onBack: () => void;
}

export default function RealtimeAnalytics({ onBack }: RealtimeAnalyticsProps) {
  const [realtimeData, setRealtimeData] = useState(generateInitialData());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev.slice(1)];
        const lastPoint = prev[prev.length - 1];
        newData.push({
          time: new Date().toLocaleTimeString(),
          users: lastPoint.users + Math.floor(Math.random() * 10 - 5),
          revenue: lastPoint.revenue + Math.floor(Math.random() * 2000 - 1000),
          gigs: lastPoint.gigs + Math.floor(Math.random() * 3 - 1),
          offers: lastPoint.offers + Math.floor(Math.random() * 15 - 7),
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  function generateInitialData() {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 180000);
      data.push({
        time: time.toLocaleTimeString(),
        users: 150 + Math.floor(Math.random() * 50),
        revenue: 25000 + Math.floor(Math.random() * 5000),
        gigs: 45 + Math.floor(Math.random() * 15),
        offers: 120 + Math.floor(Math.random() * 30),
      });
    }
    return data;
  }

  const currentMetrics = realtimeData[realtimeData.length - 1];

  return (
    <div className="h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={`${isLive ? 'bg-green-500' : 'bg-slate-400'} text-white`}>
                <div className={`w-2 h-2 rounded-full bg-white mr-2 ${isLive ? 'animate-pulse' : ''}`}></div>
                {isLive ? 'Live' : 'Paused'}
              </Badge>
              <p className="text-sm text-slate-600">Monitor platform activity in real-time</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsLive(!isLive)}
                variant="outline"
                className="rounded-xl"
              >
                {isLive ? 'Pause' : 'Resume'}
              </Button>
              <Button
                onClick={() => setRealtimeData(generateInitialData())}
                variant="outline"
                className="rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-6">
        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700 mb-1">Active Users</p>
            <p className="text-3xl text-blue-900">{currentMetrics.users}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-green-700 mb-1">Revenue (24h)</p>
            <p className="text-3xl text-green-900">{(currentMetrics.revenue / 1000).toFixed(1)}K</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-orange-700 mb-1">Active Gigs</p>
            <p className="text-3xl text-orange-900">{currentMetrics.gigs}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700 mb-1">Offers Sent</p>
            <p className="text-3xl text-purple-900">{currentMetrics.offers}</p>
          </Card>
        </div>

        {/* Active Users Chart */}
        <Card className="p-6">
          <h2 className="text-slate-900 mb-6">Active Users (Real-time)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={realtimeData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorUsers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue & Gigs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-slate-900 mb-6">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-slate-900 mb-6">Gigs & Offers</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={realtimeData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Bar dataKey="gigs" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                <Bar dataKey="offers" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card className="p-6">
          <h2 className="text-slate-900 mb-4">Live Activity Stream</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {[
              { event: 'New user registration', user: 'Klea Marku', time: '2s ago', type: 'user' },
              { event: 'Gig posted', user: 'Ana Krasniqi', time: '5s ago', type: 'gig' },
              { event: 'Offer sent', user: 'Arben Hoxha', time: '8s ago', type: 'offer' },
              { event: 'Payment received', user: 'Besart Shehu', time: '12s ago', type: 'payment' },
              { event: 'Gig completed', user: 'Elena Krasniqi', time: '15s ago', type: 'complete' },
              { event: 'Review posted', user: 'Dritan Marku', time: '18s ago', type: 'review' },
              { event: 'New user registration', user: 'Linda Berisha', time: '22s ago', type: 'user' },
              { event: 'Credit purchase', user: 'Erjon Mema', time: '25s ago', type: 'payment' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'gig' ? 'bg-orange-500' :
                    activity.type === 'offer' ? 'bg-purple-500' :
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'complete' ? 'bg-emerald-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="text-sm text-slate-900">{activity.event}</p>
                    <p className="text-xs text-slate-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
