
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Position {
  lat: number;
  lng: number;
}

interface RealTimeMapProps {
  onLocationUpdate: (position: Position) => void;
}

export interface RealTimeMapRef {
  map: L.Map | null;
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RealTimeMap = forwardRef<RealTimeMapRef, RealTimeMapProps>(({ onLocationUpdate }, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

  // Expose map instance to parent via ref
  useImperativeHandle(ref, () => ({
    map: mapInstanceRef.current
  }));

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('Initializing map...');
    mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    // Try to get user's current location and center map there
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log('Map got initial user location:', userLocation);
          setCurrentPosition(userLocation);
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 15);
            
            // Add user location marker
            if (currentMarkerRef.current) {
              mapInstanceRef.current.removeLayer(currentMarkerRef.current);
            }
            
            currentMarkerRef.current = L.marker([userLocation.lat, userLocation.lng])
              .addTo(mapInstanceRef.current)
              .bindPopup('📍 You are here!')
              .openPopup();
            
            onLocationUpdate(userLocation);
          }
        },
        (error) => {
          console.error('Could not get user location for map:', error);
        }
      );
    }

    return () => {
      console.log('Cleaning up map...');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationUpdate]);

  // Update current position marker
  useEffect(() => {
    if (!mapInstanceRef.current || !currentPosition) return;

    console.log('Updating map marker to:', currentPosition);

    // Remove existing marker
    if (currentMarkerRef.current) {
      mapInstanceRef.current.removeLayer(currentMarkerRef.current);
    }

    // Add new marker
    currentMarkerRef.current = L.marker([currentPosition.lat, currentPosition.lng])
      .addTo(mapInstanceRef.current)
      .bindPopup('📍 You are here!')
      .openPopup();
  }, [currentPosition]);

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        style={{ height: '100vh', width: '100%' }}
        className="overflow-hidden"
      />
    </div>
  );
});

RealTimeMap.displayName = 'RealTimeMap';

export default RealTimeMap;
