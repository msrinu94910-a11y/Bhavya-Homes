import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
          <p className="text-xs text-slate-500">Enter your email to receive password reset instructions</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition-all">
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-xs text-slate-600">
          Remember your password? <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
