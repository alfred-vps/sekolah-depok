export interface School {
  name: string;
  slug: string;
  type: 'Negeri' | 'Swasta';
  kurikulum: string;
  fees: number;
  location: string;
  akreditasi: 'A' | 'B' | 'C';
  facilities: string[];
  program: string;
  fullDay: boolean;
  website: string;
  dataNote: string;
  description: string;
}

export interface FilterState {
  search: string;
  jenis: string[]; // 'Negeri' | 'Swasta'
  kurikulum: string[];
  biaya: string[]; // '0-500rb', '500rb-1jt', '1jt-2jt', '2jt+'
  lokasi: string[];
  akreditasi: string[];
  fasilitas: string[];
  program: string[];
}

export const FEE_RANGES = [
  { label: 'Gratis (Negeri)', value: '0-0', min: 0, max: 0 },
  { label: '0 - 500rb', value: '0-500rb', min: 1, max: 500000 },
  { label: '500rb - 1jt', value: '500rb-1jt', min: 500001, max: 1000000 },
  { label: '1jt - 2jt', value: '1jt-2jt', min: 1000001, max: 2000000 },
  { label: '2jt+', value: '2jt+', min: 2000001, max: Infinity },
] as const;

export const AKREDITASI_OPTIONS = ['A', 'B', 'C'] as const;
export const JENIS_OPTIONS = ['Negeri', 'Swasta'] as const;
export const KURIKULUM_OPTIONS = ['Nasional', 'Nasional Plus', 'Islam Terpadu', 'International'] as const;
export const PROGRAM_OPTIONS = ['Agama Umum', 'Islam Full Day'] as const;
export const FASILITAS_OPTIONS = [
  'laboratorium',
  'lapangan',
  'perpustakaan',
  'kantin',
  'masjid',
  'aula',
  'bilingual',
  'kolam_renang',
  'kebun',
  'asrama',
] as const;

export const LOKASI_OPTIONS = [
  'Beji',
  'Pancoran Mas',
  'Cimanggis',
  'Sawangan',
  'Sukmajaya',
  'Tapos',
  'Limo',
  'Cinere',
  'Bojongsari',
] as const;
