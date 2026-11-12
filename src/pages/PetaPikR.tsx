import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { pikRMockList, PIKR_DATA_DISCLAIMER, type PikRItem } from '../data/pikRData';

export const PetaPikR: React.FC = () => {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPikR, setSelectedPikR] = useState<PikRItem>(pikRMockList[0]);

  // Filter based on region and search query
  const filteredList = pikRMockList.filter((item) => {
    const matchesRegion =
      selectedKecamatan === 'semua' || item.kecamatan === selectedKecamatan;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kecamatanLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mainService.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <PageLayout title="Peta PIK-R Kota Cimahi">
      {/* ───────────────────────────────────────────────────────────
          SECTION 1: HERO (Spacious, Editorial, Search-Integrated)
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Tracked Overline Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-muted border border-sage/40 mb-6">
            <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-chocolate/75 uppercase font-sans">
              Direktori Ruang Aman • Peta PIK-R Kota Cimahi
            </span>
          </div>

          {/* Large Editorial Serif Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-chocolate font-medium tracking-tight mb-4 leading-tight">
            Temukan Ruang Berbagi &amp;{' '}
            <span className="italic text-cherry font-normal">Konseling Sebaya</span> di Dekatmu.
          </h1>

          {/* Concise Subheading */}
          <p className="text-base sm:text-lg text-chocolate/80 max-w-2xl leading-relaxed mb-8">
            Pusat Informasi dan Konseling Remaja (PIK-R) untuk konsultasi kesehatan mental, pencegahan stunting dan Triad KRR, serta eksplorasi potensi diri tanpa stigma.
          </p>

          {/* Prominent Hero Search Input */}
          <div className="w-full max-w-2xl bg-cream-muted rounded-full p-2 border border-sage/40 shadow-sm flex items-center gap-2 transition-all focus-within:shadow-md focus-within:border-cherry">
            <div className="pl-4 text-chocolate/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama PIK-R, sekolah, kelurahan, atau kecamatan di Cimahi..."
              className="w-full bg-transparent text-sm sm:text-base text-chocolate placeholder:text-chocolate/50 focus:outline-none py-2"
              aria-label="Cari titik PIK-R"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-chocolate/50 hover:text-cherry"
                aria-label="Hapus kata kunci"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
            <button
              type="button"
              className="shrink-0 bg-cherry hover:bg-chocolate text-cream text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-full flex items-center gap-1.5 transition-all shadow-sm"
              aria-label="Cari Titik"
            >
              <span>Cari Titik</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 2: LIGHTWEIGHT FILTER BAR
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sage/30 pb-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter Wilayah">
            {[
              { id: 'semua', label: 'Semua Wilayah' },
              { id: 'utara', label: 'Cimahi Utara' },
              { id: 'tengah', label: 'Cimahi Tengah' },
              { id: 'selatan', label: 'Cimahi Selatan' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedKecamatan(f.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedKecamatan === f.id
                    ? 'bg-cherry text-cream font-semibold shadow-sm'
                    : 'bg-cream-muted text-chocolate/80 hover:bg-sage/25 hover:text-chocolate border border-sage/30'
                }`}
                aria-pressed={selectedKecamatan === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right Subtle Status Label */}
          <div className="flex items-center gap-2 text-chocolate/70 text-xs font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-dark flex-shrink-0" />
            <span>Menampilkan titik percontohan terverifikasi Kota Cimahi</span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 3: MAIN MAP AREA (65% MAP / 35% SINGLE DETAIL CARD)
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT: Calm Aesthetic Cartographic Map Canvas (65% -> 8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <MapPlaceholder className="flex-grow w-full" />
          </div>

          {/* RIGHT: Selected PIK-R Panel (35% -> 4 cols, Refined Detail Card) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="h-full bg-cream-muted rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between border border-sage/40">
              <div>
                {/* Top Status Badge */}
                <div className="mb-4">
                  <span className="inline-block text-[11px] font-semibold text-chocolate/75 bg-cream px-3 py-1 rounded-full border border-sage/40 font-sans">
                    {PIKR_DATA_DISCLAIMER}
                  </span>
                </div>

                {/* Title & Location Hierarchy */}
                <h3 className="font-serif text-2xl font-bold text-chocolate tracking-tight mb-1">
                  {selectedPikR.name}
                </h3>
                <p className="text-xs sm:text-sm text-cherry font-medium mb-4">
                  {selectedPikR.institution} • {selectedPikR.kecamatanLabel}
                </p>

                {/* Brief Description */}
                <p className="text-sm text-chocolate/80 leading-relaxed mb-6">
                  {selectedPikR.description}
                </p>

                {/* Clean Info Rows */}
                <div className="space-y-4 mb-6 border-y border-sage/40 py-4 font-sans">
                  <div>
                    <span className="text-[10px] font-bold text-chocolate/60 uppercase tracking-wider block mb-0.5">
                      Waktu Layanan
                    </span>
                    <span className="text-sm font-semibold text-chocolate">
                      {selectedPikR.serviceHours}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-chocolate/60 uppercase tracking-wider block mb-0.5">
                      Layanan Utama
                    </span>
                    <span className="text-sm font-semibold text-chocolate">
                      {selectedPikR.mainService}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions & Verification Note */}
              <div>
                <div className="flex flex-col gap-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Informasi detail untuk "${selectedPikR.name}" akan dibuka setelah sinkronisasi data resmi.`);
                    }}
                    className="w-full bg-cherry hover:bg-chocolate text-cream font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <span>Lihat Detail Titik</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                  <a
                    href="#map"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Navigasi Google Maps akan aktif pada fase integrasi peta interaktif.');
                    }}
                    className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-chocolate/70 hover:text-cherry transition-colors py-1.5"
                  >
                    <span>Petunjuk Arah (Google Maps) →</span>
                  </a>
                </div>
                <p className="text-[11px] text-chocolate/60 text-center leading-normal">
                  Data resmi akan diverifikasi bersama lembaga terkait.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 4: DIRECTORY RESULT LIST (Clean Airy Horizontal Rows)
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-cream-muted rounded-2xl p-6 sm:p-8 border border-sage/40">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-sage/30">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-chocolate font-bold">
                Pratinjau Indeks Titik Konseling Remaja
              </h4>
              <p className="text-xs sm:text-sm text-chocolate/70 mt-1">
                Menampilkan PIK-R berdasarkan wilayah yang kamu pilih. Klik baris untuk melihat pratinjau di panel atas.
              </p>
            </div>
            <span className="text-xs font-semibold text-cherry font-sans">
              {filteredList.length} titik percontohan
            </span>
          </div>

          {/* Clean Airy Horizontal Rows */}
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-sm text-chocolate/60">
              Tidak ada hasil yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="divide-y divide-sage/30">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPikR(item)}
                  className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 rounded-xl transition-all cursor-pointer ${
                    selectedPikR.id === item.id
                      ? 'bg-cream border border-cherry/30 shadow-sm'
                      : 'hover:bg-cream/60'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPikR(item);
                    }
                  }}
                  aria-label={`Pilih ${item.name}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm sm:text-base text-chocolate font-bold">
                        {item.name}
                      </p>
                      {selectedPikR.id === item.id && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cherry text-cream font-sans">
                          Dipilih
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-chocolate/70 mt-0.5">
                      {item.institution} • {item.kecamatanLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-chocolate/70">
                    <span className="text-sage-dark">[Contoh Data]</span>
                    <span className="text-cherry text-base">→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 5: "APA ITU PIK-R?" SECTION (Generous Whitespace, Editorial)
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start py-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sage-dark font-sans">
              Fondasi Pengetahuan
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate tracking-tight mb-6 font-medium">
            Apa itu PIK-R?
          </h2>

          <div className="space-y-4 text-chocolate/80 text-base sm:text-lg leading-relaxed">
            <p>
              Pusat Informasi dan Konseling Remaja (PIK-R) adalah wadah yang dikembangkan dari, oleh, dan untuk remaja guna memberikan pelayanan informasi dan konseling mengenai perencanaan kehidupan berkeluarga bagi remaja serta kegiatan-kegiatan penunjang lainnya.
            </p>
            <p>
              Diinisiasi di bawah naungan BKKBN bersama sekolah dan komunitas, PIK-R hadir dengan prinsip kerahasiaan penuh, bebas penghakiman, dan mengedepankan pendekatan teman sebaya (peer counseling) yang nyaman bagi anak muda dalam merumuskan jalan hidup yang sehat dan bermakna.
            </p>
          </div>

          <div className="mt-6">
            <a
              href="#kurikulum"
              onClick={(e) => {
                e.preventDefault();
                alert('Dokumen panduan dan pedoman fasilitator konseling remaja akan tersedia pada modul Sumber Belajar.');
              }}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-cherry hover:text-chocolate transition-colors"
            >
              <span>Pelajari pedoman dan kurikulum konseling remaja →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 6: CLOSING COLLABORATION CTA (Bold Inverted Chocolate Container)
      ─────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-chocolate text-cream rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Decorative Glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cherry/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream/10 text-sage text-xs font-semibold tracking-widest uppercase mb-6 font-sans border border-sage/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
              Kolaborasi Terbuka
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight mb-4 font-medium leading-tight">
              Komunitas atau Sekolahmu Punya PIK-R?
            </h2>

            <p className="text-base sm:text-lg text-cream/80 leading-relaxed mb-8">
              Bantu kami memperbarui dan melengkapi direktori informasi PIK-R di Kota Cimahi agar semakin banyak kawan sebaya mendapatkan akses ruang aman yang suportif.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  alert('Formulir pendaftaran dan pembaruan data PIK-R akan segera dibuka.');
                }}
                className="bg-cherry hover:bg-cream hover:text-chocolate text-cream text-sm font-semibold px-7 py-3.5 rounded-full shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Informasikan PIK-R</span>
                <span className="material-symbols-outlined text-base">add_location_alt</span>
              </button>
              <a
                href="#apa-itu-pikr"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-cream/80 hover:text-cream text-sm font-semibold transition-colors px-3 py-3"
              >
                <span>Pelajari cara kerja Peta PIK-R</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PetaPikR;
