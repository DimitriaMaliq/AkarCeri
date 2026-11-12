/**
 * AKAR CERI — PIK-R Example Data Store
 *
 * IMPORTANT NOTE / DISCLAIMER:
 * Data dalam berkas ini merupakan CONTOH TAMPILAN / SIMULASI PERCONTOHAN
 * untuk keperluan visualisasi antarmuka AKAR CERI.
 * TIDAK merepresentasikan data resmi, nomor kontak, jadwal terverifikasi,
 * maupun koordinat riil sampai proses kurasi bersama DP3AP2KB / BKKBN selesai.
 */

export interface PikRItem {
  id: string;
  name: string;
  institution: string;
  kecamatan: 'utara' | 'tengah' | 'selatan';
  kecamatanLabel: string;
  description: string;
  serviceHours: string;
  mainService: string;
  isMock: boolean;
}

export const PIKR_DATA_DISCLAIMER =
  'Contoh tampilan — data belum tersedia. Menunggu verifikasi resmi.';

export const pikRMockList: PikRItem[] = [
  {
    id: 'pikr-ceria-mandiri',
    name: 'PIK-R Ceria Mandiri',
    institution: 'Pangkalan SMAN 1 Cimahi',
    kecamatan: 'tengah',
    kecamatanLabel: 'Cimahi Tengah',
    description:
      'Ruang konseling ramah sebaya yang difasilitasi konselor sebaya terlatih untuk bimbingan adaptasi sekolah dan pencegahan risiko remaja.',
    serviceHours: 'Selasa & Jumat (14.30 – 17.00 WIB)',
    mainService: 'Konseling Sebaya & Edukasi Kesehatan Remaja',
    isMock: true,
  },
  {
    id: 'pikr-pelita-harapan',
    name: 'PIK-R Pelita Harapan',
    institution: 'Pangkalan SMKN 1 Cimahi',
    kecamatan: 'selatan',
    kecamatanLabel: 'Cimahi Selatan',
    description:
      'Wadah bertukar cerita dan bimbingan persiapan transisi dunia kerja, perencanaan masa depan, serta manajemen stres siswa.',
    serviceHours: 'Senin & Kamis (13.30 – 16.00 WIB)',
    mainService: 'Peer Mentoring & Kesiapan Karir Remaja',
    isMock: true,
  },
  {
    id: 'pikr-gema-remaja',
    name: 'PIK-R Gema Remaja',
    institution: 'Komunitas Cipageran',
    kecamatan: 'utara',
    kecamatanLabel: 'Cimahi Utara',
    description:
      'Lingkar pendampingan remaja berbasis komunitas untuk diskusi kesehatan mental, literasi reproduksi, dan penjelajahan minat bakat.',
    serviceHours: 'Sabtu (09.00 – 12.00 WIB)',
    mainService: 'Konseling Komunitas & Literasi Remaja',
    isMock: true,
  },
  {
    id: 'pikr-sahabat-bintang',
    name: 'PIK-R Sahabat Bintang',
    institution: 'Pangkalan SMAN 2 Cimahi',
    kecamatan: 'utara',
    kecamatanLabel: 'Cimahi Utara',
    description:
      'Pos konseling sebaya yang fokus pada penguatan regulasi emosi, pencegahan bullying, dan pembinaan ketahanan remaja.',
    serviceHours: 'Rabu & Jumat (14.00 – 16.30 WIB)',
    mainService: 'Regulasi Emosi & Ketahanan Remaja',
    isMock: true,
  },
  {
    id: 'pikr-tunas-bangsa',
    name: 'PIK-R Tunas Bangsa',
    institution: 'Pangkalan SMPN 1 Cimahi',
    kecamatan: 'tengah',
    kecamatanLabel: 'Cimahi Tengah',
    description:
      'Layanan pendampingan masa pubertas awal, pengenalan batasan pertemanan sehat, dan pembiasaan komunikasi terbuka dengan orang tua.',
    serviceHours: 'Senin & Rabu (13.00 – 15.00 WIB)',
    mainService: 'Edukasi Pubertas & Batasan Diri Sehat',
    isMock: true,
  },
  {
    id: 'pikr-karya-muda',
    name: 'PIK-R Karya Muda',
    institution: 'Komunitas Melong',
    kecamatan: 'selatan',
    kecamatanLabel: 'Cimahi Selatan',
    description:
      'Ruang berbagi pemuda wilayah Cimahi Selatan untuk diskusi ketahanan keluarga muda, edukasi pencegahan stunting, dan aksi sosial.',
    serviceHours: 'Minggu (10.00 – 13.00 WIB)',
    mainService: 'Ketahanan Pemuda & Aksi Sosial Lingkungan',
    isMock: true,
  },
];

