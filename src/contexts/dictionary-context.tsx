
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dictionaries, Dictionary } from '@/lib/dictionaries';

type Language = 'lo' | 'en' | 'th' | 'zh' | 'vi';

interface DictionaryContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dictionary: Dictionary;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('lo');

  const value = {
    lang,
    setLang,
    dictionary: dictionaries[lang],
  };

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
}
