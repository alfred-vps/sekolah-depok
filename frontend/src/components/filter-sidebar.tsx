'use client';

import React from 'react';
import type { FilterState } from '@/types';
import {
  FEE_RANGES,
  AKREDITASI_OPTIONS,
  JENIS_OPTIONS,
  KURIKULUM_OPTIONS,
  PROGRAM_OPTIONS,
  FASILITAS_OPTIONS,
  LOKASI_OPTIONS,
} from '@/types';
import { getActiveFilterCount } from '@/lib/filters';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly string[] | string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  return (
    <div className="mb-5">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</h4>
      <div className="space-y-1.5">
        {options.map((opt) => {
          const isChecked = selected.includes(opt);
          return (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    onChange(selected.filter((s) => s !== opt));
                  } else {
                    onChange([...selected, opt]);
                  }
                }}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function formatFacilityLabel(facility: string): string {
  const labels: Record<string, string> = {
    laboratorium: 'Laboratorium',
    lapangan: 'Lapangan',
    perpustakaan: 'Perpustakaan',
    kantin: 'Kantin',
    masjid: 'Masjid',
    aula: 'Aula',
    bilingual: 'Bilingual',
    kolam_renang: 'Kolam Renang',
    kebun: 'Kebun',
    asrama: 'Asrama',
  };
  return labels[facility] ?? facility;
}

export default function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const activeCount = getActiveFilterCount(filters);

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Filter</h3>
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset ({activeCount})
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          {/* Jenis */}
          <CheckboxGroup
            label="Jenis"
            options={JENIS_OPTIONS}
            selected={filters.jenis}
            onChange={(v) => update({ jenis: v })}
          />

          {/* Kurikulum */}
          <CheckboxGroup
            label="Kurikulum"
            options={KURIKULUM_OPTIONS}
            selected={filters.kurikulum}
            onChange={(v) => update({ kurikulum: v })}
          />

          {/* Biaya */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Biaya</h4>
            <div className="space-y-1.5">
              {FEE_RANGES.map((range) => {
                const isChecked = filters.biaya.includes(range.value);
                return (
                  <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (isChecked) {
                          update({ biaya: filters.biaya.filter((s) => s !== range.value) });
                        } else {
                          update({ biaya: [...filters.biaya, range.value] });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{range.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Lokasi */}
          <CheckboxGroup
            label="Lokasi (Kecamatan)"
            options={LOKASI_OPTIONS}
            selected={filters.lokasi}
            onChange={(v) => update({ lokasi: v })}
          />

          {/* Akreditasi */}
          <CheckboxGroup
            label="Akreditasi"
            options={AKREDITASI_OPTIONS.map(String)}
            selected={filters.akreditasi}
            onChange={(v) => update({ akreditasi: v })}
          />

          {/* Fasilitas */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fasilitas</h4>
            <div className="space-y-1.5">
              {FASILITAS_OPTIONS.map((f) => {
                const isChecked = filters.fasilitas.includes(f);
                return (
                  <label key={f} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (isChecked) {
                          update({ fasilitas: filters.fasilitas.filter((s) => s !== f) });
                        } else {
                          update({ fasilitas: [...filters.fasilitas, f] });
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{formatFacilityLabel(f)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Program */}
          <CheckboxGroup
            label="Program"
            options={PROGRAM_OPTIONS}
            selected={filters.program}
            onChange={(v) => update({ program: v })}
          />
        </div>
      </div>
    </aside>
  );
}
