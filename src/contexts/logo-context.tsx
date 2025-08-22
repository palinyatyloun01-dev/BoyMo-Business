
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { IconKey } from '@/lib/types';

type LogoType = 'icon' | 'custom';

interface LogoContextType {
  logo: IconKey;
  setLogo: (logo: IconKey) => void;
  logoType: LogoType;
  setLogoType: (type: LogoType) => void;
  customLogo: string | null;
  setCustomLogo: (logo: string | null) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logo, setLogoState] = useState<IconKey>('Pizza');
  const [logoType, setLogoTypeState] = useState<LogoType>('icon');
  const [customLogo, setCustomLogoState] = useState<string | null>(null);

  useEffect(() => {
    const storedLogo = localStorage.getItem('app-logo') as IconKey;
    const storedLogoType = localStorage.getItem('app-logo-type') as LogoType;
    const storedCustomLogo = localStorage.getItem('app-custom-logo');
    
    if (storedLogo) setLogoState(storedLogo);
    if (storedLogoType) setLogoTypeState(storedLogoType);
    if (storedCustomLogo) setCustomLogoState(storedCustomLogo);

  }, []);

  const setLogo: LogoContextType['setLogo'] = (newLogo) => {
    setLogoState(newLogo);
    localStorage.setItem('app-logo', newLogo);
  };

  const setLogoType: LogoContextType['setLogoType'] = (newType) => {
    setLogoTypeState(newType);
    localStorage.setItem('app-logo-type', newType);
  };

  const setCustomLogo: LogoContextType['setCustomLogo'] = (newCustomLogo) => {
    setCustomLogoState(newCustomLogo);
    if (newCustomLogo) {
      localStorage.setItem('app-custom-logo', newCustomLogo);
    } else {
      localStorage.removeItem('app-custom-logo');
    }
  };

  const value = {
    logo,
    setLogo,
    logoType,
    setLogoType,
    customLogo,
    setCustomLogo,
  };

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
}
