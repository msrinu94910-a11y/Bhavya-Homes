'use client';

import React, { useState } from 'react';
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

const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Bhavya Paradise Mega Township',
    slug: 'bhavya-paradise-enclave',
    location: 'Miyapur - Bachupally Highway, Hyderabad',
    description: '50-Acre Master Planned Gated Community Layout featuring luxury villa plots, 3BHK high-rise apartments, and a 25,000 sq.ft clubhouse.',
    image: '/project1.jpg',
    status: 'ONGOING',
    type: 'Gated Villa Plots & Apartments',
    startingPrice: '₹ 48 Lakhs',
    highlights: ['HMDA & RERA Approved', '60ft & 40ft BT Roads', 'Grand Arch & Security', 'Underground Utilities'],
  },
  {
    id: 'proj-2',
    name: 'Bhavya County Luxury Estate',
    slug: 'bhavya-county-luxury-estate',
    location: 'Pharma City Growth Corridor, Hyderabad',
    description: 'Ultra-Luxury Gated Community Venture with resort-style amenities, private swimming pool, sports courts, and 100% clear titles.',
    image: '/hero-bg.jpg',
    status: 'ONGOING',
    type: 'Luxury Villa Layout',
    startingPrice: '₹ 65 Lakhs',
    highlights: ['Spot Registration', 'Bank Loan Support', '100% Vastu Compliant', 'Avenue Plantation'],
  },
  {
    id: 'proj-3',
    name: 'Bhavya Green Acres Phase-II',
    slug: 'bhavya-green-acres-phase-2',
    location: 'Shadnagar Highway, Hyderabad',
    description: 'Upcoming premium open plot venture strategically located along the rapidly growing industrial and regional ring road growth corridor.',
    image: '/plot1.jpg',
    status: 'UPCOMING',
    type: 'Open Plot Layout',
    startingPrice: '₹ 28 Lakhs',
    highlights: ['DTCP Approved Layout', 'Rapid Appreciation Zone', 'Overhead Water Tank', 'Children Play Park'],
  },
];

export default function ProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredProjects = selectedStatus === 'ALL'
    ? initialProjects
    : initialProjects.filter(p => p.status === selectedStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Real Estate Projects & Townships</h1>
          <p className="text-slate-600 text-sm mt-1">
            Explore ongoing, upcoming, and completed mega ventures engineered by Bhavya Homes.
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

      {/* Projects List Grid */}
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
    </div>
  );
}
