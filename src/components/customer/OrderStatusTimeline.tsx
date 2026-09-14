import React from 'react';
import { Check, Clock, PackageCheck, Truck, MapPin, XCircle } from 'lucide-react';
import { OrderStatusType } from '../../types';

interface OrderStatusTimelineProps {
  status: OrderStatusType;
}

const STEPS: { label: OrderStatusType; icon: React.FC<{ className?: string }> }[] = [
  { label: 'Order Placed', icon: Clock },
  { label: 'Confirmed', icon: PackageCheck },
  { label: 'Shipped', icon: Truck },
  { label: 'Out for Delivery', icon: MapPin },
  { label: 'Delivered', icon: Check },
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ status }) => {
  if (status === 'Cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
        <XCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-bold text-sm">Order Cancelled</p>
          <p className="text-xs text-red-600">This order has been cancelled by customer or boutique administration.</p>
        </div>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex(s => s.label === status);

  return (
    <div className="py-4">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-5 left-8 right-8 h-1 bg-gray-200 -z-0">
          <div
            className="h-full bg-brand-gold transition-all duration-500 rounded-full"
            style={{
              width: `${(Math.max(0, currentStepIndex) / (STEPS.length - 1)) * 100}%`
            }}
          />
        </div>

        {STEPS.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.label} className="relative z-10 flex md:flex-col items-center gap-3 md:gap-2 flex-1">
              {/* Icon Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-brand-burgundy border-brand-gold text-brand-gold'
                    : 'bg-white border-gray-300 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-brand-gold/30 scale-110' : ''}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Step Label */}
              <div className="text-left md:text-center">
                <p className={`text-xs font-bold ${isCompleted ? 'text-brand-burgundy' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="inline-block text-[10px] font-semibold text-brand-rose bg-brand-lightPink px-2 py-0.5 rounded-full mt-0.5">
                    Current Status
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
