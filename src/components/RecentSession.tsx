
import React from 'react';
import { Clock, MapPin, Heart, Zap } from 'lucide-react';

const RecentSession: React.FC = () => {
  const lastSession = {
    date: 'Yesterday',
    duration: '25 min',
    location: 'Central Park Trail',
    distance: '1.2 km',
    mood: 5,
    coins: 25
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        🚶 Recent Adventure
      </h2>
      
      <div className="bg-gradient-to-br from-light-green to-white rounded-2xl p-6 border-4 border-forest-green">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-forest-green rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-bright-green text-lg">{lastSession.duration}</p>
              <p className="text-sm text-text-dark">{lastSession.date}</p>
            </div>
          </div>
          <div className="bg-yellow-accent rounded-full px-4 py-2">
            <p className="font-bold text-bright-green">🪙 +{lastSession.coins}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-forest-green" />
            <span className="text-text-dark font-semibold">{lastSession.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-accent" />
              <span className="text-text-dark font-semibold">{lastSession.distance}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`text-lg ${star <= lastSession.mood ? '⭐' : '☆'}`}
                  >
                    {star <= lastSession.mood ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSession;
