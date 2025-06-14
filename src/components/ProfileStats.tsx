
import React from 'react';
import { Calendar, Target } from 'lucide-react';
import { userManager } from '../utils/userManager';

interface UserStats {
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  badges: number;
}

interface ProfileStatsProps {
  userStats?: UserStats;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ userStats }) => {
  const currentUser = userManager.getCurrentUser();
  
  // Always use real data from userManager
  const stats = currentUser ? {
    totalSessions: currentUser.totalSessions,
    totalHours: Math.floor(currentUser.totalHours * 10) / 10, // Round to 1 decimal
    currentStreak: currentUser.currentStreak,
    badges: currentUser.badges
  } : (userStats || {
    totalSessions: 0,
    totalHours: 0,
    currentStreak: 0,
    badges: 0
  });

  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
        <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
          📊 Your Journey Stats 📊
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-bright-green">{stats.totalSessions}</div>
            <div className="text-sm font-bold text-text-dark">Sessions 📈</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-bright-green rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{stats.totalHours}</span>
            </div>
            <div className="text-2xl font-bold text-bright-green">{stats.totalHours}h</div>
            <div className="text-sm font-bold text-text-dark">Hours ⏰</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
              <Target className="w-8 h-8 text-bright-green" />
            </div>
            <div className="text-2xl font-bold text-bright-green">{stats.currentStreak}</div>
            <div className="text-sm font-bold text-text-dark">Day Streak 🔥</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-accent rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{stats.badges}</span>
            </div>
            <div className="text-2xl font-bold text-bright-green">{stats.badges}</div>
            <div className="text-sm font-bold text-text-dark">Badges 🏅</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
