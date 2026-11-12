import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { ProfileSection } from '../components/ProfileSection';
import { LearningApproachSection } from '../components/LearningApproachSection';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <PageLayout title="Profil AKAR CERI">
      {/* Editorial Hero Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-muted border border-sage/40 text-chocolate mb-4">
            <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" />
            <span className="text-[11px] font-bold text-cherry tracking-widest uppercase font-sans">
              Mengenal Inisiatif
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-4">
            Profil <span className="italic text-cherry font-normal">AKAR CERI</span>
          </h1>
          <p className="text-base sm:text-lg text-chocolate/80 max-w-2xl leading-relaxed">
            Inisiatif pembelajaran kecakapan hidup modern berbasis ketahanan mental, literasi relasi, dan penjelajahan potensi generasi muda Indonesia secara mandiri dan empatik.
          </p>
        </div>
      </section>

      {/* Core Profile Section: Kenalan dengan AKAR CERI (01, 02, 03 Values) */}
      <ProfileSection />

      {/* Learning Flow Section: 01 Kenali, 02 Latih, 03 Terapkan */}
      <LearningApproachSection />

      {/* PIK-R Collaboration Section */}
      <section className="py-20 bg-cream border-b border-sage/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-chocolate text-cream p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-sage block mb-2 font-sans">
                Kemitraan Ruang Aman
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream font-medium mb-4 leading-tight">
                Bermitra Bersama Jejaring PIK-R Kota Cimahi
              </h2>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                AKAR CERI menghubungkan materi kecakapan hidup dengan pos konseling sebaya nyata di lingkungan sekolah dan masyarakat untuk menjamin setiap remaja memiliki tempat bercerita tanpa stigma.
              </p>
            </div>
            <Link
              to="/peta-pik-r"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream text-sm sm:text-base font-semibold hover:bg-cream hover:text-chocolate transition-colors shrink-0 shadow-md"
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span>Jelajahi Peta PIK-R</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
