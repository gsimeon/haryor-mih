import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Shipment,
  QuoteRequest,
  Vehicle,
  VehicleRequest,
  Lead,
  DocumentItem,
  Invoice,
  AuditLog,
  CompanySettings,
  WebhookEvent,
  User,
  Currency,
  SupportedLanguage,
  ShipmentStatus,
  QuoteStatus,
  TrackingEvent,
} from '../types';
import { getTranslation } from '../i18n/translations';
import {
  initialCompanySettings,
  initialUsers,
  initialShipments,
  initialQuotes,
  initialVehicles,
  initialLeads,
  initialDocuments,
  initialInvoices,
  initialAuditLogs,
  initialWebhooks,
} from '../data/initialData';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  routeParams: Record<string, string>;
  navigateTo: (route: string, params?: Record<string, string>) => void;

  // Active user / auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAs: (role: 'CUSTOMER' | 'OPERATIONS' | 'SUPER_ADMIN' | 'VISITOR') => void;
  loginWithCredentials: (
    email: string,
    password?: string,
    expectedRole?: 'CUSTOMER' | 'OPERATIONS' | 'SUPER_ADMIN'
  ) => { success: boolean; error?: string };
  logout: () => void;

  // Data Collections
  shipments: Shipment[];
  quotes: QuoteRequest[];
  vehicles: Vehicle[];
  vehicleRequests: VehicleRequest[];
  leads: Lead[];
  documents: DocumentItem[];
  invoices: Invoice[];
  auditLogs: AuditLog[];
  webhooks: WebhookEvent[];
  settings: CompanySettings;
  companySettings: CompanySettings;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;

  // Currency & Internationalization
  activeCurrency: Currency;
  setActiveCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number, forceCurrency?: Currency) => string;
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;

  // Business Actions
  submitQuoteRequest: (quoteData: Partial<QuoteRequest>) => string;
  updateQuoteStatus: (quoteId: string, status: QuoteStatus, adminNotes?: string) => void;
  updateQuotePricing: (
    quoteId: string,
    items: any[],
    subtotal: number,
    discount: number,
    total: number,
    currency: Currency,
    validUntil: string
  ) => void;
  issueQuote: (quoteId: string, amount: number, currency: Currency, notes?: string) => void;
  convertQuoteToShipment: (quoteId: string) => string;
  createShipment: (shipmentData: Partial<Shipment>) => string;
  acceptQuoteAsCustomer: (quoteId: string) => void;
  rejectQuoteAsCustomer: (quoteId: string) => void;
  approveQuote: (quoteId: string) => void;
  rejectQuote: (quoteId: string) => void;

  addTrackingEvent: (shipmentId: string, event: Omit<TrackingEvent, 'id'>) => void;
  updateShipmentStatus: (
    shipmentId: string,
    status: ShipmentStatus,
    locationOrNote?: string,
    description?: string,
    isException?: boolean,
    exceptionReason?: string
  ) => void;

  submitVehicleRequest: (data: Partial<VehicleRequest>) => string;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => void;
  updateVehicleStatus: (vehicleId: string, status: Vehicle['status']) => void;

  createLead: (leadData: Partial<Lead>) => void;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;

  uploadDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => void;
  verifyDocument: (docId: string, status: DocumentItem['status']) => void;

  createInvoice: (invoiceData: Partial<Invoice>) => string;
  payInvoice: (invoiceId: string, method: Invoice['paymentMethod']) => void;
  triggerWebhook: (event: string, payload: Record<string, any>) => Promise<void>;

  // Feedback Notifications
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, number> = {
  NGN: 1,
  USD: 1 / 1550,
  GBP: 1 / 2000,
  EUR: 1 / 1700,
};

// Helper to extract the relative base path for GitHub Pages or root domains
const getAppBasePath = (): string => {
  let base = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/';
  if (!base.startsWith('/')) base = '/' + base;
  if (!base.endsWith('/')) base = base + '/';
  return base;
};

