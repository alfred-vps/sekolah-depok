import type { School, FilterState } from '@/types';
import { FEE_RANGES } from '@/types';

export function initialFilterState(): FilterState {
  return {
    search: '',
    jenis: [],
    kurikulum: [],
    biaya: [],
    lokasi: [],
    akreditasi: [],
    fasilitas: [],
    program: [],
  };
}

export function filterSchools(schools: School[], filters: FilterState): School[] {
  return schools.filter((school) => {
    // Search filter (case-insensitive on name + description)
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      const searchable = `${school.name} ${school.description} ${school.location} ${school.program}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    // Jenis filter (Negeri/Swasta)
    if (filters.jenis.length > 0 && !filters.jenis.includes(school.type)) {
      return false;
    }

    // Kurikulum filter
    if (filters.kurikulum.length > 0 && !filters.kurikulum.includes(school.kurikulum)) {
      return false;
    }

    // Biaya filter
    if (filters.biaya.length > 0) {
      const matchesBiaya = filters.biaya.some((rangeValue) => {
        const range = FEE_RANGES.find((r) => r.value === rangeValue);
        if (!range) return false;
        // For 0-0 (gratis negeri), match only when fees is 0
        if (rangeValue === '0-0') return school.fees === 0;
        return school.fees >= range.min && school.fees <= range.max;
      });
      if (!matchesBiaya) return false;
    }

    // Lokasi filter (kecamatan)
    if (filters.lokasi.length > 0 && !filters.lokasi.includes(school.location)) {
      return false;
    }

    // Akreditasi filter
    if (filters.akreditasi.length > 0 && !filters.akreditasi.includes(school.akreditasi)) {
      return false;
    }

    // Fasilitas filter (multi-select AND logic — school must have ALL selected facilities)
    if (filters.fasilitas.length > 0) {
      const hasAll = filters.fasilitas.every((f) => school.facilities.includes(f));
      if (!hasAll) return false;
    }

    // Program filter
    if (filters.program.length > 0 && !filters.program.includes(school.program)) {
      return false;
    }

    return true;
  });
}

export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.search.trim()) count++;
  count += filters.jenis.length;
  count += filters.kurikulum.length;
  count += filters.biaya.length;
  count += filters.lokasi.length;
  count += filters.akreditasi.length;
  count += filters.fasilitas.length;
  count += filters.program.length;
  return count;
}

export function getActiveFilterPills(filters: FilterState): { label: string; key: string; group: string }[] {
  const pills: { label: string; key: string; group: string }[] = [];

  if (filters.search.trim()) {
    pills.push({ label: `Cari: "${filters.search.trim()}"`, key: 'search', group: 'search' });
  }

  for (const j of filters.jenis) {
    pills.push({ label: j, key: `jenis-${j}`, group: 'jenis' });
  }
  for (const k of filters.kurikulum) {
    pills.push({ label: k, key: `kurikulum-${k}`, group: 'kurikulum' });
  }
  for (const b of filters.biaya) {
    const range = FEE_RANGES.find((r) => r.value === b);
    pills.push({ label: range?.label ?? b, key: `biaya-${b}`, group: 'biaya' });
  }
  for (const l of filters.lokasi) {
    pills.push({ label: l, key: `lokasi-${l}`, group: 'lokasi' });
  }
  for (const a of filters.akreditasi) {
    pills.push({ label: `Akreditasi ${a}`, key: `akreditasi-${a}`, group: 'akreditasi' });
  }
  for (const f of filters.fasilitas) {
    const label = f.replace(/_/g, ' ');
    pills.push({ label: label.charAt(0).toUpperCase() + label.slice(1), key: `fasilitas-${f}`, group: 'fasilitas' });
  }
  for (const p of filters.program) {
    pills.push({ label: p, key: `program-${p}`, group: 'program' });
  }

  return pills;
}
