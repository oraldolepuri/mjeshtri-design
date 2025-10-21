import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, DollarSign, Clock } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { User as UserType, Gig } from '../../App';

interface GigBrowserProps {
  user: UserType;
  onBack: () => void;
  onSelectGig: (gig: Gig) => void;
}

const allGigs: Gig[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Ana Krasniqi',
    title: 'Fix leaking bathroom pipe',
    description: 'My bathroom sink has been leaking for 2 days. Need urgent help to fix the pipe under the sink.',
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
    description: 'Need to install a new ceiling fan in bedroom. Fan is already purchased.',
    category: 'Electrician',
    budget: 4000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-21T09:30:00Z',
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'Erjon Mema',
    title: 'Paint living room walls',
    description: 'Need to repaint living room walls (approximately 40 square meters). Paint will be provided.',
    category: 'Painter',
    budget: 8000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-21T08:00:00Z',
  },
  {
    id: '4',
    customerId: 'c4',
    customerName: 'Linda Berisha',
    title: 'Fix broken door lock',
    description: 'Front door lock is broken and needs replacement. Need someone with experience.',
    category: 'Handyman',
    budget: 3000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-20T16:00:00Z',
  },
  {
    id: '5',
    customerId: 'c5',
    customerName: 'Alban Kola',
    title: 'Install kitchen cabinets',
    description: 'Need help installing new kitchen cabinets. All materials are ready.',
    category: 'Handyman',
    budget: 6000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-20T14:00:00Z',
  },
  {
    id: '6',
    customerId: 'c6',
    customerName: 'Dorina Hoxha',
    title: 'Repair electrical wiring',
    description: 'Some electrical outlets not working properly. Need licensed electrician.',
    category: 'Electrician',
    budget: 7000,
    location: 'Tirana, Albania',
    status: 'open',
    createdAt: '2025-10-20T12:00:00Z',
  },
];

const categories = ['All', 'Plumber', 'Electrician', 'Painter', 'Handyman', 'Other'];

export default function GigBrowser({ user, onBack, onSelectGig }: GigBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGigs = allGigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const gigDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - gigDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-gray-900">Browse Gigs</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search gigs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-gray-200"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#0077FF] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gigs List */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 text-sm">
            {filteredGigs.length} gig{filteredGigs.length !== 1 ? 's' : ''} found
          </p>
          <button className="flex items-center gap-2 text-[#0077FF] text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="space-y-3">
          {filteredGigs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-900 mb-2">No gigs found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredGigs.map((gig) => (
              <div
                key={gig.id}
                onClick={() => onSelectGig(gig)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{gig.title}</h3>
                      <Badge className="bg-blue-100 text-[#0077FF] text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {gig.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{gig.location.split(',')[0]}</span>
                  </div>
                  {gig.budget && (
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{gig.budget} ALL</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-700">
                      {gig.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeAgo(gig.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
