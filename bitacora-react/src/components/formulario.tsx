import { useState } from 'react';

interface Props {
  onAgregar: (datos: { km: number; litros: number }) => void;
}

export const Formulario = ({ onAgregar }: Props) => {
  const [km, setKm] = useState('');
  const [litros, setLitros] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!km || !litros) return alert("Completa los campos");
    
    onAgregar({ km: Number(km), litros: Number(litros) });
    setKm('');
    setLitros('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col gap-4">
        <input 
          type="number" 
          placeholder="Kilometraje actual" 
          value={km}
          onChange={(e) => setKm(e.target.value)}
          className="border p-2 rounded"
        />
        <input 
          type="number" 
          placeholder="Litros cargados" 
          value={litros}
          onChange={(e) => setLitros(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Registrar Carga
        </button>
      </div>
    </form>
  );
};