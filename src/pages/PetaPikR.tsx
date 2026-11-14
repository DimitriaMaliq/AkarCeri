import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { PikRGoogleMap } from '../components/PikRGoogleMap';
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
  isSelected: boolean;
  onSelect: (location: PikRLocation) => void;
}

const PikRCard: React.FC<PikRCardProps> = ({
  location,
  index,
  isSelected,
  onSelect,
}) => {
  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.name}, ${location.school}, ${location.address}`
  )}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(location)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(location);
        }
      }}
      className={`group relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col gap-3.5 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-cherry ${
        isSelected
          ? 'bg-cream border-2 border-cherry ring-2 ring-cherry/20 shadow-md -translate-y-0.5'
          : 'bg-cream-muted border border-sage/40 hover:border-cherry/60 hover:bg-cream hover:-translate-y-0.5 shadow-sm'
      }`}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      {/* Top Header: Ordinal & Selection Status */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-serif text-3xl sm:text-4xl font-bold leading-none select-none transition-colors ${
            isSelected ? 'text-cherry' : 'text-cherry/30 group-hover:text-cherry/50'
          }`}
        >
          {location.ordinal}
        </span>

        <div className="flex items-center gap-1.5">
          {isSelected ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cherry text-cream text-[10px] font-bold uppercase tracking-wider font-sans shadow-sm">
              <span className="material-symbols-outlined text-xs" aria-hidden="true">
                check
              </span>
              <span>Terpilih di Peta</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage/20 text-chocolate/70 text-[10px] font-bold uppercase tracking-wider font-sans group-hover:bg-sage/35 transition-colors">
              <span>Klik untuk Lihat</span>
            </span>
          )}
        </div>
      </div>

      {/* Name & School */}
      <div>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate leading-tight mb-1 group-hover:text-cherry transition-colors">
          {location.name}
        </h3>
        <p className="text-xs font-semibold text-chocolate/65 font-sans uppercase tracking-wide">
          {location.school}
        </p>
      </div>

      {/* District Badge */}
      <span className="self-start px-2.5 py-0.5 rounded-full bg-sage/25 text-chocolate text-[11px] font-bold border border-sage/40 font-sans tracking-wide uppercase">
        {location.district}
      </span>

      {/* Address */}
      <div className="flex items-start gap-2 text-chocolate/75 text-xs font-sans">
        <span
          className="material-symbols-outlined text-base text-cherry/60 mt-0.5 flex-shrink-0"
          aria-hidden="true"
        >
          location_on
        </span>
        <p className="leading-relaxed">{location.address}</p>
      </div>

      {/* Card Action Footer */}
      <div className="mt-auto pt-3 border-t border-sage/30 flex items-center justify-between gap-2 text-xs font-sans">
        <span
          className={`inline-flex items-center gap-1 font-semibold ${
            isSelected ? 'text-cherry font-bold' : 'text-chocolate/60 group-hover:text-cherry'
          }`}
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            {isSelected ? 'pin_drop' : 'map'}
          </span>
          <span>{isSelected ? 'Fokus Aktif' : 'Lihat Lokasi'}</span>
        </span>

        <a
          href={externalMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-chocolate/55 hover:text-cherry transition-colors"
          aria-label={`Buka ${location.name} di tab Google Maps baru`}
        >
          <span>Google Maps</span>
          <span className="material-symbols-outlined text-xs" aria-hidden="true">
            open_in_new
          </span>
        </a>
      </div>
    </div>
  );
};

// ─── Empty State ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  district: PikRDistrict;
}

const EmptyState: React.FC<EmptyStateProps> = ({ district }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 rounded-3xl bg-cream-muted border border-sage/40 text-center animate-fade-in-up">
    <span
      className="material-symbols-outlined text-5xl text-sage mb-3"
      aria-hidden="true"
    >
      location_searching
    </span>
    <p className="font-serif text-xl text-chocolate/70 mb-2 font-medium">
      Belum ada lokasi dalam daftar.
    </p>
    <p className="text-sm text-chocolate/55 font-sans max-w-sm leading-relaxed">
      Wilayah <span className="font-semibold text-chocolate/80">{district}</span> saat ini
      belum memiliki data PIK-R yang terdaftar. Peta di samping menampilkan ikhtisar geografis wilayah.
    </p>
  </div>
);

// ─── Main Page Component ──────────────────────────────────────────────────────

export const PetaPikR: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<PikRDistrict>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<PikRLocation | null>(
    pikRLocations[0]
  );

  // Compute filtered list based on selected district
  const filteredLocations: PikRLocation[] =
    activeDistrict === 'Semua'
      ? pikRLocations
      : pikRLocations.filter((loc) => loc.district === activeDistrict);

  // Handle district filter change with synchronized map state
  const handleDistrictChange = (district: PikRDistrict) => {
    setActiveDistrict(district);
    const newFiltered =
      district === 'Semua'
        ? pikRLocations
        : pikRLocations.filter((loc) => loc.district === district);

    if (newFiltered.length === 0) {
      // Empty district (e.g. Cimahi Utara) -> map displays district overview
      setSelectedLocation(null);
    } else {
      // If currently selected location is in the new filter, keep it; otherwise select first
      const existsInNew = selectedLocation
        ? newFiltered.some((loc) => loc.id === selectedLocation.id)
        : false;
      if (!existsInNew) {
        setSelectedLocation(newFiltered[0]);
      }
    }
  };

  const handleSelectLocation = (loc: PikRLocation) => {
    setSelectedLocation(loc);
  };

  return (
    <PageLayout title="Peta PIK-R Kota Cimahi">

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 1: HERO
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
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
          SECTION 2: FILTER & DIRECTORY + MAP INTEGRATION
      ────────────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage/30 pb-5 mb-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter Wilayah">
            {PIK_R_FILTER_OPTIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleDistrictChange(f.id)}
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

          <div className="flex items-center gap-2 text-xs font-sans text-chocolate/70">
            <span className="w-2 h-2 rounded-full bg-cherry shrink-0" aria-hidden="true" />
            <span>
              Menampilkan <strong className="text-cherry">{filteredLocations.length}</strong>{' '}
              lokasi {activeDistrict !== 'Semua' ? `di ${activeDistrict}` : 'di Kota Cimahi'}
            </span>
          </div>
        </div>

        {/* Desktop: Side-by-side (Cards on Left, Google Maps on Right)
            Mobile: Stacked (Google Maps on Top, Cards Below) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Right Column (Mobile: order-1 on top, Desktop: order-2 on right, sticky) */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24">
            <PikRGoogleMap
              selectedLocation={selectedLocation}
              activeDistrict={activeDistrict}
            />
          </div>

          {/* Left Column (Mobile: order-2 below, Desktop: order-1 on left) */}
          <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
                Daftar PIK-R
              </h3>
              <span className="text-xs text-chocolate/60 font-sans">
                {filteredLocations.length} titik ditemukan
              </span>
            </div>

            {filteredLocations.length === 0 ? (
              <EmptyState district={activeDistrict} />
            ) : (
              <div className="flex flex-col gap-4">
                {filteredLocations.map((loc, i) => (
                  <PikRCard
                    key={loc.id}
                    location={loc}
                    index={i}
                    isSelected={selectedLocation?.id === loc.id}
                    onSelect={handleSelectLocation}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 3: APA ITU PIK-R?
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
          SECTION 4: CLOSING CTA
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
