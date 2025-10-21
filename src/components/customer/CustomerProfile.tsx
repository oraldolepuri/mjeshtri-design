import { ArrowLeft, User, Mail, Phone, MapPin, LogOut, Edit2, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { User as UserType } from '../../App';

interface CustomerProfileProps {
  user: UserType;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function CustomerProfile({ user, onBack, onLogout, onNavigate }: CustomerProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0077FF] to-[#0055CC] pt-12 pb-24 px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl">Profile</h1>
          <div className="w-10" />
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-strong">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl bg-white text-[#0077FF]">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={() => onNavigate('edit-customer-profile')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#FDB913] rounded-full flex items-center justify-center shadow-medium hover:scale-110 transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <h2 className="text-white text-2xl mt-4">{user.name}</h2>
          <p className="text-white/80 text-sm mt-1">Customer</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 -mt-16 relative z-20 space-y-4 pb-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-medium p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Personal Information</h3>
            <button 
              onClick={() => onNavigate('edit-customer-profile')}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-[#0077FF]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#0077FF]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-gray-900">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-[#0077FF]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#0077FF]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-[#0077FF]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0077FF]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-900">{user.phone || 'Not provided'}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-[#0077FF]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#0077FF]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-gray-900">Tirana, Albania</p>
              </div>
            </div>
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
          className="w-full h-14 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        {/* App Version */}
        <p className="text-center text-gray-400 text-xs pt-4">
          Mjeshtri v1.0.0
        </p>
      </div>
    </div>
  );
}
