import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts, Product } from '../context/ProductContext';

// Icons
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    // FIX: Corrected the malformed viewBox attribute from '0 0 24" 24"' to '0 0 24 24'.
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Search</title>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Wishlist</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Shopping Cart</title>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Menu</title>
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Close menu</title>
        <path d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { products } = useProducts();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            setShowSuggestions(false);
            return;
        }

        const filteredProducts = products
            .filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5); // Limit suggestions

        setSearchResults(filteredProducts);
        setShowSuggestions(true);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
            setSearchQuery('');
            if(isMenuOpen) setIsMenuOpen(false);
            searchInputRef.current?.blur();
        }
    };
    
    const handleSuggestionClick = () => {
        setShowSuggestions(false);
        setSearchQuery('');
        if(isMenuOpen) setIsMenuOpen(false);
    };

    const handleSearchIconClick = (e: React.MouseEvent) => {
        // When the search bar is empty, clicking the icon focuses the input
        // instead of submitting the form.
        if (!searchQuery.trim()) {
            e.preventDefault();
            searchInputRef.current?.focus();
        }
    };

    const navLinkClasses = "text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium";
    const activeNavLinkClasses = "text-indigo-600 font-bold";

    const renderSearchForm = () => (
        <form onSubmit={handleSearchSubmit} className="relative w-full" ref={searchContainerRef}>
            <input
                ref={searchInputRef}
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchResults.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full ps-4 pe-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
                type="submit" 
                className="absolute inset-y-0 end-0 flex items-center pe-3" 
                aria-label="Search"
                onClick={handleSearchIconClick}
            >
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </button>
            {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-30 overflow-hidden">
                    <ul>
                        {searchResults.map(product => (
                            <li key={product.name}>
                                <Link
                                    to={`/product/${encodeURIComponent(product.name)}`}
                                    onClick={handleSuggestionClick}
                                    className="flex items-center p-3 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-cover rounded-md ms-4" />
                                    <div className="flex-grow text-right">
                                        <p className="font-semibold text-gray-800">{product.name}</p>
                                        <p className="text-sm text-indigo-600">
                                          {(product.discountPrice ?? product.price).toLocaleString('ar-EG')} ج.م
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to={`/search/${encodeURIComponent(searchQuery.trim())}`}
                        onClick={handleSuggestionClick}
                        className="block w-full text-center py-2 bg-gray-50 hover:bg-gray-200 text-sm font-semibold text-indigo-600 transition-colors"
                    >
                        عرض كل النتائج
                    </Link>
                </div>
            )}
        </form>
    );

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-indigo-600">
                        متجر SR
                    </Link>

                    {/* Desktop Navigation & Search */}
                    <div className="hidden lg:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                             <NavLink to="/" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>الرئيسية</NavLink>
                             <NavLink to="/pricing" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>جميع المنتجات</NavLink>
                             <NavLink to="/digital-products" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>المنتجات الرقمية</NavLink>
                             <NavLink to="/add-product" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>إضافة منتج</NavLink>
                             <NavLink to="/services" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>خدماتنا</NavLink>
                             <NavLink to="/about" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>من نحن</NavLink>
                             <NavLink to="/contact" className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>اتصل بنا</NavLink>
                        </nav>
                        <div className={`transition-all duration-300 ease-in-out ${isSearchFocused ? 'w-80' : 'w-64'}`}>
                            {renderSearchForm()}
                        </div>
                    </div>
                    
                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <Link to="/wishlist" className="relative text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Wishlist">
                            <HeartIcon className="w-7 h-7" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -start-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Cart">
                            <ShoppingCartIcon className="w-7 h-7" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -start-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600" aria-label="Open menu">
                                {isMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
                         <div className="px-2">
                             {renderSearchForm()}
                         </div>
                        <nav className="flex flex-col items-center space-y-3 pt-2">
                            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>الرئيسية</NavLink>
                            <NavLink to="/pricing" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>جميع المنتجات</NavLink>
                            <NavLink to="/digital-products" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>المنتجات الرقمية</NavLink>
                            <NavLink to="/add-product" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>إضافة منتج</NavLink>
                            <NavLink to="/services" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>خدماتنا</NavLink>
                            <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>من نحن</NavLink>
                            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>اتصل بنا</NavLink>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;