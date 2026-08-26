'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_token', 'mock_jwt_token_456');
        localStorage.setItem('user_role', 'customer');
        localStorage.setItem('user_name', formData.fullName);
        localStorage.setItem('user_email', formData.email);
      }
      router.push('/dashboard/customer');
    }, 800);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
      
      {/* Background Architectural Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/hero-bg.jpg"
          alt="Bhavya Homes Entrance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      </div>

      {/* Glassmorphic Register Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md border border-amber-500/40 bg-slate-950">
              <Image
                src="/logo.png"
                alt="Bhavya Homes Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <span className="text-xl font-black bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent block">
                BHAVYA HOMES
              </span>
              <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase block -mt-1">
                CREATE ACCOUNT
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-black text-white pt-2">Join Bhavya Homes</h1>
          <p className="text-xs text-slate-400">Register to schedule site visits & track property inquiries</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Srikanth Rao"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3 text-sm placeholder-slate-600 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="srikanth@example.com"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3 text-sm placeholder-slate-600 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Mobile Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3 text-sm placeholder-slate-600 outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3 text-sm placeholder-slate-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg transition-all uppercase tracking-wider text-sm transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Already registered?{' '}
          <Link href="/auth/login" className="text-amber-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
}
