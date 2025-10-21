import { useState } from 'react';
import { ArrowLeft, ChevronRight, Wrench, Zap, Droplet, Paintbrush, Hammer, Upload, MapPin, DollarSign, CheckCircle, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type { User as UserType, Gig } from '../../App';
import { toast } from 'sonner@2.0.3';

interface CreateGigProps {
  user: UserType;
  onBack: () => void;
  onGigCreated: (gig: Gig) => void;
}

const categories = [
  { id: 'plumber', name: 'Plumber', icon: Droplet, color: '#0077FF', gradient: 'from-blue-500 to-blue-600' },
  { id: 'electrician', name: 'Electrician', icon: Zap, color: '#FDB913', gradient: 'from-yellow-500 to-yellow-600' },
  { id: 'painter', name: 'Painter', icon: Paintbrush, color: '#10B981', gradient: 'from-green-500 to-green-600' },
  { id: 'handyman', name: 'Handyman', icon: Hammer, color: '#8B5CF6', gradient: 'from-purple-500 to-purple-600' },
  { id: 'carpenter', name: 'Carpenter', icon: Wrench, color: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
  { id: 'other', name: 'Other', icon: Wrench, color: '#6B7280', gradient: 'from-gray-500 to-gray-600' },
];

const quickBudgets = [
  { label: '2,000 ALL', value: 2000 },
  { label: '5,000 ALL', value: 5000 },
  { label: '10,000 ALL', value: 10000 },
  { label: '15,000 ALL', value: 15000 },
];

export default function CreateGig({ user, onBack, onGigCreated }: CreateGigProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    budget: '',
    location: 'Tirana, Albania',
    photos: [] as string[],
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const handleCategorySelect = (categoryId: string) => {
    setFormData({ ...formData, category: categoryId });
    setTimeout(() => setStep(2), 200);
  };

  const validateStep2 = () => {
    const newErrors = {
      title: '',
      description: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleNextFromStep2 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newGig: Gig = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: user.id,
      customerName: user.name,
      title: formData.title,
      description: formData.description,
      category: categories.find(c => c.id === formData.category)?.name || 'Other',
      budget: formData.budget ? parseInt(formData.budget) : undefined,
      location: formData.location,
      photos: formData.photos,
      status: 'open',
      createdAt: new Date().toISOString(),
      offers: [],
    };

    toast.success('🎉 Gig posted! Professionals will start sending offers soon.');
    onGigCreated(newGig);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0077FF] to-[#0066DD] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-gray-900 mb-2">What do you need help with?</h2>
              <p className="text-gray-500 text-sm">Select the type of professional you're looking for</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#0077FF] hover:shadow-medium transition-all active:scale-95 group"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-soft`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-gray-900 text-center">{category.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${
                  categories.find(c => c.id === formData.category)?.gradient
                } rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medium`}
              >
                {(() => {
                  const Icon = categories.find(c => c.id === formData.category)?.icon || Wrench;
                  return <Icon className="w-7 h-7 text-white" />;
                })()}
              </div>
              <h2 className="text-gray-900 mb-2">Describe Your Project</h2>
              <p className="text-gray-500 text-sm">The more details you provide, the better offers you'll get</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Fix leaking bathroom pipe"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: '' });
                  }}
                  className={`h-12 rounded-xl ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs flex items-center gap-1 animate-fade-in">
                    <X className="w-3 h-3" />
                    {errors.title}
                  </p>
                )}
                <p className="text-gray-500 text-xs">Be specific and clear</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what needs to be done, any specific requirements, urgency, etc."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  className={`min-h-32 rounded-xl resize-none ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs flex items-center gap-1 animate-fade-in">
                    <X className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs">
                  <p className="text-gray-500">Include as many details as possible</p>
                  <p className={`${formData.description.length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.description.length}/20 min
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="h-12 rounded-xl pl-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {quickBudgets.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: budget.value.toString() })}
                      className={`px-3 py-2 rounded-xl text-sm transition-all ${
                        formData.budget === budget.value.toString()
                          ? 'bg-[#0077FF] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Photos (Optional)</Label>
                <button
                  type="button"
                  className="w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0077FF] hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#0077FF]" />
                  </div>
                  <span className="text-gray-600 text-sm">Add photos to show the issue</span>
                  <span className="text-gray-400 text-xs">Up to 5 photos</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleNextFromStep2}
                className="flex-1 h-12 bg-[#0077FF] hover:bg-[#0066DD] rounded-xl"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-gray-900 mb-2">Where should they come?</h2>
              <p className="text-gray-500 text-sm">Confirm your location for accurate offers</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-12 rounded-xl pl-12"
                />
              </div>
              <p className="text-gray-500 text-xs">Your exact address will only be shared after you accept an offer</p>
            </div>

            {/* Mock Map */}
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-soft">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#0077FF] rounded-full flex items-center justify-center mx-auto mb-2 shadow-strong animate-bounce">
                  <MapPin className="w-8 h-8 text-white fill-white" />
                </div>
                <p className="text-gray-700">{formData.location.split(',')[0]}</p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 space-y-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-[#0077FF]" />
                <h3 className="text-gray-900">Review Your Gig</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600 text-sm">Category:</span>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const category = categories.find(c => c.id === formData.category);
                      const Icon = category?.icon || Wrench;
                      return (
                        <>
                          <div className={`w-6 h-6 bg-gradient-to-br ${category?.gradient} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-900">{category?.name}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="h-px bg-blue-200"></div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600 text-sm">Title:</span>
                  <span className="text-gray-900 text-right flex-1">{formData.title}</span>
                </div>
                <div className="h-px bg-blue-200"></div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600 text-sm">Description:</span>
                  <span className="text-gray-900 text-right flex-1 text-sm line-clamp-2">{formData.description}</span>
                </div>
                {formData.budget && (
                  <>
                    <div className="h-px bg-blue-200"></div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-600 text-sm">Budget:</span>
                      <span className="text-green-600">{parseInt(formData.budget).toLocaleString()} ALL</span>
                    </div>
                  </>
                )}
                <div className="h-px bg-blue-200"></div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600 text-sm">Location:</span>
                  <span className="text-gray-900 text-right flex-1">{formData.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <p className="text-yellow-800 text-sm">
                💡 <span className="font-medium">Pro tip:</span> Gigs with photos and budgets get 3x more offers!
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 bg-gradient-to-r from-[#0077FF] to-[#0066DD] hover:from-[#0066DD] hover:to-[#0055CC] text-white rounded-xl shadow-medium"
              >
                Post Gig
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 shadow-soft sticky top-0 z-50">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <div className="flex-1">
          <h1 className="text-gray-900">Create New Gig</h1>
          <p className="text-gray-500 text-sm">Step {step} of 3</p>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#0077FF] to-[#0066DD] transition-all duration-500 ${
                  s <= step ? 'translate-x-0' : '-translate-x-full'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 pb-24">
        {renderStep()}
      </div>
    </div>
  );
}
