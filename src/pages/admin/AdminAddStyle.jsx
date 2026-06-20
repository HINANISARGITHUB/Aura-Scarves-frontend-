import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios'
import StyleForm from '../../components/admin/StyleForm'

export default function AdminAddStyle() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await axios.post('/api/styles', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/admin/styles')
    } finally { setLoading(false) }
  }

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        <Link to="/admin/styles" className="flex items-center gap-2 text-aura-muted hover:text-aura-dark transition-colors font-body text-xs tracking-wide mb-8">
          <FiArrowLeft size={14} /> Back to Styles
        </Link>
        <div className="mb-10">
          <p className="section-subtitle mb-2">Admin</p>
          <h1 className="section-title">Add New Style</h1>
          <div className="divider ml-0" />
        </div>
        <div className="bg-aura-bg3 p-8">
          <StyleForm onSubmit={handleSubmit} submitLabel="Add Style" loading={loading} />
        </div>
      </div>
    </div>
  )
}
