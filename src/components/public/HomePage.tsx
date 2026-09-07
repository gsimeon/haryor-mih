import React, { useState } from 'react';
import {
  Plane,
  Ship,
  Truck,
  FileCheck,
  Package,
  Globe2,
  Car,
  Home,
  ShieldCheck,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  Building,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Users,
  Compass,
  Scale,
  Calculator,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShippingCostCalculator } from './ShippingCostCalculator';

export const HomePage: React.FC = () => {
  const { navigateTo, shipments, vehicles, formatCurrency, settings, t } = useApp();
  const [quickTrackingInput, setQuickTrackingInput] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackingInput.trim()) return;
    navigateTo('/track', { query: quickTrackingInput.trim() });
  };

  const services = [
    {
      id: 'air-freight',
      icon: <Plane className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Air Freight Priority',
      desc: 'Scheduled air cargo and priority express connecting UK Heathrow, Europe, China and US directly to Lagos (LOS).',
      route: '/services/air-freight',
      badge: 'Fastest Transit',
    },
    {
      id: 'sea-freight',
      icon: <Ship className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Sea Freight (FCL & LCL)',
      desc: 'Full Container Load (20ft/40ft/Reefer) and consolidated Less than Container Load into Apapa & Tin Can Island ports.',
      route: '/services/sea-freight',
      badge: 'Cost-Effective',
    },
    {
      id: 'road-freight',
      icon: <Truck className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Road Haulage & Distribution',
      desc: 'Dedicated interstate container trailers and regional haulage ensuring cargo arrives securely at your warehouse.',
      route: '/services/road-freight',
      badge: 'Nationwide',
    },
    {
      id: 'customs-clearance',
      icon: <FileCheck className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Customs Clearance & PAAR',
      desc: 'Expert assistance with Form M, Pre-Arrival Assessment Report (PAAR), NAFDAC & SONCAP document compliance.',
      route: '/services/customs-clearance',
      badge: 'Compliant & Fast',
    },
    {
      id: 'door-to-door',
      icon: <Package className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Door-to-Door Logistics',
      desc: 'Complete end-to-end management from origin warehouse pickup to destination delivery with single billing.',
      route: '/services/door-to-door',
      badge: 'Zero Stress',
    },
    {
      id: 'import-export',
      icon: <Globe2 className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Import & Export Trade',
      desc: 'Commercial commodities, agricultural exports (sesame, ginger, minerals) and industrial imports with trade advisory.',
      route: '/services/import-export',
      badge: 'Global Markets',
    },
    {
      id: 'international-relocation',
      icon: <Home className="w-6 h-6 text-[#FF6B00]" />,
      title: 'International Relocation',
      desc: 'Safe expatriate and family household moving with professional export packing, customs clearance, and delivery.',
      route: '/services/international-relocation',
      badge: 'White Glove',
    },
    {
      id: 'vehicle-shipping',
      icon: <Car className="w-6 h-6 text-[#FF6B00]" />,
      title: 'Vehicle Shipping & RoRo',
      desc: 'Roll-on/Roll-off and dedicated container vehicle shipping from US and UK ports directly to Lagos terminals.',
      route: '/services/vehicle-shipping',
      badge: 'Car Dealerships',
    },
  ];

  const howItWorksSteps = [
    { num: '01', title: 'REQUEST', desc: 'Specify cargo specs, origin, destination and timeline via our multi-step quote wizard.' },
    { num: '02', title: 'QUOTE', desc: 'Our commercial desk issues an itemized, transparent freight quotation with no hidden fees.' },
    { num: '03', title: 'BOOK', desc: 'Confirm terms, upload documentation, and lock in guaranteed air/ocean carrier capacity.' },
    { num: '04', title: 'SHIP', desc: 'Cargo is inspected, gated-in, and dispatched on scheduled global carrier vessels or flights.' },
    { num: '05', title: 'TRACK', desc: 'Monitor your consignment via our live milestone tracking engine with verified event timestamps.' },
    { num: '06', title: 'DELIVER', desc: 'Seamless customs release and final transport to your warehouse, doorstep, or showroom.' },
  ];

  const featuredVehicles = vehicles.filter((v) => v.status === 'AVAILABLE' || v.status === 'IN_TRANSIT').slice(0, 3);

  return (
    <div id="home-page-container" className="bg-transparent text-slate-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative text-white pt-12 pb-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-semibold text-white/90 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span>UK • NIGERIA • USA • CHINA CARGO CORRIDORS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Montserrat'] leading-tight">
                {t('hero.title', 'MOVE YOUR BUSINESS')} <br />
                <span className="text-[#FF8500]">{t('hero.highlight', 'BEYOND BORDERS.')}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                {t(
                  'hero.subtitle',
                  'Reliable air, sea and road freight solutions connecting businesses and individuals to global markets. Specialized in Form M & PAAR documentation, port logistics, and direct vehicle auto trade.'
                )}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  id="hero-get-quote-btn"
                  onClick={() => navigateTo('/quote')}
                  className="px-6 py-3.5 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-2xl shadow-orange-950/60 transition-all text-center flex items-center justify-center gap-2 cursor-pointer group border border-white/20 backdrop-blur-md"
                >
                  {t('hero.cta_quote', 'Get a Shipping Quote')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  id="hero-calc-rates-btn"
                  href="#shipping-cost-calculator"
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white font-semibold rounded-2xl text-sm text-center flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
                >
                  <Calculator className="w-4 h-4 text-[#FF8500]" />
                  <span>{t('hero.calc_rates', 'Calculate Rates')}</span>
                </a>

                <button
                  id="hero-track-shipment-btn"
                  onClick={() => navigateTo('/track')}
                  className="px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-xl text-white font-semibold rounded-2xl text-sm text-center flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#FF6B00]" />
                  {t('hero.cta_track', 'Track Shipment')}
                </button>
              </div>

              {/* Key Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-bold text-white text-base font-mono">RC 1894520</div>
                  <div className="text-[11px] text-white/60">CAC Corporate Registered</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base font-mono">UK &amp; Lagos</div>
                  <div className="text-[11px] text-white/60">Direct Physical Hubs</div>
                </div>
                <div>
                  <div className="font-bold text-white text-base font-mono">PAAR / Form M</div>
                  <div className="text-[11px] text-white/60">Customs Brokerage</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick Track Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white/[0.08] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">Quick Shipment Tracker</h3>
                    <p className="text-xs text-white/60">Instant lookup with real-time status</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                </div>

                <form onSubmit={handleQuickTrack} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5 uppercase tracking-wider">
                      Tracking Reference
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. HM-2026-000123"
                        value={quickTrackingInput}
                        onChange={(e) => setQuickTrackingInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 focus:border-[#FF6B00] rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-white/40 focus:outline-none backdrop-blur-md transition"
                      />
                      <Search className="w-4 h-4 text-white/50 absolute right-4 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-xl border border-white/20 backdrop-blur-md"
                  >
                    Locate Shipment
                  </button>
                </form>

                {/* Pre-seeded demo tracking badges */}
                <div className="mt-5 pt-4 border-t border-white/10 text-xs">
                  <span className="text-white/60 block mb-2 font-medium">Quick Demo Shipments:</span>
                  <div className="flex flex-wrap gap-2">
                    {shipments.slice(0, 3).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigateTo('/track', { query: s.id })}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[#FF8500] hover:text-white rounded-lg font-mono text-[11px] border border-white/15 backdrop-blur-md transition"
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS SECTION */}
      <section id="quick-actions-section" className="py-12 bg-white/[0.02] backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <button
              onClick={() => navigateTo('/quote')}
              className="p-6 rounded-3xl bg-white/[0.06] hover:bg-white/[0.12] group text-left border border-white/10 hover:border-[#FF6B00]/60 transition-all shadow-xl hover:shadow-2xl cursor-pointer backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 group-hover:bg-[#FF6B00] flex items-center justify-center mb-4 transition-colors backdrop-blur-md">
                <FileCheck className="w-6 h-6 text-[#FF8500] group-hover:text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#FF8500] transition-colors">
                GET A QUOTE
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Itemized shipping quotes for air, ocean, road, or vehicle cargo.
              </p>
            </button>

            <button
              onClick={() => navigateTo('/track')}
              className="p-6 rounded-3xl bg-white/[0.06] hover:bg-white/[0.12] group text-left border border-white/10 hover:border-[#FF6B00]/60 transition-all shadow-xl hover:shadow-2xl cursor-pointer backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 group-hover:bg-[#FF6B00] flex items-center justify-center mb-4 transition-colors backdrop-blur-md">
                <Search className="w-6 h-6 text-sky-400 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#FF8500] transition-colors">
                TRACK SHIPMENT
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Real-time milestone updates from departure to customs and delivery.
              </p>
            </button>

            <button
              onClick={() => navigateTo('/shipping')}
              className="p-6 rounded-3xl bg-white/[0.06] hover:bg-white/[0.12] group text-left border border-white/10 hover:border-[#FF6B00]/60 transition-all shadow-xl hover:shadow-2xl cursor-pointer backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 group-hover:bg-[#FF6B00] flex items-center justify-center mb-4 transition-colors backdrop-blur-md">
                <Ship className="w-6 h-6 text-emerald-400 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#FF8500] transition-colors">
                SHIP WITH US
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Explore guidelines, container sizes, Form M, and documentation.
              </p>
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className="p-6 rounded-3xl bg-white/[0.06] hover:bg-white/[0.12] group text-left border border-white/10 hover:border-[#FF6B00]/60 transition-all shadow-xl hover:shadow-2xl cursor-pointer backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 group-hover:bg-[#FF6B00] flex items-center justify-center mb-4 transition-colors backdrop-blur-md">
                <PhoneCall className="w-6 h-6 text-amber-400 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#FF8500] transition-colors">
                CONTACT US
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Speak directly with our Lagos operations desk or London cargo hub.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* REAL-TIME SHIPPING COST CALCULATOR SECTION */}
      <section id="realtime-calculator-section" className="py-12 sm:py-16 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ShippingCostCalculator />
        </div>
      </section>

      {/* 3. SERVICES SECTION ("LOGISTICS WITHOUT BORDERS") */}
      <section id="services-section" className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
                Comprehensive Cargo Divisions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
                LOGISTICS WITHOUT BORDERS
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/services')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#FF8500] hover:text-[#FF6B00] transition"
            >
              VIEW ALL 9 SERVICES &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all hover:shadow-2xl flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center group-hover:scale-105 transition-transform">
                      {svc.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white/80 backdrop-blur-md">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-[#FF8500] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo(svc.route)}
                  className="text-xs font-bold text-[#FF8500] hover:text-[#FF6B00] inline-flex items-center gap-1.5 transition pt-3 border-t border-white/10"
                >
                  Learn More
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUOTE CTA BANNER */}
      <section id="quote-cta-banner" className="py-16 bg-white/[0.05] backdrop-blur-2xl border-y border-white/15 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <div className="text-xs font-bold text-[#FF8500] uppercase tracking-widest">
              Ready to Ship Commercial or Personal Cargo?
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat']">
              Get an Itemized Rate from Our Freight Specialists
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl">
              We provide accurate ocean, air, and haulage pricing tailored to your cargo dimensions, customs classification, and target arrival deadline.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/quote')}
            className="shrink-0 px-8 py-4 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-2xl transition cursor-pointer border border-white/20 backdrop-blur-md"
          >
            REQUEST A SHIPPING QUOTE &rarr;
          </button>
        </div>
      </section>

      {/* 5. HOW IT WORKS (6-Step Lifecycle) */}
      <section id="how-it-works-section" className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
              End-to-End Operational Lifecycle
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              HOW HARYOR-MIH MOVES YOUR CARGO
            </h2>
            <p className="text-xs text-white/60 mt-2">
              From the initial rate evaluation through final customs release and warehouse delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {howItWorksSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white/[0.05] hover:bg-white/[0.10] backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden transition-all shadow-lg"
              >
                <div className="text-2xl font-black font-mono text-[#FF8500] mb-2">
                  {step.num}
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL NETWORK PREVIEW */}
      <section id="global-network-preview" className="py-20 bg-white/[0.02] backdrop-blur-xl border-y border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-bold text-[#FF8500] uppercase tracking-widest">
                International Logistics Corridors
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Montserrat']">
                WHERE WE MOVE THE WORLD
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Haryor-Mih operates established freight routes connecting major commercial capitals.
                With our dedicated London Heathrow cargo depot, partner terminals in Houston and Newark, European hubs, and our Lagos headquarters, your goods move with priority.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">UK &lt;-&gt; Nigeria Express Corridor:</strong> Scheduled weekly air consolidation and ocean container freight.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">USA RoRo &amp; Container Routes:</strong> Vehicle procurement and machinery shipping from Jacksonville, Newark, and Houston.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">China &amp; Far East Inbound:</strong> Commercial manufactured goods &amp; industrial supplies from Shanghai and Ningbo.
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('/global-network')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-2xl mt-2 border border-white/20 backdrop-blur-md"
              >
                Explore Interactive Network &rarr;
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white/[0.08] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#FF6B00]" />
                    Verified Freight Corridors
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">Active Corridors: 4 Primary</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">London (LHR) &rarr; Lagos (LOS)</span>
                      <span className="text-[10px] text-[#FF8500] font-mono font-bold">AIR FREIGHT</span>
                    </div>
                    <div className="text-white/60 text-[11px]">Est Transit: 2 - 4 Days</div>
                    <div className="text-white/40 text-[10px] mt-1">Direct cargo flights via BA &amp; Virgin Atlantic</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">Antwerp/Europe &rarr; Tin Can Port</span>
                      <span className="text-[10px] text-sky-400 font-mono font-bold">SEA FCL/LCL</span>
                    </div>
                    <div className="text-white/60 text-[11px]">Est Transit: 18 - 24 Days</div>
                    <div className="text-white/40 text-[10px] mt-1">Hapag-Lloyd, Maersk, Grimaldi Lines</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">US Ports &rarr; Lagos RoRo</span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">VEHICLE SHIPPING</span>
                    </div>
                    <div className="text-white/60 text-[11px]">Est Transit: 21 - 28 Days</div>
                    <div className="text-white/40 text-[10px] mt-1">Dedicated RoRo &amp; containerized vehicles</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">China (Shanghai) &rarr; Apapa</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">OCEAN FREIGHT</span>
                    </div>
                    <div className="text-white/60 text-[11px]">Est Transit: 30 - 35 Days</div>
                    <div className="text-white/40 text-[10px] mt-1">Commercial equipment, solar, electronics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTOTRADE SHOWCASE ("FIND YOUR NEXT VEHICLE") */}
      <section id="autotrade-showcase" className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
                Haryor-Mih Dealership Division
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
                FIND YOUR NEXT VEHICLE
              </h2>
              <p className="text-xs text-white/70 mt-1">
                Verified luxury SUVs, brand new imports, clean title Carfax vehicles, and custom overseas sourcing.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button
                onClick={() => navigateTo('/autotrade/request')}
                className="px-4 py-2 border border-white/20 hover:border-[#FF6B00] bg-white/10 text-white text-xs font-bold rounded-xl transition backdrop-blur-md"
              >
                Custom Sourcing Request
              </button>
              <button
                onClick={() => navigateTo('/autotrade')}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#FF8500] text-white text-xs font-bold rounded-xl transition border border-white/20 backdrop-blur-md shadow-lg"
              >
                Browse All Vehicles &rarr;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-all hover:shadow-2xl group flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={veh.images[0]}
                      alt={`${veh.year} ${veh.make} ${veh.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md text-white shadow-md ${
                          veh.status === 'AVAILABLE' ? 'bg-emerald-600' : 'bg-sky-600'
                        }`}
                      >
                        {veh.status === 'AVAILABLE' ? 'In Stock' : 'In Transit'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white font-mono">
                      {veh.condition.replace(/_/g, ' ')}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-white/50 font-medium">
                      {veh.year} • {veh.mileageKm.toLocaleString()} KM • {veh.fuelType}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF8500] transition-colors mt-0.5 mb-2">
                      {veh.make} {veh.model}
                    </h3>
                    <div className="text-lg font-extrabold text-[#FF8500] font-mono">
                      {formatCurrency(veh.price)}
                    </div>
                    <div className="text-[11px] text-white/60 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Location: {veh.location}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigateTo('/autotrade')}
                    className="w-full py-2.5 bg-white/10 group-hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center border border-white/15 backdrop-blur-md shadow-md"
                  >
                    View Vehicle Specs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CORPORATE TRUST & VERIFIED COMPLIANCE */}
      <section id="corporate-trust-section" className="py-16 bg-white/[0.03] backdrop-blur-xl border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
              Corporate Governance &amp; Reliability
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              TRUSTED BY IMPORTERS, EXPORTERS &amp; ENTERPRISES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/[0.06] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FF8500] mx-auto flex items-center justify-center mb-3 border border-white/15 backdrop-blur-md">
                <Building className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-white text-lg font-mono">CAC {settings.rcNumber}</div>
              <div className="text-xs text-white/60 mt-1">Incorporated &amp; Licensed in Nigeria</div>
            </div>

            <div className="bg-white/[0.06] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-sky-400 mx-auto flex items-center justify-center mb-3 border border-white/15 backdrop-blur-md">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-white text-lg font-mono">100% PAAR &amp; Form M</div>
              <div className="text-xs text-white/60 mt-1">Customs Compliance Advisory</div>
            </div>

            <div className="bg-white/[0.06] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 mx-auto flex items-center justify-center mb-3 border border-white/15 backdrop-blur-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-white text-lg font-mono">Verified Cargo Cover</div>
              <div className="text-xs text-white/60 mt-1">Marine &amp; Air Cargo Insurance</div>
            </div>

            <div className="bg-white/[0.06] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-purple-400 mx-auto flex items-center justify-center mb-3 border border-white/15 backdrop-blur-md">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-white text-lg font-mono">London &amp; Lagos</div>
              <div className="text-xs text-white/60 mt-1">Direct Operational Ground Desks</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Admin-Configurable Real Client Feedback) */}
      <section id="testimonials-section" className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
              Client Feedback
            </div>
            <h2 className="text-3xl font-extrabold text-white font-['Montserrat']">
              DELIVERING EXCELLENCE EVERY DAY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 text-xs leading-relaxed space-y-4 shadow-xl">
              <div className="text-amber-400 font-bold tracking-widest">★★★★★</div>
              <p className="text-white/80 italic">
                "Haryor-Mih expedited our industrial solar equipment container clearance at Tin Can Port within 5 working days. Their PAAR guidance prevented huge demurrage charges."
              </p>
              <div className="pt-3 border-t border-white/10">
                <div className="font-bold text-white">Engr. Mustapha Bello</div>
                <div className="text-white/50 text-[11px]">Managing Director, Zenith Solar Energy</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 text-xs leading-relaxed space-y-4 shadow-xl">
              <div className="text-amber-400 font-bold tracking-widest">★★★★★</div>
              <p className="text-white/80 italic">
                "Shipped my 2023 Mercedes GLE from the US through their RoRo service. Zero scratches, complete customs clearance papers verified, and delivered right to my driveway in VI."
              </p>
              <div className="pt-3 border-t border-white/10">
                <div className="font-bold text-white">Engr. Kenneth Okeke</div>
                <div className="text-white/50 text-[11px]">CEO, Solar Dynamics Ltd</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 text-xs leading-relaxed space-y-4 shadow-xl">
              <div className="text-amber-400 font-bold tracking-widest">★★★★★</div>
              <p className="text-white/80 italic">
                "Their London Heathrow depot makes personal effects and commercial air cargo from the UK so predictable. The online tracking timeline kept us updated at every single stage."
              </p>
              <div className="pt-3 border-t border-white/10">
                <div className="font-bold text-white">Mrs. Abigail Adeleke</div>
                <div className="text-white/50 text-[11px]">Relocation Consignee, Manchester to Lagos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION ("READY TO MOVE?") */}
      <section id="final-cta-section" className="py-20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border-t border-white/15 text-white shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FF8500] backdrop-blur-md">
            CONNECTING WORLDS. DELIVERING EXCELLENCE.
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] tracking-tight">
            READY TO MOVE? <br />
            <span className="text-[#FF6B00]">Let's move your business forward.</span>
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Whether you need urgent air freight from London, container shipping from Antwerp, customs clearance in Lagos, or luxury auto trade sourcing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo('/quote')}
              className="px-8 py-4 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-2xl transition cursor-pointer border border-white/20 backdrop-blur-md"
            >
              Get a Shipping Quote
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer backdrop-blur-md shadow-lg"
            >
              Speak with a Freight Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
