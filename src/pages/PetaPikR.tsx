import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { MapPlaceholder } from '../components/MapPlaceholder';
import {
  pikRLocations,
  PIK_R_FILTER_OPTIONS,
  type PikRLocation,
  type PikRDistrict,
} from '../data/pikRData';

// ─── Location Card ───────────────────────────────────────────────────────────

interface PikRCardProps {
  location: PikRLocation;
  index: number;
}

const PikRCard: React.FC<PikRCardProps> = ({ location, index }) => (
  <div
    className="group relative rounded-3xl bg-cream-muted border border-sage/40 p-6 sm:p-8
               hover:border-cherry hover:bg-cream hover:-translate-y-1
               shadow-sm hover:shadow-md transition-all duration-300
               flex flex-col gap-4 animate-fade-in-up"
    style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
  >
    {/* Ordinal Number */}
    <span className="font-serif text-4xl sm:text-5xl font-bold text-cherry/25 leading-none select-none">
      {location.ordinal}
    </span>

    {/* Name & School */}
    <div>
      <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate leading-tight mb-1">
        {location.name}
      </h3>
      <p className="text-xs font-semibold text-chocolate/65 font-sans uppercase tracking-wide">
        {location.school}
      </p>
    </div>

    {/* District Badge */}
    <span className="self-start px-3 py-1 rounded-full bg-sage/25 text-chocolate text-[11px]
                     font-bold border border-sage/40 font-sans tracking-wide uppercase">
      {location.district}
    </span>

    {/* Address */}
    <div className="flex items-start gap-2 text-chocolate/75">
      <span
        className="material-symbols-outlined text-base text-cherry/60 mt-0.5 flex-shrink-0"
        aria-hidden="true"
      >
        location_on
      </span>
      <p className="text-xs leading-relaxed font-sans">{location.address}</p>
    </div>

    {/* Lihat Lokasi — disabled until Google Maps integration */}
    <div className="mt-auto pt-2 border-t border-sage/30 flex items-center justify-between">
      <button
        type="button"
        disabled
        aria-label="Navigasi belum tersedia"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate/40
                   cursor-not-allowed select-none font-sans"
      >
        <span className="material-symbols-outlined text-sm">map</span>
        <span>Lihat Lokasi</span>
      </button>
      <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate/35 font-sans">
        Segera Hadir
      </span>
    </div>
  </div>
);

// ─── Empty State ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  district: PikRDistrict;
}

const EmptyState: React.FC<EmptyStateProps> = ({ district }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
    <span
      className="material-symbols-outlined text-5xl text-sage mb-4"
      aria-hidden="true"
    >
      location_searching
    </span>
    <p className="font-serif text-xl text-chocolate/60 mb-2">Belum ada lokasi dalam daftar.</p>
    {district !== 'Semua' && (
      <p className="text-sm text-chocolate/50 font-sans max-w-xs">
        Wilayah <span className="font-semibold text-chocolate/70">{district}</span> belum
        memiliki data PIK-R yang tersedia. Informasi akan diperbarui secara berkala.
      </p>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export const PetaPikR: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<PikRDistrict>('Semua');

  const filteredLocations: PikRLocation[] =
    activeDistrict === 'Semua'
      ? pikRLocations
      : pikRLocations.filter((loc) => loc.district === activeDistrict);

  return (
    <PageLayout title="Peta PIK-R Kota Cimahi">

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 1: HERO
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-muted border border-sage/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-widest text-chocolate/75 uppercase font-sans">
              Direktori Ruang Aman · Peta PIK-R Kota Cimahi
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-chocolate font-medium tracking-tight mb-5 leading-tight">
            Temukan PIK-R{' '}
            <span className="italic text-cherry font-normal">di Sekitarmu</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-chocolate/80 max-w-2xl leading-relaxed mb-8">
            Temukan PIK-R di sekitar Kota Cimahi dan kenali ruang yang dapat menjadi tempat
            remaja belajar, bertumbuh, dan berjejaring.
          </p>

          {/* Stats Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cream-muted border border-sage/40 shadow-sm">
            <span className="font-serif text-2xl font-bold text-cherry">8</span>
            <span className="text-sm text-chocolate/70 font-sans">
              lokasi dalam daftar AKAR CERI
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 2: MAP PLACEHOLDER (future Google Maps)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <MapPlaceholder className="w-full" />
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 3: FILTER BAR + DIRECTORY GRID
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">

        {/* Filter bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4
                     border-b border-sage/30 pb-5 mb-8"
        >
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter Wilayah">
            {PIK_R_FILTER_OPTIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveDistrict(f.id)}
                aria-pressed={activeDistrict === f.id}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeDistrict === f.id
                    ? 'bg-cherry text-cream font-semibold shadow-sm'
                    : 'bg-cream-muted text-chocolate/80 hover:bg-sage/25 hover:text-chocolate border border-sage/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-cherry font-sans shrink-0">
            {filteredLocations.length} lokasi
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredLocations.length === 0 ? (
            <EmptyState district={activeDistrict} />
          ) : (
            filteredLocations.map((loc, i) => (
              <PikRCard key={loc.id} location={loc} index={i} />
            ))
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 4: APA ITU PIK-R?
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col py-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-dark font-sans mb-2">
            Fondasi Pengetahuan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate tracking-tight mb-6 font-medium">
            Apa itu PIK-R?
          </h2>
          <div className="space-y-4 text-chocolate/80 text-base sm:text-lg leading-relaxed">
            <p>
              Pusat Informasi dan Konseling Remaja (PIK-R) adalah wadah yang dikembangkan dari,
              oleh, dan untuk remaja guna memberikan pelayanan informasi dan konseling mengenai
              perencanaan kehidupan berkeluarga bagi remaja serta kegiatan-kegiatan penunjang
              lainnya.
            </p>
            <p>
              Diinisiasi di bawah naungan BKKBN bersama sekolah dan komunitas, PIK-R hadir
              dengan prinsip kerahasiaan penuh, bebas penghakiman, dan mengedepankan pendekatan
              teman sebaya (peer counseling) yang nyaman bagi anak muda dalam merumuskan jalan
              hidup yang sehat dan bermakna.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 5: CLOSING CTA
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-chocolate text-cream rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Decorative glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cherry/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream/10 text-sage text-xs font-semibold tracking-widest uppercase mb-6 font-sans border border-sage/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
              Kolaborasi Terbuka
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight mb-4 font-medium leading-tight">
              Komunitas atau Sekolahmu Punya PIK-R?
            </h2>

            <p className="text-base sm:text-lg text-cream/80 leading-relaxed mb-8">
              Bantu kami memperbarui dan melengkapi direktori informasi PIK-R di Kota Cimahi
              agar semakin banyak kawan sebaya mendapatkan akses ruang aman yang suportif.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  alert('Formulir pendaftaran dan pembaruan data PIK-R akan segera dibuka.');
                }}
                className="bg-cherry hover:bg-cream hover:text-chocolate text-cream text-sm
                           font-semibold px-7 py-3.5 rounded-full shadow-md transition-all
                           hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Informasikan PIK-R</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  add_location_alt
                </span>
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-cream/80 hover:text-cream
                           text-sm font-semibold transition-colors px-3 py-3"
              >
                <span>Pelajari cara kerja Peta PIK-R</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default PetaPikR;
