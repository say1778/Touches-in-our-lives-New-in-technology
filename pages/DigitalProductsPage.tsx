
import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductContext';

const DigitalProductsPage: React.FC = () => {
  const { products } = useProducts();
  const digitalProducts = products.filter(p => p.category === 'digital');

  return (
    <div>
      <SectionTitle 
        title="المنتجات الرقمية" 
        subtitle="تصفح مجموعتنا من المنتجات الرقمية القابلة للتحميل الفوري." 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {digitalProducts.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default DigitalProductsPage;