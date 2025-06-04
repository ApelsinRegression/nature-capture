
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface Position {
  lat: number;
  lng: number;
}

interface AQIData {
  aqi: number;
  status: string;
}

interface AirQualityMonitorProps {
  position: Position | null;
}

const AirQualityMonitor: React.FC<AirQualityMonitorProps> = ({ position }) => {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAQIDescription = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    if (aqi <= 300) return 'text-purple-600';
    return 'text-red-800';
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
          throw new Error('Failed to fetch AQI data');
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.data) {
          setAqiData({
            aqi: data.data.aqi,
            status: getAQIDescription(data.data.aqi)
          });
        } else {
          throw new Error('Invalid AQI data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('AQI fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
    // Refresh every 30 minutes
    const interval = setInterval(fetchAQI, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [position]);

  if (!position) {
    return (
      <>
        <p className="font-black text-lg">--</p>
        <p className="font-bold text-xs">Need Location</p>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <p className="font-black text-lg animate-pulse">...</p>
        <p className="font-bold text-xs">Loading</p>
      </>
    );
  }

  if (error || !aqiData) {
    return (
      <>
        <p className="font-black text-lg text-red-500">ERR</p>
        <p className="font-bold text-xs">AQI Error</p>
      </>
    );
  }

  return (
    <>
      <p className="font-black text-lg">{aqiData.aqi}</p>
      <p className="font-bold text-xs">AQI {aqiData.status}</p>
    </>
  );
};

export default AirQualityMonitor;
