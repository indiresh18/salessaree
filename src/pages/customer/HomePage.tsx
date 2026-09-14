import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../../components/customer/ProductCard';

export const HomePage: React.FC = () => {
  const { sarees } = useShop();

  // Pick top 6 featured sarees for home display
  const featuredSarees = sarees.slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-cream to-brand-lightGold/20 border-b border-brand-gold/30 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-brand-ivory px-4 py-1.5 rounded-full border border-brand-gold/40 shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-burgundy">
                  ONLY WOMEN • SINCE 2026
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-burgundy leading-[1.15]">
                Elegant Sarees for Every Occasion
              </h1>

              <p className="text-base sm:text-lg text-brand-charcoal/80 max-w-2xl leading-relaxed font-sans">
                Discover timeless Indian elegance through our carefully curated saree collection. Crafted with authentic silk weaves, rich zari brocades, and modern grace.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-burgundy hover:bg-brand-wine text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-lg hover:shadow-xl border border-brand-gold/40 group"
                >
                  <span>Shop Sarees</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-brand-gold" />
                </Link>

                <a
                  href="#collection"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-ivory hover:bg-brand-cream text-brand-burgundy px-8 py-4 rounded-xl text-base font-semibold border border-brand-gold/50 transition-all shadow-sm hover:shadow-md"
                >
                  <span>Explore Collection</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-8 border-t border-brand-gold/20 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-xl font-bold text-brand-burgundy">100%</p>
                  <p className="text-xs text-brand-muted font-medium">Authentic Weaves</p>
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-brand-burgundy">7 Days</p>
                  <p className="text-xs text-brand-muted font-medium">Guaranteed Delivery</p>
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-brand-burgundy">Free</p>
                  <p className="text-xs text-brand-muted font-medium">Shipping Across India</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/30 via-brand-rose/20 to-transparent rounded-3xl blur-xl" />
                
                <div className="relative bg-white rounded-3xl p-3 shadow-2xl border border-brand-gold/40 overflow-hidden">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
                      alt="Featured Saree"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-brand-ivory/95 backdrop-blur-md p-4 rounded-xl border border-brand-gold/40 shadow-lg">
                      <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">Spotlight Saree</p>
                      <h4 className="font-serif text-base font-bold text-brand-burgundy">Pink Kanchipuram Pure Silk</h4>
                      <p className="text-xs text-brand-muted mt-0.5">Handcrafted Zari Brocade • ₹3,499</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED SAREE COLLECTION SECTION */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-lightGold/50 px-3 py-1 rounded-full border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" /> Handpicked Selections
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy">
            Discover Our Sarees
          </h2>
          <p className="text-sm text-brand-charcoal/70 max-w-xl mx-auto font-sans">
            Timeless elegance, crafted for every occasion. Explore our finest silk, banarasi, and party wear sarees.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSarees.map(saree => (
            <ProductCard key={saree.id} saree={saree} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-ivory hover:bg-brand-cream text-brand-burgundy px-8 py-3.5 rounded-xl border border-brand-gold font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>Browse All {sarees.length} Sarees</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>
      </section>

      {/* LUXURY BRAND FEATURES SECTION */}
      <section className="bg-brand-cream/60 border-y border-brand-gold/25 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 bg-white rounded-2xl border border-brand-gold/20 shadow-card space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-lightGold text-brand-burgundy mx-auto flex items-center justify-center border border-brand-gold">
                <Award className="w-6 h-6 text-brand-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-burgundy">Pure Handloom Quality</h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                Every saree in our collection is handpicked from master weavers across Kanchipuram, Banaras, and Bengal.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-brand-gold/20 shadow-card space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-lightPink text-brand-rose mx-auto flex items-center justify-center border border-brand-rose/30">
                <Truck className="w-6 h-6 text-brand-rose" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-burgundy">7-Day Express Delivery</h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                Every order comes with guaranteed delivery within 7 days with live status timeline tracking.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-brand-gold/20 shadow-card space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-lightGold text-brand-burgundy mx-auto flex items-center justify-center border border-brand-gold">
                <ShieldCheck className="w-6 h-6 text-brand-burgundy" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-burgundy">Direct Owner Support</h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                Curated and managed exclusively by ONLY WOMEN owner administration with high attention to detail.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
