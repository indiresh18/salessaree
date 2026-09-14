import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-brand-ivory rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-gold/30 space-y-4 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-burgundy">{title}</h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-brand-muted hover:text-brand-burgundy p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-brand-charcoal/80 leading-relaxed pl-1">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-brand-charcoal hover:bg-brand-cream border border-gray-300 rounded-xl transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-md transition-all ${
              type === 'danger'
                ? 'bg-red-700 hover:bg-red-800'
                : 'bg-brand-burgundy hover:bg-brand-wine'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
