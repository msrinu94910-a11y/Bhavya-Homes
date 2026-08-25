import Link from 'next/link';

export default function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Customer Dashboard</h1>
          <p className="text-slate-600 text-sm">Manage saved properties, track inquiries, and view site visits.</p>
        </div>
        <Link
          href="/properties"
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all"
        >
          Browse Properties
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Saved Properties</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Inquiries</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Site Visits</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center py-16 space-y-4">
        <div className="text-4xl">🏡</div>
        <h3 className="text-xl font-bold text-slate-900">No Activity Yet</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Start exploring luxury properties and save your favorites or request site visits to view them in person.
        </p>
      </div>
    </div>
  );
}
