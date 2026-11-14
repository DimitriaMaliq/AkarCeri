import React, { useState } from 'react';
import type { PikRLocation, PikRDistrict } from '../data/pikRData';

interface PikRGoogleMapProps {
  selectedLocation: PikRLocation | null;
  activeDistrict: PikRDistrict;
  className?: string;
}

/**
 * PikRGoogleMap — Native AKAR CERI Google Maps Embed Component.
 *
 * Implements Stage 1 Google Maps integration:
 * - Safe search/embed URL based on supplied full address & school name.
 * - Zero fabricated coordinates or guessed latitude/longitude.
 * - Zero exposed API keys required.
 * - Visual container adhering to AKAR CERI design system (cream/chocolate/sage/cherry).
 * - Full responsive layout with loading state and external directions link.
 */
export const PikRGoogleMap: React.FC<PikRGoogleMapProps> = ({
  selectedLocation,
  activeDistrict,
  className = '',
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Build the safest query without fabricating coordinates:
  // Use location name + school + address for high precision geocoding in Google Maps.
  const query = selectedLocation
    ? `${selectedLocation.name}, ${selectedLocation.school}, ${selectedLocation.address}`
    : `${activeDistrict === 'Semua' ? 'Kota Cimahi' : activeDistrict}, Kota Cimahi, Jawa Barat`;

  const zoom = selectedLocation ? 16 : 13;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className={`flex flex-col gap-4 ${className}`} role="region" aria-label="Area Peta Google Maps">
      {/* Map Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cream-muted text-chocolate/75 text-[11px] font-bold uppercase tracking-widest mb-1.5 font-sans border border-sage/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cherry animate-pulse" aria-hidden="true" />
            <span>Google Maps · Peta Digital</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-chocolate font-bold tracking-tight">
            Temukan Lokasinya
          </h2>
          <p className="text-xs sm:text-sm text-chocolate/70 font-sans mt-0.5">
            Jelajahi lokasi PIK-R yang terdaftar di Kota Cimahi.
          </p>
        </div>

        {/* External Google Maps Link */}
        <a
          href={externalMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cherry hover:text-chocolate transition-colors font-sans py-1 shrink-0"
          aria-label={`Buka ${selectedLocation ? selectedLocation.name : 'peta Kota Cimahi'} di Google Maps (tab baru)`}
        >
          <span>Buka di Google Maps</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            open_in_new
          </span>
        </a>
      </div>

      {/* AKAR CERI Polished Map Container */}
      <div className="relative w-full rounded-3xl bg-cream border border-sage/40 shadow-sm overflow-hidden flex flex-col">
        {/* Active Location Info Bar */}
        <div className="bg-cream-muted border-b border-sage/30 px-5 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {selectedLocation ? (
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-bold text-cherry shrink-0">
                  {selectedLocation.ordinal}
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-chocolate truncate">
                  {selectedLocation.name}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-sage/30 text-chocolate text-[10px] font-bold font-sans uppercase">
                  {selectedLocation.district}
                </span>
              </div>
              <p className="text-xs text-chocolate/70 font-sans truncate mt-0.5">
                {selectedLocation.school} • {selectedLocation.address}
              </p>
            </div>
          ) : (
            <div className="text-xs text-chocolate/70 font-sans">
              <span className="font-semibold text-chocolate">Wilayah: {activeDistrict}</span>
              {activeDistrict === 'Cimahi Utara' && (
                <span className="ml-2 text-cherry">
                  (Belum ada titik terdaftar — menampilkan peta wilayah)
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-chocolate/60 bg-cream px-2.5 py-1 rounded-full border border-sage/40 font-sans">
              <span className="material-symbols-outlined text-xs text-cherry" aria-hidden="true">
                pin_drop
              </span>
              <span>{selectedLocation ? 'Fokus Lokasi' : 'Peta Wilayah'}</span>
            </span>
          </div>
        </div>

        {/* Map Frame Viewport */}
        <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] bg-cream-muted">
          {/* Subtle placeholder/loading pattern */}
          {!iframeLoaded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-cream-muted text-chocolate/50 gap-2 z-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-3xl animate-spin text-cherry/60">
                progress_activity
              </span>
              <span className="text-xs font-sans">Memuat Google Maps...</span>
            </div>
          )}

          <iframe
            key={query}
            src={embedUrl}
            title={`Peta Google Maps — ${selectedLocation ? selectedLocation.name : 'Kota Cimahi'}`}
            width="100%"
            height="100%"
            className="w-full h-full border-0 relative z-10"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer Caption */}
        <div className="bg-cream px-5 py-2.5 border-t border-sage/30 flex items-center justify-between text-[11px] text-chocolate/65 font-sans">
          <span>
            {selectedLocation
              ? `Menampilkan lokasi ${selectedLocation.name}`
              : `Menampilkan ikhtisar wilayah ${activeDistrict}`}
          </span>
          <span className="text-sage-dark font-medium">Google Maps Embed</span>
        </div>
      </div>
    </div>
  );
};

export default PikRGoogleMap;
