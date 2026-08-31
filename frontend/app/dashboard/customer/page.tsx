'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SiteVisit {
  id: string;
  property: string;
  location: string;
  date: string;
  time: string;
  status: string;
  agent: string;
  image: string;
}

interface ShortlistedProp {
  id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  image: string;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Valued Customer');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'shortlist' | 'loan'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [visitsList, setVisitsList] = useState<SiteVisit[]>([
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
  ]);

  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [cancellingVisitId, setCancellingVisitId] = useState<string | null>(null);

  const handleCancelVisit = (id: string, propertyName: string) => {
    setCancellingVisitId(id);
    setTimeout(() => {
      setVisitsList((prev) => prev.filter((visit) => visit.id !== id));
      setCancellingVisitId(null);
      setNotification({
        type: 'success',
        message: `Site visit for "${propertyName}" has been successfully cancelled.`,
      });
      setTimeout(() => setNotification(null), 5000);
    }, 300);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user_token');
      const role = localStorage.getItem('user_role')?.toLowerCase();
      const email = localStorage.getItem('user_email');
      const name = localStorage.getItem('user_name');

      if (!token) {
        router.push('/auth/login');
        return;
      }

      const isAgentEmail = email && (
        email.includes('agent') ||
        email === 'rajesh@bhavyahomes.com' ||
        email === 'jana@gmail.com' ||
        email === 'srenivasulu@bhavyahomes.com' ||
        email === 'priya@bhavyahomes.com' ||
        email === 'ananya@bhavyahomes.com'
      );

      if (role === 'admin') {
        router.push('/dashboard/admin');
        return;
      } else if (role === 'agent' || isAgentEmail) {
        localStorage.setItem('user_role', 'agent');
        router.push('/dashboard/agent');
        return;
      }

      if (email) {
        setUserEmail(email);
        if (name) {
          setUserName(name);
        } else {
          let derived = email.split('@')[0];
          derived = derived.charAt(0).toUpperCase() + derived.slice(1);
          setUserName(derived);
        }
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    }
    router.push('/');
  };

  const shortlistedProps: ShortlistedProp[] = [
    {
      id: 'prop-1',
      name: 'Bhavya Royal Luxury Triplex Villa',
      type: 'VILLA',
      location: 'Gachibowli Growth Corridor, Hyderabad',
      price: '₹ 2.45 Crores',
      image: '/villa1.jpg',
    },
    {
      id: 'prop-2',
      name: 'Bhavya Green Acres Premium Open Plot',
      type: 'OPEN PLOT',
      location: 'Shadnagar Corridor, Hyderabad',
      price: '₹ 38.5 Lakhs',
      image: '/plot1.jpg',
    },
    {
      id: 'prop-3',
      name: 'Bhavya Grand Residency High-Rise',
      type: 'APARTMENT',
      location: 'Miyapur Main Road, Hyderabad',
      price: '₹ 85.0 Lakhs',
      image: '/apartment1.jpg',
    },
    {
      id: 'prop-4',
      name: 'Bhavya Heritage Executive Villa',
      type: 'VILLA',
      location: 'Kokapeta Financial District, Hyderabad',
      price: '₹ 1.65 Crores',
      image: '/villa1.jpg',
    },
    {
      id: 'prop-5',
      name: 'Bhavya Horizon Luxury Villa',
      type: 'VILLA',
      location: 'Kokapeta Corridor, Hyderabad',
      price: '₹ 1.85 Crores',
      image: '/villa1.jpg',
    },
    {
      id: 'prop-6',
      name: 'Bhavya Drillers Gated Open Plot Layout',
      type: 'OPEN PLOT',
      location: 'Shankarpally Corridor, Hyderabad',
      price: '₹ 1.72 Crores',
      image: '/plot1.jpg',
    },
  ];

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊', count: null },
    { id: 'visits', label: 'Scheduled Site Visits', icon: '🚗', count: visitsList.length },
    { id: 'shortlist', label: 'Shortlisted Ventures', icon: '⭐', count: shortlistedProps.length },
    { id: 'loan', label: 'Bank Loan Eligibility', icon: '🏦', count: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 overflow-x-hidden w-full no-scrollbar">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`w-64 bg-white text-slate-900 border-r border-slate-200 shadow-sm flex flex-col justify-between fixed inset-y-0 z-40 transform transition-transform duration-300 ease-in-out no-scrollbar overflow-y-auto md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header Brand Logo */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center font-black text-slate-950 text-base">
              BH
            </div>
            <div>
              <span className="font-black text-sm text-slate-900 tracking-tight block">BHAVYA HOMES</span>
              <span className="text-[10px] text-amber-700 font-black uppercase tracking-widest block -mt-0.5">
                CUSTOMER PORTAL
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-700 p-1"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Customer Dashboard Menu
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-extrabold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                      : 'text-slate-600 hover:bg-amber-50 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 px-3 pb-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Explore & Support
          </div>

          <div className="space-y-2 px-1">
            <Link
              href="/properties"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-all"
            >
              <span>🏡</span>
              <span>Browse Properties</span>
            </Link>

            <Link
              href="/contact"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span>📩</span>
              <span>Contact Agent / Support</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Bottom Profile Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-black text-xs flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 truncate">{userEmail || 'customer@bhavyahomes.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition-colors shadow-sm"
          >
            <span>🚪</span>
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8 space-y-8 min-h-screen w-full max-w-full overflow-x-hidden no-scrollbar">
        
        {/* Top Welcome Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 p-6 sm:p-8 rounded-3xl text-slate-900 border border-amber-300/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm"
            >
              ☰
            </button>
            <div className="space-y-1">
              <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/30 px-3.5 py-1 rounded-full border border-amber-400/40">
                CUSTOMER DASHBOARD
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 pt-1">Welcome, {userName}!</h1>
              <p className="text-slate-600 text-xs font-semibold">{userEmail || 'customer@bhavyahomes.com'}</p>
            </div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            
            {/* 1. FIRST: 6 AVAILABLE PROPERTIES CARDS GRID */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Explore Featured Properties & Ventures</h2>
                  <p className="text-xs text-slate-500">HMDA & RERA Approved Villas, Open Plot Layouts & High-Rise Apartments</p>
                </div>
                <Link
                  href="/properties"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-5 py-2.5 rounded-2xl shadow-sm transition-all uppercase tracking-wider"
                >
                  View All Properties →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shortlistedProps.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                        <Image src={prop.image} alt={prop.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {prop.type}
                        </span>
                        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          HMDA APPROVED
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                          {prop.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">📍 {prop.location}</p>
                        <div className="pt-2 flex justify-between items-center">
                          <span className="text-base font-black text-slate-950">{prop.price}</span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            Clear Title
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                      <Link
                        href="/contact"
                        className="text-center bg-slate-950 hover:bg-slate-900 text-amber-400 text-[11px] font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        Inquire Now
                      </Link>
                      <Link
                        href="/contact"
                        className="text-center bg-amber-400 hover:bg-amber-500 text-slate-950 text-[11px] font-black py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        Book Visit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCHEDULED SITE VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            {notification && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-5 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>{notification.message}</span>
                </div>
                <button
                  onClick={() => setNotification(null)}
                  className="text-emerald-700 hover:text-emerald-950 font-black text-sm px-1"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Scheduled Site Visits Management</h2>
                <p className="text-xs text-slate-500">Track cab pickup details & assigned agent contact info</p>
              </div>
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                + Schedule New Visit
              </Link>
            </div>

            {visitsList.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                  🚗
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">No Scheduled Site Visits</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You have no active site visits scheduled. Book a free cab visit to tour our gated communities & villa layouts!
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  + Schedule Site Visit Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visitsList.map((visit) => (
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
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
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
                          className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                        >
                          Reschedule
                        </Link>
                        <button
                          onClick={() => handleCancelVisit(visit.id, visit.property)}
                          disabled={cancellingVisitId === visit.id}
                          className="text-xs font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-3.5 py-1.5 rounded-xl border border-red-200 transition-all disabled:opacity-50"
                        >
                          {cancellingVisitId === visit.id ? 'Cancelling...' : 'Cancel Visit'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHORTLISTED VENTURES */}
        {activeTab === 'shortlist' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Your Shortlisted Ventures</h2>
                <p className="text-xs text-slate-500">Saved villa listings, plot layouts, and high-rise apartments</p>
              </div>
              <Link href="/properties" className="text-xs font-bold text-amber-600 hover:underline">
                + Browse More Properties
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shortlistedProps.map((prop) => (
                <div key={prop.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 hover:shadow-md transition-all">
                  <div className="relative h-44 w-full bg-slate-900">
                    <Image src={prop.image} alt={prop.name} fill className="object-cover" />
                    <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      {prop.type}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900">{prop.name}</h3>
                    <p className="text-xs text-slate-500">📍 {prop.location}</p>
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-sm font-black text-slate-950">{prop.price}</span>
                      <Link href="/contact" className="bg-slate-950 text-amber-400 hover:bg-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl">
                        Inquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BANK LOAN ELIGIBILITY */}
        {activeTab === 'loan' && (
          <div className="space-y-6 max-w-4xl">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900">Bank Loan Eligibility & Sanction Status</h2>
              <p className="text-xs text-slate-500">Pre-approved home loans backed by nationalized & private banking partners</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-emerald-50 border border-emerald-200 rounded-2xl gap-4">
                <div>
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">SANCTION STATUS</span>
                  <h3 className="text-2xl font-black text-emerald-950 pt-1">Pre-Approved Limit: ₹ 2.00 Crores</h3>
                  <p className="text-xs text-emerald-700 font-semibold pt-1">
                    ✓ Valid for all HMDA & RERA Approved Bhavya Homes Ventures
                  </p>
                </div>
                <span className="bg-emerald-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-sm uppercase">
                  VERIFIED SANCTION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Partner Bank</span>
                  <p className="text-sm font-black text-slate-900">State Bank of India (SBI)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Interest Rate</span>
                  <p className="text-sm font-black text-emerald-700">8.40% p.a. (Special Builder Repo)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Max Tenure</span>
                  <p className="text-sm font-black text-slate-900">30 Years (360 Months)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Need help submitting income documents or bank loan processing?
                </p>
                <Link
                  href="/contact"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-sm"
                >
                  Contact Financial Advisor
                </Link>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
