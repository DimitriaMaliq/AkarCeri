/**
 * AKAR CERI — Core Skills Data
 * Clean typography-first dataset (no stock photos or decorative illustrations per brief).
 */

export interface SkillItem {
  id: string;
  pilar: string;
  title: string;
  category: string;
  description: string;
  modulesCount: number;
  badge?: string;
}

export const skillsData: SkillItem[] = [
  {
    id: 'public-speaking',
    pilar: '01',
    title: 'Public Speaking & Communication',
    category: 'Public Speaking & Vokal',
    description:
      'Seni bicara percaya diri dan menyusun argumen tanpa cemas di depan audiens kelas, forum, maupun presentasi profesional.',
    modulesCount: 4,
    badge: 'Pilar Utama',
  },
  {
    id: 'english-your-way',
    pilar: '02',
    title: 'English, Your Way',
    category: 'Global Communication',
    description:
      'Percakapan santai sehari-hari tanpa terjebak grammar kaku. Berani berpendapat secara artikulatif dalam jejaring global.',
    modulesCount: 6,
    badge: 'Populer',
  },
  {
    id: 'money-matters',
    pilar: '03',
    title: 'Money Matters',
    category: 'Literasi Finansial Remaja',
    description:
      'Kelola uang saku, hindari jebakan konsumtif, dan bangun literasi finansial mandiri tanpa rasa bingung atau cemas.',
    modulesCount: 14,
    badge: 'Terlaris',
  },
  {
    id: 'know-yourself',
    pilar: '04',
    title: 'Know Yourself',
    category: 'Regulasi Emosi & Mindset',
    description:
      'Kenali overthinking, bangun boundaries sehat, dan kelola stres ujian serta dinamika pertemanan.',
    modulesCount: 11,
  },
  {
    id: 'think-beyond',
    pilar: '05',
    title: 'Think Beyond',
    category: 'Critical Thinking & Logika',
    description:
      'Filter misinformasi medsos, deteksi logical fallacies, dan ambil keputusan rasional di tengah tren.',
    modulesCount: 15,
    badge: 'Baru',
  },
  {
    id: 'real-world-readiness',
    pilar: '06',
    title: 'Real-World Readiness',
    category: 'Kemandirian & Adulting',
    description:
      'Navigasi administrasi praktis, persiapan magang pertama, etika email profesional, dan resiliensi menghadapi perubahan.',
    modulesCount: 12,
    badge: 'Esensial',
  },
];
