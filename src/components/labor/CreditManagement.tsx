import { ArrowLeft, Coins, Check, CreditCard, Clock, Zap, TrendingUp, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { User as UserType } from '../../App';
import { toast } from 'sonner@2.0.3';

interface CreditManagementProps {
  user: UserType;
  onBack: () => void;
  onCreditsUpdated: (newCredits: number) => void;
}

const creditPackages = [
  {
    id: 'starter',
    credits: 5,
    price: 500,
    popular: false,
    savings: null,
  },
  {
    id: 'popular',
    credits: 10,
    price: 900,
    popular: true,
    savings: 10,
  },
  {
    id: 'pro',
    credits: 20,
    price: 1600,
    popular: false,
    savings: 20,
  },
  {
    id: 'business',
    credits: 50,
    price: 3500,
    popular: false,
    savings: 30,
  },
];

const laborTransactions = [
  {
    id: '1',
    type: 'purchase',
    amount: 10,
    date: '2025-10-20T10:00:00Z',
    price: 900,
  },
  {
    id: '2',
    type: 'spent',
    amount: -1,
    date: '2025-10-19T14:30:00Z',
    gigTitle: 'Plumbing job offer',
  },
  {
    id: '3',
    type: 'spent',
    amount: -1,
    date: '2025-10-18T09:15:00Z',
    gigTitle: 'Electrical work offer',
  },
];

const customerTransactions = [
  {
    id: '1',
    type: 'purchase',
    amount: 5,
    date: '2025-10-20T10:00:00Z',
    price: 500,
  },
  {
    id: '2',
    type: 'spent',
    amount: -1,
    date: '2025-10-19T14:30:00Z',
    gigTitle: 'Promoted gig: Fix leaking pipe',
  },
];

export default function CreditManagement({ user, onBack, onCreditsUpdated }: CreditManagementProps) {
  const isCustomer = user.role === 'customer';
  const transactions = isCustomer ? customerTransactions : laborTransactions;

  const handlePurchase = (pkg: typeof creditPackages[0]) => {
    // Mock payment
    toast.success(`✅ Successfully purchased ${pkg.credits} credits!`, {
      description: `${pkg.price} ALL charged to your card`,
    });
    
    const newCredits = (user.credits || 0) + pkg.credits;
    onCreditsUpdated(newCredits);
  };

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
        <div className="flex-1">
          <h1 className="text-gray-900">Credits</h1>
          <p className="text-gray-500 text-sm">Manage your credit balance</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Balance Card */}
        <div className={`bg-gradient-to-br ${isCustomer ? 'from-[#0077FF] to-[#0066DD]' : 'from-[#FDB913] to-[#E5A60F]'} text-white rounded-3xl p-6 shadow-medium animate-slide-up`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-soft">
                <Coins className="w-7 h-7" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Available Credits</p>
                <p className="text-4xl">{user.credits || 0}</p>
              </div>
            </div>
            <Gift className="w-8 h-8 text-white/40" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-start gap-2">
              <Zap className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/90 text-sm mb-1">
                  {isCustomer ? 'How Credits Work for Customers' : 'How Credits Work for Professionals'}
                </p>
                <p className="text-white/80 text-xs leading-relaxed">
                  {isCustomer 
                    ? 'Use credits to promote your gigs and get priority placement. Promoted gigs receive 3x more offers from verified professionals.'
                    : 'Each credit allows you to send one offer to a customer\'s gig. Build your reputation by completing jobs successfully and earning 5-star reviews!'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        {isCustomer && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#0077FF] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-gray-900 mb-2">Why Buy Credits?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Boost your gigs to the top of professionals' feeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Receive offers faster from verified laborers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Get priority customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Credit Packages */}
        <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900">Credit Packages</h2>
              <p className="text-gray-500 text-sm mt-1">Choose the package that fits your needs</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {creditPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-5 shadow-soft border-2 transition-all hover:shadow-medium animate-slide-up ${
                  pkg.popular
                    ? 'border-[#FDB913] ring-2 ring-[#FDB913]/20 relative'
                    : 'border-white hover:border-gray-200'
                }`}
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FDB913] to-[#E5A60F] text-white border-0 shadow-soft px-3">
                      ⭐ Best Value
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-4 mt-2">
                  <div className="flex items-baseline justify-center gap-1.5 mb-1">
                    <span className="text-3xl text-gray-900">{pkg.credits}</span>
                    <Coins className={`w-5 h-5 ${pkg.popular ? 'text-[#FDB913]' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-gray-500 text-sm">credits</p>
                </div>

                {pkg.savings && (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-3">
                    <p className="text-green-700 text-xs text-center">
                      💰 Save {pkg.savings}%
                    </p>
                  </div>
                )}

                <div className="text-center mb-4">
                  <p className="text-gray-900 text-xl">{pkg.price.toLocaleString()} ALL</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {(pkg.price / pkg.credits).toFixed(0)} ALL per credit
                  </p>
                </div>

                <Button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full h-11 rounded-xl shadow-soft active:scale-95 transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#FDB913] to-[#E5A60F] hover:from-[#E5A60F] hover:to-[#FDB913] text-white'
                      : 'bg-gradient-to-r from-[#0077FF] to-[#0066DD] hover:from-[#0066DD] hover:to-[#0055CC] text-white'
                  }`}
                >
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-5 shadow-soft animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 border-2 border-[#0077FF] bg-blue-50 rounded-xl transition-all">
              <CreditCard className="w-5 h-5 text-[#0077FF]" />
              <span className="text-gray-900">Credit / Debit Card</span>
              <Check className="w-5 h-5 text-[#0077FF] ml-auto" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span>Secure payment powered by Stripe • SSL encrypted</span>
          </div>
        </div>

        {/* Transaction History */}
        <div className="animate-slide-up" style={{ animationDelay: '350ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900">Transaction History</h2>
              <p className="text-gray-500 text-sm mt-1">Track your credit usage</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft divide-y divide-gray-100 overflow-hidden">
            {transactions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No transactions yet</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'purchase'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    {transaction.type === 'purchase' ? (
                      <Coins className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm mb-1 truncate">
                      {transaction.type === 'purchase'
                        ? 'Credits Purchase'
                        : transaction.gigTitle}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p
                      className={`${
                        transaction.type === 'purchase'
                          ? 'text-green-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount}
                    </p>
                    {transaction.type === 'purchase' && (
                      <p className="text-gray-500 text-xs">
                        {transaction.price} ALL
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-100 rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-gray-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-900 mb-1">Do credits expire?</p>
              <p className="text-gray-600">No, your credits never expire and can be used anytime.</p>
            </div>
            <div>
              <p className="text-gray-900 mb-1">Can I get a refund?</p>
              <p className="text-gray-600">Unused credits can be refunded within 30 days of purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
