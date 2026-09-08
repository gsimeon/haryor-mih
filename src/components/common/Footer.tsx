import React from 'react';
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  MessageSquare,
  FileText,
  Car,
  Ship,
  Plane,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, settings } = useApp();

  return (
    <footer id="corporate-footer" className="bg-slate-900/60 backdrop-blur-2xl text-slate-300 border-t border-white/15 relative z-10">
      {/* Primary Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Regulatory Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                <span className="text-[#FF6B00]">H</span>M
              </div>
              <div>
                <div className="font-extrabold text-white tracking-wider text-base uppercase font-['Montserrat']">
                  HARYOR-MIH
                </div>
                <div className="text-[10px] text-[#FF8500] font-bold tracking-widest uppercase">
                  INTERNATIONAL LOGISTICS SERVICES LTD
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300/80 leading-relaxed max-w-md">
              Reliable air, sea and road freight solutions connecting businesses and individuals to global markets.
              Specializing in UK-Nigeria-USA-China trade corridors, Form M &amp; PAAR customs clearance, and verified AutoTrade vehicle procurement.
            </p>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-xs space-y-1.5 shadow-lg">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                Corporate Registration &amp; Accreditation
              </div>
              <div className="text-slate-300">
                Corporate Affairs Commission (CAC) Registered: <span className="text-white font-mono">{settings.rcNumber}</span>
              </div>
              <div className="text-[11px] text-white/50">
                Licensed Freight Forwarding, Haulage &amp; Customs Clearing Broker
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/2348032345678?text=${encodeURIComponent(
                  'Hello Haryor-Mih International Logistics! I need assistance with a shipping inquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition border border-white/20 backdrop-blur-md shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => navigateTo('/quote')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FF6B00] hover:bg-[#FF8500] text-white rounded-xl text-xs font-semibold transition border border-white/20 backdrop-blur-md shadow-lg shadow-orange-950/40"
              >
                Get a Quote
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Logistics Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
              Logistics Services
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('/services/air-freight')} className="hover:text-[#FF6B00] transition">
                  Air Freight Priority
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/sea-freight')} className="hover:text-[#FF6B00] transition">
                  Sea Freight (FCL / LCL)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/road-freight')} className="hover:text-[#FF6B00] transition">
                  Road Haulage &amp; Transport
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/customs-clearance')} className="hover:text-[#FF6B00] transition">
                  Customs Clearance &amp; PAAR
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/door-to-door')} className="hover:text-[#FF6B00] transition">
                  Door-to-Door Logistics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/import-export')} className="hover:text-[#FF6B00] transition">
                  Import &amp; Export Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/international-relocation')} className="hover:text-[#FF6B00] transition">
                  International Relocation
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services/vehicle-shipping')} className="hover:text-[#FF6B00] transition">
                  Vehicle Shipping &amp; RoRo
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AutoTrade & Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('/track')} className="hover:text-[#FF6B00] transition font-medium text-white flex items-center gap-1">
                  Track Shipment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/shipping')} className="hover:text-[#FF6B00] transition">
                  Shipping Hub &amp; Docs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/autotrade')} className="hover:text-[#FF6B00] transition text-amber-400 font-semibold flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" />
                  Auto Trade Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/autotrade/request')} className="hover:text-[#FF6B00] transition">
                  Custom Vehicle Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/global-network')} className="hover:text-[#FF6B00] transition">
                  Global Network &amp; Routes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about/company-profile')} className="hover:text-[#FF6B00] transition">
                  Company Profile &amp; Profile PDF
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/resources')} className="hover:text-[#FF6B00] transition">
                  Resources &amp; Customs FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/portal')} className="hover:text-[#FF6B00] transition text-slate-300">
                  Customer &amp; Partner Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Operational Hubs */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
              Operational Hubs
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  Nigeria Headquarters:
                </div>
                <div className="text-slate-400 leading-snug pl-5">
                  {settings.headquartersAddress}
                </div>
              </div>

              <div>
                <div className="font-semibold text-white flex items-center gap-1.5 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  United Kingdom Depot:
                </div>
                <div className="text-slate-400 leading-snug pl-5">
                  {settings.ukDepotAddress}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <a href={`mailto:${settings.officialEmail}`} className="hover:text-white transition">
                    {settings.officialEmail}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {settings.businessHours}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Customs Disclaimer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[11px] text-slate-400/70 leading-relaxed">
          <p className="font-semibold text-white/70 mb-1">Notice on Regulatory Compliance &amp; Customs Disclaimers:</p>
          <p>
            {settings.customsDisclaimer} Haryor-Mih International Logistics Services Ltd. facilitates lawful import and export operations in compliance with international maritime, air transport (IATA/ICAO), and Nigeria Customs Service statutory directives. All quotes and shipping transit estimates are subject to final physical cargo verification and statutory regulatory approval.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Haryor-Mih International Logistics Services Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('/about')} className="hover:text-white transition">
              About
            </button>
            <button onClick={() => navigateTo('/shipping')} className="hover:text-white transition">
              Terms of Carriage
            </button>
            <button onClick={() => navigateTo('/contact')} className="hover:text-white transition">
              Contact Us
            </button>
            <button onClick={() => navigateTo('/admin')} className="text-white/40 hover:text-white transition">
              Staff Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
