import React from 'react';
import {
  Globe2,
  MapPin,
  Plane,
  Ship,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalNetworkPage: React.FC = () => {
  const { navigateTo } = useApp();

  const tradeRoutes = [
    {
      id: 'uk-ng',
      origin: 'United Kingdom (London & Felixstowe)',
      destination: 'Nigeria (Lagos Apapa & MMA Airport)',
      airTransit: '2 - 3 Days',
      seaTransit: '18 - 22 Days',
      highlight: 'Daily air consolidations from LHR; weekly ocean container departures from Tilbury/Felixstowe.',
      cargoFocus: 'Personal effects, online retail packages, vehicles, engineering spare parts.',
    },
    {
      id: 'us-ng',
      origin: 'United States (New York, Houston, Jacksonville)',
      destination: 'Nigeria (Tin Can Island & Lagos Air Cargo)',
      airTransit: '3 - 5 Days',
      seaTransit: '21 - 28 Days',
      highlight: 'Dedicated Roll-on/Roll-off (RoRo) vehicle vessels and heavy industrial oil & gas equipment freight.',
      cargoFocus: 'Automobiles, copart salvage cars, oilfield equipment, industrial power generators.',
    },
    {
      id: 'cn-ng',
      origin: 'China (Guangzhou, Shenzhen, Ningbo, Shanghai)',
      destination: 'Nigeria (Lagos Apapa & Lekki Deep Sea Port)',
      airTransit: '4 - 6 Days',
      seaTransit: '28 - 35 Days',
      highlight: 'FCL & LCL cargo consolidation from primary Chinese manufacturing centers to Lagos.',
      cargoFocus: 'Consumer electronics, solar inverters, factory machinery, textiles, construction materials.',
    },
    {
      id: 'eu-ng',
      origin: 'European Union (Frankfurt, Antwerp, Rotterdam)',
      destination: 'Nigeria (Lagos & Port Harcourt)',
      airTransit: '2 - 4 Days',
      seaTransit: '19 - 24 Days',
      highlight: 'Specialized reefer containers and chemical transport with full EU safety declarations.',
      cargoFocus: 'Pharmaceuticals, chemicals, laboratory supplies, specialized automotive parts.',
    },
  ];

  const facilities = [
    {
      name: 'Lagos Headquarters & Bonded Terminal Ops',
      city: 'Lagos, Nigeria',
      address: 'Plot 14 Commercial Avenue, Apapa / Ikeja Aviation Corridor',
      capabilities: 'Customs brokerage, 24/7 bonded warehousing, fleet haulage dispatch, container devanning.',
      badge: 'Main Operating Center',
    },
    {
      name: 'London Air & Sea Consolidation Hub',
      city: 'London / Essex, United Kingdom',
      address: 'Unit 7 Heathrow Cargo Way & Tilbury Docks Logistics Park',
      capabilities: 'UK doorstep collections, export packaging, air freight security screening, customs declarations.',
      badge: 'UK / Europe Consolidation',
    },
    {
      name: 'North America Maritime Gateways',
      city: 'Houston / Newark / Jacksonville, USA',
      address: 'Port Newark Container Terminal & Jacksonville Auto Port',
      capabilities: 'Copart/IAAI vehicle receiving, title validation with US Customs, 40ft container stuffings.',
      badge: 'Automotive & Heavy Lift',
    },
    {
      name: 'Far East Cargo Receiving Desk',
      city: 'Guangzhou / Shenzhen, China',
      address: 'Baiyun Logistics Center, Guangzhou',
      capabilities: 'Supplier factory pickups, CBM consolidation, export phytosanitary and export packaging.',
      badge: 'Far East Consolidation',
    },
  ];

  return (
    <div id="global-network-page" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
            Global Reach • Local Ground Precision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            GLOBAL NETWORK &amp; TRADE LANES
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
            Haryor-Mih connects Nigeria's commercial centers with strategic trade corridors across the UK, USA, China, and Europe through bonded facilities and maritime alliances.
          </p>
        </div>

        {/* Trade Routes Grid */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Montserrat'] mb-6">
            Primary International Trade Lanes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tradeRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl p-6 border border-white/15 shadow-2xl hover:border-orange-500/40 transition text-white"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase mb-2">
                  <Globe2 className="w-4 h-4" />
                  International Freight Lane
                </div>
                <h3 className="text-base font-bold text-white">
                  {route.origin} &rarr; {route.destination}
                </h3>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  {route.highlight}
                </p>

                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-white/[0.04] rounded-xl border border-white/10 text-xs font-mono text-white/80">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-orange-400" />
                    <span>Air: <strong className="text-white">{route.airTransit}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-sky-400" />
                    <span>Sea: <strong className="text-white">{route.seaTransit}</strong></span>
                  </div>
                </div>

                <div className="text-[11px] text-white/60">
                  <strong className="text-white">Key Commodities:</strong> {route.cargoFocus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Hub Facilities */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Montserrat'] mb-6">
            Logistics Hubs &amp; Bonded Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac) => (
              <div
                key={fac.name}
                className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl p-6 border border-white/15 shadow-2xl flex flex-col justify-between text-white"
              >
                <div>
                  <span className="text-[10px] font-extrabold text-orange-400 uppercase px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/30 inline-block mb-3">
                    {fac.badge}
                  </span>
                  <h3 className="font-bold text-white text-sm mb-1">{fac.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{fac.city}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    {fac.capabilities}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-white/50">
                  {fac.address}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Network Quote Banner */}
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold font-['Montserrat'] text-white">
              Routing Cargo Across These Hubs?
            </h3>
            <p className="text-xs text-white/70 max-w-lg">
              Book factory collections anywhere in the UK or US and schedule arrival through our dedicated Apapa or Lagos Airport desks.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/quote')}
            className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shrink-0 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            Request Route Pricing
          </button>
        </div>
      </div>
    </div>
  );
};
