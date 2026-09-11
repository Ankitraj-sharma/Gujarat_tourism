import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Smartphone,
  Check,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';
import { INITIAL_USER_PROFILE } from '../data/citiesData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');

  // Email form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Phone form states
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStep, setOtpStep] = useState<'enter-phone' | 'enter-otp'>('enter-phone');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [isOtpTimerRunning, setIsOtpTimerRunning] = useState<boolean>(false);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Social login simulation modals
  const [socialModal, setSocialModal] = useState<'google' | 'facebook' | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrors({});
  }, [initialMode, isOpen]);

  // Timer for OTP countdown
  useEffect(() => {
    let interval: any;
    if (isOtpTimerRunning && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    } else if (otpTimer === 0) {
      setIsOtpTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isOtpTimerRunning, otpTimer]);

  if (!isOpen) return null;

  // Real-time password strength calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const passStrength = calculatePasswordStrength(password);
  const getStrengthText = () => {
    if (passStrength <= 1) return { label: 'Weak', color: 'text-red-600', bar: 'bg-red-500 w-1/4' };
    if (passStrength === 2) return { label: 'Fair', color: 'text-amber-600', bar: 'bg-amber-500 w-2/4' };
    if (passStrength === 3) return { label: 'Good', color: 'text-blue-600', bar: 'bg-blue-500 w-3/4' };
    return { label: 'Strong', color: 'text-emerald-600', bar: 'bg-emerald-500 w-full' };
  };

  // Validations
  const validateEmailForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'register') {
      if (!name.trim()) {
        newErrors.name = 'Please enter your full name';
      } else if (name.trim().length < 3) {
        newErrors.name = 'Name must be at least 3 characters';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'register' && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (mode === 'register' && passStrength < 2) {
      newErrors.password = 'Include a mix of uppercase letters, numbers, and symbols';
    }

    if (mode === 'register') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!agreeTerms) {
        newErrors.terms = 'You must agree to the Terms of Service & Privacy Policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePhone = () => {
    const newErrors: { [key: string]: string } = {};
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    if (!cleanNumber) {
      newErrors.phone = 'Mobile number is required';
    } else if (cleanNumber.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    } else if (!/^[6-9]/.test(cleanNumber)) {
      newErrors.phone = 'Indian mobile numbers must start with 6, 7, 8, or 9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Email Submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const loggedUser: UserProfile = {
        ...INITIAL_USER_PROFILE,
        name: mode === 'register' ? (name || 'Gujarat Traveler') : (email?.includes('ankit') ? 'Ankit Sharma' : (email || '').split('@')[0] || 'Traveler'),
        email: email || 'traveler@gujarat.tours',
        username: (email || '').split('@')[0] || 'traveler',
      };
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  // Handle Phone Submit
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep('enter-otp');
      setOtpTimer(30);
      setIsOtpTimerRunning(true);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) {
      setErrors({ otp: 'Please enter all 6 digits of the OTP' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const loggedUser: UserProfile = {
        ...INITIAL_USER_PROFILE,
        phone: `${countryCode} ${phoneNumber}`,
        name: 'Gujarat Traveler',
      };
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  // Social Login Triggers
  const handleGoogleLogin = () => {
    setSocialModal('google');
  };

  const confirmGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSocialModal(null);
      setIsLoading(false);
      onLoginSuccess({
        ...INITIAL_USER_PROFILE,
        name: 'Ankit Sharma',
        email: 'ankitrajsharma.125891@marwadiuniversity.ac.in',
      });
      onClose();
    }, 600);
  };

  const handleFacebookLogin = () => {
    setSocialModal('facebook');
  };

  const confirmFacebookLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSocialModal(null);
      setIsLoading(false);
      onLoginSuccess({
        ...INITIAL_USER_PROFILE,
        name: 'Ankit Sharma (Facebook)',
      });
      onClose();
    }, 600);
  };

  const handleGuestContinue = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      {/* Container Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-orange-100 flex flex-col">
        {/* Decorative Top Accent Banner */}
        <div className="h-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 w-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 flex flex-col">
          {/* Header Branding */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/25 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              {mode === 'login' ? 'Welcome Back to Gujarat' : 'Create Your Explorer Account'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login'
                ? 'Sign in to access your saved treasures, VIP aarti passes & smart itineraries'
                : 'Join millions exploring 33 districts, ancient temples, and coastal highways'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Register) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrors({});
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrors({});
              }}
              className={`py-2 rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register
            </button>
          </div>

          {/* Social Auth Providers (Google & Facebook) */}
          <div className="flex flex-col gap-2.5 mb-5">
            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook Button */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm font-semibold shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex py-1 items-center mb-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-xs uppercase tracking-wider font-semibold">
              Or use {authType === 'email' ? 'email' : 'mobile number'}
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Method Switcher: Email vs Phone */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setAuthType('email');
                setErrors({});
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                authType === 'email'
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email & Password</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => {
                setAuthType('phone');
                setErrors({});
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                authType === 'phone'
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone & OTP</span>
            </button>
          </div>

          {/* Auth Type 1: EMAIL & PASSWORD FORM */}
          {authType === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {/* Full Name (Only for Registration) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Ankit Sharma"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white outline-none transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password <span className="text-red-500">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(true)}
                      className="text-xs font-semibold text-orange-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    placeholder="Minimum 8 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white outline-none transition-all ${
                      errors.password
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}

                {/* Password strength meter for registration */}
                {mode === 'register' && password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${getStrengthText().bar}`} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Strength: <strong className={getStrengthText().color}>{getStrengthText().label}</strong></span>
                      <span>8+ chars, upper, number & symbol</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password (Only for Registration) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="Re-enter your password"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white outline-none transition-all ${
                        errors.confirmPassword
                          ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me / Terms Checkbox */}
              {mode === 'login' ? (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
                  />
                  <label htmlFor="remember-me">Keep me signed in on this device</label>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                      }}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 mt-0.5"
                    />
                    <label htmlFor="agree-terms" className="leading-tight">
                      I agree to the <span className="text-orange-600 font-semibold underline">Terms of Service</span> and <span className="text-orange-600 font-semibold underline">Gujarat Tourism Privacy Policy</span>.
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.terms}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Auth Type 2: PHONE NUMBER & OTP FORM */}
          {authType === 'phone' && (
            <div className="space-y-4">
              {otpStep === 'enter-phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-2.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 outline-none"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>
                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          maxLength={10}
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value.replace(/\D/g, ''));
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                          }}
                          placeholder="10-digit number (e.g. 9876543210)"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white outline-none transition-all ${
                            errors.phone
                              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                              : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                          }`}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 mt-1">
                      We'll send a 6-digit one-time verification code via SMS.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending SMS Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-slate-500">
                      Code sent to <strong className="text-slate-800">{countryCode} {phoneNumber}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setOtpStep('enter-phone')}
                      className="text-xs text-orange-600 font-bold ml-2 hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  {/* 6 Digit OTP input boxes */}
                  <div className="flex justify-between gap-1.5 sm:gap-2">
                    {otpValues.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const nextVals = [...otpValues];
                          nextVals[idx] = val;
                          setOtpValues(nextVals);
                          if (errors.otp) setErrors((prev) => ({ ...prev, otp: '' }));
                          // Auto focus next
                          if (val && idx < 5) {
                            const nextElem = document.getElementById(`otp-input-${idx + 1}`);
                            if (nextElem) nextElem.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && idx > 0) {
                            const prevElem = document.getElementById(`otp-input-${idx - 1}`);
                            if (prevElem) prevElem.focus();
                          }
                        }}
                        className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-slate-50 focus:bg-white"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.otp}</span>
                    </p>
                  )}

                  {/* Demo helper */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => setOtpValues(['1', '2', '3', '4', '5', '6'])}
                      className="text-orange-600 font-semibold hover:underline"
                    >
                      ⚡ Auto-fill Test Code (123456)
                    </button>
                    <div>
                      {isOtpTimerRunning ? (
                        <span>Resend in {otpTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpTimer(30);
                            setIsOtpTimerRunning(true);
                          }}
                          className="text-orange-600 font-bold hover:underline"
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Sign In</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Guest Explore Option */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleGuestContinue}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Skip for now • <span className="text-orange-600 font-bold underline">Explore as Guest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Google Interactive Account Picker Simulation */}
      {socialModal === 'google' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Sign in with Google</h4>
                <p className="text-[11px] text-slate-500">to continue to Explore Gujarat</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <button
                type="button"
                onClick={confirmGoogleLogin}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left transition-colors"
              >
                <img
                  src={INITIAL_USER_PROFILE.avatarUrl}
                  alt="Ankit Sharma"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm truncate">Ankit Sharma</div>
                  <div className="text-xs text-slate-500 truncate">ankitrajsharma.125891@marwadiuniversity.ac.in</div>
                </div>
              </button>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSocialModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmGoogleLogin}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facebook Interactive Confirmation Simulation */}
      {socialModal === 'facebook' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-lg">
                f
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Log in with Facebook</h4>
                <p className="text-[11px] text-slate-500">Explore Gujarat will receive your name and email</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl mb-6 flex items-center gap-3">
              <img
                src={INITIAL_USER_PROFILE.avatarUrl}
                alt="Facebook Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-slate-600">You previously logged in to Explore Gujarat with Facebook.</p>
                <p className="text-sm font-bold text-slate-900">Continue as Ankit?</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSocialModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmFacebookLogin}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166fe5] rounded-lg shadow-sm"
              >
                Continue as Ankit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base mb-1 font-serif">Reset Password</h4>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>

            {resetEmailSent ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs flex items-start gap-2.5 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Password Reset Link Sent!</strong>
                  Please check your inbox at <span className="font-semibold">{forgotEmail || email || 'your email'}</span>.
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail || email}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setResetEmailSent(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              {!resetEmailSent && (
                <button
                  type="button"
                  onClick={() => setResetEmailSent(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
