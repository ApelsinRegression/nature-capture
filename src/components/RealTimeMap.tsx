
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Position {
  lat: number;
  lng: number;
}

interface RealTimeMapProps {
  isActive: boolean;
  onPositionUpdate: (position: Position) => void;
  route: Position[];
}

const RealTimeMap: React.FC<RealTimeMapProps> = ({ isActive, onPositionUpdate, route }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Prompt user for Mapbox token if not set
    if (!mapboxToken) {
      const token = prompt('Please enter your Mapbox public token (get it from https://mapbox.com/):');
      if (token) {
        setMapboxToken(token);
      }
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      zoom: 15,
      center: [0, 0],
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!isActive || !map.current) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setCurrentPosition(newPos);
        onPositionUpdate(newPos);
        
        // Center map on current position
        map.current?.flyTo({
          center: [newPos.lng, newPos.lat],
          zoom: 16
        });

        // Add/update current position marker
        const markers = document.querySelectorAll('.current-position-marker');
        markers.forEach(marker => marker.remove());
        
        new mapboxgl.Marker({ color: '#22c55e', scale: 1.2 })
          .setLngLat([newPos.lng, newPos.lat])
          .addTo(map.current!);
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

  useEffect(() => {
    if (!map.current || route.length < 2) return;

    // Draw route line
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.map(pos => [pos.lng, pos.lat])
        }
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#22c55e',
        'line-width': 4
      }
    });
  }, [route]);

  if (!mapboxToken) {
    return (
      <div className="bg-gradient-to-br from-light-green to-blue-100 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🗺️</div>
        <p className="font-black text-bright-green text-lg">Map Loading...</p>
        <p className="font-bold text-text-dark text-sm">Enter your Mapbox token to view real-time map</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-64 rounded-2xl" />
      {currentPosition && (
        <div className="absolute top-2 left-2 bg-white rounded-lg p-2 shadow-lg">
          <p className="text-xs font-bold text-bright-green">
            📍 {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;
