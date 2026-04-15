import { useState, useEffect } from 'react';
import { Formulario } from './components/formulario';

// Definimos qué datos tiene cada "Carga"
interface Registro {
  id: string;
  km: number;
  litros: number;
  fecha: string;
}

function App() {
  // ESTADO: 'registros' es nuestra base de datos local.
  // Intentamos cargar lo que hay en LocalStorage para no perder datos al refrescar.
  const [registros, setRegistros] = useState<Registro[]>(() => {
    const guardados = localStorage.getItem('bitacora_consumo');
    return guardados ? JSON.parse(guardados) : [];
  });

  // ESTADO: Guardamos el cálculo final aquí para mostrarlo en pantalla.
  const [resultado, setResultado] = useState<{ km: number; litros: number; consumo: number } | null>(null);

  // EFECTO: Cada vez que cambia la lista de registros, la guardamos en la memoria del navegador.
  useEffect(() => {
    localStorage.setItem('bitacora_consumo', JSON.stringify(registros));
  }, [registros]);

  // FUNCIÓN: Crea un nuevo objeto de carga y lo pone al principio de la lista.
  const agregarNuevo = (datos: { km: number; litros: number }) => {
    const nuevo: Registro = {
      id: crypto.randomUUID(), // Generamos un ID único
      ...datos,
      fecha: new Date().toLocaleDateString()
    };
    setRegistros([nuevo, ...registros]); // Spread operator para mantener lo anterior
    setResultado(null); // Reseteamos el cálculo viejo para evitar confusiones
  };

  // FUNCIÓN: La lógica matemática del viaje completo.
  const calcularResumen = () => {
    if (registros.length < 2) {
      return alert("Necesitas al menos 2 registros para comparar distancias.");
    }

    // Ordenamos por KM para restar el mayor menos el menor correctamente
    const ordenados = [...registros].sort((a, b) => a.km - b.km);
    const kmTotales = ordenados[ordenados.length - 1].km - ordenados[0].km;
    
    // Sumamos todos los litros cargados en el viaje
    const litrosTotales = registros.reduce((acc, reg) => acc + reg.litros, 0);
    
    // Fórmula de consumo medio: (Litros / Distancia) * 100
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

        {/* Pasamos las funciones como 'props' al componente hijo */}
        <Formulario onAgregar={agregarNuevo} onFinalizar={calcularResumen} />

        {/* RENDERIZADO CONDICIONAL: Solo mostramos la tarjeta si hay un resultado calculado */}
        {resultado && (
          <div className="mt-6 p-6 bg-[#22c55e] rounded-2xl text-white shadow-lg animate-in fade-in zoom-in duration-300">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-80">resumen del viaje</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black">{resultado.km} <span className="text-xs font-normal">km</span></p>
                <p className="text-[9px] uppercase opacity-70">distancia total</p>
              </div>
              <div>
                <p className="text-2xl font-black">{resultado.litros} <span className="text-xs font-normal">l</span></p>
                <p className="text-[9px] uppercase opacity-70">total litros</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/20">
                <p className="text-4xl font-black">{resultado.consumo.toFixed(2)}</p>
                <p className="text-[10px] uppercase font-bold tracking-tighter italic">L/100km promedio</p>
              </div>
            </div>
          </div>
        )}

        {/* LISTADO DE REGISTROS: Mapeamos el array para crear la lista visual */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="space-y-3">
            {registros.map((reg, index) => (
              <div key={reg.id} className="text-[11px] text-gray-500 font-medium flex justify-between items-center bg-[#f8fafc] p-2 rounded-lg border border-gray-100">
                <span className="lowercase">carga {registros.length - index}:</span>
                <span className="text-gray-700 font-bold">
                  {reg.fecha} | {reg.km} km | {reg.litros} l
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;