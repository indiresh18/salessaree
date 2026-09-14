import React from 'react';
import { LucideIcon, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShoppingBag,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16 bg-brand-ivory/60 border border-brand-gold/20 rounded-2xl my-6">
      <div className="w-16 h-16 rounded-full bg-brand-lightPink flex items-center justify-center text-brand-burgundy mb-4 border border-brand-gold/30 shadow-sm">
        <Icon className="w-8 h-8 text-brand-wine" />
      </div>

      <h3 className="font-serif text-xl font-bold text-brand-burgundy mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-brand-charcoal/70 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 bg-brand-burgundy text-brand-ivory hover:bg-brand-wine px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg border border-brand-gold/40"
        >
          {actionText}
        </Link>
      )}

      {actionText && !actionLink && onActionClick && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 bg-brand-burgundy text-brand-ivory hover:bg-brand-wine px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg border border-brand-gold/40"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
