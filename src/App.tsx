import { useState, useEffect } from 'react';
import { Formulario } from './components/formulario';

interface Registro {
  id: string;
  km: number;
  litros: number;
  fecha: string;
}

function App() {
  const [registros, setRegistros] = useState<Registro[]>(() => {
    const guardados = localStorage.getItem('bitacora_consumo');
    return guardados ? JSON.parse(guardados) : [];
  });

  // Guardar en LocalStorage automáticamente cuando cambien los registros
  useEffect(() => {
    localStorage.setItem('bitacora_consumo', JSON.stringify(registros));
  }, [registros]);

  const agregarNuevo = (datos: { km: number; litros: number }) => {
    const nuevo: Registro = {
      id: crypto.randomUUID(),
      ...datos,
      fecha: new Date().toLocaleDateString()
    };
    setRegistros([nuevo, ...registros]);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8 text-blue-800">⛽ Bitácora de Consumo</h1>
      
      <Formulario onAgregar={agregarNuevo} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">KM</th>
              <th className="p-3">Litros</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((reg) => (
              <tr key={reg.id} className="border-t">
                <td className="p-3">{reg.fecha}</td>
                <td className="p-3">{reg.km}</td>
                <td className="p-3">{reg.litros}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {registros.length === 0 && (
          <p className="p-4 text-center text-gray-500">No hay registros aún.</p>
        )}
      </div>
    </main>
  );
}

export default App;