'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AIAssistantContextType {
  isOpen: boolean;
  initialQuery: string;
  openAssistant: (query?: string) => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const openAssistant = useCallback((query?: string) => {
    if (query !== undefined) {
      setInitialQuery(query);
    }
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        initialQuery,
        openAssistant,
        closeAssistant,
        toggleAssistant,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
}
