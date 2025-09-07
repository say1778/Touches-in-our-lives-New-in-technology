
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../context/ProductContext';

interface ProductCardProps extends Product {}

const HeartIcon: React.FC<{ className?: string; isFilled?: boolean }> = ({ className, isFilled }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ProductCard: React.FC<ProductCardProps> = (product) => {
  const { name, price, discountPrice, imageUrls, description, brand, sku } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(name);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(name);
    } else {
      addToWishlist(product);
    }
  };

  const imageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://picsum.photos/seed/placeholder/400/300';
  
  return (
    <Link to={`/product/${encodeURIComponent(name)}`} className="group block h-full">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {discountPrice && (
            <div className="absolute top-3 end-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
              خصم
            </div>
          )}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 start-3 bg-white/70 hover:bg-white rounded-full p-2 transition-colors duration-200 z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`} isFilled={isWishlisted} />
          </button>
        </div>
        <div className="p-4 text-right flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {name}
            </h3>
            {(brand || sku) && (
              <div className="mt-1 text-xs text-gray-500 flex justify-end gap-x-3 gap-y-1 flex-wrap">
                {brand && <span className="font-medium">{brand}</span>}
                {sku && <span className="font-mono text-gray-400">({sku})</span>}
              </div>
            )}
            <p className="mt-2 text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]" title={description}>
              {description}
            </p>
          </div>
          <div className="mt-2 flex items-baseline justify-end gap-2">
            {discountPrice ? (
              <>
                <p className="text-xl font-bold text-indigo-600">
                  {discountPrice.toLocaleString('ar-EG')} ج.م
                </p>
                <p className="text-md text-gray-500 line-through">
                  {price.toLocaleString('ar-EG')} ج.م
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-indigo-600">
                {price.toLocaleString('ar-EG')} ج.م
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
