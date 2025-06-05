
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
  shouldCenterOnUser?: boolean;
  onCenteringComplete?: () => void;
}

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RealTimeMap: React.FC<RealTimeMapProps> = ({ 
  isActive, 
  onPositionUpdate, 
  route, 
  shouldCenterOnUser = false,
  onCenteringComplete 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentMarkerRef = useRef<L.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('Initializing map...');
    mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    // Track user interactions with map
    mapInstanceRef.current.on('dragstart', () => {
      userInteractedRef.current = true;
    });

    mapInstanceRef.current.on('zoomstart', () => {
      userInteractedRef.current = true;
    });

    // Try to get user's current location and center map there
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          console.log('Map got user location:', userLocation);
          
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
      console.log('Cleaning up map...');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [onPositionUpdate]);

  // Handle centering on user location
  useEffect(() => {
    if (shouldCenterOnUser && route.length > 0 && mapInstanceRef.current) {
      const currentPosition = route[route.length - 1];
      console.log('Centering map on user location:', currentPosition);
      
      mapInstanceRef.current.setView([currentPosition.lat, currentPosition.lng], 16);
      userInteractedRef.current = false; // Reset user interaction flag
      
      if (onCenteringComplete) {
        onCenteringComplete();
      }
    }
  }, [shouldCenterOnUser, route, onCenteringComplete]);

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

    // Only auto-center if user hasn't interacted with the map
    if (!userInteractedRef.current || shouldCenterOnUser) {
      mapInstanceRef.current.setView([currentPosition.lat, currentPosition.lng], 16);
    }
  }, [route, shouldCenterOnUser]);

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        style={{ height: '300px', width: '100%' }}
        className="rounded-xl overflow-hidden border-2 border-forest-green"
      />
      {isActive && (
        <div className="absolute top-3 right-3 bg-green-500 text-white rounded-lg p-2 text-xs font-bold shadow-lg animate-pulse">
          📍 Live Tracking
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;
