'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  image: string;
  status: 'ONGOING' | 'UPCOMING' | 'COMPLETED';
  type: string;
  startingPrice: string;
  highlights: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        const rawProjs = data.data || data;
        if (Array.isArray(rawProjs) && rawProjs.length > 0) {
          const loaded: ProjectItem[] = rawProjs.map((p: any) => ({
            id: p._id || p.id,
            name: p.name || p.title,
            slug: p.slug || (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            location: p.location.includes('Hyderabad') ? p.location : `${p.location}, ${p.city || 'Hyderabad'}`,
            description: p.description || 'HMDA & RERA Approved Premium Venture.',
            image: (p.images && p.images[0]) || p.image || '/hero-bg.jpg',
            status: (p.status ? String(p.status).toUpperCase() : 'ONGOING') as any,
            type: p.projectType || 'Master Planned Layout',
            startingPrice: p.price >= 10000000
              ? `₹ ${(p.price / 10000000).toFixed(2)} Cr`
              : `₹ ${(Number(p.price || 4800000) / 100000).toFixed(0)} Lakhs`,
            highlights: p.amenities && p.amenities.length > 0 ? p.amenities : ['HMDA Approved', 'Clear Title', 'Spot Registration'],
          }));
          setProjects(loaded);
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => {
        setProjects(fallbackProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  const fallbackProjects: ProjectItem[] = [
    {
      id: 'proj-1',
      name: 'Bhavya Royal County Gated Layout',
      slug: 'bhavya-royal-county',
      location: 'Kokapeta - Gachibowli Financial District, Hyderabad',
      description: 'HMDA & RERA approved mega 50-acre gated luxury villa & plot community located at Kokapeta / Gachibowli corridor.',
      image: '/hero-bg.jpg',
      status: 'ONGOING',
      type: 'GATED COMMUNITY',
      startingPrice: '₹ 1.85 Cr',
      highlights: ['100ft & 40ft Blacktop Roads', 'Underground Cabling', 'Luxury Clubhouse', 'Swimming Pool'],
    },
    {
      id: 'proj-2',
      name: 'Bhavya Green Acres Open Plot Layout',
      slug: 'bhavya-green-acres',
      location: 'Shadnagar Regional Ring Road Corridor, Hyderabad',
      description: 'Prime HMDA open plot layout near Shadnagar Regional Ring Road corridor with instant spot registration.',
      image: '/plot1.jpg',
      status: 'ONGOING',
      type: 'OPEN PLOTS',
      startingPrice: '₹ 48 Lakhs',
      highlights: ['Grand Entrance Archway', 'Children Play Park', 'Avenue Plantation', 'Compound Wall'],
    },
    {
      id: 'proj-3',
      name: 'Bhavya Meenakshi County Mega Township',
      slug: 'bhavya-meenakshi-county',
      location: 'Tellapur - Kollur ORR Corridor, Hyderabad',
      description: 'Upcoming 75-Acre mega luxury gated township at Tellapur / Kollur ORR Exit 2 with pre-launch pricing advantages.',
      image: '/hero-bg.jpg',
      status: 'UPCOMING',
      type: 'GATED COMMUNITY',
      startingPrice: '₹ 65 Lakhs',
      highlights: ['25,000 Sq.Ft Clubhouse', 'Pre-Launch Offer', 'Crystal Lake View', 'Underground Cabling'],
    },
    {
      id: 'proj-4',
      name: 'Bhavya Emerald Crest Sky Residences',
      slug: 'bhavya-emerald-crest',
      location: 'Narsingi - Financial District, Hyderabad',
      description: 'Upcoming 38-Story high-rise luxury towers in Narsingi - Financial District offering 3 & 4 BHK sky villas.',
      image: '/apartment1.jpg',
      status: 'UPCOMING',
      type: 'APARTMENTS',
      startingPrice: '₹ 1.25 Cr',
      highlights: ['38-Story Sky Towers', 'Infinity Balconies', 'Sky Lounge', 'Multi-tier Security'],
    },
    {
      id: 'proj-5',
      name: 'Bhavya Serene Park View Enclave',
      slug: 'bhavya-serene-park',
      location: 'Miyapur - Bachupally Highway, Hyderabad',
      description: 'Successfully completed and 100% occupied triplex villa township with active clubhouse and sports facilities.',
      image: '/villa1.jpg',
      status: 'COMPLETED',
      type: 'VILLAS',
      startingPrice: '₹ 1.85 Cr',
      highlights: ['100% Occupied', 'Active Clubhouse', 'Solar Fencing', 'Landscaped Botanical Garden'],
    },
  ];

  const filteredProjects = selectedStatus === 'ALL'
    ? projects
    : projects.filter(p => p.status === selectedStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Real Estate Projects & Townships</h1>
          <p className="text-slate-600 text-sm mt-1">
            Explore ongoing, upcoming, and completed mega ventures directly from database.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'ONGOING', 'UPCOMING', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedStatus === status
                  ? 'bg-slate-950 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {status === 'ALL' ? 'All Projects' : `${status} PROJECTS`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 space-y-3">
          <div className="animate-spin text-3xl">⏳</div>
          <p className="text-sm font-bold text-slate-500">Loading Realtime Projects from Database...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <span className="text-4xl">🏗️</span>
          <h3 className="text-lg font-bold text-slate-900">No Projects Found in Database</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No ventures found matching the selected criteria. Add new township projects to display them live here.
          </p>
        </div>
      ) : (
        /* Projects List Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Project Image Banner */}
              <div className="relative h-72 sm:h-80 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md ${
                      project.status === 'ONGOING'
                        ? 'bg-emerald-600 text-white'
                        : project.status === 'UPCOMING'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {project.status} PROJECT
                  </span>
                </div>

                {/* Starting Price Overlay */}
                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/30 text-amber-400 font-extrabold px-4 py-2 rounded-2xl text-sm shadow-xl">
                  Starting from <span className="text-white font-black text-lg">{project.startingPrice}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                    <span>📍</span>
                    <span>{project.location}</span>
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed pt-1">
                    {project.description}
                  </p>

                  {/* Highlights Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        ✨ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-center w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl transition-colors shadow-md uppercase tracking-wider"
                  >
                    Explore Project Master Plan
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-center w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-extrabold py-3.5 rounded-xl transition-all shadow-md uppercase tracking-wider"
                  >
                    Book Site Visit
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
