import React, { useEffect, useRef, useState } from 'react';
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
  const [followUser, setFollowUser] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    console.log('Initializing map...');
    mapInstanceRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    // Track user interactions with map - disable following when user manually moves
    mapInstanceRef.current.on('dragstart', () => {
      console.log('User dragged map, disabling follow mode');
      setFollowUser(false);
    });

    mapInstanceRef.current.on('zoomstart', () => {
      console.log('User zoomed map, disabling follow mode');
      setFollowUser(false);
    });

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

  // Handle persistent centering on user location
  useEffect(() => {
    if (shouldCenterOnUser && currentPosition && mapInstanceRef.current) {
      console.log('Enabling persistent follow mode for user location:', currentPosition);
      setFollowUser(true);
      mapInstanceRef.current.setView([currentPosition.lat, currentPosition.lng], 16);
      
      if (onCenteringComplete) {
        onCenteringComplete();
      }
    }
  }, [shouldCenterOnUser, currentPosition, onCenteringComplete]);

  // Start/stop location tracking based on isActive
  useEffect(() => {
    if (isActive && navigator.geolocation) {
      console.log('Starting map location tracking...');
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('Map location updated:', newPosition);
          setCurrentPosition(newPosition);
          onPositionUpdate(newPosition);

          // If follow mode is enabled, keep centering on user
          if (followUser && mapInstanceRef.current) {
            console.log('Following user to new position:', newPosition);
            mapInstanceRef.current.setView([newPosition.lat, newPosition.lng], 16);
          }
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
  }, [isActive, onPositionUpdate, followUser]);

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
        style={{ height: '300px', width: '100%' }}
        className="rounded-xl overflow-hidden border-2 border-forest-green"
      />
      {isActive && (
        <div className="absolute top-3 right-3 bg-green-500 text-white rounded-lg p-2 text-xs font-bold shadow-lg animate-pulse">
          📍 Live Tracking
        </div>
      )}
      {followUser && (
        <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-lg p-2 text-xs font-bold shadow-lg">
          🎯 Following You
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;
