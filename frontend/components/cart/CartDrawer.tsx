'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-lg font-bold">Property Cart & Shortlist</h2>
              <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-5xl">🏡</div>
                <h3 className="text-lg font-bold text-slate-900">Your Cart is Empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Explore luxury villas, plots, and apartments to add items to your shortlist cart.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex space-x-4 relative group hover:border-amber-400 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase">
                      {item.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{item.location}</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                      ₹ {item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-600 text-sm font-bold p-1 self-start"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Inquiry Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Shortlisted Value:</span>
                <span className="text-lg text-primary-700">₹ {totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold py-3.5 rounded-xl shadow-md transition-all uppercase tracking-wider text-sm"
                >
                  Submit Bulk Site Visit Inquiry ({cart.length})
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-center text-xs text-slate-500 hover:text-red-600 py-1"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
