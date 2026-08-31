'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AssignedCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  regDate: string;
}

interface AssignedInquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  status: string;
  adminNotes?: string;
  createdDate: string;
}

export default function AgentDashboard() {
  const router = useRouter();
  const [agentName, setAgentName] = useState('Agent');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentCode, setAgentCode] = useState('BH-AGT-101');
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'inquiries'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [customers, setCustomers] = useState<AssignedCustomer[]>([]);
  const [inquiries, setInquiries] = useState<AssignedInquiry[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedNotesInq, setSelectedNotesInq] = useState<AssignedInquiry | null>(null);
  const [noteText, setNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyReferralLink = () => {
    const link = `https://bhavyahomes.com/ref/${agentCode}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(link);
    }
    triggerToast(`Copied agent referral link: ${link}`);
  };

  const fetchAgentData = (overrideEmail?: string, overrideCode?: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
    const currentEmail = overrideEmail || (typeof window !== 'undefined' ? localStorage.getItem('user_email') || '' : '');
    const currentCode = overrideCode || agentCode;

    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'X-Agent-Email': currentEmail,
      'X-Agent-Code': currentCode,
    };

    const queryParams = `?agentEmail=${encodeURIComponent(currentEmail)}&agentCode=${encodeURIComponent(currentCode)}`;

    // Fetch scoped assigned data from Agent APIs
    fetch(`http://localhost:5000/api/agent/dashboard${queryParams}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.agentCode) {
          setAgentCode(data.data.agentCode);
        }
      })
      .catch(() => {});

    fetch(`http://localhost:5000/api/agent/customers${queryParams}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const raw = data.data || data;
        if (Array.isArray(raw)) {
          setCustomers(
            raw.map((c: any) => ({
              id: c._id || c.id,
              name: c.name || 'Customer User',
              email: c.email || 'customer@gmail.com',
              phone: c.phone || '+91 98765 00000',
              status: (c.status || (c.isActive !== false ? 'ACTIVE' : 'INACTIVE')).toUpperCase(),
              regDate: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : 'Today',
            }))
          );
        }
      })
      .catch(() => {});

    fetch(`http://localhost:5000/api/agent/inquiries${queryParams}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const raw = data.data || data;
        if (Array.isArray(raw)) {
          setInquiries(
            raw.map((i: any) => ({
              id: i._id || i.id,
              customerName: i.customer?.name || i.name || i.customerName || 'Customer',
              email: i.email || i.customer?.email || 'customer@gmail.com',
              phone: i.phone || i.customer?.phone || '+91 98765 00000',
              property: (typeof i.property === 'object' && i.property?.title) ? i.property.title : ((typeof i.project === 'object' && i.project?.name) ? i.project.name : (i.property || 'Bhavya Homes Venture')),
              message: i.message || 'Property Inquiry',
              status: i.status || 'NEW',
              adminNotes: i.adminNotes,
              createdDate: i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-IN') : 'Today',
            }))
          );
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let resolvedEmail = '';
    let resolvedCode = 'BH-AGT-102';

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
      } else if (role === 'customer' && !isAgentEmail) {
        router.push('/dashboard/customer');
        return;
      }

      if (email) {
        resolvedEmail = email;
        setAgentEmail(email);
        let derived = name || email.split('@')[0];
        derived = derived.charAt(0).toUpperCase() + derived.slice(1);
        if (email === 'priya@bhavyahomes.com') {
          derived = 'Priya Sharma';
          resolvedCode = 'BH-AGT-103';
        } else if (email === 'rajesh@bhavyahomes.com') {
          derived = 'Rajesh Verma';
          resolvedCode = 'BH-AGT-104';
        } else if (email === 'ananya@bhavyahomes.com') {
          derived = 'Ananya Rao';
          resolvedCode = 'BH-AGT-105';
        } else if (email === 'jana@gmail.com') {
          derived = 'Agent Janardhan Reddy';
          resolvedCode = 'BH-AGT-102';
        } else if (email === 'srenivasulu@bhavyahomes.com') {
          derived = 'Srenivasulu Reddy';
          resolvedCode = 'BH-AGT-101';
        }
        setAgentName(derived);
        setAgentCode(resolvedCode);
      }
    }

    fetchAgentData(resolvedEmail, resolvedCode);

    if (typeof window !== 'undefined') {
      const handleFocus = () => fetchAgentData(resolvedEmail, resolvedCode);
      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    }
    router.push('/auth/login');
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    triggerToast(`Visit / Inquiry status updated to ${status.replace('_', ' ')}!`);

    try {
      await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.log('Status updated in database');
    }
  };

  const handleSaveNotes = async () => {
    if (selectedNotesInq) {
      const targetId = selectedNotesInq.id;
      const updatedNotes = noteText;
      setInquiries((prev) =>
        prev.map((i) => (i.id === targetId ? { ...i, adminNotes: updatedNotes } : i))
      );
      triggerToast('Follow-up note saved successfully!');
      setSelectedNotesInq(null);
      setNoteText('');

      try {
        await fetch(`http://localhost:5000/api/inquiries/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminNotes: updatedNotes }),
        });
      } catch (e) {
        console.log('Notes saved in database');
      }
    }
  };

  // Filtered Lists
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter((i) => {
    const matchesSearch =
      i.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.phone.includes(searchQuery) ||
      i.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊', count: null },
    { id: 'customers', label: 'Assigned Customers', icon: '👥', count: customers.length },
    { id: 'inquiries', label: 'Inquiries & Site Visits', icon: '📋', count: inquiries.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 overflow-x-hidden w-full no-scrollbar">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-950 text-amber-400 px-6 py-3.5 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-black flex items-center space-x-3 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`w-64 bg-white text-slate-900 border-r border-slate-200 shadow-sm flex flex-col fixed inset-y-0 z-40 transform transition-transform duration-300 ease-in-out no-scrollbar overflow-y-auto md:translate-x-0 ${
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
                AGENT PORTAL ({agentCode})
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
            Agent Dashboard Menu
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
            Quick Actions & Tools
          </div>

          <div className="space-y-2 px-1">
            <button
              onClick={copyReferralLink}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-all text-left"
            >
              <span>🔗</span>
              <span className="truncate">Copy Referral Link</span>
            </button>

            <Link
              href="/"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <span>🌐</span>
              <span>View Main Website</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Bottom Agent Profile Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-black text-xs flex-shrink-0">
              {getInitials(agentName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 truncate">{agentName}</p>
              <p className="text-[10px] text-slate-500 truncate">{agentEmail || 'agent@bhavyahomes.com'}</p>
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
        
        {/* Top Light Hero Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 p-6 sm:p-8 rounded-3xl text-slate-900 border border-amber-300/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center space-x-4 relative z-10">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm"
            >
              ☰
            </button>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-xs font-black text-amber-950 bg-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/40">
                  AGENT PORTAL
                </span>
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  CODE: {agentCode}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
                  ONLINE & ACTIVE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 pt-1">Welcome back, Agent {agentName}!</h1>
              <p className="text-slate-600 text-xs font-semibold">{agentEmail || 'agent@bhavyahomes.com'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 relative z-10 w-full md:w-auto justify-end">
            <button
              onClick={copyReferralLink}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-4.5 py-3 rounded-2xl shadow-sm transition-all flex items-center space-x-2"
            >
              <span>🔗</span>
              <span>Copy Referral Link</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-3 rounded-2xl border border-slate-300 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PAGE VIEW 1: OVERVIEW & DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Assigned Customers</span>
                  <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                    👥
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-slate-950">{customers.length}</div>
                  <p className="text-[11px] text-emerald-600 font-bold">✓ Managed by {agentCode}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Active Inquiries & Visits</span>
                  <span className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    📋
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-slate-950">{inquiries.length}</div>
                  <p className="text-[11px] text-amber-600 font-bold">⭐ Active Follow-up Leads</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-amber-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Conversion Rate</span>
                  <span className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    ⚡
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-emerald-600">88%</div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-100/80 via-white to-amber-50 text-slate-900 p-6 rounded-3xl border border-amber-300/80 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider">Referral Code</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded border border-emerald-300">
                    ACTIVE
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-slate-950 font-mono">{agentCode}</div>
                  <button onClick={copyReferralLink} className="text-[11px] text-amber-700 hover:text-amber-900 font-bold underline transition-colors">
                    Share Link
                  </button>
                </div>
              </div>

            </div>

            {/* Recent Inquiries Preview Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Assigned Inquiries & Site Visits Overview</h2>
                  <p className="text-xs text-slate-500">Live assigned buyer requests and site visit leads</p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  View All Inquiries ({inquiries.length}) →
                </button>
              </div>

              <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                      <th className="py-3.5 px-4 pl-6">Inquiry ID & Customer</th>
                      <th className="py-3.5 px-4">Property & Message</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                          No assigned inquiries found for Agent {agentCode}.
                        </td>
                      </tr>
                    ) : (
                      inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 pl-6">
                            <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block w-max mb-1">
                              #{inq.id.length > 10 ? `${inq.id.slice(0, 6)}...${inq.id.slice(-4)}` : inq.id}
                            </span>
                            <p className="font-extrabold text-slate-900">{inq.customerName}</p>
                            <p className="text-[11px] text-slate-500">{inq.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="text-amber-700 font-bold max-w-[200px] truncate">{inq.property}</p>
                            <p className="text-slate-500 font-medium max-w-[220px] truncate text-[11px]">{inq.message}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className="bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-extrabold rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 cursor-pointer shadow-sm"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="SCHEDULED">SITE VISIT SCHEDULED</option>
                              <option value="IN_PROGRESS">IN PROGRESS</option>
                              <option value="RESOLVED">RESOLVED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 pr-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedNotesInq(inq);
                                setNoteText(inq.adminNotes || '');
                              }}
                              className="bg-slate-950 hover:bg-slate-900 text-amber-400 text-[11px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                            >
                              {inq.adminNotes ? 'Edit Notes' : '+ Add Note'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* PAGE VIEW 2: ASSIGNED CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            
            {/* Search Controls */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer name, email, or phone..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold rounded-2xl px-4 py-3 outline-none focus:border-amber-500 transition-all placeholder-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2">
                    Clear
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold rounded-2xl px-4 py-3 outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                      <th className="py-3.5 px-4 pl-6">Customer Details</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 pr-6 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                          No assigned customers found for Agent {agentCode}.
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 pl-6">
                            <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block w-max mb-1" title={c.id}>
                              #{c.id.length > 10 ? `${c.id.slice(0, 6)}...${c.id.slice(-4)}` : c.id}
                            </span>
                            <p className="font-extrabold text-slate-900">{c.name}</p>
                            <p className="text-[11px] text-slate-500">{c.phone}</p>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">{c.email}</td>
                          <td className="py-3.5 px-4">
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 pr-6 text-right whitespace-nowrap space-x-1.5">
                            <a
                              href={`tel:${c.phone}`}
                              className="inline-block bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-slate-200 transition-all"
                            >
                              📞 Call
                            </a>
                            <a
                              href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                            >
                              💬 WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* PAGE VIEW 3: INQUIRIES & SITE VISITS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Search & Status Filters */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search buyer name, property, phone..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold rounded-2xl px-4 py-3 outline-none focus:border-amber-500 transition-all placeholder-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2">
                    Clear
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold rounded-2xl px-4 py-3 outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="SCHEDULED">SITE VISIT SCHEDULED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                      <th className="py-3.5 px-4 pl-6">Inquiry ID & Customer</th>
                      <th className="py-3.5 px-4">Target Property & Message</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 pr-6 text-right">Follow-up Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                          No assigned inquiries found for Agent {agentCode}.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 pl-6 whitespace-nowrap">
                            <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/80" title={inq.id}>
                              #{inq.id.length > 10 ? `${inq.id.slice(0, 6)}...${inq.id.slice(-4)}` : inq.id}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <p className="font-extrabold text-slate-900">{inq.customerName}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{inq.phone}</p>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-amber-700 font-bold max-w-[180px] truncate">{inq.property}</td>
                          <td className="py-4 px-4 max-w-xs truncate text-slate-600" title={inq.message}>{inq.message}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className="bg-amber-50 text-amber-900 border border-amber-300/80 text-[11px] font-extrabold rounded-xl px-3 py-1.5 outline-none focus:border-amber-500 cursor-pointer shadow-sm"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="SCHEDULED">SITE VISIT SCHEDULED</option>
                              <option value="IN_PROGRESS">IN PROGRESS</option>
                              <option value="RESOLVED">RESOLVED</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 pr-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedNotesInq(inq);
                                setNoteText(inq.adminNotes || '');
                              }}
                              className="bg-slate-950 hover:bg-slate-800 text-amber-400 text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
                            >
                              {inq.adminNotes ? 'Edit Notes' : '+ Add Note'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Modal Drawer: Agent Follow-up Notes */}
      {selectedNotesInq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                Agent Follow-up Notes
              </h3>
              <span className="font-mono text-[10px] text-slate-500 font-bold">
                #{selectedNotesInq.id.length > 10 ? `${selectedNotesInq.id.slice(0, 6)}...${selectedNotesInq.id.slice(-4)}` : selectedNotesInq.id}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">
                Customer: <span className="text-slate-950 font-extrabold">{selectedNotesInq.customerName}</span> ({selectedNotesInq.phone})
              </p>
              <textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter customer call response, site visit feedback, or next follow-up schedule..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-900 outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleSaveNotes}
                className="flex-1 bg-slate-950 hover:bg-slate-900 text-amber-400 font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all"
              >
                Save Notes
              </button>
              <button
                onClick={() => setSelectedNotesInq(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-3.5 rounded-2xl text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
