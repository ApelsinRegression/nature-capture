
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, Star, Calendar, Target, Trophy } from 'lucide-react';

interface ProfilePageProps {
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const userName = localStorage.getItem('userName') || 'Nature Explorer';
  
  const userStats = {
    totalSessions: 23,
    totalHours: 12.5,
    currentStreak: 5,
    badges: 8,
    level: 'Nature Seeker',
    nextLevel: 'Forest Friend',
    coins: 247,
    rank: 4
  };

  const badges = [
    { name: 'First Steps', emoji: '👣', unlocked: true },
    { name: 'Early Bird', emoji: '🌅', unlocked: true },
    { name: 'Tree Hugger', emoji: '🌳', unlocked: true },
    { name: 'Rain Walker', emoji: '🌧️', unlocked: true },
    { name: 'Sunset Chaser', emoji: '🌅', unlocked: true },
    { name: 'Mountain Climber', emoji: '⛰️', unlocked: false },
    { name: 'Ocean Explorer', emoji: '🌊', unlocked: false },
    { name: 'Star Gazer', emoji: '⭐', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-yellow-accent">
            <span className="text-4xl">🌱</span>
          </div>
          <h1 className="text-3xl font-nunito font-bold text-white mb-2">
            {userName}
          </h1>
          <p className="text-light-green text-lg">{userStats.level}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="bg-yellow-accent rounded-full px-4 py-2">
              <span className="font-bold text-bright-green">🪙 {userStats.coins}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2">
              <span className="font-bold text-forest-green">#{userStats.rank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
          <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
            📊 Your Journey Stats
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-bright-green">{userStats.totalSessions}</div>
              <div className="text-sm font-bold text-text-dark">Sessions</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bright-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{userStats.totalHours}</span>
              </div>
              <div className="text-2xl font-bold text-bright-green">Hours</div>
              <div className="text-sm font-bold text-text-dark">Outside</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <Target className="w-8 h-8 text-bright-green" />
              </div>
              <div className="text-2xl font-bold text-bright-green">{userStats.currentStreak}</div>
              <div className="text-sm font-bold text-text-dark">Day Streak</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-bright-green">{userStats.badges}</div>
              <div className="text-sm font-bold text-text-dark">Badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-bright-green text-lg">🎯 Next Level</span>
            <span className="text-sm font-bold text-text-dark">{userStats.nextLevel}</span>
          </div>
          <div className="w-full bg-light-green rounded-full h-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-forest-green to-bright-green h-6 rounded-full transition-all duration-1000" 
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-sm text-text-dark mt-2 text-center">
            🪙 1,753 more coins needed
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
          <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
            🏆 Achievement Badges
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-accent to-orange-accent shadow-lg' 
                    : 'bg-gray-200'
                }`}>
                  <span className={badge.unlocked ? '' : 'grayscale'}>{badge.emoji}</span>
                </div>
                <p className={`text-xs font-bold ${badge.unlocked ? 'text-bright-green' : 'text-gray-400'}`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="px-6">
        <div className="space-y-3">
          <Button className="w-full bg-light-green text-bright-green font-bold py-4 rounded-2xl text-lg hover:bg-bright-green hover:text-white transition-all">
            <Settings className="w-6 h-6 mr-3" />
            Settings
          </Button>
          
          <Button className="w-full bg-yellow-accent text-bright-green font-bold py-4 rounded-2xl text-lg hover:bg-bright-green hover:text-white transition-all">
            <Trophy className="w-6 h-6 mr-3" />
            View Achievements
          </Button>
          
          <Button 
            onClick={onLogout}
            className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-red-600 transition-all"
          >
            <LogOut className="w-6 h-6 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
