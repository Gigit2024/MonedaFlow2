import React, { useState } from 'react';
// Importamos los componentes desde su carpeta
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import DistanceConverter from './components/DistanceConverter';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('currency');

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-10">
      {/* Pasamos el estado al Header para que los botones funcionen */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-4">
        {/* Renderizado Condicional: Si activeTab es 'currency' mostramos uno, si no, el otro */}
        {activeTab === 'currency' ? <CurrencyConverter /> : <DistanceConverter />}
      </main>
    </div>
  );
}

export default App;