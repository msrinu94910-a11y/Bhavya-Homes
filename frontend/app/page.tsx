import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      
      {/* Full-Width Architectural Hero Section matching reference screenshot */}
      <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Bhavya County Gated Community Entrance Arch"
            fill
            priority
            className="object-cover object-center transform scale-105"
          />
          {/* Light Ambient Overlay for Clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        </div>

        {/* Hero Top Content Area: Title & Right Side Brand Emblem */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Left Title & Tagline */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-black tracking-widest uppercase">
              ✨ PREMIER GATED TOWNSHIP
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-2xl">
              BHAVYA <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">COUNTY</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-200 drop-shadow-md leading-relaxed">
              Premium HMDA & RERA Approved Open Plot Layouts, Luxury Villas & High-Rise Residences in Hyderabad Growth Corridor.
            </p>
          </div>

          {/* Right Side Stylized Project Branding (Matching Reference Screenshot) */}
          <div className="bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-3 text-center md:text-right self-stretch md:self-auto flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent tracking-wider">
              BHAVYA COUNTY
            </div>
            <div className="text-xs font-extrabold text-amber-400 tracking-widest uppercase border-t border-amber-500/30 pt-2">
              A PROJECT BY BHAVYA GROUP
            </div>
            <p className="text-[11px] text-slate-300 font-semibold">
              BUILDING A NEW FUTURE
            </p>
          </div>

        </div>

        {/* Center Interactive Real Estate Search Filter Bar */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Select Corridor
                </label>
                <select className="w-full bg-slate-950 text-white border border-slate-800 rounded-2xl px-4 py-3.5 text-xs font-bold focus:border-amber-500 outline-none">
                  <option>Hyderabad (All Growth Corridors)</option>
                  <option>Shadnagar Pharma Highway</option>
                  <option>Gachibowli Financial District</option>
                  <option>Miyapur / Bachupally Extension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Property Category
                </label>
                <select className="w-full bg-slate-950 text-white border border-slate-800 rounded-2xl px-4 py-3.5 text-xs font-bold focus:border-amber-500 outline-none">
                  <option>HMDA Open Plot Layout</option>
                  <option>Luxury 4BHK Villa</option>
                  <option>Skyline 3BHK Apartment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Investment Budget
                </label>
                <select className="w-full bg-slate-950 text-white border border-slate-800 rounded-2xl px-4 py-3.5 text-xs font-bold focus:border-amber-500 outline-none">
                  <option>Any Investment Budget</option>
                  <option>₹30 Lakhs - ₹60 Lakhs</option>
                  <option>₹60 Lakhs - ₹1.5 Crores</option>
                  <option>₹1.5 Crores - ₹4 Crores</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-300">
                <span>✅ 100% Clear Title</span>
                <span>✅ Spot Registration</span>
                <span>✅ 80% Bank Loan Support</span>
              </div>
              <Link
                href="/properties"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl transition-all uppercase tracking-wider text-xs text-center transform hover:scale-105"
              >
                Search Available Plots & Villas
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar: Floating RERA & HMDA Badge Pill (Matching Reference Screenshot EXACTLY) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-2xl shadow-lg transition-all text-xs uppercase tracking-wider"
            >
              📅 Book Free Pickup Cab Visit
            </Link>
            <Link
              href="/projects"
              className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl border border-slate-700 backdrop-blur-md transition-all text-xs uppercase tracking-wider"
            >
              View Master Layout Plan
            </Link>
          </div>

          {/* Floating White RERA & HMDA Badge Pill (Identical to User Reference Screenshot) */}
          <div className="bg-white text-slate-900 px-6 py-2.5 rounded-full shadow-2xl border border-slate-200 flex items-center space-x-4 font-bold text-xs sm:text-sm">
            <span className="text-slate-800 font-extrabold tracking-wide">
              Rera No: P02400001406
            </span>
            <span className="text-slate-300">|</span>
            
            {/* TS RERA Logo Badge */}
            <div className="flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-black text-[11px] uppercase tracking-wider text-emerald-800">
                TS RERA
              </span>
            </div>

            <span className="text-slate-300">|</span>

            {/* HMDA Logo Badge */}
            <div className="flex items-center space-x-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              <span className="font-black text-[11px] uppercase tracking-wider text-blue-900">
                HMDA
              </span>
              <span className="text-[9px] text-blue-600 font-semibold hidden sm:inline">Growing Global</span>
            </div>
          </div>

        </div>

      </section>

      {/* Highlights & Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Venture Highlights</h2>
          <p className="text-slate-600 mt-2 text-sm">World-class infrastructure engineered for high appreciation & serene living.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all hover:border-amber-400">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              ⛩️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Grand Entrance Arch</h3>
            <p className="text-slate-600 text-xs mt-1">24x7 security guard surveillance with RFID gate barriers.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all hover:border-amber-400">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🛣️
            </div>
            <h3 className="text-lg font-bold text-slate-900">60' & 40' Blacktop Roads</h3>
            <p className="text-slate-600 text-xs mt-1">Wide avenue plantation with underground cabling & drainage.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all hover:border-amber-400">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🏊‍♂️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Luxury Clubhouse</h3>
            <p className="text-slate-600 text-xs mt-1">Swimming pool, indoor games, gymnasium & landscaped parks.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all hover:border-amber-400">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
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
