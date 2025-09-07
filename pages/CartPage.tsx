import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SectionTitle from '../components/SectionTitle';

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();

  const handleCheckout = () => {
    alert('سيتم توجيهك إلى صفحة الدفع! (هذه الميزة قيد التطوير)');
  };

  if (cartCount === 0) {
    return (
      <div className="text-center py-20">
        <SectionTitle title="سلتك فارغة" />
        <p className="mt-4 text-gray-600">يبدو أنك لم تقم بإضافة أي منتجات بعد.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle title="سلة التسوق" subtitle={`لديك ${cartCount} منتج في سلتك`} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          {cartItems.map(item => {
            const itemPrice = item.discountPrice ?? item.price;
            return (
              <div key={item.name} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center space-s-4">
                  <img src={item.imageUrls?.[0] || 'https://picsum.photos/seed/placeholder/200/200'} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex items-baseline justify-start gap-2">
                      <p className="font-semibold">{itemPrice.toLocaleString('ar-EG')} ج.م</p>
                      {item.discountPrice && (
                        <p className="text-sm text-gray-400 line-through">{item.price.toLocaleString('ar-EG')} ج.م</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-s-4">
                   <div className="flex items-center border rounded-md">
                      <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-md" aria-label={`Increase quantity of ${item.name}`}>+</button>
                      <input 
                          type="number"
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.name, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-x"
                          aria-label={`Quantity for ${item.name}`}
                      />
                      <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-md" aria-label={`Decrease quantity of ${item.name}`}>-</button>
                   </div>
                   <p className="w-24 text-center font-bold">{(itemPrice * item.quantity).toLocaleString('ar-EG')} ج.م</p>
                  <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:text-red-700" aria-label={`Remove ${item.name} from cart`}>
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-2xl font-bold border-b pb-4">ملخص الطلب</h3>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span>المجموع الفرعي</span>
              <span>{totalPrice.toLocaleString('ar-EG')} ج.م</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>المجموع الإجمالي</span>
              <span>{totalPrice.toLocaleString('ar-EG')} ج.م</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              المتابعة للدفع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;