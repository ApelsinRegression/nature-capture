
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, Droplets, Thermometer, Eye } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  granted: boolean;
}

interface EnvironmentalDataProps {
  location: LocationData | null;
}

const EnvironmentalData: React.FC<EnvironmentalDataProps> = ({ location }) => {
  // Mock environmental data - in real app, this would come from APIs
  const environmentalData = {
    airQuality: {
      aqi: 42,
      status: 'Good',
      pm25: 12,
      ozone: 65
    },
    waterQuality: {
      ph: 7.2,
      turbidity: 1.8,
      status: 'Excellent'
    },
    weather: {
      temperature: 22,
      humidity: 65,
      windSpeed: 8,
      uvIndex: 3
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-100 text-green-800';
    if (aqi <= 100) return 'bg-yellow-100 text-yellow-800';
    if (aqi <= 150) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-forest-green flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Environmental Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {location?.granted ? (
          <>
            {/* Air Quality */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-earth-brown flex items-center">
                  <Wind className="w-4 h-4 mr-2 text-sky-blue" />
                  Air Quality
                </h3>
                <Badge className={getAQIColor(environmentalData.airQuality.aqi)}>
                  AQI {environmentalData.airQuality.aqi} - {environmentalData.airQuality.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-slate-gray">PM₂.₅</p>
                  <p className="font-semibold text-sky-blue">{environmentalData.airQuality.pm25} μg/m³</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-slate-gray">Ozone</p>
                  <p className="font-semibold text-sky-blue">{environmentalData.airQuality.ozone} ppb</p>
                </div>
              </div>
            </div>

            {/* Water Quality */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-earth-brown flex items-center">
                  <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                  Water Quality
                </h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {environmentalData.waterQuality.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-slate-gray">pH Level</p>
                  <p className="font-semibold text-blue-600">{environmentalData.waterQuality.ph}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-slate-gray">Turbidity</p>
                  <p className="font-semibold text-blue-600">{environmentalData.waterQuality.turbidity} NTU</p>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-earth-brown flex items-center">
                <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
                Weather Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-slate-gray">Humidity</p>
                  <p className="font-semibold text-orange-600">{environmentalData.weather.humidity}%</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-slate-gray">Wind Speed</p>
                  <p className="font-semibold text-orange-600">{environmentalData.weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-forest-green font-medium">
                🌱 Perfect conditions for outdoor activity! Clean air and moderate temperature.
              </p>
              <p className="text-xs text-slate-gray mt-1">
                Bonus: 2× NatureCoins for sessions during good air quality.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Eye className="w-12 h-12 mx-auto mb-4 text-slate-gray" />
            <p className="text-slate-gray">Enable location access to see local environmental conditions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentalData;
