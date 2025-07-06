'use client';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Configuración del Sistema</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Configuración General</h2>
          <p className="text-gray-600">
            Aquí podrás configurar los parámetros del sistema StartUPC.
          </p>
        </div>
      </div>
    </div>
  );
}