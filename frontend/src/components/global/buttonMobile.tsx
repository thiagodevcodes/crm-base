import React, { useEffect } from "react";

interface HeaderTicketProps {
    isActive: boolean;
    color?: string
}

const ButtonMobile: React.FC<HeaderTicketProps> = ({ isActive, color }) => {
  return (
    <button className="cursor-pointer">
        <div className={`w-8 h-1 ${color || 'bg-white'} m-2 transition-all rounded ${isActive ? '-rotate-45 translate-x-0 translate-y-3' : ''}`}></div>
        <div className={`w-8 h-1 ${color || 'bg-white'} m-2 transition-all rounded ${isActive ? 'opacity-0' : ''}`}></div>
        <div className={`w-8 h-1 ${color || 'bg-white'} m-2 transition-all rounded ${isActive ? 'rotate-45 translate-x-0 -translate-y-3' : ''}`}></div>
    </button>
  );
};

export default ButtonMobile;

