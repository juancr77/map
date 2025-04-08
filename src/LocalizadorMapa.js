import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Añade este CSS para arreglar el z-index
const selectStyles = {
  control: (provided) => ({
    ...provided,
    zIndex: 1000, // Asegura que el Select esté sobre el mapa
    position: 'relative', // Necesario para que z-index funcione
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000, // Asegura que el menú desplegable también esté arriba
  })
};

const center = [25.4452, -100.8466];

const locales = [
  { value: [25.4452, -100.8466], label: 'Centro de Arteaga' },
  { value: [25.4568, -100.8321], label: 'Mirador de la Sierra' },
  { value: [25.4315, -100.8612], label: 'Rancho El Fresno' },
  { value: [25.4673, -100.8789], label: 'Bosques de Arteaga' },
  { value: [25.4237, -100.8204], label: 'Valle de las Flores' },
  { value: [25.4821, -100.8143], label: 'Cerro de las Mitras' },
  { value: [25.4086, -100.8917], label: 'Presa de la Angostura' },
  { value: [25.4390, -100.9015], label: 'Cabañas del Bosque' },
];

const LocalizadorMapa = () => {
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const newMap = L.map('map').setView(center, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(newMap);

    // Fuerza un reflow para evitar superposición inicial
    setTimeout(() => newMap.invalidateSize(), 0);
    setMap(newMap);

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (map && selectedLocal) {
      if (marker) map.removeLayer(marker);
      const newMarker = L.marker(selectedLocal.value).addTo(map);
      setMarker(newMarker);
      map.setView(selectedLocal.value, 12);
    }
  }, [selectedLocal, map]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      <h1>Localizador de Mapas</h1>
      <Select
        options={locales}
        onChange={setSelectedLocal}
        placeholder="Selecciona un local"
        styles={selectStyles} // Aplica los estilos personalizados
      />
      <div 
        id="map" 
        style={{ 
          width: '100%', 
          height: '400px', 
          marginTop: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          position: 'relative',
          zIndex: 1 // Valor bajo para el mapa
        }}
      />
    </div>
  );
};

export default LocalizadorMapa;