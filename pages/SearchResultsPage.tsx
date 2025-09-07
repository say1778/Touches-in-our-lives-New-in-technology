
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

const SearchResultsPage: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const decodedQuery = query ? decodeURIComponent(query) : '';
  const { products } = useProducts();

  const searchResults = decodedQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(decodedQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <SectionTitle 
        title={`نتائج البحث عن: "${decodedQuery}"`} 
        subtitle={searchResults.length > 0 
          ? `تم العثور على ${searchResults.length} منتج.`
          : 'عفواً، لم نتمكن من العثور على منتجات مطابقة.'
        }
      />
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 mb-6">جرّب البحث بكلمات مختلفة أو تحقق من الإملاء.</p>
          <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
