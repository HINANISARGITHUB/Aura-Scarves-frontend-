import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi'
import axios from 'axios'

const STATUS_CONFIG = {
  pending:   { icon: FiClock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending' },
  confirmed: { icon: FiCheckCircle, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Confirmed' },
  shipped:   { icon: FiTruck, color: 'text-aura-accent', bg: 'bg-aura-accent/10', label: 'Shipped' },
  delivered: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
  cancelled: { icon: FiXCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/my-orders')
      setOrders(data.orders || [])
    } catch {} finally { setLoading(false) }
  }

  return (
    <div className="pt-20 min-h-screen bg-aura-bg">
      <div className="bg-aura-bg3 py-16 px-6 text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle mb-3">Order History</p>
          <h1 className="section-title">My Orders</h1>
          <div className="divider" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => <div key={i} className="h-40 animate-pulse bg-aura-bg3" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-6">
            <FiPackage size={48} className="text-aura-light" />
            <h2 className="font-display text-3xl text-aura-dark font-light">No orders yet</h2>
            <p className="font-body text-sm text-aura-muted">Your placed orders will appear here</p>
            <Link to="/styles" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => {
              const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
              const StatusIcon = statusInfo.icon
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-aura-bg3 p-6"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-aura-light">
                    <div>
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-aura-muted mb-1">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="font-body text-xs text-aura-muted">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 font-body text-[10px] tracking-widest uppercase ${statusInfo.bg} ${statusInfo.color}`}>
                      <StatusIcon size={12} /> {statusInfo.label}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-14 h-16 bg-aura-bg overflow-hidden shrink-0">
                          {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-sm text-aura-dark">{item.title}</p>
                          <p className="font-body text-xs text-aura-muted">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-display text-base text-aura-accent">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-aura-light">
                    <p className="font-body text-xs text-aura-muted">
                      Delivery to: {order.shippingInfo?.city}
                    </p>
                    <p className="font-display text-xl text-aura-dark">
                      Total: PKR {order.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}