import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Link } from 'react-router-dom';

const Community: React.FC = () => {
  return (
    <PageLayout title="Komunitas AKAR CERI">
      {/* Hero Header */}
      <section className="bg-grid-paper py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cherry" />
            <span className="text-xs font-bold text-cherry tracking-widest uppercase font-sans">
              Ruang Tumbuh Bersama
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-chocolate leading-tight mb-4">
            Komunitas <span className="italic text-cherry font-normal">AKAR CERI</span>
          </h1>
          <p className="text-base sm:text-lg text-chocolate/75 max-w-2xl leading-relaxed">
            Wadah sebaya yang aman, inklusif, dan saling menguatkan. Berbagi pengalaman, berdiskusi topik kehidupan nyata, dan terhubung dengan kawan sefrekuensi di Kota Cimahi.
          </p>
        </div>
      </section>

      {/* Community Features & Placeholder */}
      <section className="py-16 bg-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: 'forum',
                title: 'Peer Discussion Circles',
                desc: 'Ruang diskusi tematik mingguan seputar tantangan nyata remaja: persiapan karir, boundaries pertemanan, dan manajemen ekspektasi.',
                tag: 'Tatap Muka & Daring',
              },
              {
                icon: 'psychology',
                title: 'Konseling Sebaya PIK-R',
                desc: 'Akses langsung ke jejaring konselor sebaya terlatih di Kota Cimahi. Rahasia, bebas biaya, dan tanpa stigma.',
                tag: 'Bermitra PIK-R',
              },
              {
                icon: 'handshake',
                title: 'Kolaborasi Proyek Sosial',
                desc: 'Kembangkan inisiatif bersama untuk menebar dampak positif di lingkungan sekolah, kampus, maupun masyarakat sekitar.',
                tag: 'Aksi Nyata',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-cream-muted border border-sage/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-sage/30 text-chocolate flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cherry mb-1 block">
                  {item.tag}
                </span>
                <h3 className="font-serif text-xl font-medium text-chocolate mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-chocolate/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Registration / Coming Soon Card */}
          <div className="rounded-2xl bg-cream-muted border-2 border-dashed border-sage/50 p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-5xl text-chocolate/30 mb-4">groups_2</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-chocolate mb-3">
              Pendaftaran Cohort Baru Segera Dibuka
            </h2>
            <p className="text-sm text-chocolate/70 max-w-lg mx-auto leading-relaxed mb-6">
              Sesi onboarding komunitas AKAR CERI akan dibuka serentak bersama jejaring PIK-R Kota Cimahi. Ikuti terus informasinya melalui kanal resmi kami.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/peta-pik-r"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cherry text-cream text-sm font-semibold hover:bg-chocolate transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">map</span>
                <span>Temukan PIK-R Terdekat</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream border border-chocolate/20 text-chocolate text-sm font-semibold hover:bg-sage/20 transition-colors"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Community;
