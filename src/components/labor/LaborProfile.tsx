import { ArrowLeft, Star, MapPin, Phone, Mail, Edit, Shield, LogOut, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import type { User as UserType, Review } from '../../App';

interface LaborProfileProps {
  user: UserType;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

// Mock data - function scope to avoid user.id reference at module level
const getMockReviews = (userId: string): Review[] => [
  {
    id: '1',
    gigId: 'g1',
    customerId: 'c1',
    customerName: 'Ana Krasniqi',
    laborId: userId,
    rating: 5,
    comment: 'Excellent work! Very professional and completed the job quickly. Highly recommend!',
    createdAt: '2025-10-15T10:00:00Z',
  },
  {
    id: '2',
    gigId: 'g2',
    customerId: 'c2',
    customerName: 'Besart Hoxha',
    laborId: userId,
    rating: 4,
    comment: 'Good service, arrived on time and fixed the issue.',
    createdAt: '2025-10-10T14:00:00Z',
  },
  {
    id: '3',
    gigId: 'g3',
    customerId: 'c3',
    customerName: 'Linda Berisha',
    laborId: userId,
    rating: 5,
    comment: 'Great experience! Will hire again for future projects.',
    createdAt: '2025-10-05T16:00:00Z',
  },
];

const skills = ['Plumbing', 'Electrical Work', 'General Repairs'];
const completedJobs = 47;
const averageRating = 4.8;

export default function LaborProfile({ user, onBack, onLogout, onNavigate }: LaborProfileProps) {
  const mockReviews = getMockReviews(user.id);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-gray-900">Profile</h1>
        <button 
          onClick={() => onNavigate('edit-labor-profile')}
          className="text-gray-900"
        >
          <Edit className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-[#FDB913]">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-[#FDB913] text-white text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-gray-900">{user.name}</h2>
            <Shield className="w-5 h-5 text-[#0077FF]" />
          </div>

          <Badge className="bg-green-100 text-green-700 mb-4">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Professional
          </Badge>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-2xl text-gray-900 mb-1">{completedJobs}</p>
              <p className="text-gray-600 text-sm">Jobs Done</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 fill-[#FDB913] text-[#FDB913]" />
                <p className="text-2xl text-gray-900">{averageRating}</p>
              </div>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
            <div>
              <p className="text-2xl text-gray-900 mb-1">{mockReviews.length}</p>
              <p className="text-gray-600 text-sm">Reviews</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-gray-900 mb-3">Contact Information</h3>
          
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#0077FF]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-900">{user.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-gray-900">Tirana, Albania</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-3">Skills & Services</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-[#0077FF] px-3 py-1.5"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Reviews & Ratings</h2>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#FDB913] text-[#FDB913]" />
              <span className="text-gray-900">{averageRating}</span>
              <span className="text-gray-500 text-sm">({mockReviews.length})</span>
            </div>
          </div>

          <div className="space-y-3">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {review.customerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-900">{review.customerName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-[#FDB913] text-[#FDB913]'
                                : 'fill-none text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Options */}
        <div className="bg-white rounded-2xl shadow-medium p-4 space-y-2">
          <button 
            onClick={() => onNavigate('notifications')}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]"
          >
            <span className="text-gray-900">Notifications</span>
            <div className="w-5 h-5 rounded bg-[#0077FF]" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <span className="text-gray-900">Language</span>
            <span className="text-gray-500 text-sm">Albanian</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <span className="text-gray-900">Privacy Policy</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]">
            <span className="text-gray-900">Terms of Service</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
