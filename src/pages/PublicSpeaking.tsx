import React from 'react';
import {
  PillarSyllabusView,
  type SyllabusModuleItem,
  type PhilosophyStep,
} from '../components/syllabus/PillarSyllabusView';

export const PublicSpeaking: React.FC = () => {
  const philosophySteps: PhilosophyStep[] = [
    {
      label: 'Berani Bicara',
      sublabel: 'Finding Confidence',
      active: true,
    },
    {
      label: 'Menyampaikan Ide',
      sublabel: 'Organizing Ideas',
      active: true,
    },
    {
      label: 'Bicara di Depan Orang',
      sublabel: 'Speaking to an Audience',
    },
    {
      label: 'Bicara yang Meyakinkan',
      sublabel: 'Influencing through Communication',
    },
  ];

  const modules: SyllabusModuleItem[] = [
    {
      number: '01',
      title: 'Berani Bicara',
      subtitle: 'Memahami akar kecemasan, menata pernapasan vokal, dan mulai berani membuka suara.',
      level: 'Pemula',
      duration: '15–20 Menit',
      status: 'available',
      slug: 'berani-bicara',
      targetUrl: '/pelajaran/berani-bicara',
      description:
        'Rasa gugup sebelum berbicara bukanlah tanda kelemahan, melainkan pelepasan adrenalin alami. Pelajari biologi di balik suara bergetar, teknik pernapasan diafragma 4-4-4, simpanan wawasan Julian Treasure (TED), serta tuntaskan tantangan perkenalan 60 detik.',
      focusPoints: [
        'Overcoming nervousness & berdamai dengan rasa cemas',
        'Understanding your speaking habits & tanda fisik tubuh',
        'Preparing your voice dengan Vocal Toolkit praktis',
        'Introducing yourself confidently (Tantangan 60 Detik)',
        'Building the habit of speaking & target bicara 7 hari',
      ],
    },
    {
      number: '02',
      title: 'Menyampaikan Ide',
      subtitle: 'Menata pikiran agar gagasanmu tersampaikan secara runtut, lugas, dan mudah dipahami.',
      level: 'Pemula-Menengah',
      duration: '20 Menit',
      status: 'available',
      slug: 'menyampaikan-ide',
      targetUrl: '/pelajaran/menyampaikan-ide',
      description:
        'Banyak gagasan cemerlang gagal dipahami karena disampaikan tanpa struktur yang jelas. Modul ini melatih cara memisahkan pesan inti dari detail pendukung, merangkai formula Point → Reason → Example, serta menjelaskan ide rumit dengan analogi sederhana.',
      focusPoints: [
        'Finding the main message (menemukan pesan inti)',
        'Separating main ideas and supporting ideas',
        'Structuring thoughts simply (Point → Reason → Example)',
        'Explaining an idea clearly tanpa berbelit-belit',
        '60-Second Challenge untuk menguji kejelasan struktur',
      ],
    },
    {
      number: '03',
      title: 'Bicara di Depan Orang',
      subtitle: 'Menguasai panggung, kontak mata, dan dinamika perhatian audiens di ruang tatap muka.',
      level: 'Menengah',
      duration: '25 Menit',
      status: 'coming_soon',
      description:
        'Berbicara di hadapan kelas atau audiens menuntut kesadaran ruang dan kehadiran diri (presence). Pelajari cara membagi tatapan mata, mengolah bahasa tubuh terbuka, menyapa audiens secara natural, serta meredakan ketegangan sorot perhatian orang banyak.',
      focusPoints: [
        'Speaking in front of an audience di kelas & forum',
        'Presentation fundamentals & penataan alur panggung',
        'Audience awareness & pembagian kontak mata natural',
        'Delivery and presence (bahasa tubuh & postur asertif)',
        'Handling attention while speaking tanpa panik',
      ],
    },
    {
      number: '04',
      title: 'Bicara yang Meyakinkan',
      subtitle: 'Seni bercerita, membangun kredibilitas, dan menggerakkan tindakan pendengar.',
      level: 'Lanjutan',
      duration: '30 Menit',
      status: 'coming_soon',
      description:
        'Komunikasi tingkat tinggi adalah saat kata-katamu diingat dan mampu mempengaruhi keputusan orang lain. Kuasai kerangka storytelling naratif, etika membangun kredibilitas (ethos, pathos, logos), serta cara menutup pembicaraan yang berkesan mendalam.',
      focusPoints: [
        'Persuasive communication (mempengaruhi secara etis)',
        'Storytelling framework & kekuatan narasi pribadi',
        'Building credibility & kehangatan wibawa',
        'Communicating with impact & daya ingat pesan',
        'Making people understand and remember your message',
      ],
    },
  ];

  return (
    <PillarSyllabusView
      pageTitle="Public Speaking & Communication — Life Skills Academy"
      pillarBadge="PILAR 01 • PUBLIC SPEAKING & COMMUNICATION"
      taglineBadge="SPOKEN CONFIDENCE & PERSUASION"
      modulesCountBadge="4 Modul Terarah"
      headline="Public Speaking & Communication"
      italicSubtitle="Learn to express your thoughts clearly, confidently, and convincingly — from finding your voice to delivering ideas that people understand and remember."
      leadDescription="Kecakapan berbicara bukan bakat bawaan segelintir orang, melainkan keterampilan terapan yang bisa dilatih langkah demi langkah. Bergeraklah dari mengatasi rasa gugup, menyusun gagasan yang runtut, berbicara di hadapan audiens, hingga menggerakkan orang lain melalui komunikasi yang meyakinkan."
      philosophyTitle="Alur Perjalanan Pembelajaran (Learning Progression):"
      philosophySteps={philosophySteps}
      modules={modules}
      communityCallout={{
        tag: 'Latihan Nyata • PIK-R Kota Cimahi',
        title: 'Latihan Bicara di Hadapan Kawan Sebaya',
        description:
          'Ingin melatih teknik vokal atau simulasi berbicara di ruang yang aman dan bebas penghakiman? Pos konseling sebaya PIK-R di Kota Cimahi siap menjadi kawan pendengar dan ruang latih bicaramu.',
      }}
    />
  );
};

export default PublicSpeaking;

