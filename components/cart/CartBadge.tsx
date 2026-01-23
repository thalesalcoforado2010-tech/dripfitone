'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartContext'

export function CartBadge() {
  const { count, isReady } = useCart()

  if (!isReady) return null

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="cart-badge"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 22,
            delay: 0.05,
          }}
          className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-medium text-white"
        >
          {count}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
