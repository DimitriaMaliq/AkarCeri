/**
 * AKAR CERI — Lesson Data Architecture & Module Registry
 *
 * Provides typed schemas for lessons, interactive modules, video lessons,
 * micro-challenges, quizzes, reflections, and source references.
 */

export interface LessonVideo {
  speaker: string;
  title: string;
  institution: string; // e.g., "TED"
  url: string; // official watch URL
  embedUrl: string; // embeddable URL
  learningContext: string;
  duration?: string;
  thinkAboutIt?: {
    question: string;
    options: string[];
  };
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
}

export interface ChallengeStep {
  step: number;
  instruction: string;
  detail?: string;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
  instructions: string;
  steps: ChallengeStep[];
  completionNote?: string;
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  placeholder?: string;
  helperText?: string;
}

export interface Source {
  title: string;
  authorOrInstitution: string;
  url: string;
  type?: 'Video' | 'Buku' | 'Riset' | 'Panduan';
}

export interface SentenceStarter {
  starter: string;
  example: string;
}

export interface ExpressionItem {
  id: string;
  phrase: string;
  meaning: string;
  exampleContext: string;
  pronunciationHint: string;
}

export interface ExpressionCategory {
  categoryName: string;
  expressions: ExpressionItem[];
}

export interface ListenRepeatItem {
  phrase: string;
  phoneticHint: string;
  context: string;
}

export interface InteractiveScenarioOption {
  id: string;
  text: string;
  isBest: boolean;
  feedback: string;
}

export interface InteractiveScenario {
  context: string;
  options: InteractiveScenarioOption[];
}

