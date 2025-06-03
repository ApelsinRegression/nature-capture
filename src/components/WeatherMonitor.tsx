
import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, Cloud, Sun, Droplets, Eye } from 'lucide-react';

interface Position {
  lat: number;
  lng: number;
}

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
  time: string;
}

interface WeatherMonitorProps {
  position: Position | null;
}

const WeatherMonitor: React.FC<WeatherMonitorProps> = ({ position }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (weathercode: number, is_day: number) => {
    if (weathercode <= 3) return is_day ? '☀️' : '🌙';
    if (weathercode <= 48) return '☁️';
    if (weathercode <= 67) return '🌧️';
    if (weathercode <= 77) return '❄️';
    if (weathercode <= 82) return '🌦️';
    return '⛈️';
  };

  useEffect(() => {
    if (!position) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&current_weather=true`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        
        if (data.current_weather) {
          setWeatherData(data.current_weather);
        } else {
          throw new Error('Invalid weather data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [position]);

  if (!position) {
    return (
      <div className="bg-light-green rounded-xl p-3 text-center">
        <Thermometer className="w-5 h-5 text-forest-green mx-auto mb-1" />
        <p className="font-bold text-bright-green text-xs">📍 Location needed</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-light-green rounded-xl p-3 text-center">
        <Thermometer className="w-5 h-5 text-forest-green mx-auto mb-1 animate-spin" />
        <p className="font-bold text-bright-green text-xs">🔄 Loading...</p>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-red-100 rounded-xl p-3 text-center">
        <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
        <p className="font-bold text-red-600 text-xs">❌ Weather Error</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Temperature */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-3 text-white text-center">
        <Thermometer className="w-5 h-5 mx-auto mb-1" />
        <p className="font-black text-lg">{Math.round(weatherData.temperature)}°C</p>
        <p className="font-bold text-xs">Temperature</p>
      </div>

      {/* Wind Speed */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center">
        <Wind className="w-5 h-5 mx-auto mb-1" />
        <p className="font-black text-lg">{Math.round(weatherData.windspeed)}</p>
        <p className="font-bold text-xs">km/h Wind</p>
      </div>
    </div>
  );
};

export default WeatherMonitor;
