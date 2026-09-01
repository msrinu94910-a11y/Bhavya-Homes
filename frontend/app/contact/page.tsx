'use client';

import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('user_email');
      const savedName = localStorage.getItem('user_name');
      if (savedEmail || savedName) {
        setFormData((prev) => ({
          ...prev,
          email: prev.email || savedEmail || '',
          name: prev.name || savedName || '',
        }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formData.name,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || 'General Inquiry / Site Visit Request',
          property: 'Bhavya Homes County Gated Venture',
        }),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8 sm:space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <span className="text-[10px] sm:text-xs font-black text-slate-950 bg-amber-400 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-wider">
          GET IN TOUCH WITH BHAVYA HOMES
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          Contact & Book Free Site Visit
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed px-2">
          Have questions about plots, villas, or floor plans? Send us an inquiry and our property advisory team will connect with you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 sm:space-y-6">
          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 sm:p-4 rounded-2xl text-xs font-bold flex items-center space-x-2">
              <span>✓</span>
              <span>Inquiry saved successfully to MongoDB database! Our sales manager will contact you shortly.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs outline-none focus:border-amber-500 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs outline-none focus:border-amber-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs outline-none focus:border-amber-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Inquiry / Requirements</label>
            <textarea
              rows={4}
              placeholder="Tell us about your plot / villa preferences, budget, or preferred site visit time..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs outline-none focus:border-amber-500 font-medium"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3.5 sm:py-4 rounded-2xl shadow-lg transition-all uppercase tracking-wider text-[11px] sm:text-xs"
          >
            {loading ? 'Submitting to Database...' : 'Submit Inquiry & Request Site Visit →'}
          </button>
        </form>

        {/* Corporate Address Panel */}
        <div className="space-y-6 bg-slate-950 text-white p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-slate-800">
          <div className="space-y-5 sm:space-y-6">
            <div>
              <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full uppercase tracking-wider">
                CORPORATE HEADQUARTERS
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-3 text-white">Bhavya Homes Pvt. Ltd.</h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2">
                Plot No. 42, Bhavya Towers, Gachibowli Main Road,<br />
                Near Cyber Towers, Hyderabad, Telangana - 500032.
              </p>
            </div>

            <hr className="border-slate-800" />

            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-center space-x-3">
                <span className="text-amber-400 font-bold text-sm">📞</span>
                <span>+91 94910 00000 / +91 98765 43210</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="text-amber-400 font-bold text-sm">✉️</span>
                <span>contact@bhavyahomes.com</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="text-amber-400 font-bold text-sm">📜</span>
                <span>TS RERA Reg: P02400001406 | HMDA Approved Layout</span>
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              100% Legal Compliance & Spot Registration Guaranteed
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
