
import React, { useState, useEffect } from 'react';
import { Thermometer, Wind } from 'lucide-react';

interface Position {
  lat: number;
  lng: number;
}

interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}

interface WeatherMonitorProps {
  position: Position | null;
}

const WeatherMonitor: React.FC<WeatherMonitorProps> = ({ position }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Cloudy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Showers';
    return 'Stormy';
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
          setWeatherData({
            temperature: Math.round(data.current_weather.temperature),
            windSpeed: Math.round(data.current_weather.windspeed),
            weatherCode: data.current_weather.weathercode
          });
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
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [position]);

  if (!position) {
    return (
      <>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center">
          <Thermometer className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg">--</p>
          <p className="font-bold text-xs">Need Location</p>
        </div>
        <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-3 text-white text-center">
          <Wind className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg">--</p>
          <p className="font-bold text-xs">Need Location</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center">
          <Thermometer className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg animate-pulse">...</p>
          <p className="font-bold text-xs">Loading</p>
        </div>
        <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-3 text-white text-center">
          <Wind className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg animate-pulse">...</p>
          <p className="font-bold text-xs">Loading</p>
        </div>
      </>
    );
  }

  if (error || !weatherData) {
    return (
      <>
        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-3 text-white text-center">
          <Thermometer className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg">ERR</p>
          <p className="font-bold text-xs">Weather Error</p>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-3 text-white text-center">
          <Wind className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg">ERR</p>
          <p className="font-bold text-xs">Wind Error</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center">
        <Thermometer className="w-5 h-5 mx-auto mb-1" />
        <p className="font-black text-lg">{weatherData.temperature}°</p>
        <p className="font-bold text-xs">{getWeatherDescription(weatherData.weatherCode)}</p>
      </div>
      <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-3 text-white text-center">
        <Wind className="w-5 h-5 mx-auto mb-1" />
        <p className="font-black text-lg">{weatherData.windSpeed}</p>
        <p className="font-bold text-xs">km/h Wind</p>
      </div>
    </>
  );
};

export default WeatherMonitor;
