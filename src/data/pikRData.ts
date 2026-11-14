/**
 * AKAR CERI — PIK-R Location Directory
 *
 * Data in this file represents real PIK-R (Pusat Informasi dan Konseling Remaja)
 * locations in Kota Cimahi as provided for the AKAR CERI directory.
 *
 * IMPORTANT:
 * - Addresses are verbatim as supplied — do NOT alter spellings.
 * - latitude, longitude, mapsUrl are intentionally omitted (future Google Maps integration).
 * - Do NOT add fictional phone numbers, descriptions, or service hours.
 */

export interface PikRLocation {
  id: string;
  ordinal: string; // '01' – '08' for display
  name: string;
  school: string;
  address: string;
  district: 'Cimahi Selatan' | 'Cimahi Tengah' | 'Cimahi Utara';
  source?: string;
  // Reserved for future Google Maps integration — do NOT populate with guessed values:
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
}

export const pikRLocations: PikRLocation[] = [
  {
    id: 'react-pembangunan',
    ordinal: '01',
    name: 'PIK - Remaja Active Pembangunan (ReAct Pembangunan)',
    school: 'SMK NEGERI 1 CIMAHI',
    address: 'Jl. Mahar Martanegara No.48, Utama, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40533',
    district: 'Cimahi Selatan',
  },
  {
    id: 'pikr-one',
    ordinal: '02',
    name: 'PIK-R ONE',
    school: 'SMP NEGERI 1 CIMAHI',
    address: 'Jl. Raden Embang Artawidjaja No. 12, Baros, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521',
    district: 'Cimahi Tengah',
  },
  {
    id: 'pikr-pelita-fourci',
    ordinal: '03',
    name: 'PIK-R Pelita Fourci',
    school: 'SMA NEGERI 4 CIMAHI',
    address: 'Jl. Kihapit Barat No. 323, Utama, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40533',
    district: 'Cimahi Selatan',
  },
  {
    id: 'pikr-geven-7',
    ordinal: '04',
    name: 'PIK-R GEVEN 7',
    school: 'SMP NEGERI 7 CIMAHI',
    address: 'l. Kb. Jeruk, RT.001/RW.020, Utama, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40533',
    district: 'Cimahi Selatan',
  },
  {
    id: 'pikr-sachi',
    ordinal: '05',
    name: 'PIK-R SACHI',
    school: 'SMA NEGERI 1 CIMAHI',
    address: 'Jl. Pacinan No. 22 A, Karangmekar, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521',
    district: 'Cimahi Tengah',
  },
  {
    id: 'pik-maci',
    ordinal: '06',
    name: 'PIK-MACI',
    school: 'SMA NEGERI 5 CIMAHI',
    address: 'JL. GATOT SUBROTO NO.39, Cigugur Tengah, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40522',
    district: 'Cimahi Tengah',
  },
  {
    id: 'pikr-sman2-cimahi',
    ordinal: '07',
    name: 'PIK-R SMAN 2 CIMAHI',
    school: 'SMA NEGERI 2 CIMAHI',
    address: 'Jl. KPAD Sriwijaya IX No. 45 A, Cimahi, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521',
    district: 'Cimahi Tengah',
  },
  {
    id: 'pik-manci',
    ordinal: '08',
    name: 'PIK-MANCI',
    school: 'MA NEGERI KOTA CIMAHI',
    address: 'Jl. Kihapit Barat No. 319, Utama, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40533',
    district: 'Cimahi Selatan',
  },
];

/** District filter options for the UI */
export type PikRDistrict = 'Semua' | 'Cimahi Utara' | 'Cimahi Tengah' | 'Cimahi Selatan';

export const PIK_R_FILTER_OPTIONS: { id: PikRDistrict; label: string }[] = [
  { id: 'Semua', label: 'Semua Wilayah' },
  { id: 'Cimahi Utara', label: 'Cimahi Utara' },
  { id: 'Cimahi Tengah', label: 'Cimahi Tengah' },
  { id: 'Cimahi Selatan', label: 'Cimahi Selatan' },
];
