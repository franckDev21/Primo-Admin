import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;