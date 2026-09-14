import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/formatters';
import { ConfirmModal } from '../../components/common/ConfirmModal';

export const AdminSareesPage: React.FC = () => {
  const { sarees, removeSaree } = useShop();

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const sareeToDelete = sarees.find(s => s.id === deleteTargetId);

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      removeSaree(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-gold/30 shadow-card">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-burgundy">
            Saree Catalog Management ({sarees.length})
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Add, update, or remove sarees from the customer store catalog.
          </p>
        </div>

        <Link
          to="/admin/sarees/add"
          className="inline-flex items-center justify-center gap-2 bg-brand-burgundy hover:bg-brand-wine text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md border border-brand-gold/40 transition-all"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>+ Add New Saree</span>
        </Link>
      </div>

      {/* Sarees Grid/Table */}
      <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-cream/80 text-brand-burgundy text-xs uppercase font-bold border-b border-brand-gold/25">
              <tr>
                <th className="p-4">Saree</th>
                <th className="p-4">Fabric</th>
                <th className="p-4">Category</th>
                <th className="p-4">Color</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/15">
              {sarees.map(saree => (
                <tr key={saree.id} className="hover:bg-brand-ivory/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={saree.image}
                        alt={saree.name}
                        className="w-12 h-14 rounded-xl object-cover border border-brand-gold/20 flex-shrink-0"
                      />
                      <div>
                        <Link to={`/product/${saree.id}`} target="_blank" className="font-serif font-bold text-brand-burgundy hover:text-brand-rose line-clamp-1">
                          {saree.name}
                        </Link>
                        <span className="text-[10px] text-brand-muted font-mono">{saree.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-brand-charcoal">{saree.fabric}</td>
                  <td className="p-4 text-xs text-brand-muted">{saree.category}</td>
                  <td className="p-4 text-xs font-medium text-brand-charcoal">{saree.color}</td>
                  <td className="p-4 font-serif font-bold text-brand-burgundy">{formatPrice(saree.price)}</td>
                  <td className="p-4 font-semibold">
                    {saree.stock > 0 ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200">
                        {saree.stock} in stock
                      </span>
                    ) : (
                      <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-bold border border-red-200">
                        Out of stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      to={`/admin/sarees/edit/${saree.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-burgundy hover:text-brand-rose bg-brand-lightGold/60 px-3 py-1.5 rounded-lg border border-brand-gold/30 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => setDeleteTargetId(saree.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Saree?"
        message={`Are you sure you want to delete "${sareeToDelete?.name}"? This action will remove it from the catalog permanently.`}
        confirmText="Delete Saree"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

    </div>
  );
};
