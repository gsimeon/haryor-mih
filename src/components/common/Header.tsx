import React, { useState, useEffect } from 'react';
import {
  Ship,
  Plane,
  Truck,
  FileCheck,
  Globe2,
  Shield,
  Phone,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  User,
  Search,
  Package,
  Car,
  FileText,
  LogOut,
  Building,
  Languages,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Currency, SupportedLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    activeCurrency,
    setActiveCurrency,
    currentUser,
    loginAs,
    settings,
    currentLanguage,
    setLanguage,
    t,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['NGN', 'USD', 'GBP', 'EUR'];

  const servicesList = [
    { title: 'Air Freight', route: '/services/air-freight', desc: 'Fast priority air cargo to & from global airports' },
    { title: 'Sea Freight (FCL & LCL)', route: '/services/sea-freight', desc: 'Containerized ocean freight and consolidated cargo' },
    { title: 'Road Haulage & Transport', route: '/services/road-freight', desc: 'Reliable interstate & regional delivery trucks' },
    { title: 'Customs Clearance & PAAR', route: '/services/customs-clearance', desc: 'Form M, PAAR, NAFDAC & customs single goods clearing' },
    { title: 'Door-to-Door Logistics', route: '/services/door-to-door', desc: 'Seamless pickup to final destination delivery' },
    { title: 'Import & Export Solutions', route: '/services/import-export', desc: 'Commercial trade compliance and documentation' },
    { title: 'International Relocation', route: '/services/international-relocation', desc: 'Household effects & expatriate moving services' },
    { title: 'Vehicle Shipping & RoRo', route: '/services/vehicle-shipping', desc: 'Safe vehicle shipping from US, UK & Europe to Lagos' },
  ];

  return (
    <>
      {/* Top Corporate Bar */}
      <div id="top-corporate-bar" className="bg-slate-900/40 backdrop-blur-xl text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Building className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="font-semibold text-white">RC 1894520</span> | Licensed International Freight Forwarder
            </span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              Lagos: <a href="tel:+2348032345678" className="hover:text-white transition-colors">{settings.nigeriaPhones[0]}</a>
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              London: <a href="tel:+442081234567" className="hover:text-white transition-colors">{settings.ukPhones[0]}</a>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                id="header-language-toggle-btn"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl border border-white/15 backdrop-blur-md text-white text-xs font-semibold cursor-pointer transition shadow-sm"
                title="Select Interface Language"
                aria-label="Language Selector"
              >
                <Languages className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="text-sm leading-none">{activeLangObj.flag}</span>
                <span className="hidden sm:inline font-mono text-[11px] font-bold tracking-wider">
                  {activeLangObj.code.toUpperCase()}
                </span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>

              {langMenuOpen && (
                <div
                  id="header-language-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl py-2 z-50 text-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">
                      {t('topbar.language', 'INTERFACE LANGUAGE')}
                    </span>
                    <span className="text-[10px] text-[#FF8500] font-mono font-bold">
                      {SUPPORTED_LANGUAGES.length} Corridors
                    </span>
                  </div>
                  <div className="py-1">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-white/10 transition cursor-pointer ${
                          currentLanguage === lang.code
                            ? 'bg-[#FF6B00]/20 text-white font-bold border-l-2 border-[#FF6B00]'
                            : 'text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <div>
                            <div className="font-semibold text-xs leading-tight">{lang.nativeName}</div>
                            <div className="text-[10px] text-white/50 leading-tight">{lang.region}</div>
                          </div>
                        </div>
                        {currentLanguage === lang.code && (
                          <span className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-sm shadow-[#FF6B00]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15">
              <span className="text-[10px] text-white/50 font-medium">CURRENCY:</span>
              <select
                id="header-currency-select"
                value={activeCurrency}
                onChange={(e) => setActiveCurrency(e.target.value as Currency)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Persona / Portal Login Switcher */}
            <div className="relative">
              <button
                id="portal-persona-switcher-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-3 py-1 rounded-xl transition text-xs font-medium border border-white/20 backdrop-blur-md shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-[#FF6B00]" />
                {currentUser ? (
                  <span className="max-w-[140px] truncate font-semibold">
                    {currentUser.role === 'OPERATIONS'
                      ? 'Ops: Chioma'
                      : currentUser.role === 'SUPER_ADMIN'
                      ? 'Admin: Adebayo'
                      : 'Client: David'}
                  </span>
                ) : (
                  <span>Staff &amp; Client Login</span>
                )}
                <ChevronDown className="w-3 h-3 text-white/60 shrink-0" />
              </button>

              {userMenuOpen && (
                <div
                  id="user-persona-dropdown"
                  className="absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl py-2 z-50 text-xs overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <span className="text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                      Access Terminal
                    </span>
                    {currentUser && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {currentUser.role}
                      </span>
                    )}
                  </div>

                  {/* Operations Desk */}
                  <button
                    onClick={() => {
                      loginAs('OPERATIONS');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between text-slate-200 transition ${
                      currentUser?.role === 'OPERATIONS' ? 'bg-white/5 border-l-2 border-[#FF6B00]' : ''
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>Operations Desk</span>
                        {currentUser?.role === 'OPERATIONS' && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">ACTIVE</span>
                        )}
                      </div>
                      <div className="text-[11px] text-white/50">Freight dispatch, tracking &amp; milestones</div>
                    </div>
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  </button>

                  {/* Super Admin */}
                  <button
                    onClick={() => {
                      loginAs('SUPER_ADMIN');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between text-slate-200 transition ${
                      currentUser?.role === 'SUPER_ADMIN' ? 'bg-white/5 border-l-2 border-rose-500' : ''
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>Super Admin Command</span>
                        {currentUser?.role === 'SUPER_ADMIN' && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">ACTIVE</span>
                        )}
                      </div>
                      <div className="text-[11px] text-white/50">Executive controls, rates &amp; audit trails</div>
                    </div>
                    <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                  </button>

                  {/* Customer Portal */}
                  <button
                    onClick={() => {
                      loginAs('CUSTOMER');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-white/10 flex items-center justify-between text-slate-200 transition ${
                      currentUser?.role === 'CUSTOMER' ? 'bg-white/5 border-l-2 border-emerald-500' : ''
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>Customer Consignee Portal</span>
                        {currentUser?.role === 'CUSTOMER' && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">ACTIVE</span>
                        )}
                      </div>
                      <div className="text-[11px] text-white/50">Track orders, quotes &amp; pay invoices</div>
                    </div>
                    <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                  </button>

                  {/* Open Auth Portal with custom credentials */}
                  <div className="pt-1 mt-1 border-t border-white/10">
                    <button
                      onClick={() => {
                        navigateTo('/login');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-[#FF8500] font-semibold flex items-center justify-between transition"
                    >
                      <span>Custom Password Gateway</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  {/* Logout Button */}
                  {currentUser && (
                    <div className="pt-1 mt-1 border-t border-white/10">
                      <button
                        onClick={() => {
                          loginAs('VISITOR');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-950/40 text-rose-300 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out ({currentUser.name})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Action */}
            <a
              id="header-whatsapp-link"
              href={`https://wa.me/2348032345678?text=${encodeURIComponent(
                'Hello Haryor-Mih International Logistics! I would like to inquire about shipping and freight services.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-500/30 font-medium transition backdrop-blur-md text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/70 backdrop-blur-2xl shadow-2xl py-3 border-b border-white/15'
            : 'bg-slate-900/50 backdrop-blur-xl py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="brand-logo-button"
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 group-hover:border-[#FF6B00] transition-all">
              <span className="text-[#FF6B00]">H</span>M
            </div>
            <div>
              <div className="font-extrabold text-white tracking-wider text-base sm:text-lg leading-tight uppercase font-['Montserrat']">
                HARYOR-MIH
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#FF8500] font-bold tracking-widest uppercase">
                GLOBAL LOGISTICS &amp; AUTOTRADE
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            {/* Services with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services-button"
                onClick={() => navigateTo('/services')}
                className={`flex items-center gap-1 hover:text-[#FF8500] transition-colors py-2 ${
                  currentRoute.startsWith('/services') ? 'text-[#FF8500] font-semibold' : 'text-white/80'
                }`}
              >
                {t('nav.services', 'Services')}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {servicesDropdownOpen && (
                <div
                  id="services-nav-flyout"
                  className="absolute left-0 mt-1 w-80 bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF8500] border-b border-white/10 mb-1">
                    Specialized Logistics Divisions
                  </div>
                  {servicesList.map((s) => (
                    <button
                      key={s.route}
                      onClick={() => {
                        navigateTo(s.route);
                        setServicesDropdownOpen(false);
                      }}
                      className="text-left px-3 py-2.5 rounded-xl hover:bg-white/10 transition group"
                    >
                      <div className="font-semibold text-white group-hover:text-[#FF8500] text-xs transition-colors">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-white/50 leading-tight">
                        {s.desc}
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        navigateTo('/services');
                        setServicesDropdownOpen(false);
                      }}
                      className="w-full text-center text-xs text-[#FF8500] hover:text-[#FF6B00] font-semibold py-1"
                    >
                      View All 9 Services &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-shipping-hub-btn"
              onClick={() => navigateTo('/shipping')}
              className={`hover:text-[#FF8500] transition-colors ${
                currentRoute === '/shipping' ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              Shipping Hub
            </button>

            <button
              id="nav-track-shipment-btn"
              onClick={() => navigateTo('/track')}
              className={`hover:text-[#FF8500] transition-colors flex items-center gap-1.5 ${
                currentRoute === '/track' ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#FF6B00]" />
              {t('nav.tracking', 'Track Shipment')}
            </button>

            <button
              id="nav-autotrade-btn"
              onClick={() => navigateTo('/autotrade')}
              className={`hover:text-[#FF8500] transition-colors flex items-center gap-1.5 ${
                currentRoute.startsWith('/autotrade') ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#FF8500]" />
              {t('nav.vehicles', 'Auto Trade')}
            </button>

            <button
              id="nav-global-network-btn"
              onClick={() => navigateTo('/global-network')}
              className={`hover:text-[#FF8500] transition-colors flex items-center gap-1.5 ${
                currentRoute === '/global-network' || currentRoute === '/network' ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              Global Network
            </button>

            <button
              id="nav-about-btn"
              onClick={() => navigateTo('/about')}
              className={`hover:text-[#FF8500] transition-colors ${
                currentRoute.startsWith('/about') ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              {t('nav.about', 'About')}
            </button>

            <button
              id="nav-resources-btn"
              onClick={() => navigateTo('/resources')}
              className={`hover:text-[#FF8500] transition-colors ${
                currentRoute.startsWith('/resources') || currentRoute === '/faq' ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              {t('nav.resources', 'Resources & FAQ')}
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => navigateTo('/contact')}
              className={`hover:text-[#FF8500] transition-colors ${
                currentRoute === '/contact' ? 'text-[#FF8500] font-semibold' : 'text-white/80'
              }`}
            >
              {t('nav.contact', 'Contact')}
            </button>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => navigateTo(currentUser.role === 'CUSTOMER' ? '/portal' : '/admin')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-xl transition shadow-sm"
              >
                {currentUser.role === 'CUSTOMER' ? t('topbar.portal', 'Go to My Portal') : t('topbar.ops', 'Operations Dashboard')}
              </button>
            )}

            <button
              id="header-get-quote-cta-btn"
              onClick={() => navigateTo('/quote')}
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-[#FF6B00] hover:bg-[#FF8500] border border-white/20 backdrop-blur-md rounded-xl shadow-xl shadow-orange-950/40 hover:shadow-orange-900/60 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('nav.quote', 'Get a Quote')}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 backdrop-blur-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="lg:hidden bg-slate-900/90 backdrop-blur-2xl border-b border-white/15 px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-white/10">
              <button
                onClick={() => {
                  navigateTo('/quote');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#FF6B00] text-white text-xs font-bold rounded-xl text-center uppercase border border-white/20 shadow-lg"
              >
                Get a Quote
              </button>
              <button
                onClick={() => {
                  navigateTo('/track');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 text-center backdrop-blur-md"
              >
                Track Shipment
              </button>
            </div>

            {/* Mobile Language Selector Bar */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-white">
                  <Languages className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{t('topbar.language', 'Language')}</span>
                </span>
                <span className="text-[#FF8500] font-mono text-[10px]">
                  {activeLangObj.flag} {activeLangObj.nativeName}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                      currentLanguage === lang.code
                        ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-mono text-[11px] uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-slate-200">
              <button
                onClick={() => {
                  navigateTo('/');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.home', 'Home')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/services');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.services', 'Services')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/shipping');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.calculator', 'Freight Hub & Rates')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/autotrade');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00] font-semibold text-[#FF8500]"
              >
                {t('nav.vehicles', 'Auto Trade / Vehicle Sourcing')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/global-network');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                Global Network &amp; Routes
              </button>
              <button
                onClick={() => {
                  navigateTo('/about');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.about', 'About & Company Profile')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/resources');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.resources', 'Resources & Customs Guides')}
              </button>
              <button
                onClick={() => {
                  navigateTo('/contact');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 hover:text-[#FF6B00]"
              >
                {t('nav.contact', 'Contact Lagos & UK')}
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Staff &amp; Client Terminals</span>
                {currentUser && (
                  <span className="text-[10px] text-amber-400 font-mono">
                    Logged in: {currentUser.name.split(' ')[0]}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    loginAs('OPERATIONS');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition ${
                    currentUser?.role === 'OPERATIONS'
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-white'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Operations Desk</span>
                </button>

                <button
                  onClick={() => {
                    loginAs('SUPER_ADMIN');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition ${
                    currentUser?.role === 'SUPER_ADMIN'
                      ? 'bg-rose-500/20 border-rose-500 text-white'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">Super Admin</span>
                </button>

                <button
                  onClick={() => {
                    loginAs('CUSTOMER');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition ${
                    currentUser?.role === 'CUSTOMER'
                      ? 'bg-emerald-500/20 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Client Portal</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-2.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 text-left text-xs font-semibold text-[#FF8500] flex items-center gap-2 transition"
                >
                  <User className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Login Gateway</span>
                </button>
              </div>

              {currentUser && (
                <button
                  onClick={() => {
                    loginAs('VISITOR');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 mt-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/30 flex items-center justify-center gap-2 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out ({currentUser.name})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
