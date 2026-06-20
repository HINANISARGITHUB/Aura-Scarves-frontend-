import { useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

const CATEGORIES = ['Casual', 'Formal', 'Occasion', 'Bridal',' Printed', 'Plan']
const OCCASIONS = ['Daily', 'Wedding', 'Office', 'Party', 'Religious','University','Business Meeting']
const FABRICS = ['Chiffon', 'Jersey', 'Silk', 'Cotton', 'Satin', 'Crepe', 'Linen']

export default function StyleForm({ initialData = {}, onSubmit, submitLabel = 'Save Style', loading = false }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'Casual',
    fabric: initialData.fabric || 'Chiffon',
    occasion: initialData.occasion || 'Daily',
    price: initialData.price || '',
    featured: initialData.featured || false,
  })
  const [imageFiles, setImageFiles] = useState([])
  const [existingImages, setExistingImages] = useState(initialData.images || [])
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(prev => [...prev, ...files].slice(0, 5))
  }

  const removeNewImage = (i) => setImageFiles(prev => prev.filter((_, idx) => idx !== i))
  const removeExistingImage = (i) => setExistingImages(prev => prev.filter((_, idx) => idx !== i))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.price) { setError('Title and price are required'); return }
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    imageFiles.forEach(f => fd.append('images', f))
    existingImages.forEach(url => fd.append('existingImages', url))
    try {
      await onSubmit(fd)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 font-body text-xs">{error}</div>}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} className="input-field" placeholder="e.g. Classic Chiffon Drape" required />
        </div>

        <div className="md:col-span-2">
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4}
            placeholder="Describe the style, how to wear it, what makes it special..."
            className="w-full bg-transparent border border-aura-light p-4 font-body text-sm text-aura-dark placeholder-aura-muted outline-none focus:border-aura-accent transition-colors resize-none" />
        </div>

        <div>
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Category</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full bg-transparent border border-aura-light px-4 py-3 font-body text-sm text-aura-dark outline-none focus:border-aura-accent transition-colors">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Fabric</label>
          <select name="fabric" value={form.fabric} onChange={handleChange}
            className="w-full bg-transparent border border-aura-light px-4 py-3 font-body text-sm text-aura-dark outline-none focus:border-aura-accent transition-colors">
            {FABRICS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div>
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Occasion</label>
          <select name="occasion" value={form.occasion} onChange={handleChange}
            className="w-full bg-transparent border border-aura-light px-4 py-3 font-body text-sm text-aura-dark outline-none focus:border-aura-accent transition-colors">
            {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div>
          <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-2">Price (PKR) *</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" className="input-field" placeholder="e.g. 2500" required />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange}
            className="w-4 h-4 accent-aura-accent" />
          <label htmlFor="featured" className="font-body text-sm text-aura-dark cursor-pointer">Feature this style on homepage</label>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="font-body text-[10px] tracking-[0.25em] uppercase text-aura-muted block mb-4">Images (max 5)</label>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-4">
            {existingImages.map((url, i) => (
              <div key={i} className="relative w-20 h-24">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeExistingImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-400 text-white rounded-full flex items-center justify-center">
                  <FiX size={10} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New image previews */}
        {imageFiles.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-4">
            {imageFiles.map((file, i) => (
              <div key={i} className="relative w-20 h-24">
                <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeNewImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-400 text-white rounded-full flex items-center justify-center">
                  <FiX size={10} />
                </button>
              </div>
            ))}
          </div>
        )}

        {(existingImages.length + imageFiles.length) < 5 && (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-aura-light cursor-pointer hover:border-aura-accent transition-colors bg-aura-bg3">
            <FiUpload size={20} className="text-aura-muted mb-2" />
            <span className="font-body text-xs text-aura-muted tracking-wide">Click to upload images</span>
            <span className="font-body text-[10px] text-aura-muted mt-1">PNG, JPG up to 5MB each</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
          </label>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60 flex items-center gap-2">
        {loading && <span className="w-4 h-4 border-2 border-aura-bg border-t-transparent rounded-full animate-spin" />}
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
