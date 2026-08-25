import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Panel</h1>
          <p className="text-slate-600 text-sm">Manage properties, projects, leads, inquiries, and site visits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Properties</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Projects</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Active Leads</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">New Inquiries</span>
          <div className="text-3xl font-extrabold text-slate-900">0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Property Management</h3>
          <p className="text-slate-500 text-xs">Add, edit, publish, or remove properties.</p>
          <button className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm">
            Manage Properties
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Project Management</h3>
          <p className="text-slate-500 text-xs">Add and update real estate ventures.</p>
          <button className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm">
            Manage Projects
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Leads & Inquiries</h3>
          <p className="text-slate-500 text-xs">Review customer inquiries and lead pipelines.</p>
          <button className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-xl text-sm">
            View Leads
          </button>
        </div>
      </div>
    </div>
  );
}
