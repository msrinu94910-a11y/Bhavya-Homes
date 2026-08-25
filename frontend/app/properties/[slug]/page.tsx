'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const propertyData = {
    id: `prop-${params.slug}`,
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: params.slug,
    price: 18500000,
    location: 'Gachibowli, Hyderabad, Telangana',
    image: '/villa1.jpg',
    type: 'VILLA',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-black text-amber-500 bg-slate-950 px-3 py-1 rounded-full uppercase tracking-wider">
            PREMIUM VILLA
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            HMDA & RERA APPROVED
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{propertyData.title}</h1>
        <p className="text-slate-600 font-medium">📍 {propertyData.location}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Image & Details Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
            <Image
              src={propertyData.image}
              alt={propertyData.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Property Overview & Features
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Experience the pinnacle of luxury living with modern architecture, private swimming pool, double-height ceilings, landscaped gardens, 100% Vastu compliance, and 24x7 gated community security.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xl font-bold text-slate-900">4 BHK</span>
                <span className="text-xs text-slate-500">Bedrooms</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xl font-bold text-slate-900">3,800</span>
                <span className="text-xs text-slate-500">Sq. Ft Area</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xl font-bold text-slate-900">East</span>
                <span className="text-xs text-slate-500">Facing</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xl font-bold text-slate-900">Ready</span>
                <span className="text-xs text-slate-500">Possession</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Inquiry Action Box */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 h-fit sticky top-28">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Investment Price</span>
            <div className="text-3xl font-black text-slate-950 mt-1">
              ₹ {propertyData.price.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/contact"
              className="block text-center w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold py-4 rounded-2xl text-sm shadow-md transition-all uppercase tracking-wider"
            >
              Book Priority Site Visit
            </Link>

            <Link
              href="/contact"
              className="block text-center w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl text-sm shadow-md transition-all uppercase tracking-wider"
            >
              Submit Property Inquiry
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
            <p className="flex items-center space-x-2">
              <span>✔️</span> <span>Instant Bank Loan Support Available</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>✔️</span> <span>Direct Builder Deal - Zero Commission</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
