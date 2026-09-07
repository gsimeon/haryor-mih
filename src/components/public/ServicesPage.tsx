import React, { useState, useEffect } from 'react';
import {
  Plane,
  Ship,
  Truck,
  FileCheck,
  Package,
  Globe2,
  Home,
  Car,
  CheckCircle2,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  const servicesData = [
    {
      id: 'air-freight',
      title: 'Air Freight Priority',
      icon: <Plane className="w-8 h-8 text-[#FF6B00]" />,
      tagline: 'Time-Critical International Air Cargo',
      description:
        'Scheduled direct and consolidated air freight services connecting London Heathrow, Frankfurt, Dubai, China, and US hubs directly with Lagos Murtala Muhammed International Airport (LOS).',
      whoItsFor:
        'Commercial importers with urgent manufacturing parts, pharmaceutical distributors, electronics retailers, and high-value equipment consignees.',
      cargoTypes: [
        'Urgent industrial machinery spares & sensors',
        'Pharmaceuticals and diagnostic medical equipment',
        'Electronics, IT hardware, telecommunications',
        'High-value personal effects and documents',
      ],
      process: [
        'Origin consolidation at London Heathrow or US hub',
        'X-ray security screening & export declaration',
        'Scheduled international cargo flight dispatch',
        'Arrival at Lagos NAHCO / SAHCO cargo terminal',
        'Priority customs clearing & local delivery',
      ],
      transitTime: '2 - 4 Business Days',
      requiredDocs: ['Commercial Invoice', 'Packing List', 'Air Waybill (AWB)', 'Certificate of Origin'],
      quoteCta: 'REQUEST AIR FREIGHT QUOTE',
    },
    {
      id: 'sea-freight',
      title: 'Sea Freight (FCL & LCL)',
      icon: <Ship className="w-8 h-8 text-[#09263F]" />,
      tagline: 'Full Container Load & Consolidated Ocean Shipping',
      description:
        'Cost-effective ocean freight solutions into Apapa and Tin Can Island ports. We partner with top maritime carriers (Maersk, Hapag-Lloyd, CMA CGM, Grimaldi) to secure vessel slots and competitive ocean rates.',
      whoItsFor:
        'Bulk commodity traders, construction firms, manufacturing plants, wholesale distributors, and commercial importers.',
      cargoTypes: [
        '20ft Standard Containers (dry cargo)',
        '40ft Standard & High Cube Containers (general freight)',
        'Refrigerated Reefers (perishables & pharmaceuticals)',
        'LCL Consolidated Cargo (palletized partial shipments)',
      ],
      process: [
        'Empty container placement & factory loading',
        'Port gate-in and Verified Gross Mass (VGM) certification',
        'Vessel transit across Atlantic / Far East routes',
        'Terminal discharge at Apapa or Tin Can Island',
        'Customs single goods declaration & bonded transfer',
      ],
      transitTime: '18 - 35 Days (depending on origin)',
      requiredDocs: ['Original Ocean Bill of Lading (BOL)', 'Form M', 'Pre-Arrival Assessment Report (PAAR)', 'SONCAP / NAFDAC'],
      quoteCta: 'REQUEST SEA FREIGHT QUOTE',
    },
    {
      id: 'road-freight',
      title: 'Road Haulage & Regional Transport',
      icon: <Truck className="w-8 h-8 text-amber-600]" />,
      tagline: 'Heavy-Duty Interstate & Port Evacuation Haulage',
      description:
        'A dedicated fleet of articulated flatbed trailers, enclosed container box trucks, and regional transit vehicles moving cargo safely from Lagos ports to Abuja, Kano, Port Harcourt, Ibadan, and all 36 Nigerian states.',
      whoItsFor:
        'Businesses receiving containerized cargo at Lagos ports requiring reliable factory or warehouse evacuation.',
      cargoTypes: [
        '20ft and 40ft container haulage',
        'Heavy industrial machinery and generators',
        'FMCG distribution and palletized retail stock',
        'Dry bulk agricultural products',
      ],
      process: [
        'Port terminal gate-out clearance with NPA',
        'Pre-trip vehicle inspection & GPS seal verification',
        'Secured interstate highway transport',
        'Offloading at consignee facility with signed delivery receipt',
      ],
      transitTime: '1 - 4 Days (interstate)',
      requiredDocs: ['Terminal Exit Note', 'Customs Release Document', 'Waybill & Delivery Note'],
      quoteCta: 'REQUEST ROAD HAULAGE',
    },
    {
      id: 'customs-clearance',
      title: 'Customs Clearance & Form M / PAAR',
      icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
      tagline: 'Licensed Customs Brokerage & Tariff Advisory',
      description:
        'Navigating Nigeria Customs Service (NCS) procedures requires precise compliance. Our licensed customs brokerage desk manages Form M generation, NAFDAC regulatory permits, SONCAP certification, and PAAR processing to prevent costly port demurrage.',
      whoItsFor:
        'Importers seeking transparent, legitimate customs clearing without delays or arbitrary penalty assessments.',
      cargoTypes: [
        'All legitimate commercial imports across HS Codes 01 - 97',
        'Regulated foods, cosmetics, chemicals (NAFDAC)',
        'Manufactured goods under SONCAP conformity',
        'Temporary imports & bonded warehouse goods',
      ],
      process: [
        'HS Code tariff verification & duty pre-calculation',
        'Electronic Form M submission via Trade Portal',
        'PAAR generation with Nigeria Customs headquarters',
        'Joint physical examination at port inspection bays',
        'Final duty assessment, release order & terminal exit',
      ],
      transitTime: '3 - 7 Working Days (upon vessel discharge)',
      requiredDocs: ['Form M', 'PAAR', 'Commercial Invoice', 'Packing List', 'Bill of Lading', 'SONCAP/NAFDAC'],
      quoteCta: 'TALK TO A CUSTOMS SPECIALIST',
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door Logistics',
      icon: <Package className="w-8 h-8 text-[#FF6B00]" />,
      tagline: 'Unified Global Pickup to Final Doorstep Delivery',
      description:
        'The ultimate zero-stress shipping experience. We collect your packages or cargo directly from any supplier or residence in the UK, Europe, or North America, handle international freight, customs clearance, and deliver directly to your office or home in Nigeria.',
      whoItsFor:
        'Busy executives, e-commerce shoppers, international businesses, and families who prefer a single all-inclusive invoice.',
      cargoTypes: [
        'Commercial sample shipments and retail stock',
        'Household appliances, personal effects, tools',
        'Machinery parts and specialized accessories',
      ],
      process: [
        'Doorstep collection at overseas address',
        'Consolidation at Haryor-Mih regional depot',
        'Air or ocean transit to Nigeria',
        'Full customs duties and terminal clearance',
        'Direct doorstep delivery by our haulage van',
      ],
      transitTime: '5 - 10 Days (Air) / 25 - 35 Days (Sea)',
      requiredDocs: ['Packing Inventory', 'Sender & Consignee ID', 'Proforma Invoice'],
      quoteCta: 'GET DOOR-TO-DOOR QUOTE',
    },
    {
      id: 'import-export',
      title: 'Import & Export Solutions',
      icon: <Globe2 className="w-8 h-8 text-sky-600" />,
      tagline: 'International Commercial Trade Facilitation',
      description:
        'Connecting Nigerian exporters of solid minerals, agricultural commodities (sesame seeds, cashew nuts, dried ginger, cocoa) with buyers in Europe, the Middle East, and Asia, alongside structuring raw material imports.',
      whoItsFor:
        'Agro-allied companies, export consortiums, mining operators, and industrial manufacturing plants.',
      cargoTypes: [
        'Agro commodities (cocoa, ginger, sesame, soya)',
        'Solid minerals (lithium ore, zinc, lead)',
        'Processed African foodstuffs for diaspora markets',
      ],
      process: [
        'Export phytosanitary and quarantine inspections',
        'Nigeria Export Promotion Council (NEPC) documentation',
        'Container stuffings & moisture barrier sealing',
        'Export customs clearance at designated ports',
      ],
      transitTime: 'Route-dependent',
      requiredDocs: ['NXP Form', 'NEPC Certificate', 'Phytosanitary Certificate', 'Bill of Lading'],
      quoteCta: 'START IMPORT/EXPORT REQUEST',
    },
    {
      id: 'international-relocation',
      title: 'International Relocation Services',
      icon: <Home className="w-8 h-8 text-purple-600" />,
      tagline: 'Professional Expatriate & Household Moving',
      description:
        'Moving countries is a major life transition. Haryor-Mih provides white-glove relocation services with professional packing, specialized export crates for artwork and pianos, customs duty concessions advisory for returning residents, and unpacking.',
      whoItsFor:
        'Diplomats, expatriates, returning Nigerian diaspora professionals, and families relocating between the UK and Nigeria.',
      cargoTypes: [
        'Household furniture, electronics, and kitchenware',
        'Personal libraries, musical instruments, fine art',
        'Personal motor vehicles (RoRo or containerized)',
      ],
      process: [
        'Pre-move home survey & volumetric estimation',
        'Custom export wrapping with multi-ply corrugated paper',
        'Container loading and maritime or air freight',
        'Returning resident customs documentation assistance',
        'Delivery into new home with placement and debris removal',
      ],
      transitTime: '4 - 6 Weeks (Ocean) / 7 - 10 Days (Air)',
      requiredDocs: ['Packing List / Inventory', 'Passport Copy', 'Proof of Residence / Relocation'],
      quoteCta: 'PLAN MY RELOCATION',
    },
    {
      id: 'vehicle-shipping',
      title: 'Vehicle Shipping & RoRo Logistics',
      icon: <Car className="w-8 h-8 text-[#FF6B00]" />,
      tagline: 'Automobile Shipping from US & European Ports to Lagos',
      description:
        'Specialized Roll-on/Roll-off (RoRo) and dedicated container shipping for luxury vehicles, construction trucks, and dealerships. We manage title verification with US Customs and fast discharge at Lagos RoRo terminals.',
      whoItsFor:
        'Automobile dealerships, car importers, private vehicle buyers purchasing from US/UK auctions (Copart, IAAI, Manheim).',
      cargoTypes: [
        'Luxury sedans and SUVs (Mercedes, Lexus, Range Rover)',
        'Commercial haulage trucks and refrigerated vans',
        'Construction bulldozers and excavators',
      ],
      process: [
        'Vehicle drop-off at port terminal (Jacksonville, Newark, Tilbury)',
        'US CBP / HMRC export title clearance',
        'RoRo vessel loading with secure vehicle lashing',
        'Vessel transit to Lagos port',
        'Customs single goods declaration and vehicle release',
      ],
      transitTime: '21 - 28 Days (US to Lagos)',
      requiredDocs: ['Original Vehicle Certificate of Title', 'Dock Receipt', 'Bill of Lading'],
      quoteCta: 'REQUEST VEHICLE SHIPPING QUOTE',
    },
  ];

  // Derive selected service from route if route is e.g. /services/air-freight
  const activeServiceId = currentRoute.split('/')[2] || 'air-freight';
  const selectedService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  return (
    <div id="services-page-container" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
            Logistics Without Borders
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            GLOBAL FREIGHT SERVICES
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
            Haryor-Mih International Logistics Services Ltd. operates integrated air, sea, road, and customs operations connecting Africa to world trade hubs.
          </p>
        </div>

        {/* Service Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {servicesData.map((svc) => (
            <button
              key={svc.id}
              onClick={() => navigateTo(`/services/${svc.id}`)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer backdrop-blur-md ${
                selectedService.id === svc.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-lg shadow-orange-500/10'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {svc.title}
            </button>
          ))}
        </div>

        {/* Selected Service Detailed View */}
        <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-10 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                {selectedService.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  {selectedService.tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 font-['Montserrat']">
                  {selectedService.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-white/60 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Transit: {selectedService.transitTime}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/quote')}
              className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg shadow-orange-500/20 shrink-0 cursor-pointer"
            >
              {selectedService.quoteCta} &rarr;
            </button>
          </div>

          {/* Description & Who it is for */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Service Overview
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{selectedService.description}</p>
            </div>

            <div className="space-y-3 bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Ideal Consignees &amp; Shippers
              </h3>
              <p className="text-white/70 leading-relaxed">{selectedService.whoItsFor}</p>
            </div>
          </div>

          {/* Cargo Types & Operational Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Eligible Cargo Types
              </h3>
              <ul className="space-y-2 text-xs text-white/70">
                {selectedService.cargoTypes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Required Documentation Checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedService.requiredDocs.map((doc, i) => (
                  <div key={i} className="p-3 bg-white/[0.04] border border-white/10 rounded-xl text-white/90 font-medium">
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step-by-Step Process */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Operational Step-by-Step Flow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {selectedService.process.map((step, idx) => (
                <div key={idx} className="p-4 bg-white/[0.04] border border-white/10 rounded-xl text-xs">
                  <div className="text-xs font-extrabold text-orange-400 font-mono mb-1">
                    0{idx + 1}
                  </div>
                  <div className="text-white/70 leading-snug">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/15 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Have questions regarding cargo compliance or HS Codes?</div>
              <div className="text-xs text-white/60 mt-0.5">Our commercial freight desk will inspect your packing list.</div>
            </div>
            <button
              onClick={() => navigateTo('/contact')}
              className="px-5 py-2.5 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-xs font-semibold rounded-xl text-white transition cursor-pointer backdrop-blur-md"
            >
              Contact Lagos Operations Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
