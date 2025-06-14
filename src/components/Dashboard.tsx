
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Route, Timer, Activity } from 'lucide-react';
import NatureTimerButton from './NatureTimerButton';
import EnvironmentalData from './EnvironmentalData';
import TodaySnapshot from './TodaySnapshot';
import RecentSession from './RecentSession';
import Leaderboard from './Leaderboard';
import ProfileSection from './ProfileSection';
import { userManager } from '../utils/userManager';

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

  const currentUser = userManager.getCurrentUser();

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
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-forest-green shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-forest-green" />
              </div>
              <div>
                <h1 className="text-3xl font-nunito font-bold text-white">🌿 NatureCapture</h1>
                <p className="text-lg text-light-green font-semibold">Connecting Mind, Body & Community</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-accent text-bright-green rounded-full px-4 py-2 font-bold text-lg">
                🪙 {currentUser?.coins || 0} NatureCoins
              </div>
              <div className="w-12 h-12 bg-white rounded-full border-4 border-light-green flex items-center justify-center text-2xl">
                {currentUser?.avatar || '🌱'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Start Button Section */}
        <div className="mb-12 text-center">
          <div className="max-w-md mx-auto">
            {/* Active Session Display */}
            {isSessionActive && (
              <div className="duolingo-card border-forest-green border-4 bg-gradient-to-br from-light-green to-white mb-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-forest-green rounded-full mx-auto flex items-center justify-center bounce-in">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-nunito font-bold text-bright-green">
                    🏃 Active Session
                  </h3>
                  <div className="text-4xl font-bold text-forest-green">
                    {formatDuration(sessionDuration)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-accent rounded-2xl p-3">
                      <p className="text-bright-green font-bold text-sm">Distance</p>
                      <p className="font-bold text-lg">0.8 km</p>
                    </div>
                    <div className="bg-orange-accent rounded-2xl p-3 text-white">
                      <p className="font-bold text-sm">Calories</p>
                      <p className="font-bold text-lg">45 cal</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStopSession}
                    className="duolingo-button w-full bg-red-500 hover:bg-red-600"
                  >
                    ⏹️ Stop Session
                  </Button>
                </div>
              </div>
            )}

            <NatureTimerButton 
              isActive={isSessionActive}
              onStart={handleStartSession}
              locationGranted={location?.granted || false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Today's Overview */}
          <TodaySnapshot location={location} />
          
          {/* Recent Session */}
          <RecentSession />
          
          {/* Environmental Science */}
          <EnvironmentalData location={location} />
          
          {/* Leaderboard */}
          <Leaderboard />
          
          {/* Profile Section */}
          <ProfileSection />
          
          {/* Quick Actions */}
          <div className="duolingo-card">
            <h3 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
              ⚡ Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="duolingo-button w-full bg-light-green text-bright-green hover:bg-bright-green hover:text-white">
                <Route className="w-5 h-5 mr-2" />
                📖 View Journal
              </Button>
              <Button className="duolingo-button w-full bg-yellow-accent text-bright-green hover:bg-bright-green hover:text-white">
                <Timer className="w-5 h-5 mr-2" />
                🏆 Challenges (2/5)
              </Button>
              <Button className="duolingo-button w-full bg-orange-accent text-white hover:bg-bright-green">
                <MapPin className="w-5 h-5 mr-2" />
                🗺️ Explore Parks
              </Button>
            </div>
          </div>
        </div>

        {/* Location Status */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="duolingo-card text-center">
            <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${location?.granted ? 'bg-forest-green' : 'bg-orange-accent'}`}>
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="font-bold text-text-dark">
              {location?.granted ? '✅ Location enabled' : '❌ Location required for tracking'}
            </p>
            {!location?.granted && (
              <Button 
                className="duolingo-button mt-3 bg-forest-green"
                onClick={requestLocationPermission}
              >
                📍 Enable Location
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
