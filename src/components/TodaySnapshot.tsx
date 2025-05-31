
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Wind, Droplets, Timer } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  granted: boolean;
}

interface TodaySnapshotProps {
  location: LocationData | null;
}

const TodaySnapshot: React.FC<TodaySnapshotProps> = ({ location }) => {
  // Mock data - in real app, this would come from APIs
  const todayData = {
    timeOutside: 0,
    aqi: 42,
    aqiStatus: 'Good',
    temperature: 22,
    uvIndex: 3,
    sunrise: '6:15 AM',
    sunset: '7:45 PM'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-forest-green">Today's Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Time Outside */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Timer className="w-6 h-6 mx-auto mb-2 text-forest-green" />
            <div className="text-2xl font-bold text-forest-green">{todayData.timeOutside}</div>
            <div className="text-sm text-slate-gray">min outside</div>
          </div>

          {/* Air Quality */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Wind className="w-6 h-6 mx-auto mb-2 text-sky-blue" />
            <div className="text-2xl font-bold text-sky-blue">{todayData.aqi}</div>
            <div className="text-sm text-slate-gray">AQI ({todayData.aqiStatus})</div>
          </div>

          {/* Temperature */}
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Sun className="w-6 h-6 mx-auto mb-2 text-sunlight-yellow" />
            <div className="text-2xl font-bold text-sunlight-yellow">{todayData.temperature}°C</div>
            <div className="text-sm text-slate-gray">Current</div>
          </div>

          {/* UV Index */}
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Droplets className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-orange-500">{todayData.uvIndex}</div>
            <div className="text-sm text-slate-gray">UV Index</div>
          </div>
        </div>

        {/* Sun Times */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-sunlight-yellow" />
              <span className="text-sm text-slate-gray">Sunrise: {todayData.sunrise}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-gray">Sunset: {todayData.sunset}</span>
              <Sun className="w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>

        {location?.granted && (
          <Badge variant="secondary" className="mt-4 bg-green-100 text-forest-green">
            Location: {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySnapshot;
