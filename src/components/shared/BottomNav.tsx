import { Home, Plus, User } from 'lucide-react';
import type { UserRole } from '../../App';

interface BottomNavProps {
  currentScreen: string;
  userRole: UserRole;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ currentScreen, userRole, onNavigate }: BottomNavProps) {
  if (!userRole || userRole === 'admin') return null;

  const isCustomer = userRole === 'customer';
  const homeScreen = isCustomer ? 'customer-dashboard' : 'labor-dashboard';
  const createScreen = isCustomer ? 'create-gig' : 'gig-browser';
  const profileScreen = isCustomer ? 'customer-profile' : 'labor-profile';

  const isHomeActive = currentScreen === homeScreen;
  const isCreateActive = currentScreen === createScreen || 
    (isCustomer && currentScreen === 'create-gig') ||
    (!isCustomer && (currentScreen === 'gig-browser' || currentScreen === 'send-offer'));
  const isProfileActive = currentScreen === profileScreen ||
    (!isCustomer && currentScreen === 'labor-profile');

  const buttonClass = (isActive: boolean) => `
    flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-all relative
    ${isActive ? 'text-[#0077FF]' : 'text-gray-400'}
  `;

  const iconClass = (isActive: boolean) => `
    w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}
  `;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center">
        {/* Home Button */}
        <button
          onClick={() => onNavigate(homeScreen)}
          className={buttonClass(isHomeActive)}
        >
          {isHomeActive && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0077FF] rounded-b-full" />
          )}
          <Home className={iconClass(isHomeActive)} />
          <span className="text-xs">Home</span>
        </button>

        {/* Create Button - Elevated */}
        <button
          onClick={() => onNavigate(createScreen)}
          className="flex flex-col items-center justify-center flex-1 -mt-8 transition-transform active:scale-95"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-2xl shadow-strong flex items-center justify-center mb-1">
            <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs text-[#0077FF]">
            {isCustomer ? 'Create' : 'Browse'}
          </span>
        </button>

        {/* Profile Button */}
        <button
          onClick={() => onNavigate(profileScreen)}
          className={buttonClass(isProfileActive)}
        >
          {isProfileActive && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0077FF] rounded-b-full" />
          )}
          <User className={iconClass(isProfileActive)} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}
