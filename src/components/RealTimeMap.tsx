
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Position {
  lat: number;
  lng: number;
}

interface RealTimeMapProps {
  isActive: boolean;
  onPositionUpdate: (position: Position) => void;
  route: Position[];
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RealTimeMap: React.FC<RealTimeMapProps> = ({ isActive, onPositionUpdate, route }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update current position marker
  useEffect(() => {
    if (!mapInstanceRef.current || route.length === 0) return;

    const currentPosition = route[route.length - 1];

    // Remove existing marker
    if (currentMarkerRef.current) {
      mapInstanceRef.current.removeLayer(currentMarkerRef.current);
    }

    // Add new marker
    currentMarkerRef.current = L.marker([currentPosition.lat, currentPosition.lng])
      .addTo(mapInstanceRef.current)
      .bindPopup('You are here!')
      .openPopup();

    // Center map on current position
    mapInstanceRef.current.setView([currentPosition.lat, currentPosition.lng], 15);
  }, [route]);

  // Update route polyline
  useEffect(() => {
    if (!mapInstanceRef.current || route.length < 2) return;

    // Remove existing route
    if (routePolylineRef.current) {
      mapInstanceRef.current.removeLayer(routePolylineRef.current);
    }

    // Add new route
    const latLngs: L.LatLngExpression[] = route.map(pos => [pos.lat, pos.lng]);
    routePolylineRef.current = L.polyline(latLngs, { 
      color: 'blue', 
      weight: 4,
      opacity: 0.7 
    }).addTo(mapInstanceRef.current);

    // Fit map to show entire route
    mapInstanceRef.current.fitBounds(routePolylineRef.current.getBounds());
  }, [route]);

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        style={{ height: '250px', width: '100%' }}
        className="rounded-xl overflow-hidden"
      />
      {route.length > 1 && (
        <div className="absolute top-2 left-2 bg-white/90 rounded-lg p-2 text-xs font-bold text-forest-green">
          🛤️ Route Points: {route.length}
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;
