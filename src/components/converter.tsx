'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CurrencyExchange, Route, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function Converter() {
  const [currencyAmount, setCurrencyAmount] = useState('')
  const [currencyResult, setCurrencyResult] = useState('')
  const [distanceAmount, setDistanceAmount] = useState('')
  const [distanceResult, setDistanceResult] = useState('')
  const [isConverting, setIsConverting] = useState(false)

  const handleCurrencyConvert = async () => {
    setIsConverting(true)
    // Simulación de conversión
    setTimeout(() => {
      setCurrencyResult('0.86 EUR')
      setIsConverting(false)
    }, 800)
  }

  const handleDistanceConvert = async () => {
    setIsConverting(true)
    // Simulación de conversión
    setTimeout(() => {
      setDistanceResult('0.62 mi')
      setIsConverting(false)
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Currency Converter */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-300">
              <CurrencyExchange className="h-6 w-6" />
              Conversor de Divisas
            </CardTitle>
            <CardDescription className="text-amber-100">
              Convierte entre diferentes monedas al tipo de cambio actual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-100">Monto</label>
                <Input
                  type="number"
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-100">De</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - Dólar Americano</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - Libra Esterlina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-100">A</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="EUR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="usd">USD - Dólar Americano</SelectItem>
                    <SelectItem value="gbp">GBP - Libra Esterlina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleCurrencyConvert}
              disabled={isConverting || !currencyAmount}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2.5 rounded-md transition-all duration-300"
            >
              {isConverting ? 'Convirtiendo...' : 'Convertir Divisa'}
            </Button>
            
            {currencyResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-amber-900/30 rounded-md border border-amber-700/50 text-center"
              >
                <p className="text-amber-100">Resultado:</p>
                <p className="text-2xl font-bold text-amber-300">{currencyResult}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Distance Converter */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-300">
              <Route className="h-6 w-6" />
              Conversor de Distancia
            </CardTitle>
            <CardDescription className="text-emerald-100">
              Convierte entre diferentes unidades de medida de distancia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-100">Distancia</label>
                <Input
                  type="number"
                  value={distanceAmount}
                  onChange={(e) => setDistanceAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-100">De</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Kilómetros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilómetros</SelectItem>
                    <SelectItem value="mi">Millas</SelectItem>
                    <SelectItem value="m">Metros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-100">A</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Millas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mi">Millas</SelectItem>
                    <SelectItem value="km">Kilómetros</SelectItem>
                    <SelectItem value="m">Metros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleDistanceConvert}
              disabled={isConverting || !distanceAmount}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-2.5 rounded-md transition-all duration-300"
            >
              {isConverting ? 'Convirtiendo...' : 'Convertir Distancia'}
            </Button>
            
            {distanceResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-emerald-900/30 rounded-md border border-emerald-700/50 text-center"
              >
                <p className="text-emerald-100">Resultado:</p>
                <p className="text-2xl font-bold text-emerald-300">{distanceResult}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}