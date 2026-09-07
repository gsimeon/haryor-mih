import React, { useState } from 'react';
import {
  Package,
  FileText,
  CreditCard,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  Download,
  ExternalLink,
  Search,
  Filter,
  Plus,
  X,
  Eye,
  MessageSquare,
  Shield,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthPortal } from '../auth/AuthPortal';
import { QuoteRequest, Shipment, Invoice, DocumentItem } from '../../types';

export const CustomerPortal: React.FC = () => {
  const {
    currentUser,
    shipments,
    quotes,
    invoices,
    documents,
    formatCurrency,
    approveQuote,
    rejectQuote,
    uploadDocument,
    payInvoice,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'shipments' | 'quotes' | 'invoices' | 'documents'
  >('overview');

  // Filter state for shipments
  const [shipmentFilter, setShipmentFilter] = useState('ALL');

  // Document upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('Commercial Invoice');
  const [docShipmentId, setDocShipmentId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Quote detail modal
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Invoice payment modal
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const activeShipments = shipments.filter((s) => s.currentStatus !== 'DELIVERED');
  const pendingQuotes = quotes.filter((q) => q.status === 'APPROVED' || q.status === 'UNDER_REVIEW' || q.status === 'REQUESTED');
  const unpaidInvoices = invoices.filter((inv) => inv.status === 'UNPAID' || inv.status === 'OVERDUE');

  const filteredShipments = shipments.filter((s) => {
    if (shipmentFilter === 'ALL') return true;
    if (shipmentFilter === 'ACTIVE') return s.currentStatus !== 'DELIVERED';
    if (shipmentFilter === 'DELIVERED') return s.currentStatus === 'DELIVERED';
    if (shipmentFilter === 'CUSTOMS') return s.currentStatus === 'CUSTOMS_CLEARANCE';
    return true;
  });

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) {
      alert('Please specify a document name.');
      return;
    }

    uploadDocument({
      name: docName,
      type: docType,
      shipmentId: docShipmentId || undefined,
      quoteId: undefined,
      fileSizeMb: selectedFile ? Number((selectedFile.size / (1024 * 1024)).toFixed(2)) : 1.2,
      fileType: selectedFile?.type || 'application/pdf',
      uploadedBy: currentUser.name,
      verified: false,
    });

    setShowUploadModal(false);
    setDocName('');
    setSelectedFile(null);
  };

  const handlePayInvoiceConfirm = (invoiceId: string) => {
    payInvoice(invoiceId, 'ONLINE_TRANSFER');
    setSelectedInvoice(null);
  };

  if (!currentUser) {
    return (
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <AuthPortal defaultRole="CUSTOMER" />
      </div>
    );
  }

  return (
    <div id="customer-portal-container" className="bg-[#0b1324] min-h-screen py-8 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* If user is staff browsing portal */}
        {currentUser.role !== 'CUSTOMER' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <Shield className="w-4 h-4" />
              <span>
                Staff Operator Mode: You are logged in as <strong>{currentUser.name}</strong> ({currentUser.role}).
              </span>
            </div>
            <button
              onClick={() => navigateTo('/admin')}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition"
            >
              Return to Staff Logistics Console &rarr;
            </button>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF8500] border border-[#FF6B00]/30">
                Consignee Operations Hub
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Account: {currentUser.role}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs text-slate-400">
              {currentUser.company || 'Consignee Account'} • {currentUser.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('/quote')}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              New Quote Request
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 backdrop-blur-md"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview Dashboard', icon: <Package className="w-4 h-4" /> },
            {
              id: 'shipments',
              label: `Active Shipments (${activeShipments.length})`,
              icon: <Package className="w-4 h-4" />,
            },
            {
              id: 'quotes',
              label: `My Quotations (${quotes.length})`,
              icon: <FileText className="w-4 h-4" />,
            },
            {
              id: 'invoices',
              label: `Billing & Invoices (${invoices.length})`,
              icon: <CreditCard className="w-4 h-4" />,
            },
            {
              id: 'documents',
              label: `Document Vault (${documents.length})`,
              icon: <FileCheck className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#09263F] text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Active Consignments
                  </div>
                  <div className="text-3xl font-extrabold text-[#061426] font-mono mt-1">
                    {activeShipments.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    In transit / clearing
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Pending Quotes
                  </div>
                  <div className="text-3xl font-extrabold text-[#061426] font-mono mt-1">
                    {pendingQuotes.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Under desk evaluation
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#09263F] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Outstanding Invoices
                  </div>
                  <div className="text-3xl font-extrabold text-[#061426] font-mono mt-1">
                    {unpaidInvoices.length}
                  </div>
                  <div className="text-[11px] text-rose-600 font-medium mt-1">
                    Awaiting settlement
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Verified Documents
                  </div>
                  <div className="text-3xl font-extrabold text-[#061426] font-mono mt-1">
                    {documents.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Form M, BL &amp; PAAR
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Active Shipments Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-extrabold text-[#061426] font-['Montserrat']">
                    Current Consignments
                  </h2>
                  <p className="text-xs text-slate-500">Live milestone updates on your active cargo.</p>
                </div>
                <button
                  onClick={() => setActiveTab('shipments')}
                  className="text-xs font-bold text-[#FF6B00] hover:text-[#E05E00] flex items-center gap-1"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-wider border-y border-white/10">
                    <tr>
                      <th className="py-3 px-4">Tracking #</th>
                      <th className="py-3 px-4">Route</th>
                      <th className="py-3 px-4">Cargo</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">ETA</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {shipments.slice(0, 4).map((s) => (
                      <tr key={s.id} className="hover:bg-white/5 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                          {s.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-white">{s.origin.city}</span> &rarr;{' '}
                          <span className="font-semibold text-white">{s.destination.city}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">
                          {s.cargoDescription}
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
                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {s.estimatedDeliveryDate || 'TBD'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => navigateTo(`/track?query=${s.id}`)}
                            className="px-3 py-1 bg-white/10 hover:bg-[#FF6B00] hover:text-white rounded-lg text-[11px] font-bold transition border border-white/15"
                          >
                            Track
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Quotes Alert */}
            {quotes.filter((q) => q.status === 'APPROVED').length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h3 className="font-bold text-amber-900 text-sm">
                      Commercial Quotes Ready for Your Approval!
                    </h3>
                    <p className="text-xs text-amber-800">
                      Our commercial operations desk has finalized rates for your requested routes. Review and approve them to initiate cargo dispatch.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl whitespace-nowrap transition"
                >
                  Review Quotes
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY SHIPMENTS */}
        {activeTab === 'shipments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#061426] font-['Montserrat']">
                    Consignment Directory
                  </h2>
                  <p className="text-xs text-slate-500">Track all ongoing and historic shipments.</p>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 text-xs">
                  {['ALL', 'ACTIVE', 'CUSTOMS', 'DELIVERED'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setShipmentFilter(filter)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                        shipmentFilter === filter
                          ? 'bg-[#09263F] text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredShipments.map((s) => (
                  <div
                    key={s.id}
                    className="p-6 rounded-2xl border border-slate-200 hover:border-[#FF6B00]/40 transition bg-white shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-extrabold text-sm text-[#09263F]">
                          {s.id}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            s.currentStatus === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {s.currentStatus.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm">{s.cargoDescription}</h3>
                      <div className="text-xs text-slate-500 mt-1">
                        Route: <strong className="text-slate-800">{s.origin.city}</strong> &rarr;{' '}
                        <strong className="text-slate-800">{s.destination.city}</strong>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-xs font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Service</span>
                          <span className="font-semibold text-slate-800 uppercase">{s.serviceType.replace(/_/g, ' ')}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Weight</span>
                          <span className="font-semibold text-slate-800">{s.weightKg} kg ({s.quantity} pkgs)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <div className="text-[11px] text-slate-500">
                        ETA: <strong className="text-slate-900">{s.estimatedDeliveryDate || 'Awaiting Port Call'}</strong>
                      </div>
                      <button
                        onClick={() => navigateTo(`/track?query=${s.id}`)}
                        className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
                      >
                        Live Tracking &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MY QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#061426] font-['Montserrat']">
                    Quotation Requests &amp; Approvals
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review and authorize shipping quotes prepared by our operations team.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('/quote')}
                  className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-xl transition"
                >
                  Request New Quote
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Quote Ref</th>
                      <th className="py-3 px-4">Route</th>
                      <th className="py-3 px-4">Cargo</th>
                      <th className="py-3 px-4">Quoted Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#09263F]">
                          {q.id}
                        </td>
                        <td className="py-3.5 px-4">
                          {q.origin.city} &rarr; {q.destination.city}
                        </td>
                        <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-600">
                          {q.cargoDetails.description}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {q.quotedAmount ? formatCurrency(q.quotedAmount) : 'Calculating...'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              q.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.status === 'CONVERTED'
                                ? 'bg-sky-100 text-sky-800'
                                : q.status === 'REJECTED'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {q.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedQuote(q)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                            title="View Quote Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {q.status === 'UNDER_REVIEW' && q.quotedAmount && (
                            <>
                              <button
                                onClick={() => approveQuote(q.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectQuote(q.id)}
                                className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[11px] font-bold"
                              >
                                Decline
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INVOICES & BILLING */}
        {activeTab === 'invoices' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#061426] font-['Montserrat']">
                    Commercial Invoices &amp; Statements
                  </h2>
                  <p className="text-xs text-slate-500">
                    Itemized freight charges, terminal disbursements, and proof of payment.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Shipment Ref</th>
                      <th className="py-3 px-4">Issue Date</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#09263F]">
                          {inv.id}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {inv.shipmentId || 'Freight Retainer'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.issueDate}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.dueDate}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {formatCurrency(inv.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              inv.status === 'PAID'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold transition"
                          >
                            View Breakdown
                          </button>
                          {inv.status !== 'PAID' && (
                            <button
                              onClick={() => handlePayInvoiceConfirm(inv.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition"
                            >
                              Settle Invoice
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DOCUMENT VAULT */}
        {activeTab === 'documents' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-[#061426] font-['Montserrat']">
                    Compliance &amp; Cargo Document Vault
                  </h2>
                  <p className="text-xs text-slate-500">
                    Secure cloud storage for Bills of Lading, PAAR certificates, and packing lists.
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  Upload Compliance Document
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#09263F]">
                          {doc.type}
                        </span>
                        {doc.verified ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-600">Pending Review</span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs truncate">{doc.name}</h4>
                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        {doc.shipmentId ? `Shipment: ${doc.shipmentId}` : 'General Commercial Account'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {doc.fileSizeMb} MB • {doc.uploadedAt}
                      </span>
                      <button
                        onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                        className="p-1.5 bg-white border border-slate-300 hover:border-[#FF6B00] rounded-lg text-slate-700"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD DOCUMENT MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-extrabold text-[#061426] mb-1">
                Upload Compliance Document
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Attach packing lists, commercial invoices, or regulatory approvals.
              </p>

              <form onSubmit={handleDocumentSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Document Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Commercial Invoice &amp; Packing List - AP129"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Document Classification
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="Commercial Invoice">Commercial Invoice</option>
                    <option value="Packing List">Packing List</option>
                    <option value="Bill of Lading">Bill of Lading / Air Waybill</option>
                    <option value="Form M / PAAR">Form M / PAAR</option>
                    <option value="SONCAP / NAFDAC Certificate">SONCAP / NAFDAC Certificate</option>
                    <option value="Vehicle Title Certificate">Vehicle Title Certificate</option>
                    <option value="Other">Other Document</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Link to Active Consignment (Optional)
                  </label>
                  <select
                    value={docShipmentId}
                    onChange={(e) => setDocShipmentId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  >
                    <option value="">General Account Document</option>
                    {shipments.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id} ({s.cargoDescription})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Select File (PDF, JPG, PNG, DOCX)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#FF6B00] hover:file:bg-orange-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold rounded-xl uppercase tracking-wider transition shadow-md mt-4"
                >
                  Upload into Vault
                </button>
              </form>
            </div>
          </div>
        )}

        {/* QUOTE DETAILS MODAL */}
        {selectedQuote && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left">
              <button
                onClick={() => setSelectedQuote(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-1">
                Quotation Dossier
              </div>
              <h2 className="text-2xl font-extrabold font-mono text-[#061426]">
                {selectedQuote.id}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                Status: <span className="font-bold text-slate-800 uppercase">{selectedQuote.status}</span>
              </div>

              <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Freight Route</span>
                  <strong className="text-slate-900">{selectedQuote.origin.city}, {selectedQuote.origin.country}</strong> &rarr;{' '}
                  <strong className="text-slate-900">{selectedQuote.destination.city}, {selectedQuote.destination.country}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Cargo Specifications</span>
                  <p className="text-slate-700 font-medium">{selectedQuote.cargoDetails.description}</p>
                  <div className="font-mono text-slate-600 text-[11px] mt-1">
                    Qty: {selectedQuote.cargoDetails.quantity} | Weight: {selectedQuote.cargoDetails.weightKg} kg | Declared: ${selectedQuote.cargoDetails.declaredValue.toLocaleString()}
                  </div>
                </div>

                {selectedQuote.quotedAmount && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Calculated Commercial Price</span>
                    <div className="text-2xl font-extrabold font-mono text-[#061426]">
                      {formatCurrency(selectedQuote.quotedAmount)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                {selectedQuote.status === 'UNDER_REVIEW' && selectedQuote.quotedAmount && (
                  <button
                    onClick={() => {
                      approveQuote(selectedQuote.id);
                      setSelectedQuote(null);
                    }}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
                  >
                    Authorize &amp; Dispatch Cargo
                  </button>
                )}
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INVOICE BREAKDOWN MODAL */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-1">
                Commercial Invoice
              </div>
              <h2 className="text-2xl font-extrabold font-mono text-[#061426]">
                {selectedInvoice.id}
              </h2>
              <div className="text-xs text-slate-500 mt-1">
                Issued: {selectedInvoice.issueDate} | Due: {selectedInvoice.dueDate}
              </div>

              <div className="my-6 space-y-2 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2">
                    Itemized Line Items
                  </div>
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{item.description}</span>
                      <strong className="font-mono text-slate-900">{formatCurrency(item.amount)}</strong>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 border-t border-slate-200 text-sm font-bold text-[#061426]">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono text-[#FF6B00]">{formatCurrency(selectedInvoice.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {selectedInvoice.status !== 'PAID' && (
                  <button
                    onClick={() => handlePayInvoiceConfirm(selectedInvoice.id)}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
                  >
                    Confirm Payment Transfer
                  </button>
                )}
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
