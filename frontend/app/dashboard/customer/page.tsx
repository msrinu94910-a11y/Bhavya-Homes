'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Valued Customer');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user_email');
      const name = localStorage.getItem('user_name');
      if (email) {
        setUserEmail(email);
        if (name) {
          setUserName(name);
        } else {
          // Extract display name from email (e.g. balu@gmail.com -> Balu)
          let derived = email.split('@')[0];
          derived = derived.charAt(0).toUpperCase() + derived.slice(1);
          setUserName(derived);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    }
    router.push('/auth/login');
  };

  const sampleVisits = [
    {
      id: 'sv-101',
      property: 'Bhavya Royal Luxury Villa',
      location: 'Gachibowli, Hyderabad',
      date: '28th August 2026',
      time: '11:00 AM',
      status: 'CONFIRMED',
      agent: 'Vikram Reddy (+91 98765 00011)',
      image: '/villa1.jpg',
    },
    {
      id: 'sv-102',
      property: 'Bhavya Green Acres Open Plot Layout',
      location: 'Shadnagar Corridor, Hyderabad',
      date: '30th August 2026',
      time: '03:30 PM',
      status: 'SCHEDULED',
      agent: 'Anita Sharma (+91 98765 00022)',
      image: '/plot1.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950 p-8 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            CUSTOMER DASHBOARD
          </span>
          <h1 className="text-3xl font-black pt-1">Welcome, {userName}!</h1>
          <p className="text-slate-400 text-xs">{userEmail || 'customer@bhavyahomes.com'}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/properties"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-extrabold px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
          >
            + Explore Properties
          </Link>
          <button
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-3 rounded-xl border border-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Site Visits</span>
          <div className="text-3xl font-black text-slate-950">2</div>
          <span className="text-[11px] text-emerald-600 font-semibold">✓ Free Cab Provided</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted Ventures</span>
          <div className="text-3xl font-black text-slate-950">3</div>
          <span className="text-[11px] text-amber-600 font-semibold">⭐ Saved Items</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bank Loan Eligibility</span>
          <div className="text-3xl font-black text-emerald-600">APPROVED</div>
          <span className="text-[11px] text-slate-500 font-semibold">Pre-Approved Up To ₹ 2 Cr</span>
        </div>
      </div>

      {/* Scheduled Site Visits List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900">Your Scheduled Site Visits</h2>
          <Link href="/contact" className="text-xs font-bold text-amber-600 hover:underline">
            + Schedule New Visit
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-lg transition-all"
            >
              <div className="relative w-full sm:w-40 h-36 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0">
                <Image
                  src={visit.image}
                  alt={visit.property}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {visit.status}
                </span>
              </div>

              <div className="flex-1 space-y-2 justify-between flex flex-col">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">{visit.property}</h3>
                  <p className="text-xs text-slate-500">📍 {visit.location}</p>
                  <p className="text-xs font-semibold text-slate-700 pt-1">
                    📅 {visit.date} at {visit.time}
                  </p>
                  <p className="text-xs text-slate-500">
                    👤 Assigned Agent: <span className="text-slate-900 font-bold">{visit.agent}</span>
                  </p>
                </div>

                <div className="flex space-x-2 pt-2 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Reschedule
                  </Link>
                  <button className="text-xs font-semibold text-slate-500 hover:text-red-600 px-3 py-1.5">
                    Cancel Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
