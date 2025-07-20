'use client';

import { useState, useEffect } from 'react';

type TestResults = {
  success: boolean;
  totalCount?: number;
  rawQuery?: unknown[];
  prismaQuery?: unknown[];
  message?: string;
  error?: string;
  details?: unknown;
};

type Convocatoria = {
  id: string;
  title: string;
  status: string;
  principal: boolean;
  deadline: string;
  type: string;
  createdAt?: string;
};

export default function DebugPage() {
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error('Error testing database:', error);
      setTestResults({ success: false, error: 'Failed to test database' });
    } finally {
      setLoading(false);
    }
  };

  const testConvocatorias = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/convocatorias');
      const data = await response.json();
      setConvocatorias(data);
      console.log('Convocatorias API response:', data);
    } catch (error) {
      console.error('Error fetching convocatorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTestConvocatoria = async () => {
    setLoading(true);
    try {
      const testData = {
        title: 'Test Convocatoria ' + Date.now(),
        deadline: '2024-12-31',
        type: 'Startup',
        cronograma: [
          { title: 'Inicio', desde: '2024-01-01', hasta: '2024-01-15', status: 'ACTIVO' }
        ]
      };

      const response = await fetch('/api/convocatorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      console.log('Create result:', result);
      
      // Refresh the list
      await testConvocatorias();
    } catch (error) {
      console.error('Error creating test convocatoria:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testDatabase();
    testConvocatorias();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug del Sistema</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Acciones</h2>
          <div className="space-x-4">
            <button 
              onClick={testDatabase}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Test Database
            </button>
            <button 
              onClick={testConvocatorias}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Test Convocatorias API
            </button>
            <button 
              onClick={createTestConvocatoria}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Create Test Convocatoria
            </button>
          </div>
        </div>

        {testResults && (
          <div className="border p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Database Test Results</h2>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}

        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Convocatorias ({convocatorias.length})</h2>
          {convocatorias.length === 0 ? (
            <p className="text-gray-500">No hay convocatorias</p>
          ) : (
            <div className="space-y-2">
              {convocatorias.map((conv, index) => (
                <div key={conv.id || index} className="bg-gray-50 p-2 rounded">
                  <div className="font-medium">{conv.title}</div>
                  <div className="text-sm text-gray-600">
                    Status: {conv.status} | Principal: {conv.principal ? 'Sí' : 'No'}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {conv.id} | Deadline: {conv.deadline}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
