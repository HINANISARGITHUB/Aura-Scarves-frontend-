import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1529139574466-a303027614b8?w=200&q=70'

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart()

  if (cartItems.length === 0) return (
    <div className="pt-20 min-h-screen bg-aura-bg flex flex-col items-center justify-center gap-6 px-6">
      <FiShoppingBag size={48} className="text-aura-light" />
      <h2 className="font-display text-3xl text-aura-dark font-light">Your cart is empty</h2>
      <p className="font-body text-sm text-aura-muted">Discover our beautiful collection of hijab styles</p>
      <Link to="/styles" className="btn-primary">Explore Styles</Link>
    </div>
  )

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-10">
          <p className="section-subtitle mb-3">Your Selection</p>
          <h1 className="section-title">Shopping Cart</h1>
          <div className="divider ml-0" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item._id || item.style?._id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-5 pb-6 border-b border-aura-light"
                >
                  <Link to={`/styles/${item.style?._id}`} className="shrink-0 w-24 h-32 bg-aura-bg3 overflow-hidden">
                    <img src={item.style?.images?.[0] || PLACEHOLDER} alt={item.style?.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <Link to={`/styles/${item.style?._id}`} className="font-display text-lg text-aura-dark hover:text-aura-accent transition-colors">
                        {item.style?.title}
                      </Link>
                      <button onClick={() => removeFromCart(item.style?._id)} className="text-aura-muted hover:text-red-400 transition-colors ml-4">
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                    <p className="font-body text-xs text-aura-muted mb-1 tracking-wide">{item.style?.category} · {item.style?.fabric}</p>
                    <p className="font-display text-xl text-aura-accent mb-4">PKR {item.style?.price?.toLocaleString()}</p>
                    <div className="flex items-center border border-aura-light w-fit">
                      <button onClick={() => updateQuantity(item.style?._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-aura-dark hover:bg-aura-bg3 transition-colors disabled:opacity-30">
                        <FiMinus size={12} />
                      </button>
                      <span className="w-10 text-center font-body text-sm text-aura-dark">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.style?._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-aura-dark hover:bg-aura-bg3 transition-colors">
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-start">
                    <p className="font-display text-xl text-aura-dark">
                      PKR {((item.style?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-aura-bg3 p-8 sticky top-24">
              <h3 className="font-display text-2xl text-aura-dark mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-aura-light">
                {cartItems.map(item => (
                  <div key={item.style?._id} className="flex justify-between font-body text-xs text-aura-muted">
                    <span>{item.style?.title} × {item.quantity}</span>
                    <span>PKR {((item.style?.price || 0) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-body text-xs text-aura-muted tracking-wide">Subtotal</span>
                <span className="font-body text-sm text-aura-dark">PKR {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-6 pb-6 border-b border-aura-light">
                <span className="font-body text-xs text-aura-muted tracking-wide">Shipping</span>
                <span className="font-body text-xs text-aura-accent">Calculated at checkout</span>
              </div>
              <div className="flex justify-between mb-8">
                <span className="font-body text-sm font-medium text-aura-dark tracking-wide">Total</span>
                <span className="font-display text-2xl text-aura-dark">PKR {cartTotal.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn-primary block text-center">Proceed to Checkout</Link>
              <Link to="/styles" className="btn-outline block text-center mt-3">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
