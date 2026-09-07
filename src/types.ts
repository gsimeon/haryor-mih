export type CustomerType = 'individual' | 'business';

export type CargoCategory =
  | 'commercial_goods'
  | 'personal_effects'
  | 'vehicle'
  | 'machinery'
  | 'electronics'
  | 'perishables'
  | 'documents'
  | 'other';

export type ShippingMethod =
  | 'air_freight'
  | 'sea_freight_fcl'
  | 'sea_freight_lcl'
  | 'road_freight'
  | 'door_to_door'
  | 'not_sure';

export type QuoteStatus =
  | 'REQUESTED'
  | 'UNDER_REVIEW'
  | 'QUOTE_READY'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

export type ShipmentStatus =
  | 'BOOKING_CONFIRMED'
  | 'CARGO_RECEIVED'
  | 'PROCESSING'
  | 'DEPARTED_ORIGIN'
  | 'IN_TRANSIT'
  | 'ARRIVED_DESTINATION'
  | 'CUSTOMS_CLEARANCE'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED';

export type VehicleCondition = 'BRAND_NEW' | 'FOREIGN_USED' | 'CERTIFIED_PRE_OWNED';

export type VehicleStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'IN_TRANSIT' | 'HIDDEN';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'QUOTING' | 'WON' | 'LOST';

export type LeadSource =
  | 'Website'
  | 'WhatsApp'
  | 'Facebook'
  | 'Instagram'
  | 'Google'
  | 'Referral'
  | 'Direct'
  | 'Other';

export type StaffRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'SALES'
  | 'OPERATIONS'
  | 'FINANCE'
  | 'CONTENT'
  | 'SUPPORT';

export type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

export type SupportedLanguage = 'en' | 'fr' | 'zh' | 'es' | 'ar' | 'de';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export interface ShippingRateCalculation {
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  cbm: number;
  origin: string;
  destination: string;
  method: ShippingMethod;
  currency: Currency;
  freightBaseCost: number;
  fuelAndSecuritySurcharge: number;
  handlingFee: number;
  customsDocumentationFee: number;
  estimatedDutyFee: number;
  totalEstimatedCost: number;
  estimatedTransitDays: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole | 'CUSTOMER';
  companyName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface QuoteItem {
  id: string;
  description: string;
  category: 'Freight' | 'Handling' | 'Customs' | 'Transportation' | 'Insurance' | 'Documentation' | 'Other';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface QuoteRequest {
  id: string; // e.g. HM-Q-2026-000123
  createdAt: string;
  updatedAt: string;
  customerType: CustomerType;
  companyName?: string;
  companyRegNumber?: string;
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  cargoCategory: CargoCategory;
  shippingMethod: ShippingMethod;
  origin: {
    country: string;
    city: string;
    portOrAirport?: string;
  };
  destination: {
    country: string;
    city: string;
    portOrAirport?: string;
  };
  cargoDetails: {
    description: string;
    quantity: number;
    weightKg: number;
    dimensionsCm?: { length: number; width: number; height: number };
    cbm?: number;
    declaredValue: number;
    currency: Currency;
    // For vehicle cargo
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleYear?: number;
    vehicleCondition?: string;
    vehicleOperable?: boolean;
    vehicleVin?: string;
  };
  documents?: {
    name: string;
    sizeMb: number;
    type: string;
    url?: string;
  }[];
  status: QuoteStatus;
  adminNotes?: string;
  quoteItems?: QuoteItem[];
  subtotal?: number;
  discount?: number;
  tax?: number;
  totalAmount?: number;
  quoteCurrency?: Currency;
  assignedStaffId?: string;
  validUntil?: string;
  convertedToShipmentId?: string;
}

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  title: string;
  location: string;
  description: string;
  timestamp: string;
  isException?: boolean;
  exceptionReason?: string;
}

export interface Shipment {
  id: string; // e.g. HM-2026-000123
  quoteId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: ShippingMethod;
  origin: {
    country: string;
    city: string;
    portOrAirport?: string;
  };
  destination: {
    country: string;
    city: string;
    portOrAirport?: string;
  };
  cargoDescription: string;
  cargoCategory: CargoCategory;
  weightKg: number;
  quantity: number;
  currentStatus: ShipmentStatus;
  carrierName?: string;
  billOfLadingNumber?: string;
  airWaybillNumber?: string;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
  assignedStaffName?: string;
  events: TrackingEvent[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    url?: string;
    isVerified: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  price: number;
  currency: Currency;
  condition: VehicleCondition;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual';
  location: string; // e.g. Lagos Showroom, London Logistics Depot, US Port
  status: VehicleStatus;
  images: string[];
  description: string;
  vin?: string;
  engineSize?: string;
  features: string[];
  createdAt: string;
}

export interface VehicleRequest {
  id: string; // e.g. HM-VR-2026-00045
  name: string;
  email: string;
  phone: string;
  country: string;
  preferredMake: string;
  preferredModel: string;
  preferredYearMin: number;
  preferredYearMax: number;
  budgetAmount: number;
  budgetCurrency: Currency;
  additionalRequirements?: string;
  status: 'PENDING' | 'IN_SOURCING' | 'FOUND' | 'CLOSED';
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  serviceRequested: string;
  origin?: string;
  destination?: string;
  source: LeadSource;
  status: LeadStatus;
  estimatedValue?: number;
  currency?: Currency;
  assignedStaffName?: string;
  notes?: string;
  createdAt: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'BILL_OF_LADING' | 'AIR_WAYBILL' | 'PAAR' | 'FORM_M' | 'COMMERCIAL_INVOICE' | 'PACKING_LIST' | 'VEHICLE_TITLE' | 'OTHER';
  customerName: string;
  customerId: string;
  shipmentId?: string;
  quoteId?: string;
  uploadedAt: string;
  fileSizeMb: number;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';
  visibility: 'CUSTOMER_AND_STAFF' | 'INTERNAL_ONLY';
}

export interface Invoice {
  id: string; // e.g. HM-INV-2026-0089
  shipmentId?: string;
  quoteId?: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  totalAmount?: number;
  currency: Currency;
  status: 'UNPAID' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';
  issueDate: string;
  dueDate: string;
  createdAt?: string;
  paidDate?: string;
  paymentMethod?: 'Bank Transfer' | 'Paystack' | 'Stripe' | 'Flutterwave';
  items: {
    description: string;
    amount: number;
  }[];
  lineItems?: {
    description: string;
    amount: number;
  }[];
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: 'QUOTE' | 'SHIPMENT' | 'LEAD' | 'VEHICLE' | 'DOCUMENT' | 'INVOICE' | 'SETTINGS' | 'SYSTEM' | 'AUTH';
  entityId: string;
  performedBy: string;
  role: string;
  details: string;
  timestamp: string;
}

export interface WebhookEvent {
  id: string;
  event: 'quote.created' | 'quote.accepted' | 'shipment.created' | 'shipment.status_updated' | 'document.uploaded' | 'vehicle_request.created' | 'invoice.paid';
  payload: Record<string, any>;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  responseCode?: number;
}

export interface CompanySettings {
  legalName: string;
  rcNumber: string;
  tagline: string;
  headquartersAddress: string;
  ukDepotAddress: string;
  nigeriaPhones: string[];
  ukPhones: string[];
  whatsappNumber: string;
  officialEmail: string;
  supportEmail: string;
  businessHours: string;
  customsDisclaimer: string;
  availableCurrencies: Currency[];
  defaultCurrency: Currency;
}
