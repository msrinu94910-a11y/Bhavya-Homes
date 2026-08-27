'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  image: string;
  type: string;
  area?: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [selectedType, setSelectedType] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => {
        const rawProps = data.data || data;
        if (Array.isArray(rawProps)) {
          const loaded: PropertyItem[] = rawProps.map((p: any) => ({
            id: p._id || p.id,
            title: p.title || p.name,
            slug: p.slug || (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            price: Number(p.price) || 0,
            location: p.location.includes('Hyderabad') ? p.location : `${p.location}, ${p.city || 'Hyderabad'}`,
            image: (p.images && p.images[0]) || p.image || '/villa1.jpg',
            type: p.propertyType || p.type || 'VILLA',
            area: typeof p.area === 'number' ? `${p.area.toLocaleString()} Sq.Ft` : p.area,
          }));
          setProperties(loaded);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filterTypes = ['ALL', 'VILLA', 'OPEN PLOT', 'APARTMENT'];

  const filteredProperties = selectedType === 'ALL'
    ? properties
    : properties.filter(p => p.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Featured Properties & Plots</h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse HMDA & DTCP approved open plot layouts, luxury villas, and premium apartments directly from database.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === type
                  ? 'bg-slate-950 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type === 'ALL' ? 'All Properties' : `${type}S`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 space-y-3">
          <div className="animate-spin text-3xl">⏳</div>
          <p className="text-sm font-bold text-slate-500">Loading Realtime Properties from Database...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <span className="text-4xl">🏡</span>
          <h3 className="text-lg font-bold text-slate-900">No Properties Found in Database</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No listings found for the selected property type. Add new property listings via Admin Dashboard to view them live here.
          </p>
        </div>
      ) : (
        /* Properties Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Showcase Container */}
              <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-amber-400 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/40 shadow-md">
                  {prop.type}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  HMDA APPROVED
                </div>
              </div>

              {/* Property Information */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                    <span>📍</span>
                    <span>{prop.location}</span>
                  </p>
                  {prop.area && (
                    <p className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg w-fit">
                      📐 {prop.area}
                    </p>
                  )}
                  <div className="text-2xl font-black text-slate-950 pt-1">
                    ₹ {prop.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Card Action Buttons: View Details & Schedule Site Visit */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl transition-colors shadow-md"
                  >
                    View Plot / Property Details
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-center w-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold py-3 rounded-xl transition-colors border border-slate-200"
                  >
                    Schedule Site Visit
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
