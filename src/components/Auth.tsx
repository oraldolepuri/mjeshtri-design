import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Wrench, Mail, Lock, User, Phone, Users, Briefcase } from 'lucide-react';
import type { User as UserType } from '../App';

interface AuthProps {
  onLogin: (user: UserType) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'labor' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login/signup
    const role = isLogin ? 'customer' : (selectedRole || 'customer');
    const user: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'John Doe',
      email: formData.email,
      role: role,
      avatar: undefined,
      phone: formData.phone,
      credits: role === 'labor' ? 10 : 5, // Both get credits now
    };

    onLogin(user);
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const user: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Google User',
      email: 'user@gmail.com',
      role: 'customer',
      credits: 5,
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0077FF] via-[#0066DD] to-[#0055CC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FDB913]/20 rounded-full blur-3xl translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-strong">
              <span className="text-[#0077FF] text-2xl">M</span>
            </div>
            <div className="text-left">
              <h1 className="text-white mb-0">{t('app.name')}</h1>
              <p className="text-white/80 text-sm">{t('app.tagline')}</p>
            </div>
          </div>
          <p className="text-white/90 max-w-sm mx-auto">
            {t('app.description')}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-strong p-8 animate-scale-in">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                setIsLogin(true);
                setSelectedRole(null);
              }}
              className={`flex-1 py-3 rounded-xl transition-all ${
                isLogin
                  ? 'bg-white shadow-soft text-[#0077FF]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('auth.login')}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setSelectedRole(null);
              }}
              className={`flex-1 py-3 rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white shadow-soft text-[#0077FF]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('auth.signup')}
            </button>
          </div>

          {/* Role Selection (Only for Signup) */}
          {!isLogin && !selectedRole && (
            <div className="space-y-4 animate-slide-up">
              <div className="text-center mb-6">
                <h3 className="text-gray-900 mb-2">{t('auth.chooseRole')}</h3>
                <p className="text-gray-500 text-sm">{t('auth.selectRoleDesc')}</p>
              </div>
              
              <button
                onClick={() => setSelectedRole('customer')}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0077FF] hover:bg-blue-50 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-gray-900 mb-1">{t('auth.iAmCustomer')}</p>
                    <p className="text-gray-500 text-sm">{t('auth.customerDesc')}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('labor')}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-[#FDB913] hover:bg-yellow-50 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-gray-900 mb-1">{t('auth.iAmLaborer')}</p>
                    <p className="text-gray-500 text-sm">{t('auth.laborerDesc')}</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Login Form or Signup Form */}
          {(isLogin || selectedRole) && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
              {!isLogin && (
                <>
                  {/* Role Badge */}
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                    selectedRole === 'customer' ? 'bg-blue-50' : 'bg-yellow-50'
                  }`}>
                    {selectedRole === 'customer' ? (
                      <Users className="w-5 h-5 text-[#0077FF]" />
                    ) : (
                      <Wrench className="w-5 h-5 text-[#FDB913]" />
                    )}
                    <span className={selectedRole === 'customer' ? 'text-[#0077FF]' : 'text-[#FDB913]'}>
                      {t('auth.signingUpAs')} {selectedRole === 'customer' ? t('auth.customer') : t('auth.laborer')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">{t('auth.fullName')}</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('auth.enterName')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0077FF]"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0077FF]"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+355 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0077FF]"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#0077FF]"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-[#0077FF] text-sm hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#0077FF] to-[#0066DD] hover:from-[#0066DD] hover:to-[#0055CC] text-white rounded-xl shadow-medium active:scale-[0.98] transition-all"
              >
                {isLogin ? t('auth.loginButton') : t('auth.createAccount')}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">{t('auth.orContinueWith')}</span>
                </div>
              </div>

              {/* Social Login */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Demo Login Buttons */}
              {isLogin && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-xs text-center mb-3">🚀 Quick Demo Access</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Button
                      type="button"
                      onClick={() => onLogin({
                        id: 'demo-customer',
                        name: 'Demo Customer',
                        email: 'customer@demo.com',
                        role: 'customer',
                        credits: 5,
                      })}
                      variant="outline"
                      className="h-12 rounded-xl border-2 border-blue-200 text-[#0077FF] hover:bg-blue-50 active:scale-95 transition-all"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Customer
                    </Button>
                    <Button
                      type="button"
                      onClick={() => onLogin({
                        id: 'demo-labor',
                        name: 'Demo Pro',
                        email: 'labor@demo.com',
                        role: 'labor',
                        credits: 10,
                      })}
                      variant="outline"
                      className="h-12 rounded-xl border-2 border-yellow-200 text-[#FDB913] hover:bg-yellow-50 active:scale-95 transition-all"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Professional
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => onLogin({
                      id: 'demo-admin',
                      name: 'Admin User',
                      email: 'admin@mjeshtri.com',
                      role: 'admin',
                      credits: 0,
                    })}
                    variant="outline"
                    className="w-full h-12 rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50 active:scale-95 transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Admin Dashboard
                  </Button>
                </div>
              )}
            </form>
          )}

          {!isLogin && selectedRole && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-[#0077FF] text-sm hover:underline flex items-center justify-center mx-auto gap-1"
              >
                ← Change Role
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-white/60 text-xs text-center mt-6">
          By continuing, you agree to Mjeshtri's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
