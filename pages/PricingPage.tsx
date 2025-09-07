
import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductContext';

const PricingPage: React.FC = () => {
  const { products } = useProducts();
  return (
    <div>
      <SectionTitle title="جميع المنتجات" subtitle="تصفح مجموعتنا الكاملة من المنتجات عالية الجودة" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
