
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Position {
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  isActive: boolean;
  onPositionUpdate: (position: Position) => void;
  route: Position[];
}

// Component to update map view when position changes
const MapUpdater: React.FC<{ position: Position | null }> = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 16);
    }
  }, [position, map]);
  
  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ isActive, onPositionUpdate, route }) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setCurrentPosition(newPos);
        onPositionUpdate(newPos);
      },
      (error) => console.error('Position tracking error:', error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isActive, onPositionUpdate]);

  // Default center (will be updated when we get user location)
  const defaultCenter: [number, number] = [51.505, -0.09];
  const center: [number, number] = currentPosition ? [currentPosition.lat, currentPosition.lng] : defaultCenter;

  // Convert route to format expected by Polyline
  const routeCoordinates: [number, number][] = route.map(pos => [pos.lat, pos.lng]);

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '250px', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater position={currentPosition} />
        
        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]} />
        )}
        
        {route.length > 1 && (
          <Polyline
            positions={routeCoordinates}
            color="#22c55e"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
      
      {currentPosition && (
        <div className="absolute top-2 left-2 bg-white rounded-lg p-2 shadow-lg z-[1000]">
          <p className="text-xs font-bold text-bright-green">
            📍 {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
