import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useShop();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-gold/20 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 border border-brand-gold/40 shadow-sm group-hover:border-brand-gold transition-colors">
              <img
                src="/logo.jpg"
                alt="ONLY WOMEN Logo"
                className="w-12 h-12 rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-brand-burgundy uppercase">
                  ONLY WOMEN
                </span>
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand-gold -mt-1">
                Since 2026
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors tracking-wide relative py-1 ${
                isActive('/') ? 'text-brand-burgundy font-semibold' : 'text-brand-charcoal/80 hover:text-brand-burgundy'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
              )}
            </Link>

            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors tracking-wide relative py-1 ${
                isActive('/shop') ? 'text-brand-burgundy font-semibold' : 'text-brand-charcoal/80 hover:text-brand-burgundy'
              }`}
            >
              Shop Sarees
              {isActive('/shop') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
              )}
            </Link>

            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors tracking-wide relative py-1 ${
                isActive('/orders') ? 'text-brand-burgundy font-semibold' : 'text-brand-charcoal/80 hover:text-brand-burgundy'
              }`}
            >
              My Orders
              {isActive('/orders') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
              )}
            </Link>
          </nav>

          {/* Action Items: Cart & Admin Gateway Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              title="Owner Admin Gateway"
              className="hidden lg:flex items-center gap-1.5 text-xs text-brand-burgundy/70 hover:text-brand-burgundy bg-brand-lightGold/50 px-3 py-1.5 rounded-full border border-brand-gold/30 hover:border-brand-gold transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Owner Access</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 text-brand-burgundy hover:text-brand-wine rounded-full hover:bg-brand-rose/10 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-rose text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-ivory shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-burgundy hover:bg-brand-rose/10 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-ivory border-b border-brand-gold/20 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${
              isActive('/') ? 'text-brand-burgundy font-bold border-l-4 border-brand-gold pl-3' : 'text-brand-charcoal hover:text-brand-burgundy'
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${
              isActive('/shop') ? 'text-brand-burgundy font-bold border-l-4 border-brand-gold pl-3' : 'text-brand-charcoal hover:text-brand-burgundy'
            }`}
          >
            Shop Sarees
          </Link>
          <Link
            to="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-base font-medium ${
              isActive('/orders') ? 'text-brand-burgundy font-bold border-l-4 border-brand-gold pl-3' : 'text-brand-charcoal hover:text-brand-burgundy'
            }`}
          >
            My Orders
          </Link>
          <div className="pt-2 border-t border-brand-gold/20">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-brand-burgundy bg-brand-lightGold/60 px-4 py-2.5 rounded-lg border border-brand-gold/40 font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Owner Access Area (/admin)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
