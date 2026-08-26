import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AmenitiesPage() {
  const mainAmenities = [
    {
      id: 'amenity-1',
      title: 'Grand Entrance Archway & 24/7 Security',
      category: 'SAFETY & ACCESS',
      description: 'Monumental gated entrance gate structure with RFID boom barriers, 24/7 security guard surveillance, and biometric access control.',
      image: '/hero-entrance.jpg',
      badge: 'SECURITY',
      features: ['RFID Gate Access', '24x7 Guard Cabin', 'CCTV Surveillance', 'Solar Fencing'],
    },
    {
      id: 'amenity-2',
      title: 'Luxury Clubhouse & Infinity Pool',
      category: 'RECREATION & LEISURE',
      description: '15,000 Sq.Ft grand clubhouse featuring crystal-clear illuminated swimming pool, air-conditioned gym, indoor games, and party hall.',
      image: '/amenity1.jpg',
      badge: 'CLUBHOUSE',
      features: ['Infinity Swimming Pool', 'Modern Fitness Gym', 'Badminton Court', 'Community Banquet Hall'],
    },
    {
      id: 'amenity-3',
      title: 'Landscaped Botanical Parks & Play Area',
      category: 'GREEN ECO-SYSTEM',
      description: 'Sprawling green parks with manicured lawns, botanical flower gardens, kids play zones, gazebo seating, and paved jogging tracks.',
      image: '/amenity2.jpg',
      badge: 'PARKS & LANDSCAPE',
      features: ['Children Play Area', 'Senior Citizen Park', 'Gazebo Lounges', '1.5 KM Jogging Track'],
    },
  ];

  const infrastructureHighlights = [
    { icon: '🛣️', title: "60' & 40' Blacktop Roads", desc: 'Wide asphalt roads engineered with underground storm water drains and avenue plantation.' },
    { icon: '⚡', title: 'Underground Power Cabling', desc: 'Concealed electrical lines with individual transformer sub-stations and LED streetlights.' },
    { icon: '💧', title: '24/7 Water Overhead Tank', desc: 'Dedicated water storage tank connected to individual plot water pipelines & STP plant.' },
    { icon: '📜', title: '100% HMDA & RERA Approved', desc: 'Completely clear title venture with compound wall surrounding the entire 50-acre township.' },
  ];

  return (
    <div className="space-y-16 py-12">
      
      {/* Page Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-black text-slate-950 bg-amber-400 px-4 py-1.5 rounded-full uppercase tracking-wider">
          WORLD-CLASS VENTURE INFRASTRUCTURE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Venture Amenities & Infrastructure
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Engineered to international real estate standards for high property appreciation and serene gated community living.
        </p>
      </section>

      {/* Main Photorealistic Amenity Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {mainAmenities.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
            <div>
              {/* Image Banner */}
              <div className="relative h-64 w-full bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-slate-950/90 text-amber-400 border border-amber-500/40 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block">
                  {item.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.description}
                </p>

                {/* Feature Tags */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {item.features.map((feat, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href="/contact"
                className="w-full inline-block text-center bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-sm"
              >
                Schedule Site Visit to Experience →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Grid of Infrastructure Perks */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-amber-400">Complete Venture Infrastructure Features</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Every plot and villa in Bhavya Homes County is backed by 100% legal compliance and master-planned execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructureHighlights.map((perk, idx) => (
              <div key={idx} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-amber-500/50 transition-all">
                <div className="text-3xl">{perk.icon}</div>
                <h3 className="text-base font-bold text-white">{perk.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              href="/properties"
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg inline-block transform hover:scale-105"
            >
              Explore Available Plot & Villa Listings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
