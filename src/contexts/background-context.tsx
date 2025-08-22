
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BackgroundContextType {
  background: string | null;
  setBackground: (background: string | null) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [background, setBackgroundState] = useState<string | null>(null);

  useEffect(() => {
    const storedBackground = localStorage.getItem('app-background');
    if (storedBackground) {
      setBackgroundState(storedBackground);
    }
  }, []);

  const setBackground = (newBackground: string | null) => {
    setBackgroundState(newBackground);
    if (newBackground) {
      localStorage.setItem('app-background', newBackground);
    } else {
      localStorage.removeItem('app-background');
    }
  };

  const value = {
    background,
    setBackground,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
