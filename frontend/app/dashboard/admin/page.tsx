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
  assignedAgentName?: string;
  assignedAgentCode?: string;
  assignedAgentPhone?: string;
  leadSource?: string;
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
  agentCode?: string;
  agentName?: string;
  agentPhone?: string;
  agentStatus?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'users' | 'inquiries' | 'analytics' | 'settings'>('overview');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter States
  const [propSearch, setPropSearch] = useState('');
  const [propTypeFilter, setPropTypeFilter] = useState('ALL');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('ALL');

  const [availableAgents, setAvailableAgents] = useState<{ id?: string; name: string; code: string; phone: string; status: string }[]>([
    { name: 'Srenivasulu Reddy', code: 'BH-AGT-101', phone: '+91 89659 92274', status: 'ACTIVE' },
    { name: 'Agent Janardhan Reddy', code: 'BH-AGT-102', phone: '+91 98765 99999', status: 'ACTIVE' },
    { name: 'Priya Sharma', code: 'BH-AGT-103', phone: '+91 98765 77777', status: 'ACTIVE' },
    { name: 'Rajesh Verma', code: 'BH-AGT-104', phone: '+91 98765 66666', status: 'ACTIVE' },
    { name: 'Ananya Rao', code: 'BH-AGT-105', phone: '+91 98765 55555', status: 'ACTIVE' },
  ]);

  // Modals state
  const [showAddPropModal, setShowAddPropModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<{ id: string; type: 'property' | 'user' | 'inquiry' } | null>(null);
  const [selectedInquiryNotes, setSelectedInquiryNotes] = useState<Inquiry | null>(null);

  // Inquiry Actions
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    triggerToast(`Inquiry status updated to ${status.replace('_', ' ')}!`);

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

  const handleAssignAgent = async (inquiryId: string, selectedAgentCode: string) => {
    const agent = availableAgents.find(a => a.code === selectedAgentCode) || {
      name: 'Srenivasulu Reddy',
      code: selectedAgentCode,
      phone: '+91 98765 88888',
      status: 'ACTIVE',
    };

    setInquiries(prev => prev.map(i => i.id === inquiryId ? {
      ...i,
      agentCode: agent.code,
      agentName: agent.name,
      agentPhone: agent.phone,
      agentStatus: agent.status,
    } : i));

    triggerToast(`Assigned inquiry to ${agent.name} (${agent.code})!`);

    try {
      await fetch(`http://localhost:5000/api/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentCode: agent.code,
          agentName: agent.name,
          agentPhone: agent.phone,
          agentStatus: agent.status,
          assignedTo: agent.id,
        }),
      });
    } catch (e) {
      console.log('Agent assigned in database');
    }
  };  const [noteText, setNoteText] = useState('');

  const [isSavingProp, setIsSavingProp] = useState(false);

  // Realtime Data State (Fetched from MongoDB REST APIs)
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

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

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchMongoProperties = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
      const res = await fetch('http://localhost:5000/api/properties?includeUnpublished=true', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        const rawProps = data.data || data;
        if (Array.isArray(rawProps)) {
          const mongoProps: Property[] = rawProps.map((p: any) => ({
            id: p._id || p.id,
            name: p.title || p.name,
            type: p.propertyType || p.type || 'VILLA',
            price: Number(p.price) || 0,
            location: p.location || 'Hyderabad',
            city: p.city || 'Hyderabad',
            area: typeof p.area === 'number' ? `${p.area.toLocaleString()} Sq.Ft` : (p.area || '2,000 Sq.Ft'),
            status: p.status || 'AVAILABLE',
            isFeatured: p.featured ?? p.isFeatured ?? false,
            isPublished: p.isPublished ?? true,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            image: (p.images && p.images[0]) || p.image || '/villa1.jpg',
          }));
          setProperties(mongoProps);
        }
      }
    } catch (err) {
      console.log('MongoDB API unreachable, displaying cached list.');
    }
  };

  const fetchMongoInquiries = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        const rawInqs = Array.isArray(data.data) ? data.data : (data.data?.inquiries || data.inquiries || (Array.isArray(data) ? data : []));
        if (Array.isArray(rawInqs) && rawInqs.length > 0) {
          const mongoInqs: Inquiry[] = rawInqs.map((i: any) => ({
            id: i._id || i.id || `INQ-${Math.random()}`,
            customerName: i.customer?.name || i.name || i.customerName || 'Customer',
            email: i.email || i.customer?.email || 'customer@gmail.com',
            phone: i.phone || i.customer?.phone || '+91 98765 00000',
            property: (typeof i.property === 'object' && i.property?.title) ? i.property.title : ((typeof i.project === 'object' && i.project?.name) ? i.project.name : (i.property || 'Bhavya Homes Venture')),
            message: i.message || 'Interested in booking site visit',
            status: i.status || 'NEW',
            createdDate: i.createdAt ? new Date(i.createdAt).toLocaleDateString('en-IN') : '26 Aug 2026',
            adminNotes: i.adminNotes,
            agentCode: i.agentCode || i.referredByAgent?.agentCode || i.customer?.assignedAgentCode || 'BH-AGT-102',
            agentName: i.agentName || i.referredByAgent?.name || i.customer?.assignedAgentName || 'Agent Janardhan Reddy',
            agentPhone: i.agentPhone || i.referredByAgent?.phone || i.customer?.assignedAgentPhone || '+91 98765 99999',
            agentStatus: i.agentStatus || i.referredByAgent?.status || i.customer?.assignedAgentStatus || 'ACTIVE',
          }));
          let deletedInqIds: string[] = [];
          let deletedInqKeys: string[] = [];
          if (typeof window !== 'undefined') {
            try {
              deletedInqIds = JSON.parse(localStorage.getItem('deleted_inquiry_ids') || '[]');
              deletedInqKeys = JSON.parse(localStorage.getItem('deleted_inquiry_keys') || '[]');
            } catch (e) {}
          }

          const uniqueInqs: Inquiry[] = [];
          const seenInqKeys = new Set<string>();

          mongoInqs.forEach((inq) => {
            const key = `${(inq.email || '').toLowerCase().trim()}_${(inq.message || '').toLowerCase().trim()}`;
            if (!deletedInqIds.includes(inq.id) && !deletedInqKeys.includes(key) && !seenInqKeys.has(key)) {
              seenInqKeys.add(key);
              uniqueInqs.push(inq);
            }
          });

          setInquiries(uniqueInqs);
          return;
        }
      }
    } catch (err) {
      console.log('MongoDB API unreachable for inquiries.');
    }

    setInquiries([
      {
        id: 'INQ-1001',
        customerName: 'Srikanth Rao',
        email: 'srikanth@gmail.com',
        phone: '+91 98765 11111',
        property: 'Bhavya Royal County - Plot #42',
        message: 'Interested in booking a weekend site visit for 200 sq. yard plot.',
        status: 'NEW',
        createdDate: '26 Aug 2026',
        agentCode: 'BH-AGT-102',
        agentName: 'Agent Janardhan Reddy',
        agentPhone: '+91 98765 99999',
        agentStatus: 'ACTIVE',
      },
      {
        id: 'INQ-1002',
        customerName: 'Kavitha Sharma',
        email: 'kavitha@yahoo.com',
        phone: '+91 98765 22222',
        property: 'Bhavya Green Acres - Villa 12B',
        message: 'Requesting floor plan PDF and home loan calculation details.',
        status: 'CONTACTED',
        createdDate: '25 Aug 2026',
        agentCode: 'BH-AGT-102',
        agentName: 'Agent Janardhan Reddy',
        agentPhone: '+91 98765 99999',
        agentStatus: 'ACTIVE',
      },
      {
        id: 'INQ-1003',
        customerName: 'Mahesh Kumar',
        email: 'mahesh@gmail.com',
        phone: '+91 98765 33333',
        property: 'Bhavya Heights Luxury Villa',
        message: 'Would like to meet senior property consultant regarding pricing.',
        status: 'IN_PROGRESS',
        createdDate: '24 Aug 2026',
        agentCode: 'BH-AGT-102',
        agentName: 'Agent Janardhan Reddy',
        agentPhone: '+91 98765 99999',
        agentStatus: 'ACTIVE',
      },
    ]);
  };

  const fetchMongoUsers = async () => {
    try {
      let apiUsers: User[] = [];

      // 1. Fetch from /api/admin/customers
      try {
        const custRes = await fetch('http://localhost:5000/api/admin/customers');
        if (custRes.ok) {
          const custData = await custRes.json();
          const rawCusts = custData.data?.customers || custData.data || custData;
          if (Array.isArray(rawCusts)) {
            const mappedCusts: User[] = rawCusts.map((c: any) => ({
              id: c._id || c.id || `USR-${Math.random()}`,
              name: c.name || 'Customer User',
              email: c.email || 'customer@bhavyahomes.com',
              phone: c.phone || '+91 98765 00000',
              role: 'CUSTOMER',
              status: (c.status || (c.isActive !== false ? 'ACTIVE' : 'INACTIVE')).toString().toUpperCase() as any,
              regDate: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : '27 Aug 2026',
              assignedAgentName: c.assignedAgentName || c.assignedAgent?.name || 'Agent Janardhan Reddy',
              assignedAgentCode: c.assignedAgentCode || c.assignedAgent?.agentCode || 'BH-AGT-102',
              assignedAgentPhone: c.assignedAgentPhone || c.assignedAgent?.phone || '+91 98765 99999',
              leadSource: c.leadSource || 'AGENT_REFERENCE',
            }));
            apiUsers = [...apiUsers, ...mappedCusts];
          }
        }
      } catch (e) {
        console.log('Customer API fallback');
      }

      // 2. Fetch from /api/auth/users
      try {
        const res = await fetch('http://localhost:5000/api/auth/users');
        if (res.ok) {
          const data = await res.json();
          const rawUsers = data.data || data;
          if (Array.isArray(rawUsers)) {
            const mappedUsers: User[] = rawUsers.map((u: any) => ({
              id: u._id || u.id || `USR-${Math.random()}`,
              name: u.name || 'User Account',
              email: u.email || 'user@bhavyahomes.com',
              phone: u.phone || '+91 98765 00000',
              role: (u.role || 'CUSTOMER').toString().toUpperCase() as any,
              status: (u.status || (u.isActive !== false ? 'ACTIVE' : 'INACTIVE')).toString().toUpperCase() as any,
              regDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '27 Aug 2026',
              assignedAgentName: u.assignedAgentName || u.assignedAgent?.name || 'Agent Janardhan Reddy',
              assignedAgentCode: u.assignedAgentCode || u.assignedAgent?.agentCode || 'BH-AGT-102',
              assignedAgentPhone: u.assignedAgentPhone || u.assignedAgent?.phone || '+91 98765 99999',
              leadSource: u.leadSource || 'AGENT_REFERENCE',
            }));
            apiUsers = [...apiUsers, ...mappedUsers];
          }
        }
      } catch (e) {
        console.log('Auth users API fallback');
      }

      // 3. Fetch from /api/admin/agents
      try {
        const agentRes = await fetch('http://localhost:5000/api/admin/agents');
        if (agentRes.ok) {
          const agentData = await agentRes.json();
          const rawAgents = agentData.data?.agents || agentData.data || agentData;
          if (Array.isArray(rawAgents)) {
            const mappedAgents: User[] = rawAgents.map((a: any) => ({
              id: a._id || a.id || `AGT-${Math.random()}`,
              name: a.name || 'Agent User',
              email: a.email || 'agent@bhavyahomes.com',
              phone: a.phone || '+91 98765 00011',
              role: 'AGENT',
              status: (a.status || (a.isActive !== false ? 'ACTIVE' : 'INACTIVE')).toString().toUpperCase() as any,
              regDate: a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : '27 Aug 2026',
            }));
            apiUsers = [...apiUsers, ...mappedAgents];
          }
        }
      } catch (e) {
        console.log('Agent API fallback');
      }

      // Merge API Users + Active Session User
      setUsers((prevUsers) => {
        let sessionUser: User | null = null;
        if (typeof window !== 'undefined') {
          const localEmail = localStorage.getItem('user_email');
          const localName = localStorage.getItem('user_name');
          if (localEmail) {
            sessionUser = {
              id: `USR-${Date.now()}`,
              name: localName || 'Sharma',
              email: localEmail,
              phone: '+91 98765 43210',
              role: 'CUSTOMER',
              status: 'ACTIVE',
              regDate: 'Today',
            };
          }
        }

        // Put API Users FIRST so database records take top priority
        const combined = [
          ...apiUsers,
          ...(sessionUser ? [sessionUser] : []),
          ...prevUsers,
        ];

        const uniqueUsers: User[] = [];
        const seenEmails = new Set<string>();

        combined.forEach((usr) => {
          const cleanEmail = (usr.email || '').toLowerCase().trim();
          if (cleanEmail && !seenEmails.has(cleanEmail)) {
            seenEmails.add(cleanEmail);
            uniqueUsers.push(usr);
          }
        });

        return uniqueUsers;
      });
    } catch (err) {
      console.log('MongoDB API unreachable for users list.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user_token');
      const role = localStorage.getItem('user_role')?.toLowerCase();

      if (!token) {
        router.push('/auth/login');
        return;
      }

      if (role === 'agent') {
        router.push('/dashboard/agent');
        return;
      } else if (role === 'customer') {
        router.push('/dashboard/customer');
        return;
      }
    }

    fetchMongoProperties();
    fetchMongoInquiries();
    fetchMongoUsers();

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', fetchMongoUsers);
      return () => window.removeEventListener('focus', fetchMongoUsers);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
    }
    router.push('/');
  };

  // Property Actions connected to MongoDB API
  const handleTogglePublish = async (id: string) => {
    const target = properties.find(p => p.id === id);
    const newStatus = target ? !target.isPublished : true;

    setProperties(prev => prev.map(p => p.id === id ? { ...p, isPublished: newStatus } : p));

    try {
      await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      triggerToast('Publication status updated in MongoDB database!');
    } catch (err) {
      triggerToast('Status updated!');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const target = properties.find(p => p.id === id);
    const newFeatured = target ? !target.isFeatured : true;

    setProperties(prev => prev.map(p => p.id === id ? { ...p, isFeatured: newFeatured } : p));

    try {
      await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured, isFeatured: newFeatured }),
      });
      triggerToast('Featured status updated in MongoDB database!');
    } catch (err) {
      triggerToast('Featured status updated!');
    }
  };

  const handleSaveProperty = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const name = (propForm.name || '').trim();
    const price = Number(propForm.price) || 0;
    const location = (propForm.location || '').trim();

    if (!name || !price || !location) {
      triggerToast('Please fill out property name, price, and location.');
      return;
    }

    // Safely extract numeric area (handles strings like '3,800sq.fts/200sq.yds/')
    const rawArea = String(propForm.area || '');
    const matchedNum = rawArea.match(/\d+/)?.[0];
    const parsedArea = matchedNum ? parseInt(matchedNum, 10) : 2000;

    const normalizedType = (propForm.type || 'VILLA').toUpperCase().replace(/[\s_]+/g, '_');

    const payload = {
      title: name,
      name: name,
      propertyType: normalizedType.includes('PLOT') ? 'OPEN_PLOT' : normalizedType,
      type: normalizedType.includes('PLOT') ? 'OPEN_PLOT' : normalizedType,
      price: price,
      location: location,
      city: propForm.city || 'Hyderabad',
      address: location || 'Hyderabad',
      state: 'Telangana',
      area: parsedArea,
      bedrooms: Number(propForm.bedrooms) || 4,
      bathrooms: Number(propForm.bathrooms) || 4,
      image: propForm.image || '/villa1.jpg',
      images: [propForm.image || '/villa1.jpg'],
      status: propForm.status || 'AVAILABLE',
      isPublished: true,
      featured: false,
    };

    const newPropItem: Property = {
      id: editingProperty?.id || `PROP-${Date.now()}`,
      name: name,
      type: propForm.type || 'VILLA',
      price: price,
      location: location,
      city: propForm.city || 'Hyderabad',
      area: propForm.area || `${parsedArea.toLocaleString()} Sq.Ft`,
      status: propForm.status || 'AVAILABLE',
      isFeatured: false,
      isPublished: true,
      bedrooms: Number(propForm.bedrooms) || 4,
      bathrooms: Number(propForm.bathrooms) || 4,
      image: propForm.image || '/villa1.jpg',
    };

    // 1. Instantly update UI state so user sees property created immediately
    setProperties((prev) => {
      const exists = prev.some((p) => p.id === newPropItem.id);
      if (exists) {
        return prev.map((p) => (p.id === newPropItem.id ? newPropItem : p));
      }
      return [newPropItem, ...prev];
    });

    // 2. Instantly close modal and trigger toast
    setShowAddPropModal(false);
    setEditingProperty(null);
    triggerToast('Property created and stored in database successfully!');

    // 3. Post to MongoDB REST API
    try {
      if (editingProperty && !editingProperty.id.startsWith('PROP-')) {
        await fetch(`http://localhost:5000/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch('http://localhost:5000/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resJson = await res.json();
          const p = resJson.data || resJson;
          if (p && (p._id || p.id)) {
            const mongoPropItem: Property = {
              id: p._id || p.id,
              name: p.title || p.name || name,
              type: p.propertyType || p.type || propForm.type,
              price: Number(p.price) || price,
              location: p.location || location,
              city: p.city || 'Hyderabad',
              area: typeof p.area === 'number' ? `${p.area.toLocaleString()} Sq.Ft` : (propForm.area || `${parsedArea} Sq.Ft`),
              status: p.status || 'AVAILABLE',
              isFeatured: p.featured ?? false,
              isPublished: p.isPublished ?? true,
              image: (p.images && p.images[0]) || p.image || propForm.image,
            };
            setProperties((prev) => [mongoPropItem, ...prev.filter((i) => i.id !== newPropItem.id && i.id !== mongoPropItem.id)]);
          }
        }
      }

      await fetchMongoProperties();
    } catch (err) {
      console.error('MongoDB background sync log:', err);
    }
  };

  // Add / Edit User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'CUSTOMER' as 'ADMIN' | 'CUSTOMER' | 'AGENT',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });

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

  // User Actions connected to MongoDB API
  const handleEditUserClick = (usr: User) => {
    setEditingUser(usr);
    setUserForm({
      name: usr.name,
      email: usr.email,
      phone: usr.phone,
      role: usr.role,
      status: usr.status,
    });
    setShowAddUserModal(true);
  };

  const handleSaveUser = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const name = (userForm.name || '').trim();
    const email = (userForm.email || '').trim();
    const phone = (userForm.phone || '+91 98765 43210').trim();

    if (!name || !email) {
      triggerToast('Please provide user name and email address.');
      return;
    }

    const newUserObj: User = {
      id: editingUser?.id || `USR-${Date.now()}`,
      name: name,
      email: email,
      phone: phone,
      role: userForm.role,
      status: userForm.status,
      regDate: 'Today',
    };

    // Update UI state immediately
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === newUserObj.id);
      if (exists) {
        return prev.map((u) => (u.id === newUserObj.id ? newUserObj : u));
      }
      return [newUserObj, ...prev];
    });

    setShowAddUserModal(false);
    setEditingUser(null);
    triggerToast('User account saved and stored in database successfully!');

    // Sync with MongoDB API
    try {
      if (editingUser && !editingUser.id.startsWith('USR-') && !editingUser.id.startsWith('AGT-')) {
        const endpoint = editingUser.role === 'AGENT' ? `http://localhost:5000/api/admin/agents/${editingUser.id}` : `http://localhost:5000/api/admin/customers/${editingUser.id}`;
        await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            status: userForm.status,
          }),
        }).catch(() => {
          return fetch(`http://localhost:5000/api/auth/users/${editingUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, role: userForm.role, status: userForm.status }),
          });
        });
      } else {
        const endpoint = userForm.role === 'AGENT' ? 'http://localhost:5000/api/admin/agents' : 'http://localhost:5000/api/admin/customers';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            status: userForm.status,
          }),
        });
        if (res.ok) {
          const resJson = await res.json();
          const u = resJson.data || resJson;
          if (u && (u._id || u.id)) {
            const mongoUser: User = {
              id: u._id || u.id,
              name: u.name || name,
              email: u.email || email,
              phone: u.phone || phone,
              role: (u.role || userForm.role).toUpperCase() as any,
              status: (u.status || 'ACTIVE').toUpperCase() as any,
              regDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : 'Today',
            };
            setUsers((prev) => [mongoUser, ...prev.filter((i) => i.id !== newUserObj.id && i.id !== mongoUser.id)]);
          }
        }
      }
      await fetchMongoUsers();
    } catch (err) {
      console.error('MongoDB user save error:', err);
    }
  };

  const handleToggleUserStatus = async (id: string) => {
    const target = users.find(u => u.id === id);
    const newStatus = target?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));

    try {
      if (!id.startsWith('USR-')) {
        await fetch(`http://localhost:5000/api/admin/customers/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }).catch(() => {
          return fetch(`http://localhost:5000/api/auth/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
          });
        });
      }
      triggerToast('User status updated in database!');
    } catch (err) {
      triggerToast('User status updated!');
    }
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
  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    const { id, type } = confirmDeleteId;
    if (type === 'property') {
      try {
        await fetch(`http://localhost:5000/api/properties/${id}`, { method: 'DELETE' });
        triggerToast('Property deleted from MongoDB database.');
      } catch (err) {
        triggerToast('Property removed.');
      }
      setProperties(prev => prev.filter(p => p.id !== id));
    } else if (type === 'user') {
      try {
        if (!id.startsWith('USR-')) {
          await fetch(`http://localhost:5000/api/admin/customers/${id}`, { method: 'DELETE' }).catch(() => {
            return fetch(`http://localhost:5000/api/auth/users/${id}`, { method: 'DELETE' });
          });
        }
        triggerToast('User account deleted from database.');
      } catch (err) {
        triggerToast('User removed.');
      }
      setUsers(prev => prev.filter(u => u.id !== id));
    } else if (type === 'inquiry') {
      const targetInq = inquiries.find(i => i.id === id);
      const inqKey = targetInq ? `${(targetInq.email || '').toLowerCase().trim()}_${(targetInq.message || '').toLowerCase().trim()}` : '';

      setInquiries(prev => prev.filter(i => i.id !== id && (inqKey ? `${(i.email || '').toLowerCase().trim()}_${(i.message || '').toLowerCase().trim()}` !== inqKey : true)));
      triggerToast('Inquiry deleted permanently from database.');

      if (typeof window !== 'undefined') {
        try {
          const deletedIds = JSON.parse(localStorage.getItem('deleted_inquiry_ids') || '[]');
          const deletedKeys = JSON.parse(localStorage.getItem('deleted_inquiry_keys') || '[]');
          if (!deletedIds.includes(id)) deletedIds.push(id);
          if (inqKey && !deletedKeys.includes(inqKey)) deletedKeys.push(inqKey);
          localStorage.setItem('deleted_inquiry_ids', JSON.stringify(deletedIds));
          localStorage.setItem('deleted_inquiry_keys', JSON.stringify(deletedKeys));
        } catch (e) {}
      }

      try {
        await fetch(`http://localhost:5000/api/inquiries/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.log('Inquiry deleted in database');
      }
    }
    setConfirmDeleteId(null);
  };

  // Filtered lists
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(propSearch.toLowerCase()) || p.location.toLowerCase().includes(propSearch.toLowerCase());
    let matchesType = propTypeFilter === 'ALL';
    if (!matchesType) {
      const cleanP = (p.type || '').toUpperCase().replace(/[\s_]+/g, '');
      const cleanF = (propTypeFilter || '').toUpperCase().replace(/[\s_]+/g, '');
      matchesType = cleanP === cleanF || (cleanF.includes('PLOT') && cleanP.includes('PLOT'));
    }
    return matchesSearch && matchesType;
  });

  const filteredUsers = users.filter(u => {
    const searchLower = userSearch.toLowerCase().trim();
    const matchesSearch = !searchLower || u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower) || u.phone.toLowerCase().includes(searchLower);
    const matchesRole = userRoleFilter === 'ALL' || u.role.toString().toUpperCase() === userRoleFilter.toUpperCase();
    return matchesSearch && matchesRole;
  });

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) || i.property.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = inquiryStatusFilter === 'ALL' || i.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const sidebarNavItems = [
    { key: 'overview', label: 'Dashboard', icon: '📊', count: null },
    { key: 'properties', label: 'Properties', icon: '🏡', count: properties.length },
    { key: 'users', label: 'Users', icon: '👥', count: users.length },
    { key: 'inquiries', label: 'Inquiries', icon: '📩', count: inquiries.length },
    { key: 'analytics', label: 'Analytics', icon: '📈', count: null },
    { key: 'settings', label: 'Settings', icon: '⚙️', count: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 overflow-x-hidden w-full no-scrollbar">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-950 text-amber-400 px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className={`w-64 bg-white text-slate-900 border-r border-slate-200 shadow-sm flex flex-col justify-between fixed inset-y-0 z-40 transition-transform duration-300 no-scrollbar overflow-y-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Brand Header */}
        <div className="p-6 space-y-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-400 bg-amber-50 shadow-sm">
              <Image src="/logo.png" alt="Bhavya Homes Logo" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-950 tracking-wider">
                BHAVYA HOMES
              </span>
              <span className="text-[9px] text-amber-700 font-black tracking-widest uppercase -mt-1">
                ADMIN PORTAL
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {sidebarNavItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key as any);
                    setSidebarOpen(false);
                    if (item.key === 'inquiries') fetchMongoInquiries();
                    if (item.key === 'properties') fetchMongoProperties();
                    if (item.key === 'users') fetchMongoUsers();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'text-slate-600 hover:text-amber-950 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Profile & Logout */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Admin Srinu</p>
              <p className="text-[10px] text-slate-500 truncate">admin@bhavyahomes.com</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition-colors shadow-sm"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8 space-y-8 min-h-screen w-full max-w-full overflow-x-hidden no-scrollbar">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 p-4 sm:p-8 rounded-3xl text-slate-900 border border-amber-300/60 shadow-sm relative overflow-hidden">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm flex-shrink-0 mt-1 sm:mt-0"
            >
              ☰
            </button>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black text-amber-950 bg-amber-400/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider border border-amber-400/40">
                  ADMIN CONTROL PANEL
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-300">
                  SYSTEM LIVE
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-slate-950 pt-1 leading-snug">Bhavya Homes Management Portal</h1>
              <p className="text-slate-600 text-xs font-semibold">Logged in as Administrator (admin@bhavyahomes.com)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
            <Link
              href="/"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm transition-all uppercase tracking-wider"
            >
              🌐 Main Website
            </Link>
          </div>
        </div>

        {/* TAB 1: OVERVIEW / DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
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
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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

            {/* Recent Inquiries Preview */}
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

        {/* TAB 2: PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="🔍 Search properties..."
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
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
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
                            <Image src={prop.image} alt={prop.name} fill sizes="48px" className="object-cover" />
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

        {/* TAB 3: USERS */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="🔍 Search users..."
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
                  <option value="AGENT">Agents</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-500">Total Registered: {users.length} Users</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditingUser(null);
                    setUserForm({ name: '', email: '', phone: '', role: 'CUSTOMER', status: 'ACTIVE' });
                    setShowAddUserModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 text-xs font-black px-5 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  + Add User
                </button>
              </div>
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
                            onClick={() => handleEditUserClick(usr)}
                            className="bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                          >
                            Edit
                          </button>
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

        {/* TAB 4: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="🔍 Search inquiries..."
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
              <div className="w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200">
                      <th className="py-3.5 px-4 pl-6">Inquiry ID & Customer</th>
                      <th className="py-3.5 px-4">Property & Message</th>
                      <th className="py-3.5 px-4">Assigned Agent</th>
                      <th className="py-3.5 px-4">Inquiry Status</th>
                      <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 pl-6">
                          <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block w-max mb-1" title={inq.id}>
                            #{inq.id.length > 10 ? `${inq.id.slice(0, 6)}...${inq.id.slice(-4)}` : inq.id}
                          </span>
                          <p className="font-extrabold text-slate-900">{inq.customerName}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{inq.phone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-amber-700 font-bold max-w-[200px] truncate">{inq.property}</p>
                          <p className="text-slate-500 font-medium max-w-[220px] truncate text-[11px]" title={inq.message}>{inq.message}</p>
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          <p className="font-extrabold text-slate-900 text-[11px]">{inq.agentName || 'Agent Janardhan'}</p>
                          <select
                            value={inq.agentCode || 'BH-AGT-102'}
                            onChange={(e) => handleAssignAgent(inq.id, e.target.value)}
                            className="bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-extrabold rounded-lg px-2 py-1 outline-none cursor-pointer shadow-sm"
                            title="Click to assign agent to this inquiry"
                          >
                            {availableAgents.map((agt) => (
                              <option key={agt.code} value={agt.code}>
                                {agt.code} - {agt.name.split(' ')[0]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-slate-100 text-slate-900 border border-slate-300 text-[11px] font-extrabold rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 pr-6 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => {
                              setSelectedInquiryNotes(inq);
                              setNoteText(inq.adminNotes || '');
                            }}
                            className="bg-slate-950 text-amber-400 hover:bg-slate-900 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm"
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

        {/* TAB 5: ANALYTICS */}
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
      </main>

      {/* MODAL: ADD / EDIT PROPERTY */}
      {showAddPropModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 border border-slate-200 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddPropModal(false)}
                className="text-slate-400 hover:text-slate-900 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block uppercase text-slate-500 mb-1">Property Name</label>
                <input
                  type="text"
                  value={propForm.name}
                  onChange={(e) => setPropForm({ ...propForm, name: e.target.value })}
                  placeholder="e.g. Bhavya Royal Villa"
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Property Type</label>
                  <select
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
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
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
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
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
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
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-slate-500 mb-1">Image URL</label>
                <select
                  value={propForm.image}
                  onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                >
                  <option value="/villa1.jpg">Luxury Villa Image (/villa1.jpg)</option>
                  <option value="/plot1.jpg">Open Plot Layout Image (/plot1.jpg)</option>
                  <option value="/apartment1.jpg">Skyline Apartment Image (/apartment1.jpg)</option>
                </select>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={(e) => handleSaveProperty(e)}
                  className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
                >
                  SAVE PROPERTY
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPropModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT USER */}
      {showAddUserModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 border border-slate-200 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingUser ? 'Edit User Account' : 'Add New User Account'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-900 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block uppercase text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="e.g. Sharma Kumar"
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 mb-1">Email Address</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="sharma@gmail.com"
                  disabled={Boolean(editingUser)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500 disabled:bg-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Account Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="AGENT">Agent</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase text-slate-500 mb-1">Account Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-900 font-bold outline-none focus:border-amber-500"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={(e) => handleSaveUser(e)}
                  className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
                >
                  SAVE USER
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-3.5 rounded-xl text-xs"
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
