
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import PaymentsPage from './pages/PaymentsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AddProductPage from './pages/AddProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import DigitalProductsPage from './pages/DigitalProductsPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { LoadingProvider } from './context/LoadingContext';
import ProgressBar from './components/ProgressBar';
import RouteChangeTracker from './components/RouteChangeTracker';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <LoadingProvider>
            <HashRouter>
              <ProgressBar />
              <RouteChangeTracker />
              <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
                <Header />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/product/:productName" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/search/:query" element={<SearchResultsPage />} />
                    <Route path="/digital-products" element={<DigitalProductsPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </HashRouter>
          </LoadingProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;