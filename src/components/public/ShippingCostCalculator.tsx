import React, { useState, useMemo } from 'react';
import {
  Plane,
  Ship,
  Truck,
  Package,
  Car,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
  Info,
  Scale,
  Maximize2,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShippingMethod, Currency } from '../../types';

interface DimensionPreset {
  id: string;
  name: string;
  l: number;
  w: number;
  h: number;
  description: string;
}

const PRESETS: DimensionPreset[] = [
  { id: 'small', name: 'Small Parcel', l: 30, w: 20, h: 15, description: 'Documents / Samples (0.009 CBM)' },
  { id: 'medium', name: 'Medium Carton', l: 50, w: 40, h: 30, description: 'Clothing / Shoes (0.06 CBM)' },
  { id: 'large', name: 'Master Crate', l: 80, w: 60, h: 50, description: 'Electronics / Spare parts (0.24 CBM)' },
  { id: 'pallet', name: 'Standard Pallet', l: 120, w: 100, h: 120, description: 'Commercial Cargo (1.44 CBM)' },
  { id: 'fcl20', name: '20ft FCL Container', l: 590, w: 235, h: 239, description: 'Full Container (33 CBM)' },
  { id: 'fcl40', name: '40ft HC Container', l: 1203, w: 235, h: 269, description: 'High Cube Container (76 CBM)' },
];

const ORIGINS = [
  { code: 'UK-LON', name: 'London Heathrow / Tilbury Hub, UK', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CN-CAN', name: 'Guangzhou / Yiwu / Shenzhen, China', country: 'China', flag: '🇨🇳' },
  { code: 'US-HOU', name: 'Houston / New York / JFK, USA', country: 'United States', flag: '🇺🇸' },
  { code: 'AE-DXB', name: 'Dubai Cargo Village / Jebel Ali, UAE', country: 'UAE', flag: '🇦🇪' },
  { code: 'DE-FRA', name: 'Frankfurt / Hamburg Port, Germany', country: 'Germany', flag: '🇩🇪' },
  { code: 'NG-LOS', name: 'Lagos Airport / Apapa Port, Nigeria (Export)', country: 'Nigeria', flag: '🇳🇬' },
];

const DESTINATIONS = [
  { code: 'LOS-AIR', name: 'Lagos - Murtala Muhammed Int\'l (LOS)', country: 'Nigeria', type: 'Airport / Terminal', flag: '🇳🇬' },
  { code: 'LOS-SEA', name: 'Lagos - Apapa & Tin Can Island Ports', country: 'Nigeria', type: 'Ocean Port', flag: '🇳🇬' },
  { code: 'LOS-DOOR', name: 'Lagos Mainland & Island (Door Delivery)', country: 'Nigeria', type: 'Door-to-Door', flag: '🇳🇬' },
  { code: 'ABV-DOOR', name: 'Abuja FCT & Central Region (Door Delivery)', country: 'Nigeria', type: 'Door-to-Door', flag: '🇳🇬' },
  { code: 'PHC-SEA', name: 'Port Harcourt & Onne Sea Port / Rivers', country: 'Nigeria', type: 'Ocean / Hub', flag: '🇳🇬' },
  { code: 'KAN-HUB', name: 'Kano & Northern Nigeria Regional Hub', country: 'Nigeria', type: 'Inland Depot', flag: '🇳🇬' },
  { code: 'UK-DOOR', name: 'London & Nationwide UK (Outward Export)', country: 'United Kingdom', type: 'Export Terminal', flag: '🇬🇧' },
  { code: 'US-DOOR', name: 'Houston / New York Commercial Receiving', country: 'United States', type: 'Export Terminal', flag: '🇺🇸' },
];

const CARGO_CATEGORIES = [
  { id: 'general', name: 'General Commercial Cargo & Merchandise', factor: 1.0 },
  { id: 'electronics', name: 'Electronics, Batteries & Solar Inverters', factor: 1.15 },
  { id: 'personal', name: 'Personal Luggage, Clothing & Household Effects', factor: 0.95 },
  { id: 'machinery', name: 'Heavy Industrial Machinery & Auto Parts', factor: 1.1 },
  { id: 'foodstuff', name: 'Packaged Non-Perishables & Foodstuff', factor: 1.05 },
  { id: 'vehicle', name: 'Motor Vehicle / SUV / Truck RoRo', factor: 1.2 },
];

// Exchange Rates from USD to Target Currency
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  NGN: 1450,
  GBP: 0.78,
  EUR: 0.92,
};

