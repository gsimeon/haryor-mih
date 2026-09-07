import React, { useState } from 'react';
import {
  Car,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  DollarSign,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Vehicle, VehicleCondition, VehicleStatus, Currency } from '../../types';

export const AutoTradePage: React.FC = () => {
  const {
    vehicles,
    formatCurrency,
    activeCurrency,
    navigateTo,
    submitVehicleRequest,
    createLead,
  } = useApp();

  // Active view: 'inventory' or 'request'
  const [activeTab, setActiveTab] = useState<'inventory' | 'request'>('inventory');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('ALL');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');

  // Selected vehicle for modal
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);

  // Sourcing form state
  const [sourcingName, setSourcingName] = useState('');
  const [sourcingEmail, setSourcingEmail] = useState('');
  const [sourcingPhone, setSourcingPhone] = useState('');
  const [sourcingCountry, setSourcingCountry] = useState('Nigeria');
  const [sourcingMake, setSourcingMake] = useState('Mercedes-Benz');
  const [sourcingModel, setSourcingModel] = useState('GLE 450 AMG');
  const [sourcingYearMin, setSourcingYearMin] = useState(2021);
  const [sourcingYearMax, setSourcingYearMax] = useState(2024);
  const [sourcingBudget, setSourcingBudget] = useState(85000000);
  const [sourcingCurrency, setSourcingCurrency] = useState<Currency>('NGN');
  const [sourcingNotes, setSourcingNotes] = useState('');
  const [sourcingSuccessId, setSourcingSuccessId] = useState<string | null>(null);

  const makes = ['ALL', ...Array.from(new Set(vehicles.map((v) => v.make)))];
  const locations = ['ALL', ...Array.from(new Set(vehicles.map((v) => v.location)))];

  const filteredVehicles = vehicles.filter((v) => {
    if (v.status === 'HIDDEN') return false;
    const matchesSearch =
      v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = selectedMake === 'ALL' || v.make === selectedMake;
    const matchesCondition = selectedCondition === 'ALL' || v.condition === selectedCondition;
    const matchesLocation = selectedLocation === 'ALL' || v.location === selectedLocation;

    return matchesSearch && matchesMake && matchesCondition && matchesLocation;
  });

  const handleSourcingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourcingName.trim() || !sourcingEmail.trim() || !sourcingPhone.trim()) {
      alert('Please fill out all required contact fields.');
      return;
    }

    const id = submitVehicleRequest({
      name: sourcingName,
      email: sourcingEmail,
      phone: sourcingPhone,
      country: sourcingCountry,
      preferredMake: sourcingMake,
      preferredModel: sourcingModel,
      preferredYearMin: sourcingYearMin,
      preferredYearMax: sourcingYearMax,
      budgetAmount: sourcingBudget,
      budgetCurrency: sourcingCurrency,
      additionalRequirements: sourcingNotes,
    });

    setSourcingSuccessId(id);
  };

  return (
    <div id="autotrade-page-container" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Hero Banner */}
        <div className="bg-white/[0.06] backdrop-blur-2xl text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs font-semibold text-orange-400">
              <Car className="w-3.5 h-3.5" />
              HARYOR-MIH AUTOTRADE / VEHICLE DEALERSHIP
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Montserrat'] tracking-tight leading-tight">
              FIND YOUR NEXT <br />
              <span className="text-orange-400">PREMIUM VEHICLE.</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Browse duty-paid luxury vehicles in our Lagos showroom or direct inventory sourced through our UK and US logistics networks.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition backdrop-blur-md cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                In-Stock Vehicles ({vehicles.filter((v) => v.status !== 'HIDDEN').length})
              </button>
              <button
                onClick={() => setActiveTab('request')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition backdrop-blur-md cursor-pointer ${
                  activeTab === 'request'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                Custom Overseas Sourcing Request
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: VEHICLE INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Search and Filters Bar */}
            <div className="bg-white/[0.06] backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-white/15 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Search Model
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. GLE 450, Land Cruiser..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white/[0.05] border border-white/15 text-white placeholder-white/40 rounded-xl text-xs focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                  />
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 text-white rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500/50"
                >
                  {makes.map((m) => (
                    <option key={m} value={m} className="bg-slate-900 text-white">
                      {m === 'ALL' ? 'All Manufacturers' : m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Condition
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 text-white rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500/50"
                >
                  <option value="ALL" className="bg-slate-900 text-white">All Conditions</option>
                  <option value="BRAND_NEW" className="bg-slate-900 text-white">Brand New (0 km)</option>
                  <option value="FOREIGN_USED" className="bg-slate-900 text-white">Foreign Used (Tokunbo)</option>
                  <option value="CERTIFIED_PRE_OWNED" className="bg-slate-900 text-white">Certified Pre-Owned</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 text-white rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500/50"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-slate-900 text-white">
                      {loc === 'ALL' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((v) => (
                <div
                  key={v.id}
                  className="bg-white/[0.06] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/15 hover:border-orange-500/40 transition-all hover:shadow-2xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={v.images[0]}
                        alt={`${v.year} ${v.make} ${v.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md text-white shadow-md ${
                            v.status === 'AVAILABLE'
                              ? 'bg-emerald-600'
                              : v.status === 'IN_TRANSIT'
                              ? 'bg-sky-600'
                              : 'bg-amber-600'
                          }`}
                        >
                          {v.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] text-white font-mono border border-white/10">
                        {v.condition.replace(/_/g, ' ')}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs text-white/50 font-medium">
                        {v.year} • {v.mileageKm.toLocaleString()} KM • {v.fuelType}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mt-1 mb-2">
                        {v.make} {v.model}
                      </h3>

                      <div className="text-xl font-extrabold text-orange-400 font-mono">
                        {formatCurrency(v.price)}
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-400" />
                          <span>{v.location}</span>
                        </div>
                        {v.engineSize && (
                          <div className="flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-white/40" />
                            <span>Engine: {v.engineSize}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setModalVehicle(v)}
                      className="w-full py-3 bg-white/[0.08] hover:bg-orange-500 border border-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition text-center cursor-pointer backdrop-blur-md"
                    >
                      View Vehicle Details &amp; Docs
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-16 bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/15 text-white">
                <Car className="w-12 h-12 text-white/30 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No Vehicles Match Your Filter</h3>
                <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto">
                  We frequently source cars directly from auctions and dealers in the UK, USA, and Germany. Submit a custom sourcing request!
                </p>
                <button
                  onClick={() => setActiveTab('request')}
                  className="mt-4 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  Open Sourcing Request
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CUSTOM SOURCING REQUEST */}
        {activeTab === 'request' && (
          <div className="max-w-3xl mx-auto bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-10 animate-in fade-in duration-200 text-white">
            {sourcingSuccessId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  SOURCING REQUEST SUBMITTED
                </h2>
                <div className="inline-block p-4 bg-white/[0.06] border border-white/15 rounded-xl text-white font-mono text-xl text-orange-400">
                  {sourcingSuccessId}
                </div>
                <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                  Our overseas auto acquisition desk in London and the US will review dealer auctions and verified stock to present matching vehicle candidates.
                </p>
                <button
                  onClick={() => {
                    setSourcingSuccessId(null);
                    setActiveTab('inventory');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  Return to Inventory
                </button>
              </div>
            ) : (
              <form onSubmit={handleSourcingSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Custom Vehicle Sourcing Request</h2>
                  <p className="text-xs text-white/60 mt-1">
                    Looking for a specific model, trim, or color? We inspect, purchase, ocean freight, and customs-clear vehicles directly for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                      Target Make <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mercedes-Benz, Toyota, Lexus"
                      value={sourcingMake}
                      onChange={(e) => setSourcingMake(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                      Target Model &amp; Trim <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. GLE 450 AMG, Land Cruiser 300"
                      value={sourcingModel}
                      onChange={(e) => setSourcingModel(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">Min Year</label>
                    <input
                      type="number"
                      value={sourcingYearMin}
                      onChange={(e) => setSourcingYearMin(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">Max Year</label>
                    <input
                      type="number"
                      value={sourcingYearMax}
                      onChange={(e) => setSourcingYearMax(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">Budget</label>
                    <input
                      type="number"
                      value={sourcingBudget}
                      onChange={(e) => setSourcingBudget(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kenneth Okeke"
                      value={sourcingName}
                      onChange={(e) => setSourcingName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. k.okeke@example.com"
                      value={sourcingEmail}
                      onChange={(e) => setSourcingEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                      Phone / WhatsApp <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 803 554 1122"
                      value={sourcingPhone}
                      onChange={(e) => setSourcingPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                    Additional Specifications &amp; Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Preference for black exterior, red or camel interior, sunroof required, clean title only."
                    value={sourcingNotes}
                    onChange={(e) => setSourcingNotes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  Submit Sourcing Request (HM-VR Reference)
                </button>
              </form>
            )}
          </div>
        )}

        {/* VEHICLE DETAILS MODAL */}
        {modalVehicle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-white/15 relative animate-in zoom-in-95 duration-200 text-left text-white">
              <button
                onClick={() => setModalVehicle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {modalVehicle.condition.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-white/50 font-mono">VIN: {modalVehicle.vin || 'Verified on Inquiry'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {modalVehicle.year} {modalVehicle.make} {modalVehicle.model}
              </h2>

              <div className="text-2xl font-black text-orange-400 font-mono my-2">
                {formatCurrency(modalVehicle.price)}
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {modalVehicle.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Vehicle photograph"
                    className="w-full h-48 object-cover rounded-xl border border-white/15"
                  />
                ))}
              </div>

              <p className="text-xs text-white/70 leading-relaxed my-4">
                {modalVehicle.description}
              </p>

              {/* Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/[0.05] rounded-xl border border-white/15 text-xs mb-6 backdrop-blur-md">
                <div>
                  <span className="text-white/50 block text-[10px]">Mileage</span>
                  <strong className="text-white font-mono">{modalVehicle.mileageKm.toLocaleString()} KM</strong>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Fuel</span>
                  <strong className="text-white">{modalVehicle.fuelType}</strong>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Transmission</span>
                  <strong className="text-white">{modalVehicle.transmission}</strong>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Location</span>
                  <strong className="text-white">{modalVehicle.location}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/2348032345678?text=${encodeURIComponent(
                    `Hello Haryor-Mih AutoTrade! I am interested in purchasing the ${modalVehicle.year} ${modalVehicle.make} ${modalVehicle.model} (${modalVehicle.id}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Sales Desk
                </a>

                <button
                  onClick={() => {
                    setModalVehicle(null);
                    navigateTo('/quote');
                  }}
                  className="flex-1 py-3 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center transition cursor-pointer backdrop-blur-md"
                >
                  Calculate RoRo Shipping Rate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
