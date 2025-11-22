import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, Save } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  
  const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

  useEffect(() => {
    fetchData();
  }, [fromCurrency]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}${fromCurrency}`);
      const data = await res.json();
      setCurrencies(Object.keys(data.rates));
      setExchangeRate(data.rates[toCurrency]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cuando cambia la divisa 'toCurrency', se recalcula la tasa.
    if (fromCurrency && currencies.length > 0) {
        fetch(`${API_URL}${fromCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [toCurrency]);

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : '...';

  // Modal para guardar la conversión (reemplaza alert)
  const [showModal, setShowModal] = useState(false);

  const handleSaveConversion = async () => {
    // En lugar de alert, mostramos un modal
    setShowModal(true);
    // Ocultar el modal después de 3 segundos
    setTimeout(() => setShowModal(false), 3000);
  };
  
  // FUNCIÓN: Intercambiar divisas
  const swapCurrencies = () => {
    // Al intercambiar, también actualizamos el exchangeRate para el nuevo par
    const newFrom = toCurrency;
    const newTo = fromCurrency;
    setFromCurrency(newFrom);
    setToCurrency(newTo);
    // Dado que fromCurrency cambió, el primer useEffect se disparará automáticamente.
  };

  return (
    <div className="relative">
      {/* Modal de confirmación (reemplazo de alert) */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center pt-20 z-50 pointer-events-none">
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-top-10">
            Conversión guardada: {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
        </div>
      )}

      {/* Añado padding horizontal para asegurar que no se pegue a los bordes en móvil */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-lg mx-auto px-4 sm:px-6"> 
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <RefreshCw className="text-emerald-600" /> Cambio de Divisas
        </h2>

        {loading ? (
          <div className="text-center py-10 text-slate-500">Cargando tasas...</div>
        ) : (
          <div className="space-y-4">
            {/* Casilla de Cantidad */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Cantidad a Cambiar</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-5 text-xl border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              />
            </div>

            {/* Selector de Divisas - CENTRALIZADO DEBAJO DE LA CASILLA DE CANTIDAD */}
            {/* La rejilla con 1fr auto 1fr asegura que los selectores usen el espacio disponible,
                mientras el botón de intercambio se centra con el 'auto'. */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                {/* De Divisa */}
              <div className='flex flex-col items-center'>
                <label className="block text-xs font-medium text-slate-500 mb-1">De</label>
                <select 
                    value={fromCurrency} 
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="p-5 text-xl border border-slate-300 rounded-lg bg-white w-full text-center" 
                >
                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* BOTÓN DE INTERCAMBIO (ACTIVO Y FUNCIONANDO) - CENTRALIZADO */}
              <button 
                onClick={swapCurrencies} 
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors shadow-md mt-6"
                aria-label="Intercambiar divisas"
              >
                <ArrowRightLeft size={20} className="text-slate-600" />
              </button>
              
              {/* A Divisa */}
              <div className='flex flex-col items-center'>
                <label className="block text-xs font-medium text-slate-500 mb-1">A</label>
                <select 
                    value={toCurrency} 
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="p-5 text-xl border border-slate-300 rounded-lg bg-white w-full text-center"
                >
                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Casilla de Resultado - MISMO TAMAÑO Y CENTRALIZADO */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-slate-600 mb-1">Resultado de la Conversión</label>
                <div 
                    // Clases para que se vea IGUAL que el input de cantidad
                    className="w-full p-5 text-xl border border-slate-300 rounded-lg outline-none bg-emerald-50 flex justify-between items-center" 
                >
                    <span className="font-bold text-emerald-700">{convertedAmount}</span> 
                    <span className="text-lg font-normal text-emerald-600">{toCurrency}</span>
                </div>
            </div>

            <button 
              onClick={handleSaveConversion}
              className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
            >
              <Save size={18} /> Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}