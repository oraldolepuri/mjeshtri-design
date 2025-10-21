import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, Briefcase, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import type { User as UserType } from '../../App';

interface EditLaborProfileProps {
  user: UserType;
  onBack: () => void;
  onSave: (updatedUser: Partial<UserType>) => void;
}

export default function EditLaborProfile({ user, onBack, onSave }: EditLaborProfileProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [location, setLocation] = useState('Tirana, Albania');
  const [bio, setBio] = useState('Experienced professional with 10+ years in the field. Licensed and insured.');
  const [skills, setSkills] = useState(['Plumbing', 'Electrical Work', 'General Repairs']);
  const [newSkill, setNewSkill] = useState('');
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

    if (skills.length === 0) {
      toast.error('Please add at least one skill');
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

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    if (skills.includes(newSkill.trim())) {
      toast.error('This skill is already added');
      return;
    }

    if (skills.length >= 10) {
      toast.error('Maximum 10 skills allowed');
      return;
    }

    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    toast.success('Skill added!');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAvatarChange = () => {
    toast.info('Photo upload coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FDB913] to-[#E5A500] pt-12 pb-24 px-6">
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
              <AvatarFallback className="text-2xl bg-white text-[#FDB913]">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button 
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#0077FF] rounded-full flex items-center justify-center shadow-medium hover:scale-110 transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-white/90 text-sm mt-4">Tap to change photo</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="px-6 -mt-16 relative z-20 pb-24 space-y-4">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-medium p-6">
          <h3 className="text-gray-900 mb-6">Personal Information</h3>

          <div className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-[#FDB913]" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913]"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FDB913]" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913]"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FDB913]" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+355 XX XXX XXXX"
                className="h-12 rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913]"
              />
              <p className="text-xs text-gray-500">
                Customers will use this to contact you
              </p>
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FDB913]" />
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Albania"
                className="h-12 rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913]"
              />
              <p className="text-xs text-gray-500">
                Find gigs near you
              </p>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-2xl shadow-medium p-6">
          <h3 className="text-gray-900 mb-6">Professional Information</h3>

          <div className="space-y-5">
            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FDB913]" />
                Bio
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell customers about your experience and expertise..."
                rows={4}
                className="rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913] resize-none"
              />
              <p className="text-xs text-gray-500">
                {bio.length}/500 characters
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#FDB913]" />
                Skills & Services
              </Label>
              
              <div className="flex gap-2">
                <Input
                  id="skills"
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Add a skill (e.g., Plumbing)"
                  className="h-12 rounded-xl border-gray-200 focus:border-[#FDB913] focus:ring-[#FDB913]"
                />
                <Button
                  onClick={handleAddSkill}
                  type="button"
                  className="h-12 px-6 rounded-xl bg-[#FDB913] hover:bg-[#E5A500] text-white"
                >
                  Add
                </Button>
              </div>

              {/* Skills List */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-[#FDB913]/10 text-[#FDB913] hover:bg-[#FDB913]/20 px-3 py-1.5 text-sm cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Click on a skill to remove it. Max 10 skills.
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
          <p className="text-yellow-900 text-sm">
            💡 <strong>Tip:</strong> A complete profile with detailed skills helps you get more gig offers!
          </p>
        </div>

        {/* Save Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full h-14 rounded-xl bg-[#FDB913] hover:bg-[#E5A500] text-white shadow-soft"
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
