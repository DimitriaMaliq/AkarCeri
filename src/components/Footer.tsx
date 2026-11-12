import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-chocolate text-cream pt-16 pb-12 border-t border-cherry/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/15">

          {/* Brand Summary Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link
              to="/"
              className="flex items-baseline gap-0.5 tracking-tight font-serif text-2xl font-bold mb-4 inline-flex"
              aria-label="AKAR CERI — Beranda"
            >
              <span className="text-cream">AKAR</span>
              <span className="text-cherry italic">&nbsp;CERI</span>
              <span className="inline-block w-2 h-2 rounded-full bg-cherry ml-1" />
            </Link>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed max-w-sm mb-6">
              Life Skills Academy untuk remaja dan generasi muda Indonesia. Menumbuhkan nalar kritis, literasi finansial, dan ketangguhan batin untuk hidup mandiri.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-sage font-sans">
              <span>Akademi Mandiri</span>
              <span>•</span>
              <span>Berakar &amp; Bertumbuh</span>
            </div>
          </div>

          {/* Col 2: Navigasi */}
          <div>
            <h4 className="font-serif text-sm font-bold text-cream uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-cream/70 font-medium">
              <li>
                <Link to="/" className="hover:text-cherry transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/profil" className="hover:text-cherry transition-colors">
                  Profil AKAR CERI
                </Link>
              </li>
              <li>
                <a href="#cara-belajar" className="hover:text-cherry transition-colors">
                  Cara Belajar
                </a>
              </li>
              <li>
                <Link to="/eksplorasi" className="hover:text-cherry transition-colors">
                  Kecakapan Esensial
                </Link>
              </li>
              <li>
                <Link to="/peta-pik-r" className="hover:text-cherry transition-colors">
                  Peta PIK-R Cimahi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kurikulum */}
          <div>
            <h4 className="font-serif text-sm font-bold text-cream uppercase tracking-wider mb-4">
              Kurikulum
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-cream/70 font-medium">
              <li>
                <Link to="/eksplorasi" className="hover:text-cherry transition-colors">
                  Public Speaking
                </Link>
              </li>
              <li>
                <Link to="/eksplorasi" className="hover:text-cherry transition-colors">
                  English Communication
                </Link>
              </li>
              <li>
                <Link to="/eksplorasi" className="hover:text-cherry transition-colors">
                  Money Management
                </Link>
              </li>
              <li>
                <Link to="/eksplorasi" className="hover:text-cherry transition-colors">
                  Critical Thinking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ruang Komunitas */}
          <div>
            <h4 className="font-serif text-sm font-bold text-cream uppercase tracking-wider mb-4">
              Komunitas
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-cream/70 font-medium">
              <li>
                <Link to="/peta-pik-r" className="hover:text-cherry transition-colors">
                  Titik Konseling Sebaya
                </Link>
              </li>
              <li>
                <Link to="/komunitas" className="hover:text-cherry transition-colors">
                  Mulai Bergabung
                </Link>
              </li>
              <li>
                <Link to="/sumber-belajar" className="hover:text-cherry transition-colors">
                  Panduan Remaja
                </Link>
              </li>
              <li>
                <Link to="/komunitas" className="hover:text-cherry transition-colors">
                  Pusat Tanya Jawab
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© 2025 AKAR CERI. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6">
            <Link to="/komunitas" className="hover:text-cream transition-colors">
              Ketentuan Layanan
            </Link>
            <Link to="/komunitas" className="hover:text-cream transition-colors">
              Kebijakan Privasi
            </Link>
            <Link to="/peta-pik-r" className="hover:text-cream transition-colors">
              Etika Komunitas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
