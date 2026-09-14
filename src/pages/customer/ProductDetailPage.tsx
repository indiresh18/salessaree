import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/formatters';
import { EmptyState } from '../../components/common/EmptyState';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sarees, addItemToCart } = useShop();

  const [quantity, setQuantity] = useState(1);

  const saree = sarees.find(s => s.id === id);

  if (!saree) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Saree Not Found"
          description="The saree product you are looking for does not exist or has been removed from our catalog."
          actionText="Back to Shop"
          actionLink="/shop"
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItemToCart(saree, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-burgundy hover:text-brand-rose transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-brand-gold" />
        <span>Back to Collections</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-brand-gold/30 shadow-card">
        
        {/* Left Column: Saree Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-cream border border-brand-gold/20 shadow-md">
            <img
              src={saree.image}
              alt={saree.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-4 left-4 bg-brand-ivory/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-burgundy border border-brand-gold/30 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{saree.category}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Saree Specs & Purchase */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Title & Price */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                ONLY WOMEN BOUTIQUE
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy mt-1">
                {saree.name}
              </h1>
              <p className="font-serif text-2xl font-bold text-brand-burgundy mt-3">
                {formatPrice(saree.price)}
              </p>
            </div>

            {/* Saree Specs Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-brand-cream/60 rounded-2xl border border-brand-gold/20 text-center">
              <div>
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Fabric</p>
                <p className="font-serif font-bold text-sm text-brand-burgundy mt-0.5">{saree.fabric}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Category</p>
                <p className="font-serif font-bold text-sm text-brand-burgundy mt-0.5">{saree.category}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Color</p>
                <p className="font-serif font-bold text-sm text-brand-burgundy mt-0.5">{saree.color}</p>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-brand-muted">Availability:</span>
              {saree.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  In Stock ({saree.stock} available)
                </span>
              ) : (
                <span className="text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 border-t border-brand-gold/15">
              <h3 className="font-serif font-bold text-base text-brand-burgundy">
                Saree Description
              </h3>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed font-sans">
                {saree.description}
              </p>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart Action */}
          <div className="space-y-4 pt-4 border-t border-brand-gold/20">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                Quantity:
              </label>
              
              <div className="flex items-center gap-2 bg-brand-cream border border-brand-gold/30 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-brand-burgundy flex items-center justify-center shadow-sm hover:bg-brand-lightPink"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-brand-burgundy">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(saree.stock, quantity + 1))}
                  disabled={quantity >= saree.stock}
                  className="w-8 h-8 rounded-lg bg-white text-brand-burgundy flex items-center justify-center shadow-sm hover:bg-brand-lightPink disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={saree.stock <= 0}
              className="w-full inline-flex items-center justify-center gap-3 bg-brand-burgundy hover:bg-brand-wine text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl border border-brand-gold/40 disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <span>Add to Cart</span>
            </button>

            {/* Guarantee Trust Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs text-brand-charcoal/80 pt-2">
              <div className="flex items-center gap-2 bg-brand-ivory p-2.5 rounded-xl border border-brand-gold/20">
                <Truck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Free 7-Day India Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-brand-ivory p-2.5 rounded-xl border border-brand-gold/20">
                <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Authentic Weave Assured</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
