
import React, { useState, useEffect } from 'react';
import { Wind, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Position {
  lat: number;
  lng: number;
}

interface AirQualityData {
  aqi: number;
  status: string;
  color: string;
  dominant: string;
  station: string;
}

interface AirQualityMonitorProps {
  position: Position | null;
}

const AirQualityMonitor: React.FC<AirQualityMonitorProps> = ({ position }) => {
  const [aqiData, setAqiData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'bg-green-500', icon: CheckCircle };
    if (aqi <= 100) return { status: 'Moderate', color: 'bg-yellow-500', icon: AlertTriangle };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', icon: AlertTriangle };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'bg-red-500', icon: XCircle };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'bg-purple-500', icon: XCircle };
    return { status: 'Hazardous', color: 'bg-red-800', icon: XCircle };
  };

  useEffect(() => {
    if (!position) return;

    const fetchAQI = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.waqi.info/feed/geo:${position.lat};${position.lng}/?token=111eeb858e11b8951ca41b0edb587c6904f0bdde`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch air quality data');
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.data) {
          const aqi = data.data.aqi;
          const statusInfo = getAQIStatus(aqi);
          
          setAqiData({
            aqi: aqi,
            status: statusInfo.status,
            color: statusInfo.color,
            dominant: data.data.dominentpol || 'N/A',
            station: data.data.city?.name || 'Unknown'
          });
        } else {
          throw new Error('Invalid data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('AQI fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
    // Refresh every 10 minutes
    const interval = setInterval(fetchAQI, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [position]);

  if (!position) {
    return (
      <div className="bg-light-green rounded-2xl p-4 text-center">
        <Wind className="w-6 h-6 text-forest-green mx-auto mb-2" />
        <p className="font-bold text-bright-green text-sm">📍 Location needed for AQI</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-light-green rounded-2xl p-4 text-center">
        <Wind className="w-6 h-6 text-forest-green mx-auto mb-2 animate-spin" />
        <p className="font-bold text-bright-green text-sm">🔄 Loading AQI...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 rounded-2xl p-4 text-center">
        <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
        <p className="font-bold text-red-600 text-sm">❌ AQI Error</p>
        <p className="text-xs text-red-500">{error}</p>
      </div>
    );
  }

  if (!aqiData) {
    return (
      <div className="bg-gray-100 rounded-2xl p-4 text-center">
        <Wind className="w-6 h-6 text-gray-500 mx-auto mb-2" />
        <p className="font-bold text-gray-600 text-sm">📊 No AQI data</p>
      </div>
    );
  }

  const StatusIcon = getAQIStatus(aqiData.aqi).icon;

  return (
    <div className={`rounded-2xl p-4 text-white ${aqiData.color}`}>
      <div className="flex items-center justify-center mb-2">
        <StatusIcon className="w-6 h-6 mr-2" />
        <div className="text-center">
          <p className="font-black text-2xl">{aqiData.aqi}</p>
          <p className="font-bold text-xs">AQI</p>
        </div>
      </div>
      <p className="font-bold text-center text-xs">{aqiData.status}</p>
      <div className="mt-2 text-xs text-center opacity-90">
        <p>Station: {aqiData.station}</p>
        <p>Dominant: {aqiData.dominant}</p>
      </div>
    </div>
  );
};

export default AirQualityMonitor;
