import { createContext, useState, ReactNode } from "react";

type MobileMenuContextType = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

export const MobileMenuContext = createContext<
  MobileMenuContextType | undefined
>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export function MobileMenuProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MobileMenuContext.Provider
      value={{ isOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
