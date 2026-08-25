export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Contact Bhavya Homes</h1>
        <p className="text-slate-600">Have questions about a property or project? Get in touch with our team today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" placeholder="Your Name" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea rows={4} placeholder="How can we help you?" className="w-full border border-slate-300 rounded-xl p-3 text-sm" required></textarea>
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all">
            Send Message
          </button>
        </form>

        <div className="space-y-6 bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gold-400">Head Office</h3>
            <p className="text-slate-300 mb-4">Bhavya Homes Pvt Ltd<br />Gachibowli Main Road<br />Hyderabad, Telangana 500032</p>
            <p className="text-slate-300 mb-2">📞 +91 98765 43210</p>
            <p className="text-slate-300">✉️ contact@bhavyahomes.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
