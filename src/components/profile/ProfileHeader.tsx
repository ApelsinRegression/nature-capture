
import React from 'react';
import { Edit, MapPin } from 'lucide-react';
import { userManager } from '../../utils/userManager';

interface ProfileHeaderProps {
  userName: string;
  userCity?: string;
  selectedEmoji: string;
  userStats: {
    totalSessions: number;
    totalHours: number;
    currentStreak: number;
    badges: number;
    level: string;
    nextLevel: string;
    coins: number;
    rank: number;
  };
  isEditing: boolean;
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userCity,
  selectedEmoji,
  userStats,
  isEditing,
  onEditClick
}) => {
  const currentUser = userManager.getCurrentUser();
  const allUsers = userManager.getAllUsers();
  
  // Calculate real rank
  const sortedUsers = allUsers.sort((a, b) => b.coins - a.coins);
  const userRank = currentUser ? sortedUsers.findIndex(u => u.id === currentUser.id) + 1 : 1;
  
  const getCoinsToNextLevel = () => {
    switch (userStats.nextLevel) {
      case 'Nature Seeker': return 500 - userStats.coins;
      case 'Forest Friend': return 1000 - userStats.coins;
      case 'Forest Guardian': return 2000 - userStats.coins;
      default: return 0;
    }
  };

  const getProgressPercentage = () => {
    const currentLevelCoins = (() => {
      switch (userStats.level) {
        case 'Beginner': return 0;
        case 'Nature Seeker': return 500;
        case 'Forest Friend': return 1000;
        case 'Forest Guardian': return 2000;
        default: return 0;
      }
    })();
    
    const nextLevelCoins = (() => {
      switch (userStats.nextLevel) {
        case 'Nature Seeker': return 500;
        case 'Forest Friend': return 1000;
        case 'Forest Guardian': return 2000;
        default: return 2000;
      }
    })();
    
    const progress = ((userStats.coins - currentLevelCoins) / (nextLevelCoins - currentLevelCoins)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  return (
    <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-8 shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
              {selectedEmoji}
            </div>
            <div>
              <h1 className="text-3xl font-nunito font-black text-white mb-2">{userName}</h1>
              {userCity && (
                <div className="flex items-center space-x-2 text-light-green mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-bold">🏙️ {userCity}</span>
                </div>
              )}
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-white font-bold text-sm">{userStats.level}</span>
              </div>
            </div>
          </div>
          
          {onEditClick && (
            <button
              onClick={onEditClick}
              className={`p-3 rounded-full transition-all ${
                isEditing 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-white mb-1">🪙 {userStats.coins}</div>
            <div className="text-sm font-bold text-light-green">NatureCoins</div>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-white mb-1">🔥 {userStats.currentStreak}</div>
            <div className="text-sm font-bold text-light-green">Day Streak</div>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-white mb-1">🏆 #{userRank}</div>
            <div className="text-sm font-bold text-light-green">Global Rank</div>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="mt-4 bg-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-sm">{userStats.level}</span>
            <span className="text-light-green font-bold text-sm">{userStats.nextLevel}</span>
          </div>
          <div className="bg-white/30 rounded-full h-2">
            <div 
              className="bg-yellow-accent rounded-full h-2 transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-white text-xs font-bold mt-2 text-center">
            🌟 {Math.max(0, getCoinsToNextLevel())} more coins to reach {userStats.nextLevel}! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
