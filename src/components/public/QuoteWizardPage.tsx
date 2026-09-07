import React, { useState } from 'react';
import {
  FileText,
  User,
  Building,
  Package,
  Plane,
  Ship,
  Truck,
  HelpCircle,
  MapPin,
  Car,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileCheck,
  Download,
  Calendar,
  DollarSign,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { CustomerType, CargoCategory, ShippingMethod, Currency, QuoteRequest } from '../../types';

export const QuoteWizardPage: React.FC = () => {
  const { submitQuoteRequest, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  // Form State
  const [customerType, setCustomerType] = useState<CustomerType>('business');
  const [companyName, setCompanyName] = useState('');
  const [companyRegNumber, setCompanyRegNumber] = useState('');

  const [cargoCategory, setCargoCategory] = useState<CargoCategory>('commercial_goods');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('sea_freight_fcl');

  const [originCountry, setOriginCountry] = useState('United Kingdom');
  const [originCity, setOriginCity] = useState('London');
  const [originPortOrAirport, setOriginPortOrAirport] = useState('London Heathrow (LHR)');

  const [destinationCountry, setDestinationCountry] = useState('Nigeria');
  const [destinationCity, setDestinationCity] = useState('Lagos');
  const [destinationPortOrAirport, setDestinationPortOrAirport] = useState('Apapa Container Port / Tin Can');

  // Cargo details
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [weightKg, setWeightKg] = useState<number>(500);
  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthCm, setWidthCm] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(100);
  const [declaredValue, setDeclaredValue] = useState<number>(5000);
  const [cargoCurrency, setCargoCurrency] = useState<Currency>('USD');

  // Vehicle specific
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('Land Cruiser Prado');
  const [vehicleYear, setVehicleYear] = useState<number>(2023);
  const [vehicleCondition, setVehicleCondition] = useState('FOREIGN_USED');
  const [vehicleOperable, setVehicleOperable] = useState(true);
  const [vehicleVin, setVehicleVin] = useState('');

  // Customer Contact
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('Nigeria');

  // Uploaded docs
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; sizeMb: number; type: string }[]
  >([]);

  // Validation errors
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setValidationError('File exceeds maximum limit of 15MB.');
        return;
      }
      setValidationError(null);
      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          sizeMb: Number((file.size / (1024 * 1024)).toFixed(2)),
          type: file.type || 'application/pdf',
        },
      ]);
    }
  };

  const handleNext = () => {
    setValidationError(null);

    // Basic step validation
    if (currentStep === 1) {
      if (customerType === 'business' && !companyName.trim()) {
        setValidationError('Please enter your company name.');
        return;
      }
    } else if (currentStep === 4) {
      if (!originCountry || !originCity || !destinationCountry || !destinationCity) {
        setValidationError('Please specify both origin and destination city and country.');
        return;
      }
    } else if (currentStep === 5) {
      if (!description.trim()) {
        setValidationError('Please provide a brief cargo description.');
        return;
      }
      if (weightKg <= 0) {
        setValidationError('Cargo weight must be greater than zero.');
        return;
      }
    } else if (currentStep === 6) {
      if (!contactName.trim() || !email.trim() || !phone.trim()) {
        setValidationError('Please provide your full name, email address and contact telephone number.');
        return;
      }
      if (!email.includes('@')) {
        setValidationError('Please enter a valid email address.');
        return;
      }
    }

    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const quoteData: Partial<QuoteRequest> = {
      customerType,
      companyName: customerType === 'business' ? companyName : undefined,
      companyRegNumber: customerType === 'business' ? companyRegNumber : undefined,
      contactName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      country,
      cargoCategory,
      shippingMethod,
      origin: {
        country: originCountry,
        city: originCity,
        portOrAirport: originPortOrAirport,
      },
      destination: {
        country: destinationCountry,
        city: destinationCity,
        portOrAirport: destinationPortOrAirport,
      },
      cargoDetails: {
        description,
        quantity,
        weightKg,
        dimensionsCm: {
          length: lengthCm,
          width: widthCm,
          height: heightCm,
        },
        cbm: Number(((lengthCm * widthCm * heightCm) / 1000000).toFixed(2)),
        declaredValue,
        currency: cargoCurrency,
        vehicleMake: cargoCategory === 'vehicle' ? vehicleMake : undefined,
        vehicleModel: cargoCategory === 'vehicle' ? vehicleModel : undefined,
        vehicleYear: cargoCategory === 'vehicle' ? vehicleYear : undefined,
        vehicleCondition: cargoCategory === 'vehicle' ? vehicleCondition : undefined,
        vehicleOperable: cargoCategory === 'vehicle' ? vehicleOperable : undefined,
        vehicleVin: cargoCategory === 'vehicle' ? vehicleVin : undefined,
      },
      documents: uploadedFiles,
    };

    const newId = submitQuoteRequest(quoteData);
    setSubmittedQuoteId(newId);
    setCurrentStep(9);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#09263F', '#FF8500', '#10B981'],
      });
    } catch (e) {
      // Ignored if not supported
    }
  };

  const stepsList = [
    'Customer',
    'Cargo Type',
    'Method',
    'Route',
    'Details',
    'Contact',
    'Documents',
    'Review',
  ];

  return (
    <div id="quote-wizard-page" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase mb-1">
            Official Commercial Quotation System
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
            REQUEST A SHIPPING QUOTE
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-xl mx-auto">
            Complete the multi-step request below. Our logistics operations desk in Lagos &amp; London will calculate itemized freight, handling, and customs rates.
          </p>
        </div>

        {/* Progress Bar (Hidden on success step 9) */}
        {currentStep < 9 && (
          <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                Step {currentStep} of 8: {stepsList[currentStep - 1]}
              </span>
              <span className="font-mono text-[#FF8500] font-semibold">
                {Math.round((currentStep / 8) * 100)}% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8500] transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
            <div className="hidden sm:grid grid-cols-8 gap-1 mt-3 text-[10px] text-center font-medium">
              {stepsList.map((step, idx) => (
                <span
                  key={step}
                  className={`truncate ${
                    idx + 1 === currentStep
                      ? 'text-[#FF8500] font-bold'
                      : idx + 1 < currentStep
                      ? 'text-white'
                      : 'text-white/40'
                  }`}
                >
                  {idx + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>{validationError}</div>
          </div>
        )}

        {/* FORM STEPS CONTAINER */}
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-10">
          {/* STEP 1: CUSTOMER TYPE */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 1: Select Customer Account Type</h2>
                <p className="text-xs text-white/70">
                  Are you shipping as an individual or on behalf of a registered business entity?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCustomerType('individual')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-4 cursor-pointer backdrop-blur-md ${
                    customerType === 'individual'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#FF8500] shrink-0 mt-0.5">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Individual Shipper</div>
                    <p className="text-xs text-white/70 mt-1">
                      Personal effects, private vehicles, overseas purchases, and household relocation.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomerType('business')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex items-start gap-4 cursor-pointer backdrop-blur-md ${
                    customerType === 'business'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Commercial / Corporate Business</div>
                    <p className="text-xs text-white/70 mt-1">
                      Importers, exporters, industrial machinery, recurring container loads, and trade billing.
                    </p>
                  </div>
                </button>
              </div>

              {customerType === 'business' && (
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                        Company Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Industrial Supplies Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                        Registration / RC Number <span className="text-white/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RC 1234567"
                        value={companyRegNumber}
                        onChange={(e) => setCompanyRegNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md transition"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CARGO CATEGORY */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 2: Select Cargo Category</h2>
                <p className="text-xs text-white/70">
                  Different cargo types require specific regulatory documentation (Form M, SONCAP, PAAR, or RoRo docking).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'commercial_goods', label: 'Commercial Goods', desc: 'Merchandise & retail trade' },
                  { id: 'vehicle', label: 'Motor Vehicle', desc: 'Cars, SUVs, vans & trucks' },
                  { id: 'machinery', label: 'Heavy Machinery', desc: 'Industrial equipment & plants' },
                  { id: 'electronics', label: 'Electronics & IT', desc: 'Sensors, solar & components' },
                  { id: 'personal_effects', label: 'Personal Effects', desc: 'Household goods & moving' },
                  { id: 'perishables', label: 'Agro & Perishables', desc: 'Temperature-controlled cargo' },
                  { id: 'documents', label: 'Valued Documents', desc: 'Secure legal papers' },
                  { id: 'other', label: 'Other Cargo', desc: 'Specialized commodities' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCargoCategory(cat.id as CargoCategory)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer backdrop-blur-md ${
                      cargoCategory === cat.id
                        ? 'border-[#FF6B00] bg-white/15 shadow-xl text-white'
                        : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="font-bold text-white text-xs">{cat.label}</div>
                    <div className="text-[10px] text-white/60 mt-1">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SHIPPING METHOD */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 3: Preferred Shipping Method</h2>
                <p className="text-xs text-white/70">
                  Choose your transport medium or request an operational recommendation based on urgency and volume.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setShippingMethod('air_freight')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between backdrop-blur-md ${
                    shippingMethod === 'air_freight'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <Plane className="w-8 h-8 text-[#FF8500] mb-3" />
                  <div>
                    <div className="font-bold text-white text-sm">Air Freight Priority</div>
                    <div className="text-xs text-white/70 mt-1">2 - 5 days transit. Ideal for high value, urgent consignments.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('sea_freight_fcl')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between backdrop-blur-md ${
                    shippingMethod === 'sea_freight_fcl'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <Ship className="w-8 h-8 text-blue-400 mb-3" />
                  <div>
                    <div className="font-bold text-white text-sm">Sea Freight (FCL Container)</div>
                    <div className="text-xs text-white/70 mt-1">20ft &amp; 40ft High Cube exclusive container shipping.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('sea_freight_lcl')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between backdrop-blur-md ${
                    shippingMethod === 'sea_freight_lcl'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <Package className="w-8 h-8 text-emerald-400 mb-3" />
                  <div>
                    <div className="font-bold text-white text-sm">Sea Freight (LCL Consolidated)</div>
                    <div className="text-xs text-white/70 mt-1">Shared container space. Cost-effective for partial loads.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('door_to_door')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between backdrop-blur-md ${
                    shippingMethod === 'door_to_door'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <Truck className="w-8 h-8 text-amber-400 mb-3" />
                  <div>
                    <div className="font-bold text-white text-sm">Door-to-Door Logistics</div>
                    <div className="text-xs text-white/70 mt-1">Full pickup at origin, international freight &amp; home delivery.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('not_sure')}
                  className={`p-5 rounded-2xl border-2 text-left transition flex flex-col justify-between backdrop-blur-md ${
                    shippingMethod === 'not_sure'
                      ? 'border-[#FF6B00] bg-white/15 shadow-xl'
                      : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  <HelpCircle className="w-8 h-8 text-purple-400 mb-3" />
                  <div>
                    <div className="font-bold text-white text-sm">Not Sure / Recommend Method</div>
                    <div className="text-xs text-white/70 mt-1">Our freight engineers will advise the optimal route and mode.</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ROUTE */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 4: Freight Route (Origin &amp; Destination)</h2>
                <p className="text-xs text-white/70">
                  Specify pickup country/city and intended port of entry.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin */}
                <div className="p-5 bg-white/5 rounded-2xl border border-white/15 space-y-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-[#FF8500]" />
                    Origin (Pickup Location)
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom"
                      value={originCountry}
                      onChange={(e) => setOriginCountry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. London"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Port or Airport (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. London Heathrow (LHR) or Port of Felixstowe"
                      value={originPortOrAirport}
                      onChange={(e) => setOriginPortOrAirport(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="p-5 bg-white/5 rounded-2xl border border-white/15 space-y-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Destination (Delivery Location)
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. Nigeria"
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Lagos"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Port or Terminal</label>
                    <input
                      type="text"
                      placeholder="e.g. Tin Can Island Port or Murtala Muhammed Airport"
                      value={destinationPortOrAirport}
                      onChange={(e) => setDestinationPortOrAirport(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CARGO DETAILS */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 5: Cargo Specifications &amp; Value</h2>
                <p className="text-xs text-white/70">
                  Accurate dimensions and weights ensure proper air waybill or ocean carrier manifest calculation.
                </p>
              </div>

              {cargoCategory === 'vehicle' ? (
                /* Vehicle Specific Fields */
                <div className="space-y-4 p-5 bg-amber-500/10 rounded-2xl border border-amber-500/30 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase">
                    <Car className="w-4 h-4 text-amber-400" />
                    Vehicle Sourcing &amp; Shipping Specs
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Make</label>
                      <input
                        type="text"
                        placeholder="e.g. Mercedes-Benz, Toyota"
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Model</label>
                      <input
                        type="text"
                        placeholder="e.g. GLE 450, Prado"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Year</label>
                      <input
                        type="number"
                        value={vehicleYear}
                        onChange={(e) => setVehicleYear(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Condition</label>
                      <select
                        value={vehicleCondition}
                        onChange={(e) => setVehicleCondition(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded-xl text-xs text-white"
                      >
                        <option value="BRAND_NEW">Brand New</option>
                        <option value="FOREIGN_USED">Foreign Used (Tokunbo)</option>
                        <option value="CERTIFIED_PRE_OWNED">Certified Pre-Owned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Drive Status</label>
                      <select
                        value={vehicleOperable ? 'YES' : 'NO'}
                        onChange={(e) => setVehicleOperable(e.target.value === 'YES')}
                        className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded-xl text-xs text-white"
                      >
                        <option value="YES">Operable / Runs &amp; Drives</option>
                        <option value="NO">Non-Runner / Tow Required</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">VIN / Chassis (Optional)</label>
                      <input
                        type="text"
                        placeholder="17-character VIN"
                        value={vehicleVin}
                        onChange={(e) => setVehicleVin(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* General Cargo Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Cargo Description &amp; Itemization <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about package contents (e.g., 2 crates of industrial diagnostic sensors, or 8 boxes of personal books and clothes)."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Quantity (Units)</label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Total Weight (kg)</label>
                    <input
                      type="number"
                      min={1}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Declared Value</label>
                    <input
                      type="number"
                      min={100}
                      value={declaredValue}
                      onChange={(e) => setDeclaredValue(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Value Currency</label>
                    <select
                      value={cargoCurrency}
                      onChange={(e) => setCargoCurrency(e.target.value as Currency)}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-white/20 rounded-xl text-xs font-bold text-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="NGN">NGN (₦)</option>
                    </select>
                  </div>
                </div>

                {cargoCategory !== 'vehicle' && (
                  <div>
                    <div className="text-xs font-semibold text-white/80 mb-1">Package Dimensions (cm per unit)</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <input
                          type="number"
                          placeholder="Length cm"
                          value={lengthCm}
                          onChange={(e) => setLengthCm(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Width cm"
                          value={widthCm}
                          onChange={(e) => setWidthCm(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Height cm"
                          value={heightCm}
                          onChange={(e) => setHeightCm(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="text-[11px] text-white/60 mt-1 font-mono">
                      Estimated Volume: {((lengthCm * widthCm * heightCm * quantity) / 1000000).toFixed(2)} CBM (Cubic Metres)
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: CUSTOMER CONTACT */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 6: Shipper / Consignee Contact</h2>
                <p className="text-xs text-white/70">
                  Where should we email your formal quote and WhatsApp your tracking notifications?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Contact Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. David Adeleke"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. david.adeleke@apexholdings.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Telephone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 802 111 2233"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    WhatsApp Number (For Direct Updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 802 111 2233"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B00] backdrop-blur-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: DOCUMENTS */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 7: Supporting Documents (Optional)</h2>
                <p className="text-xs text-white/70">
                  Upload packing lists, commercial proforma invoices, equipment datasheets, or vehicle title certificates.
                </p>
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center bg-white/5 hover:bg-white/10 transition backdrop-blur-md">
                <Upload className="w-10 h-10 text-[#FF8500] mx-auto mb-3" />
                <div className="text-xs font-bold text-white mb-1">
                  Upload Documentation (PDF, PNG, JPG, DOCX)
                </div>
                <div className="text-[11px] text-white/60 mb-4">
                  Maximum file size: 15MB per file
                </div>
                <label className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#FF8500] text-white text-xs font-bold rounded-2xl cursor-pointer transition border border-white/20 backdrop-blur-md shadow-lg inline-block">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                  />
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    Attached Documents ({uploadedFiles.length})
                  </div>
                  {uploadedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 border border-white/15 rounded-2xl flex items-center justify-between text-xs backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-white">{f.name}</span>
                        <span className="text-white/60 text-[10px]">({f.sizeMb} MB)</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-lg font-semibold">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 8: REVIEW */}
          {currentStep === 8 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Step 8: Review Quotation Request</h2>
                <p className="text-xs text-white/70">
                  Verify your freight route, cargo parameters, and contact info before submission.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/15 space-y-4 text-xs backdrop-blur-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-white/50 block text-[11px]">Customer &amp; Company:</span>
                    <strong className="text-white">{contactName}</strong>
                    {customerType === 'business' && (
                      <div className="text-white/80">{companyName} {companyRegNumber && `(${companyRegNumber})`}</div>
                    )}
                  </div>
                  <div>
                    <span className="text-white/50 block text-[11px]">Contact Details:</span>
                    <div className="text-white/90">{email}</div>
                    <div className="text-white/90">{phone}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-white/50 block text-[11px]">Route:</span>
                    <strong className="text-white">{originCity}, {originCountry}</strong>
                    <span className="mx-2 text-[#FF8500]">&rarr;</span>
                    <strong className="text-white">{destinationCity}, {destinationCountry}</strong>
                    <div className="text-white/60 text-[10px] mt-0.5">
                      Ports: {originPortOrAirport} &rarr; {destinationPortOrAirport}
                    </div>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[11px]">Service &amp; Mode:</span>
                    <strong className="text-[#FF8500] uppercase">
                      {shippingMethod.replace(/_/g, ' ')}
                    </strong>
                    <div className="text-white/70 text-[11px]">Category: {cargoCategory.replace(/_/g, ' ')}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-white/50 block text-[11px]">Cargo Specifications:</span>
                  <p className="text-white/90">{description || 'No detailed description provided.'}</p>
                  <div className="flex gap-4 pt-1 text-white/80 font-mono text-[11px]">
                    <span>Qty: {quantity}</span>
                    <span>Weight: {weightKg} kg</span>
                    <span>Declared Value: {cargoCurrency} {declaredValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-200 leading-relaxed backdrop-blur-md">
                <strong>Notice:</strong> Submitting this request does not obligate payment. Quotations are individually assessed by Haryor-Mih certified freight forwarders according to prevailing carrier surcharges, bunker adjustments, and statutory Nigeria Customs regulations.
              </div>
            </div>
          )}

          {/* STEP 9: SUCCESS CONFIRMATION */}
          {currentStep === 9 && submittedQuoteId && (
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#FF8500] tracking-widest uppercase">
                  Request Successfully Received
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
                  QUOTATION REQUEST SUBMITTED
                </h2>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  Your formal freight quotation has been logged and assigned to our international freight handling team.
                </p>
              </div>

              <div className="inline-block bg-white/10 backdrop-blur-2xl text-white p-6 rounded-3xl border border-white/20 shadow-2xl my-4">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                  Quotation Reference Number
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FF8500]">
                  {submittedQuoteId}
                </div>
                <div className="text-[11px] text-white/60 mt-2">
                  Status: <span className="text-amber-300 font-semibold">REQUESTED / UNDER REVIEW</span>
                </div>
              </div>

              <div className="max-w-lg mx-auto bg-white/5 border border-white/15 rounded-2xl p-5 text-xs text-left space-y-2.5 text-white/80 backdrop-blur-md">
                <div className="font-bold text-white">What Happens Next:</div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#FF6B00] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Our commercial desk verifies carrier schedules, space allocations, and current port levies.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#FF6B00] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>An itemized quotation with freight, insurance, and customs handling will be generated.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#FF6B00] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>You will receive an email notice and can approve the quote in your Customer Portal.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  onClick={() => navigateTo('/portal')}
                  className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8500] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-xl border border-white/20 backdrop-blur-md"
                >
                  View in Customer Portal
                </button>
                <button
                  onClick={() => navigateTo('/')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition border border-white/15 backdrop-blur-md"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls (Steps 1 - 8) */}
          {currentStep < 9 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2 transition backdrop-blur-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-[#FF6B00] hover:bg-[#FF8500] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-xl border border-white/20 backdrop-blur-md"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-2xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-2xl border border-white/20 backdrop-blur-md"
                >
                  Submit Quote Request
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
