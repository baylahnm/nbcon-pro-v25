// App Configuration
export const APP_CONFIG = {
  name: 'NBCON Pro',
  version: '1.0.0',
  description: 'Saudi Arabia\'s Engineering Marketplace',
  supportEmail: 'support@nbcon.pro',
  supportPhone: '+966 11 123 4567',
};

// Colors (Saudi-themed with Vision 2030 inspiration)
export const COLORS = {
  // Primary Colors
  primary: '#1B7A3E', // Saudi Green
  primaryLight: '#4CAF50',
  primaryDark: '#0F5A2B',
  
  // Secondary Colors
  secondary: '#2196F3', // Technology Blue
  secondaryLight: '#64B5F6',
  secondaryDark: '#1976D2',
  
  // Accent Colors
  accent: '#FF9800', // Saudi Gold/Orange
  accentLight: '#FFB74D',
  accentDark: '#F57C00',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Light Theme
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    card: '#FFFFFF',
    notification: '#FF3D00',
  },
  
  // Dark Theme
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#333333',
    card: '#1E1E1E',
    notification: '#FF6B35',
  },
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const TYPOGRAPHY = {
  sizes: {
    caption: 12,
    body2: 14,
    body1: 16,
    subtitle2: 14,
    subtitle1: 16,
    h6: 20,
    h5: 24,
    h4: 34,
    h3: 48,
    h2: 60,
    h1: 96,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
};

// Border Radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Engineering Service Categories
export const SERVICE_CATEGORIES = [
  {
    id: 'civil',
    name: { en: 'Civil Engineering', ar: 'هندسة مدنية' },
    icon: 'building',
    color: COLORS.primary,
  },
  {
    id: 'mep',
    name: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    icon: 'settings',
    color: COLORS.secondary,
  },
  {
    id: 'surveying',
    name: { en: 'Surveying', ar: 'المساحة' },
    icon: 'map',
    color: COLORS.accent,
  },
  {
    id: 'bim',
    name: { en: 'BIM Modeling', ar: 'نمذجة معلومات البناء' },
    icon: 'cube-outline',
    color: '#9C27B0',
  },
  {
    id: 'hse',
    name: { en: 'HSE', ar: 'الصحة والسلامة والبيئة' },
    icon: 'shield-checkmark',
    color: '#FF5722',
  },
  {
    id: 'gis',
    name: { en: 'GIS', ar: 'نظم المعلومات الجغرافية' },
    icon: 'earth',
    color: '#607D8B',
  },
];

// Saudi Regions
export const SAUDI_REGIONS = [
  { id: 'riyadh', name: { en: 'Riyadh', ar: 'الرياض' } },
  { id: 'makkah', name: { en: 'Makkah', ar: 'مكة المكرمة' } },
  { id: 'eastern', name: { en: 'Eastern Province', ar: 'المنطقة الشرقية' } },
  { id: 'asir', name: { en: 'Asir', ar: 'عسير' } },
  { id: 'tabuk', name: { en: 'Tabuk', ar: 'تبوك' } },
  { id: 'qassim', name: { en: 'Qassim', ar: 'القصيم' } },
  { id: 'hail', name: { en: 'Hail', ar: 'حائل' } },
  { id: 'medina', name: { en: 'Medina', ar: 'المدينة المنورة' } },
  { id: 'bahah', name: { en: 'Al Bahah', ar: 'الباحة' } },
  { id: 'jazan', name: { en: 'Jazan', ar: 'جازان' } },
  { id: 'najran', name: { en: 'Najran', ar: 'نجران' } },
  { id: 'jawf', name: { en: 'Al Jawf', ar: 'الجوف' } },
  { id: 'northern', name: { en: 'Northern Borders', ar: 'الحدود الشمالية' } },
];

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'mada',
    name: { en: 'mada', ar: 'مدى' },
    icon: 'card',
    color: '#1B7A3E',
    isLocal: true,
  },
  {
    id: 'stc_pay',
    name: { en: 'STC Pay', ar: 'STC Pay' },
    icon: 'phone-portrait',
    color: '#800080',
    isLocal: true,
  },
  {
    id: 'apple_pay',
    name: { en: 'Apple Pay', ar: 'Apple Pay' },
    icon: 'logo-apple',
    color: '#000000',
    isLocal: false,
  },
  {
    id: 'credit_card',
    name: { en: 'Credit Card', ar: 'بطاقة ائتمانية' },
    icon: 'card',
    color: '#2196F3',
    isLocal: false,
  },
];

// API Endpoints (to be replaced with actual backend)
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://api.nbcon.pro/v1';

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_PHONE: '/auth/verify-phone',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    VERIFICATION: '/users/verification',
  },
  
  // Jobs
  JOBS: {
    LIST: '/jobs',
    CREATE: '/jobs',
    DETAILS: (id: string) => `/jobs/${id}`,
    MATCH: (id: string) => `/jobs/${id}/match`,
    ACCEPT: (id: string) => `/jobs/${id}/accept`,
  },
  
  // Payments
  PAYMENTS: {
    PROCESS: '/payments/process',
    HISTORY: '/payments/history',
    METHODS: '/payments/methods',
  },
};

// Validation Rules
export const VALIDATION = {
  phone: {
    saudi: /^(\+966|966|05)[0-9]{8}$/,
    international: /^\+[1-9]\d{1,14}$/,
  },
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  en: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid Saudi phone number',
    weakPassword: 'Password must contain at least 8 characters with uppercase, lowercase, number and special character',
    networkError: 'Network error. Please check your connection',
    serverError: 'Server error. Please try again later',
  },
  ar: {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    invalidPhone: 'يرجى إدخال رقم هاتف سعودي صالح',
    weakPassword: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل مع أحرف كبيرة وصغيرة ورقم ورمز خاص',
    networkError: 'خطأ في الشبكة. يرجى التحقق من الاتصال',
    serverError: 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً',
  },
};