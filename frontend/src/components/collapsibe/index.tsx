'use client';

import { useState } from 'react';

type CollapsibleProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export default function Collapsible({ trigger, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="rounded mb-2">
      <div onClick={handleToggle} className="cursor-pointer select-none">
        {trigger}
      </div>

      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}