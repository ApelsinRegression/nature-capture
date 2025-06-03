
import React, { useEffect, useState, useRef } from 'react';

interface Position {
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  isActive: boolean;
  onPositionUpdate: (position: Position) => void;
  route: Position[];
}

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

  return (
    <div className="relative">
      <div 
        style={{ height: '250px', width: '100%' }}
        className="rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center text-white"
      >
        <div className="text-6xl mb-4">🗺️</div>
        <p className="text-xl font-bold mb-2">Live Route Tracking</p>
        <p className="text-sm opacity-90">Map functionality temporarily disabled</p>
        {currentPosition && (
          <div className="mt-4 bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm font-bold">
              📍 Current Position
            </p>
            <p className="text-xs">
              {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
            </p>
          </div>
        )}
        {route.length > 1 && (
          <div className="mt-2 bg-white/20 rounded-lg p-2 backdrop-blur-sm">
            <p className="text-xs font-bold">
              🛤️ Route Points: {route.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeafletMap;
