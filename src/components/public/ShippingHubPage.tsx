import React from 'react';
import {
  Ship,
  Plane,
  Truck,
  Box,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShippingHubPage: React.FC = () => {
  const { navigateTo } = useApp();

  const containerSpecs = [
    {
      name: '20ft Standard Dry Container',
      length: '5.90 m (19.4 ft)',
      width: '2.35 m (7.7 ft)',
      height: '2.39 m (7.8 ft)',
      cbm: '33.2 CBM',
      payload: '25,000 kg (25 MT)',
      bestFor: 'Heavy dense cargo, minerals, machinery, metal coils, grain.',
    },
    {
      name: '40ft Standard Dry Container',
      length: '12.03 m (39.5 ft)',
      width: '2.35 m (7.7 ft)',
      height: '2.39 m (7.8 ft)',
      cbm: '67.7 CBM',
      payload: '27,600 kg (27.6 MT)',
      bestFor: 'General commercial goods, consumer merchandise, furniture, boxed apparel.',
    },
    {
      name: '40ft High Cube (HC) Container',
      length: '12.03 m (39.5 ft)',
      width: '2.35 m (7.7 ft)',
      height: '2.69 m (8.8 ft)',
      cbm: '76.4 CBM',
      payload: '28,500 kg (28.5 MT)',
      bestFor: 'Volumetric goods, tall machinery, solar panels, electronics, relocations.',
    },
    {
      name: '40ft Refrigerated (Reefer)',
      length: '11.58 m (38.0 ft)',
      width: '2.29 m (7.5 ft)',
      height: '2.54 m (8.3 ft)',
      cbm: '67.3 CBM',
      payload: '29,500 kg (29.5 MT)',
      bestFor: 'Pharmaceuticals, frozen seafood, agro produce, dairy, temperature-controlled chemicals.',
    },
  ];

  return (
    <div id="shipping-hub-page" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
            Shipper Resource Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            SHIPPING HUB &amp; CARGO GUIDELINES
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
            Essential reference guide covering ocean container dimensions, documentation requirements, and customs clearance procedures for Nigeria and international routes.
          </p>
        </div>

        {/* Container Dimension Guide */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Montserrat']">
                Standard Shipping Container Dimensions
              </h2>
              <p className="text-xs text-white/60">Compare volumetric capacities and payload limits for ocean freight.</p>
            </div>
            <button
              onClick={() => navigateTo('/quote')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 cursor-pointer"
            >
              Get FCL Quote &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {containerSpecs.map((c) => (
              <div
                key={c.name}
                className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl p-6 border border-white/15 shadow-2xl flex flex-col justify-between text-white"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
                    <Box className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{c.name}</h3>
                  <div className="space-y-1.5 text-xs text-white/70 mb-4 font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/50">Volume:</span>
                      <strong className="text-white">{c.cbm}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Max Payload:</span>
                      <strong className="text-white">{c.payload}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Internal L:</span>
                      <span>{c.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Internal W:</span>
                      <span>{c.width}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-white/60 leading-snug">
                  <strong className="text-white">Recommended for:</strong> {c.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Framework */}
        <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl border border-white/15 p-8 sm:p-12 mb-14 shadow-2xl text-white">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
              Customs &amp; Statutory Compliance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
              Mandatory Commercial Shipping Documents
            </h2>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              Importing into Nigeria requires strict compliance with Central Bank of Nigeria (CBN) and Nigeria Customs Service (NCS) electronic platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-white text-sm">Form M (Mandatory for Imports)</h3>
              <p className="text-white/70 leading-relaxed">
                A statutory electronic document generated on the Nigeria Single Window Trade Portal through an authorized dealer commercial bank before goods are loaded at origin.
              </p>
            </div>

            <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-white text-sm">PAAR (Pre-Arrival Assessment Report)</h3>
              <p className="text-white/70 leading-relaxed">
                Issued by Nigeria Customs Service headquarters in Abuja, evaluating final duty liabilities, valuation, and classification prior to vessel discharge.
              </p>
            </div>

            <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-white text-sm">Regulatory Permits (NAFDAC / SONCAP)</h3>
              <p className="text-white/70 leading-relaxed">
                SONCAP certification verifies standard conformity for technical manufactured goods. NAFDAC permits are required for drugs, medical devices, chemicals, and foods.
              </p>
            </div>
          </div>
        </div>

        {/* Prohibited Items Notice */}
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-5 mb-14 backdrop-blur-md">
          <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
          <div className="space-y-2 text-xs">
            <h3 className="text-base font-bold text-rose-300">
              Hazardous Materials &amp; Prohibited Import Guidelines
            </h3>
            <p className="text-rose-200/80 leading-relaxed">
              Haryor-Mih International Logistics Services Ltd. strictly complies with international air safety (IATA Dangerous Goods Regulations) and Nigeria Customs import prohibition lists. We do NOT carry illegal narcotics, unmanifested firearms, counterfeit currency, toxic waste, or banned agricultural products.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-white/[0.08] backdrop-blur-2xl border border-white/20 text-white p-10 rounded-3xl space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-white">
            Need Expert Clearance or Freight Advice?
          </h2>
          <p className="text-xs text-white/70 max-w-lg mx-auto">
            Our certified logistics operations desk in Lagos will review your proforma invoices and advise on duty exemptions and optimal container routing.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/quote')}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Request Custom Freight Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
