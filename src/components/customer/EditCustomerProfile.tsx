import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';
import type { User as UserType } from '../../App';

interface EditCustomerProfileProps {
  user: UserType;
  onBack: () => void;
  onSave: (updatedUser: Partial<UserType>) => void;
}

export default function EditCustomerProfile({ user, onBack, onSave }: EditCustomerProfileProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [location, setLocation] = useState('Tirana, Albania'); // From the profile display
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    if (phone && phone.trim() && !/^[\d\s\+\-\(\)]+$/.test(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    // Simulate save delay
    setTimeout(() => {
      onSave({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });
      
      toast.success('Profile updated successfully!');
      setIsLoading(false);
      onBack();
    }, 500);
  };

  const handleAvatarChange = () => {
    toast.info('Photo upload coming soon!');
  };

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
          <h1 className="text-white text-xl">Edit Profile</h1>
          <div className="w-10" />
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-strong">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl bg-white text-[#0077FF]">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#FDB913] rounded-full flex items-center justify-center shadow-medium hover:scale-110 transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-4">Tap to change photo</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="px-6 -mt-16 relative z-20 pb-24">
        <div className="bg-white rounded-2xl shadow-medium p-6">
          <h3 className="text-gray-900 mb-6">Personal Information</h3>

          <div className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0077FF]" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 rounded-xl border-gray-200 focus:border-[#0077FF] focus:ring-[#0077FF]"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0077FF]" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl border-gray-200 focus:border-[#0077FF] focus:ring-[#0077FF]"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0077FF]" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+355 XX XXX XXXX"
                className="h-12 rounded-xl border-gray-200 focus:border-[#0077FF] focus:ring-[#0077FF]"
              />
              <p className="text-xs text-gray-500">
                We'll use this to contact you about your gigs
              </p>
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0077FF]" />
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Albania"
                className="h-12 rounded-xl border-gray-200 focus:border-[#0077FF] focus:ring-[#0077FF]"
              />
              <p className="text-xs text-gray-500">
                Help laborers find gigs near you
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mt-4">
          <p className="text-blue-900 text-sm">
            💡 <strong>Tip:</strong> Keep your contact information up to date to ensure laborers can reach you easily.
          </p>
        </div>

        {/* Save Button */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full h-14 rounded-xl bg-[#0077FF] hover:bg-[#0066EE] text-white shadow-soft"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <Button
            onClick={onBack}
            variant="outline"
            disabled={isLoading}
            className="w-full h-14 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
