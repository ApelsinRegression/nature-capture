
import React, { useEffect, useState, useRef } from 'react';
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

// Separate component to handle map updates within the MapContainer context
const MapUpdater: React.FC<{ center: Position | null; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ isActive, onPositionUpdate, route }) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log('Position updated:', newPos);
          setCurrentPosition(newPos);
          onPositionUpdate(newPos);
        },
        (error) => {
          console.error('Position tracking error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isActive, onPositionUpdate]);

  // Default center (London)
  const defaultCenter: Position = { lat: 51.505, lng: -0.09 };
  const center = currentPosition || defaultCenter;
  const zoom = currentPosition ? 16 : 13;

  // Convert route to format expected by Polyline
  const routeCoordinates: [number, number][] = route.map(pos => [pos.lat, pos.lng]);

  return (
    <div className="relative">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '250px', width: '100%' }}
        className="rounded-xl"
        key={`map-${center.lat}-${center.lng}`} // Force remount when center changes significantly
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={currentPosition} zoom={zoom} />
        
        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]} />
        )}
        
        {routeCoordinates.length > 1 && (
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
