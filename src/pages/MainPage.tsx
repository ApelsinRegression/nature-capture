
import React, { useRef, useState } from 'react';
import Dashboard from '../components/Dashboard';
import RealTimeMap, { RealTimeMapRef } from '../components/RealTimeMap';
import { Leaf } from 'lucide-react';

const MainPage: React.FC = () => {
  const mapRef = useRef<RealTimeMapRef>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location);
  };

  return (
    <div className="min-h-screen relative bg-off-white">
      {/* Header - smaller text */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 shadow-xl">
        <div className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Leaf className="w-4 h-4 text-yellow-accent" />
            <h1 className="text-lg font-nunito font-black text-white tracking-tight">
              NatureCapture
            </h1>
          </div>
          <p className="text-xs font-bold text-light-green">
            Connecting Mind, Body & Community
          </p>
        </div>
      </div>

      {/* Map - full screen */}
      <div className="h-screen">
        <RealTimeMap 
          ref={mapRef}
          onLocationUpdate={handleLocationUpdate}
        />
      </div>

      {/* Dashboard overlay */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default MainPage;
