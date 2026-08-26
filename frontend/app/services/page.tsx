import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const services = [
    {
      id: 'sales',
      title: 'Residential Property Sales',
      description: 'Luxury villas, HMDA approved gated community plots, and premium 2 & 3 BHK high-rise apartments with 100% verified legal titles.',
      image: '/service1.jpg',
      badge: 'SALES & RESALE',
      features: ['100% Legal Title Clearance', 'Spot Registration Support', 'Direct Builder Deals'],
    },
    {
      id: 'advisory',
      title: 'Property Investment Advisory',
      description: 'Expert guidance on high-yield real estate investments along prime growth corridors, regional ring roads, and pharma hubs.',
      image: '/service2.jpg',
      badge: 'INVESTMENT & WEALTH',
      features: ['High Capital Appreciation', 'Market Trend Analysis', 'Portfolio Management'],
    },
    {
      id: 'joint-ventures',
      title: 'Joint Ventures & Land Development',
      description: 'Partnering with landowners to transform raw land into high-standard approved layout ventures and gated luxury communities.',
      image: '/service3.jpg',
      badge: 'DEVELOPMENT & JV',
      features: ['HMDA / DTCP Layout Approvals', 'Turnkey Construction', 'Transparent Profit Sharing'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black text-amber-500 bg-slate-950 px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
          WHAT WE OFFER
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Our Real Estate Services</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Comprehensive, end-to-end real estate solutions engineered for homebuyers, investors, and landowners.
        </p>
      </div>

      {/* Services Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group"
          >
            {/* Service Image Banner */}
            <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-amber-400 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/40">
                {service.badge}
              </div>
            </div>

            {/* Service Content */}
            <div className="p-7 space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="block text-center w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md uppercase tracking-wider"
                >
                  Inquire About Service
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
