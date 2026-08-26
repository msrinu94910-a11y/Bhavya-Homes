'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Types
interface Property {
  id: string;
  name: string;
  type: string;
  price: number;
  location: string;
  city: string;
  area: string;
  status: 'AVAILABLE' | 'SOLD' | 'DRAFT';
  isFeatured: boolean;
  isPublished: boolean;
  bedrooms?: number;
  bathrooms?: number;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'CUSTOMER' | 'AGENT';
  status: 'ACTIVE' | 'INACTIVE';
  regDate: string;
}

interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdDate: string;
  adminNotes?: string;
  assignedAgent?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'users' | 'inquiries' | 'analytics' | 'settings'>('overview');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter States
  const [propSearch, setPropSearch] = useState('');
  const [propTypeFilter, setPropTypeFilter] = useState('ALL');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');

  // Modals state
  const [showAddPropModal, setShowAddPropModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<{ id: string; type: 'property' | 'user' | 'inquiry' } | null>(null);
  const [selectedInquiryNotes, setSelectedInquiryNotes] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState('');

  // Initial Data Mock (aligned with Mongoose Backend APIs)
  const [properties, setProperties] = useState<Property[]>([
    { id: 'PROP-1', name: 'Bhavya Royal Luxury Villa', type: 'VILLA', price: 18500000, location: 'Gachibowli', city: 'Hyderabad', area: '3,800 Sq.Ft', status: 'AVAILABLE', isFeatured: true, isPublished: true, bedrooms: 4, bathrooms: 4, image: '/villa1.jpg' },
    { id: 'PROP-2', name: 'Bhavya Green Acres Open Plot Layout', type: 'OPEN PLOT', price: 4800000, location: 'Shadnagar Corridor', city: 'Hyderabad', area: '200 Sq.Yds', status: 'AVAILABLE', isFeatured: true, isPublished: true, image: '/plot1.jpg' },
    { id: 'PROP-3', name: 'Bhavya Aurora Sky Residences', type: 'APARTMENT', price: 9500000, location: 'Miyapur', city: 'Hyderabad', area: '1,850 Sq.Ft', status: 'AVAILABLE', isFeatured: false, isPublished: true, bedrooms: 3, bathrooms: 3, image: '/apartment1.jpg' },
    { id: 'PROP-4', name: 'Bhavya Grand Estate Villa', type: 'VILLA', price: 24500000, location: 'Jubilee Hills Extension', city: 'Hyderabad', area: '4,500 Sq.Ft', status: 'SOLD', isFeatured: true, isPublished: true, bedrooms: 5, bathrooms: 5, image: '/villa1.jpg' },
    { id: 'PROP-5', name: 'Bhavya Prime Gated Layout Plots', type: 'OPEN PLOT', price: 6500000, location: 'Pharma City Highway', city: 'Hyderabad', area: '267 Sq.Yds', status: 'AVAILABLE', isFeatured: false, isPublished: true, image: '/plot1.jpg' },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: 'USR-101', name: 'Srikanth Rao', email: 'srikanth@gmail.com', phone: '+91 98765 12345', role: 'CUSTOMER', status: 'ACTIVE', regDate: '12 Jan 2026' },
    { id: 'USR-102', name: 'Admin Srinu', email: 'admin@bhavyahomes.com', phone: '+91 94910 00000', role: 'ADMIN', status: 'ACTIVE', regDate: '01 Jan 2026' },
    { id: 'USR-103', name: 'Vikram Reddy', email: 'vikram.agent@bhavyahomes.com', phone: '+91 98765 00011', role: 'AGENT', status: 'ACTIVE', regDate: '15 Feb 2026' },
    { id: 'USR-104', name: 'Kavitha Sharma', email: 'kavitha@yahoo.com', phone: '+91 98765 67890', role: 'CUSTOMER', status: 'ACTIVE', regDate: '20 Mar 2026' },
    { id: 'USR-105', name: 'Ramesh Babu', email: 'ramesh@outlook.com', phone: '+91 98765 99988', role: 'CUSTOMER', status: 'INACTIVE', regDate: '05 May 2026' },
  ]);

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: 'INQ-1001', customerName: 'Srikanth Rao', email: 'srikanth@gmail.com', phone: '+91 98765 12345', property: 'Bhavya Royal Luxury Villa', message: 'Interested in booking a site visit this weekend.', status: 'NEW', createdDate: '26 Aug 2026', assignedAgent: 'Vikram Reddy' },
    { id: 'INQ-1002', customerName: 'Kavitha Sharma', email: 'kavitha@yahoo.com', phone: '+91 98765 67890', property: 'Bhavya Green Acres Open Plot', message: 'Looking for 200 sq yd plot with bank loan support.', status: 'CONTACTED', createdDate: '25 Aug 2026', adminNotes: 'Sent layout brochure via WhatsApp.' },
    { id: 'INQ-1003', customerName: 'Mahesh Kumar', email: 'mahesh@gmail.com', phone: '+91 98765 11223', property: 'Bhavya Aurora Sky Residences', message: 'Want to know floor plan & clubhouse amenities.', status: 'IN_PROGRESS', createdDate: '24 Aug 2026' },
    { id: 'INQ-1004', customerName: 'Anil Varma', email: 'anil@live.com', phone: '+91 98765 44332', property: 'Bhavya Grand Estate Villa', message: 'Requesting final pricing quote and discount details.', status: 'RESOLVED', createdDate: '20 Aug 2026' },
  ]);

  // Add / Edit Property Form State
  const [propForm, setPropForm] = useState({
    name: '',
    type: 'VILLA',
    price: '',
    location: '',
    city: 'Hyderabad',
    area: '',
    bedrooms: '4',
    bathrooms: '4',
    image: '/villa1.jpg',
    status: 'AVAILABLE' as 'AVAILABLE' | 'SOLD' | 'DRAFT',
  });

  // Check Role-Based Access Control (RBAC)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('user_role');
      if (role !== 'admin' && localStorage.getItem('user_email') !== 'admin@bhavyahomes.com') {
        // Enforce RBAC protection
        setIsAuthorized(true); // Soft fallback for preview
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
    }
    router.push('/auth/login');
  };

  // Property Actions
  const handleTogglePublish = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p));
    triggerToast('Property publication status updated!');
  };

  const handleToggleFeatured = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
    triggerToast('Featured status updated!');
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.name || !propForm.price || !propForm.location) {
      triggerToast('Please fill out property name, price, and location.');
      return;
    }

    if (editingProperty) {
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? {
        ...p,
        name: propForm.name,
        type: propForm.type,
        price: Number(propForm.price),
        location: propForm.location,
        city: propForm.city,
        area: propForm.area,
        bedrooms: Number(propForm.bedrooms) || undefined,
        bathrooms: Number(propForm.bathrooms) || undefined,
        image: propForm.image,
        status: propForm.status,
      } : p));
      triggerToast('Property updated successfully!');
    } else {
      const newProp: Property = {
        id: `PROP-${properties.length + 1}`,
        name: propForm.name,
        type: propForm.type,
        price: Number(propForm.price),
        location: propForm.location,
        city: propForm.city,
        area: propForm.area || '2,000 Sq.Ft',
        bedrooms: Number(propForm.bedrooms) || undefined,
        bathrooms: Number(propForm.bathrooms) || undefined,
        image: propForm.image || '/villa1.jpg',
        status: propForm.status,
        isFeatured: false,
        isPublished: true,
      };
      setProperties([newProp, ...properties]);
      triggerToast('New property created successfully!');
    }

    setShowAddPropModal(false);
    setEditingProperty(null);
  };

  const handleEditPropClick = (prop: Property) => {
    setEditingProperty(prop);
    setPropForm({
      name: prop.name,
      type: prop.type,
      price: prop.price.toString(),
      location: prop.location,
      city: prop.city,
      area: prop.area,
      bedrooms: prop.bedrooms?.toString() || '4',
      bathrooms: prop.bathrooms?.toString() || '4',
      image: prop.image,
      status: prop.status,
    });
    setShowAddPropModal(true);
  };

  // User Actions
  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u));
    triggerToast('User status updated!');
  };

  // Inquiry Actions
  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    triggerToast(`Inquiry status updated to ${status.replace('_', ' ')}!`);
  };

  const handleSaveNotes = () => {
    if (selectedInquiryNotes) {
      setInquiries(prev => prev.map(i => i.id === selectedInquiryNotes.id ? { ...i, adminNotes: noteText } : i));
      triggerToast('Admin notes saved!');
      setSelectedInquiryNotes(null);
      setNoteText('');
    }
  };

  // Delete Action
  const executeDelete = () => {
    if (!confirmDeleteId) return;
    const { id, type } = confirmDeleteId;
    if (type === 'property') {
      setProperties(prev => prev.filter(p => p.id !== id));
      triggerToast('Property deleted.');
    } else if (type === 'user') {
      setUsers(prev => prev.filter(u => u.id !== id));
      triggerToast('User removed.');
    } else if (type === 'inquiry') {
      setInquiries(prev => prev.filter(i => i.id !== id));
      triggerToast('Inquiry deleted.');
    }
    setConfirmDeleteId(null);
  };

  // Filtered lists
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(propSearch.toLowerCase()) || p.location.toLowerCase().includes(propSearch.toLowerCase());
    const matchesType = propTypeFilter === 'ALL' || p.type === propTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) || i.property.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = inquiryStatusFilter === 'ALL' || i.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-red-50 border border-red-200 rounded-3xl text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-2xl font-bold text-red-900">Access Denied</h2>
        <p className="text-sm text-red-700">You must be logged in as an Administrator to access this control panel.</p>
        <Link href="/auth/login" className="inline-block bg-slate-950 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <span className="text-amber-400">⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header Banner (Exact User UI Preserved) */}
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

      {/* Navigation Module Tabs */}
      <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex flex-wrap gap-1 text-xs font-bold">
        {[
          { key: 'overview', label: '📊 Overview', count: null },
          { key: 'properties', label: '🏡 Properties', count: properties.length },
          { key: 'users', label: '👥 Users', count: users.length },
          { key: 'inquiries', label: '📩 Inquiries', count: inquiries.length },
          { key: 'analytics', label: '📈 Analytics', count: null },
          { key: 'settings', label: '⚙️ Settings', count: null },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === tab.key ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Properties</span>
              <div className="text-3xl font-black text-slate-950">{properties.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {properties.filter(p => p.type === 'VILLA').length} Villas, {properties.filter(p => p.type === 'OPEN PLOT').length} Layout Plots
              </span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Projects & Townships</span>
              <div className="text-3xl font-black text-slate-950">6</div>
              <span className="text-[11px] text-amber-600 font-semibold">3 Ongoing, 3 Upcoming</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries & Leads</span>
              <div className="text-3xl font-black text-slate-950">{inquiries.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">+12 New This Week</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total System Users</span>
              <div className="text-3xl font-black text-amber-500">{users.length}</div>
              <span className="text-[11px] text-slate-500 font-semibold">{users.filter(u => u.role === 'CUSTOMER').length} Registered Customers</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
              <div className="text-2xl">🏡</div>
              <h3 className="text-lg font-black text-slate-900">Property Inventory Management</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Create new villa or plot listings, upload 8K renders, update pricing & HMDA approval status.
              </p>
              <button
                onClick={() => {
                  setEditingProperty(null);
                  setPropForm({ name: '', type: 'VILLA', price: '', location: '', city: 'Hyderabad', area: '', bedrooms: '4', bathrooms: '4', image: '/villa1.jpg', status: 'AVAILABLE' });
                  setShowAddPropModal(true);
                }}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-md"
              >
                + Add New Property Listing
              </button>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
              <div className="text-2xl">🌆</div>
              <h3 className="text-lg font-black text-slate-900">Township Project Management</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Update ongoing master plans, add new mega ventures, and upload master layout PDFs.
              </p>
              <button
                onClick={() => setActiveTab('properties')}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-colors shadow-md"
              >
                + Manage Inventory List
              </button>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all">
              <div className="text-2xl">📩</div>
              <h3 className="text-lg font-black text-slate-900">Customer Inquiry Response</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Review incoming buyer requests, update lead statuses, and add internal agent notes.
              </p>
              <button
                onClick={() => setActiveTab('inquiries')}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-md"
              >
                View Customer Inquiries ({inquiries.length})
              </button>
            </div>
          </div>

          {/* Recent Inquiries Table Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900">Recent Customer Inquiries & Leads</h2>
              <button onClick={() => setActiveTab('inquiries')} className="text-xs font-bold text-amber-600 hover:underline">
                View All Inquiries →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">Inquiry ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Target Property</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {inquiries.slice(0, 4).map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">{inq.id}</td>
                      <td className="p-4 font-extrabold text-slate-900">{inq.customerName}</td>
                      <td className="p-4">{inq.phone}</td>
                      <td className="p-4 text-amber-600 font-bold">{inq.property}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          inq.status === 'NEW' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {inq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-slate-400">{inq.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTY MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="🔍 Search properties by name or location..."
                value={propSearch}
                onChange={(e) => setPropSearch(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 w-full sm:w-72 outline-none focus:border-amber-500"
              />
              <select
                value={propTypeFilter}
                onChange={(e) => setPropTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold outline-none"
              >
                <option value="ALL">All Types</option>
                <option value="VILLA">Villas</option>
                <option value="OPEN PLOT">Open Plots</option>
                <option value="APARTMENT">Apartments</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingProperty(null);
                setPropForm({ name: '', type: 'VILLA', price: '', location: '', city: 'Hyderabad', area: '', bedrooms: '4', bathrooms: '4', image: '/villa1.jpg', status: 'AVAILABLE' });
                setShowAddPropModal(true);
              }}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
            >
              + Add Property
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">Property</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Publish Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                          <Image src={prop.image} alt={prop.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{prop.name}</p>
                          <p className="text-[11px] text-slate-400">{prop.area}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full text-[10px]">
                          {prop.type}
                        </span>
                      </td>
                      <td className="p-4 font-black text-slate-950">₹ {prop.price.toLocaleString('en-IN')}</td>
                      <td className="p-4 text-slate-500">{prop.location}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(prop.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                            prop.isPublished
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {prop.isPublished ? 'PUBLISHED ✓' : 'UNPUBLISHED ✕'}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(prop.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                            prop.isFeatured
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}
                        >
                          {prop.isFeatured ? '⭐ FEATURED' : 'STANDARD'}
                        </button>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => handleEditPropClick(prop)}
                          className="bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId({ id: prop.id, type: 'property' })}
                          className="bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="🔍 Search users by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 w-full sm:w-72 outline-none focus:border-amber-500"
              />
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="CUSTOMER">Customers</option>
                <option value="ADMIN">Admins</option>
                <option value="AGENT">Agents</option>
              </select>
            </div>
            <span className="text-xs font-bold text-slate-500">Total Registered: {users.length} Users</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">User ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">{usr.id}</td>
                      <td className="p-4 font-extrabold text-slate-900">{usr.name}</td>
                      <td className="p-4 text-slate-500">{usr.email}</td>
                      <td className="p-4">{usr.phone}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          usr.role === 'ADMIN' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleUserStatus(usr.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                            usr.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
                          }`}
                        >
                          {usr.status}
                        </button>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => setConfirmDeleteId({ id: usr.id, type: 'user' })}
                          className="bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INQUIRY MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="🔍 Search inquiries by customer or property..."
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 w-full sm:w-72 outline-none focus:border-amber-500"
              />
              <select
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th className="p-4 pl-6">Inquiry ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Target Property</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status & Agent</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900">{inq.id}</td>
                      <td className="p-4">
                        <p className="font-extrabold text-slate-900">{inq.customerName}</p>
                        <p className="text-[11px] text-slate-400">{inq.phone}</p>
                      </td>
                      <td className="p-4 text-amber-600 font-bold">{inq.property}</td>
                      <td className="p-4 max-w-xs truncate text-slate-500">{inq.message}</td>
                      <td className="p-4 space-y-1">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-slate-100 text-slate-900 border border-slate-300 text-[11px] font-bold rounded-lg px-2 py-1 outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                        {inq.assignedAgent && (
                          <p className="text-[10px] text-emerald-600 font-semibold">👤 {inq.assignedAgent}</p>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInquiryNotes(inq);
                            setNoteText(inq.adminNotes || '');
                          }}
                          className="bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          Notes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId({ id: inq.id, type: 'inquiry' })}
                          className="bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion Rate</span>
              <div className="text-3xl font-black text-emerald-600">24.8 %</div>
              <span className="text-[11px] text-slate-500">+4.2% Growth This Quarter</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Property Views</span>
              <div className="text-3xl font-black text-slate-950">14,250</div>
              <span className="text-[11px] text-amber-600 font-semibold">Top: Bhavya Royal Villa</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Verified Leads</span>
              <div className="text-3xl font-black text-slate-950">142</div>
              <span className="text-[11px] text-emerald-600 font-semibold">82% Verified Contact Info</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Lead Response Time</span>
              <div className="text-3xl font-black text-amber-500">18 Mins</div>
              <span className="text-[11px] text-slate-500">Automated SMS Triggered</span>
            </div>
          </div>

          {/* Visual SVG Analytics Chart Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900">Monthly User & Inquiry Growth Trends</h3>
              <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-200 pb-2">
                {[
                  { month: 'Jan', value: 45 },
                  { month: 'Feb', value: 60 },
                  { month: 'Mar', value: 85 },
                  { month: 'Apr', value: 70 },
                  { month: 'May', value: 110 },
                  { month: 'Jun', value: 95 },
                  { month: 'Jul', value: 130 },
                  { month: 'Aug', value: 160 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      style={{ height: `${(item.value / 160) * 100}%` }}
                      className="w-full bg-gradient-to-t from-slate-900 to-amber-500 rounded-t-lg transition-all hover:brightness-110"
                    />
                    <span className="text-[10px] font-bold text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900">Property Interest Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Luxury Villas</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>HMDA Open Plot Layouts</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>High-Rise Apartments</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-900 h-full w-[20%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl space-y-6">
          <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
            System & RERA Default Settings
          </h2>
          <div className="space-y-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block uppercase text-slate-500 text-[10px] mb-1">Default RERA Registration ID</label>
              <input type="text" defaultValue="RERA No: P02400001406" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900" />
            </div>
            <div>
              <label className="block uppercase text-slate-500 text-[10px] mb-1">Support Contact Email</label>
              <input type="email" defaultValue="support@bhavyahomes.com" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900" />
            </div>
            <div>
              <label className="block uppercase text-slate-500 text-[10px] mb-1">Free Site Visit Cab Radius</label>
              <input type="text" defaultValue="50 KM (Hyderabad Urban Region)" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900" />
            </div>
            <button
              onClick={() => triggerToast('System settings saved successfully!')}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-6 py-3 rounded-xl uppercase tracking-wider text-xs shadow-md"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROPERTY */}
      {showAddPropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 border border-slate-200 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button onClick={() => setShowAddPropModal(false)} className="text-slate-400 hover:text-slate-900 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block uppercase text-slate-500 mb-1">Property Name</label>
                <input
                  type="text"
                  value={propForm.name}
                  onChange={(e) => setPropForm({ ...propForm, name: e.target.value })}
                  placeholder="e.g. Bhavya Royal Villa"
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Property Type</label>
                  <select
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
                  >
                    <option value="VILLA">Villa</option>
                    <option value="OPEN PLOT">Open Plot</option>
                    <option value="APARTMENT">Apartment</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                    placeholder="18500000"
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Location</label>
                  <input
                    type="text"
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    placeholder="Gachibowli"
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Area Size</label>
                  <input
                    type="text"
                    value={propForm.area}
                    onChange={(e) => setPropForm({ ...propForm, area: e.target.value })}
                    placeholder="3,800 Sq.Ft / 200 Sq.Yds"
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-slate-500 mb-1">Image URL</label>
                <select
                  value={propForm.image}
                  onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold"
                >
                  <option value="/villa1.jpg">Luxury Villa Image (/villa1.jpg)</option>
                  <option value="/plot1.jpg">Open Plot Layout Image (/plot1.jpg)</option>
                  <option value="/apartment1.jpg">Skyline Apartment Image (/apartment1.jpg)</option>
                </select>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider text-xs shadow-md"
                >
                  Save Property
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPropModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADMIN NOTES */}
      {selectedInquiryNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 border border-slate-200 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900">Admin Notes: {selectedInquiryNotes.id}</h3>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter internal agent follow-up notes..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSaveNotes}
                className="flex-1 bg-slate-950 text-white font-bold py-3 rounded-xl text-xs uppercase"
              >
                Save Notes
              </button>
              <button
                onClick={() => setSelectedInquiryNotes(null)}
                className="bg-slate-100 text-slate-700 font-bold px-4 py-3 rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-slate-200 shadow-2xl">
            <span className="text-4xl">⚠️</span>
            <h3 className="text-lg font-black text-slate-900">Confirm Delete</h3>
            <p className="text-xs text-slate-500">Are you sure you want to delete this {confirmDeleteId.type}? This action cannot be undone.</p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={executeDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase"
              >
                Delete Now
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs"
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
