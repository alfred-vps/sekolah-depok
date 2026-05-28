import React from 'react';
import type { School } from '@/types';
import SchoolCard from './school-card';

interface SchoolGridProps {
  schools: School[];
}

export default function SchoolGrid({ schools }: SchoolGridProps) {
  if (schools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-500 mb-2">Tidak ada sekolah ditemukan</h3>
        <p className="text-gray-400 text-center max-w-md">
          Coba ubah filter atau kata kunci pencarian untuk menemukan sekolah yang sesuai
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {schools.map((school) => (
        <SchoolCard key={school.slug} school={school} />
      ))}
    </div>
  );
}
