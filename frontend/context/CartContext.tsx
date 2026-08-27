'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  image: string;
  type: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load cart from MongoDB / localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bhavya_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }

    // Sync with MongoDB API
    fetch('http://localhost:5000/api/customer/saved-properties')
      .then((res) => res.json())
      .then((data) => {
        const rawSaved = data.data || data;
        if (Array.isArray(rawSaved) && rawSaved.length > 0) {
          const mongoCart: CartItem[] = rawSaved.map((s: any) => {
            const p = s.property || s;
            return {
              id: p._id || p.id || s._id,
              title: p.title || p.name || 'Saved Property',
              slug: p.slug || 'property',
              price: Number(p.price) || 0,
              location: p.location || 'Hyderabad',
              image: (p.images && p.images[0]) || p.image || '/villa1.jpg',
              type: p.propertyType || p.type || 'VILLA',
            };
          });
          setCart(mongoCart);
        }
      })
      .catch(() => {});
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('bhavya_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });

    // Store directly in MongoDB database
    fetch('http://localhost:5000/api/customer/saved-properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: item.id }),
    }).catch(() => {});

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));

    // Remove from MongoDB database
    fetch(`http://localhost:5000/api/customer/saved-properties/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => {
    return cart.some((i) => i.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
