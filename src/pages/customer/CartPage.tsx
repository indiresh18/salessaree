import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CartItemCard } from '../../components/customer/CartItemCard';
import { EmptyState } from '../../components/common/EmptyState';
import { formatPrice } from '../../utils/formatters';

export const CartPage: React.FC = () => {
  const { cart, cartTotal, emptyCart } = useShop();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="You haven't added any sarees to your cart yet. Explore our handcrafted collection of silk and banarasi sarees."
          actionText="Continue Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-burgundy hover:text-brand-rose transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 text-brand-gold" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-brand-burgundy">
            Your Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={emptyCart}
          className="inline-flex items-center gap-1.5 text-xs text-brand-rose hover:text-brand-burgundy font-semibold hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Cart Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <CartItemCard key={item.saree.id} item={item} />
          ))}
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-card space-y-6 sticky top-24">
          <h3 className="font-serif text-xl font-bold text-brand-burgundy border-b border-brand-gold/20 pb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-brand-charcoal/80">
              <span>Subtotal</span>
              <span className="font-bold text-brand-burgundy">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex items-center justify-between text-brand-charcoal/80">
              <span className="flex items-center gap-1">
                <span>Delivery Charge</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Free</span>
              </span>
              <span className="font-bold text-emerald-700">₹0</span>
            </div>

            <div className="pt-3 border-t border-brand-gold/20 flex items-center justify-between font-serif text-xl font-bold text-brand-burgundy">
              <span>Total Amount</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-burgundy hover:bg-brand-wine text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl border border-brand-gold/40"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-5 h-5 text-brand-gold" />
          </button>

          {/* Customer Guarantee Notes */}
          <div className="pt-4 border-t border-brand-gold/15 space-y-2 text-xs text-brand-muted">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Expected delivery: 7 days from order date</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Frontend Demo Order Simulation</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
