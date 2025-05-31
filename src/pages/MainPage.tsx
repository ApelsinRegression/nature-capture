
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MapPin, Activity } from 'lucide-react';

const MainPage: React.FC = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [location, setLocation] = useState<{granted: boolean}>({ granted: false });

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
    } else {
      setIsSessionActive(!isSessionActive);
      if (!isSessionActive === false) {
        setSessionTime(0);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
              alt="Leaf" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-2xl font-nunito font-bold text-white">NatureCapture</h1>
              <p className="text-light-green">Ready for adventure?</p>
            </div>
          </div>
          <div className="bg-yellow-accent rounded-full px-4 py-2">
            <span className="font-bold text-bright-green">🪙 247</span>
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
                <div className="w-24 h-24 bg-forest-green rounded-full mx-auto flex items-center justify-center animate-pulse-green">
                  <Activity className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-nunito font-bold text-bright-green">
                  Active Session!
                </h2>
                <div className="text-6xl font-bold text-forest-green">
                  {formatTime(sessionTime)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-accent rounded-2xl p-4">
                    <p className="text-bright-green font-bold">Distance</p>
                    <p className="text-2xl font-bold">0.8 km</p>
                  </div>
                  <div className="bg-orange-accent rounded-2xl p-4 text-white">
                    <p className="font-bold">Calories</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <img 
                    src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
                    alt="Trees" 
                    className="w-16 h-16"
                  />
                  <img 
                    src="/lovable-uploads/55626c2e-ff58-47bb-bdcb-ea80a1c497bc.png" 
                    alt="Footprints" 
                    className="w-16 h-16"
                  />
                </div>
                <h2 className="text-3xl font-nunito font-bold text-bright-green">
                  Ready to Explore?
                </h2>
                <p className="text-text-dark text-lg">
                  Start your nature journey and earn NatureCoins!
                </p>
              </div>
            )}
            
            <Button
              onClick={handleStartStop}
              className={`w-full mt-8 text-2xl font-bold py-6 rounded-3xl shadow-xl transform transition-all hover:scale-105 ${
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

      {/* Quick Stats */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green">
            <div className="text-center">
              <div className="w-12 h-12 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">23</span>
              </div>
              <p className="font-bold text-text-dark">Sessions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-bright-green font-bold">5</span>
              </div>
              <p className="font-bold text-text-dark">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Status */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-4 border-3 border-light-green flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${location.granted ? 'bg-forest-green' : 'bg-orange-accent'}`}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <p className="font-bold text-text-dark">
            {location.granted ? '✅ Location Ready' : '📍 Enable Location'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
