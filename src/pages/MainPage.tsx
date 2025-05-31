
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MapPin, Activity, Wind, Thermometer, Eye, Droplets } from 'lucide-react';

const MainPage: React.FC = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [location, setLocation] = useState<{granted: boolean}>({ granted: false });
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [environmentalData, setEnvironmentalData] = useState({
    airQuality: 'Good',
    temperature: 22,
    humidity: 65,
    windSpeed: 8,
    uvIndex: 4
  });

  const suggestedActivities = [
    { name: 'Morning Walk', icon: '🚶', duration: '30 min', calories: '120 cal', difficulty: 'Easy' },
    { name: 'Park Yoga', icon: '🧘', duration: '45 min', calories: '180 cal', difficulty: 'Medium' },
    { name: 'Nature Photography', icon: '📸', duration: '60 min', calories: '90 cal', difficulty: 'Easy' },
  ];

  const nearbyParks = [
    { name: 'Central Green Park', distance: '0.3 km', rating: 4.8, type: 'Urban Park' },
    { name: 'Riverside Trail', distance: '0.8 km', rating: 4.9, type: 'Nature Trail' },
    { name: 'Sunset Hill', distance: '1.2 km', rating: 4.7, type: 'Hiking' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!location.granted && !isSessionActive) {
      // Request location
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation({ granted: true });
          setIsSessionActive(true);
        },
        () => {
          alert('Location access needed for outdoor tracking!');
        }
      );
    } else if (isSessionActive) {
      setIsSessionActive(false);
      setShowSessionComplete(true);
      // Reset after showing completion
      setTimeout(() => {
        setShowSessionComplete(false);
        setSessionTime(0);
      }, 5000);
    } else {
      setIsSessionActive(true);
    }
  };

  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation({ granted: true });
      },
      () => {
        alert('Please enable location access in your browser settings to track your outdoor sessions.');
      }
    );
  };

  if (showSessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green to-bright-green flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-accent text-center max-w-md w-full animate-bounce-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-black text-bright-green mb-4">Session Complete!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-accent to-orange-accent rounded-2xl p-4 text-white">
              <p className="font-black text-xl">🪙 +{Math.floor(sessionTime / 60)} NatureCoins</p>
              <p className="font-bold">1 coin per minute earned!</p>
            </div>
            
            <div className="bg-light-green rounded-2xl p-4">
              <p className="font-black text-bright-green text-lg">🔥 Streak: 6 days!</p>
            </div>
          </div>

          <div className="bg-forest-green rounded-2xl p-4 text-white mb-6">
            <p className="font-bold text-sm mb-2">🌱 Did you know?</p>
            <p className="font-bold">Spending just 20 minutes in nature can significantly reduce stress hormones and boost your mood!</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">Time Outside</p>
              <p className="font-bold text-text-dark">{formatTime(sessionTime)}</p>
            </div>
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">Calories</p>
              <p className="font-bold text-text-dark">{Math.floor(sessionTime / 2)} cal</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
              alt="Leaf" 
              className="w-12 h-12 animate-pulse"
            />
            <div>
              <h1 className="text-3xl font-nunito font-black text-white animate-fade-in">NatureCapture</h1>
              <p className="text-light-green font-bold text-lg">Ready for adventure?</p>
            </div>
          </div>
          <div className="bg-yellow-accent rounded-full px-4 py-2 animate-bounce">
            <span className="font-black text-bright-green text-lg">🪙 247</span>
          </div>
        </div>
      </div>

      {/* Environmental Data */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
          <h2 className="text-2xl font-black text-bright-green mb-4 flex items-center">
            <Wind className="w-6 h-6 mr-2" />
            🌤️ Today's Conditions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-light-green to-white rounded-2xl p-4 text-center">
              <Thermometer className="w-8 h-8 text-forest-green mx-auto mb-2" />
              <p className="font-black text-2xl text-bright-green">{environmentalData.temperature}°C</p>
              <p className="font-bold text-text-dark text-sm">Perfect for walking!</p>
            </div>
            <div className="bg-gradient-to-br from-light-green to-white rounded-2xl p-4 text-center">
              <Eye className="w-8 h-8 text-forest-green mx-auto mb-2" />
              <p className="font-black text-2xl text-bright-green">{environmentalData.airQuality}</p>
              <p className="font-bold text-text-dark text-sm">Air Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timer Section */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-forest-green relative overflow-hidden">
          {/* Background nature image */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png" 
              alt="Nature" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 text-center">
            {isSessionActive ? (
              <div className="space-y-6">
                <div className="w-24 h-24 bg-forest-green rounded-full mx-auto flex items-center justify-center animate-pulse">
                  <Activity className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-nunito font-black text-bright-green animate-bounce">
                  Active Session!
                </h2>
                <div className="text-7xl font-black text-forest-green animate-pulse">
                  {formatTime(sessionTime)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-accent rounded-2xl p-4 transform hover:scale-105 transition-transform">
                    <p className="text-bright-green font-black text-lg">Distance</p>
                    <p className="text-3xl font-black">0.8 km</p>
                  </div>
                  <div className="bg-orange-accent rounded-2xl p-4 text-white transform hover:scale-105 transition-transform">
                    <p className="font-black text-lg">Calories</p>
                    <p className="text-3xl font-black">{Math.floor(sessionTime / 2)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <img 
                    src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
                    alt="Trees" 
                    className="w-16 h-16 animate-bounce"
                  />
                  <img 
                    src="/lovable-uploads/55626c2e-ff58-47bb-bdcb-ea80a1c497bc.png" 
                    alt="Footprints" 
                    className="w-16 h-16 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
                <h2 className="text-4xl font-nunito font-black text-bright-green animate-fade-in">
                  Ready to Explore?
                </h2>
                <p className="text-text-dark text-xl font-bold">
                  Start your nature journey and earn NatureCoins!
                </p>
              </div>
            )}
            
            <Button
              onClick={handleStartStop}
              className={`w-full mt-8 text-3xl font-black py-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 animate-pulse ${
                isSessionActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-forest-green to-bright-green text-white hover:shadow-2xl'
              }`}
            >
              {isSessionActive ? (
                <>
                  <Pause className="w-8 h-8 mr-3" />
                  Stop Adventure
                </>
              ) : (
                <>
                  <Play className="w-8 h-8 mr-3" />
                  Start Nature Time
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested Activities */}
      {!isSessionActive && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
            <h2 className="text-2xl font-black text-bright-green mb-4">🎯 Suggested for You</h2>
            <div className="space-y-3">
              {suggestedActivities.map((activity, index) => (
                <div key={index} className="bg-gradient-to-r from-light-green to-white rounded-2xl p-4 border-2 border-forest-green transform hover:scale-102 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{activity.icon}</span>
                      <div>
                        <p className="font-black text-bright-green text-lg">{activity.name}</p>
                        <p className="text-sm font-bold text-text-dark">{activity.duration} • {activity.calories} • {activity.difficulty}</p>
                      </div>
                    </div>
                    <Button className="bg-forest-green text-white font-black rounded-full px-4 py-2 hover:bg-bright-green transition-all transform hover:scale-110">
                      Try
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nearby Parks */}
      {isSessionActive && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
            <h2 className="text-2xl font-black text-bright-green mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              🌳 Parks Nearby
            </h2>
            <div className="space-y-3">
              {nearbyParks.map((park, index) => (
                <div key={index} className="bg-light-green rounded-2xl p-4 border-2 border-forest-green">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-bright-green text-lg">{park.name}</p>
                      <p className="text-sm font-bold text-text-dark">📍 {park.distance} • ⭐ {park.rating} • {park.type}</p>
                    </div>
                    <Button className="bg-yellow-accent text-bright-green font-black rounded-full px-4 py-2 hover:bg-bright-green hover:text-white transition-all">
                      Go
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green transform hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-black text-xl">23</span>
              </div>
              <p className="font-black text-text-dark text-lg">Sessions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green transform hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-bright-green font-black text-xl">6</span>
              </div>
              <p className="font-black text-text-dark text-lg">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Status */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-4 border-3 border-light-green flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${location.granted ? 'bg-forest-green' : 'bg-orange-accent'}`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="font-black text-text-dark text-lg">
              {location.granted ? '✅ Location Ready' : '📍 Enable Location'}
            </p>
          </div>
          {!location.granted && (
            <Button 
              onClick={requestLocationPermission}
              className="bg-gradient-to-r from-forest-green to-bright-green text-white font-black rounded-full px-6 py-2 hover:scale-105 transition-transform"
            >
              Enable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
