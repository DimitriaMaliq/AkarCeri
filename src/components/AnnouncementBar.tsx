import React from 'react';

export const AnnouncementBar: React.FC = () => (
  <div className="w-full bg-chocolate text-cream py-2 px-4 border-b border-sage/20 text-xs sm:text-sm font-medium overflow-hidden">
    <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 tracking-wider">
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest bg-cherry text-cream uppercase animate-pulse flex-shrink-0">
        LIVE
      </span>
      <span className="text-center">
        AKAR CERI • Life Skills Academy untuk Generasi Masa Depan
        <span className="hidden md:inline text-sage/70"> • Registrasi Cohort Gen-Z &amp; Pemuda Dibuka</span>
      </span>
    </div>
  </div>
);
