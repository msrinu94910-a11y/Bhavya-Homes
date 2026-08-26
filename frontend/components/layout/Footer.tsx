import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">BHAVYA HOMES</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your trusted destination for premium luxury properties, villa plots, gated communities, and real estate investments.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/properties" className="hover:text-gold-400 transition-colors">Properties</Link></li>
            <li><Link href="/projects" className="hover:text-gold-400 transition-colors">Projects</Link></li>
            <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
            <li><Link href="/amenities" className="hover:text-gold-400 transition-colors">Amenities</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
            <li><Link href="/floor-plans" className="hover:text-gold-400 transition-colors">Floor Plans</Link></li>
            <li><Link href="/dashboard/customer" className="hover:text-gold-400 transition-colors">Customer Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Info</h4>
          <p className="text-sm text-slate-400 mb-2">Hyderabad, Telangana, India</p>
          <p className="text-sm text-slate-400 mb-2">Email: info@bhavyahomes.com</p>
          <p className="text-sm text-slate-400">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Bhavya Homes. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
