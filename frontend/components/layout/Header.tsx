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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name (Left Side) */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-sm border border-amber-400 group-hover:scale-105 transition-transform bg-amber-50">
            <Image
              src="/logo.png"
              alt="Bhavya Homes Logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-2xl font-black text-slate-950 tracking-wider">
              BHAVYA HOMES
            </span>
            <span className="text-[8px] sm:text-[10px] text-amber-700 font-black tracking-widest uppercase -mt-0.5 sm:-mt-1">
              BUILDING A NEW FUTURE
            </span>
          </div>
        </Link>

        {/* Right Side: Desktop Navigation Links + Login Action Button */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 border-b-2 ${
                    isActive
                      ? 'text-amber-700 border-amber-500 font-black'
                      : 'text-slate-700 border-transparent hover:text-amber-600 hover:border-amber-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Styled Login Button or Logged-in User Profile */}
          {user ? (
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4 ml-2">
              <Link
                href={dashboardHref}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-900 border border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <span>👤</span>
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-slate-500 hover:text-red-600 px-2 py-1 transition-colors"
                title="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-5 py-2.5 rounded-xl shadow-sm transition-all uppercase tracking-wider border border-amber-500 hover:shadow-md ml-2"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu & Login Toggle */}
        <div className="flex items-center lg:hidden space-x-3">
          {user ? (
            <Link
              href={dashboardHref}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-extrabold"
            >
              <span>👤</span>
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-black text-slate-950 bg-amber-400 px-3.5 py-1.5 rounded-lg uppercase tracking-wider"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 font-extrabold border-l-4 border-amber-500'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {!user && (
            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-500 py-2.5 px-4 rounded-xl uppercase tracking-wider shadow-sm"
              >
                Login
              </Link>
            </div>
          )}
          {user && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-xs font-bold text-red-600 py-2 px-4"
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
