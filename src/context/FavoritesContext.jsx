import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) fetchFavorites()
    else setFavorites([])
  }, [user])

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('/api/favorites')
      setFavorites(data.favorites || [])
    } catch {}
  }

  const toggleFavorite = async (styleId) => {
    const isFav = favorites.some(f => f._id === styleId || f === styleId)
    if (isFav) {
      await axios.delete(`/api/favorites/${styleId}`)
      setFavorites(prev => prev.filter(f => (f._id || f) !== styleId))
    } else {
      await axios.post(`/api/favorites/${styleId}`)
      setFavorites(prev => [...prev, styleId])
    }
  }

  const isFavorite = (styleId) => {
    return favorites.some(f => (f._id || f) === styleId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
