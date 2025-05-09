import { useState } from 'react';

export default function SeedDatabase() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const seedDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed-db', { 
        method: 'POST'
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-8">Database Seeder</h1>
      
      <button 
        onClick={seedDatabase}
        disabled={loading}
        className={`px-4 py-2 rounded-md ${loading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} transition duration-200`}
      >
        {loading ? 'Seeding...' : 'Seed Database with data.json'}
      </button>
      
      {result && (
        <div className="mt-8 bg-gray-800 p-4 rounded-md max-w-lg">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 