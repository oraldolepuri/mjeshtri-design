import { useState } from 'react';
import { ArrowLeft, DollarSign, Clock, MapPin, AlertCircle, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import type { User as UserType, Gig, Offer } from '../../App';
import { toast } from 'sonner@2.0.3';

interface SendOfferProps {
  gig: Gig;
  user: UserType;
  onBack: () => void;
  onOfferSent: (offer: Offer) => void;
}

export default function SendOffer({ gig, user, onBack, onOfferSent }: SendOfferProps) {
  const [formData, setFormData] = useState({
    price: gig.budget?.toString() || '',
    description: '',
    estimatedTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.price || !formData.description || !formData.estimatedTime) {
      toast.error('Please fill in all fields');
      return;
    }

    if ((user.credits || 0) < 1) {
      toast.error('Insufficient credits', {
        description: 'You need at least 1 credit to send an offer',
      });
      return;
    }

    const offer: Offer = {
      id: Math.random().toString(36).substr(2, 9),
      gigId: gig.id,
      laborId: user.id,
      laborName: user.name,
      laborAvatar: user.avatar,
      price: parseInt(formData.price),
      description: formData.description,
      estimatedTime: formData.estimatedTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    toast.success('Offer sent successfully!', {
      description: '1 credit has been deducted',
    });

    onOfferSent(offer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-gray-900">Send Offer</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Gig Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h2 className="text-gray-900">{gig.title}</h2>
          <p className="text-gray-600 text-sm">{gig.description}</p>

          <div className="flex items-center gap-4 text-sm pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{gig.location}</span>
            </div>
            {gig.budget && (
              <div className="flex items-center gap-2 text-green-600">
                <DollarSign className="w-4 h-4" />
                <span>{gig.budget} ALL</span>
              </div>
            )}
          </div>
        </div>

        {/* Credit Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-900 text-sm mb-1">
              1 credit will be used to send this offer
            </p>
            <p className="text-yellow-700 text-xs">
              Current balance: {user.credits || 0} credits
            </p>
          </div>
        </div>

        {/* Offer Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-gray-900">Your Offer Details</h3>

          <div className="space-y-2">
            <Label htmlFor="price">Offer Price (ALL) *</Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="price"
                type="number"
                placeholder="Enter your price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="pl-12 h-12 rounded-xl"
                required
              />
            </div>
            {gig.budget && (
              <p className="text-gray-500 text-xs">
                Customer's budget: {gig.budget} ALL
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Estimated Time *</Label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="time"
                type="text"
                placeholder="e.g., 2 hours, 1 day"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                className="pl-12 h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your experience and approach to this job..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-32 rounded-xl resize-none"
              required
            />
            <p className="text-gray-500 text-xs">
              Highlight your experience and explain how you'll complete the job
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <p className="text-gray-900 text-sm">Offer Summary</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Your Price:</span>
                <span className="text-gray-900">{formData.price || '—'} ALL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Time:</span>
                <span className="text-gray-900">{formData.estimatedTime || '—'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="text-gray-600">Cost:</span>
                <span className="text-[#FDB913]">1 Credit</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={(user.credits || 0) < 1}
            className="w-full h-12 bg-[#0077FF] hover:bg-[#0066DD] disabled:bg-gray-300 disabled:text-gray-500 rounded-xl shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Offer (1 Credit)
          </Button>
        </form>
      </div>
    </div>
  );
}
