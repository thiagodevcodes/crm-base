'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const device = useDeviceType()

  const [expanded, setExpanded] = useState(device !== 'mobile');

  useEffect(() => {
    if (device === 'mobile') {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [device]);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  console.log(context)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};