import { useState } from 'react';
import { ChevronRight, Briefcase, MessageSquare, Star, Zap, Shield, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Zap,
    title: 'Find Skilled Professionals Instantly',
    description: 'Post your job and receive offers from verified laborers in your area. No more endless searching!',
    color: '#0077FF',
    gradient: 'from-blue-500 to-blue-600',
    bgPattern: 'opacity-10',
  },
  {
    icon: Shield,
    title: 'Compare & Choose the Best',
    description: 'Review ratings, prices, and estimated times. Pick the professional that fits your needs perfectly.',
    color: '#FDB913',
    gradient: 'from-yellow-500 to-yellow-600',
    bgPattern: 'opacity-10',
  },
  {
    icon: Star,
    title: 'Get It Done Right',
    description: 'Chat securely, track progress, pay with cash, and leave reviews to help our community grow.',
    color: '#10B981',
    gradient: 'from-green-500 to-green-600',
    bgPattern: 'opacity-10',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0077FF]/10 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FDB913]/10 to-transparent rounded-full blur-3xl translate-y-48 -translate-x-48"></div>

      {/* Skip Button */}
      <div className="relative z-10 p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Logo Badge */}
        <div className="mb-8">
          <div className={`w-20 h-20 bg-gradient-to-br ${slide.gradient} rounded-3xl flex items-center justify-center shadow-strong animate-scale-in`}>
            <span className="text-white text-2xl">M</span>
          </div>
        </div>

        {/* Icon Illustration */}
        <div 
          className={`w-48 h-48 rounded-full flex items-center justify-center mb-8 animate-slide-up shadow-medium`}
          style={{ 
            background: `linear-gradient(135deg, ${slide.color}15, ${slide.color}25)`,
            border: `2px solid ${slide.color}30`
          }}
        >
          <div className={`w-32 h-32 bg-gradient-to-br ${slide.gradient} rounded-full flex items-center justify-center shadow-medium`}>
            <Icon 
              className="w-16 h-16 text-white"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-center text-gray-900 mb-4 max-w-sm animate-fade-in px-4">
          {slide.title}
        </h1>
        <p className="text-center text-gray-600 max-w-md leading-relaxed animate-fade-in px-6" style={{ animationDelay: '100ms' }}>
          {slide.description}
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 px-8 pb-12">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-[#0077FF]' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          className={`w-full bg-gradient-to-r ${slide.gradient} hover:opacity-90 text-white rounded-2xl h-14 shadow-medium active:scale-[0.98] transition-all`}
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            <>
              Get Started
              <Zap className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
