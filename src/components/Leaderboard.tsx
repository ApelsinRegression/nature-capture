
import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import UserDataManager from '../utils/userDataManager';

const Leaderboard: React.FC = () => {
  const userDataManager = UserDataManager.getInstance();
  const leaderboardData = userDataManager.getLeaderboardData();
  const currentUser = userDataManager.getCurrentUser();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <div className="w-6 h-6 rounded-full bg-forest-green text-white flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        🏆 Nature Champions
      </h2>
      
      <div className="space-y-3">
        {leaderboardData.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-bright-green font-bold text-lg">No champions yet!</p>
            <p className="text-text-dark font-bold">Start your nature journey to appear on the leaderboard!</p>
          </div>
        ) : (
          leaderboardData.map((user) => (
            <div 
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-2xl relative ${
                user.id === currentUser?.id
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
                  <p className={`font-bold text-lg ${user.id === currentUser?.id ? 'text-white' : 'text-bright-green'}`}>
                    {user.username}
                  </p>
                  <p className={`text-sm ${user.id === currentUser?.id ? 'text-white' : 'text-text-dark'}`}>
                    {user.level}
                  </p>
                </div>
              </div>
              
              <div className={`font-bold text-lg ${user.id === currentUser?.id ? 'text-white' : 'text-forest-green'}`}>
                🪙 {user.coins}
              </div>
            </div>
          ))
        )}
      </div>
      
      {currentUser && (
        <div className="mt-4 text-center">
          <p className="text-sm text-text-dark">
            🎯 Keep exploring to earn more coins!
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
