'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FloorPlan {
  id: string;
  title: string;
  category: 'VILLAS' | 'OPEN PLOTS' | 'APARTMENTS';
  area: string;
  facing: string;
  approval: string;
  image: string;
  highlights: string[];
}

export default function FloorPlansPage() {
  const [filter, setFilter] = useState<'ALL' | 'VILLAS' | 'OPEN PLOTS' | 'APARTMENTS'>('ALL');

  const plans: FloorPlan[] = [
    {
      id: 'fp-1',
      title: 'Luxury 4BHK East-Facing Villa Blueprint',
      category: 'VILLAS',
      area: '3,800 Sq.Ft (G+1 Floor)',
      facing: '100% East Facing (Vasthu Compliant)',
      approval: 'HMDA & TS RERA Approved',
      image: '/floor-plan-villa.jpg',
      highlights: [
        'Grand 22x18 Ft Living Hall & Dining',
        '20x16 Ft Master Bedroom with Ensuite Walk-in Closet',
        'Car Porch (24x16 Ft) & Landscaped Garden',
        'Modular Kitchen with 8x6 Ft Utility',
      ],
    },
    {
      id: 'fp-2',
      title: '50-Acre Township Master Layout Plotting Map',
      category: 'OPEN PLOTS',
      area: '200 to 500 Sq.Yds Plots',
      facing: 'East / West / North-East Facing Plots',
      approval: 'HMDA Approved LP No: 02400014',
      image: '/floor-plan-plot.jpg',
      highlights: [
        "60-Foot Main Blacktop Roads & 40-Foot Internal Roads",
        'Central 3.5-Acre Botanical Park & Children Play Area',
        '2.5-Acre Luxury Clubhouse Reserve Plot',
        'Underground Drainage, Water & Electrical Lines',
      ],
    },
    {
      id: 'fp-3',
      title: 'Aurora 3BHK Skyline Apartment Floor Plan',
      category: 'APARTMENTS',
      area: '1,850 Sq.Ft (High-Rise Tower)',
      facing: 'North-East Corner Unit',
      approval: 'GHMC / RERA Approved',
      image: '/floor-plan-apartment.jpg',
      highlights: [
        'Spacious Foyer Entry & Double Balconies',
        'Master Bedroom with Wooden Flooring',
        'Dedicated Covered Basement Car Parking',
        '100% Power Backup & 3 High-Speed Lifts',
      ],
    },
  ];

  const filteredPlans = plans.filter(p => filter === 'ALL' || p.category === filter);

  return (
    <div className="space-y-16 py-12">
      
      {/* Page Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-black text-slate-950 bg-amber-400 px-4 py-1.5 rounded-full uppercase tracking-wider">
          ARCHITECTURAL BLUEPRINTS & MASTER PLANS
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Venture Floor Plans & Layout Maps
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore precision-engineered 2D/3D floor plan blueprints and HMDA approved township master layouts.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-2 text-xs font-bold">
          {[
            { key: 'ALL', label: 'All Layouts' },
            { key: 'VILLAS', label: '🏡 Villa Plans' },
            { key: 'OPEN PLOTS', label: '🗺️ Plot Master Maps' },
            { key: 'APARTMENTS', label: '🏢 Apartment Plans' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`py-3 px-6 rounded-xl transition-all ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Floor Plan Cards List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Blueprint Image (7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[450px] bg-slate-950 flex items-center justify-center p-4">
              <Image
                src={plan.image}
                alt={plan.title}
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {plan.category}
              </span>
            </div>

            {/* Right Specification Panel (5 Cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  {plan.title}
                </h2>
                
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <p className="flex items-center space-x-2">
                    <span className="text-amber-600 font-bold">📐 Area Size:</span>
                    <span>{plan.area}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-amber-600 font-bold">🧭 Facing & Vasthu:</span>
                    <span>{plan.facing}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-amber-600 font-bold">📜 Approvals:</span>
                    <span className="text-emerald-700 font-bold">{plan.approval}</span>
                  </p>
                </div>

                <hr className="border-slate-200" />

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                    Blueprint Highlights:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {plan.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full inline-block text-center bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Request Detailed Floor Plan PDF →
                </Link>
                <Link
                  href="/properties"
                  className="w-full inline-block text-center bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors"
                >
                  View Available Inventory Units
                </Link>
              </div>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
