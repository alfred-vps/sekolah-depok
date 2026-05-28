'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { FilterState, School } from '@/types';
import { filterSchools, initialFilterState, getActiveFilterCount, getActiveFilterPills } from '@/lib/filters';
import SearchBar from '@/components/search-bar';
import FilterSidebar from '@/components/filter-sidebar';
import FilterSheet from '@/components/filter-sheet';
import ResultHeader from '@/components/result-header';
import SchoolGrid from '@/components/school-grid';

interface FilterableSchoolListProps {
  schools: School[];
}

export default function FilterableSchoolList({ schools }: FilterableSchoolListProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const filteredSchools = useMemo(() => filterSchools(schools, filters), [schools, filters]);

  const activeFilterCount = useMemo(() => getActiveFilterCount(filters), [filters]);
  const activePills = useMemo(() => getActiveFilterPills(filters), [filters]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialFilterState());
  }, []);

  const removePill = useCallback((group: string, key: string) => {
    setFilters((prev) => {
      if (group === 'search') {
        return { ...prev, search: '' };
      }
      return {
        ...prev,
        [group]: (prev[group as keyof FilterState] as string[]).filter(
          (item: string) => `${group}-${item}` !== key
        ),
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">
              Riset SD
              <span className="text-blue-600"> Depok</span>
            </h1>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              {schools.length} sekolah
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchBar
                value={filters.search}
                onChange={(v) => setFilters((prev) => ({ ...prev, search: v }))}
              />
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterSheetOpen(true)}
              className="md:hidden relative flex items-center justify-center w-11 h-11 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Active filter pills */}
      {activePills.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1.5">
          {activePills.map((pill) => (
            <button
              key={pill.key}
              onClick={() => removePill(pill.group, pill.key)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors"
            >
              {pill.label}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          <button
            onClick={handleReset}
            className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full hover:bg-gray-200 transition-colors"
          >
            Reset semua
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Desktop sidebar filter */}
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
          />

          {/* Results */}
          <div className="flex-1 min-w-0">
            <ResultHeader total={schools.length} filtered={filteredSchools.length} />
            <SchoolGrid schools={filteredSchools} />
          </div>
        </div>
      </main>

      {/* Mobile filter sheet */}
      <FilterSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-400">
          Riset SD Depok — Informasi sekolah dasar di Kota Depok
        </div>
      </footer>
    </div>
  );
}
