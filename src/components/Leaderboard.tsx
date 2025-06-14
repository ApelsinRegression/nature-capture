
import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { userManager } from '../utils/userManager';

interface LeaderboardUser {
  rank: number;
  name: string;
  coins: number;
  avatar: string;
  badge: string;
  isUser: boolean;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    generateLeaderboardData();
  }, []);

  const generateLeaderboardData = () => {
    const allUsers = userManager.getAllUsers();
    const currentUser = userManager.getCurrentUser();
    
    // Sort users by coins
    const sortedUsers = allUsers.sort((a, b) => b.coins - a.coins);
    
    // Take top 5 users
    const topUsers = sortedUsers.slice(0, 5);
    
    const leaderboard: LeaderboardUser[] = topUsers.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      coins: user.coins,
      avatar: user.avatar,
      badge: user.level,
      isUser: user.id === currentUser?.id
    }));

    setLeaderboardData(leaderboard);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <div className="w-6 h-6 rounded-full bg-forest-green text-white flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getCoinsToNextRank = () => {
    const currentUser = userManager.getCurrentUser();
    if (!currentUser) return 0;
    
    const allUsers = userManager.getAllUsers();
    const sortedUsers = allUsers.sort((a, b) => b.coins - a.coins);
    const currentUserIndex = sortedUsers.findIndex(u => u.id === currentUser.id);
    
    if (currentUserIndex === 0) return 0; // Already first
    if (currentUserIndex === -1) return 100; // Not found, default
    
    const nextUser = sortedUsers[currentUserIndex - 1];
    return Math.max(0, nextUser.coins - currentUser.coins + 1);
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        🏆 Nature Champions
      </h2>
      
      <div className="space-y-3">
        {leaderboardData.length > 0 ? (
          leaderboardData.map((user) => (
            <div 
              key={user.rank}
              className={`flex items-center justify-between p-4 rounded-2xl relative ${
                user.isUser 
                  ? 'bg-gradient-to-r from-yellow-accent to-orange-accent border-4 border-forest-green' 
                  : 'bg-light-green'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="relative">
                  <div className="text-3xl relative z-10">{user.avatar}</div>
                </div>
                
                <div>
                  <p className={`font-bold text-lg ${user.isUser ? 'text-white' : 'text-bright-green'}`}>
                    {user.name}
                  </p>
                  <p className={`text-sm ${user.isUser ? 'text-white' : 'text-text-dark'}`}>
                    {user.badge}
                  </p>
                </div>
              </div>
              
              <div className={`font-bold text-lg ${user.isUser ? 'text-white' : 'text-forest-green'}`}>
                🪙 {user.coins}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-bright-green font-bold">No users yet</p>
            <p className="text-text-dark text-sm">Start walking to appear on the leaderboard!</p>
          </div>
        )}
      </div>
      
      {leaderboardData.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-text-dark">
            🎯 <span className="font-bold">{getCoinsToNextRank()} coins</span> to next rank!
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
