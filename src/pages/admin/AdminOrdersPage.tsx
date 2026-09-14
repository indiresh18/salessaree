import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { OrderStatusType } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/formatters';
import { EmptyState } from '../../components/common/EmptyState';

const STATUS_OPTIONS: OrderStatusType[] = [
  'Order Placed',
  'Confirmed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

export const AdminOrdersPage: React.FC = () => {
  const { orders, changeOrderStatus } = useShop();

  // Filter pending orders (not Delivered or Cancelled)
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-gold/30 shadow-card">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-burgundy">Pending Orders ({pendingOrders.length})</h1>
          <p className="text-xs text-brand-muted mt-1">
            Orders currently in progress awaiting owner confirmation or shipment.
          </p>
        </div>

        <Link
          to="/admin/history"
          className="inline-flex items-center gap-2 bg-brand-lightGold text-brand-burgundy hover:bg-brand-gold/40 px-5 py-2.5 rounded-xl font-bold text-xs border border-brand-gold transition-all"
        >
          <span>View Order History</span>
          <ArrowRight className="w-4 h-4 text-brand-burgundy" />
        </Link>
      </div>

      {/* Pending Orders List */}
      {pendingOrders.length > 0 ? (
        <div className="space-y-6">
          {pendingOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-brand-gold/30 shadow-card space-y-6 hover:border-brand-gold/60 transition-all"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-brand-gold/20">
                <div>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">ORDER REFERENCE</span>
                  <h3 className="font-serif text-2xl font-bold text-brand-burgundy">{order.id}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-brand-charcoal/80">
                  <div>
                    <span className="text-brand-muted block font-medium">Customer</span>
                    <span className="font-bold text-brand-burgundy">{order.customer.name}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block font-medium">Ordered Date</span>
                    <span className="font-bold text-brand-charcoal">{formatDate(order.orderedAt)}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block font-medium">Expected Delivery</span>
                    <span className="font-bold text-emerald-700">{formatDate(order.expectedDelivery)}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted block font-medium">Total Amount</span>
                    <span className="font-serif text-base font-bold text-brand-burgundy">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Items Summary & Status Control */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Items Left */}
                <div className="md:col-span-7 space-y-2">
                  <p className="text-xs font-bold text-brand-burgundy uppercase tracking-wider">
                    Purchased Sarees ({order.items.length})
                  </p>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.saree.id} className="flex items-center gap-3 text-xs bg-brand-cream/40 p-2 rounded-xl border border-brand-gold/15">
                        <img src={item.saree.image} alt={item.saree.name} className="w-10 h-12 rounded-md object-cover" />
                        <div>
                          <p className="font-bold text-brand-burgundy font-serif">{item.saree.name}</p>
                          <p className="text-brand-muted">{item.saree.fabric} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Dropdown Right */}
                <div className="md:col-span-5 bg-brand-lightGold/40 p-4 rounded-2xl border border-brand-gold/30 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                    Update Order Status
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={e => changeOrderStatus(order.id, e.target.value as OrderStatusType)}
                      className="flex-1 bg-white border border-brand-gold/40 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
                    >
                      {STATUS_OPTIONS.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>

                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 bg-brand-burgundy hover:bg-brand-wine text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-brand-gold/40 shadow-sm transition-all"
                    >
                      <Eye className="w-4 h-4 text-brand-gold" />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Clock}
          title="All Orders Up to Date!"
          description="There are currently no pending orders requiring fulfillment. All customer orders are delivered or cancelled."
          actionText="View Order History"
          actionLink="/admin/history"
        />
      )}

    </div>
  );
};
