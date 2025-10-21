import { useState } from 'react';
import { ArrowLeft, Star, Upload, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import type { User as UserType, Gig, Review } from '../../App';
import { toast } from 'sonner@2.0.3';

interface LeaveReviewProps {
  gig: Gig;
  user: UserType;
  onBack: () => void;
  onReviewSubmitted: (review: Review) => void;
}

export default function LeaveReview({ gig, user, onBack, onReviewSubmitted }: LeaveReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      gigId: gig.id,
      customerId: user.id,
      customerName: user.name,
      laborId: gig.acceptedOfferId || '',
      rating,
      comment,
      photos,
      createdAt: new Date().toISOString(),
    };

    // Show success animation
    toast.success('Thank you for your review!', {
      description: 'Your feedback helps the community',
    });

    setTimeout(() => {
      onReviewSubmitted(review);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-gray-900">Leave a Review</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Gig Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Completed Gig</p>
          <p className="text-gray-900">{gig.title}</p>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-gray-900 mb-2">How was your experience?</h2>
            <p className="text-gray-600 text-sm">Tap a star to rate</p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-12 h-12 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-[#FDB913] text-[#FDB913]'
                      : 'fill-none text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Text */}
          {rating > 0 && (
            <div className="text-center">
              <p className="text-[#0077FF]">
                {rating === 5 && '⭐ Excellent!'}
                {rating === 4 && '👍 Great!'}
                {rating === 3 && '😊 Good'}
                {rating === 2 && '😐 Fair'}
                {rating === 1 && '😕 Poor'}
              </p>
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-gray-900 mb-2">Write your review</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tell others about your experience
            </p>
          </div>

          <Textarea
            placeholder="What did you like? What could be improved?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-32 rounded-xl resize-none"
          />

          <p className="text-gray-500 text-xs">
            Your review will be visible to other customers
          </p>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-2">Add photos (optional)</h3>
            <p className="text-gray-600 text-sm">
              Show the completed work
            </p>
          </div>

          <button className="w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0077FF] hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2">
            <Camera className="w-8 h-8 text-gray-400" />
            <span className="text-gray-600 text-sm">Tap to add photos</span>
          </button>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || !comment.trim()}
          className="w-full h-14 bg-[#0077FF] hover:bg-[#0066DD] disabled:bg-gray-300 disabled:text-gray-500 rounded-2xl shadow-lg"
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}
