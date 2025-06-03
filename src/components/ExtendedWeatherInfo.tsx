
import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Eye, Sunrise, Sunset } from 'lucide-react';

interface Position {
  lat: number;
  lng: number;
}

interface ExtendedWeatherData {
  uv_index: number;
  precipitation_probability: number;
  is_day: number;
  sunrise: string;
  sunset: string;
  precipitation_sum: number;
}

interface ExtendedWeatherInfoProps {
  position: Position | null;
}

const ExtendedWeatherInfo: React.FC<ExtendedWeatherInfoProps> = ({ position }) => {
  const [weatherData, setWeatherData] = useState<ExtendedWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUVDescription = (uvIndex: number) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'bg-green-500';
    if (uvIndex <= 5) return 'bg-yellow-500';
    if (uvIndex <= 7) return 'bg-orange-500';
    if (uvIndex <= 10) return 'bg-red-500';
    return 'bg-purple-600';
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (!position) return;

    const fetchExtendedWeather = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&daily=uv_index_max,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&timezone=auto`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch extended weather data');
        }
        
        const data = await response.json();
        
        if (data.daily) {
          setWeatherData({
            uv_index: data.daily.uv_index_max[0] || 0,
            precipitation_probability: data.daily.precipitation_probability_max[0] || 0,
            is_day: data.current_weather?.is_day || 1,
            sunrise: data.daily.sunrise[0],
            sunset: data.daily.sunset[0],
            precipitation_sum: data.daily.precipitation_sum[0] || 0
          });
        } else {
          throw new Error('Invalid extended weather data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Extended weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExtendedWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchExtendedWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [position]);

  if (!position) {
    return (
      <div className="bg-light-green rounded-2xl p-4 text-center">
        <Sun className="w-6 h-6 text-forest-green mx-auto mb-2" />
        <p className="font-bold text-bright-green text-sm">📍 Location needed for weather info</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-light-green rounded-2xl p-4 text-center">
        <Sun className="w-6 h-6 text-forest-green mx-auto mb-2 animate-spin" />
        <p className="font-bold text-bright-green text-sm">🔄 Loading weather...</p>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-red-100 rounded-2xl p-4 text-center">
        <Sun className="w-6 h-6 text-red-500 mx-auto mb-2" />
        <p className="font-bold text-red-600 text-sm">❌ Weather Info Error</p>
      </div>
    );
  }

  const isRaining = weatherData.precipitation_sum > 0;
  const willRain = weatherData.precipitation_probability > 30;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {/* UV Index */}
        <div className={`${getUVColor(weatherData.uv_index)} rounded-2xl p-3 text-white text-center`}>
          <Eye className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-lg">{Math.round(weatherData.uv_index)}</p>
          <p className="font-bold text-xs">UV {getUVDescription(weatherData.uv_index)}</p>
        </div>

        {/* Rain Status */}
        <div className={`${isRaining ? 'bg-blue-500' : willRain ? 'bg-yellow-500' : 'bg-green-500'} rounded-2xl p-3 text-white text-center`}>
          <CloudRain className="w-5 h-5 mx-auto mb-1" />
          <p className="font-black text-sm">
            {isRaining ? '🌧️ Raining' : willRain ? '🌦️ Possible' : '☀️ No Rain'}
          </p>
          <p className="font-bold text-xs">{weatherData.precipitation_probability}%</p>
        </div>

        {/* Current Time Status */}
        <div className={`${weatherData.is_day ? 'bg-yellow-500' : 'bg-indigo-600'} rounded-2xl p-3 text-white text-center`}>
          {weatherData.is_day ? <Sun className="w-5 h-5 mx-auto mb-1" /> : <span className="text-lg mb-1 block">🌙</span>}
          <p className="font-black text-sm">{weatherData.is_day ? 'Day' : 'Night'}</p>
          <p className="font-bold text-xs">Current</p>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-4 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sunrise className="w-5 h-5" />
            <div>
              <p className="font-bold text-sm">🌅 Sunrise</p>
              <p className="font-black">{formatTime(weatherData.sunrise)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="font-bold text-sm">🌅 Sunset</p>
              <p className="font-black">{formatTime(weatherData.sunset)}</p>
            </div>
            <Sunset className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedWeatherInfo;
