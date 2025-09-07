import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts, Review, Product } from '../context/ProductContext';

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Previous</title>
        <path d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Next</title>
        <path d="M9 5l7 7-7 7" />
    </svg>
);

const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <title>Add to Wishlist</title>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const StarIcon: React.FC<{ className?: string, isFilled: boolean }> = ({ className, isFilled }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <title>Star</title>
            <polygon 
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" 
            />
        </svg>
    );
};


const StarRating: React.FC<{ rating: number; onRatingChange?: (rating: number) => void; interactive?: boolean; }> = ({ rating, onRatingChange, interactive }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className={`flex ${interactive ? 'cursor-pointer' : ''}`} dir="ltr">
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => interactive && onRatingChange && onRatingChange(star)}
                >
                    <StarIcon 
                        className={`w-6 h-6 ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'hover:scale-110 transition-transform' : ''}`}
                        isFilled={(hoverRating || rating) >= star}
                    />
                </div>
            ))}
        </div>
    );
};


const ProductDetailPage: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();
  const decodedProductName = productName ? decodeURIComponent(productName) : '';
  
  const { products, addReview } = useProducts();
  const product = products.find(p => p.name === decodedProductName);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [newReview, setNewReview] = useState({ reviewerName: '', rating: 0, comment: '' });
  const [reviewError, setReviewError] = useState('');

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">لم يتم العثور على المنتج</h1>
        <p className="mt-4 text-gray-600">عذرًا، المنتج الذي تبحث عنه غير موجود.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    );
  }
  
  const isWishlisted = isInWishlist(product.name);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product as Product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product as Product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? product.imageUrls.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === product.imageUrls.length - 1 ? 0 : prev + 1));
  };
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({...prev, rating}));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.reviewerName || !newReview.comment || newReview.rating === 0) {
      setReviewError('يرجى ملء جميع الحقول وتقييم المنتج.');
      return;
    }
    const reviewToAdd: Review = {
        reviewerName: newReview.reviewerName,
        rating: newReview.rating,
        comment: newReview.comment,
    };
    addReview(product.name, reviewToAdd);
    setNewReview({ reviewerName: '', rating: 0, comment: '' });
    setReviewError('');
  };
  
  const hasMultipleImages = product.imageUrls && product.imageUrls.length > 1;
  const imageUrl = (product.imageUrls && product.imageUrls.length > 0) ? product.imageUrls[currentImageIndex] : 'https://picsum.photos/seed/placeholder/800/600';

  return (
    <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image Gallery */}
        <div>
          <div className="relative">
            <img 
              src={imageUrl}
              alt={`${product.name} - image ${currentImageIndex + 1}`} 
              className="w-full h-auto object-cover rounded-lg shadow-md aspect-square"
            />
            {hasMultipleImages && (
              <>
                <button onClick={handlePrevImage} className="absolute top-1/2 end-2 transform -translate-y-1/2 bg-white/60 hover:bg-white/90 rounded-full p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Previous Image">
                  <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                </button>
                <button onClick={handleNextImage} className="absolute top-1/2 start-2 transform -translate-y-1/2 bg-white/60 hover:bg-white/90 rounded-full p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Next Image">
                  <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                </button>
              </>
            )}
          </div>
          {hasMultipleImages && (
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {product.imageUrls.map((url, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md">
                  <img 
                    src={url} 
                    alt={`Thumbnail ${index + 1}`} 
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${currentImageIndex === index ? 'border-indigo-500 scale-110' : 'border-transparent hover:border-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Product Details */}
        <div className="flex flex-col text-right">
            <div className="text-right">
                <div className="flex items-center justify-end gap-3">
                    {product.discountPrice && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-1 rounded-full">خصم</span>
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                </div>
            </div>
          
          <div className="mt-4 flex items-baseline justify-end gap-3">
            {product.discountPrice ? (
              <>
                <p className="text-3xl font-bold text-indigo-600">
                  {product.discountPrice.toLocaleString('ar-EG')} ج.م
                </p>
                <p className="text-xl text-gray-500 line-through">
                  {product.price.toLocaleString('ar-EG')} ج.م
                </p>
              </>
            ) : (
              <p className="text-3xl font-bold text-indigo-600">
                {product.price.toLocaleString('ar-EG')} ج.م
              </p>
            )}
          </div>

          <div className="mt-6 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">الوصف</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          
          {(product.brand || product.sku) && (
            <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">المواصفات</h2>
                <div className="text-gray-600 space-y-2">
                    {product.brand && <p><strong>العلامة التجارية:</strong> {product.brand}</p>}
                    {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                </div>
            </div>
          )}

          <div className="mt-auto pt-6 flex flex-col sm:flex-row-reverse gap-3">
             <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full text-white font-bold py-4 px-8 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 flex-grow ${
                isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isAdded ? 'تمت الإضافة بنجاح!' : 'أضف إلى السلة'}
            </button>
            <button
                onClick={handleWishlistToggle}
                className={`w-full sm:w-auto p-4 rounded-lg text-lg transition-colors duration-300 border-2 flex items-center justify-center ${
                    isWishlisted 
                    ? 'bg-red-50 border-red-500 text-red-500 hover:bg-red-100' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
                <HeartIcon className="w-7 h-7" isFilled={isWishlisted} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 text-right mb-6">آراء العملاء</h2>
        
        {/* Existing Reviews */}
        <div className="space-y-6 mb-8 text-right">
            {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border-r-4 border-indigo-200">
                        <div className="flex items-center justify-between">
                            <StarRating rating={review.rating} />
                            <h3 className="font-semibold text-gray-800">{review.reviewerName}</h3>
                        </div>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">لا توجد تقييمات لهذا المنتج حتى الآن. كن أول من يكتب تقييماً!</p>
            )}
        </div>
        
        {/* Add Review Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 text-right mb-4">أضف تقييمك</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4 text-right">
                <div>
                    <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700">الاسم</label>
                    <input 
                        type="text" 
                        id="reviewerName" 
                        name="reviewerName"
                        value={newReview.reviewerName}
                        onChange={handleReviewChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التقييم</label>
                    <div className="flex justify-end">
                        <StarRating rating={newReview.rating} onRatingChange={handleRatingChange} interactive={true} />
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">تعليقك</label>
                    <textarea 
                        id="comment" 
                        name="comment" 
                        rows={4}
                        value={newReview.comment}
                        onChange={handleReviewChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}
                <div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                        إرسال التقييم
                    </button>
                </div>
            </form>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
