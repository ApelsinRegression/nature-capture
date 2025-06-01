
import React from 'react';

interface Badge {
  name: string;
  emoji: string;
  unlocked: boolean;
}

interface ProfileBadgesProps {
  badges: Badge[];
}

const ProfileBadges: React.FC<ProfileBadgesProps> = ({ badges }) => {
  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
        <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
          🏅 Achievement Badges 🏅
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-2xl transition-all hover:scale-105 ${
                badge.unlocked 
                  ? 'bg-gradient-to-br from-yellow-accent to-light-green' 
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{badge.emoji}</div>
              <div className={`text-xs font-bold ${badge.unlocked ? 'text-bright-green' : 'text-gray-400'}`}>
                {badge.name}
              </div>
              {badge.unlocked && <div className="text-xs text-forest-green mt-1">✅</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBadges;
