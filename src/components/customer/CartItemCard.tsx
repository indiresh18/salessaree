import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useShop } from '../../context/ShopContext';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { changeCartQuantity, removeItemFromCart } = useShop();
  const { saree, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-brand-gold/20 shadow-card hover:border-brand-gold/40 transition-all">
      
      {/* Saree Info & Thumbnail */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to={`/product/${saree.id}`} className="relative w-20 h-24 rounded-xl overflow-hidden bg-brand-cream border border-brand-gold/20 flex-shrink-0">
          <img
            src={saree.image}
            alt={saree.name}
            className="w-full h-full object-cover"
          />
        </Link>

        <div>
          <Link to={`/product/${saree.id}`} className="font-serif font-bold text-brand-burgundy hover:text-brand-rose line-clamp-1 text-base">
            {saree.name}
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
            <span>{saree.fabric}</span>
            <span>•</span>
            <span>{saree.color}</span>
            <span>•</span>
            <span className="font-semibold text-brand-burgundy">{formatPrice(saree.price)} each</span>
          </div>

          <p className="text-[11px] text-emerald-700 font-medium mt-1">In Stock</p>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-gold/15">
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-brand-cream border border-brand-gold/30 rounded-xl p-1">
          <button
            onClick={() => changeCartQuantity(saree.id, quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white hover:bg-brand-lightPink text-brand-burgundy flex items-center justify-center transition-colors shadow-sm"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span className="w-8 text-center text-sm font-bold text-brand-burgundy">
            {quantity}
          </span>
          
          <button
            onClick={() => changeCartQuantity(saree.id, quantity + 1)}
            disabled={quantity >= saree.stock}
            className="w-7 h-7 rounded-lg bg-white hover:bg-brand-lightPink text-brand-burgundy flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="text-right min-w-[90px]">
          <p className="text-[10px] uppercase text-brand-muted font-bold tracking-wider">Item Total</p>
          <p className="font-serif font-bold text-lg text-brand-burgundy">
            {formatPrice(saree.price * quantity)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItemFromCart(saree.id)}
          className="p-2 text-brand-muted hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Remove from cart"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
