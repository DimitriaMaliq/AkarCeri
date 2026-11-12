import React from 'react';

interface MapPlaceholderProps {
  className?: string;
}

/**
 * MapPlaceholder — Reusable editorial map placeholder component.
 * Approved design from Stitch:
 * - Cartographic contour curves and muted street silhouettes
 * - Center intentional "GOOGLE MAPS / Interactive map coming soon" card
 * - Prepared for future drop-in Google Maps library integration
 * - NO real Google Maps API key, NO fabricated coordinates, NO fake pins.
 */
export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative min-h-[460px] sm:min-h-[520px] rounded-2xl overflow-hidden bg-[#F6F4E6] shadow-sm flex items-center justify-center p-6 border border-sage/30 select-none ${className}`}
      role="region"
      aria-label="Peta Digital PIK-R — Google Maps coming soon"
    >
      {/* Calm Aesthetic Cartographic Contours & Muted Street Silhouettes */}
      <svg
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45"
        fill="none"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Subtle Contour Curves */}
        <path
          d="M-60 110C160 80 280 210 520 160C740 110 770 200 890 220"
          fill="none"
          stroke="#CDC69A"
          strokeDasharray="3 3"
          strokeWidth="1.2"
        />
        <path
          d="M-30 260C190 200 300 360 550 290C790 230 810 350 910 370"
          fill="none"
          stroke="#CDC69A"
          strokeDasharray="3 3"
          strokeWidth="1.2"
        />
        <path
          d="M-40 430C170 380 330 490 580 430C830 380 840 480 920 500"
          fill="none"
          stroke="#CDC69A"
          strokeDasharray="3 3"
          strokeWidth="1.2"
        />

        {/* Muted Street Grid Silhouettes */}
        <path d="M370 -20L400 230L430 380L410 620" stroke="#E5E3D5" strokeWidth="5" />
        <path d="M370 -20L400 230L430 380L410 620" stroke="#CDC69A" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M110 180L400 230L680 190" stroke="#E5E3D5" strokeWidth="3.5" />
        <path d="M110 180L400 230L680 190" stroke="#CDC69A" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M210 420L430 380L700 440" stroke="#E5E3D5" strokeWidth="3.5" />
        <path d="M210 420L430 380L700 440" stroke="#CDC69A" strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>

      {/* Center Intentional Product Teaser Announcement Card */}
      <div className="relative z-10 max-w-md w-full bg-cream/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-sm border border-sage/40 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-muted text-chocolate/80 text-[11px] font-bold uppercase tracking-widest mb-3 font-sans border border-sage/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" />
          <span>Peta Digital</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-chocolate font-bold tracking-tight mb-1">
          GOOGLE MAPS
        </h2>

        <p className="text-xs sm:text-sm text-cherry font-bold tracking-wide uppercase mb-3 font-sans">
          Interactive map coming soon
        </p>

        <p className="text-xs sm:text-sm text-chocolate/75 leading-relaxed">
          Integrasi peta interaktif dan navigasi rute langsung sedang disiapkan.
        </p>
      </div>
    </div>
  );
};
