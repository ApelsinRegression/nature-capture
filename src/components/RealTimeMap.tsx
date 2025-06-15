
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Position {
  lat: number;
  lng: number;
}

interface RealTimeMapProps {
  currentPosition: Position | null;
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RealTimeMap: React.FC<RealTimeMapProps> = ({ currentPosition }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13); // Default view

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker and view when position changes
  useEffect(() => {
    if (!mapInstanceRef.current || !currentPosition) return;

    const { lat, lng } = currentPosition;
    const newLatLng = L.latLng(lat, lng);

    // Update map view to center on new position
    mapInstanceRef.current.setView(newLatLng, 16);

    if (currentMarkerRef.current) {
      currentMarkerRef.current.setLatLng(newLatLng);
    } else {
      currentMarkerRef.current = L.marker(newLatLng)
        .addTo(mapInstanceRef.current)
        .bindPopup('📍 You are here!')
        .openPopup();
    }
  }, [currentPosition]);

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        style={{ height: '300px', width: '100%' }}
        className="rounded-xl overflow-hidden border-2 border-forest-green"
      />
    </div>
  );
};

export default RealTimeMap;
