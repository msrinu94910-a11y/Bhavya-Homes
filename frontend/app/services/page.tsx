export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Our Services</h1>
        <p className="text-lg text-slate-600">Comprehensive real estate solutions for home buyers, investors, and landowners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="text-3xl">🏠</div>
          <h3 className="text-xl font-bold text-slate-900">Residential Property Sales</h3>
          <p className="text-slate-600 text-sm">Luxury villas, gated community plots, and premium 2 & 3 BHK apartments.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="text-3xl">📈</div>
          <h3 className="text-xl font-bold text-slate-900">Property Investment Advisory</h3>
          <p className="text-slate-600 text-sm">Expert guidance on high-yield real estate investments in prime growth corridors.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="text-3xl">📐</div>
          <h3 className="text-xl font-bold text-slate-900">Joint Ventures & Land Development</h3>
          <p className="text-slate-600 text-sm">Developing land into high-standard approved layouts and gated ventures.</p>
        </div>
      </div>
    </div>
  );
}
