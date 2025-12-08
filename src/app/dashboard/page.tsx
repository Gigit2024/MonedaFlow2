import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Financiero</h1>
        <Link href="/" className="btn btn-primary">
          Volver al Inicio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Balance Total</h3>
          <p className="text-3xl font-bold text-gray-800">$5,420.75</p>
          <p className="text-sm text-green-600 mt-1">+2.5% desde el mes pasado</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Ingresos</h3>
          <p className="text-3xl font-bold text-green-600">$3,200.00</p>
          <p className="text-sm text-gray-500 mt-1">Este mes</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Gastos</h3>
          <p className="text-3xl font-bold text-red-600">$1,845.25</p>
          <p className="text-sm text-gray-500 mt-1">Este mes</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Últimas Transacciones</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Supermercado</p>
              <p className="text-sm text-gray-500">Hoy, 10:30 AM</p>
            </div>
            <p className="font-medium text-red-600">-$85.20</p>
          </div>
          
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Salario</p>
              <p className="text-sm text-gray-500">Ayer, 9:00 AM</p>
            </div>
            <p className="font-medium text-green-600">+$1,500.00</p>
          </div>
          
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Restaurante</p>
              <p className="text-sm text-gray-500">Ayer, 7:30 PM</p>
            </div>
            <p className="font-medium text-red-600">-$42.50</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Progreso de Metas</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Vacaciones</span>
                <span className="text-gray-900">$1,200 / $3,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Fondo de emergencia</span>
                <span className="text-gray-900">$4,500 / $6,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Categorías de Gastos</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-600 flex-grow">Comida</span>
              <span className="text-gray-900">$450</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-600 flex-grow">Transporte</span>
              <span className="text-gray-900">$220</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-600 flex-grow">Entretenimiento</span>
              <span className="text-gray-900">$180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}