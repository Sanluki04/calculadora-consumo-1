import { useState } from 'react';

interface Props {
  onAgregar: (datos: { km: number; litros: number }) => void;
  onFinalizar: () => void; 
}

export const Formulario = ({ onAgregar, onFinalizar }: Props) => {
  const [km, setKm] = useState('');
  const [litros, setLitros] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!km || !litros) return alert("completa los campos");
    onAgregar({ km: Number(km), litros: Number(litros) });
    setKm('');
    setLitros('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-1 text-left">
        <label className="text-[10px] font-bold text-[#22c55e] uppercase ml-1 tracking-wider">
          kilómetros actuales
        </label>
        <input 
          type="number" placeholder="0.0" value={km}
          onChange={(e) => setKm(e.target.value)}
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-[#22c55e] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1 text-left">
        <label className="text-[10px] font-bold text-[#22c55e] uppercase ml-1 tracking-wider">
          litros cargados
        </label>
        <input 
          type="number" placeholder="0.0" value={litros}
          onChange={(e) => setLitros(e.target.value)}
          className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-[#22c55e] transition-all"
        />
      </div>

      <div className="pt-4 space-y-3">
        <button type="submit" className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-md active:scale-95">
          agregar carga
        </button>
        
        <button 
          type="button" 
          onClick={onFinalizar}
          className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-md active:scale-95 text-xs opacity-90"
        >
          finalizar viaje y calcular
        </button>
      </div>
    </form>
  );
};