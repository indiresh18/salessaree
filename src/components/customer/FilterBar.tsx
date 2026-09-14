import React from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { FilterState, SortOption } from '../../types';

const FABRICS = ['All', 'Silk', 'Cotton', 'Linen', 'Chiffon', 'Georgette', 'Organza'];
const CATEGORIES = ['All', 'Kanchipuram', 'Banarasi', 'Party Wear', 'Traditional'];
const COLORS = ['All', 'Red', 'Pink', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Maroon', 'Gold', 'Beige'];
const PRICE_RANGES = ['All', 'Under ₹1,500', '₹1,500 - ₹3,000', '₹3,000 - ₹5,000', 'Above ₹5,000'];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Name: A - Z', value: 'name-asc' },
];

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, sortOption, setSortOption, filteredSarees } = useShop();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = 
    filters.fabric !== 'All' || 
    filters.category !== 'All' || 
    filters.color !== 'All' || 
    filters.priceRange !== 'All' || 
    filters.search !== '';

  return (
    <div className="bg-white rounded-2xl border border-brand-gold/25 p-5 shadow-card space-y-6">
      
      {/* Top Search & Results Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-brand-gold/20">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sarees by name, fabric, color..."
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/50 border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-burgundy transition-all"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-burgundy"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Counter & Sorting Dropdown */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <p className="text-xs text-brand-muted font-medium">
            Showing <span className="font-bold text-brand-burgundy">{filteredSarees.length}</span> Sarees
          </p>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold hidden sm:block" />
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value as SortOption)}
              className="bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-2 text-xs font-semibold text-brand-burgundy focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Fabric Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-2">
            Fabric
          </label>
          <select
            value={filters.fabric}
            onChange={e => handleFilterChange('fabric', e.target.value)}
            className="w-full bg-brand-cream/40 border border-brand-gold/30 rounded-xl px-3 py-2 text-xs font-medium text-brand-charcoal focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
          >
            {FABRICS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={e => handleFilterChange('category', e.target.value)}
            className="w-full bg-brand-cream/40 border border-brand-gold/30 rounded-xl px-3 py-2 text-xs font-medium text-brand-charcoal focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-2">
            Color
          </label>
          <select
            value={filters.color}
            onChange={e => handleFilterChange('color', e.target.value)}
            className="w-full bg-brand-cream/40 border border-brand-gold/30 rounded-xl px-3 py-2 text-xs font-medium text-brand-charcoal focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
          >
            {COLORS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={e => handleFilterChange('priceRange', e.target.value)}
            className="w-full bg-brand-cream/40 border border-brand-gold/30 rounded-xl px-3 py-2 text-xs font-medium text-brand-charcoal focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
          >
            {PRICE_RANGES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Filters Bar if Active */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-brand-gold/15 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-brand-muted font-medium">Active Filters:</span>
            {filters.fabric !== 'All' && (
              <span className="bg-brand-rose/10 text-brand-burgundy px-2.5 py-1 rounded-full font-medium">
                Fabric: {filters.fabric}
              </span>
            )}
            {filters.category !== 'All' && (
              <span className="bg-brand-rose/10 text-brand-burgundy px-2.5 py-1 rounded-full font-medium">
                Category: {filters.category}
              </span>
            )}
            {filters.color !== 'All' && (
              <span className="bg-brand-rose/10 text-brand-burgundy px-2.5 py-1 rounded-full font-medium">
                Color: {filters.color}
              </span>
            )}
            {filters.priceRange !== 'All' && (
              <span className="bg-brand-rose/10 text-brand-burgundy px-2.5 py-1 rounded-full font-medium">
                Price: {filters.priceRange}
              </span>
            )}
          </div>

          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-brand-rose hover:text-brand-burgundy font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
};
