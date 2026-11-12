import React, { useState } from 'react';

/**
 * CommunityCta — "Small steps. Stronger roots."
 * Approved closing distinctive moment in deep chocolate #290102 from Stitch.
 */
export const CommunityCta: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-chocolate text-cream relative overflow-hidden" id="daftar">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-cream/10 border border-sage/30 text-sage text-xs font-semibold tracking-wider uppercase mb-6 font-sans">
          Langkah Baru Pertumbuhanmu
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-medium tracking-tight mb-6 leading-tight">
          Small steps. <span className="italic text-cherry font-normal">Stronger roots.</span>
        </h2>

        <p className="text-base sm:text-lg text-cream/80 max-w-xl mx-auto leading-relaxed mb-10">
          Mulai dari satu langkah kecil hari ini. Bergabung bersama lingkar remaja yang saling mendukung untuk menjadi pribadi yang lebih tangguh, kritis, dan mandiri.
        </p>

        {/* Single Email Input with Ripe Cherry Button */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan alamat email aktifmu..."
            required
            className="w-full px-5 py-3.5 rounded-full bg-cream text-chocolate placeholder:text-chocolate/50 text-sm focus:outline-none focus:ring-2 focus:ring-cherry border-0 shadow-inner"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cherry text-cream font-semibold text-sm hover:bg-cream hover:text-chocolate transition-all duration-200 whitespace-nowrap shadow-md hover:shadow hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cream focus-visible:outline-none motion-reduce:hover:translate-y-0"
          >
            <span>Mulai Belajar</span>
            <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true">arrow_forward</span>
          </button>
        </form>

        {submitted && (
          <p className="text-xs sm:text-sm text-sage font-semibold animate-fade-in-up mb-4">
            ✓ Terima kasih! Cek inbox email-mu untuk panduan orientasi pertamamu.
          </p>
        )}

        <p className="text-xs text-cream/60">
          100% Gratis Modul Pengantar • Tanpa Biaya Tersembunyi
        </p>
      </div>
    </section>
  );
};