export interface RealLifeChoice {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface OneSentenceExercise {
  topics: string[];
  prompt: string;
  sampleTopic: string;
  sampleMessage: string;
}

export interface IdeaOrderingItem {
  id: string;
  expectedOrder: number; // 1 = Point, 2 = Reason, 3 = Example
  partName: 'Point (Gagasan Utama)' | 'Reason (Alasan Kuat)' | 'Example (Contoh Konkret)';
  text: string;
}

export interface IdeaOrderingExercise {
  title: string;
  instruction: string;
  items: IdeaOrderingItem[];
  explanation: string;
}

export interface SimplifyExerciseOption {
  id: string;
  text: string;
  isBest: boolean;
  feedback: string;
}

export interface SimplifyExercise {
  originalComplex: string;
  prompt: string;
  options: SimplifyExerciseOption[];
}

export interface RapidStructureExercise {
  topic: string;
  preparationSeconds: number;
  pointPrompt: string;
  reasonPrompt: string;
  examplePrompt: string;
  sampleStructure?: {
    point: string;
    reason: string;
    example: string;
  };
}

export interface LessonSection {
  id: string;
  orderNumber: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  type: 'text' | 'exercise' | 'video' | 'challenge' | 'quiz' | 'reflection' | 'goal';
  content?: string[];
  callout?: {
    type: 'insight' | 'tip' | 'quote';
    text: string;
    author?: string;
  };
  keyTakeaways?: string[];
  actionPrompt?: string;
  sentenceStarters?: SentenceStarter[];
  expressionCategories?: ExpressionCategory[];
  listenRepeatSteps?: ListenRepeatItem[];
  interactiveScenario?: InteractiveScenario;
  realLifeChoices?: RealLifeChoice[];
  oneSentenceExercise?: OneSentenceExercise;
  ideaOrderingExercise?: IdeaOrderingExercise;
  simplifyExercise?: SimplifyExercise;
  rapidStructureExercise?: RapidStructureExercise;
}

export interface Lesson {
  slug: string;
  title: string;
  subtitle?: string;
  moduleNumber: string; // e.g. "Modul 01"
  pillar: string; // e.g. "Public Speaking & Communication"
  pillarId: string;
  pillarSlug?: string;
  level: 'Pemula' | 'Pemula-Menengah' | 'Menengah' | 'Menengah-Lanjutan' | 'Lanjutan' | string;
  duration: string; // e.g. "15–20 Menit"
  learningObjectives: string[];
  overview: string;
  sections: LessonSection[];
  video?: LessonVideo;
  quiz?: QuizQuestion[];
  challenge?: Challenge;
  reflectionQuestions?: ReflectionQuestion[];
  speakingGoalPrompt?: {
    title: string;
    subtitle?: string;
    description: string;
    checklistItems?: string[];
    closingStatement?: string;
    presetGoals: string[];
  };
  completionTitle?: string;
  completionMessage?: string;
  sources: Source[];
}

export interface LessonProgressState {
  isCompleted: boolean;
  completedAt?: string;
  quizScore?: number;
  quizCompleted: boolean;
  challengeCompleted: boolean;
  exerciseCompleted?: boolean;
  videoWatched?: boolean;
  completedSections?: string[];
  reflectionAnswers: Record<string, string>;
  selectedGoal?: string;
  customGoal?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 01: BERANI BICARA (Public Speaking & Communication)
// ─────────────────────────────────────────────────────────────────────────────
export const module01BeraniBicara: Lesson = {
  slug: 'berani-bicara',
  title: 'Berani Bicara',
  moduleNumber: 'Modul 01',
  pillar: 'Public Speaking & Communication',
  pillarId: 'speak-confidence',
  level: 'Pemula',
  duration: '15–20 Menit',
  learningObjectives: [
    'Memahami akar biologis kecemasan berbicara sebagai respons normal tubuh, bukan kelemahan pribadi.',
    'Mengenali pola respons gugup pribadimu serta teknik menata napas untuk meredakan ketegangan vokal.',
    'Menyusun pengenalan diri 60 detik yang lugas dan terstruktur tanpa terjebak overthinking.',
    'Menentukan satu target bicara pertama yang terukur dan realistis untuk dicoba minggu ini.',
  ],
  overview:
    'Rasa gugup sebelum berbicara di depan orang banyak bukanlah tanda bahwa kamu tidak mampu. Itu adalah sinyal bahwa apa yang akan kamu sampaikan bermakna bagimu. Modul ini membekalimu dengan pemahaman psikologis, teknik vokal praktis, dan tantangan mikro agar kamu berani melangkah dengan tenang.',
  sections: [
    {
      id: 'section-01',
      orderNumber: '01',
      title: 'Kenapa Kita Bisa Gugup Saat Bicara?',
      subtitle: 'Biologi di Balik Suara yang Bergetar',
      type: 'text',
      content: [
        'Pernahkah kamu merasakan telapak tangan mendadak dingin, detak jantung berpacu kencang, atau tenggorokan terasa tercekat beberapa saat sebelum dipanggil untuk berbicara di depan kelas atau forum?',
        'Secara evolusioner, otak manusia purba memandang perhatian tatapan mata puluhan orang sebagai potensi ancaman sosial. Bagian otak bernama amigdala mengaktifkan respons fight-or-flight: mengalirkan adrenalin, mempercepat detak jantung, dan mengalihkan pasokan darah ke otot-otot besar untuk bersiap lari.',
        'Di dunia modern, kita tidak sedang dikejar predator. Namun sistem syaraf kita merespons panggung, ujian lisan, atau presentasi kelompok dengan cara yang sama. Menyadari bahwa respon ini adalah biologi alami—bukan cacat karakter—adalah fondasi pertama untuk berdamai dengan rasa gugup.',
      ],
      callout: {
        type: 'insight',
        text: 'Gugup bukanlah bukti ketidakmampuan. Gugup adalah tanda bahwa kamu peduli terhadap apa yang kamu bicarakan dan siapa yang mendengarkanmu.',
      },
      keyTakeaways: [
        'Respons fisik saat gugup adalah pelepasan adrenalin alami dari amigdala.',
        'Tujuan latihan bukan menghilangkan rasa gugup 100%, melainkan mengubah energi gugup menjadi antusiasme yang terarah.',
      ],
    },
    {
      id: 'section-02',
      orderNumber: '02',
      title: 'Kenali Responsmu',
      subtitle: 'Membaca Bahasa Tubuh dan Sinyal Pribadi',
      type: 'text',
      content: [
        'Setiap orang memiliki "tanda tangan gugup" yang unik. Ada yang berbicara jauh lebih cepat seperti dikejar kereta, ada yang terdiam kaku dan blank, dan ada pula yang tanpa sadar menyelipkan puluhan filler words seperti "umm", "anu", atau "kayak gitu".',
        'Langkah awal penguasaan diri adalah mengamati tanda-tanda tersebut tanpa menghakimi diri sendiri. Ketika kamu menyadari tanganmu bergetar atau napasmu menjadi pendek di dada bagian atas, jangan melawannya. Sadari: "Tubuhku sedang memproduksi energi."',
        'Lakukan teknik pernapasan diafragma 4-4-4: Tarik napas melalui hidung selama 4 hitungan, tahan 4 hitungan, lalu hembuskan perlahan melalui mulut selama 4 hitungan. Sinyal oksigen ini memberi tahu otak bawah sadar bahwa kondisi aman.',
      ],
      callout: {
        type: 'tip',
        text: 'Formula Refleks: Sadari ("Aku sedang gugup") → Bernapas (4-4-4 diafragma) → Lanjutkan (Mulai dengan satu kalimat pembuka yang sudah disiapkan).',
      },
      keyTakeaways: [
        'Kenali tanda fisik utamamu: bicara cepat, tremor, napas pendek, atau filler words.',
        'Pernapasan diafragma 4-4-4 mengirimkan sinyal relaksasi ke sistem syaraf parasimpatis.',
      ],
    },
    {
      id: 'section-03',
      orderNumber: '03',
      title: 'Tonton dari Ahlinya',
      subtitle: 'Seni Berbicara Agar Orang Lain Ingin Mendengar',
      type: 'video',
      content: [
        'Simak paparan dari pakar suara Julian Treasure di panggung TED mengenai bagaimana struktur suara, kejujuran rasa, dan kehangatan artikulasi dapat mengubah cara orang lain merespons kehadiran bicaramu.',
      ],
    },
    {
      id: 'section-04',
      orderNumber: '04',
      title: 'Latihan Suara',
      subtitle: 'Vocal Toolkit & Pemanasan Singkat Sebelum Bicara',
      type: 'exercise',
      content: [
        'Sama seperti atlet yang melakukan peregangan sebelum berlari, pita suara dan otot wajah kita memerlukan pemanasan singkat agar artikulasimu terdengar bulat, hangat, dan berbobot.',
        'Lakukan rangkaian latihan 2 menit berikut sebelum kamu berbicara:',
      ],
      keyTakeaways: [
        'Pelemasan Rahang: Buka mulut lebar-lebar dengan santai, gerakkan rahang ke kiri dan kanan untuk melepaskan ketegangan leher.',
        'Lip Trill (Motor Roll): Tiupkan udara melalui kedua bibir hingga bergetar ("brrr") dari nada rendah ke nada tinggi untuk menghangatkan pita suara.',
        'Artikulasi Tajam: Ucapkan konsonan tegas "T - P - K - S" secara berulang dengan ketukan teratur untuk mengaktifkan bibir dan lidah.',
        'The Power of the Pause: Biasakan berhenti sejenak 1–2 detik daripada mengisi jeda berpikir dengan suara "eeeh" atau "umm". Jeda memberi kesan tenang dan berwibawa.',
      ],
      actionPrompt: 'Coba lakukan lip trill dan 3 tarikan napas diafragma sekarang sebelum lanjut ke tantangan berikutnya.',
    },
    {
      id: 'section-05',
      orderNumber: '05',
      title: '60-Second Challenge',
      subtitle: 'Tantangan Praktik: 60-Second Introduction',
      type: 'challenge',
      content: [
        'Kini saatnya mempraktikkan apa yang kamu pelajari. Gunakan kerangka 4 poin sederhana di bawah ini dan rekam atau ucapkan langsung dengan pengatur waktu 60 detik.',
      ],
    },
    {
      id: 'section-06',
      orderNumber: '06',
      title: 'Cek Pemahaman',
      subtitle: 'Uji Pemahaman Pola Pikir & Respons Bicara',
      type: 'quiz',
      content: [
        'Jawab dua skenario situasi nyata berikut untuk memastikan kamu siap menerapkan prinsip ketenangan berbicara di kehidupan sehari-hari.',
      ],
    },
    {
      id: 'section-07',
      orderNumber: '07',
      title: 'Refleksi Diri',
      subtitle: 'Menuliskan Catatan Perjalanan Belajarmu',
      type: 'reflection',
      content: [
        'Pembelajaran kecakapan hidup mengakar saat kita merefleksikan pengalaman pribadi secara jujur. Luangkan waktu untuk menjawab 3 pertanyaan reflektif berikut.',
      ],
    },
    {
      id: 'section-08',
      orderNumber: '08',
      title: 'Your First Speaking Goal',
      subtitle: 'Tentukan Target Bicara Pertamamu',
      type: 'goal',
      content: [
        'Teori terbaik adalah yang berujung pada aksi nyata sekecil apa pun. Pilih atau tuliskan satu target bicara konkret yang berkomitmen kamu coba dalam 7 hari ke depan.',
      ],
    },
  ],
  video: {
    speaker: 'Julian Treasure',
    title: 'How to Speak So That People Want to Listen',
    institution: 'TED',
    url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
    embedUrl: 'https://www.youtube-nocookie.com/embed/eIho2S0ZahI',
    learningContext:
      'Julian Treasure membedah "7 Dosa Komunikasi" yang sering membuat orang berpaling, serta 4 pilar suara berbobot (HAIL: Honesty, Authenticity, Integrity, Love). Ia juga memandu pemanasan vokal praktis 6 langkah yang sangat efektif sebelum kamu berbicara.',
    duration: '9:58 Menit',
  },
  quiz: [
    {
      id: 'q1',
      question:
        'Kamu akan presentasi di depan kelas. Lima menit sebelum mulai, tanganmu terasa dingin dan jantung berdebar. Apa respons yang paling tepat?',
      options: [
        {
          id: 'opt1-a',
          text: 'Panik dan mencari alasan ke kamar mandi untuk menunda giliran presentasi.',
        },
        {
          id: 'opt1-b',
          text: 'Menyadari bahwa kamu sedang gugup, mengatur napas, lalu tetap memulai.',
        },
        {
          id: 'opt1-c',
          text: 'Memaksakan diri untuk tidak boleh merasa gugup sama sekali.',
        },
        {
          id: 'opt1-d',
          text: 'Berbicara secepat mungkin sejak detik pertama agar presentasi cepat selesai.',
        },
      ],
      correctAnswerId: 'opt1-b',
      explanation:
        'Respons fisik adalah tanda adrenalin alami. Menolak atau melawannya justru menambah ketegangan. Sikap terbaik adalah mengakui rasa gugup ("Aku sedang gugup"), menstabilkan napas dengan diafragma, dan tetap melangkah memulai.',
    },
    {
      id: 'q2',
      question:
        'Saat memperkenalkan diri, kamu tiba-tiba lupa kalimat berikutnya. Apa yang sebaiknya dilakukan?',
      options: [
        {
          id: 'opt2-a',
          text: 'Mengisi kekosongan dengan terus berkata "umm, eeeh, anu" tanpa henti.',
        },
        {
          id: 'opt2-b',
          text: 'Langsung meminta maaf berulang kali dan menyatakan kamu tidak siap.',
        },
        {
          id: 'opt2-c',
          text: 'Berhenti sejenak dan melanjutkan dengan kalimat yang paling kamu ingat.',
        },
        {
          id: 'opt2-d',
          text: 'Menghentikan bicara dan langsung duduk kembali ke tempat duduk.',
        },
      ],
      correctAnswerId: 'opt2-c',
      explanation:
        'Jeda 1–2 detik terasa lama bagimu tetapi terdengar wajar dan berwibawa bagi pendengar. Berhenti sejenak, tarik napas, lalu lanjutkan dengan ide yang paling kamu ingat tanpa perlu minta maaf berlebihan.',
    },
  ],
  challenge: {
    id: 'challenge-60s',
    title: '60-Second Introduction',
    subtitle: 'Latihan Berbicara Singkat Tanpa Overthinking',
    durationSeconds: 60,
    instructions:
      'Aktifkan pengatur waktu 60 detik di bawah ini. Sampaikan perkenalan dirimu secara santai mengikuti 4 panduan langkah berikut. Jangan cemas bila ada jeda—fokuslah pada ritme dan kejelasan suaramu.',
    steps: [
      {
        step: 1,
        instruction: 'Sebutkan namamu dengan tenang tanpa terburu-buru.',
        detail: 'Contoh: "Halo semuanya, kenalkan namaku Aris..."',
      },
      {
        step: 2,
        instruction: 'Ceritakan aktivitas atau kegiatan utamamu saat ini.',
        detail: 'Contoh: "...saat ini aku sedang fokus belajar di SMA/SMK dan aktif di kegiatan..."',
      },
      {
        step: 3,
        instruction: 'Bagikan satu hal atau topik yang benar-benar kamu minati.',
        detail: 'Contoh: "Hal yang paling menarik buatku akhir-akhir ini adalah seni bercerita visual..."',
      },
      {
        step: 4,
        instruction: 'Sebutkan satu kecakapan hidup yang ingin kamu kembangkan tahun ini.',
        detail: 'Contoh: "Tahun ini aku ingin lebih berani menyuarakan gagasan tanpa cemas di forum umum."',
      },
    ],
    completionNote:
      'Hebat! Kamu telah menyelesaikan tantangan mikro bicaramu yang pertama.',
  },
  reflectionQuestions: [
    {
      id: 'ref-1',
      question: 'Hal apa yang paling membuatmu gugup ketika berbicara?',
      placeholder:
        'Contoh: Tatapan mata audiens, takut salah kata, atau takut dianggap membosankan...',
      helperText: 'Tuliskan secara spesifik situasi yang biasanya memicu keteganganmu.',
    },
    {
      id: 'ref-2',
      question: 'Apa yang biasanya kamu lakukan ketika mulai gugup?',
      placeholder:
        'Contoh: Bicara terlalu cepat, memegang jemari, melihat ke lantai, atau banyak mengucap "umm"...',
      helperText: 'Mengenali kebiasaan otomatis adalah langkah awal mengendalikannya.',
    },
    {
      id: 'ref-3',
      question: 'Apa satu hal yang ingin kamu coba saat berbicara berikutnya?',
      placeholder:
        'Contoh: Mencoba jeda hening 2 detik daripada berkata "umm", atau menarik napas 4-4-4 sebelum membuka suara...',
      helperText: 'Pilih satu eksperimen kecil yang terasa aman untuk dicoba.',
    },
  ],
  speakingGoalPrompt: {
    title: 'Your First Speaking Goal',
    description:
      'Pilih satu komitmen mikro yang akan kamu praktikkan dalam 7 hari ke depan:',
    presetGoals: [
      'Mengajukan satu pertanyaan atau tanggapan di kelas/forum minggu ini.',
      'Memperkenalkan diri kepada satu orang baru di sekolah atau komunitas.',
      'Melatih pernapasan diafragma 4-4-4 sebelum membuka presentasi kelompok.',
      'Menyisipkan jeda hening 2 detik daripada memakai filler word saat berpendapat.',
    ],
  },
  sources: [
    {
      title: 'How to Speak So That People Want to Listen',
      authorOrInstitution: 'Julian Treasure (TED Conferences)',
      url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
      type: 'Video',
    },
    {
      title: 'Presence: Bringing Your Boldest Self to Your Biggest Challenges',
      authorOrInstitution: 'Amy Cuddy (Harvard Business School / Little, Brown)',
      url: 'https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are',
      type: 'Buku',
    },
    {
      title: 'The Emotional Brain: The Mysterious Underpinnings of Emotional Life',
      authorOrInstitution: 'Joseph LeDoux (Simon & Schuster / NYU Neuroscience)',
      url: 'https://www.cns.nyu.edu/ledoux/',
      type: 'Riset',
    },
    {
      title: 'Pedoman Konseling Sebaya & Bina Ketahanan Remaja',
      authorOrInstitution: 'BKKBN & Jejaring PIK-R Indonesia',
      url: 'https://www.bkkbn.go.id/',
      type: 'Panduan',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 02: MENYAMPAIKAN IDE (Public Speaking & Communication)
// ─────────────────────────────────────────────────────────────────────────────
export const module02MenyampaikanIde: Lesson = {
  slug: 'menyampaikan-ide',
  title: 'Menyampaikan Ide',
  subtitle: 'Belajar mengubah pikiran yang masih acak menjadi pesan yang jelas, runtut, dan mudah dipahami orang lain.',
  moduleNumber: 'Modul 02',
  pillar: 'Public Speaking & Communication',
  pillarId: 'speak-confidence',
  pillarSlug: 'public-speaking',
  level: 'Pemula-Menengah',
  duration: '20 Menit',
  learningObjectives: [
    'Mengidentifikasi satu ide utama yang tajam dari topik yang masih luas.',
    'Menata pikiran yang acak menjadi alur pesan yang runtut dan terarah.',
    'Membedakan gagasan pokok dengan rincian pendukung agar tidak melantur.',
    'Menguasai kerangka komunikasi Point → Reason → Example dalam menyampaikan pendapat.',
    'Menjelaskan gagasan menggunakan bahasa yang jelas, konkret, dan familiar.',
    'Menyesuaikan gaya bahasa dan contoh dengan kebutuhan pendengar (audience awareness).',
    'Menyampaikan satu ide utuh secara percaya diri dalam batas waktu 60 detik.',
  ],
  overview:
    'Ide yang bagus akan lebih mudah dipahami ketika disampaikan dengan struktur yang jelas. Di modul ini, kamu akan belajar mengubah isi pikiran yang masih acak menjadi pesan yang runtut, memilih bahasa yang jelas, memahami kebutuhan audiens, dan menuntaskan tantangan bicara 60 detik.',
  completionTitle: 'Ide Kamu Sekarang Lebih Terarah.',
  completionMessage:
    'Kamu sudah belajar mengubah pikiran menjadi pesan yang lebih jelas dan terstruktur. Langkah berikutnya adalah membawa ide tersebut ke depan orang lain.',
  sections: [
    {
      id: 'section-01',
      orderNumber: '01',
      title: 'Kamu Punya Ide. Sekarang, Bagaimana Cara Menyampaikannya?',
      subtitle: 'Mengubah Pikiran Acak Menjadi Pesan Berbobot',
      type: 'text',
      content: [
        'Banyak orang sebenarnya memiliki ide yang cemerlang, pandangan menarik, atau pengalaman berharga. Namun saat diminta menjelaskan kepada orang lain, kalimat yang keluar terasa membingungkan atau berputar-putar tanpa arah.',
        'Masalah ini biasanya bukan karena kamu kurang pintar atau tidak memahami topikmu. Hambatan paling umum terjadi ketika terlalu banyak gagasan muncul bersamaan di kepala, pembicara belum menentukan pesan utama, penjelasan melompat dari satu hal ke hal lain, atau contoh sudah buru-buru diucapkan sebelum poin intinya jelas.',
        'Menyampaikan ide bukan tentang berbicara sebanyak mungkin atau memakai kata-kata yang rumit. Ini tentang membantu orang lain memahami apa yang penting dari apa yang kamu pikirkan.',
      ],
      callout: {
        type: 'insight',
        text: 'Menyampaikan ide bukan tentang berbicara sebanyak mungkin. Ini tentang membantu orang lain memahami apa yang penting dari apa yang kamu pikirkan.',
      },
      keyTakeaways: [
        'Tantangan terbesar bicara bukan kekurangan materi, melainkan kelebihan ide yang belum disaring.',
        'Pendengar hanya bisa menyerap informasi yang terstruktur rapi dan memiliki titik fokus.',
        'Fondasi komunikasi yang jelas dimulai dari satu pesan inti yang tegas.',
      ],
    },
    {
      id: 'section-02',
      orderNumber: '02',
      title: '01 — Temukan Ide Utamamu',
      subtitle: 'Membedakan Topik dengan Pesan Utama',
      type: 'exercise',
      content: [
        'Langkah pertama agar bicaramu tidak melantur adalah memahami perbedaan mendasar antara Topik (Topic) dan Pesan Utama (Main Message).',
        'Topik adalah payung besar yang sangat luas—misalnya "Media Sosial", "Sekolah", atau "Uang". Sementara pesan utama adalah pernyataan spesifik yang ingin kamu sampaikan tentang topik tersebut, misalnya: "Media sosial bisa menjadi alat belajar yang bermanfaat jika digunakan dengan bijak."',
        'Sebelum membuka suara, selalu jawab satu pertanyaan pengarah ini dalam benakmu:',
      ],
      callout: {
        type: 'tip',
        text: 'Kalau orang hanya mengingat satu hal dari perkataanku, apa yang ingin aku tinggalkan?',
        author: 'Prinsip Inti Komunikasi',
      },
      oneSentenceExercise: {
        topics: [
          'Media Sosial',
          'Sekolah & Belajar',
          'Pertemanan',
          'Organisasi & OSIS',
          'Pengelolaan Uang',
          'Kesehatan Mental',
          'Cita-cita & Masa Depan',
        ],
        prompt:
          'Pilih satu topik yang dekat dengan kehidupanmu, lalu ubah topik tersebut menjadi satu pesan utama dalam satu kalimat tegas.',
        sampleTopic: 'Media Sosial',
        sampleMessage:
          'Media sosial bisa menjadi alat belajar yang bermanfaat jika digunakan dengan bijak.',
      },
    },
    {
      id: 'section-03',
      orderNumber: '03',
      title: '02 — Rapikan Pikiranmu',
      subtitle: 'Formula Point → Reason → Example',
      type: 'exercise',
      content: [
        'Setelah menemukan satu pesan utama, bagaimana cara merangkai argumen agar terdengar kokoh dan mudah dicerna? Gunakan formula klasik yang terbukti efektif di panggung diskusi global: POINT → REASON → EXAMPLE.',
        '• POINT: Apa gagasan atau pendapat utamamu? (Contoh: "Menurutku, remaja perlu belajar mengatur uang sejak dini.")',
        '• REASON: Mengapa kamu berpendapat demikian? (Contoh: "Karena kebiasaan finansial yang sehat jauh lebih mudah dibangun saat kita masih muda.")',
        '• EXAMPLE: Apa bukti atau contoh konkret yang mempermudah pemahaman? (Contoh: "Misalnya, mulai dari mencatat pengeluaran harian dan membedakan kebutuhan dengan sekadar keinginan.")',
        'Struktur 3 langkah ini mencegah kita berbicara melompat-lompat dan memastikan pesanmu langsung mendarat di benak pendengar.',
      ],
      ideaOrderingExercise: {
        title: 'Interactive Exercise: Susun Ide (Point → Reason → Example)',
        instruction:
          'Tiga kalimat di bawah ini tersusun secara acak. Tentukan posisi masing-masing kalimat agar membentuk argumen yang runtut dan logis.',
        items: [
          {
            id: 'ord-ex',
            expectedOrder: 3,
            partName: 'Example (Contoh Konkret)',
            text: 'Misalnya, kamu bisa mulai dengan mencatat pengeluaran harian dan menyisihkan 10% uang saku.',
          },
          {
            id: 'ord-pt',
            expectedOrder: 1,
            partName: 'Point (Gagasan Utama)',
            text: 'Menurutku, remaja perlu belajar mengatur uang sejak dini.',
          },
          {
            id: 'ord-rs',
            expectedOrder: 2,
            partName: 'Reason (Alasan Kuat)',
            text: 'Kebiasaan ini membantu kita membuat keputusan keuangan yang lebih bijak tanpa terlilit utang di masa depan.',
          },
        ],
        explanation:
          'Urutan yang tepat adalah: 1. Point ("Menurutku, remaja perlu belajar mengatur uang sejak dini") → 2. Reason ("Kebiasaan ini membantu kita membuat keputusan keuangan yang lebih bijak...") → 3. Example ("Misalnya, mulai dengan mencatat pengeluaran harian..."). Dengan alur ini, pendengar memahami dulu posisi pendapatmu, alasan logis di baliknya, lalu contoh nyatanya.',
      },
    },
    {
      id: 'section-04',
      orderNumber: '04',
      title: '03 — Bicara dengan Bahasa yang Jelas',
      subtitle: 'Kejelasan Melampaui Kerumitan Kata',
      type: 'exercise',
      content: [
        'Banyak orang mengira pembicara yang hebat adalah mereka yang memakai kosakata rumit, istilah asing yang sulit, atau kalimat sastra yang panjang. Faktanya justru sebaliknya: bukti penguasaan ide yang matang adalah kemampuan menjelaskan hal rumit secara sederhana.',
        'Ingat enam aturan emas bahasa yang jelas saat berbicara:',
      ],
      keyTakeaways: [
        'Gunakan kata yang familiar bagi pendengar sehari-hari.',
        'Hindari kalimat majemuk yang terlalu panjang hingga kamu kehabisan napas.',
        'Jangan menumpuk terlalu banyak data atau rincian sekaligus.',
        'Gunakan analogi atau contoh konkret dari pengalaman nyata.',
        'Hindari jargon teknis jika audiensmu belum memahaminya.',
        'Satu kalimat sebaiknya membawa satu gagasan utama (One sentence, one thought).',
      ],
      callout: {
        type: 'quote',
        text: 'Jelas bukan berarti sederhana secara berlebihan. Jelas berarti orang lain tahu persis apa yang kamu maksud tanpa harus menebak-nebak.',
      },
      simplifyExercise: {
        originalComplex:
          'Pemanfaatan platform digital dalam konteks pembelajaran memiliki potensi signifikan dalam meningkatkan aksesibilitas terhadap sumber pengetahuan.',
        prompt:
          'Bagaimana kamu menyederhanakan kalimat kaku di atas agar terasa akrab dan langsung dipahami teman sebangkumu?',
        options: [
          {
            id: 'simp-1',
            text: 'Teknologi dan internet bisa membuat kita lebih mudah mendapatkan materi belajar kapan pun.',
            isBest: true,
            feedback:
              'Tepat sekali! Bahasanya bersahabat, lugas, dan pesan intinya tersampaikan tanpa istilah yang bikin pusing.',
          },
          {
            id: 'simp-2',
            text: 'Platform digital berkontribusi positif pada perolehan data dan referensi siswa secara terstruktur.',
            isBest: false,
            feedback:
              'Masih terdengar seperti laporan birokrasi atau proposal skripsi, bukan gaya obrolan yang hangat.',
          },
          {
            id: 'simp-3',
            text: 'Belajar digital itu intinya punya signifikansi akses terhadap informasi global.',
            isBest: false,
            feedback:
              'Kata "signifikansi akses" masih termasuk jargon yang membuat pendengar berkerut kening.',
          },
        ],
      },
    },
    {
      id: 'section-05',
      orderNumber: '05',
      title: '04 — Pikirkan Orang yang Mendengarkanmu',
      subtitle: 'Audience Awareness & Adaptasi Bahasa',
      type: 'text',
      content: [
        'Komunikasi bukanlah monolog satu arah. Setiap kali kamu membuka suara, ada telinga dan pikiran orang lain yang sedang memproses kata-katamu.',
        'Sebelum mulai berbicara, biasakan memeriksa empat radar ini:',
        '1. Siapa yang mendengarkan? (Apakah teman sebaya, bapak/ibu guru, juri lomba, atau audiens umum?)',
        '2. Apa yang sudah mereka ketahui tentang topik ini?',
        '3. Apa yang mungkin belum mereka pahami atau butuh diperjelas?',
        '4. Contoh apa yang paling relevan dan dekat dengan dunia keseharian mereka?',
      ],
      callout: {
        type: 'insight',
        text: 'Menyampaikan ide bukan hanya tentang apa yang ingin kamu katakan, tetapi juga tentang apa yang perlu dipahami oleh orang yang mendengarkan.',
      },
      interactiveScenario: {
        context:
          'Kamu ingin mengusulkan pengadaan "Pojok Baca & Diskusi Santai" di sekolah. Bagaimana kamu menyesuaikan caramu menjelaskan ide ini kepada Kepala Sekolah vs Teman Sekelas?',
        options: [
          {
            id: 'scen-a',
            text: 'Membacakan teks proposal anggaran biaya yang kaku dan rumit kepada teman sekelas saat jam istirahat.',
            isBest: false,
            feedback:
              'Teman sekelasmu akan bosan karena rincian anggaran bukan hal yang menarik bagi keseharian mereka.',
          },
          {
            id: 'scen-b',
            text: 'Menjelaskan kontribusi pojok baca pada iklim literasi sekolah kepada Kepala Sekolah, lalu fokus pada koleksi komik/novel seru dan tempat ngobrol nyaman saat mengajak teman sekelas.',
            isBest: true,
            feedback:
              'Luar biasa! Kamu memahami apa yang dipedulikan oleh masing-masing pihak: pihak sekolah memikirkan dampak edukasi, sedangkan teman sebaya memikirkan kenyamanan dan keseruan.',
          },
          {
            id: 'scen-c',
            text: 'Menggunakan satu naskah hafalan yang sama persis tanpa mengubah satu kata pun untuk siapa pun yang kamu temui.',
            isBest: false,
            feedback:
              'Komunikasi yang efektif membutuhkan fleksibilitas; berbicara tanpa empati audiens membuat pesan terasa dingin.',
          },
        ],
      },
    },
    {
      id: 'section-06',
      orderNumber: '06',
      title: 'Tonton dari Ahlinya',
      subtitle: 'How to Speak So That People Want to Listen',
      type: 'video',
      content: [
        'Julian Treasure membagikan rahasia bagaimana cara kita berbicara dapat memengaruhi apakah orang lain benar-benar ingin mendengarkan atau justru mengabaikan kita.',
      ],
    },
    {
      id: 'section-07',
      orderNumber: '07',
      title: 'Practice — Susun Ide dalam 30 Detik',
      subtitle: 'Latihan Kerangka Cepat Point → Reason → Example',
      type: 'exercise',
      content: [
        'Dalam situasi nyata seperti diskusi kelas atau rapat OSIS, kita sering kali tidak punya waktu 1 jam untuk menulis naskah. Kita hanya punya 30 detik untuk merapikan isi kepala.',
        'Tantang dirimu sekarang: ambil topik di bawah ini, luangkan 30 detik untuk berpikir, lalu susun kerangka 3 poinmu.',
      ],
      rapidStructureExercise: {
        topic: 'Mengapa remaja perlu belajar mengatur waktu?',
        preparationSeconds: 30,
        pointPrompt: 'Apa gagasan utamamu tentang mengatur waktu?',
        reasonPrompt: 'Mengapa kamu berpendapat begitu?',
        examplePrompt: 'Apa satu contoh konkret dalam keseharian siswa?',
        sampleStructure: {
          point: 'Menurutku, mengatur waktu membuat remaja punya kebebasan lebih banyak, bukan sebaliknya.',
          reason:
            'Karena saat kita tahu kapan harus fokus belajar, kita bisa santai bermain game atau nongkrong tanpa dihantui rasa bersalah.',
          example:
            'Misalnya, selesaikan tugas 1 jam setelah sampai di rumah, lalu malam harinya bebas untuk hobi.',
        },
      },
    },
    {
      id: 'section-08',
      orderNumber: '08',
      title: '60-Second Challenge',
      subtitle: 'Sampaikan Ide Lengkap dengan Struktur Terarah',
      type: 'challenge',
      content: [
        'Sekarang saatnya menyatukan seluruh latihanmu. Sampaikan satu ide utuh dalam waktu 60 detik tanpa membaca naskah panjang. Bicaralah dengan suara lantang mengikuti 4 langkah kerangka terarah di bawah.',
      ],
    },
    {
      id: 'section-09',
      orderNumber: '09',
      title: 'Cek Pemahaman',
      subtitle: 'Kuis Situasi & Struktur Komunikasi',
      type: 'quiz',
      content: [
        'Uji pemahamanmu tentang cara merapikan gagasan, memilih struktur yang efektif, dan berempati pada audiens.',
      ],
    },
    {
      id: 'section-10',
      orderNumber: '10',
      title: 'Take a Moment',
      subtitle: 'Refleksi Diri & Kebiasaan Menyampaikan Ide',
      type: 'reflection',
      content: [
        'Menyadari bagian mana yang paling menantang bagimu adalah kunci untuk bertumbuh sebagai pembicara yang jernih.',
      ],
    },
    {
      id: 'section-11',
      orderNumber: '11',
      title: 'Sekarang Kamu Bisa…',
      subtitle: 'Aksi Nyata • Target 7 Hari',
      type: 'goal',
      content: [
        'Kecakapan menyusun ide tidak bertumbuh dari hafalan teori belaka, melainkan dari keberanian mengulang satu komitmen mikro yang nyata.',
      ],
    },
  ],
  video: {
    speaker: 'Julian Treasure',
    title: 'How to Speak So That People Want to Listen',
    institution: 'TED Conferences',
    url: 'https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen',
    embedUrl: 'https://www.youtube-nocookie.com/embed/eIho2S0ZahI',
    learningContext:
      'Julian Treasure membahas bagaimana cara kita berbicara dapat memengaruhi apakah orang lain mau mendengarkan. Pelajari formula H.A.I.L (Honesty, Authenticity, Integrity, Love) untuk memastikan idemu disampaikan dengan kejelasan dan ketulusan.',
    duration: '9 Menit 58 Detik',
    thinkAboutIt: {
      question: 'Saat menyampaikan ide, mana yang paling sulit bagimu?',
      options: [
        'Menemukan inti pesan yang jelas',
        'Menyusun urutan ide agar runtut',
        'Memilih kata yang tepat & tidak berbelit',
        'Membuat orang lain benar-benar paham',
        'Tetap fokus saat berbicara tanpa kehilangan alur',
      ],
    },
  },
  challenge: {
    id: 'challenge-m02-60s',
    title: '60-Second Challenge',
    subtitle: 'Sampaikan Ide Lengkap dengan Struktur Terarah',
    durationSeconds: 60,
    instructions:
      'Sampaikan satu ide dalam waktu 60 detik menggunakan kerangka Point → Reason → Example → Closing. Aktifkan pengatur waktu di bawah dan bicaralah secara bersuara.',
    steps: [
      {
        step: 1,
        instruction: 'POINT — Nyatakan gagasan atau pendapat utamamu dengan tegas.',
        detail: 'Contoh: "Menurutku, remaja perlu mulai belajar mengatur uang sendiri sejak dini..."',
      },
      {
        step: 2,
        instruction: 'REASON — Berikan satu alasan terkuat yang mendukung pendapatmu.',
        detail:
          'Contoh: "...karena kebiasaan finansial yang bijak jauh lebih mudah dibentuk sekarang daripada saat sudah dewasa nanti..."',
      },
      {
        step: 3,
        instruction: 'EXAMPLE — Berikan satu contoh konkret dari kehidupan sehari-hari.',
        detail:
          'Contoh: "...misalnya dengan membiasakan mencatat uang jajan dan menyisihkan 10% sebelum mulai berbelanja..."',
      },
      {
        step: 4,
        instruction: 'CLOSING — Tutup dengan satu kalimat pengingat yang berkesan bagi pendengar.',
        detail:
          'Contoh: "...jadi mengelola uang bukan soal seberapa banyak uangmu, tapi seberapa bijak kamu mengendalikannya. Terima kasih."',
      },
    ],
    completionNote:
      'Luar biasa! Kamu berhasil menyampaikan ide berbobot dalam 60 detik tanpa berbelit-belit.',
  },
  quiz: [
    {
      id: 'quiz-m02-q1',
      question:
        'Rani ingin menyampaikan pendapat tentang pentingnya membaca. Ia langsung memberikan lima alasan berbeda tanpa menjelaskan inti pendapatnya. Apa masalah utama dalam penyampaiannya?',
      options: [
        { id: 'opt1-a', text: 'Rani berbicara terlalu pelan' },
        { id: 'opt1-b', text: 'Rani belum menentukan pesan utama' },
        { id: 'opt1-c', text: 'Rani terlalu banyak menggunakan gestur' },
        { id: 'opt1-d', text: 'Rani kurang menggunakan humor' },
      ],
      correctAnswerId: 'opt1-b',
      explanation:
        'Sebelum memberikan alasan, pembicara perlu tahu pesan utama yang ingin disampaikan agar penjelasannya tetap terarah.',
    },
    {
      id: 'quiz-m02-q2',
      question:
        'Struktur penyampaian mana yang paling jelas dan terarah bagi pendengar?',
      options: [
        {
          id: 'opt2-a',
          text: '“Menurutku olahraga penting. Banyak manfaatnya. Aku juga suka olahraga. Temanku juga suka basket.”',
        },
        {
          id: 'opt2-b',
          text: '“Menurutku remaja perlu berolahraga secara rutin. Olahraga membantu menjaga tubuh tetap aktif dan sehat. Misalnya, berjalan kaki atau bermain basket beberapa kali seminggu.”',
        },
        {
          id: 'opt2-c',
          text: '“Ada banyak sekali jenis olahraga di dunia dan semua orang punya pendapat berbeda tentang kesehatan.”',
        },
        {
          id: 'opt2-d',
          text: '“Waktu itu temanku mengajak main basket di lapangan komplek karena cuacanya sedang bagus sekali.”',
        },
      ],
      correctAnswerId: 'opt2-b',
      explanation:
        'Pilihan B memiliki alur yang paling jelas dan runtut mengikuti formula Point (pendapat) → Reason (alasan) → Example (contoh).',
    },
    {
      id: 'quiz-m02-q3',
      question:
        'Kamu sedang menjelaskan konsep baru atau ide yang belum familiar kepada seorang teman. Pendekatan apa yang paling efektif?',
      options: [
        { id: 'opt3-a', text: 'Gunakan sebanyak mungkin istilah teknis agar terdengar pintar.' },
        { id: 'opt3-b', text: 'Berikan penjelasan sepanjang mungkin tanpa memberi jeda.' },
        { id: 'opt3-c', text: 'Gunakan bahasa yang familiar dan sertakan satu contoh konkret dari keseharian.' },
        { id: 'opt3-d', text: 'Hindari memberi contoh agar temanmu membayangkan sendiri maknanya.' },
      ],
      correctAnswerId: 'opt3-c',
      explanation:
        'Kejelasan bahasa dan contoh konkret dari keseharian membantu pendengar mengaitkan konsep baru dengan pengalaman yang sudah mereka ketahui.',
    },
    {
      id: 'quiz-m02-q4',
      question:
        'Kamu memiliki waktu 60 detik untuk menjelaskan suatu ide di depan forum atau kelas. Apa yang sebaiknya menjadi prioritas utamamu?',
      options: [
        { id: 'opt4-a', text: 'Berbicara secepat mungkin agar bisa menyampaikan sepuluh poin sekaligus.' },
        { id: 'opt4-b', text: 'Menggunakan kosakata rumit dan istilah sastra yang sulit dipahami.' },
        {
          id: 'opt4-c',
          text: 'Menyampaikan satu pesan utama yang jelas dan mendukungnya dengan satu alasan serta satu contoh konkret.',
        },
        { id: 'opt4-d', text: 'Menghafalkan setiap kata secara kaku persis seperti catatan teks.' },
      ],
      correctAnswerId: 'opt4-c',
      explanation:
        'Dalam batas waktu singkat, prioritas tertinggi adalah menjaga satu pesan inti tetap jernih dan didukung argumen yang terstruktur (Point → Reason → Example), bukan kecepatan bicara.',
    },
  ],
  reflectionQuestions: [
    {
      id: 'ref-m02-1',
      question: 'Saat menyampaikan ide, bagian mana yang paling menantang bagimu?',
      placeholder:
        'Contoh: Menemukan inti pesan, menyusun alasan yang kuat, memberikan contoh yang pas, berbicara tanpa kehilangan alur, atau menyesuaikan penjelasan dengan audiens...',
      helperText: 'Pilih satu atau tuliskan tantangan terbesar yang sering kamu rasakan.',
    },
    {
      id: 'ref-m02-2',
      question:
        'Setelah menyelesaikan modul ini, apa satu hal yang ingin kamu lakukan berbeda saat menyampaikan ide berikutnya?',
      placeholder:
        'Contoh: Menyiapkan 1 pesan utama sebelum bicara, memakai formula Point-Reason-Example, atau menyederhanakan kata-kata rumit...',
      helperText: 'Tentukan satu perbaikan kecil yang realistis untuk dicoba minggu ini.',
    },
  ],
  speakingGoalPrompt: {
    title: 'Sekarang Kamu Bisa…',
    subtitle: 'Aksi Nyata • Target 7 Hari',
    description:
      'Kecakapan menyusun ide tidak bertumbuh dari hafalan teori belaka, melainkan dari keberanian mengulang satu komitmen mikro yang nyata.',
    checklistItems: [
      'Menemukan ide utama sebelum mulai berbicara',
      'Membedakan topik luas dengan pesan utama yang spesifik',
      'Menyusun pikiran secara runtut dengan Point → Reason → Example',
      'Menjelaskan ide rumit menggunakan bahasa yang jelas & familiar',
      'Mempertimbangkan audiens dan kebutuhan pendengar',
      'Menyampaikan satu ide yang utuh dalam batas waktu 60 detik',
    ],
    closingStatement:
      'Kamu nggak harus punya kata-kata yang sempurna. Yang penting, kamu tahu apa yang ingin kamu sampaikan, mengapa itu penting, dan bagaimana membuat orang lain memahaminya.',
    presetGoals: [
      'Menyampaikan satu pendapat di kelas/forum menggunakan formula Point → Reason → Example.',
      'Berlatih menyederhanakan satu materi pelajaran rumit kepada teman sebangkumu.',
      'Menuliskan satu pesan utama dalam satu kalimat sebelum memulai presentasi kelompok.',
      'Melakukan tantangan bicara 60 detik secara mandiri di depan cermin setiap 2 hari.',
    ],
  },
  sources: [
    {
      title: 'How to Speak So That People Want to Listen',
      authorOrInstitution: 'Julian Treasure (TED Conferences)',
      url: 'https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen',
      type: 'Video',
    },
    {
      title: 'Public Speaking Tips & Speech Structure',
      authorOrInstitution: 'Toastmasters International',
      url: 'https://www.toastmasters.org/resources/public-speaking-tips',
      type: 'Panduan',
    },
    {
      title: 'How to Structure an Effective Presentation',
      authorOrInstitution: 'Harvard Division of Continuing Education',
      url: 'https://professional.dce.harvard.edu/blog/how-to-structure-an-effective-presentation/',
      type: 'Panduan',
    },
    {
      title: 'Pedoman Komunikasi Efektif Remaja & Bina Ketahanan',
      authorOrInstitution: 'BKKBN & Jejaring PIK-R Indonesia',
      url: 'https://www.bkkbn.go.id/',
      type: 'Panduan',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 01: START SPEAKING (English Your Way)
// ─────────────────────────────────────────────────────────────────────────────
export const module01EnglishStartSpeaking: Lesson = {
  slug: 'start-speaking',
  title: 'Start Speaking',
  subtitle: 'From "I don\'t know what to say" to "I can actually speak."',
  moduleNumber: 'Modul 01',
  pillar: 'English Your Way',
  pillarId: 'english-your-way',
  pillarSlug: 'english-your-way',
  level: 'Pemula',
  duration: '20–30 Menit',
  learningObjectives: [
    'Memahami bahwa speaking tidak harus menunggu grammar sempurna.',
    'Memperkenalkan diri menggunakan Bahasa Inggris sederhana.',
    'Menggunakan expressions dasar untuk memulai percakapan.',
    'Menjawab pertanyaan sederhana secara spontan.',
    'Menggunakan strategi ketika tidak mengetahui suatu kata.',
    'Berbicara Bahasa Inggris selama 30–60 detik tanpa membaca script penuh.',
    'Menentukan target speaking sederhana untuk minggu berikutnya.',
  ],
  overview:
    'Dari rasa cemas "I don\'t know what to say" menuju keyakinan "I can actually speak." Modul ini dirancang khusus untuk meruntuhkan rasa takut salah grammar, melatih pola kalimat pembuka yang luwes, ungkapan percakapan siap pakai, serta trik menjaga obrolan tetap hidup saat kamu lupa kosakata.',
  sections: [
    {
      id: 'section-01',
      orderNumber: '01',
      title: "You Don't Need Perfect English to Start Speaking",
      subtitle: 'Meruntuhkan Hambatan Mental Bicara',
      type: 'text',
      content: [
        'Banyak pelajar memahami Bahasa Inggris dengan baik ketika membaca komik, bermain game, atau menonton serial dengan subtitle. Namun saat diminta membuka mulut untuk berbicara, mendadak lidah terasa kelu dan kepala menjadi kosong.',
        'Hambatan terbesar ini umumnya bukan karena kamu kurang pintar, melainkan beban ekspektasi: takut salah grammar tenses, takut salah pengucapan (pronunciation), takut mendadak lupa vocabulary, takut terdengar aneh, atau cemas ditertawakan teman sebaya.',
        'Kenyataannya, penutur asli sekalipun membuat kesalahan setiap hari. Bahasa Inggris lisan bukanlah ujian tertulis yang dinilai dengan tinta merah. Bahasa adalah jembatan untuk menyampaikan pikiranmu agar dipahami orang lain.',
      ],
      callout: {
        type: 'insight',
        text: 'Your first goal is not to sound perfect. Your first goal is to make yourself understood.',
      },
      keyTakeaways: [
        'Tujuan utamamu adalah berkomunikasi dan dipahami, bukan kesempurnaan tata bahasa tanpa cela.',
        'Aksen asalmu adalah identitas, bukan kelemahan. Yang terpenting adalah kejelasan makna (clarity).',
        'Setiap kali kamu memberanikan diri berbicara satu kalimat, kamu sedang membangun refleks bicara baru di otakmu.',
      ],
    },
    {
      id: 'section-02',
      orderNumber: '02',
      title: 'Start Small, Speak Often',
      subtitle: 'You already know more English than you think.',
      type: 'exercise',
      content: [
        'Kamu tidak perlu menghafal ratusan kosakata rumit untuk mulai bersuara hari ini. Kuncinya adalah menguasai "Sentence Starters"—pola awal kalimat pendek yang bisa kamu isi seketika dengan informasi pribadimu.',
        'Pilih dan lengkapi beberapa sentence starters di bawah ini dengan faktamu sendiri untuk membangun fondasi perkenalan diri yang luwes:',
      ],
      sentenceStarters: [
        { starter: "Hi, I'm...", example: "Hi, I'm Raka / Hi, I'm a high school student in Cimahi." },
        { starter: "I'm from...", example: "I'm from Cimahi, West Java / I'm from Indonesia." },
        { starter: "I like...", example: "I like listening to pop music and playing basketball." },
        { starter: "I usually...", example: "I usually spend my weekend watching YouTube or cycling." },
        { starter: "I'm interested in...", example: "I'm interested in digital illustration and coding." },
        { starter: "I want to learn...", example: "I want to learn how to speak English naturally." },
        { starter: "My favorite...", example: "My favorite way to relax is drinking iced tea with friends." },
      ],
      actionPrompt: 'Ucapkan kalimat yang telah kamu lengkapi secara lantang minimal 2 kali.',
    },
    {
      id: 'section-03',
      orderNumber: '03',
      title: "Don't Memorize Words. Learn Expressions.",
      subtitle: 'Learn English in chunks, not isolated vocabulary.',
      type: 'exercise',
      content: [
        'Menghafal kosakata satu per satu secara terpisah memaksa otakmu menerjemahkan kata demi kata saat berbicara, sehingga bicaramu terdengar kaku dan terhenti-henti.',
        'Penutur natural berbicara dalam kelompok kata utuh ("chunks" atau ungkapan). Klik setiap kartu ekspresi di bawah ini untuk melihat arti, konteks pemakaian, dan panduan pelafalan alaminya:',
      ],
      expressionCategories: [
        {
          categoryName: 'Starting a Conversation',
          expressions: [
            {
              id: 'exp-1',
              phrase: 'Hi! How are you?',
              meaning: 'Hai! Apa kabar?',
              exampleContext: 'Sapaan ramah pembuka saat berpapasan dengan teman atau kenalan baru.',
              pronunciationHint: 'Ucapkan menyambung: /haɪ haʊ ɑːr juː/ dengan intonasi naik di akhir.',
            },
            {
              id: 'exp-2',
              phrase: "How's your day going?",
              meaning: 'Gimana harimu sejauh ini?',
              exampleContext: 'Basa-basi santai di sekolah, kelas kursus, atau tempat nongkrong.',
              pronunciationHint: 'Sambungkan kata pertama: /haʊz jɔːr deɪ ˈɡoʊ.ɪŋ/',
            },
            {
              id: 'exp-3',
              phrase: 'What are you up to?',
              meaning: 'Lagi sibuk apa / lagi ngapain nih?',
              exampleContext: 'Menanyakan kegiatan santai yang sedang dikerjakan kawan akrab.',
              pronunciationHint: 'Ucapkan cepat dan santai: /wʌt ər jə ʌp tuː/',
            },
          ],
        },
        {
          categoryName: 'Responding',
          expressions: [
            {
              id: 'exp-4',
              phrase: "I'm good.",
              meaning: 'Aku baik-baik aja / santai.',
              exampleContext: 'Jawaban standar paling umum dan natural saat disapa orang lain.',
              pronunciationHint: 'Singkat dan rileks: /aɪm ɡʊd/',
            },
            {
              id: 'exp-5',
              phrase: 'Pretty good.',
              meaning: 'Lumayan baik / cukup oke.',
              exampleContext: 'Pilihan populer penutur muda untuk menggantikan kata kaku "I am fine".',
              pronunciationHint: '/ˈprɪt.i ɡʊd/',
            },
            {
              id: 'exp-6',
              phrase: 'Not bad.',
              meaning: 'Nggak buruk lah / lumayan.',
              exampleContext: 'Jawaban kasual ketika harimu biasa saja tapi tetap ramah.',
              pronunciationHint: '/nɑːt bæd/',
            },
            {
              id: 'exp-7',
              phrase: "I'm doing great.",
              meaning: 'Aku lagi semangat banget / kabar sangat baik.',
              exampleContext: 'Digunakan saat suasana hatimu sedang sangat ceria atau berenergi.',
              pronunciationHint: '/aɪm ˈduː.ɪŋ ɡreɪt/',
            },
          ],
        },
        {
          categoryName: 'Keeping the Conversation Going',
          expressions: [
            {
              id: 'exp-8',
              phrase: 'Really?',
              meaning: 'Masa sih? / Beneran?',
              exampleContext: 'Menunjukkan rasa antusias dan keingintahuan terhadap cerita lawan bicara.',
              pronunciationHint: 'Intonasi naik tajam: /ˈrɪə.li/',
            },
            {
              id: 'exp-9',
              phrase: "That's interesting.",
              meaning: 'Wah menarik banget ya.',
              exampleContext: 'Memberikan apresiasi hangat ketika kawan membagikan pengalaman uniknya.',
              pronunciationHint: 'Tiga suku kata mengalir: /ðæts ˈɪn.trɪ.stɪŋ/',
            },
            {
              id: 'exp-10',
              phrase: 'What about you?',
              meaning: 'Kalau kamu sendiri gimana?',
              exampleContext: 'Membalikkan pertanyaan agar obrolan berjalan dua arah secara seimbang.',
              pronunciationHint: 'Sambungkan ujung t dengan a: /wʌt əˈbaʊt juː/',
            },
            {
              id: 'exp-11',
              phrase: 'Tell me more.',
              meaning: 'Ceritain lebih banyak dong.',
              exampleContext: 'Mengundang lawan bicara bercerita lebih dalam tanpa terkesan menginterogasi.',
              pronunciationHint: '/tel miː mɔːr/',
            },
          ],
        },
        {
          categoryName: "When You Don't Understand",
          expressions: [
            {
              id: 'exp-12',
              phrase: 'Sorry, what do you mean?',
              meaning: 'Maaf, maksudmu gimana ya?',
              exampleContext: 'Meminta penjelasan tambahan tanpa perlu merasa bersalah atau malu.',
              pronunciationHint: '/ˈsɒr.i wʌt duː juː miːn/',
            },
            {
              id: 'exp-13',
              phrase: 'Could you say that again?',
              meaning: 'Bisa tolong diulang sekali lagi?',
              exampleContext: 'Sangat berguna ketika lawan bicara berbicara terlalu cepat atau suasana bising.',
              pronunciationHint: '/kʊd juː seɪ ðæt əˈɡen/',
            },
            {
              id: 'exp-14',
              phrase: 'What does that mean?',
              meaning: 'Artinya kata itu apa ya?',
              exampleContext: 'Menanyakan langsung makna kosakata baru yang baru saja kamu dengar.',
              pronunciationHint: '/wʌt dʌz ðæt miːn/',
            },
          ],
        },
      ],
      actionPrompt: 'Pilih minimal 1 ungkapan dari tiap kategori dan latih pengucapannya bersuara.',
    },
    {
      id: 'section-04',
      orderNumber: '04',
      title: "Don't Stop Just Because You Forgot a Word",
      subtitle: 'Learn how to keep the conversation alive.',
      type: 'text',
      content: [
        'Semua orang—termasuk penutur asli bahasa Inggris—pernah mendadak lupa kosakata di tengah percakapan. Perbedaannya: pembicara pemula sering langsung terdiam panik, sementara pembicara komunikatif memiliki strategi penyelamat obrolan.',
        'Good speakers don\'t always know every word. They know how to keep communicating.',
      ],
      keyTakeaways: [
        '1. Describe it: Jelaskan fungsi atau bentuknya ("It\'s a thing that you use to charge your phone...").',
        '2. Give an example: Berikan perumpamaan ("It\'s like a small notebook, but digital...").',
        '3. Ask for help: Tanyakan langsung tanpa malu ("What\'s the English word for alat pancing?").',
        '4. Use a simpler word: Gunakan kata yang lebih sederhana yang sudah kamu kuasai.',
      ],
      interactiveScenario: {
        context:
          'Kamu sedang mengobrol dengan kawan internasional dan ingin meminjam pengisi daya ponsel (charger), tetapi kamu mendadak lupa kata "charger". Apa tindakan terbaikmu?',
        options: [
          {
            id: 'scen-a',
            text: 'Langsung terdiam kaku, menghentikan obrolan, dan merasa malu.',
            isBest: false,
            feedback: 'Berhenti bicara justru memutus alur komunikasi yang sedang terjalin hangat.',
          },
          {
            id: 'scen-b',
            text: 'Jelaskan fungsinya: "Do you have the thing you use to give battery to your phone?"',
            isBest: true,
            feedback:
              'Tepat sekali! Menjelaskan fungsi barang menjaga percakapan tetap mengalir lancar tanpa hambatan.',
          },
          {
            id: 'scen-c',
            text: 'Meminta maaf berkali-kali dan beralih sepenuhnya ke bahasa Indonesia.',
            isBest: false,
            feedback: 'Kamu tidak perlu meminta maaf hanya karena lupa satu kosakata benda.',
          },
        ],
      },
      callout: {
        type: 'quote',
        text: 'Communication is about connection, not perfection. When you forget a word, describe it and keep going.',
        author: 'English Your Way Principle',
      },
    },
    {
      id: 'section-05',
      orderNumber: '05',
      title: 'Listen → Notice → Repeat',
      subtitle: 'Train your mouth, not just your memory.',
      type: 'exercise',
      content: [
        'Kefasihan berbicara adalah memori otot (muscle memory). Lidah, bibir, dan pita suaramu perlu dilatih merasakan ritme dan intonasi asli, bukan sekadar dibaca dalam hati.',
        'Ikuti alur 4 langkah latihan berikut untuk setiap kalimat latihan di bawah ini:',
      ],
      listenRepeatSteps: [
        {
          phrase: 'What are you up to?',
          phoneticHint: '/wʌt ər jə ʌp tuː/',
          context: 'Tanyakan dengan intonasi santai dan menyambung tanpa jeda antar kata.',
        },
        {
          phrase: 'That sounds interesting.',
          phoneticHint: '/ðæt saʊndz ˈɪn.trɪ.stɪŋ/',
          context: 'Beri penekanan lembut pada kata "interesting" untuk menunjukkan ketertarikan tulus.',
        },
        {
          phrase: "I don't really know, but...",
          phoneticHint: '/aɪ doʊnt ˈrɪə.li noʊ bʌt/',
          context: 'Gunakan sebagai jeda alami sebelum memberikan opini pribadi secara santai.',
        },
        {
          phrase: 'Let me think.',
          phoneticHint: '/let miː θɪŋk/',
          context: 'Ungkapan penyelamat saat kamu butuh 2 detik untuk menyusun kalimat berikutnya.',
        },
      ],
      actionPrompt: 'Latih 4 tahapan: STEP 01 Listen → STEP 02 Notice → STEP 03 Repeat → STEP 04 Say it without looking.',
    },
    {
      id: 'section-06',
      orderNumber: '06',
      title: 'Tonton dari Ahlinya',
      subtitle: 'Belajar Bahasa Inggris Seperti Bermain Game',
      type: 'video',
      content: [
        'Simak pemaparan inspiratif dari pakar komunikasi dan pendidik bahasa Marianna Pascal di panggung TEDx mengenai mengapa sikap percaya diri jauh lebih menentukan kelancaran berbicara daripada hafalan grammar.',
      ],
    },
    {
      id: 'section-07',
      orderNumber: '07',
      title: 'Your First English Introduction',
      subtitle: 'Speak for 30 seconds. No full script.',
      type: 'challenge',
      content: [
        'Saatnya membuktikan pada dirimu sendiri bahwa kamu mampu berbicara Bahasa Inggris. Gunakan kerangka 5 poin di bawah ini dan berbicaralah selama 30 detik tanpa membaca naskah penuh.',
      ],
    },
    {
      id: 'section-08',
      orderNumber: '08',
      title: 'English in Real Life',
      subtitle: 'Use English outside this lesson.',
      type: 'challenge',
      content: [
        'Belajar kecakapan hidup tidak berhenti di layar gawaimu. Pilih satu misi nyata di bawah ini untuk kamu coba di dunia nyata hari ini atau besok:',
      ],
      realLifeChoices: [
        {
          id: 'choice-a',
          code: 'Challenge A',
          title: 'Say "Hi" and start a short conversation',
          description: 'Sapa teman atau kenalanmu dengan "Hi! How\'s your day going?" secara langsung atau via chat.',
        },
        {
          id: 'choice-b',
          code: 'Challenge B',
          title: 'Record a 30-second English voice note',
          description: 'Rekam voice note suara perkenalan dirimu selama 30 detik dan simpan di catatan pribadimu.',
        },
        {
          id: 'choice-c',
          code: 'Challenge C',
          title: 'Send a simple English message to a friend',
          description: 'Kirimkan pesan pendek berbahasa Inggris menceritakan hal yang sedang kamu sukai kepada seorang kawan.',
        },
        {
          id: 'choice-d',
          code: 'Challenge D',
          title: 'Self-talk in English for one minute',
          description: 'Bicaralah sendiri dalam bahasa Inggris selama satu menit sambil mendeskripsikan apa yang sedang kamu lakukan di kamarmu.',
        },
      ],
    },
    {
      id: 'section-09',
      orderNumber: '09',
      title: 'Quick Check',
      subtitle: 'Uji Pola Pikir Komunikasi Spontan',
      type: 'quiz',
      content: [
        'Jawab 3 pertanyaan skenario berikut untuk memastikan kamu siap menerapkan prinsip komunikasi aktif dalam percakapan sehari-hari.',
      ],
    },
    {
      id: 'section-10',
      orderNumber: '10',
      title: "What's Holding You Back?",
      subtitle: 'Refleksi Diri Perjalanan Belajar Bicaramu',
      type: 'reflection',
      content: [
        'Kunci kemajuan adalah kejujuran terhadap rasa cemasmu sendiri. Tuliskan refleksimu pada 4 pertanyaan di bawah ini untuk melihat titik pertumbuhanmu.',
      ],
    },
    {
      id: 'section-11',
      orderNumber: '11',
      title: 'Your English Speaking Goal',
      subtitle: 'Tentukan Target Praktik Nyata 7 Hari',
      type: 'goal',
      content: [
        'Pilih satu komitmen mikro berbahasa Inggris yang realistis dan siap kamu jalankan secara konsisten dalam 7 hari ke depan.',
      ],
    },
  ],
  video: {
    speaker: 'Marianna Pascal',
    title: "Learning a language? Speak it like you're playing a video game",
    institution: 'TEDxPenangRoad',
    url: 'https://www.youtube.com/watch?v=Ge7c7otG2mk',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Ge7c7otG2mk',
    learningContext:
      'Marianna Pascal, trainer komunikasi internasional, membedah mengapa orang yang memiliki level bahasa sederhana sering kali jauh lebih efektif berkomunikasi dibandingkan mereka yang selalu cemas akan grammar. Ia mengibaratkan berbicara seperti bermain video game: fokus pada tujuan menyelesaikan misi dan terhubung dengan lawan bicara, bukan sibuk mengkhawatirkan kesalahan.',
    duration: '15:15 Menit',
  },
  challenge: {
    id: 'challenge-english-30s',
    title: 'Your First English Introduction',
    subtitle: 'Speak for 30 seconds. No full script.',
    durationSeconds: 30,
    instructions:
      'Tekan tombol Mulai di bawah ini. Sampaikan perkenalan dirimu selama 30 detik mengikuti 5 panduan berikut tanpa membaca teks penuh. Jangan cemas jika ada jeda—fokuslah pada aliran suaramu.',
    steps: [
      {
        step: 1,
        instruction: 'Name (Siapa namamu)',
        detail: 'Contoh: "Hi everyone, my name is Raka..."',
      },
      {
        step: 2,
        instruction: 'Where you are from (Asal kotamu)',
        detail: 'Contoh: "...and I\'m from Cimahi, West Java."',
      },
      {
        step: 3,
        instruction: 'What you do (Aktivitas utamamu)',
        detail: 'Contoh: "Currently, I\'m a high school student..."',
      },
      {
        step: 4,
        instruction: 'Something you like (Sesuatu yang kamu sukai)',
        detail: 'Contoh: "In my free time, I really like listening to music and designing..."',
      },
      {
        step: 5,
        instruction: 'Something you want to learn (Target belajarmu)',
        detail: 'Contoh: "This year, I want to be more confident speaking English with others."',
      },
    ],
    completionNote:
      'Awesome job! Kamu berhasil menuntaskan tantangan berbicara 30 detik pertamamu.',
  },
  quiz: [
    {
      id: 'eq-1',
      question:
        'You don\'t know the English word for something you want to explain. What should you do?',
      options: [
        {
          id: 'eq1-a',
          text: 'Stop speaking immediately and stay quiet.',
        },
        {
          id: 'eq1-b',
          text: 'Switch completely to Indonesian and give up.',
        },
        {
          id: 'eq1-c',
          text: 'Describe the thing using simpler English.',
        },
        {
          id: 'eq1-d',
          text: 'Stay silent until you remember the exact word.',
        },
      ],
      correctAnswerId: 'eq1-c',
      explanation:
        'Pembicara yang baik tidak selalu tahu semua kata. Menjelaskan fungsi atau bentuk benda dengan kata sederhana ("It\'s a thing that you use to...") menjaga percakapan tetap mengalir.',
    },
    {
      id: 'eq-2',
      question: 'You don\'t understand someone. Which sentence is most useful?',
      options: [
        {
          id: 'eq2-a',
          text: 'I don\'t understand English.',
        },
        {
          id: 'eq2-b',
          text: 'Could you say that again?',
        },
        {
          id: 'eq2-c',
          text: 'Whatever.',
        },
        {
          id: 'eq2-d',
          text: 'Never mind.',
        },
      ],
      correctAnswerId: 'eq2-b',
      explanation:
        '"Could you say that again?" adalah ungkapan sopan, natural, dan sangat efektif untuk meminta pengulangan tanpa perlu merasa malu atau minder.',
    },
    {
      id: 'eq-3',
      question: 'What should be your first goal when practicing speaking?',
      options: [
        {
          id: 'eq3-a',
          text: 'Perfect grammar without any mistakes.',
        },
        {
          id: 'eq3-b',
          text: 'Using difficult and fancy vocabulary.',
        },
        {
          id: 'eq3-c',
          text: 'Communicating your meaning clearly.',
        },
        {
          id: 'eq3-d',
          text: 'Speaking as fast as possible.',
        },
      ],
      correctAnswerId: 'eq3-c',
      explanation:
        'Tujuan pertama dan utama dari berbicara adalah kejelasan makna (clarity). Komunikasi yang sukses adalah ketika pesanmu tersampaikan dan dipahami oleh pendengar.',
    },
  ],
  reflectionQuestions: [
    {
      id: 'eref-1',
      question: 'Apa yang paling membuatmu takut ketika berbicara Bahasa Inggris?',
      placeholder:
        'Contoh: Takut salah tenses, takut pronunciation tidak mirip bule, atau takut ditertawakan teman...',
      helperText: 'Menyadari akar ketakutanmu membantu melepaskan beban mental yang tidak perlu.',
    },
    {
      id: 'eref-2',
      question: 'Kata atau situasi apa yang paling sering membuatmu stuck?',
      placeholder:
        'Contoh: Saat disapa orang asing, saat harus menjawab pertanyaan guru secara spontan, atau saat lupa nama benda...',
      helperText: 'Catat momen spesifik saat kamu merasa ragu untuk membuka suara.',
    },
    {
      id: 'eref-3',
      question: 'Apa strategi yang paling ingin kamu coba setelah modul ini?',
      placeholder:
        'Contoh: Menggunakan teknik describe it saat lupa kata, atau mulai menyapa teman dengan "How\'s your day going?"...',
      helperText: 'Pilih satu teknik praktis yang terasa paling aman dan aplikatif bagimu.',
    },
    {
      id: 'eref-4',
      question: 'Dalam situasi apa kamu ingin lebih percaya diri berbicara Bahasa Inggris?',
      placeholder:
        'Contoh: Saat bermain game online, mengobrol di komunitas internasional, atau presentasi di sekolah...',
      helperText: 'Bayangkan ruang nyata di mana kamu ingin suaramu terdengar berani.',
    },
  ],
  speakingGoalPrompt: {
    title: 'Your English Speaking Goal',
    description: 'Pilih satu komitmen mikro berbahasa Inggris untuk 7 hari ke depan:',
    presetGoals: [
      'Speak English for 5 minutes every day.',
      'Record one 30-second English voice note.',
      'Learn and use 5 useful English expressions.',
      'Start one short English conversation.',
      'Practice speaking without translating every sentence.',
      'Watch an English video and repeat 5 sentences aloud.',
    ],
  },
  sources: [
    {
      title: "Learning a language? Speak it like you're playing a video game",
      authorOrInstitution: 'Marianna Pascal (TEDxPenangRoad)',
      url: 'https://www.youtube.com/watch?v=Ge7c7otG2mk',
      type: 'Video',
    },
    {
      title: 'Spoken English Grammar & Chunks for Everyday Fluency',
      authorOrInstitution: 'Cambridge University Press / English Language Teaching',
      url: 'https://www.cambridge.org/elt',
      type: 'Buku',
    },
    {
      title: 'LearnEnglish Spoken Language Toolkit for Young Adults',
      authorOrInstitution: 'British Council English Learning Hub',
      url: 'https://learnenglish.britishcouncil.org/',
      type: 'Panduan',
    },
    {
      title: 'Principles and Practice in Second Language Acquisition (Affective Filter Hypothesis)',
      authorOrInstitution: 'Dr. Stephen Krashen (University of Southern California)',
      url: 'https://www.sdkrashen.com/',
      type: 'Riset',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY & HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const lessonsRegistry: Record<string, Lesson> = {
  'berani-bicara': module01BeraniBicara,
  'speak-confidence': module01BeraniBicara, // Alias for seamless navigation
  'menyampaikan-ide': module02MenyampaikanIde,
  'start-speaking': module01EnglishStartSpeaking,
};

/**
 * Retrieve lesson by slug (supports alias fallback)
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  if (!slug) return undefined;
  return lessonsRegistry[slug.toLowerCase()] || undefined;
}

/**
 * Retrieve all registered lessons
 */
export function getAllLessons(): Lesson[] {
  return [module01BeraniBicara, module02MenyampaikanIde, module01EnglishStartSpeaking];
}

/**
 * LocalStorage storage key helper
 */
const STORAGE_PREFIX = 'akar_ceri_progress_';

/**
 * Retrieve lesson progress from localStorage
 */
export function getLessonProgress(slug: string): LessonProgressState {
  const defaultState: LessonProgressState = {
    isCompleted: false,
    quizCompleted: false,
    challengeCompleted: false,
    exerciseCompleted: false,
    videoWatched: false,
    completedSections: [],
    reflectionAnswers: {},
  };

  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          isCompleted: Boolean(parsed.isCompleted),
          completedAt: typeof parsed.completedAt === 'string' ? parsed.completedAt : undefined,
          quizScore: typeof parsed.quizScore === 'number' ? parsed.quizScore : undefined,
          quizCompleted: Boolean(parsed.quizCompleted),
          challengeCompleted: Boolean(parsed.challengeCompleted),
          exerciseCompleted: Boolean(parsed.exerciseCompleted),
          videoWatched: Boolean(parsed.videoWatched),
          completedSections: Array.isArray(parsed.completedSections) ? parsed.completedSections : [],
          reflectionAnswers:
            parsed.reflectionAnswers && typeof parsed.reflectionAnswers === 'object'
              ? parsed.reflectionAnswers
              : {},
          selectedGoal: typeof parsed.selectedGoal === 'string' ? parsed.selectedGoal : undefined,
          customGoal: typeof parsed.customGoal === 'string' ? parsed.customGoal : undefined,
        };
      }
    }
  } catch (err) {
    console.warn('Failed to read lesson progress from storage, resetting to default:', err);
  }

  return defaultState;
}

/**
 * Save updated lesson progress to localStorage
 */
export function saveLessonProgress(
  slug: string,
  updated: Partial<LessonProgressState>
): LessonProgressState {
  const current = getLessonProgress(slug);
  const next: LessonProgressState = {
    ...current,
    ...updated,
    completedSections: updated.completedSections || current.completedSections || [],
    reflectionAnswers: {
      ...current.reflectionAnswers,
      ...(updated.reflectionAnswers || {}),
    },
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify(next));
    } catch (err) {
      console.warn('Failed to save lesson progress to storage:', err);
    }
  }

  return next;
}

