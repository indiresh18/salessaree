import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Upload, Image as ImageIcon, CheckCircle, X, Plus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';
import { FALLBACK_SAREE_IMAGE } from '../../data/sampleSarees';

const FABRICS = ['Silk', 'Cotton', 'Linen', 'Chiffon', 'Georgette', 'Organza', 'Tussar'];
const DEFAULT_CATEGORIES = ['Kanchipuram', 'Banarasi', 'Party Wear', 'Traditional', 'Bandhani', 'Chanderi'];
const COLORS = ['Red', 'Pink', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Maroon', 'Gold', 'Beige'];

export const AdminAddSareePage: React.FC = () => {
  const { sarees, addNewSaree } = useShop();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const categoryOptions = useMemo(() => {
    const list = Array.from(new Set([...DEFAULT_CATEGORIES, ...sarees.map(s => s.category)]));
    return list;
  }, [sarees]);

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
    if (isCustomCategory && !customCategory.trim()) errs.category = 'Saree type name is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.stock || Number(formData.stock) < 0) errs.stock = 'Enter valid stock count';
    if (!formData.image.trim()) errs.image = 'Please upload a saree photo or provide a photo URL';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please upload a saree photo and complete all required fields', 'error');
      return;
    }

    const finalCategory = isCustomCategory ? customCategory.trim() : formData.category;

    addNewSaree({
      name: formData.name.trim(),
      price: Number(formData.price),
      fabric: formData.fabric,
      category: finalCategory,
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
            Add New Saree to Catalog
          </h1>
        </div>
      </div>

      {/* Add Saree Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-card space-y-6">
        
        <div className="space-y-6">
          
          {/* PHOTO UPLOAD BOX (Primary Feature) */}
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
                  Upload Photo File
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
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Photo Uploaded Successfully
                    </p>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-3 py-4">
                    <div className="w-14 h-14 rounded-full bg-brand-lightGold text-brand-burgundy flex items-center justify-center border border-brand-gold shadow-sm">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-burgundy">
                        Click here to upload saree photo
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
                    placeholder="Paste saree photo URL (e.g. https://images.unsplash.com/...)"
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
                {formData.image && (
                  <div className="flex items-center gap-3 bg-brand-cream p-2.5 rounded-xl border border-brand-gold/20">
                    <img
                      src={formData.image}
                      alt="Preview"
                      onError={e => (e.currentTarget.src = FALLBACK_SAREE_IMAGE)}
                      className="w-12 h-16 object-cover rounded-lg border border-brand-gold/30"
                    />
                    <span className="text-xs font-semibold text-brand-burgundy">Live Image Link Preview</span>
                  </div>
                )}
              </div>
            )}
            {errors.image && <p className="text-xs text-red-600 font-medium">{errors.image}</p>}
          </div>

          {/* Name & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy mb-1">
                Saree Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Crimson Red Banarasi Silk Saree"
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
                placeholder="3499"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                  errors.price ? 'border-red-500' : 'border-brand-gold/30'
                }`}
              />
              {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Fabric, Category, Color, Stock Grid */}
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                  Saree Type *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCategory(!isCustomCategory);
                    if (isCustomCategory) {
                      setCustomCategory('');
                    }
                  }}
                  className="text-[11px] font-bold text-brand-burgundy hover:text-brand-wine underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3 text-brand-gold" />
                  {isCustomCategory ? 'Select Existing' : 'New Saree Type'}
                </button>
              </div>

              {isCustomCategory ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter new saree type (e.g. Patola)"
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    className={`w-full px-3 py-3 bg-brand-cream/50 border rounded-xl text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                      errors.category ? 'border-red-500' : 'border-brand-gold/30'
                    }`}
                  />
                  {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                </div>
              ) : (
                <select
                  value={formData.category}
                  onChange={e => {
                    if (e.target.value === '__ADD_NEW__') {
                      setIsCustomCategory(true);
                      setCustomCategory('');
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full bg-brand-cream/50 border border-brand-gold/30 rounded-xl px-3 py-3 text-xs font-bold text-brand-burgundy focus:ring-2 focus:ring-brand-gold cursor-pointer"
                >
                  {categoryOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="__ADD_NEW__" className="font-bold text-brand-burgundy">
                    + Add New Saree Type...
                  </option>
                </select>
              )}
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
                placeholder="10"
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
              placeholder="Describe the weave, zari work, pallu details, and occasion suitability..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 bg-brand-cream/50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-gold focus:outline-none ${
                errors.description ? 'border-red-500' : 'border-brand-gold/30'
              }`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-brand-gold/20 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand-burgundy hover:bg-brand-wine text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg border border-brand-gold/40 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            <span>Add Saree to Catalog</span>
          </button>
        </div>

      </form>
    </div>
  );
};
