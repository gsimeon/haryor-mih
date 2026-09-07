import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Truck,
  UserCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Building2,
  Globe,
  HelpCircle,
  AlertCircle,
  X,
} from 'lucide-react';

interface AuthPortalProps {
  defaultRole?: 'OPERATIONS' | 'SUPER_ADMIN' | 'CUSTOMER';
  isModal?: boolean;
  onClose?: () => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({
  defaultRole = 'OPERATIONS',
  isModal = false,
  onClose,
}) => {
  const { loginWithCredentials, loginAs, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'OPERATIONS' | 'SUPER_ADMIN' | 'CUSTOMER'>(
    defaultRole
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-configured credential sets for effortless staff & client authentication
  const credentialsConfig = {
    OPERATIONS: {
      roleTitle: 'Operations Desk',
      subTitle: 'Freight Dispatch, Customs Examination & Consignment Tracking',
      badge: 'Internal Staff Terminal',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: Truck,
      officerName: 'Chioma Nwosu',
      officerDesignation: 'Lead Freight Operations Officer (Lagos Depot)',
      email: 'ops.chioma@haryormihlogistics.com',
      password: 'ops2026!cargo',
      accessScope: 'Consignment Milestones, Waybills, Port Inspection & Line Quotes',
      redirectTarget: '/admin',
    },
    SUPER_ADMIN: {
      roleTitle: 'Super Admin Command',
      subTitle: 'Managing Director & Root System Governance Console',
      badge: 'Executive Root Access',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      icon: Shield,
      officerName: 'Adebayo Ogunlesi',
      officerDesignation: 'Managing Director & Chief Executive',
      email: 'adebayo@haryormihlogistics.com',
      password: 'admin2026!exec',
      accessScope: 'Global Rates, FX Settings, n8n Automation Webhooks & Audit Logs',
      redirectTarget: '/admin',
    },
    CUSTOMER: {
      roleTitle: 'Customer Consignee Portal',
      subTitle: 'Consignment Management, Quote Approvals & Freight Invoices',
      badge: 'Consignee Client Access',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: UserCheck,
      officerName: 'David Adeleke',
      officerDesignation: 'Procurement Director (Apex Industrial Holdings)',
      email: 'david.adeleke@apexholdings.ng',
      password: 'client2026!',
      accessScope: 'Real-Time Air/Sea Tracking, Quote Approvals & Invoice Receipts',
      redirectTarget: '/portal',
    },
  };

  const currentConfig = credentialsConfig[activeTab];

  // Dynamic form state
  const [inputEmail, setInputEmail] = useState(currentConfig.email);
  const [inputPassword, setInputPassword] = useState(currentConfig.password);

  // Switch tab and automatically populate with corresponding demo credentials
  const handleTabSwitch = (role: 'OPERATIONS' | 'SUPER_ADMIN' | 'CUSTOMER') => {
    setActiveTab(role);
    setInputEmail(credentialsConfig[role].email);
    setInputPassword(credentialsConfig[role].password);
    setErrorMessage(null);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = loginWithCredentials(inputEmail, inputPassword, activeTab);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please verify email and password.');
      } else if (onClose) {
        onClose();
      }
    }, 400);
  };

  const handleInstantDemoLogin = (role: 'OPERATIONS' | 'SUPER_ADMIN' | 'CUSTOMER') => {
    setIsLoading(true);
    setTimeout(() => {
      loginAs(role);
      setIsLoading(false);
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  return (
    <div
      className={`${
        isModal
          ? 'relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-white overflow-hidden'
          : 'min-h-[85vh] flex items-center justify-center px-4 py-12'
      }`}
    >
      <div className={isModal ? 'w-full' : 'w-full max-w-3xl'}>
        {/* Container with Frosted Glass styling */}
        <div
          className={`${
            isModal
              ? ''
              : 'bg-white/[0.07] backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden'
          }`}
        >
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Close Button */}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header Title & Corporate Branding */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-slate-200 uppercase mb-3">
              <KeyRound className="w-3.5 h-3.5 text-[#FF8500]" />
              Secure Enterprise Gateway
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Haryor-Mih Terminal Access
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
              Select your authorization role to manage operations, inspect logistics workflows, or
              track cargo.
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 mb-8 relative z-10">
            <button
              type="button"
              onClick={() => handleTabSwitch('OPERATIONS')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'OPERATIONS'
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#E05E00] text-white shadow-lg shadow-[#FF6B00]/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Operations Desk</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('SUPER_ADMIN')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'SUPER_ADMIN'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('CUSTOMER')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'CUSTOMER'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Customer Portal</span>
            </button>
          </div>

          {/* Quick Demo Access Card */}
          <div className="bg-white/5 border border-white/15 rounded-2xl p-4 sm:p-5 mb-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <currentConfig.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {currentConfig.officerName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${currentConfig.badgeColor}`}
                    >
                      {currentConfig.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {currentConfig.officerDesignation}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
                    <span>Scope: {currentConfig.accessScope}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInstantDemoLogin(activeTab)}
                disabled={isLoading}
                className="w-full sm:w-auto shrink-0 px-5 py-2.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>1-Click Sign In</span>
                <ArrowRight className="w-4 h-4 text-[#FF8500]" />
              </button>
            </div>
          </div>

          {/* Divider with label */}
          <div className="relative my-6 text-center z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-slate-900/60 text-slate-400 text-xs uppercase font-bold tracking-wider">
              Or Sign In with Credentials
            </span>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Interactive Credentials Form */}
          <form onSubmit={handleManualLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider mb-1.5">
                Terminal Identifier / Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="name@haryormihlogistics.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                  Security Passcode
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setInputEmail(currentConfig.email);
                    setInputPassword(currentConfig.password);
                  }}
                  className="text-[11px] text-[#FF8500] hover:underline"
                >
                  Fill Default Passcode
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-slate-950/60 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#FF6B00] focus:ring-0 focus:ring-offset-0"
                />
                <span>Persist session on this workstation</span>
              </label>

              <span className="text-slate-400">Default: {currentConfig.password}</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FF6B00] to-[#E05E00] hover:from-[#ff791a] hover:to-[#e66408] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authorize &amp; Launch {currentConfig.roleTitle}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Security Notice */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 Encryption • ISO 27001 Certified Infrastructure</span>
            </div>
            <button
              onClick={() => navigateTo('/')}
              className="text-slate-300 hover:text-white underline"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
