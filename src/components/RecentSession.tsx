
import React from 'react';
import { Clock, MapPin, Heart, Zap } from 'lucide-react';
import { userManager } from '../utils/userManager';

const RecentSession: React.FC = () => {
  const currentUser = userManager.getCurrentUser();
  
  // Get the most recent session
  const recentSession = currentUser?.walkingSessions && currentUser.walkingSessions.length > 0
    ? currentUser.walkingSessions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  // Default session if no real session exists
  const defaultSession = {
    date: 'No sessions yet',
    duration: '0 min',
    location: 'Start your first walk!',
    distance: '0 km',
    mood: 0,
    coins: 0
  };

  const lastSession = recentSession ? {
    date: new Date(recentSession.date).toLocaleDateString() === new Date().toLocaleDateString() 
      ? 'Today'
      : new Date(recentSession.date).toLocaleDateString() === new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString()
      ? 'Yesterday'
      : new Date(recentSession.date).toLocaleDateString(),
    duration: `${recentSession.time} min`,
    location: recentSession.activities.length > 0 
      ? `${recentSession.activities[0].replace('_', ' ')}`
      : 'Nature Walk',
    distance: `${recentSession.distance} km`,
    mood: recentSession.feeling,
    coins: recentSession.coinsEarned
  } : defaultSession;

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
