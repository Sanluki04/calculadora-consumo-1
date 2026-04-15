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

  // Estado para mostrar el resultado en la pantalla
  const [resultado, setResultado] = useState<{ km: number; litros: number; consumo: number } | null>(null);

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
    setResultado(null); // Limpiar cálculo al agregar nueva carga
  };

  const calcularResumen = () => {
    if (registros.length < 2) {
      return alert("necesitas al menos 2 cargas para calcular");
    }

    const ordenados = [...registros].sort((a, b) => a.km - b.km);
    const kmTotales = ordenados[ordenados.length - 1].km - ordenados[0].km;
    const litrosTotales = registros.reduce((acc, reg) => acc + reg.litros, 0);
    const consumoMedio = (litrosTotales / kmTotales) * 100;

    setResultado({
      km: kmTotales,
      litros: litrosTotales,
      consumo: consumoMedio
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-700">
      <div className="bg-white w-full max-w-md rounded-[30px] shadow-2xl p-8 border border-gray-100">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1 uppercase">
            fuel pulse
          </h1>
          <p className="text-gray-400 font-light text-[10px] uppercase tracking-[0.2em]">
            cálculo de consumo inteligente
          </p>
        </header>

        <Formulario onAgregar={agregarNuevo} onFinalizar={calcularResumen} />

        {/* --- Resultado Integrado --- */}
        {resultado && (
          <div className="mt-6 p-6 bg-[#22c55e] rounded-2xl text-white shadow-lg animate-in fade-in zoom-in duration-300">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-80">resumen del viaje</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black">{resultado.km} <span className="text-xs font-normal">km</span></p>
                <p className="text-[9px] uppercase opacity-70">distancia</p>
              </div>
              <div>
                <p className="text-2xl font-black">{resultado.litros} <span className="text-xs font-normal">l</span></p>
                <p className="text-[9px] uppercase opacity-70">total combustible</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/20">
                <p className="text-4xl font-black">{resultado.consumo.toFixed(2)}</p>
                <p className="text-[10px] uppercase font-bold tracking-tighter italic">litros cada 100 km</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="space-y-3">
            {registros.length === 0 ? (
              <p className="text-center text-gray-400 text-sm italic">no hay registros aún.</p>
            ) : (
              registros.map((reg, index) => (
                <div key={reg.id} className="text-[11px] text-gray-500 font-medium flex justify-between items-center bg-[#f8fafc] p-2 rounded-lg border border-gray-100">
                  <span className="lowercase">carga {registros.length - index}:</span>
                  <span className="text-gray-700 font-bold italic">
                    {reg.fecha} | {reg.km} km | {reg.litros} l
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;