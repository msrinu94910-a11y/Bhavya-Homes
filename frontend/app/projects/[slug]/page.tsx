'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const projectName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-black text-white bg-emerald-600 px-3.5 py-1 rounded-full uppercase tracking-wider">
            ONGOING MEGA TOWNSHIP
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            HMDA & RERA APPROVED
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">{projectName}</h1>
        <p className="text-slate-600 font-medium">📍 Miyapur - Bachupally Highway Growth Corridor, Hyderabad</p>
      </div>

      {/* Main Showcase & Master Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* Banner Image */}
          <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
            <Image
              src="/project1.jpg"
              alt={projectName}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Master Plan & Venture Highlights */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
              Project Master Plan & Infrastructure Highlights
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Bhavya Paradise Mega Township is a 50-acre master-planned gated venture designed for modern living and rapid capital appreciation. Featuring 60ft and 40ft blacktop avenue roads, grand double-height entrance archway, underground electrical cabling, 24x7 security guard surveillance, and a 25,000 sq.ft luxury clubhouse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-sm font-bold text-slate-900">🛣️ 60' & 40' Blacktop Roads</span>
                <p className="text-xs text-slate-500">Wide avenue roads with curb stones and LED street lighting.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-sm font-bold text-slate-900">🏊‍♂️ 25,000 Sq.Ft Clubhouse</span>
                <p className="text-xs text-slate-500">Swimming pool, gymnasium, indoor badminton & banquet hall.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-sm font-bold text-slate-900">🌳 Landscaped Parks</span>
                <p className="text-xs text-slate-500">Children play area, jogging tracks & manicured green lawns.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-sm font-bold text-slate-900">📜 100% Legal Title</span>
                <p className="text-xs text-slate-500">HMDA approved layout with spot registration & bank loans.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Site Visit Inquiry Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 h-fit sticky top-28">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Plots & Villas Starting From</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
              ₹ 48 Lakhs <span className="text-xs text-slate-500 font-normal">Onwards</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/contact"
              className="block text-center w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-4 rounded-2xl text-sm shadow-md transition-all uppercase tracking-wider"
            >
              Book Priority Site Visit
            </Link>

            <Link
              href="/contact"
              className="block text-center w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl text-sm shadow-md transition-all uppercase tracking-wider"
            >
              Download Master Layout PDF
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
            <p className="flex items-center space-x-2">
              <span>✔️</span> <span>Instant Bank Loan Pre-Approval</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>✔️</span> <span>Free Cab Facility for Site Visits</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
