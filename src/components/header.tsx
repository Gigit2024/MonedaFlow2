import { motion } from "framer-motion"
import { CurrencyExchange, Route } from "lucide-react"

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <motion.div 
        className="flex items-center justify-center gap-3 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <CurrencyExchange className="h-10 w-10 text-amber-400" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
          MonedaFlow
        </h1>
        <Route className="h-10 w-10 text-emerald-400" />
      </motion.div>
      <motion.p 
        className="text-lg text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Convierte divisas y distancias con precisión y estilo
      </motion.p>
    </motion.header>
  )
}