export const ShippingCostCalculator: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { activeCurrency, formatCurrency, navigateTo, t, currentLanguage } = useApp();

  // Mode Selection
  const [method, setMethod] = useState<ShippingMethod>('air_freight');
  const [origin, setOrigin] = useState('UK-LON');
  const [destination, setDestination] = useState('LOS-DOOR');
  const [category, setCategory] = useState('general');

  // Units: 'metric' (kg, cm) vs 'imperial' (lbs, in)
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Input states
  const [grossWeight, setGrossWeight] = useState<number>(25);
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(40);
  const [height, setHeight] = useState<number>(30);
  const [activePreset, setActivePreset] = useState<string>('medium');

  // Optional Add-ons
  const [includeCustoms, setIncludeCustoms] = useState<boolean>(true);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [doorPickup, setDoorPickup] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  // Apply a preset
  const handleApplyPreset = (preset: DimensionPreset) => {
    setActivePreset(preset.id);
    if (unitSystem === 'metric') {
      setLength(preset.l);
      setWidth(preset.w);
      setHeight(preset.h);
    } else {
      // Convert cm to inches
      setLength(Math.round(preset.l * 0.3937));
      setWidth(Math.round(preset.w * 0.3937));
      setHeight(Math.round(preset.h * 0.3937));
    }
  };

  // Convert dimensions to metric (cm and kg) for standard tariff formula
  const { actualWeightKg, lengthCm, widthCm, heightCm } = useMemo(() => {
    if (unitSystem === 'metric') {
      return {
        actualWeightKg: Math.max(0.5, Number(grossWeight) || 0.5),
        lengthCm: Math.max(1, Number(length) || 1),
        widthCm: Math.max(1, Number(width) || 1),
        heightCm: Math.max(1, Number(height) || 1),
      };
    } else {
      return {
        actualWeightKg: Math.max(0.5, (Number(grossWeight) || 1) * 0.453592),
        lengthCm: Math.max(1, (Number(length) || 1) * 2.54),
        widthCm: Math.max(1, (Number(width) || 1) * 2.54),
        heightCm: Math.max(1, (Number(height) || 1) * 2.54),
      };
    }
  }, [grossWeight, length, width, height, unitSystem]);

  // Volumetric weight: Air formula is (L x W x H cm) / 6000 (IATA standard forwarder divisor)
  const volumetricWeightKg = useMemo(() => {
    const divisor = method === 'air_freight' || method === 'door_to_door' ? 6000 : 5000;
    const vol = (lengthCm * widthCm * heightCm) / divisor;
    return Number(vol.toFixed(2));
  }, [lengthCm, widthCm, heightCm, method]);

  // CBM (Cubic Meters)
  const cbm = useMemo(() => {
    const vol = (lengthCm * widthCm * heightCm) / 1000000;
    return Number(vol.toFixed(3));
  }, [lengthCm, widthCm, heightCm]);

  // Chargeable weight: whichever is higher
  const chargeableWeightKg = useMemo(() => {
    return Math.max(actualWeightKg, volumetricWeightKg);
  }, [actualWeightKg, volumetricWeightKg]);

  const isVolumetricGoverning = volumetricWeightKg > actualWeightKg;

  // Selected Origin and Destination metadata
  const selectedOrigin = ORIGINS.find((o) => o.code === origin) || ORIGINS[0];
  const selectedDestination = DESTINATIONS.find((d) => d.code === destination) || DESTINATIONS[0];
  const selectedCategory = CARGO_CATEGORIES.find((c) => c.id === category) || CARGO_CATEGORIES[0];

  // Base Calculation Engine in USD
  const calculation = useMemo(() => {
    let baseRatePerKgUsd = 6.8; // Default Air freight per kg
    let fuelSurchargePerKgUsd = 0.95;
    let terminalHandlingUsd = 25;
    let customsDocUsd = 45;
    let transitTime = '3 - 5 Business Days';

    // Route corridor factor
    let corridorFactor = 1.0;
    if (origin === 'CN-CAN') corridorFactor = 1.12; // China route
    if (origin === 'US-HOU') corridorFactor = 1.25; // USA route
    if (origin === 'DE-FRA') corridorFactor = 1.05; // Germany route
    if (origin === 'AE-DXB') corridorFactor = 1.08; // Dubai route
    if (origin === 'NG-LOS') corridorFactor = 1.15; // Outward export route

    // Method factors
    if (method === 'air_freight') {
      // Priority Air
      baseRatePerKgUsd = 7.5 * corridorFactor * selectedCategory.factor;
      fuelSurchargePerKgUsd = 1.1;
      terminalHandlingUsd = 30;
      transitTime = '3 - 5 Business Days';
    } else if (method === 'door_to_door') {
      // Door to Door Courier
      baseRatePerKgUsd = 9.2 * corridorFactor * selectedCategory.factor;
      fuelSurchargePerKgUsd = 1.4;
      terminalHandlingUsd = 20;
      transitTime = '4 - 6 Business Days';
    } else if (method === 'sea_freight_lcl') {
      // Ocean LCL consolidation: priced per CBM (minimum 1 CBM equivalent)
      const billedCbm = Math.max(0.5, cbm);
      baseRatePerKgUsd = (billedCbm * 240 * corridorFactor * selectedCategory.factor) / Math.max(1, chargeableWeightKg);
      fuelSurchargePerKgUsd = (billedCbm * 35) / Math.max(1, chargeableWeightKg);
      terminalHandlingUsd = 45;
      transitTime = '25 - 35 Ocean Transit Days';
    } else if (method === 'sea_freight_fcl') {
      // Full Container Load
      const is40ft = cbm > 40;
      const fclPrice = (is40ft ? 4200 : 2800) * corridorFactor;
      baseRatePerKgUsd = fclPrice / Math.max(1, chargeableWeightKg);
      fuelSurchargePerKgUsd = (is40ft ? 450 : 300) / Math.max(1, chargeableWeightKg);
      terminalHandlingUsd = 180;
      transitTime = '28 - 38 Ocean Days Port-to-Port';
    } else if (method === 'road_freight') {
      // Interstate & Regional Haulage
      baseRatePerKgUsd = 2.4 * selectedCategory.factor;
      fuelSurchargePerKgUsd = 0.4;
      terminalHandlingUsd = 20;
      transitTime = '2 - 4 Road Transit Days';
    }

    // Weight bracket discounts for commercial volumes
    if (chargeableWeightKg > 500) {
      baseRatePerKgUsd *= 0.82; // 18% discount for bulk
    } else if (chargeableWeightKg > 100) {
      baseRatePerKgUsd *= 0.9; // 10% discount for mid-tier
    }

    // Subtotals in USD
    const freightBaseUsd = Math.max(35, chargeableWeightKg * baseRatePerKgUsd);
    const fuelUsd = chargeableWeightKg * fuelSurchargePerKgUsd;
    const handlingUsd = terminalHandlingUsd;
    const customsUsd = includeCustoms ? customsDocUsd : 0;
    const insuranceUsd = includeInsurance ? Math.max(15, freightBaseUsd * 0.018) : 0;
    const pickupUsd = doorPickup ? 35 : 0;

    const totalUsd = freightBaseUsd + fuelUsd + handlingUsd + customsUsd + insuranceUsd + pickupUsd;

    // Convert to Active Currency
    const rate = EXCHANGE_RATES[activeCurrency] || 1;

    return {
      freightBase: freightBaseUsd * rate,
      fuelSurcharge: fuelUsd * rate,
      terminalHandling: handlingUsd * rate,
      customsDoc: customsUsd * rate,
      insurance: insuranceUsd * rate,
      pickup: pickupUsd * rate,
      total: totalUsd * rate,
      transitTime,
      ratePerKg: (baseRatePerKgUsd + fuelSurchargePerKgUsd) * rate,
    };
  }, [
    method,
    origin,
    destination,
    category,
    chargeableWeightKg,
    cbm,
    includeCustoms,
    includeInsurance,
    doorPickup,
    activeCurrency,
    selectedCategory.factor,
  ]);

  // Handle transfer to official quote wizard
  const handleTransferToQuote = () => {
    navigateTo('/quote', {
      origin,
      destination,
      method,
      weight: chargeableWeightKg.toString(),
      cbm: cbm.toString(),
      category,
    });
  };

  // Copy Calculation Dossier
  const handleCopyCalculation = () => {
    const text = `Haryor-Mih International Logistics - Rate Estimate
--------------------------------------------------
Origin: ${selectedOrigin.flag} ${selectedOrigin.name}
Destination: ${selectedDestination.flag} ${selectedDestination.name}
Service Mode: ${method.toUpperCase()}
Cargo Type: ${selectedCategory.name}
Actual Weight: ${actualWeightKg.toFixed(1)} kg (${(actualWeightKg * 2.20462).toFixed(1)} lbs)
Dimensions: ${lengthCm} x ${widthCm} x ${heightCm} cm (${cbm.toFixed(3)} CBM)
Chargeable Weight: ${chargeableWeightKg.toFixed(1)} kg (${isVolumetricGoverning ? 'Volumetric Governed' : 'Actual Weight Governed'})
Estimated Transit: ${calculation.transitTime}

Cost Breakdown (${activeCurrency}):
- Base Freight: ${formatCurrency(calculation.freightBase)}
- Fuel & Security Surcharge: ${formatCurrency(calculation.fuelSurcharge)}
- Terminal Handling & Scanning: ${formatCurrency(calculation.terminalHandling)}
${includeCustoms ? `- Customs Clearing & PAAR Support: ${formatCurrency(calculation.customsDoc)}\n` : ''}${includeInsurance ? `- Marine/Air Transit Insurance: ${formatCurrency(calculation.insurance)}\n` : ''}${doorPickup ? `- Warehouse Pickup: ${formatCurrency(calculation.pickup)}\n` : ''}Total Estimated Cost: ${formatCurrency(calculation.total)}

Reference: HM-EST-${Date.now().toString().slice(-6)}
Web: https://haryormih.com | Lagos: +234 803 234 5678 | UK: +44 20 8123 4567`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // WhatsApp Link Pre-fill
  const whatsAppUrl = useMemo(() => {
    const message = `Hello Haryor-Mih Logistics Desk! I used the Shipping Cost Calculator on your website.
Route: ${selectedOrigin.name} to ${selectedDestination.name}
Mode: ${method}
Weight: ${chargeableWeightKg.toFixed(1)} kg (${cbm.toFixed(3)} CBM)
Estimated Cost: ${formatCurrency(calculation.total, activeCurrency)}
I would like to confirm carrier space and formal booking!`;
    return `https://wa.me/2348032345678?text=${encodeURIComponent(message)}`;
  }, [
    selectedOrigin.name,
    selectedDestination.name,
    method,
    chargeableWeightKg,
    cbm,
    calculation.total,
    activeCurrency,
    formatCurrency,
  ]);

  return (
    <div
      id="shipping-cost-calculator"
      className="bg-white/[0.04] border border-white/15 rounded-3xl p-5 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Background Decorative Accent */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/30 text-[#FF8500] text-xs font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('calc.tag', 'REAL-TIME FREIGHT ESTIMATOR')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
            {t('calc.title', 'Shipping Cost Calculator')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            {t(
              'calc.desc',
              'Instant door-to-port and door-to-door cost estimates based on weight, dimensions, and certified carrier tariffs across UK, China, USA & Nigeria.'
            )}
          </p>
        </div>

        {/* Currency & Unit Switcher Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="bg-white/10 p-1 rounded-xl border border-white/15 flex items-center gap-1 backdrop-blur-md">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                unitSystem === 'metric'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              kg / cm
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                unitSystem === 'imperial'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              lbs / in
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Method Segmented Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
          1. Select Freight Service Mode
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <button
            type="button"
            onClick={() => setMethod('air_freight')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 backdrop-blur-md cursor-pointer ${
              method === 'air_freight'
                ? 'bg-[#FF6B00]/25 border-[#FF6B00] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                method === 'air_freight' ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-[#FF8500]'
              }`}
            >
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">Air Priority</div>
              <div className="text-[10px] text-white/60">3-5 Days Express</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMethod('door_to_door')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 backdrop-blur-md cursor-pointer ${
              method === 'door_to_door'
                ? 'bg-[#FF6B00]/25 border-[#FF6B00] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                method === 'door_to_door' ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-emerald-400'
              }`}
            >
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">Door-to-Door</div>
              <div className="text-[10px] text-white/60">Courier Direct</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMethod('sea_freight_lcl')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 backdrop-blur-md cursor-pointer ${
              method === 'sea_freight_lcl'
                ? 'bg-[#FF6B00]/25 border-[#FF6B00] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                method === 'sea_freight_lcl' ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-sky-400'
              }`}
            >
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">Ocean LCL</div>
              <div className="text-[10px] text-white/60">Groupage / per CBM</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMethod('sea_freight_fcl')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 backdrop-blur-md cursor-pointer ${
              method === 'sea_freight_fcl'
                ? 'bg-[#FF6B00]/25 border-[#FF6B00] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                method === 'sea_freight_fcl' ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-amber-400'
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">Ocean FCL</div>
              <div className="text-[10px] text-white/60">20ft &amp; 40ft Box</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMethod('road_freight')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 backdrop-blur-md cursor-pointer ${
              method === 'road_freight'
                ? 'bg-[#FF6B00]/25 border-[#FF6B00] text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                method === 'road_freight' ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-purple-400'
              }`}
            >
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight">Road Haulage</div>
              <div className="text-[10px] text-white/60">Regional &amp; Interstate</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Live Result Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Origin, Destination, Weight, Dimensions & Addons */}
        <div className="lg:col-span-7 space-y-5">
          {/* Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Origin Hub</span>
              </label>
              <select
                id="calc-origin-select"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
              >
                {ORIGINS.map((o) => (
                  <option key={o.code} value={o.code} className="bg-slate-900 text-white">
                    {o.flag} {o.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Destination Port / Hub</span>
              </label>
              <select
                id="calc-destination-select"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.code} value={d.code} className="bg-slate-900 text-white">
                    {d.flag} {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cargo Classification */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1.5 flex items-center justify-between">
              <span>Cargo Nature &amp; Classification</span>
              <span className="text-[11px] text-white/50">Affects handling &amp; security surcharge</span>
            </label>
            <select
              id="calc-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
            >
              {CARGO_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dimension Presets Quick Pick */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Quick Package Presets</span>
              </span>
              <span className="text-[11px] text-white/50">Click to fill dimensions</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border ${
                    activePreset === p.id
                      ? 'bg-[#FF6B00]/30 border-[#FF6B00] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                  title={p.description}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Dimensions Fields */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            {/* Weight Input + Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gross Scale Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</span>
                </span>
                <span className="font-mono text-[#FF8500] font-bold text-sm">
                  {grossWeight} {unitSystem === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="1000"
                  step="1"
                  value={grossWeight}
                  onChange={(e) => {
                    setGrossWeight(Number(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
                <input
                  type="number"
                  min="0.5"
                  max="50000"
                  value={grossWeight}
                  onChange={(e) => {
                    setGrossWeight(Math.max(0.5, Number(e.target.value)));
                    setActivePreset('');
                  }}
                  className="w-24 bg-slate-900/90 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white text-right font-mono focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Dimensions: L x W x H */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-1.5">
                <span>Dimensions ({unitSystem === 'metric' ? 'cm' : 'in'})</span>
                <span className="text-[11px] text-white/50">
                  Length × Width × Height
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <div className="text-[10px] text-white/60 mb-1">Length</div>
                  <input
                    type="number"
                    min="1"
                    value={length}
                    onChange={(e) => {
                      setLength(Math.max(1, Number(e.target.value)));
                      setActivePreset('');
                    }}
                    className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-white/60 mb-1">Width</div>
                  <input
                    type="number"
                    min="1"
                    value={width}
                    onChange={(e) => {
                      setWidth(Math.max(1, Number(e.target.value)));
                      setActivePreset('');
                    }}
                    className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-white/60 mb-1">Height</div>
                  <input
                    type="number"
                    min="1"
                    value={height}
                    onChange={(e) => {
                      setHeight(Math.max(1, Number(e.target.value)));
                      setActivePreset('');
                    }}
                    className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Optional Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
              <input
                type="checkbox"
                checked={includeCustoms}
                onChange={(e) => setIncludeCustoms(e.target.checked)}
                className="w-4 h-4 rounded text-[#FF6B00] accent-[#FF6B00]"
              />
              <div>
                <div className="font-semibold text-white">Customs &amp; PAAR Support</div>
                <div className="text-[10px] text-white/50">Form M &amp; port documentation prep</div>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="w-4 h-4 rounded text-[#FF6B00] accent-[#FF6B00]"
              />
              <div>
                <div className="font-semibold text-white">Transit Cargo Insurance</div>
                <div className="text-[10px] text-white/50">All-risk comprehensive protection</div>
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Real-Time Results & Cost Breakdown Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-slate-900/90 border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between space-y-5">
            <div>
              {/* Route Summary Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#FF8500] uppercase tracking-wider block">
                    LIVE TARIFF PROJECTION
                  </span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <span>{selectedOrigin.flag} {selectedOrigin.name.split(',')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{selectedDestination.flag} {selectedDestination.name.split('(')[0]}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/50 uppercase block">Transit Window</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {calculation.transitTime.split(' ')[0]} {calculation.transitTime.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Volumetric & Weight Audit Bar */}
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Actual Scale Weight:</span>
                  <span className="font-mono font-semibold text-white">
                    {actualWeightKg.toFixed(1)} kg ({ (actualWeightKg * 2.20462).toFixed(1) } lbs)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Volumetric Weight ({lengthCm}×{widthCm}×{heightCm}cm):</span>
                  <span className="font-mono font-semibold text-white">
                    {volumetricWeightKg.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Cubic Capacity (CBM):</span>
                  <span className="font-mono font-semibold text-white">
                    {cbm.toFixed(3)} m³
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#FF8500] uppercase block">
                      Chargeable Weight
                    </span>
                    <span className="text-[10px] text-white/50">
                      {isVolumetricGoverning ? 'Charged by Volumetric (Bulky Cargo)' : 'Charged by Scale Weight (Dense Cargo)'}
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-white font-mono bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                    {chargeableWeightKg.toFixed(1)} kg
                  </span>
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-white/70">
                  <span>Base Freight Charge ({method.replace('_', ' ').toUpperCase()}):</span>
                  <span className="font-mono text-white font-medium">
                    {formatCurrency(calculation.freightBase)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Fuel &amp; Aviation / Port Surcharge:</span>
                  <span className="font-mono text-white font-medium">
                    {formatCurrency(calculation.fuelSurcharge)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Terminal Handling, Security &amp; X-Ray:</span>
                  <span className="font-mono text-white font-medium">
                    {formatCurrency(calculation.terminalHandling)}
                  </span>
                </div>
                {includeCustoms && (
                  <div className="flex items-center justify-between text-white/70">
                    <span>Nigeria Customs &amp; PAAR Dossier Prep:</span>
                    <span className="font-mono text-white font-medium">
                      {formatCurrency(calculation.customsDoc)}
                    </span>
                  </div>
                )}
                {includeInsurance && (
                  <div className="flex items-center justify-between text-white/70">
                    <span>All-Risk Marine/Air Cargo Protection:</span>
                    <span className="font-mono text-white font-medium">
                      {formatCurrency(calculation.insurance)}
                    </span>
                  </div>
                )}
              </div>

              {/* Big Grand Total Callout */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-orange-950/40 border border-[#FF6B00]/40 text-center">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block mb-1">
                  ESTIMATED TOTAL SHIPPING CHARGE ({activeCurrency})
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-[#FF8500]">
                  {formatCurrency(calculation.total)}
                </div>
                <div className="text-[10px] text-white/60 mt-1 flex items-center justify-center gap-1">
                  <Info className="w-3 h-3 text-[#FF6B00]" />
                  <span>Includes standard tariffs at spot rate (1 USD = {EXCHANGE_RATES[activeCurrency]} {activeCurrency})</span>
                </div>
              </div>
            </div>

            {/* Actions: Proceed to Quote, WhatsApp Desk & Copy */}
            <div className="space-y-2.5 pt-2">
              <button
                id="calc-proceed-quote-btn"
                type="button"
                onClick={handleTransferToQuote}
                className="w-full py-3 bg-[#FF6B00] hover:bg-[#FF8500] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-xl border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book This Cargo / Apply to Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  id="calc-whatsapp-btn"
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Quote</span>
                </a>

                <button
                  id="calc-copy-estimate-btn"
                  type="button"
                  onClick={handleCopyCalculation}
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/70" />
                      <span>Copy Estimate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
