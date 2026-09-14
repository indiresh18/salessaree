import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Saree } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useShop } from '../../context/ShopContext';
import { FALLBACK_SAREE_IMAGE } from '../../data/sampleSarees';

interface ProductCardProps {
  saree: Saree;
}

export const ProductCard: React.FC<ProductCardProps> = ({ saree }) => {
  const { addItemToCart } = useShop();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_SAREE_IMAGE;
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image & Quick View Link */}
      <Link to={`/product/${saree.id}`} className="block relative aspect-[3/4] overflow-hidden bg-brand-cream/50">
        <img
          src={saree.image || FALLBACK_SAREE_IMAGE}
          alt={saree.name}
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Fabric & Category Badge */}
        <div className="absolute top-3 left-3 bg-brand-ivory/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-brand-burgundy border border-brand-gold/30 shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-gold" />
          <span>{saree.fabric}</span>
        </div>

        {/* Stock Badge */}
        {saree.stock <= 3 && saree.stock > 0 && (
          <div className="absolute top-3 right-3 bg-amber-500/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Only {saree.stock} left
          </div>
        )}

        {/* Hover overlay button */}
        <div className="absolute inset-0 bg-brand-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-brand-ivory/95 text-brand-burgundy text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-brand-gold/40 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-brand-muted mb-1.5 font-medium">
            <span>{saree.category}</span>
            <span className="flex items-center gap-1">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300" 
                style={{ backgroundColor: getColorHex(saree.color) }}
              />
              {saree.color}
            </span>
          </div>

          <Link to={`/product/${saree.id}`} className="block">
            <h3 className="font-serif text-base font-bold text-brand-burgundy hover:text-brand-rose line-clamp-1 transition-colors">
              {saree.name}
            </h3>
          </Link>

          <p className="text-xs text-brand-charcoal/70 line-clamp-2 mt-1 font-sans">
            {saree.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-gold/15 flex items-center justify-between">
          <div>
            <p className="text-xs text-brand-muted">Price</p>
            <p className="font-serif text-lg font-bold text-brand-burgundy">
              {formatPrice(saree.price)}
            </p>
          </div>

          <button
            onClick={() => addItemToCart(saree)}
            className="inline-flex items-center gap-2 bg-brand-burgundy hover:bg-brand-wine text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-brand-gold/30"
          >
            <ShoppingBag className="w-4 h-4 text-brand-gold" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for color indicator dot
function getColorHex(colorName: string): string {
  const map: Record<string, string> = {
    Red: '#DC2626',
    Pink: '#EC4899',
    Blue: '#2563EB',
    Green: '#059669',
    Yellow: '#EAB308',
    Black: '#18181B',
    White: '#F4F4F5',
    Purple: '#7C3AED',
    Maroon: '#800000',
    Gold: '#D4AF37',
    Beige: '#F5F5DC'
  };
  return map[colorName] || '#9CA3AF';
}
