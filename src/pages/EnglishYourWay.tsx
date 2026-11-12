import React from 'react';
import {
  PillarSyllabusView,
  type SyllabusModuleItem,
  type PhilosophyStep,
} from '../components/syllabus/PillarSyllabusView';

export const EnglishYourWay: React.FC = () => {
  const modules: SyllabusModuleItem[] = [
    {
      number: '01',
      title: 'Start Speaking',
      subtitle: 'From "I don\'t know what to say" to "I can actually speak."',
      level: 'Pemula',
      duration: '20–30 Menit',
      status: 'available',
      slug: 'start-speaking',
      targetUrl: '/pelajaran/start-speaking',
      description:
        'Kuasai pola kalimat pembuka (sentence starters), 14 ungkapan percakapan siap pakai, teknik penyelamat saat lupa kosakata, tantangan bicara 30 detik, kuis pemahaman, dan video inspiratif Marianna Pascal (TEDx).',
      highlights: [
        'Sentence starters siap pakai',
        '14 Ungkapan percakapan chunks',
        'Teknik Describe it saat lupa kata',
        'Tantangan berbicara 30 detik',
      ],
    },
    {
      number: '02',
      title: 'Speak Without Translating',
      subtitle: 'Stop mental translating; start thinking in simple English chunks.',
      level: 'Pemula-Menengah',
      duration: '25 Menit',
      status: 'coming_soon',
      description:
        'Hentikan kebiasaan menerjemahkan kata per kata di dalam kepala. Latih refleks langsung mengaitkan ide visual dengan frasa bahasa Inggris sederhana.',
    },
    {
      number: '03',
      title: 'Everyday Conversations',
      subtitle: 'School, friendships, hobbies, ordering food, and real teenage scenarios.',
      level: 'Menengah',
      duration: '30 Menit',
      status: 'coming_soon',
      description:
        'Skenario percakapan nyata dunia remaja: menanggapi cerita teman, memesan makanan santai, bercerita seputar game/musik favorit, dan mencairkan suasana canggung.',
    },
    {
      number: '04',
      title: 'Speak More Naturally',
      subtitle: 'Fillers, smooth connectors, voice tone, and natural spoken rhythm.',
      level: 'Menengah',
      duration: '25 Menit',
      status: 'coming_soon',
      description:
        'Pelajari jeda alami, konektor kalimat santai ("Actually", "To be honest", "I mean"), serta penekanan intonasi agar bicaramu terdengar luwes dan tidak kaku.',
    },
    {
      number: '05',
      title: 'Tell Your Story',
      subtitle: 'Share experiences, opinions, and personal stories with clarity.',
      level: 'Menengah-Lanjutan',
      duration: '30 Menit',
      status: 'coming_soon',
      description:
        'Seni bercerita naratif 60–90 detik: menyusun struktur awal, titik emosi, dan penutup cerita agar pendengar terpikat mendengarkan pengalamanmu.',
    },
    {
      number: '06',
      title: 'Speak with Confidence',
      subtitle: 'Forum discussions, presentations, and speaking up in global spaces.',
      level: 'Lanjutan',
      duration: '35 Menit',
      status: 'coming_soon',
      description:
        'Keberanian menyuarakan sudut pandang dalam diskusi kelompok, presentasi proyek sekolah/kampus, serta komunikasi asertif di ruang jejaring global.',
    },
  ];

  const philosophySteps: PhilosophyStep[] = [
    { label: 'UNDERSTAND', sublabel: 'Pola Pikir Berani', active: true },
    { label: 'LISTEN', sublabel: 'Tangkap Ritme Asli' },
    { label: 'SPEAK', sublabel: 'Buka Suara Lantang', active: true },
    { label: 'PRACTICE', sublabel: 'Latih Frasa Kunci' },
    { label: 'CHALLENGE', sublabel: 'Aksi Mikro Nyata', active: true },
    { label: 'REFLECT', sublabel: 'Evaluasi Diri' },
    { label: 'IMPROVE', sublabel: 'Konsistensi Bertumbuh' },
  ];

  return (
    <PillarSyllabusView
      pageTitle="English Your Way — Life Skills Academy"
      pillarBadge="PILAR 02 • GLOBAL COMMUNICATION"
      taglineBadge="ACTIVE SPOKEN ENGLISH"
      modulesCountBadge="6 Modul Terarah"
      headline="English Your Way"
      italicSubtitle="A practical English speaking journey for teenagers."
      leadDescription="Bicara Bahasa Inggris dengan santai, percaya diri, dan alami dalam situasi nyata sehari-hari. Ini bukan kursus grammar hafalan rumus kaku, melainkan ruang aman untuk melatih keberanian bersuara dan terhubung dengan dunia luar."
      philosophyTitle="Alur Pembelajaran Aktif (Active Speaking Philosophy):"
      philosophySteps={philosophySteps}
      modules={modules}
      communityCallout={{
        tag: 'English Speaking Corner • PIK-R Kota Cimahi',
        title: 'Ingin Teman Latihan Bicara Langsung?',
        description:
          'Komunitas konselor sebaya PIK-R di Kota Cimahi membuka sesi obrolan santai berbahasa Inggris tanpa takut dihakimi. Temukan titik kumpul terdekat.',
      }}
    />
  );
};

export default EnglishYourWay;
