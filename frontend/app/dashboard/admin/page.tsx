'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
    }
    router.push('/auth/login');
  };

  const recentLeads = [
    { id: 'LD-1001', name: 'Srikanth Rao', phone: '+91 98765 12345', property: 'Bhavya Royal Villa', status: 'NEW LEAD', date: '26 Aug 2026' },
    { id: 'LD-1002', name: 'Kavitha Reddy', phone: '+91 98765 67890', property: 'Green Acres Plot Layout', status: 'SITE VISIT REQUESTED', date: '25 Aug 2026' },
    { id: 'LD-1003', name: 'Mahesh Kumar', phone: '+91 98765 11223', property: 'Aurora Sky Residences', status: 'CONTACTED', date: '25 Aug 2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Admin Top Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950 p-8 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              SYSTEM LIVE
            </span>
          </div>
          <h1 className="text-3xl font-black pt-1">Bhavya Homes Management Portal</h1>
          <p className="text-slate-400 text-xs">Logged in as Administrator (admin@bhavyahomes.com)</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-3 rounded-xl border border-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Real Estate Analytics Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Properties</span>
          <div className="text-3xl font-black text-slate-950">14</div>
          <span className="text-[11px] text-emerald-600 font-semibold">9 Villas, 5 Layout Plots</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Projects & Townships</span>
          <div className="text-3xl font-black text-slate-950">6</div>
          <span className="text-[11px] text-amber-600 font-semibold">3 Ongoing, 3 Upcoming</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries & Leads</span>
          <div className="text-3xl font-black text-slate-950">48</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+12 New This Week</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Site Visits</span>
          <div className="text-3xl font-black text-amber-500">18</div>
          <span className="text-[11px] text-slate-500 font-semibold">Cab Assigned for 14 Visits</span>
        </div>
      </div>

      {/* Admin Action Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
          <div className="text-2xl">🏡</div>
          <h3 className="text-lg font-black text-slate-900">Property Inventory Management</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Create new villa or plot listings, upload 8K renders, update pricing & HMDA approval status.
          </p>
          <button className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-md">
            + Add New Property Listing
          </button>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
          <div className="text-2xl">🌆</div>
          <h3 className="text-lg font-black text-slate-900">Township Project Management</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Update ongoing master plans, add new mega ventures, and upload master layout PDFs.
          </p>
          <button className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-md">
            + Create Mega Venture Project
          </button>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
          <div className="text-2xl">🚕</div>
          <h3 className="text-lg font-black text-slate-900">Site Visit Cab Dispatch</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Assign agents and free pickup cabs for customer site visits requested online.
          </p>
          <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-md">
            Dispatch Site Visit Cabs
          </button>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900">Recent Customer Inquiries & Leads</h2>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            REAL-TIME FEED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                <th className="p-4 pl-6">Lead ID</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Target Property</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-900">{lead.id}</td>
                  <td className="p-4 font-extrabold text-slate-900">{lead.name}</td>
                  <td className="p-4">{lead.phone}</td>
                  <td className="p-4 text-amber-600 font-bold">{lead.property}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-black">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-slate-400">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
