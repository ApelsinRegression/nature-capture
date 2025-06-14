
import React from 'react';
import { Timer, Wind, Sun, Droplets } from 'lucide-react';
import { userManager } from '../utils/userManager';

interface LocationData {
  latitude: number;
  longitude: number;
  granted: boolean;
}

interface TodaySnapshotProps {
  location: LocationData | null;
}

const TodaySnapshot: React.FC<TodaySnapshotProps> = ({ location }) => {
  const currentUser = userManager.getCurrentUser();
  
  // Calculate today's time outside from sessions today
  const today = new Date().toDateString();
  const todaysSessions = currentUser?.walkingSessions.filter(session => 
    new Date(session.date).toDateString() === today
  ) || [];
  
  const timeOutsideToday = todaysSessions.reduce((total, session) => total + session.time, 0);

  const todayData = {
    timeOutside: Math.floor(timeOutsideToday / 60), // Convert to minutes
    aqi: 42,
    aqiStatus: 'Good',
    temperature: 22,
    uvIndex: 3,
    sunrise: '6:15 AM',
    sunset: '7:45 PM'
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        📊 Today's Snapshot
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Time Outside */}
        <div className="text-center">
          <div className="circle-stat bg-forest-green text-white mx-auto mb-2">
            <Timer className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{todayData.timeOutside}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Min Outside</div>
        </div>

        {/* Air Quality */}
        <div className="text-center">
          <div className="circle-stat bg-light-green text-bright-green mx-auto mb-2">
            <Wind className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{todayData.aqi}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">AQI ({todayData.aqiStatus})</div>
        </div>

        {/* Temperature */}
        <div className="text-center">
          <div className="circle-stat bg-yellow-accent text-bright-green mx-auto mb-2">
            <Sun className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{todayData.temperature}°</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Temperature</div>
        </div>

        {/* UV Index */}
        <div className="text-center">
          <div className="circle-stat bg-orange-accent text-white mx-auto mb-2">
            <Droplets className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{todayData.uvIndex}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">UV Index</div>
        </div>
      </div>

      {/* Sun Times */}
      <div className="mt-6 bg-light-green rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
              <Sun className="w-4 h-4 text-bright-green" />
            </div>
            <span className="font-bold text-bright-green">🌅 {todayData.sunrise}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-bright-green">🌅 {todayData.sunset}</span>
            <div className="w-8 h-8 bg-orange-accent rounded-full flex items-center justify-center">
              <Sun className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {location?.granted && (
        <div className="mt-4 bg-forest-green text-white rounded-full py-2 px-4 text-center font-bold">
          📍 Location: {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default TodaySnapshot;
