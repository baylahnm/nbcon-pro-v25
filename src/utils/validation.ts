import { VALIDATION, ERROR_MESSAGES } from '../constants';
import { Language } from '../types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export class ValidationUtils {
  private language: Language;

  constructor(language: Language = Language.ENGLISH) {
    this.language = language;
  }

  private getErrorMessage(key: keyof typeof ERROR_MESSAGES.en): string {
    return ERROR_MESSAGES[this.language][key];
  }

  validateRequired(value: string | null | undefined, fieldName?: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return {
        isValid: false,
        error: fieldName 
          ? `${fieldName} ${this.getErrorMessage('required').toLowerCase()}`
          : this.getErrorMessage('required'),
      };
    }
    return { isValid: true };
  }

  validateEmail(email: string): ValidationResult {
    if (!email) {
      return this.validateRequired(email);
    }

    if (!VALIDATION.email.test(email)) {
      return {
        isValid: false,
        error: this.getErrorMessage('invalidEmail'),
      };
    }

    return { isValid: true };
  }

  validateSaudiPhone(phone: string): ValidationResult {
    if (!phone) {
      return this.validateRequired(phone);
    }

    // Remove spaces and special characters except +
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    if (!VALIDATION.phone.saudi.test(cleanPhone)) {
      return {
        isValid: false,
        error: this.getErrorMessage('invalidPhone'),
      };
    }

    return { isValid: true };
  }

  validateInternationalPhone(phone: string): ValidationResult {
    if (!phone) {
      return this.validateRequired(phone);
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    if (!VALIDATION.phone.international.test(cleanPhone)) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC 
          ? 'يرجى إدخال رقم هاتف صالح' 
          : 'Please enter a valid phone number',
      };
    }

    return { isValid: true };
  }

  validatePassword(password: string): ValidationResult {
    if (!password) {
      return this.validateRequired(password);
    }

    if (password.length < VALIDATION.password.minLength) {
      return {
        isValid: false,
        error: this.getErrorMessage('weakPassword'),
      };
    }

    if (!VALIDATION.password.pattern.test(password)) {
      return {
        isValid: false,
        error: this.getErrorMessage('weakPassword'),
      };
    }

    return { isValid: true };
  }

  validateSMSCode(code: string, expectedLength: number = 4): ValidationResult {
    if (!code) {
      return this.validateRequired(code);
    }

    if (code.length !== expectedLength) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? `يجب أن يكون الرمز ${expectedLength} أرقام`
          : `Code must be ${expectedLength} digits`,
      };
    }

    if (!/^\d+$/.test(code)) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'الرمز يجب أن يحتوي على أرقام فقط'
          : 'Code must contain only numbers',
      };
    }

    return { isValid: true };
  }

  validateSaudiNationalId(id: string): ValidationResult {
    if (!id) {
      return this.validateRequired(id);
    }

    // Saudi National ID validation (10 digits, specific pattern)
    const cleanId = id.replace(/\s/g, '');

    if (!/^\d{10}$/.test(cleanId)) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'رقم الهوية يجب أن يكون 10 أرقام'
          : 'National ID must be 10 digits',
      };
    }

    // Additional Saudi ID validation logic (Luhn algorithm for checksum)
    const digits = cleanId.split('').map(Number);
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      if (i % 2 === 0) {
        let doubled = digits[i] * 2;
        sum += doubled > 9 ? doubled - 9 : doubled;
      } else {
        sum += digits[i];
      }
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    
    if (checkDigit !== digits[9]) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'رقم الهوية غير صالح'
          : 'Invalid National ID',
      };
    }

    return { isValid: true };
  }

  validateIqamaNumber(iqama: string): ValidationResult {
    if (!iqama) {
      return this.validateRequired(iqama);
    }

    const cleanIqama = iqama.replace(/\s/g, '');

    if (!/^\d{10}$/.test(cleanIqama)) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'رقم الإقامة يجب أن يكون 10 أرقام'
          : 'Iqama number must be 10 digits',
      };
    }

    // Iqama numbers start with 1 or 2
    if (!cleanIqama.startsWith('1') && !cleanIqama.startsWith('2')) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'رقم الإقامة يجب أن يبدأ بـ 1 أو 2'
          : 'Iqama number must start with 1 or 2',
      };
    }

    return { isValid: true };
  }

  validateName(name: string, minLength: number = 2): ValidationResult {
    if (!name) {
      return this.validateRequired(name);
    }

    if (name.trim().length < minLength) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? `الاسم يجب أن يكون ${minLength} حروف على الأقل`
          : `Name must be at least ${minLength} characters`,
      };
    }

    // Check for valid name characters (letters, spaces, Arabic characters)
    if (!/^[\p{L}\s\-'\.]+$/u.test(name)) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? 'الاسم يحتوي على حروف غير مسموحة'
          : 'Name contains invalid characters',
      };
    }

    return { isValid: true };
  }

  validateAge(birthDate: string, minAge: number = 18): ValidationResult {
    if (!birthDate) {
      return this.validateRequired(birthDate);
    }

    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      const actualAge = age - 1;
      if (actualAge < minAge) {
        return {
          isValid: false,
          error: this.language === Language.ARABIC
            ? `يجب أن يكون العمر ${minAge} سنة على الأقل`
            : `Must be at least ${minAge} years old`,
        };
      }
    } else if (age < minAge) {
      return {
        isValid: false,
        error: this.language === Language.ARABIC
          ? `يجب أن يكون العمر ${minAge} سنة على الأقل`
          : `Must be at least ${minAge} years old`,
      };
    }

    return { isValid: true };
  }

  formatSaudiPhone(phone: string): string {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (cleanPhone.startsWith('+966')) {
      return cleanPhone;
    } else if (cleanPhone.startsWith('966')) {
      return `+${cleanPhone}`;
    } else if (cleanPhone.startsWith('05')) {
      return `+966${cleanPhone.substring(1)}`;
    } else if (cleanPhone.startsWith('5')) {
      return `+966${cleanPhone}`;
    }
    
    return phone;
  }

  formatSaudiNationalId(id: string): string {
    const cleanId = id.replace(/\s/g, '');
    if (cleanId.length === 10) {
      return `${cleanId.substring(0, 1)} ${cleanId.substring(1, 5)} ${cleanId.substring(5, 9)} ${cleanId.substring(9)}`;
    }
    return id;
  }
}

// Utility functions for common use cases
export const createValidator = (language: Language) => new ValidationUtils(language);

export const validateField = (
  value: string,
  type: 'required' | 'email' | 'saudi_phone' | 'password' | 'sms_code' | 'saudi_id' | 'iqama' | 'name',
  language: Language = Language.ENGLISH,
  options?: any
): ValidationResult => {
  const validator = new ValidationUtils(language);

  switch (type) {
    case 'required':
      return validator.validateRequired(value);
    case 'email':
      return validator.validateEmail(value);
    case 'saudi_phone':
      return validator.validateSaudiPhone(value);
    case 'password':
      return validator.validatePassword(value);
    case 'sms_code':
      return validator.validateSMSCode(value, options?.length);
    case 'saudi_id':
      return validator.validateSaudiNationalId(value);
    case 'iqama':
      return validator.validateIqamaNumber(value);
    case 'name':
      return validator.validateName(value, options?.minLength);
    default:
      return { isValid: true };
  }
};