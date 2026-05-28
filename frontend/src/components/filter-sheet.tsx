'use client';

import React, { useEffect, useRef } from 'react';
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

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
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
            <label key={opt} className="flex items-center gap-2 cursor-pointer py-1">
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
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{opt}</span>
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

export default function FilterSheet({ isOpen, onClose, filters, onChange, onReset }: FilterSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">Filter</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="text-sm text-blue-600 font-medium"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
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
                  <label key={range.value} className="flex items-center gap-2 cursor-pointer py-1">
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
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
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
                  <label key={f} className="flex items-center gap-2 cursor-pointer py-1">
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
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{formatFacilityLabel(f)}</span>
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

        {/* Apply button */}
        <div className="px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Terapkan Filter
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
