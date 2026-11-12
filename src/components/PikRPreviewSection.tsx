import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PikRPreviewSection — "Temukan PIK-R di Kota Cimahi"
 * Approved editorial teaser from Stitch linking to /peta-pik-r.
 */
export const PikRPreviewSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream-muted border-b border-sage/40" id="peta-pikr">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Editorial Information & CTA */}
          <div className="lg:col-span-6 pr-0 lg:pr-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cherry block mb-2 font-sans">
              Direktori &amp; Ruang Aman Sebaya
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-chocolate leading-tight mb-6">
              Temukan PIK-R di Kota Cimahi
            </h2>
            <p className="text-base sm:text-lg text-chocolate/80 leading-relaxed mb-8">
              Jelajahi ruang berbagi, belajar, dan bertumbuh bersama komunitas di sekitarmu. Wadah ramah remaja untuk konseling sebaya dan edukasi kesehatan mental tanpa stigma.
            </p>
            <Link
              to="/peta-pik-r"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream font-semibold text-sm sm:text-base hover:bg-chocolate transition-all duration-200 shadow-md hover:shadow hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none motion-reduce:hover:translate-y-0"
            >
              <span>Jelajahi Peta PIK-R</span>
              <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Right Column: Stylized Clean Map Preview Container */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-cream border border-sage/50 p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden min-h-[340px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sage/30">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-chocolate font-sans">
                  <span className="material-symbols-outlined text-cherry text-base">location_on</span>
                  <span>Direktori Titik Temu Sebaya</span>
                </div>
                <span className="text-[11px] font-semibold text-sage-dark uppercase tracking-wider font-sans">
                  Kota Cimahi
                </span>
              </div>

              {/* Visual Map Placeholder with Stylized Grid & Cherry Pins */}
              <div className="relative my-6 h-44 rounded-2xl bg-sage/10 border border-sage/30 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                {/* Map Grid Pattern Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#290102_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Stylized Cherry District Chips */}
                <div className="absolute top-4 left-6 flex items-center gap-1.5 bg-cream/95 px-2.5 py-1 rounded-full shadow-sm border border-sage/40 text-[10px] font-semibold text-chocolate">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry flex-shrink-0" />
                  <span>Cimahi Selatan</span>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-cream/95 px-2.5 py-1 rounded-full shadow-sm border border-sage/40 text-[10px] font-semibold text-chocolate">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry flex-shrink-0" />
                  <span>Cimahi Tengah</span>
                </div>
                <div className="absolute top-6 right-8 flex items-center gap-1.5 bg-cream/95 px-2.5 py-1 rounded-full shadow-sm border border-sage/40 text-[10px] font-semibold text-chocolate">
                  <span className="w-1.5 h-1.5 rounded-full bg-cherry flex-shrink-0" />
                  <span>Cimahi Utara</span>
                </div>

                <span className="material-symbols-outlined text-3xl text-cherry mb-1 z-10">map</span>
                <p className="font-serif text-base font-bold text-chocolate z-10">
                  Google Maps — Coming Soon
                </p>
                <p className="text-xs text-chocolate/70 z-10 mt-0.5">
                  Integrasi navigasi interaktif titik konseling resmi.
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-sage/30 flex items-center justify-between text-xs text-chocolate/70">
                <span>Kemitraan Edukasi &amp; Komunitas Pemuda</span>
                <span className="font-semibold text-cherry">Aktif Terbuka</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
