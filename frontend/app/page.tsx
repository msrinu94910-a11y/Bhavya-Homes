import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      
      {/* 100% Uncropped Architectural Hero Banner */}
      <section className="relative w-full bg-slate-950">
        
        {/* Aspect Ratio Container for 100% Full Uncropped Entrance Gate View */}
        <div className="relative w-full aspect-[16/9] max-h-[80vh] min-h-[420px] bg-slate-950 overflow-hidden flex items-center justify-center">
          <Image
            src="/hero-bg.jpg"
            alt="Bhavya Homes County Gated Community Entrance Arch"
            fill
            priority
            className="object-contain md:object-cover object-center"
          />

          {/* Floating RERA & HMDA Badge Card on Bottom-Right */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 bg-white/95 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-2xl border border-amber-400/50 flex flex-wrap items-center space-x-2 sm:space-x-3 text-slate-900 text-[11px] sm:text-xs font-bold">
            <span className="text-slate-800">Rera No: P02400001406</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-extrabold">TS RERA</span>
            <span className="text-slate-300">|</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              HMDA Approved
            </span>
          </div>
        </div>

        {/* Horizontal Interactive Search Bar Below Hero Image */}
        <div className="bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-800/80 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Title & Tagline Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  BHAVYA <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">HOMES COUNTY</span>
                </h1>
                <p className="text-xs text-amber-400 font-bold tracking-widest uppercase mt-0.5">
                  BUILDING A NEW FUTURE — 50-Acre Mega Venture & Gated Community Luxury Residences
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/properties"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider"
                >
                  Browse All Properties
                </Link>
                <Link
                  href="/contact"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl border border-slate-700 transition-all uppercase tracking-wider"
                >
                  Book Site Visit
                </Link>
              </div>
            </div>

            {/* Interactive Search Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-white">
              <div>
                <label className="block text-amber-400 uppercase tracking-wider mb-1 text-[10px]">
                  Location Corridor
                </label>
                <select className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-3 outline-none focus:border-amber-500 font-medium">
                  <option>Hyderabad (All Corridors)</option>
                  <option>Gachibowli Growth Corridor</option>
                  <option>Shadnagar / Pharma City</option>
                  <option>Miyapur / Bachupally</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-400 uppercase tracking-wider mb-1 text-[10px]">
                  Property Category
                </label>
                <select className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-3 outline-none focus:border-amber-500 font-medium">
                  <option>Open Plots (Gated Layout)</option>
                  <option>Luxury Villa</option>
                  <option>High-Rise Apartment</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-400 uppercase tracking-wider mb-1 text-[10px]">
                  Price Budget
                </label>
                <select className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-3 outline-none focus:border-amber-500 font-medium">
                  <option>Any Budget</option>
                  <option>₹25 Lakhs - ₹50 Lakhs</option>
                  <option>₹50 Lakhs - ₹1 Crore</option>
                  <option>₹1 Crore - ₹3 Crores</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-3 rounded-xl shadow-lg transition-all uppercase tracking-wider text-xs">
                  Search Venture & Availability
                </button>
              </div>
            </div>

            {/* Key Assurance Perks */}
            <div className="flex flex-wrap items-center space-x-6 text-xs font-bold text-slate-300 pt-2">
              <span className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Clear Title & Spot Registration</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Bank Loan Facility Available</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>24/7 Security & Gated Compound Wall</span>
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* Venture Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900">Venture Infrastructure Highlights</h2>
          <p className="text-slate-600 text-sm mt-2">World-class infrastructure engineered for high property appreciation & serene luxury living.</p>
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
