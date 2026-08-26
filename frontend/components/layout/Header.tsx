'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user_email');
      const role = localStorage.getItem('user_role');
      const name = localStorage.getItem('user_name');
      
      if (email || role) {
        let displayName = name;
        if (!displayName && email) {
          displayName = email.split('@')[0];
          displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }
        setUser({
          email: email || 'user@bhavyahomes.com',
          name: displayName || 'Customer',
          role: role || 'customer',
        });
      } else {
        setUser(null);
      }
    }
  }, [pathname]);

  // Hide the main website header completely on auth pages and dashboard routes
  if (pathname.startsWith('/auth') || pathname.startsWith('/dashboard')) {
    return null;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    }
    setUser(null);
    router.push('/');
  };

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PROPERTIES', href: '/properties' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'AMENITIES', href: '/amenities' },
    { name: 'FLOOR PLANS', href: '/floor-plans' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const dashboardHref = user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/customer';

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md border border-amber-500/40 group-hover:scale-105 transition-transform bg-slate-900">
            <Image
              src="/logo.png"
              alt="Bhavya Homes Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent tracking-wider">
              BHAVYA HOMES
            </span>
            <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase -mt-1">
              BUILDING A NEW FUTURE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-amber-500 border-amber-500 font-black'
                    : 'text-slate-200 border-transparent hover:text-amber-400 hover:border-amber-400/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Dynamic User Profile / Login & Book Visit */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href={dashboardHref}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-amber-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>👤</span>
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-block text-xs font-semibold text-slate-400 hover:text-red-400 px-2 py-1 transition-colors"
                title="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="hidden sm:inline-block text-xs font-semibold text-slate-300 hover:text-white px-2 py-2 transition-colors"
            >
              Login
            </Link>
          )}

          <Link
            href="/contact"
            className="text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 px-4 py-2.5 rounded-xl shadow-md transition-all uppercase tracking-wider transform hover:scale-105"
          >
            Book Site Visit
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 font-bold border-l-4 border-amber-500'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {user && (
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-xs font-bold text-red-400 py-2 px-4"
              >
                Logout ({user.name})
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
