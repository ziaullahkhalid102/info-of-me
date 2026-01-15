import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { LANGUAGES, getLabel } from '../constants';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, subKey?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]); // Default English

  // Simple translation helper that connects to constants/getLabel
  const t = (key: string, subKey?: string) => {
    return getLabel(currentLanguage.code, key, subKey);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};