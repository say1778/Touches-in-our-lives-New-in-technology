
import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductContext';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  
  const electronics = products.filter(p => p.category === 'electronics').slice(0, 4);
  const clothing = products.filter(p => p.category === 'clothing').slice(0, 4);
  const cosmetics = products.filter(p => p.category === 'cosmetics').slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-indigo-100 rounded-lg p-8 md:p-12 min-h-[300px] flex items-center">
         <div className="text-right z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">عروض مميزة هذا الأسبوع!</h1>
          <p className="mt-4 text-lg text-indigo-700 max-w-lg">
            اكتشف أفضل المنتجات بأسعار لا تقاوم. تسوق الآن واحصل على خصم يصل إلى 40%.
          </p>
          <button className="mt-6 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            تسوق الآن
          </button>
        </div>
      </div>
      
      {/* Electronics Section */}
      <section>
        <SectionTitle title="الإلكترونيات" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {electronics.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      {/* Clothing Section */}
      <section>
        <SectionTitle title="الملابس" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clothing.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      {/* Cosmetics Section */}
      <section>
        <SectionTitle title="مستحضرات التجميل" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cosmetics.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
