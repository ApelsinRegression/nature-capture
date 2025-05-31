
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Sun, Wind, Droplets, Timer, Route, Activity } from 'lucide-react';
import NatureTimerButton from './NatureTimerButton';
import EnvironmentalData from './EnvironmentalData';
import TodaySnapshot from './TodaySnapshot';
import RecentSession from './RecentSession';

interface LocationData {
  latitude: number;
  longitude: number;
  granted: boolean;
}

const Dashboard = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive && sessionStartTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  const requestLocationPermission = async () => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              granted: true,
            });
          },
          (error) => {
            console.log('Location permission denied:', error);
            setLocation({ latitude: 0, longitude: 0, granted: false });
          }
        );
      }
    } catch (error) {
      console.error('Error requesting location:', error);
    }
  };

  const handleStartSession = () => {
    if (!location?.granted) {
      alert('Location access is required to track your outdoor session. Please enable location permissions.');
      return;
    }
    setIsSessionActive(true);
    setSessionStartTime(new Date());
    setSessionDuration(0);
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    setSessionStartTime(null);
    setSessionDuration(0);
    // Here you would typically save the session data
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-forest-green rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold text-forest-green">NatureCapture</h1>
                <p className="text-sm text-slate-gray">Connecting Mind, Body & Community</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-sky-blue text-white">
                🪙 247 NatureCoins
              </Badge>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Snapshot */}
            <TodaySnapshot location={location} />
            
            {/* Recent Session */}
            <RecentSession />
            
            {/* Environmental Data */}
            <EnvironmentalData location={location} />
          </div>

          {/* Right Column - Session Controls */}
          <div className="space-y-6">
            {/* Active Session Display */}
            {isSessionActive && (
              <Card className="border-forest-green border-2 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-forest-green flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Active Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl font-bold text-forest-green">
                      {formatDuration(sessionDuration)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-gray">Distance</p>
                        <p className="font-semibold">0.8 km</p>
                      </div>
                      <div>
                        <p className="text-slate-gray">Calories</p>
                        <p className="font-semibold">45 cal</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleStopSession}
                      className="w-full bg-red-500 hover:bg-red-600"
                    >
                      Stop Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nature Timer Button */}
            <NatureTimerButton 
              isActive={isSessionActive}
              onStart={handleStartSession}
              locationGranted={location?.granted || false}
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-playfair">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Route className="w-4 h-4 mr-2" />
                  View Journal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Timer className="w-4 h-4 mr-2" />
                  Challenges (2/5)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Parks
                </Button>
              </CardContent>
            </Card>

            {/* Location Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <MapPin className={`w-4 h-4 ${location?.granted ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-sm">
                    {location?.granted ? 'Location enabled' : 'Location required for tracking'}
                  </span>
                </div>
                {!location?.granted && (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-forest-green text-sm mt-2"
                    onClick={requestLocationPermission}
                  >
                    Enable location access
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
