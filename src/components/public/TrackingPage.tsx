import React, { useState, useEffect } from 'react';
import {
  Search,
  Package,
  Plane,
  Ship,
  Truck,
  MapPin,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Building,
  User,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Shipment, ShipmentStatus } from '../../types';

export const TrackingPage: React.FC = () => {
  const { shipments, routeParams, navigateTo } = useApp();
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    if (routeParams.query) {
      setSearchInput(routeParams.query);
      performSearch(routeParams.query);
    } else if (shipments.length > 0) {
      // Default to first shipment for immediate demonstration
      setActiveShipment(shipments[0]);
      setSearchInput(shipments[0].id);
      setHasSearched(true);
    }
  }, [routeParams.query]);

  const performSearch = (id: string) => {
    setHasSearched(true);
    const cleanId = id.trim().toUpperCase();
    const found = shipments.find(
      (s) =>
        s.id.toUpperCase() === cleanId ||
        (s.billOfLadingNumber && s.billOfLadingNumber.toUpperCase() === cleanId) ||
        (s.airWaybillNumber && s.airWaybillNumber.toUpperCase() === cleanId)
    );
    setActiveShipment(found || null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    performSearch(searchInput);
  };

  const lifecycleStages: { status: ShipmentStatus; label: string }[] = [
    { status: 'BOOKING_CONFIRMED', label: 'Booking Confirmed' },
    { status: 'CARGO_RECEIVED', label: 'Cargo Received' },
    { status: 'PROCESSING', label: 'Processing & Export' },
    { status: 'DEPARTED_ORIGIN', label: 'Departed Origin' },
    { status: 'IN_TRANSIT', label: 'In Transit' },
    { status: 'ARRIVED_DESTINATION', label: 'Arrived Destination' },
    { status: 'CUSTOMS_CLEARANCE', label: 'Customs Clearance' },
    { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { status: 'DELIVERED', label: 'Delivered' },
  ];

  const getStageIndex = (status: ShipmentStatus) => {
    return lifecycleStages.findIndex((s) => s.status === status);
  };

  const currentStageIndex = activeShipment ? getStageIndex(activeShipment.currentStatus) : -1;

  return (
    <div id="tracking-page-container" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Search Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
            Real-Time Logistics Telemetry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
            WHERE IS YOUR SHIPMENT?
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-2">
            Enter your Haryor-Mih tracking number (e.g. HM-2026-000123), Air Waybill, or Ocean Bill of Lading.
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                id="tracking-search-input"
                type="text"
                placeholder="Enter tracking reference (e.g. HM-2026-000123)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white/5 border border-white/20 focus:border-[#FF6B00] rounded-2xl px-4 py-3.5 text-sm font-mono uppercase text-white shadow-xl focus:outline-none backdrop-blur-md placeholder:text-white/40 transition"
              />
              <Search className="w-4 h-4 text-white/50 absolute right-4 top-4" />
            </div>
            <button
              id="submit-tracking-search-btn"
              type="submit"
              className="px-8 py-3.5 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-2xl cursor-pointer border border-white/20 backdrop-blur-md"
            >
              Track Cargo
            </button>
          </form>

          {/* Quick Demo Pre-selected Shipments */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-white/60">
            <span className="font-semibold text-white/80">Sample Shipments:</span>
            {shipments.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSearchInput(s.id);
                  performSearch(s.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-mono border backdrop-blur-md transition ${
                  activeShipment?.id === s.id
                    ? 'bg-[#FF6B00] text-white border-white/20 shadow-lg'
                    : 'bg-white/10 text-white/80 border-white/15 hover:border-[#FF8500] hover:text-white'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* SHIPMENT NOT FOUND STATE */}
        {hasSearched && !activeShipment && (
          <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-white/50 backdrop-blur-md">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Shipment Not Found</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              We could not locate any consignment matching <span className="font-mono font-bold text-[#FF8500]">"{searchInput}"</span>. Please check for typos or contact our customer support desk with your commercial invoice.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('/contact')}
                className="px-6 py-3 bg-white/10 text-white text-xs font-semibold rounded-2xl hover:bg-white/20 border border-white/20 transition backdrop-blur-md shadow-lg"
              >
                Contact Support Desk
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE SHIPMENT RESULT */}
        {activeShipment && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Card */}
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#FF8500] uppercase tracking-wider font-mono">
                      TRACKING CONSIGNMENT
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/15 backdrop-blur-md ${
                        activeShipment.currentStatus === 'DELIVERED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : activeShipment.currentStatus === 'EXCEPTION'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {activeShipment.currentStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    {activeShipment.id}
                  </h2>
                  <p className="text-xs text-white/70 mt-1 font-medium">
                    {activeShipment.cargoDescription}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="p-3.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-right">
                    <div className="text-[10px] text-white/50 uppercase font-semibold">Estimated Delivery</div>
                    <div className="font-bold text-white font-mono text-sm mt-0.5">
                      {activeShipment.estimatedDeliveryDate || 'Under Schedule Confirmation'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs">
                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-semibold mb-1">Origin</span>
                  <div className="font-bold text-white text-sm">{activeShipment.origin.city}, {activeShipment.origin.country}</div>
                  <div className="text-white/60 text-[11px]">{activeShipment.origin.portOrAirport || 'Origin Depot'}</div>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-semibold mb-1">Destination</span>
                  <div className="font-bold text-white text-sm">{activeShipment.destination.city}, {activeShipment.destination.country}</div>
                  <div className="text-white/60 text-[11px]">{activeShipment.destination.portOrAirport || 'Destination Port'}</div>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-semibold mb-1">Service &amp; Carrier</span>
                  <div className="font-bold text-white uppercase">{activeShipment.serviceType.replace(/_/g, ' ')}</div>
                  <div className="text-white/60 text-[11px]">{activeShipment.carrierName || 'Haryor-Mih International Fleet'}</div>
                </div>

                <div>
                  <span className="text-white/50 block text-[10px] uppercase font-semibold mb-1">Weight &amp; Waybill</span>
                  <div className="font-bold text-white font-mono">{activeShipment.weightKg} kg ({activeShipment.quantity} units)</div>
                  <div className="text-white/60 text-[11px] font-mono">
                    {activeShipment.airWaybillNumber || activeShipment.billOfLadingNumber || 'BL/AWB Pending Issuance'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 10-Stage Lifecycle Progress Bar */}
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                Shipment Lifecycle Stages
              </h3>

              <div className="hidden lg:grid grid-cols-9 gap-2 relative">
                {lifecycleStages.map((stg, idx) => {
                  const isCompleted = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;

                  return (
                    <div key={stg.status} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                          isCurrent
                            ? 'bg-[#FF6B00] text-white ring-4 ring-orange-500/40 scale-110 shadow-lg'
                            : isCompleted
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white/10 text-white/40 border border-white/15'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] leading-tight ${
                          isCurrent
                            ? 'text-[#FF8500] font-bold'
                            : isCompleted
                            ? 'text-white font-semibold'
                            : 'text-white/40'
                        }`}
                      >
                        {stg.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Stage Indicator */}
              <div className="lg:hidden bg-white/5 p-4 rounded-2xl border border-white/10 text-xs backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 font-medium">Stage Progress</span>
                  <span className="font-bold text-[#FF8500]">
                    {currentStageIndex + 1} of 9 ({lifecycleStages[Math.max(0, currentStageIndex)]?.label})
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6B00] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStageIndex + 1) / 9) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Timeline Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Logs (2 Cols) */}
              <div className="lg:col-span-2 bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                  Milestone Audit &amp; Event History
                </h3>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
                  {activeShipment.events.map((ev, i) => (
                    <div key={ev.id} className="relative group">
                      {/* Dot */}
                      <div
                        className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                          i === 0 ? 'bg-[#FF6B00] ring-4 ring-orange-500/30' : 'bg-white/40'
                        }`}
                      />

                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                            {ev.title}
                          </h4>
                          <span className="text-[11px] text-white/50 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            {ev.timestamp}
                          </span>
                        </div>

                        <div className="text-xs text-[#FF8500] font-semibold flex items-center gap-1 mb-1.5">
                          <MapPin className="w-3 h-3 text-[#FF6B00]" />
                          {ev.location}
                        </div>

                        <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
                          {ev.description}
                        </p>

                        {ev.isException && (
                          <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-center gap-2 backdrop-blur-md">
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>
                              <strong>Exception Notice:</strong> {ev.exceptionReason}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Documents & Consignee Support (1 Col) */}
              <div className="space-y-6">
                {/* Documents card */}
                <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#FF6B00]" />
                    Verified Cargo Documents
                  </h3>

                  {activeShipment.documents && activeShipment.documents.length > 0 ? (
                    <div className="space-y-2">
                      {activeShipment.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs flex items-center justify-between backdrop-blur-md"
                        >
                          <div>
                            <div className="font-semibold text-white truncate max-w-[170px]">
                              {doc.name}
                            </div>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-lg font-medium border border-emerald-500/30">
                              Verified Compliance
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-white/40">PDF</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white/50">
                      Standard customs documentation is filed electronically with terminal operators.
                    </p>
                  )}
                </div>

                {/* Assistance card */}
                <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/20 text-white rounded-3xl p-6 space-y-4 shadow-2xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF8500]">
                    Need Help With This Shipment?
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Have questions about terminal discharge, customs duty assessment, or delivery scheduling?
                  </p>
                  <a
                    href={`https://wa.me/2348032345678?text=${encodeURIComponent(
                      `Hello Haryor-Mih, I am following up on my shipment ${activeShipment.id}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-bold text-center rounded-2xl transition border border-white/20 backdrop-blur-md shadow-lg"
                  >
                    WhatsApp Consignment Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
