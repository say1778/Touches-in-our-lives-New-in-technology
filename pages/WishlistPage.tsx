
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems, wishlistCount } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <div className="text-center py-20">
        <SectionTitle title="قائمة أمنياتك فارغة" />
        <p className="mt-4 text-gray-600">أضف المنتجات التي تعجبك للعودة إليها لاحقًا.</p>
        <Link to="/pricing" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle title="قائمة الأمنيات" subtitle={`لديك ${wishlistCount} منتج في قائمتك`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
