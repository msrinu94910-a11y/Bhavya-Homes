'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickFill = (targetRole: 'customer' | 'admin') => {
    setRole(targetRole);
    if (targetRole === 'customer') {
      setEmail('customer@bhavyahomes.com');
      setPassword('password123');
    } else {
      setEmail('admin@bhavyahomes.com');
      setPassword('admin123');
    }
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate authentication process and save session token
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_token', 'mock_jwt_token_123');
        localStorage.setItem('user_role', role);
        localStorage.setItem('user_email', email);
      }

      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
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

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Brand Logo & Header */}
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
                PORTAL LOGIN
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-black text-white pt-2">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to access your customer dashboard & saved site visits</p>
        </div>

        {/* Role Toggle Switcher */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              role === 'customer'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 Customer Login
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              role === 'admin'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛡️ Admin / Agent
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3.5 text-sm placeholder-slate-600 transition-all outline-none"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white rounded-2xl px-4 py-3.5 text-sm placeholder-slate-600 transition-all outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Shortcut Buttons */}
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500 font-medium">Testing shortcuts:</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleQuickFill('customer')}
                className="text-amber-400 hover:text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg font-bold border border-amber-400/20"
              >
                ⚡ Fill Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="text-amber-400 hover:text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg font-bold border border-amber-400/20"
              >
                ⚡ Fill Admin
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg transition-all uppercase tracking-wider text-sm transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : `Sign In to ${role === 'admin' ? 'Admin Portal' : 'Dashboard'}`}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Don't have an account yet?{' '}
          <Link href="/auth/register" className="text-amber-400 font-bold hover:underline">
            Register New Account
          </Link>
        </p>

      </div>
    </div>
  );
}
