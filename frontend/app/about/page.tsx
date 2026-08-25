export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">About Bhavya Homes</h1>
        <p className="text-lg text-slate-600">
          Building trust, crafting luxury lifestyles, and delivering high-value real estate projects across key urban markets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Our Vision & Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Bhavya Homes was founded with a vision to redefine real estate development by delivering superior quality construction, architectural excellence, and transparent customer dealings.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you are looking for your dream villa, an investment open plot, or a modern residential apartment, Bhavya Homes brings unmatched commitment to every project.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-slate-800 text-white p-8 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-xl font-bold text-gold-400">Core Values</h3>
          <ul className="space-y-3 text-slate-200">
            <li className="flex items-center space-x-2"><span>✨</span> <span>Uncompromising Quality</span></li>
            <li className="flex items-center space-x-2"><span>🔍</span> <span>Complete Legal Transparency</span></li>
            <li className="flex items-center space-x-2"><span>⏰</span> <span>On-Time Delivery</span></li>
            <li className="flex items-center space-x-2"><span>❤️</span> <span>Customer First Philosophy</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
