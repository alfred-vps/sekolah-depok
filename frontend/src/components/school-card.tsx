import React from 'react';
import type { School } from '@/types';
import Badge from './badge';

interface SchoolCardProps {
  school: School;
}

function formatCurrency(amount: number): string {
  if (amount === 0) return 'Gratis';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getAkreditasiVariant(akreditasi: string): 'success' | 'warning' | 'danger' {
  if (akreditasi === 'A') return 'success';
  if (akreditasi === 'B') return 'warning';
  return 'danger';
}

function formatFacilityLabel(facility: string): string {
  const labels: Record<string, string> = {
    laboratorium: 'Laboratorium',
    lapangan: 'Lapangan',
    perpustakaan: 'Perpustakaan',
    kantin: 'Kantor',
    masjid: 'Masjid',
    aula: 'Aula',
    bilingual: 'Bilingual',
    kolam_renang: 'Kolam Renang',
    kebun: 'Kebun',
    asrama: 'Asrama',
  };
  return labels[facility] ?? facility;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        {/* Header with name and badges */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {school.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="primary">{school.type}</Badge>
            <Badge variant={getAkreditasiVariant(school.akreditasi)}>
              Akreditasi {school.akreditasi}
            </Badge>
            {school.fullDay && <Badge variant="warning">Full Day</Badge>}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-3 text-sm">
          <div className="text-gray-500">Kurikulum</div>
          <div className="text-gray-800 font-medium text-right">{school.kurikulum}</div>
          <div className="text-gray-500">Biaya</div>
          <div className="text-gray-800 font-medium text-right">
            {school.type === 'Negeri' ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              <span>{formatCurrency(school.fees)}/bln</span>
            )}
          </div>
          <div className="text-gray-500">Lokasi</div>
          <div className="text-gray-800 font-medium text-right">{school.location}</div>
          <div className="text-gray-500">Program</div>
          <div className="text-gray-800 font-medium text-right">{school.program}</div>
        </div>

        {/* Facilities tags */}
        {school.facilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {school.facilities.map((facility) => (
              <span
                key={facility}
                className="inline-block px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-200"
              >
                {formatFacilityLabel(facility)}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {school.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{school.description}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          {school.dataNote && (
            <span className="text-xs text-gray-400 italic">{school.dataNote}</span>
          )}
          {school.website ? (
            <a
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 underline ml-auto"
            >
              Website
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
