import { ArrowLeft, MapPin, DollarSign, Clock, Star, CheckCircle, X, MessageCircle, Award, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import type { User as UserType, Gig, Offer } from '../../App';
import { toast } from 'sonner@2.0.3';

interface GigDetailsProps {
  gig: Gig;
  user: UserType;
  onBack: () => void;
  onAcceptOffer: (offer: Offer) => void;
}

export default function GigDetails({ gig, user, onBack, onAcceptOffer }: GigDetailsProps) {
  const handleAcceptOffer = (offer: Offer) => {
    toast.success(`✅ Offer accepted from ${offer.laborName}! You can now chat with them.`);
    onAcceptOffer(offer);
  };

  const handleRejectOffer = (offer: Offer) => {
    toast.success('Offer declined');
  };

  const sortedOffers = gig.offers?.sort((a, b) => {
    // Sort by price (ascending)
    return a.price - b.price;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 shadow-soft sticky top-0 z-50">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-gray-900">Gig Details</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Gig Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-soft space-y-5 animate-slide-up">
          {/* Status Badge */}
          <Badge
            className={
              gig.status === 'open'
                ? 'bg-blue-100 text-[#0077FF] border-0'
                : gig.status === 'accepted'
                ? 'bg-green-100 text-green-700 border-0'
                : 'bg-gray-100 text-gray-700 border-0'
            }
          >
            {gig.status === 'open' ? '🔵 Open for Offers' : gig.status === 'accepted' ? '✅ In Progress' : '✓ Completed'}
          </Badge>

          {/* Title */}
          <div>
            <h2 className="text-gray-900 mb-2">{gig.title}</h2>
            <Badge variant="outline" className="border-blue-200 text-[#0077FF] bg-blue-50">
              {gig.category}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{gig.description}</p>

          <Separator />

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0077FF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Location</p>
                <p className="text-gray-900">{gig.location}</p>
              </div>
            </div>

            {gig.budget && (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Your Budget</p>
                  <p className="text-gray-900">{gig.budget.toLocaleString()} ALL</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Posted</p>
                <p className="text-gray-900">
                  {new Date(gig.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {gig.photos && gig.photos.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-gray-900 mb-3">Attached Photos</p>
                <div className="grid grid-cols-3 gap-2">
                  {gig.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-xl hover:scale-105 transition-transform cursor-pointer" />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Offers Section */}
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900">
                {gig.status === 'open' ? 'Offers Received' : 'Selected Offer'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {sortedOffers.length === 0 
                  ? 'Waiting for professionals to send offers'
                  : `${sortedOffers.length} ${sortedOffers.length === 1 ? 'offer' : 'offers'} • Sorted by price`
                }
              </p>
            </div>
            {sortedOffers.length > 0 && (
              <Badge className="bg-green-100 text-green-700 border-0">
                {sortedOffers.length}
              </Badge>
            )}
          </div>

          {sortedOffers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No offers yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Verified professionals are reviewing your gig. You'll receive notifications when offers arrive.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-2xl p-5 shadow-soft hover:shadow-medium transition-all ${
                    index === 0 ? 'ring-2 ring-green-500 ring-offset-2' : ''
                  }`}
                >
                  {index === 0 && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-green-50 rounded-xl -mx-1">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 text-xs">Best Price</span>
                    </div>
                  )}

                  {/* Labor Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14 border-2 border-white shadow-soft ring-2 ring-gray-100">
                      <AvatarImage src={offer.laborAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-[#0077FF] to-[#0066DD] text-white">
                        {offer.laborName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{offer.laborName}</h3>
                          <div className="flex items-center gap-3">
                            {offer.laborRating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-gray-900">{offer.laborRating}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Shield className="w-3 h-3" />
                              <span>Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                    <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-gray-900 text-sm">{offer.estimatedTime}</p>
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-10" />
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-green-600">{offer.price.toLocaleString()} ALL</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {offer.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleRejectOffer(offer)}
                        variant="outline"
                        className="flex-1 h-11 rounded-xl border-gray-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                      <Button
                        onClick={() => handleAcceptOffer(offer)}
                        className="flex-1 h-11 bg-gradient-to-r from-[#0077FF] to-[#0066DD] hover:from-[#0066DD] hover:to-[#0055CC] text-white rounded-xl shadow-soft"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Offer
                      </Button>
                    </div>
                  )}

                  {offer.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-green-700 mb-2">Offer Accepted!</p>
                          <Button
                            variant="outline"
                            className="w-full h-10 rounded-xl border-green-600 text-green-700 hover:bg-green-100"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message Professional
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        {gig.status === 'open' && sortedOffers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-[#0077FF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-900 mb-1">💡 Choosing an offer?</p>
                <p className="text-gray-600 text-sm">
                  Consider rating, price, and estimated time. You can message professionals after accepting their offer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
