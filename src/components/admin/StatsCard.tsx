import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'burgundy' | 'gold' | 'rose' | 'emerald' | 'blue' | 'amber';
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'burgundy',
  subtitle
}) => {
  const colorMap = {
    burgundy: 'bg-brand-burgundy text-white border-brand-gold/40',
    gold: 'bg-brand-lightGold text-brand-burgundy border-brand-gold',
    rose: 'bg-brand-lightPink text-brand-burgundy border-brand-rose/40',
    emerald: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    blue: 'bg-blue-50 text-blue-900 border-blue-300',
    amber: 'bg-amber-50 text-amber-900 border-amber-300'
  };

  const iconBgMap = {
    burgundy: 'bg-white/20 text-brand-gold',
    gold: 'bg-brand-gold text-brand-burgundy',
    rose: 'bg-brand-rose text-white',
    emerald: 'bg-emerald-600 text-white',
    blue: 'bg-blue-600 text-white',
    amber: 'bg-amber-600 text-white'
  };

  return (
    <div className={`p-5 rounded-2xl border shadow-card transition-all hover:shadow-lg ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">{title}</p>
          <h3 className="font-serif text-2xl font-bold mt-1">{value}</h3>
          {subtitle && <p className="text-[11px] mt-1 opacity-70">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-2xl shadow-sm ${iconBgMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
