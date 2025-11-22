import React, { useState } from 'react';
import { Ruler, ArrowRightLeft } from 'lucide-react';

export default function DistanceConverter() {
  const [km, setKm] = useState('');
  const [miles, setMiles] = useState('');
  const KM_TO_MILES = 0.621371;

  const handleKmChange = (e) => {
    const val = e.target.value;
    setKm(val);
    if (val === '') {
      setMiles('');
    } else {
      setMiles((parseFloat(val) * KM_TO_MILES).toFixed(4));
    }
  };

  const handleMilesChange = (e) => {
    const val = e.target.value;
    setMiles(val);
    if (val === '') {
      setKm('');
    } else {
      setKm((parseFloat(val) / KM_TO_MILES).toFixed(4));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Ruler className="text-blue-600" /> Conversor de Distancia
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-slate-600 mb-1">Kilómetros (km)</label>
          <input
            type="number"
            value={km}
            onChange={handleKmChange}
            placeholder="0"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex justify-center text-slate-400">
          <ArrowRightLeft size={24} />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-slate-600 mb-1">Millas (mi)</label>
          <input
            type="number"
            value={miles}
            onChange={handleMilesChange}
            placeholder="0"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
          />
        </div>
      </div>
    </div>
  );
}