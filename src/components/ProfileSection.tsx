
import React from 'react';
import { User, Star, Calendar, Target } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const userStats = {
    totalSessions: 23,
    totalHours: 12.5,
    currentStreak: 5,
    badges: 8,
    level: 'Nature Seeker',
    nextLevel: 'Forest Friend'
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        👤 Your Journey
      </h2>
      
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-forest-green to-bright-green rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-yellow-accent">
          <span className="text-3xl">🌱</span>
        </div>
        <h3 className="text-xl font-bold text-bright-green">Nature Explorer</h3>
        <p className="text-forest-green font-semibold">{userStats.level}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="circle-stat bg-forest-green text-white mx-auto mb-2">
            <Calendar className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{userStats.totalSessions}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Sessions</div>
        </div>

        <div className="text-center">
          <div className="circle-stat bg-bright-green text-white mx-auto mb-2">
            <User className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{userStats.totalHours}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Hours</div>
        </div>

        <div className="text-center">
          <div className="circle-stat bg-yellow-accent text-bright-green mx-auto mb-2">
            <Target className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{userStats.currentStreak}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Day Streak</div>
        </div>

        <div className="text-center">
          <div className="circle-stat bg-orange-accent text-white mx-auto mb-2">
            <Star className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{userStats.badges}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Badges</div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="bg-light-green rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-bright-green">🎯 Next Level</span>
          <span className="text-sm font-bold text-text-dark">{userStats.nextLevel}</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-forest-green to-bright-green h-4 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-text-dark mt-2 text-center">
          🪙 1,753 more coins needed
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
