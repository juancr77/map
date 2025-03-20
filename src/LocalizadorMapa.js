// src/LocalizadorMapa.js
import React, { useState } from 'react';
import Select from 'react-select';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.712776, // Latitud de Nueva York (puedes cambiarla)
  lng: -74.005974, // Longitud de Nueva York (puedes cambiarla)
};

const locales = [
  { value: { lat: 40.712776, lng: -74.005974 }, label: 'Nueva York' },
  { value: { lat: 34.052235, lng: -118.243683 }, label: 'Los Ángeles' },
  { value: { lat: 51.5074, lng: -0.1278 }, label: 'Londres' },
  { value: { lat: 48.8566, lng: 2.3522 }, label: 'París' },
];

const LocalizadorMapa = () => {
  const [selectedLocal, setSelectedLocal] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'TU_API_KEY_DE_GOOGLE_MAPS', // Reemplaza con tu API Key
  });

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando el mapa...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Localizador de Mapas</h1>
      <Select
        options={locales}
        onChange={setSelectedLocal}
        placeholder="Selecciona un local"
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={selectedLocal ? selectedLocal.value : center}
      >
        {selectedLocal && <Marker position={selectedLocal.value} />}
      </GoogleMap>
    </div>
  );
};

export default LocalizadorMapa;