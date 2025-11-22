import React from 'react';
import { Activity, DollarSign, Ruler } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-lg mb-6 relative z-10">
      
      {/* Contenedor de la animación de billetes */}
      <div className="bill-container">
        {/* Dólar */}
        <span id="bill-1" className="bill-icon" role="img" aria-label="Dólar">💵</span>
        {/* Euro */}
        <span id="bill-2" className="bill-icon" role="img" aria-label="Euro">💶</span>
        {/* Peso Chileno (No hay emoji específico, usamos un billete general que se asemeja) */}
        <span id="bill-3" className="bill-icon" role="img" aria-label="Peso Chileno">💷</span> 
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative z-20">
        <div className="flex items-center gap-4"> 
          <Activity className="text-emerald-400 text-4xl" /> {/* Icono de la aplicación */}
          {/* Aplicamos la clase CSS para el estilo futurista */}
          <h1 className="monedaflow-title text-5xl">MonedaFlow</h1> 
        </div>
        <nav className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('currency')}
            className={`nav-button flex items-center gap-2 px-5 py-3 rounded-lg transition-all text-sm sm:text-base ${
              activeTab === 'currency' ? 'bg-emerald-600 text-white active' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <DollarSign size={20} /> Monedas
          </button>
          <button
            onClick={() => setActiveTab('distance')}
            className={`nav-button flex items-center gap-2 px-5 py-3 rounded-lg transition-all text-sm sm:text-base ${
              activeTab === 'distance' ? 'bg-blue-600 text-white active' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Ruler size={20} /> Distancia
          </button>
        </nav>
      </div>
    </header>
  );
}