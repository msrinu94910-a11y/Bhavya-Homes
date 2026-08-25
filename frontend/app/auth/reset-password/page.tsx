import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-xs text-slate-500">Create a new password for your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