// Extracts internal route (e.g. '/track', '/quote') relative to repository path
const extractRouteFromUrl = (): string => {
  try {
    const base = getAppBasePath();
    const pathname = window.location.pathname;

    // Check if redirect query exists: ?/track or ?/quote
    if (window.location.search && window.location.search.startsWith('?/')) {
      const queryRoute = window.location.search.slice(1).split('&')[0];
      if (queryRoute) return queryRoute.startsWith('/') ? queryRoute : `/${queryRoute}`;
    }

    if (base !== '/' && pathname.startsWith(base)) {
      const sub = pathname.slice(base.length - 1);
      return sub || '/';
    } else if (base !== '/' && pathname === base.slice(0, -1)) {
      return '/';
    }

    return pathname || '/';
  } catch {
    return '/';
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state initialized relative to repository path
  const [currentRoute, setCurrentRoute] = useState<string>(() => extractRouteFromUrl());
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Synchronize browser history and popstate events relative to repo path
  useEffect(() => {
    const handlePopState = () => {
      const route = extractRouteFromUrl();
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hm_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hm_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hm_auth_user');
    }
  }, [currentUser]);

  // Currency
  const [activeCurrency, setActiveCurrency] = useState<Currency>('NGN');

  // Internationalization / Multi-lingual support
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('hm_language');
      if (saved && ['en', 'fr', 'zh', 'es', 'ar', 'de'].includes(saved)) {
        return saved as SupportedLanguage;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('hm_language', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(key, currentLanguage, fallback);
  };

  // Core Data
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('hm_shipments');
    return saved ? JSON.parse(saved) : initialShipments;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('hm_quotes');
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('hm_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [vehicleRequests, setVehicleRequests] = useState<VehicleRequest[]>(() => {
    const saved = localStorage.getItem('hm_vehicle_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('hm_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('hm_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('hm_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('hm_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [webhooks, setWebhooks] = useState<WebhookEvent[]>(() => {
    const saved = localStorage.getItem('hm_webhooks');
    return saved ? JSON.parse(saved) : initialWebhooks;
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('hm_settings');
    return saved ? JSON.parse(saved) : initialCompanySettings;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('hm_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('hm_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('hm_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('hm_vehicle_requests', JSON.stringify(vehicleRequests));
  }, [vehicleRequests]);

  useEffect(() => {
    localStorage.setItem('hm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('hm_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('hm_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('hm_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('hm_webhooks', JSON.stringify(webhooks));
  }, [webhooks]);

  useEffect(() => {
    localStorage.setItem('hm_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast Helpers
  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation relative to the repository path
  const navigateTo = (route: string, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);

    try {
      const base = getAppBasePath();
      const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
      const fullPath = base === '/' ? `/${cleanRoute}` : `${base}${cleanRoute}`;

      const searchParams = new URLSearchParams(params).toString();
      const urlToPush = searchParams ? `${fullPath}?${searchParams}` : fullPath;

      if (window.location.pathname + window.location.search !== urlToPush) {
        window.history.pushState(params, '', urlToPush);
      }
    } catch {
      // In restricted iframe environments, pushState failure is safely caught
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency Formatter
  const formatCurrency = (amount: number, currency?: Currency): string => {
    const curr = currency || activeCurrency;
    const symbolMap: Record<Currency, string> = {
      NGN: '₦',
      USD: '$',
      GBP: '£',
      EUR: '€',
    };
    const symbol = symbolMap[curr] || '₦';
    return `${symbol}${Number(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  // Log audit action
  const logAudit = (
    action: string,
    entityType: AuditLog['entityType'],
    entityId: string,
    details: string
  ) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      entityType,
      entityId,
      performedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System / Guest Visitor',
      role: currentUser ? currentUser.role : 'GUEST',
      details,
      timestamp: new Date().toLocaleString('en-GB', { timeZoneName: 'short' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Auth switch & credential helpers
  const logout = () => {
    const prevName = currentUser?.name || 'User';
    logAudit('User Logout', 'SYSTEM', currentUser?.id || 'AUTH', `${prevName} logged out of portal.`);
    setCurrentUser(null);
    localStorage.removeItem('hm_auth_user');
    addToast({
      type: 'info',
      title: 'Session Terminated',
      message: 'You have been securely signed out of the terminal.',
    });
    navigateTo('/');
  };

  const loginWithCredentials = (
    email: string,
    password?: string,
    expectedRole?: 'CUSTOMER' | 'OPERATIONS' | 'SUPER_ADMIN'
  ): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();

    // Check pre-configured staff & customer users
    let user = initialUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      if (trimmedEmail.includes('ops') || trimmedEmail.includes('chioma') || expectedRole === 'OPERATIONS') {
        user = initialUsers[1];
      } else if (trimmedEmail.includes('admin') || trimmedEmail.includes('adebayo') || expectedRole === 'SUPER_ADMIN') {
        user = initialUsers[0];
      } else if (trimmedEmail.includes('customer') || trimmedEmail.includes('david') || expectedRole === 'CUSTOMER') {
        user = initialUsers[2];
      }
    }

    if (!user) {
      if (trimmedEmail.includes('@')) {
        const roleToAssign = expectedRole || 'CUSTOMER';
        user = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          email: trimmedEmail,
          role: roleToAssign,
          companyName: roleToAssign === 'CUSTOMER' ? 'Consignee Client Account' : 'Haryor-Mih International Logistics Services Ltd.',
          createdAt: new Date().toISOString(),
        };
      } else {
        return { success: false, error: 'Please enter a valid email address.' };
      }
    }

    // Role adjustment if expected
    if (expectedRole && user.role !== expectedRole) {
      user = { ...user, role: expectedRole };
    }

    setCurrentUser(user);
    localStorage.setItem('hm_auth_user', JSON.stringify(user));

    logAudit(
      'Staff / Client Login',
      'AUTH',
      user.id,
      `${user.name} logged into ${user.role} console via credentials.`
    );

    addToast({
      type: 'success',
      title: 'Authentication Successful',
      message: `Welcome, ${user.name}! Terminal session active for ${user.role.replace('_', ' ')}.`,
    });

    if (user.role === 'CUSTOMER') {
      navigateTo('/portal');
    } else {
      navigateTo('/admin');
    }

    return { success: true };
  };

  const loginAs = (role: 'CUSTOMER' | 'OPERATIONS' | 'SUPER_ADMIN' | 'VISITOR') => {
    if (role === 'VISITOR') {
      logout();
      return;
    }
    if (role === 'CUSTOMER') {
      const u = initialUsers[2]; // David Adeleke
      setCurrentUser(u);
      localStorage.setItem('hm_auth_user', JSON.stringify(u));
      logAudit('Demo Login', 'AUTH', u.id, 'David Adeleke authenticated into Customer Portal.');
      addToast({
        type: 'success',
        title: 'Customer Portal Active',
        message: 'Welcome back, David Adeleke (Apex Industrial Holdings).',
      });
      navigateTo('/portal');
    } else if (role === 'OPERATIONS') {
      const u = initialUsers[1]; // Chioma Nwosu
      setCurrentUser(u);
      localStorage.setItem('hm_auth_user', JSON.stringify(u));
      logAudit('Staff Login', 'AUTH', u.id, 'Chioma Nwosu authenticated into Operations Desk.');
      addToast({
        type: 'success',
        title: 'Operations Desk Active',
        message: 'Logged in as Operations Desk (Chioma Nwosu).',
      });
      navigateTo('/admin');
    } else if (role === 'SUPER_ADMIN') {
      const u = initialUsers[0]; // Adebayo Ogunlesi
      setCurrentUser(u);
      localStorage.setItem('hm_auth_user', JSON.stringify(u));
      logAudit('Admin Login', 'AUTH', u.id, 'Adebayo Ogunlesi authenticated into Super Admin Command.');
      addToast({
        type: 'success',
        title: 'Super Admin Command Active',
        message: 'Logged in as Managing Director (Adebayo Ogunlesi).',
      });
      navigateTo('/admin');
    }
  };

  // Dispatch simulated webhook (for n8n integration readiness)
  const dispatchWebhook = (event: WebhookEvent['event'], payload: Record<string, any>) => {
    const wh: WebhookEvent = {
      id: `wh-${Date.now()}`,
      event,
      payload,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      responseCode: 200,
    };
    setWebhooks((prev) => [wh, ...prev]);
  };

  // Submit Quote Request
  const submitQuoteRequest = (quoteData: Partial<QuoteRequest>): string => {
    const year = new Date().getFullYear();
    const count = quotes.length + 126;
    const quoteId = `HM-Q-${year}-${count.toString().padStart(6, '0')}`;

    const newQuote: QuoteRequest = {
      id: quoteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerType: quoteData.customerType || 'individual',
      companyName: quoteData.companyName,
      companyRegNumber: quoteData.companyRegNumber,
      contactName: quoteData.contactName || 'Valued Customer',
      email: quoteData.email || 'customer@example.com',
      phone: quoteData.phone || '',
      whatsapp: quoteData.whatsapp,
      country: quoteData.country || 'Nigeria',
      cargoCategory: quoteData.cargoCategory || 'commercial_goods',
      shippingMethod: quoteData.shippingMethod || 'air_freight',
      origin: quoteData.origin || { country: 'United Kingdom', city: 'London' },
      destination: quoteData.destination || { country: 'Nigeria', city: 'Lagos' },
      cargoDetails: quoteData.cargoDetails || {
        description: 'General Cargo',
        quantity: 1,
        weightKg: 100,
        declaredValue: 1000,
        currency: 'USD',
      },
      documents: quoteData.documents || [],
      status: 'REQUESTED',
    };

    setQuotes((prev) => [newQuote, ...prev]);

    // Also create or attach to Leads CRM automatically
    const leadId = `lead-${Date.now().toString().slice(-4)}`;
    const newLead: Lead = {
      id: leadId,
      name: newQuote.contactName,
      company: newQuote.companyName,
      email: newQuote.email,
      phone: newQuote.phone,
      serviceRequested: `${newQuote.shippingMethod.replace(/_/g, ' ').toUpperCase()} (${newQuote.origin.city} -> ${newQuote.destination.city})`,
      origin: `${newQuote.origin.city}, ${newQuote.origin.country}`,
      destination: `${newQuote.destination.city}, ${newQuote.destination.country}`,
      source: 'Website',
      status: 'NEW',
      estimatedValue: newQuote.cargoDetails.declaredValue * 1550,
      currency: 'NGN',
      notes: `Automated lead generated from Quotation Request ${quoteId}. Cargo: ${newQuote.cargoDetails.description}`,
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);

    logAudit('Quote Requested', 'QUOTE', quoteId, `Customer submitted quotation request for ${newQuote.origin.city} to ${newQuote.destination.city}.`);
    dispatchWebhook('quote.created', {
      quoteId,
      customer: newQuote.contactName,
      email: newQuote.email,
      route: `${newQuote.origin.city} -> ${newQuote.destination.city}`,
    });

    addToast({
      type: 'success',
      title: 'Quotation Request Submitted',
      message: `Your reference is ${quoteId}. Our logistics operations desk is reviewing your requirements.`,
    });

    return quoteId;
  };

  // Update Quote Status
  const updateQuoteStatus = (quoteId: string, status: QuoteStatus, adminNotes?: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status,
              adminNotes: adminNotes !== undefined ? adminNotes : q.adminNotes,
              updatedAt: new Date().toISOString(),
            }
          : q
      )
    );
    logAudit('Quote Status Updated', 'QUOTE', quoteId, `Status transitioned to ${status}. Notes: ${adminNotes || 'None'}`);
    addToast({
      type: 'info',
      title: 'Quote Status Updated',
      message: `Quote ${quoteId} has been moved to ${status}.`,
    });
  };

  // Update Quote Pricing Line Items
  const updateQuotePricing = (
    quoteId: string,
    items: any[],
    subtotal: number,
    discount: number,
    total: number,
    currency: Currency,
    validUntil: string
  ) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status: 'QUOTE_READY',
              quoteItems: items,
              subtotal,
              discount,
              totalAmount: total,
              quoteCurrency: currency,
              validUntil,
              updatedAt: new Date().toISOString(),
            }
          : q
      )
    );
    logAudit('Quote Pricing Built', 'QUOTE', quoteId, `Calculated official pricing total of ${currency} ${total.toLocaleString()}. Valid until ${validUntil}.`);
    dispatchWebhook('quote.created', { quoteId, total, currency, validUntil });
    addToast({
      type: 'success',
      title: 'Official Quote Dispatched',
      message: `Itemized pricing sent for ${quoteId}. Customer can now review and accept in portal.`,
    });
  };

  // Customer accepts quote
  const acceptQuoteAsCustomer = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'ACCEPTED', updatedAt: new Date().toISOString() } : q))
    );
    logAudit('Quote Accepted by Customer', 'QUOTE', quoteId, 'Customer approved the pricing and terms of carriage.');
    dispatchWebhook('quote.accepted', { quoteId });
    addToast({
      type: 'success',
      title: 'Quote Approved & Confirmed',
      message: `Thank you! Quote ${quoteId} is marked as Accepted. Our operations team is allocating carrier booking.`,
    });
  };

  // Customer rejects quote
  const rejectQuoteAsCustomer = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'REJECTED', updatedAt: new Date().toISOString() } : q))
    );
    logAudit('Quote Rejected', 'QUOTE', quoteId, 'Customer marked quote as rejected or requested revisions.');
    addToast({
      type: 'warning',
      title: 'Quote Declined',
      message: `Quote ${quoteId} was declined. A representative will follow up for feedback.`,
    });
  };

  // Convert Quote to Shipment (Core Business Requirement!)
  const convertQuoteToShipment = (quoteId: string): string => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    const year = new Date().getFullYear();
    const count = shipments.length + 127;
    const trackingNumber = `HM-${year}-${count.toString().padStart(6, '0')}`;

    const newShipment: Shipment = {
      id: trackingNumber,
      quoteId: quote.id,
      customerId: currentUser?.id || 'usr-cust-1',
      customerName: quote.contactName,
      customerEmail: quote.email,
      customerPhone: quote.phone,
      serviceType: quote.shippingMethod,
      origin: quote.origin,
      destination: quote.destination,
      cargoDescription: quote.cargoDetails.description,
      cargoCategory: quote.cargoCategory,
      weightKg: quote.cargoDetails.weightKg,
      quantity: quote.cargoDetails.quantity,
      currentStatus: 'BOOKING_CONFIRMED',
      carrierName: 'Haryor-Mih International Freight Fleet',
      estimatedDeliveryDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
      assignedStaffName: currentUser?.name || 'Chioma Nwosu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: (quote.documents || []).map((d, i) => ({
        id: `doc-gen-${Date.now()}-${i}`,
        name: d.name,
        type: 'COMMERCIAL_INVOICE',
        uploadedAt: new Date().toISOString(),
        isVerified: true,
      })),
      events: [
        {
          id: `ev-${Date.now()}`,
          status: 'BOOKING_CONFIRMED',
          title: 'Booking Confirmed & Allocation Reserved',
          location: `${quote.origin.city}, ${quote.origin.country}`,
          description: `Shipment created from Quote ${quote.id}. Space assigned with cargo handling network.`,
          timestamp: new Date().toLocaleString('en-GB', { timeZoneName: 'short' }),
        },
      ],
    };

    // Update quote status to ACCEPTED and link shipment
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              status: 'ACCEPTED',
              convertedToShipmentId: trackingNumber,
              updatedAt: new Date().toISOString(),
            }
          : q
      )
    );

    setShipments((prev) => [newShipment, ...prev]);

    // Also auto-generate an initial invoice
    const invId = `HM-INV-${year}-${(invoices.length + 91).toString().padStart(4, '0')}`;
    const newInvoice: Invoice = {
      id: invId,
      shipmentId: trackingNumber,
      quoteId: quote.id,
      customerName: quote.contactName,
      customerEmail: quote.email,
      amount: quote.totalAmount || 4500000,
      currency: quote.quoteCurrency || 'NGN',
      status: 'UNPAID',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      items: quote.quoteItems
        ? quote.quoteItems.map((qi) => ({ description: qi.description, amount: qi.total }))
        : [{ description: `Logistics & Freight Services (${trackingNumber})`, amount: quote.totalAmount || 4500000 }],
    };
    setInvoices((prev) => [newInvoice, ...prev]);

    logAudit(
      'Quote Converted to Shipment',
      'SHIPMENT',
      trackingNumber,
      `Successfully converted Quote ${quoteId} to active tracking consignment ${trackingNumber}. Initial invoice ${invId} created.`
    );
    dispatchWebhook('shipment.created', { trackingNumber, quoteId, customer: quote.contactName });

    addToast({
      type: 'success',
      title: 'Shipment Successfully Booked!',
      message: `Tracking reference generated: ${trackingNumber}. Live event timeline is active.`,
    });

    return trackingNumber;
  };

  // Add tracking event
  const addTrackingEvent = (shipmentId: string, eventData: Omit<TrackingEvent, 'id'>) => {
    const newEvent: TrackingEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
    };

    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            currentStatus: eventData.status,
            updatedAt: new Date().toISOString(),
            events: [newEvent, ...s.events],
          };
        }
        return s;
      })
    );

    logAudit(
      'Tracking Milestone Added',
      'SHIPMENT',
      shipmentId,
      `Event: ${eventData.title} at ${eventData.location}. Status is now ${eventData.status}.`
    );
    dispatchWebhook('shipment.status_updated', {
      trackingNumber: shipmentId,
      status: eventData.status,
      location: eventData.location,
    });

    addToast({
      type: 'info',
      title: 'Tracking Timeline Updated',
      message: `${shipmentId}: ${eventData.title}`,
    });
  };

  // Update Shipment Status
  const updateShipmentStatus = (
    shipmentId: string,
    status: ShipmentStatus,
    locationOrNote?: string,
    description?: string,
    isException?: boolean,
    exceptionReason?: string
  ) => {
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    const eventTitle = status
      .split('_')
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(' ');

    const loc = description
      ? locationOrNote
      : status === 'DELIVERED'
      ? shipment.destination.city
      : shipment.origin.city;
    const desc = description || locationOrNote || 'Operational progress updated by logistics desk.';

    addTrackingEvent(shipmentId, {
      status,
      title: eventTitle,
      location: loc || 'Transit Hub',
      description: desc,
      timestamp: new Date().toLocaleString('en-GB', { timeZoneName: 'short' }),
      isException: isException || status === 'EXCEPTION',
      exceptionReason: exceptionReason || (status === 'EXCEPTION' ? desc : undefined),
    });
  };

  const issueQuote = (quoteId: string, amount: number, currency: Currency, notes?: string) => {
    updateQuotePricing(
      quoteId,
      [
        {
          id: `item-${Date.now()}`,
          description: notes || 'Complete Freight & Terminal Handling Package',
          category: 'Freight',
          quantity: 1,
          unitPrice: amount,
          total: amount,
        },
      ],
      amount,
      0,
      amount,
      currency,
      new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    );
    addToast({
      type: 'success',
      title: 'Quotation Formally Issued',
      message: `Quote ${quoteId} priced at ${currency} ${amount.toLocaleString()}. Sent to client.`,
    });
  };

  const createShipment = (shipmentData: Partial<Shipment>): string => {
    const year = new Date().getFullYear();
    const trackingNumber = `HM-${year}-${(shipments.length + 128).toString().padStart(6, '0')}`;
    const newShipment: Shipment = {
      id: trackingNumber,
      quoteId: shipmentData.quoteId,
      customerId: shipmentData.customerId || currentUser?.id || 'usr-cust-1',
      customerName: shipmentData.customerName || 'Consignee Client',
      customerEmail: shipmentData.customerEmail || 'client@example.com',
      customerPhone: shipmentData.customerPhone || '+234 800 000 0000',
      serviceType: shipmentData.serviceType || 'sea_freight_fcl',
      origin: shipmentData.origin || { country: 'United Kingdom', city: 'London' },
      destination: shipmentData.destination || { country: 'Nigeria', city: 'Lagos' },
      cargoDescription: shipmentData.cargoDescription || 'Commercial Freight',
      cargoCategory: shipmentData.cargoCategory || 'commercial_goods',
      weightKg: shipmentData.weightKg || 500,
      quantity: shipmentData.quantity || 1,
      currentStatus: shipmentData.currentStatus || 'BOOKING_CONFIRMED',
      carrierName: shipmentData.carrierName || 'Haryor-Mih Fleet Logistics',
      estimatedDeliveryDate:
        shipmentData.estimatedDeliveryDate ||
        new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0],
      assignedStaffName: currentUser?.name || 'Chioma Nwosu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: shipmentData.documents || [],
      events: shipmentData.events || [
        {
          id: `ev-${Date.now()}`,
          status: 'BOOKING_CONFIRMED',
          title: 'Consignment Logged by Desk',
          location: 'Lagos HQ Operations Desk',
          description: 'Shipment created and scheduled for freight dispatch.',
          timestamp: new Date().toLocaleString('en-GB', { timeZoneName: 'short' }),
        },
      ],
    };
    setShipments((prev) => [newShipment, ...prev]);
    logAudit(
      'Consignment Created',
      'SHIPMENT',
      trackingNumber,
      `New shipment manually logged by ${currentUser?.name || 'Staff'}.`
    );
    addToast({
      type: 'success',
      title: 'Consignment Created',
      message: `Shipment ${trackingNumber} created successfully.`,
    });
    return trackingNumber;
  };

  const createInvoice = (invData: Partial<Invoice>): string => {
    const year = new Date().getFullYear();
    const invId = `HM-INV-${year}-${(invoices.length + 92).toString().padStart(4, '0')}`;
    const invAmount = invData.amount ?? invData.totalAmount ?? 500000;
    const items = invData.items || invData.lineItems || [
      {
        description: 'Customs Clearance & Terminal Handling',
        amount: invAmount,
      },
    ];
    const newInv: Invoice = {
      id: invId,
      shipmentId: invData.shipmentId || 'HM-GENERAL',
      quoteId: invData.quoteId,
      customerName: invData.customerName || 'Valued Client',
      customerEmail: invData.customerEmail || 'client@example.com',
      amount: invAmount,
      totalAmount: invAmount,
      currency: invData.currency || 'NGN',
      status: 'UNPAID',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invData.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      items,
      lineItems: items,
    };
    setInvoices((prev) => [newInv, ...prev]);
    logAudit(
      'Invoice Created',
      'INVOICE',
      invId,
      `Manual invoice billed for ${formatCurrency(newInv.amount, newInv.currency)}.`
    );
    addToast({
      type: 'success',
      title: 'Invoice Generated',
      message: `Invoice ${invId} successfully recorded.`,
    });
    return invId;
  };

  const triggerWebhook = async (event: string, payload: Record<string, any>) => {
    dispatchWebhook(event as any, payload);
    addToast({
      type: 'success',
      title: 'Webhook Ping Dispatched',
      message: `Triggered ${event} to n8n automation pipeline.`,
    });
  };

  // AutoTrade Actions
  const submitVehicleRequest = (data: Partial<VehicleRequest>): string => {
    const year = new Date().getFullYear();
    const count = vehicleRequests.length + 46;
    const reqId = `HM-VR-${year}-${count.toString().padStart(5, '0')}`;

    const newReq: VehicleRequest = {
      id: reqId,
      name: data.name || 'Valued Client',
      email: data.email || 'client@example.com',
      phone: data.phone || '',
      country: data.country || 'Nigeria',
      preferredMake: data.preferredMake || 'Toyota',
      preferredModel: data.preferredModel || 'Prado',
      preferredYearMin: data.preferredYearMin || 2020,
      preferredYearMax: data.preferredYearMax || 2024,
      budgetAmount: data.budgetAmount || 45000000,
      budgetCurrency: data.budgetCurrency || 'NGN',
      additionalRequirements: data.additionalRequirements,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    setVehicleRequests((prev) => [newReq, ...prev]);

    // Create Lead as well
    const newLead: Lead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      name: newReq.name,
      email: newReq.email,
      phone: newReq.phone,
      serviceRequested: `AutoTrade Sourcing: ${newReq.preferredMake} ${newReq.preferredModel}`,
      source: 'Website',
      status: 'NEW',
      estimatedValue: newReq.budgetAmount,
      currency: newReq.budgetCurrency,
      notes: `Custom vehicle sourcing request ${reqId}. Budget: ${newReq.budgetCurrency} ${newReq.budgetAmount.toLocaleString()}.`,
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);

    logAudit('Vehicle Request Sourced', 'VEHICLE', reqId, `Customer requested sourcing for ${newReq.preferredMake} ${newReq.preferredModel}.`);
    dispatchWebhook('vehicle_request.created', { reqId, customer: newReq.name, make: newReq.preferredMake });

    addToast({
      type: 'success',
      title: 'Vehicle Request Sourcing Logged',
      message: `Reference: ${reqId}. Our global auto sourcing desk in London & US will contact you with matching inventory.`,
    });

    return reqId;
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    const id = `veh-${Date.now()}`;
    const newVeh: Vehicle = {
      ...vehicleData,
      id,
      createdAt: new Date().toISOString(),
    };
    setVehicles((prev) => [newVeh, ...prev]);
    logAudit('Vehicle Added to Dealership', 'VEHICLE', id, `Added ${newVeh.year} ${newVeh.make} ${newVeh.model} to inventory.`);
    addToast({
      type: 'success',
      title: 'Vehicle Published',
      message: `${newVeh.year} ${newVeh.make} ${newVeh.model} is now visible on the AutoTrade platform.`,
    });
  };

  const updateVehicleStatus = (vehicleId: string, status: Vehicle['status']) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, status } : v)));
    logAudit('Vehicle Status Changed', 'VEHICLE', vehicleId, `Vehicle status updated to ${status}.`);
    addToast({
      type: 'info',
      title: 'Vehicle Availability Updated',
      message: `Status changed to ${status}.`,
    });
  };

  // Leads CRM
  const createLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      name: leadData.name || 'Anonymous Lead',
      company: leadData.company,
      email: leadData.email || 'lead@example.com',
      phone: leadData.phone || '',
      serviceRequested: leadData.serviceRequested || 'General Logistics Inquiry',
      origin: leadData.origin,
      destination: leadData.destination,
      source: leadData.source || 'Website',
      status: 'NEW',
      estimatedValue: leadData.estimatedValue,
      currency: leadData.currency || 'NGN',
      notes: leadData.notes,
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    logAudit('New Lead Logged', 'LEAD', newLead.id, `Inquiry from ${newLead.name} (${newLead.serviceRequested}).`);
    addToast({
      type: 'success',
      title: 'Message Received',
      message: 'Thank you! Our customer solutions team will get in touch shortly.',
    });
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    logAudit('Lead Status Updated', 'LEAD', leadId, `Status transitioned to ${status}.`);
  };

  // Documents
  const uploadDocument = (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logAudit('Document Uploaded', 'DOCUMENT', newDoc.id, `Uploaded ${newDoc.name} (${newDoc.type}) for ${newDoc.customerName}.`);
    dispatchWebhook('document.uploaded', { docId: newDoc.id, name: newDoc.name, type: newDoc.type });
    addToast({
      type: 'success',
      title: 'Document Uploaded',
      message: `${newDoc.name} uploaded successfully and submitted for operational compliance check.`,
    });
  };

  const verifyDocument = (docId: string, status: DocumentItem['status']) => {
    setDocuments((prev) => prev.map((d) => (d.id === docId ? { ...d, status } : d)));
    logAudit('Document Compliance Reviewed', 'DOCUMENT', docId, `Verification status set to ${status}.`);
    addToast({
      type: 'info',
      title: 'Document Reviewed',
      message: `Status updated to ${status}.`,
    });
  };

  // Invoices & Payments
  const payInvoice = (invoiceId: string, method: Invoice['paymentMethod']) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'PAID',
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod: method,
            }
          : inv
      )
    );
    logAudit('Payment Received', 'INVOICE', invoiceId, `Settlement processed via ${method}.`);
    dispatchWebhook('invoice.paid', { invoiceId, method });
    addToast({
      type: 'success',
      title: 'Payment Successful',
      message: `Invoice ${invoiceId} marked as settled via ${method}. Official receipt generated.`,
    });
  };

  // Settings
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    logAudit('Settings Updated', 'SETTINGS', 'SYSTEM', 'Company operational profile updated.');
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Platform configuration updated.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        routeParams,
        navigateTo,

        currentUser,
        setCurrentUser,
        loginAs,
        loginWithCredentials,
        logout,

        shipments,
        quotes,
        vehicles,
        vehicleRequests,
        leads,
        documents,
        invoices,
        auditLogs,
        webhooks,
        settings,
        companySettings: settings,
        updateSettings,

        activeCurrency,
        setActiveCurrency,
        formatCurrency,

        currentLanguage,
        setLanguage,
        t,

        submitQuoteRequest,
        updateQuoteStatus,
        updateQuotePricing,
        issueQuote,
        convertQuoteToShipment,
        createShipment,
        acceptQuoteAsCustomer,
        rejectQuoteAsCustomer,
        approveQuote: acceptQuoteAsCustomer,
        rejectQuote: rejectQuoteAsCustomer,

        addTrackingEvent,
        updateShipmentStatus,

        submitVehicleRequest,
        addVehicle,
        updateVehicleStatus,

        createLead,
        updateLeadStatus,

        uploadDocument,
        verifyDocument,

        createInvoice,
        payInvoice,
        triggerWebhook,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
