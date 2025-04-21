'use client'

import { EllipsisVertical } from "lucide-react";
import { useState, createContext, useContext, ReactNode } from "react";

type DropdownContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function Dropdown({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

export function DropdownButton({ children }: { children: ReactNode }) {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error("DropdownButton must be used within a Dropdown");
    }

    const { open, setOpen } = context;

    return (
        <button
            onClick={() => setOpen(!open)}
            className="rounded-lg cursor-pointer"
        >
            {children}
        </button>
    );
}

export function DropdownMenu() {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error("DropdownMenu must be used within a Dropdown");
    }

    const { open } = context;

    if (!open) return null;

    return (
        <div className="right-0 w-44 absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-1000">
            <ul className="py-1 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center">Opção 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center">Opção 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center">Sair</li>
            </ul>
        </div>
    );
}