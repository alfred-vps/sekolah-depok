import React from 'react';

interface ResultHeaderProps {
  total: number;
  filtered: number;
}

export default function ResultHeader({ total, filtered }: ResultHeaderProps) {
  return (
    <div className="flex items-baseline gap-2 mb-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {filtered === total
          ? `${total} sekolah ditemukan`
          : `${filtered} dari ${total} sekolah`}
      </h2>
      {filtered !== total && (
        <span className="text-sm text-gray-400">
          (ditampilkan {filtered} sekolah)
        </span>
      )}
    </div>
  );
}
