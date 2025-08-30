
import React from 'react';
import { ShieldCheckIcon } from './Icon';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface border-b border-brand-border p-4">
      <div className="container mx-auto max-w-7xl flex items-center gap-3">
        <ShieldCheckIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-xl md:text-2xl font-bold text-brand-text-primary tracking-tight">
          AI Smart Contract Auditor
        </h1>
      </div>
    </header>
  );
};

export default Header;
