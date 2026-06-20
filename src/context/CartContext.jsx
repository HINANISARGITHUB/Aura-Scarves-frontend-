import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (user) fetchCart()
    else setCartItems([])
  }, [user])

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0))
  }, [cartItems])

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/cart')
      setCartItems(data.items || [])
    } catch {}
  }

  const addToCart = async (styleId, quantity = 1) => {
    const { data } = await axios.post('/api/cart/add', { styleId, quantity })
    setCartItems(data.items)
  }

  const removeFromCart = async (styleId) => {
    const { data } = await axios.delete(`/api/cart/remove/${styleId}`)
    setCartItems(data.items)
  }

  const updateQuantity = async (styleId, quantity) => {
    const { data } = await axios.put('/api/cart/update', { styleId, quantity })
    setCartItems(data.items)
  }

  const clearCart = async () => {
    await axios.delete('/api/cart/clear')
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + (item.style?.price || 0) * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
