'use client';

import { useState, useEffect, useCallback } from 'react';
import type { School } from '@/types';

const API = '/api/admin/schools';

type AdminView = 'login' | 'dashboard' | 'edit';

interface SchoolForm {
  name: string;
  slug: string;
  type: string;
  kurikulum: string;
  fees: string;
  location: string;
  akreditasi: string;
  facilities: string;
  program: string;
  fullDay: boolean;
  website: string;
  dataNote: string;
  description: string;
}

const emptyForm: SchoolForm = {
  name: '', slug: '', type: 'Swasta', kurikulum: 'Nasional', fees: '0',
  location: '', akreditasi: 'C', facilities: '', program: 'Agama Umum',
  fullDay: false, website: '', dataNote: '', description: '',
};

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('login');
  const [pass, setPass] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [form, setForm] = useState<SchoolForm>(emptyForm);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const apiCall = useCallback(async (method: string, body?: any, slug?: string) => {
    const url = slug ? `${API}?slug=${encodeURIComponent(slug)}` : API;
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': pass,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }, [pass]);

  const loadSchools = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiCall('GET');
      if (res.ok) setSchools(await res.json());
      else showMsg('error', 'Gagal memuat data');
    } catch {
      showMsg('error', 'Gagal memuat data');
    }
    setLoading(false);
  }, [apiCall]);

  const handleLogin = async () => {
    // Test auth by trying to fetch schools
    const res = await apiCall('GET');
    if (res.ok) {
      setView('dashboard');
      const data = await res.json();
      setSchools(data);
    } else {
      showMsg('error', 'Password salah!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body: Record<string, any> = {
      ...form,
      fees: parseInt(form.fees) || 0,
      facilities: form.facilities ? form.facilities.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
      dataNote: form.dataNote,
    };
    delete (body as any).slug; // auto-generated for new

    const isEdit = !!editSlug;
    const res = await apiCall(isEdit ? 'PUT' : 'POST', body, isEdit ? editSlug! : undefined);

    if (res.ok) {
      showMsg('success', isEdit ? 'Sekolah berhasil diupdate!' : 'Sekolah berhasil ditambahkan!');
      setForm(emptyForm);
      setEditSlug(null);
      setView('dashboard');
      await loadSchools();
    } else {
      const err = await res.text();
      showMsg('error', `Gagal: ${err}`);
    }
    setLoading(false);
  };

  const handleEdit = (school: School) => {
    setForm({
      name: school.name,
      slug: school.slug,
      type: school.type,
      kurikulum: school.kurikulum,
      fees: String(school.fees),
      location: school.location,
      akreditasi: school.akreditasi,
      facilities: (school.facilities || []).join(', '),
      program: school.program,
      fullDay: school.fullDay,
      website: school.website,
      dataNote: school.dataNote,
      description: school.description,
    });
    setEditSlug(school.slug);
    setView('edit');
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return;
    setLoading(true);
    const res = await apiCall('DELETE', undefined, slug);
    if (res.ok) {
      showMsg('success', `"${name}" berhasil dihapus`);
      await loadSchools();
    } else {
      showMsg('error', 'Gagal menghapus');
    }
    setLoading(false);
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Riset SD</h1>
          <input
            type="password"
            placeholder="Masukkan password admin"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Masuk
          </button>
          {message && (
            <p className={`text-sm mt-2 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <button onClick={() => { setView('dashboard'); setForm(emptyForm); setEditSlug(null); }}
            className="text-blue-600 mb-4 hover:underline">&larr; Kembali</button>
          <h1 className="text-2xl font-bold mb-6">{editSlug ? 'Edit Sekolah' : 'Tambah Sekolah'}</h1>
          <SchoolFormComponent form={form} setForm={setForm} onSubmit={handleSubmit} loading={loading} isEdit={!!editSlug} />
          {message && <MsgBubble msg={message} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Admin Riset SD</h1>
          <button onClick={() => { setForm(emptyForm); setEditSlug(null); setView('edit'); }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Tambah Sekolah
          </button>
        </div>

        {loading && <p className="text-gray-500">Memuat...</p>}

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Nama</th>
                <th className="text-left p-3">Tipe</th>
                <th className="text-left p-3">Lokasi</th>
                <th className="text-left p-3">Akreditasi</th>
                <th className="text-right p-3">Biaya</th>
                <th className="text-center p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s) => (
                <tr key={s.slug} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.type}</td>
                  <td className="p-3">{s.location}</td>
                  <td className="p-3">{s.akreditasi}</td>
                  <td className="p-3 text-right">{s.fees.toLocaleString('id-ID')}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleEdit(s)}
                      className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(s.slug, s.name)}
                      className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {message && <MsgBubble msg={message} />}
      </div>
    </div>
  );
}

function SchoolFormComponent({ form, setForm, onSubmit, loading, isEdit }: {
  form: SchoolForm; setForm: (f: SchoolForm) => void;
  onSubmit: (e: React.FormEvent) => void; loading: boolean; isEdit: boolean;
}) {
  const update = (key: keyof SchoolForm, value: any) => setForm({ ...form, [key]: value });

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Sekolah *</label>
          <input className="w-full border rounded-lg px-3 py-2" value={form.name}
            onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug (auto jika kosong)</label>
          <input className="w-full border rounded-lg px-3 py-2" value={form.slug}
            onChange={(e) => update('slug', e.target.value)} disabled={isEdit} placeholder="contoh: sd-negeri-baru" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipe</label>
          <select className="w-full border rounded-lg px-3 py-2" value={form.type}
            onChange={(e) => update('type', e.target.value)}>
            <option>Negeri</option><option>Swasta</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kurikulum</label>
          <select className="w-full border rounded-lg px-3 py-2" value={form.kurikulum}
            onChange={(e) => update('kurikulum', e.target.value)}>
            <option>Nasional</option><option>Nasional Plus</option><option>Islam Terpadu</option><option>International</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Biaya (SPP/bulan)</label>
          <input type="number" className="w-full border rounded-lg px-3 py-2" value={form.fees}
            onChange={(e) => update('fees', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lokasi (Kecamatan)</label>
          <select className="w-full border rounded-lg px-3 py-2" value={form.location}
            onChange={(e) => update('location', e.target.value)}>
            <option value="">Pilih...</option>
            {['Beji','Pancoran Mas','Cimanggis','Sawangan','Sukmajaya','Tapos','Limo','Cinere','Bojongsari'].map(l =>
              <option key={l} value={l}>{l}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Akreditasi</label>
          <select className="w-full border rounded-lg px-3 py-2" value={form.akreditasi}
            onChange={(e) => update('akreditasi', e.target.value)}>
            <option value="A">A</option><option value="B">B</option><option value="C">C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Program</label>
          <select className="w-full border rounded-lg px-3 py-2" value={form.program}
            onChange={(e) => update('program', e.target.value)}>
            <option>Agama Umum</option><option>Islam Full Day</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input type="checkbox" id="fullDay" checked={form.fullDay}
            onChange={(e) => update('fullDay', e.target.checked)} />
          <label htmlFor="fullDay" className="text-sm font-medium">Full Day</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input className="w-full border rounded-lg px-3 py-2" value={form.website}
            onChange={(e) => update('website', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fasilitas (pisahkan dengan koma)</label>
        <input className="w-full border rounded-lg px-3 py-2" value={form.facilities}
          onChange={(e) => update('facilities', e.target.value)} placeholder="laboratorium, lapangan, masjid" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Catatan Biaya</label>
        <input className="w-full border rounded-lg px-3 py-2" value={form.dataNote}
          onChange={(e) => update('dataNote', e.target.value)} placeholder="SPP estimasi: Rp1-2jt" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={form.description}
          onChange={(e) => update('description', e.target.value)} />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? 'Menyimpan...' : isEdit ? 'Update Sekolah' : 'Tambah Sekolah'}
      </button>
    </form>
  );
}

function MsgBubble({ msg }: { msg: { type: string; text: string } }) {
  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
      msg.type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {msg.text}
    </div>
  );
}
