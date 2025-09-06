// User Types
export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  CLIENT = 'client',
  ENGINEER = 'engineer',
  ENTERPRISE = 'enterprise',
  ADMIN = 'admin',
}

export interface Engineer extends User {
  specializations: string[];
  serviceAreas: ServiceArea[];
  hourlyRate: number;
  availability: AvailabilityStatus;
  trustScore: number;
  completedJobs: number;
  rating: number;
  credentials: Credential[];
}

export interface Client extends User {
  companyName?: string;
  totalSpent: number;
  activeJobs: number;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  engineerId?: string;
  status: JobStatus;
  location: Location;
  budget: number;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
  milestones: Milestone[];
}

export enum JobStatus {
  DRAFT = 'draft',
  POSTED = 'posted',
  MATCHED = 'matched',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
}

export interface Milestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  status: MilestoneStatus;
  dueDate?: string;
  completedAt?: string;
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  region: string;
  country: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  radius: number;
  location: Location;
}

// Verification Types
export interface Credential {
  id: string;
  type: CredentialType;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  documentUrl: string;
  isVerified: boolean;
}

export enum CredentialType {
  SCE_LICENSE = 'sce_license',
  DEGREE = 'degree',
  CERTIFICATION = 'certification',
  ID_DOCUMENT = 'id_document',
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline',
  ON_SITE = 'on_site',
}

// Payment Types
export interface Payment {
  id: string;
  jobId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  processedAt?: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  MADA = 'mada',
  STC_PAY = 'stc_pay',
  APPLE_PAY = 'apple_pay',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
}

// UI Types
export interface AppTheme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

export enum Language {
  ENGLISH = 'en',
  ARABIC = 'ar',
}

// Service Categories
export enum ServiceCategory {
  CIVIL = 'civil',
  MEP = 'mep',
  SURVEYING = 'surveying',
  BIM = 'bim',
  HSE = 'hse',
  GIS = 'gis',
}

// Job Priority
export enum JobPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical',
}

// Job Template
export interface JobTemplate {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: ServiceCategory;
  estimatedPrice: number;
  estimatedDuration: number;
}