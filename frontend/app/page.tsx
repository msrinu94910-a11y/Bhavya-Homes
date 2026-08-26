import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Full-Width Architectural Hero Section matching reference screenshot */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Bhavya Homes Gated Community Entrance Arch"
            fill
            priority
            className="object-cover object-center transform scale-105"
          />
          {/* Gradient Overlay for Text Clarity & Luxury Vibe */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-8">
          
          {/* Floating RERA & HMDA Approved Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-gold-400/40 text-slate-900 text-xs sm:text-sm font-semibold tracking-wide animate-pulse">
            <span className="flex items-center space-x-1.5 text-emerald-700 font-bold">
              <svg className="w-4 h-4 text-emerald-600 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>TS RERA APPROVED</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-800">RERA No: P02400001406</span>
            <span className="text-slate-300">|</span>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase">
              HMDA Approved Layout
            </span>
          </div>

          {/* Main Title & Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
              BHAVYA <span className="bg-gradient-to-r from-gold-400 via-yellow-200 to-gold-500 bg-clip-text text-transparent">COUNTY</span>
            </h1>
            <p className="text-xl sm:text-2xl font-light text-slate-200 max-w-3xl mx-auto drop-shadow-md">
              A Premium Mega Real Estate Venture & Gated Community Luxury Residences
            </p>
          </div>

          {/* Search Bar Overlay Box */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-3xl max-w-4xl mx-auto shadow-2xl border border-white/20 text-left space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Select Location
                </label>
                <select className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-gold-500 outline-none">
                  <option>Hyderabad (All Locations)</option>
                  <option>Gachibowli Corridor</option>
                  <option>Miyapur / Bachupally</option>
                  <option>Pharma City Growth Corridor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <select className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-gold-500 outline-none">
                  <option>Open Plots (Gated Layout)</option>
                  <option>Luxury Villa</option>
                  <option>3BHK Apartment</option>
                  <option>Commercial Space</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Price Budget
                </label>
                <select className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-gold-500 outline-none">
                  <option>Any Budget</option>
                  <option>₹25 Lakhs - ₹50 Lakhs</option>
                  <option>₹50 Lakhs - ₹1 Crore</option>
                  <option>₹1 Crore - ₹3 Crores</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-4 text-xs text-slate-300">
                <span>✅ 100% Clear Title</span>
                <span>✅ Spot Registration</span>
                <span>✅ Bank Loan Available</span>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5">
                Explore Venture & Availability
              </button>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/properties"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Browse All Layout Plots
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm transition-all"
            >
              Schedule Site Visit
            </Link>
          </div>

        </div>
      </section>

      {/* Highlights & Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Venture Highlights</h2>
          <p className="text-slate-600 mt-2">World-class infrastructure engineered for high appreciation & serene living.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
              ⛩️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Grand Entrance Arch</h3>
            <p className="text-slate-600 text-xs mt-1">24x7 security guard surveillance with RFID gate barriers.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🛣️
            </div>
            <h3 className="text-lg font-bold text-slate-900">60' & 40' Blacktop Roads</h3>
            <p className="text-slate-600 text-xs mt-1">Wide avenue plantation with underground cabling & drainage.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🏊‍♂️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Luxury Clubhouse</h3>
            <p className="text-slate-600 text-xs mt-1">Swimming pool, indoor games, gymnasium & landscaped parks.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">
              📜
            </div>
            <h3 className="text-lg font-bold text-slate-900">HMDA & RERA Approved</h3>
            <p className="text-slate-600 text-xs mt-1">100% legal title assurance with instant bank loan approval.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
