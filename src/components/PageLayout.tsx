import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  React.useEffect(() => {
    if (title) {
      document.title = `${title} — AKAR CERI`;
    }
  }, [title]);

  return (
    <div className="min-h-screen bg-cream text-chocolate font-sans antialiased flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};
