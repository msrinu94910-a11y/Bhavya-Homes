import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      
      {/* Architectural Hero Section with Entrance Building Clearly Visible on Right */}
      <section className="relative min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-950">
        
        {/* Unobscured Background Entrance Gate Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Bhavya Homes Gated Community Entrance Arch"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Side Gradient Overlay so text is readable while Entrance Gate stays 100% visible on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent md:to-transparent" />
        </div>

        {/* Left Side Compact Text Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="max-w-lg space-y-4 text-left text-white">
            
            {/* Floating RERA & HMDA Approved Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/40 text-[11px] font-bold text-amber-400 shadow-xl">
              <span className="flex items-center space-x-1 text-emerald-400">
                <span>✓ TS RERA APPROVED</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">RERA No: P02400001406</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">HMDA Layout</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-2xl leading-tight">
                BHAVYA <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">HOMES COUNTY</span>
              </h1>
              <p className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest drop-shadow-md">
                BUILDING A NEW FUTURE
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed pt-0.5 drop-shadow-md">
                A Premium 50-Acre Mega Real Estate Venture & Gated Community Luxury Residences in Hyderabad.
              </p>
            </div>

            {/* Compact Search Filter Box */}
            <div className="bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 space-y-2.5 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block font-bold text-amber-400 uppercase tracking-wider mb-1 text-[10px]">
                    Location Corridor
                  </label>
                  <select className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-2.5 py-2 outline-none focus:border-amber-500 font-medium text-xs">
                    <option>Hyderabad (All Corridors)</option>
                    <option>Gachibowli Growth Corridor</option>
                    <option>Shadnagar / Pharma City</option>
                    <option>Miyapur / Bachupally</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-amber-400 uppercase tracking-wider mb-1 text-[10px]">
                    Property Category
                  </label>
                  <select className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-2.5 py-2 outline-none focus:border-amber-500 font-medium text-xs">
                    <option>Open Plots (Gated Layout)</option>
                    <option>Luxury Villa</option>
                    <option>High-Rise Apartment</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black py-2.5 rounded-xl shadow-lg transition-all uppercase tracking-wider text-xs">
                Search Venture & Availability
              </button>
            </div>

            {/* Key Assurance Highlights */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] font-bold text-slate-200 pt-0.5 drop-shadow-md">
              <span className="flex items-center space-x-1">
                <span className="text-emerald-400">✓</span>
                <span>100% Clear Title</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-emerald-400">✓</span>
                <span>Spot Registration</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-emerald-400">✓</span>
                <span>Bank Loan Available</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Link
                href="/properties"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
              >
                Browse All Properties
              </Link>
              <Link
                href="/contact"
                className="bg-slate-900/80 hover:bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl border border-slate-700 backdrop-blur-md transition-all text-xs uppercase tracking-wider"
              >
                Book Free Site Visit
              </Link>
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
