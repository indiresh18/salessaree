import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Image as ImageIcon, CheckCircle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';

const FABRICS = ['Silk', 'Cotton', 'Linen', 'Chiffon', 'Georgette', 'Organza', 'Tussar'];
const CATEGORIES = ['Kanchipuram', 'Banarasi', 'Party Wear', 'Traditional', 'Bandhani', 'Chanderi'];
const COLORS = ['Red', 'Pink', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Maroon', 'Gold', 'Beige'];

export const AdminEditSareePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sarees, editSaree } = useShop();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const existing = sarees.find(s => s.id === id);

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    fabric: 'Silk',
    category: 'Kanchipuram',
    color: 'Pink',
    description: '',
    stock: '10',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      setFormData({
        name: existing.name,
        price: String(existing.price),
        fabric: existing.fabric,
        category: existing.category,
        color: existing.color,
        description: existing.description,
        stock: String(existing.stock),
        image: existing.image
      });
      setImagePreview(existing.image);
    }
  }, [existing]);

  if (!existing) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-brand-gold/30">
        <h2 className="font-serif text-2xl font-bold text-brand-burgundy">Saree Not Found</h2>
        <button
          onClick={() => navigate('/admin/sarees')}
          className="mt-4 bg-brand-burgundy text-white px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          Back to Sarees Catalog
        </button>
      </div>
    );
  }

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = 'Saree Name is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Enter a valid price';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.stock || Number(formData.stock) < 0) errs.stock = 'Enter valid stock count';
    if (!formData.image.trim()) errs.image = 'Please upload a photo file or provide an image link';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix errors in form', 'error');
      return;
    }

    editSaree(existing.id, {
      name: formData.name.trim(),
      price: Number(formData.price),
      fabric: formData.fabric,
      category: formData.category,
      color: formData.color,
      description: formData.description.trim(),
      stock: Number(formData.stock),
      image: formData.image.trim()
    });

    navigate('/admin/sarees');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-gold/30 shadow-card flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/sarees')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-burgundy hover:text-brand-rose transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 text-brand-gold" />
            <span>Back to Saree Catalog</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-brand-burgundy">
            Edit Saree • {existing.name}
          </h1>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-card space-y-6">
        
        <div className="space-y-6">
          
          {/* PHOTO UPLOAD BOX (Direct Photo Upload) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                Saree Photo *
              </label>
              
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    uploadMode === 'file'
                      ? 'bg-brand-burgundy text-white font-bold shadow-sm'
                      : 'text-brand-muted hover:text-brand-burgundy'
                  }`}
                >
                  Upload New Photo
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    uploadMode === 'url'
                      ? 'bg-brand-burgundy text-white font-bold shadow-sm'
                      : 'text-brand-muted hover:text-brand-burgundy'
                  }`}
                >
                  Paste Photo Link
                </button>
              </div>
            </div>

            {uploadMode === 'file' ? (
              <div className="border-2 border-dashed border-brand-gold/40 hover:border-brand-gold rounded-2xl p-6 text-center bg-brand-cream/40 transition-colors">
                {imagePreview ? (
                  <div className="relative inline-block group">
                    <img
                      src={imagePreview}
                      alt="Saree Preview"
                      className="w-44 h-56 object-cover rounded-xl border-2 border-brand-gold shadow-md mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                      title="Remove Photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-bold text-emerald-700 mt-3 flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Current Photo Loaded
                    </p>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-3 py-4">
                    <div className="w-14 h-14 rounded-full bg-brand-lightGold text-brand-burgundy flex items-center justify-center border border-brand-gold shadow-sm">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-burgundy">
                        Click here to upload new photo file
                      </p>
                      <p className="text-xs text-brand-muted mt-1">
                        Supports JPG, PNG, WEBP files from your computer or phone
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="Paste saree photo URL..."
                    value={formData.image}
                    onChange={e => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                      errors.image ? 'border-red-500' : 'border-brand-gold/30'
                    }`}
                  />
                </div>
              </div>
            )}
            {errors.image && <p className="text-xs text-red-600 font-medium">{errors.image}</p>}
          </div>

          {/* Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Saree Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-brand-gold/30'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Price (₹ INR) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                  errors.price ? 'border-red-500' : 'border-brand-gold/30'
                }`}
              />
              {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Fabric, Category, Color, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Fabric *
              </label>
              <select
                value={formData.fabric}
                onChange={e => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-3 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                {FABRICS.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-3 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Color *
              </label>
              <select
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-3 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
              >
                {COLORS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                  errors.stock ? 'border-red-500' : 'border-brand-gold/30'
                }`}
              />
              {errors.stock && <p className="text-xs text-red-600 mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
              Saree Description *
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                errors.description ? 'border-red-500' : 'border-brand-gold/30'
              }`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-brand-gold/20 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand-burgundy hover:bg-brand-wine text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg border border-brand-gold/40 transition-all"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>Save Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
};
