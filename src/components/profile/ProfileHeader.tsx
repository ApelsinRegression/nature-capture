
import React from 'react';
import { Edit, MapPin, Leaf } from 'lucide-react';

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
  // Calculate coins needed for next level
  const getCoinsForNextLevel = (currentCoins: number) => {
    const levels = [
      { name: 'Nature Seeker', minCoins: 0, nextLevel: 'Forest Friend', nextCoins: 100 },
      { name: 'Forest Friend', minCoins: 100, nextLevel: 'Tree Hugger', nextCoins: 250 },
      { name: 'Tree Hugger', minCoins: 250, nextLevel: 'Nature Guardian', nextCoins: 500 },
      { name: 'Nature Guardian', minCoins: 500, nextLevel: 'Eco Master', nextCoins: 1000 },
      { name: 'Eco Master', minCoins: 1000, nextLevel: 'Planet Protector', nextCoins: 2000 },
      { name: 'Planet Protector', minCoins: 2000, nextLevel: 'Max Level', nextCoins: 2000 },
    ];
    
    const currentLevel = levels.find(level => currentCoins >= level.minCoins && currentCoins < level.nextCoins);
    if (currentLevel) {
      return currentLevel.nextCoins - currentCoins;
    }
    return 0;
  };

  const coinsNeeded = getCoinsForNextLevel(userStats.coins);
  const progressPercent = userStats.coins === 0 ? 0 : Math.min((userStats.coins / (userStats.coins + coinsNeeded)) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-8 shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
              {selectedEmoji}
            </div>
            <div>
              <h2 className="text-3xl font-nunito font-black text-white mb-2">{userName}</h2>
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
            <div className="text-2xl font-black text-white mb-1">🏆 #{userStats.rank}</div>
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
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-white text-xs font-bold mt-2 text-center">
            {coinsNeeded > 0 ? `${coinsNeeded} more coins to reach ${userStats.nextLevel}!` : `You've reached ${userStats.level}!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
