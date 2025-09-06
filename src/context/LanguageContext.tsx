import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Simple translation function placeholder
const translate = (key: string, language: Language, params?: Record<string, string>): string => {
  // For now, return the key as-is. In a real app, you'd have translation dictionaries
  let translation = key;
  
  // Replace parameters if provided
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{{${param}}}`, value);
    });
  }
  
  return translation;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { language } = useSelector((state: RootState) => state.app);

  const isRTL = language === Language.ARABIC;
  
  const t = (key: string, params?: Record<string, string>): string => {
    return translate(key, language, params);
  };

  const languageValue: LanguageContextType = {
    language,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;