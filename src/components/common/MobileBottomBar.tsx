import React from 'react';
import { Phone, MessageSquare, Calculator, User, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomBar: React.FC = () => {
  const { navigateTo, settings, currentUser } = useApp();

  return (
    <div
      id="mobile-bottom-action-bar"
      className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/85 backdrop-blur-2xl border-t border-white/15 py-2 px-3 flex items-center justify-around md:hidden shadow-2xl"
    >
      <a
        id="mobile-call-action-btn"
        href={`tel:${settings.nigeriaPhones[0].replace(/\s+/g, '')}`}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition"
      >
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 backdrop-blur-md">
          <Phone className="w-4 h-4 text-[#FF6B00]" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider">Call Hub</span>
      </a>

      <a
        id="mobile-whatsapp-action-btn"
        href={`https://wa.me/2348032345678?text=${encodeURIComponent(
          'Hello Haryor-Mih Logistics! I want to inquire about your cargo and shipping rates.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 transition"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 backdrop-blur-md">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
      </a>

      <button
        id="mobile-quote-action-btn"
        onClick={() => navigateTo('/quote')}
        className="flex flex-col items-center gap-1 text-[#FF8500] hover:text-[#FF6B00] transition"
      >
        <div className="w-8 h-8 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-lg shadow-orange-950 text-white border border-white/20 backdrop-blur-md">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">Get Quote</span>
      </button>

      <button
        id="mobile-portal-action-btn"
        onClick={() => {
          if (currentUser?.role === 'OPERATIONS' || currentUser?.role === 'SUPER_ADMIN') {
            navigateTo('/admin');
          } else if (currentUser?.role === 'CUSTOMER') {
            navigateTo('/portal');
          } else {
            navigateTo('/login');
          }
        }}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition"
      >
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 backdrop-blur-md">
          {currentUser?.role === 'SUPER_ADMIN' ? (
            <Shield className="w-4 h-4 text-rose-400" />
          ) : (
            <User className="w-4 h-4 text-amber-400" />
          )}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {currentUser ? (currentUser.role === 'CUSTOMER' ? 'Portal' : 'Ops Desk') : 'Login'}
        </span>
      </button>
    </div>
  );
};
