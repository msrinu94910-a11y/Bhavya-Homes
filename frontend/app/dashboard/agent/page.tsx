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
  const [activeTab, setActiveTab] = useState<'customers' | 'inquiries'>('customers');

  const [customers, setCustomers] = useState<AssignedCustomer[]>([
    { id: 'USR-101', name: 'Srikanth Rao', email: 'srikanth@gmail.com', phone: '+91 98765 12345', status: 'ACTIVE', regDate: '12 Jan 2026' },
    { id: 'USR-104', name: 'Kavitha Sharma', email: 'kavitha@yahoo.com', phone: '+91 98765 67890', status: 'ACTIVE', regDate: '20 Mar 2026' },
  ]);

  const [inquiries, setInquiries] = useState<AssignedInquiry[]>([
    { id: 'INQ-1001', customerName: 'Srikanth Rao', email: 'srikanth@gmail.com', phone: '+91 98765 12345', property: 'Bhavya Royal Luxury Villa', message: 'Interested in booking site visit.', status: 'NEW', createdDate: '26 Aug 2026' },
  ]);

  const [selectedNotesInq, setSelectedNotesInq] = useState<AssignedInquiry | null>(null);
  const [noteText, setNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

      if (role === 'admin') {
        router.push('/dashboard/admin');
        return;
      } else if (role === 'customer') {
        router.push('/dashboard/customer');
        return;
      }

      if (email) {
        setAgentEmail(email);
        let derived = name || email.split('@')[0];
        derived = derived.charAt(0).toUpperCase() + derived.slice(1);
        setAgentName(derived);
      }
    }

    // Fetch scoped assigned data from Agent APIs
    fetch('http://localhost:5000/api/agent/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.agentCode) {
          setAgentCode(data.data.agentCode);
        }
      })
      .catch(() => {});

    fetch('http://localhost:5000/api/agent/customers')
      .then((res) => res.json())
      .then((data) => {
        const raw = data.data || data;
        if (Array.isArray(raw) && raw.length > 0) {
          setCustomers(
            raw.map((c: any) => ({
              id: c._id || c.id,
              name: c.name || 'Customer User',
              email: c.email || 'customer@gmail.com',
              phone: c.phone || '+91 98765 00000',
              status: (c.status || 'ACTIVE').toUpperCase(),
              regDate: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : '27 Aug 2026',
            }))
          );
        }
      })
      .catch(() => {});

    fetch('http://localhost:5000/api/agent/inquiries')
      .then((res) => res.json())
      .then((data) => {
        const raw = data.data || data;
        if (Array.isArray(raw) && raw.length > 0) {
          setInquiries(
            raw.map((i: any) => ({
              id: i._id || i.id,
              customerName: i.customerName || i.name || 'Customer',
              email: i.email || 'customer@gmail.com',
              phone: i.phone || '+91 98765 00000',
              property: i.property || 'Bhavya Homes Venture',
              message: i.message || 'Property Inquiry',
              status: i.status || 'NEW',
              adminNotes: i.adminNotes,
              createdDate: i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-IN') : '26 Aug 2026',
            }))
          );
        }
      })
      .catch(() => {});
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

  const handleSaveNotes = () => {
    if (selectedNotesInq) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === selectedNotesInq.id ? { ...i, adminNotes: noteText } : i))
      );
      triggerToast('Follow-up note saved successfully!');
      setSelectedNotesInq(null);
      setNoteText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950 p-8 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              AGENT PORTAL
            </span>
            <span className="text-xs font-black text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-amber-500/30">
              CODE: {agentCode}
            </span>
          </div>
          <h1 className="text-3xl font-black pt-1">Welcome, Agent {agentName}!</h1>
          <p className="text-slate-400 text-xs">{agentEmail || 'agent@bhavyahomes.com'}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold px-5 py-3 rounded-xl border border-slate-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Customers</p>
          <div className="text-3xl font-black text-slate-950">{customers.length}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">✓ Managed by Agent {agentCode}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Inquiries & Leads</p>
          <div className="text-3xl font-black text-slate-950">{inquiries.length}</div>
          <p className="text-[11px] text-amber-600 font-semibold">⭐ Active Follow-ups</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion Performance</p>
          <div className="text-3xl font-black text-emerald-600">85%</div>
          <p className="text-[11px] text-slate-500 font-semibold">High Conversion Rate</p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'customers'
                ? 'bg-slate-950 text-amber-400 shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Assigned Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'inquiries'
                ? 'bg-slate-950 text-amber-400 shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Assigned Inquiries & Leads ({inquiries.length})
          </button>
        </div>

        {/* TAB 1: ASSIGNED CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">Customer ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">{c.id}</td>
                      <td className="p-4 font-extrabold text-slate-900">{c.name}</td>
                      <td className="p-4 text-slate-500">{c.email}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-bold">
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{c.regDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGNED INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">Inquiry ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Target Property</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Follow-up Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">{inq.id}</td>
                      <td className="p-4">
                        <p className="font-extrabold text-slate-900">{inq.customerName}</p>
                        <p className="text-[11px] text-slate-500">{inq.phone}</p>
                      </td>
                      <td className="p-4 font-bold text-amber-700">{inq.property}</td>
                      <td className="p-4 text-slate-600 max-w-xs truncate">{inq.message}</td>
                      <td className="p-4">
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-[10px] font-bold">
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedNotesInq(inq);
                            setNoteText(inq.adminNotes || '');
                          }}
                          className="bg-slate-950 hover:bg-slate-800 text-amber-400 text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-sm"
                        >
                          {inq.adminNotes ? 'Edit Notes' : '+ Add Note'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Agent Follow-up Notes */}
      {selectedNotesInq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 border border-slate-200 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900">Agent Notes: {selectedNotesInq.id}</h3>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter follow-up notes for customer..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-amber-500"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSaveNotes}
                className="flex-1 bg-slate-950 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Save Notes
              </button>
              <button
                onClick={() => setSelectedNotesInq(null)}
                className="bg-slate-100 text-slate-700 font-bold px-4 py-3 rounded-xl text-xs"
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
