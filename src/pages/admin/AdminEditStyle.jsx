import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios'
import StyleForm from '../../components/admin/StyleForm'

export default function AdminEditStyle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [style, setStyle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => { fetchStyle() }, [id])

  const fetchStyle = async () => {
    try {
      const { data } = await axios.get(`/api/styles/${id}`)
      setStyle(data.style)
    } catch { navigate('/admin/styles') }
    finally { setFetching(false) }
  }

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await axios.put(`/api/styles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/admin/styles')
    } finally { setLoading(false) }
  }

  if (fetching) return (
    <div className="pt-20 min-h-screen bg-aura-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-aura-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        <Link to="/admin/styles" className="flex items-center gap-2 text-aura-muted hover:text-aura-dark transition-colors font-body text-xs tracking-wide mb-8">
          <FiArrowLeft size={14} /> Back to Styles
        </Link>
        <div className="mb-10">
          <p className="section-subtitle mb-2">Admin</p>
          <h1 className="section-title">Edit Style</h1>
          <div className="divider ml-0" />
        </div>
        <div className="bg-aura-bg3 p-8">
          {style && <StyleForm initialData={style} onSubmit={handleSubmit} submitLabel="Update Style" loading={loading} />}
        </div>
      </div>
    </div>
  )
}
