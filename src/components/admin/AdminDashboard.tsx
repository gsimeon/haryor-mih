import React, { useState } from 'react';
import {
  Package,
  FileText,
  Car,
  Users,
  CreditCard,
  History,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Send,
  X,
  Edit,
  Eye,
  Trash2,
  Building,
  RefreshCw,
  Truck,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthPortal } from '../auth/AuthPortal';
import {
  Shipment,
  ShipmentStatus,
  QuoteRequest,
  Vehicle,
  Lead,
  Invoice,
  CompanySettings,
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    loginAs,
    shipments,
    quotes,
    vehicles,
    leads,
    invoices,
    auditLogs,
    companySettings,
    formatCurrency,
    createShipment,
    updateShipmentStatus,
    convertQuoteToShipment,
    issueQuote,
    updateLeadStatus,
    addVehicle,
    updateVehicleStatus,
    createInvoice,
    updateSettings,
    triggerWebhook,
    navigateTo,
  } = useApp();

  // Admin section navigation
  const [adminTab, setAdminTab] = useState<
    | 'overview'
    | 'shipments'
    | 'quotes'
    | 'autotrade'
    | 'leads'
    | 'invoices'
    | 'audit'
    | 'settings'
  >('overview');

  // Search & filter states
  const [shipmentSearch, setShipmentSearch] = useState('');
  const [shipmentStatusFilter, setShipmentStatusFilter] = useState('ALL');

  // Modal states
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [selectedShipmentForUpdate, setSelectedShipmentForUpdate] = useState<Shipment | null>(null);

  // Status update form fields
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('IN_TRANSIT');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isException, setIsException] = useState(false);
  const [exceptionReason, setExceptionReason] = useState('');

  // Quote Pricing Modal
  const [selectedQuoteForPricing, setSelectedQuoteForPricing] = useState<QuoteRequest | null>(null);
  const [pricingAmount, setPricingAmount] = useState<number>(3500);
  const [pricingNotes, setPricingNotes] = useState('');

  // Add Vehicle Modal
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [vMake, setVMake] = useState('');
  const [vModel, setVModel] = useState('');
  const [vYear, setVYear] = useState(2024);
  const [vPrice, setVPrice] = useState(65000000);
  const [vMileage, setVMileage] = useState(15000);
  const [vLocation, setVLocation] = useState('Lagos Showroom');
  const [vImage, setVImage] = useState('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80');

  // Webhook test state
  const [webhookUrlInput, setWebhookUrlInput] = useState(companySettings?.n8nWebhookUrl || '');
  const [webhookTesting, setWebhookTesting] = useState(false);

  // Filtered lists
  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.cargoDescription.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      s.destination.city.toLowerCase().includes(shipmentSearch.toLowerCase());
    const matchesStatus =
      shipmentStatusFilter === 'ALL' || s.currentStatus === shipmentStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeShipmentsCount = shipments.filter((s) => s.currentStatus !== 'DELIVERED').length;
  const deliveredCount = shipments.filter((s) => s.currentStatus === 'DELIVERED').length;
  const exceptionCount = shipments.filter((s) => s.currentStatus === 'EXCEPTION').length;
  const pendingQuotesCount = quotes.filter((q) => q.status === 'REQUESTED' || q.status === 'UNDER_REVIEW').length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);

  const handleStatusUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipmentForUpdate || !eventLocation || !eventDescription) {
      alert('Please provide status location and milestone description.');
      return;
    }

    updateShipmentStatus(
      selectedShipmentForUpdate.id,
      newStatus,
      eventLocation,
      eventDescription,
      isException,
      exceptionReason
    );

    setShowStatusUpdateModal(false);
    setSelectedShipmentForUpdate(null);
    setEventLocation('');
    setEventDescription('');
    setIsException(false);
    setExceptionReason('');
  };

  const handleIssueQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuoteForPricing) return;

    issueQuote(
      selectedQuoteForPricing.id,
      pricingAmount,
      selectedQuoteForPricing.cargoDetails.currency || 'USD',
      pricingNotes
    );

    setSelectedQuoteForPricing(null);
  };

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vMake.trim() || !vModel.trim()) {
      alert('Please fill out vehicle make and model.');
      return;
    }

    addVehicle({
      make: vMake,
      model: vModel,
      year: vYear,
      price: vPrice,
      mileageKm: vMileage,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'FOREIGN_USED',
      location: vLocation,
      description: `Newly cleared ${vYear} ${vMake} ${vModel}. Fully inspected with complete customs duty papers.`,
      images: [vImage],
      status: 'AVAILABLE',
      featured: false,
    });

    setShowAddVehicleModal(false);
    setVMake('');
    setVModel('');
  };

  const handleTestWebhook = async () => {
    setWebhookTesting(true);
    await triggerWebhook('TEST_PING', {
      timestamp: new Date().toISOString(),
      initiatedBy: currentUser.email,
      environment: 'production-applet',
    });
    setWebhookTesting(false);
  };

  // 1. If not logged in, show AuthPortal
  if (!currentUser) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <AuthPortal defaultRole="OPERATIONS" />
      </div>
    );
  }

  // 2. If logged in as customer, show friendly role switch barrier
  if (currentUser.role === 'CUSTOMER') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full bg-white/[0.08] backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2 font-['Montserrat']">
            Staff Access Clearance Required
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
            You are currently signed in as a Customer Consignee (
            <span className="font-semibold text-white">{currentUser.name}</span>). The Logistics
            Control Console is restricted to internal freight dispatchers and company executives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => loginAs('OPERATIONS')}
              className="py-3 px-4 bg-gradient-to-r from-[#FF6B00] to-[#E05E00] hover:from-[#ff791a] hover:to-[#e66408] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#FF6B00]/25 flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Log in as Operations Desk</span>
            </button>
            <button
              onClick={() => loginAs('SUPER_ADMIN')}
              className="py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Log in as Super Admin</span>
            </button>
          </div>
          <button
            onClick={() => navigateTo('/portal')}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Return to Customer Consignee Portal &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="bg-[#061426] min-h-screen text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Control Bar with Frosted Sheen */}
        <div className="bg-white/[0.07] backdrop-blur-2xl rounded-3xl p-5 sm:p-7 border border-white/20 shadow-2xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border tracking-wide flex items-center gap-1.5 ${
                  currentUser.role === 'SUPER_ADMIN'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {currentUser.role === 'SUPER_ADMIN' ? (
                  <>
                    <Shield className="w-3 h-3 text-rose-400" />
                    Super Admin Console • Executive Root
                  </>
                ) : (
                  <>
                    <Truck className="w-3 h-3 text-amber-400" />
                    Operations Desk • Duty Dispatch Clearance
                  </>
                )}
              </span>

              <span className="text-xs text-slate-300 font-mono">
                Operator: <strong className="text-white">{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-2 font-['Montserrat'] tracking-tight">
              {currentUser.role === 'SUPER_ADMIN'
                ? 'EXECUTIVE LOGISTICS COMMAND CENTER'
                : 'FREIGHT OPERATIONS & CARGO DISPATCH DESK'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.role === 'SUPER_ADMIN'
                ? 'Full system authority: Rates, FX, n8n webhook automation, company profile & security audit trails.'
                : 'Duty officer terminal: Consignment tracking milestones, PAAR examination, quote pricing & waybills.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {currentUser.role === 'OPERATIONS' ? (
              <button
                onClick={() => loginAs('SUPER_ADMIN')}
                className="px-3.5 py-2 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold rounded-xl border border-rose-500/40 transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
                title="Authorize Executive Super Admin Privileges"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Elevate to Super Admin</span>
              </button>
            ) : (
              <button
                onClick={() => loginAs('OPERATIONS')}
                className="px-3.5 py-2 bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-bold rounded-xl border border-amber-500/40 transition flex items-center gap-1.5 shadow-md shadow-amber-600/20"
                title="Switch to Operations Desk view"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Switch to Ops View</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('/portal')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold rounded-xl border border-white/20 transition backdrop-blur-md"
            >
              Client Portal
            </button>

            <button
              onClick={() => loginAs('VISITOR')}
              className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold rounded-xl border border-rose-500/30 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <TrendingUp className="w-4 h-4" /> },
            {
              id: 'shipments',
              label: `Shipments (${shipments.length})`,
              icon: <Package className="w-4 h-4" />,
            },
            {
              id: 'quotes',
              label: `Quote Requests (${quotes.length})`,
              icon: <FileText className="w-4 h-4" />,
            },
            {
              id: 'autotrade',
              label: `AutoTrade Stock (${vehicles.length})`,
              icon: <Car className="w-4 h-4" />,
            },
            { id: 'leads', label: `CRM Leads (${leads.length})`, icon: <Users className="w-4 h-4" /> },
            {
              id: 'invoices',
              label: `Invoices (${invoices.length})`,
              icon: <CreditCard className="w-4 h-4" />,
            },
            {
              id: 'audit',
              label: `Audit Logs (${auditLogs.length})`,
              icon: <History className="w-4 h-4" />,
            },
            {
              id: 'settings',
              label: 'System & Webhooks',
              icon: <Settings className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition cursor-pointer ${
                adminTab === tab.id
                  ? 'bg-[#FF6B00] text-white shadow-lg'
                  : 'bg-[#09263F] hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {adminTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#09263F] p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Active Consignments
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">
                    {activeShipmentsCount}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    {deliveredCount} delivered to date
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#FF8500] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#09263F] p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Pending Quotes
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">
                    {pendingQuotesCount}
                  </div>
                  <div className="text-[11px] text-amber-400 font-semibold mt-1">
                    Needs operations pricing
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#09263F] p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Invoiced Billing
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono mt-1 truncate max-w-[150px]">
                    {formatCurrency(totalRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    Gross logistics volume
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#09263F] p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Showroom Vehicles
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono mt-1">
                    {vehicles.filter((v) => v.status === 'AVAILABLE').length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {vehicles.filter((v) => v.status === 'IN_TRANSIT').length} currently on RoRo
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Fast Operations Triggers
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setAdminTab('quotes')}
                    className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Review &amp; Price Open Quotes
                  </button>

                  <button
                    onClick={() => setShowAddVehicleModal(true)}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Car className="w-4 h-4" />
                    List New Vehicle in AutoTrade
                  </button>

                  <button
                    onClick={handleTestWebhook}
                    disabled={webhookTesting}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${webhookTesting ? 'animate-spin' : ''}`} />
                    Test n8n Dispatch Webhook
                  </button>
                </div>
              </div>

              {/* Recent Audit Activity */}
              <div className="lg:col-span-2 bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  Operational Audit Trail
                </h3>
                <div className="space-y-3">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-200">{log.action}</div>
                        <div className="text-[11px] text-slate-400">
                          {log.details} • By {log.user}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {log.timestamp.split('T')[1]?.substring(0, 5) || log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHIPMENTS MANAGEMENT */}
        {adminTab === 'shipments' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                  Consignment Registry
                </h2>
                <p className="text-xs text-slate-400">
                  Update live telemetry milestones, attach bills of lading, and flag exceptions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tracking, cargo..."
                    value={shipmentSearch}
                    onChange={(e) => setShipmentSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Tracking Number</th>
                    <th className="py-3 px-4">Shipper / Consignee</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4">Last Update</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredShipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {s.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        {s.consignee.name}
                        <div className="text-[10px] text-slate-500">{s.consignee.company}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {s.origin.city} &rarr; {s.destination.city}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            s.currentStatus === 'DELIVERED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : s.currentStatus === 'CUSTOMS_CLEARANCE'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-orange-500/20 text-[#FF8500]'
                          }`}
                        >
                          {s.currentStatus.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {s.events[0]?.timestamp || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedShipmentForUpdate(s);
                            setNewStatus(s.currentStatus);
                            setShowStatusUpdateModal(true);
                          }}
                          className="px-3 py-1 bg-[#FF6B00] hover:bg-[#E05E00] text-white rounded-lg text-[11px] font-bold transition"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: QUOTES MANAGEMENT */}
        {adminTab === 'quotes' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                  Quotation Pipeline
                </h2>
                <p className="text-xs text-slate-400">
                  Assess customer cargo specifications, compute rate margins, and issue quotes.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Quote Ref</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Cargo / Volume</th>
                    <th className="py-3 px-4">Quoted Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">{q.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        {q.contactName}
                        <div className="text-[10px] text-slate-500">{q.companyName || q.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {q.origin.city} &rarr; {q.destination.city}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="max-w-[180px] truncate">{q.cargoDetails.description}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {q.cargoDetails.weightKg} kg • {q.shippingMethod}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#FF8500]">
                        {q.quotedAmount ? formatCurrency(q.quotedAmount) : 'Pending Calculation'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            q.status === 'APPROVED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : q.status === 'CONVERTED'
                              ? 'bg-sky-500/20 text-sky-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedQuoteForPricing(q);
                            setPricingAmount(q.quotedAmount || 4200);
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-bold"
                        >
                          Price Quote
                        </button>
                        {q.status === 'APPROVED' && (
                          <button
                            onClick={() => convertQuoteToShipment(q.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold"
                          >
                            Convert to Shipment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AUTOTRADE MANAGEMENT */}
        {adminTab === 'autotrade' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                  Vehicle Inventory &amp; Dealership Stock
                </h2>
                <p className="text-xs text-slate-400">
                  Manage showroom inventory, overseas auction acquisitions, and price points.
                </p>
              </div>

              <button
                onClick={() => setShowAddVehicleModal(true)}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-4 space-y-3"
                >
                  <img
                    src={v.images[0]}
                    alt={v.model}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{v.year} {v.make} {v.model}</span>
                      <span className="font-mono text-[#FF8500] font-bold">{formatCurrency(v.price)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {v.mileageKm.toLocaleString()} KM • {v.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <select
                      value={v.status}
                      onChange={(e) => updateVehicleStatus(v.id, e.target.value as any)}
                      className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] text-white"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="IN_TRANSIT">IN_TRANSIT</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>

                    <span className="text-[10px] font-mono text-slate-500">ID: {v.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LEADS & CRM */}
        {adminTab === 'leads' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                Customer Leads &amp; Inquiries Pipeline
              </h2>
              <p className="text-xs text-slate-400">
                Manage website inquiries, vehicle sourcing requests, and corporate sales leads.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service Interest</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Notes</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4">
                        <strong className="text-white block">{l.name}</strong>
                        <span className="text-slate-400 text-[11px]">{l.email} • {l.phone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {l.serviceInterest}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] text-slate-400 font-mono">
                        {l.source}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">
                        {l.notes || 'No notes provided'}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={l.status}
                          onChange={(e) => updateLeadStatus(l.id, e.target.value as any)}
                          className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="QUALIFIED">QUALIFIED</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="LOST">LOST</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: INVOICES MANAGEMENT */}
        {adminTab === 'invoices' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                Billing &amp; Invoices
              </h2>
              <p className="text-xs text-slate-400">
                All issued freight manifests, customs clearance disbursement bills, and payment receipts.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Consignee</th>
                    <th className="py-3 px-4">Shipment Ref</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-white">{inv.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">
                        {inv.customerName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {inv.shipmentId || 'Freight Account'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#FF8500]">
                        {formatCurrency(inv.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{inv.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inv.status === 'PAID'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOG */}
        {adminTab === 'audit' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                Immutable System Audit Trail
              </h2>
              <p className="text-xs text-slate-400">
                Chronological log of state transformations, role switches, and customs updates.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-y border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Operator</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                      <td className="py-3 px-4 text-white font-bold">{log.user}</td>
                      <td className="py-3 px-4 text-[#FF8500] font-bold">{log.action}</td>
                      <td className="py-3 px-4 text-slate-300">{log.entityId}</td>
                      <td className="py-3 px-4 text-slate-400 font-sans">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: SYSTEM SETTINGS & WEBHOOK SIMULATOR */}
        {adminTab === 'settings' && (
          <div className="bg-[#09263F] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
                Integration &amp; Automation Hub
              </h2>
              <p className="text-xs text-slate-400">
                Manage operational webhook triggers, n8n automated dispatch, and corporate data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Webhook Dispatch */}
              <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#FF8500] uppercase">
                  <Send className="w-4 h-4" />
                  n8n Automation Webhook URL
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When quotes are requested, shipments update status, or leads are logged, the platform dispatches event payloads to your n8n workflow engine.
                </p>

                <div>
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      updateSettings({ n8nWebhookUrl: webhookUrlInput });
                      alert('Webhook URL updated successfully.');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Save URL
                  </button>

                  <button
                    onClick={handleTestWebhook}
                    disabled={webhookTesting}
                    className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${webhookTesting ? 'animate-spin' : ''}`} />
                    Test Ping Webhook
                  </button>
                </div>
              </div>

              {/* Corporate Info */}
              <div className="p-6 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                  <Building className="w-4 h-4 text-[#FF8500]" />
                  Corporate Registration Profile
                </div>
                <div className="space-y-1 text-slate-300">
                  <div><strong>Legal Entity:</strong> Haryor-Mih International Logistics Services Ltd.</div>
                  <div><strong>Operating Hubs:</strong> Lagos (Nigeria), London (UK), US Marine Ports</div>
                  <div><strong>Default Currency:</strong> {companySettings.defaultCurrency}</div>
                  <div><strong>Notification Email:</strong> {companySettings.notificationEmail}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATUS UPDATE MODAL */}
        {showStatusUpdateModal && selectedShipmentForUpdate && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#09263F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-white">
              <button
                onClick={() => setShowStatusUpdateModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-extrabold text-white mb-1">
                Update Consignment Milestone
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Shipment: {selectedShipmentForUpdate.id}
              </p>

              <form onSubmit={handleStatusUpdateSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">
                    New Lifecycle Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="BOOKING_CONFIRMED">Booking Confirmed</option>
                    <option value="CARGO_RECEIVED">Cargo Received at Depot</option>
                    <option value="PROCESSING">Processing &amp; Export Filing</option>
                    <option value="DEPARTED_ORIGIN">Departed Origin Port/Airport</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="ARRIVED_DESTINATION">Arrived Destination</option>
                    <option value="CUSTOMS_CLEARANCE">Customs Clearance (PAAR/Examination)</option>
                    <option value="OUT_FOR_DELIVERY">Out for Final Delivery</option>
                    <option value="DELIVERED">Delivered / Consignee Receipt Signed</option>
                    <option value="EXCEPTION">Exception / Customs Inspection Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">
                    Current Location <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apapa Container Terminal / Tin Can Island"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">
                    Milestone Audit Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific progress (e.g. Vessel berthed. Container discharged to stacking bay. Terminal handling fee processed.)"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="is-exception-check"
                    checked={isException}
                    onChange={(e) => setIsException(e.target.checked)}
                    className="rounded text-[#FF6B00]"
                  />
                  <label htmlFor="is-exception-check" className="font-bold text-amber-400">
                    Flag as Operational Exception / Alert
                  </label>
                </div>

                {isException && (
                  <div>
                    <label className="block font-bold text-amber-300 uppercase mb-1">
                      Exception Reason
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Awaiting customs Form M joint physical inspection"
                      value={exceptionReason}
                      onChange={(e) => setExceptionReason(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-amber-600/50 rounded-xl text-amber-200"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-xl uppercase tracking-wider transition shadow-lg mt-2 cursor-pointer"
                >
                  Publish Milestone Update
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PRICING MODAL */}
        {selectedQuoteForPricing && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#09263F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-white">
              <button
                onClick={() => setSelectedQuoteForPricing(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-extrabold text-white mb-1">
                Commercial Rate Calculation
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Quote Ref: {selectedQuoteForPricing.id}
              </p>

              <form onSubmit={handleIssueQuoteSubmit} className="space-y-4 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl space-y-1">
                  <div><strong>Route:</strong> {selectedQuoteForPricing.origin.city} &rarr; {selectedQuoteForPricing.destination.city}</div>
                  <div><strong>Method:</strong> {selectedQuoteForPricing.shippingMethod}</div>
                  <div><strong>Weight:</strong> {selectedQuoteForPricing.cargoDetails.weightKg} kg</div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">
                    Calculated Total Commercial Quote Amount ({selectedQuoteForPricing.cargoDetails.currency || 'USD'})
                  </label>
                  <input
                    type="number"
                    value={pricingAmount}
                    onChange={(e) => setPricingAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-base font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">
                    Breakdown &amp; Operational Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Includes origin collection, air freight to LOS, terminal handling, and customs duty clearance."
                    value={pricingNotes}
                    onChange={(e) => setPricingNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-xl uppercase tracking-wider transition shadow-lg mt-2 cursor-pointer"
                >
                  Issue Formal Quotation to Client
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADD VEHICLE MODAL */}
        {showAddVehicleModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#09263F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-white">
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-extrabold text-white mb-1">
                Add Vehicle to AutoTrade Showroom
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                List new stock with custom pricing and images.
              </p>

              <form onSubmit={handleAddVehicleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. Mercedes-Benz"
                      value={vMake}
                      onChange={(e) => setVMake(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. G63 AMG"
                      value={vModel}
                      onChange={(e) => setVModel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1">Year</label>
                    <input
                      type="number"
                      value={vYear}
                      onChange={(e) => setVYear(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1">Price (NGN)</label>
                    <input
                      type="number"
                      value={vPrice}
                      onChange={(e) => setVPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    value={vImage}
                    onChange={(e) => setVImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-xl uppercase tracking-wider transition shadow-lg mt-2 cursor-pointer"
                >
                  Publish Vehicle to Showroom
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
