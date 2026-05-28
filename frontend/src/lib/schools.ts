import { createClient } from '@supabase/supabase-js';
import type { School } from '@/types';

export async function getAllSchools(): Promise<School[]> {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY!; // uses service key at build time

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('schools')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Failed to fetch schools:', error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    name: row.name ?? '',
    slug: row.slug ?? '',
    type: row.type ?? 'Negeri',
    kurikulum: row.kurikulum ?? 'Nasional',
    fees: row.fees ?? 0,
    location: row.location ?? '',
    akreditasi: row.akreditasi ?? 'C',
    facilities: row.facilities ?? [],
    program: row.program ?? 'Agama Umum',
    fullDay: row.fullday ?? false,
    website: row.website ?? '',
    dataNote: row.datanote ?? '',
    description: row.description?.trim() ?? '',
  }));
}

export async function getKecamatanList(): Promise<string[]> {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase
    .from('schools')
    .select('location')
    .not('location', 'is', null);

  const locations = [...new Set((data ?? []).map((r: any) => r.location))];
  return locations.sort();
}
