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

  const circularAmenities = [
    { title: 'OCCUPANCY CERTIFICATE OBTAINED', icon: '📜' },
    { title: 'HMDA APPROVED LAYOUT', icon: '✔️' },
    { title: 'AVENUE PLANTATION', icon: '🌳' },
    { title: 'CHILDREN PARK CUM PLAY AREA', icon: '🛝' },
    { title: 'PREMIUM LANDSCAPING', icon: '🏡' },
    { title: 'ENTRANCE GATE WITH DESIGNED ARCH', icon: '⛩️' },
    { title: 'UNDERGROUND DRAINAGE', icon: '🕳️' },
    { title: '100% VASTHU', icon: '🧭' },
    { title: 'BT ROADS', icon: '🛣️' },
    { title: 'OVER HEAD TANK', icon: '🚰' },
    { title: 'GOOD GROUND WATER', icon: '💧' },
    { title: 'ELECTRICITY WITH STREET LIGHTS', icon: '💡' },
    { title: 'NO POLLUTION', icon: '🍃' },
    { title: 'BANK LOAN FACILITY AVAILABLE', icon: '🏦' },
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
                className="w-full inline-block text-center bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-2xl text-xs transition-colors shadow-sm"
              >
                Schedule Site Visit to Experience →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Complete Venture Infrastructure Features */}
      <section className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 text-slate-900 py-16 border-t border-b border-amber-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-amber-900 uppercase tracking-wider">
              Complete Venture Infrastructure Features
            </h2>
            <p className="text-2xl font-black text-slate-950 tracking-wide">
              Experience the Art of Opulence in its True Sense
            </p>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
              Every plot and villa in Bhavya Homes County is backed by 100% legal compliance and master-planned execution.
            </p>
          </div>

          {/* 14 Circular Amenities Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-y-10 gap-x-4 justify-center text-center">
            {circularAmenities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="relative w-20 h-20 rounded-full border-2 border-amber-300 bg-white flex items-center justify-center text-3xl shadow-md group-hover:border-amber-500 group-hover:scale-110 group-hover:bg-amber-50 transition-all duration-300">
                  <span className="transform group-hover:scale-110 transition-transform">{item.icon}</span>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-800 group-hover:text-amber-700 tracking-wider max-w-[120px] leading-tight transition-colors">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-amber-200/80">
            <Link
              href="/properties"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-md inline-block transform hover:scale-105"
            >
              Explore Available Plot & Villa Listings
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
