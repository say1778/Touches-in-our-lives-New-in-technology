
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './ProductContext';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productName: string) => void;
  isInWishlist: (productName: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const localData = localStorage.getItem('wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse wishlist data from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      if (!prevItems.find(item => item.name === product.name)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productName: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.name !== productName));
  };

  const isInWishlist = (productName: string): boolean => {
    return wishlistItems.some(item => item.name === productName);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
