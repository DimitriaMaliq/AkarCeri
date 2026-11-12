import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { skillsData } from '../data/skillsData';

export const Explore: React.FC = () => {
  return (
    <PageLayout title="Eksplorasi Life Skills">
      {/* Hero Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-muted border border-sage/40 text-chocolate mb-4">
            <span className="w-2 h-2 rounded-full bg-cherry animate-pulse" />
            <span className="text-[11px] font-bold text-cherry tracking-widest uppercase font-sans">
              Kurikulum Inti
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-4">
            Eksplorasi <span className="italic text-cherry font-normal">Life Skills</span>
          </h1>
          <p className="text-base sm:text-lg text-chocolate/75 max-w-2xl leading-relaxed">
            Fondasi nyata untuk menghadapi dunia luar. Didesain berbasis kasus konkrit tanpa beban hafalan kaku.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skillsData.map((skill) => (
              <div
                key={skill.id}
                className="group flex flex-col rounded-2xl bg-cream-muted p-7 border border-sage/40 shadow-sm hover:border-cherry/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-sage/25 text-chocolate text-[11px] font-bold uppercase tracking-wider border border-sage/40 font-sans">
                    Pilar {skill.pilar}
                  </span>
                  <div className="flex items-center gap-2">
                    {skill.badge && (
                      <span className="text-[10px] font-bold text-cherry px-2 py-0.5 rounded-full bg-cherry/10 border border-cherry/20 font-sans">
                        {skill.badge}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-chocolate/60 font-sans">
                      {skill.modulesCount} Modul
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-chocolate mb-1 leading-snug">
                  {skill.title}
                </h3>
                <p className="text-xs text-cherry font-semibold mb-3 uppercase tracking-wide font-sans">
                  {skill.category}
                </p>
                <p className="text-sm text-chocolate/80 leading-relaxed mb-6 flex-grow">
                  {skill.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-sage/30 text-xs font-semibold">
                  <span className="text-chocolate/60 font-sans">Skenario Praktis</span>
                  <Link
                    to={`/pelajaran/${skill.id}`}
                    className="inline-flex items-center gap-1.5 text-cherry hover:text-chocolate transition-colors group-hover:translate-x-1 transition-transform font-sans"
                  >
                    <span>Mulai Belajar</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* District Link Bottom Banner */}
          <div className="rounded-2xl bg-cream-muted border border-sage/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-xl font-bold text-chocolate mb-1">
                Ingin konsultasi seputar topik di atas?
              </h4>
              <p className="text-xs sm:text-sm text-chocolate/70">
                Temukan pos konselor sebaya PIK-R terdekat di wilayah Kota Cimahi.
              </p>
            </div>
            <Link
              to="/peta-pik-r"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cherry text-cream text-xs sm:text-sm font-semibold hover:bg-chocolate transition-colors shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span>Buka Peta PIK-R</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Explore;
