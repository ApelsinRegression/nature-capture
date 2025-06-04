
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
  const watchIdRef = useRef<number | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

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
            
            onPositionUpdate(userLocation);
          }
        },
        (error) => {
          console.error('Could not get user location for map:', error);
        }
      );
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  // Start/stop location tracking based on isActive
  useEffect(() => {
    if (isActive && navigator.geolocation) {
      console.log('Starting map location tracking...');
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('Map location updated:', currentPosition);
          onPositionUpdate(currentPosition);
        },
        (error) => {
          console.error('Map location tracking error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        }
      );
    } else if (watchIdRef.current !== null) {
      console.log('Stopping map location tracking...');
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isActive, onPositionUpdate]);

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
      .bindPopup('📍 You are here!')
      .openPopup();

    // Center map on current position
    mapInstanceRef.current.setView([currentPosition.lat, currentPosition.lng], 16);
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
      color: '#22c55e', 
      weight: 4,
      opacity: 0.8 
    }).addTo(mapInstanceRef.current);

    // Fit map to show entire route with some padding
    const bounds = routePolylineRef.current.getBounds();
    mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
  }, [route]);

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        style={{ height: '300px', width: '100%' }}
        className="rounded-xl overflow-hidden border-2 border-forest-green"
      />
      {route.length > 1 && (
        <div className="absolute top-3 left-3 bg-white/90 rounded-lg p-2 text-xs font-bold text-forest-green shadow-lg">
          🛤️ Route Points: {route.length}
        </div>
      )}
      {isActive && (
        <div className="absolute top-3 right-3 bg-green-500 text-white rounded-lg p-2 text-xs font-bold shadow-lg animate-pulse">
          📍 Live Tracking
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;
