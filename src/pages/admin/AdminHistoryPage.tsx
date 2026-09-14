import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, Eye, Filter, ArrowUpDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatDate } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/formatters';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminHistoryPage: React.FC = () => {
  const { orders } = useShop();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Delivered' | 'Cancelled' | 'In Progress'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        o =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.includes(q) ||
          o.customer.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      if (statusFilter === 'In Progress') {
        result = result.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
      } else {
        result = result.filter(o => o.status === statusFilter);
      }
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.orderedAt).getTime() - new Date(b.orderedAt).getTime());
        break;
      case 'highest':
        result.sort((a, b) => b.total - a.total);
        break;
      case 'lowest':
        result.sort((a, b) => a.total - b.total);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
        break;
    }

    return result;
  }, [orders, search, statusFilter, sortBy]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-gold/30 shadow-card">
        <h1 className="font-serif text-3xl font-bold text-brand-burgundy">Order History Log</h1>
        <p className="text-xs text-brand-muted mt-1">
          Search and review all historical and fulfilled customer orders.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-brand-gold/30 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, customer name, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/50 border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
            >
              <option value="All">All Statuses ({orders.length})</option>
              <option value="Delivered">Delivered Only</option>
              <option value="Cancelled">Cancelled Only</option>
              <option value="In Progress">In Progress Only</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="highest">Sort: Highest Amount</option>
              <option value="lowest">Sort: Lowest Amount</option>
            </select>
          </div>

        </div>
      </div>

      {/* Orders Table or Empty State */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-cream/80 text-brand-burgundy text-xs uppercase font-bold border-b border-brand-gold/25">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Items Count</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Order Date</th>
                  <th className="p-4">Delivery Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/15">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-brand-ivory/60 transition-colors">
                    <td className="p-4 font-serif font-bold text-brand-burgundy">{order.id}</td>
                    <td className="p-4 font-semibold text-brand-charcoal">{order.customer.name}</td>
                    <td className="p-4 text-xs text-brand-muted">{order.customer.phone}</td>
                    <td className="p-4 text-xs font-medium text-brand-charcoal">{order.items.length} Saree(s)</td>
                    <td className="p-4 font-serif font-bold text-brand-burgundy">{formatPrice(order.total)}</td>
                    <td className="p-4 text-xs text-brand-muted">{formatDate(order.orderedAt)}</td>
                    <td className="p-4 text-xs font-medium text-emerald-700">{formatDate(order.expectedDelivery)}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-900 border border-red-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-burgundy hover:text-brand-rose bg-brand-lightGold/60 px-3 py-1.5 rounded-lg border border-brand-gold/30 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={History}
          title="No Orders Match Criteria"
          description="There are no completed or historical orders matching your search or status filter."
          actionText="Clear Search & Filters"
          onActionClick={() => {
            setSearch('');
            setStatusFilter('All');
            setSortBy('newest');
          }}
        />
      )}

    </div>
  );
};
