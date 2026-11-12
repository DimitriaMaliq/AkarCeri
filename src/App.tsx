import React from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ProfileSection } from './components/ProfileSection';
import { LearningApproachSection } from './components/LearningApproachSection';
import { LifeSkillsPreviewSection } from './components/LifeSkillsPreviewSection';
import { PikRPreviewSection } from './components/PikRPreviewSection';
import { CommunityCta } from './components/CommunityCta';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  React.useEffect(() => {
    document.title = 'AKAR CERI — Life Skills Academy untuk Generasi Masa Depan';
  }, []);

  return (
    <div className="min-h-screen bg-cream text-chocolate font-sans antialiased flex flex-col">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navbar */}
      <Navbar />

      <main className="flex-grow" role="main">
        {/* 3. Hero — "Belajar kecakapan hidup nyata, bertumbuh dengan caramu." */}
        <HeroSection />

        {/* 4. Marquee Running Text Separator */}
        <MarqueeTicker />

        {/* 5. Profil AKAR CERI — "Kenalan dengan AKAR CERI" (Zero boxed cards) */}
        <ProfileSection />

        {/* 6. Cara Belajar — 01 Kenali, 02 Latih, 03 Terapkan */}
        <LearningApproachSection />

        {/* 7. Kurikulum Pilihan — 3 Core Skills Preview + Link to Explore */}
        <LifeSkillsPreviewSection />

        {/* 8. Peta PIK-R Preview — "Temukan PIK-R di Kota Cimahi" */}
        <PikRPreviewSection />

        {/* 9. Community Closing CTA — "Small steps. Stronger roots." */}
        <CommunityCta />
      </main>

      {/* 10. Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
