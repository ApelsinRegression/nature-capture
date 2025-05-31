
import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'Alex Green', coins: 2847, avatar: '🌿', badge: 'Forest Guardian' },
    { rank: 2, name: 'Sam Rivers', coins: 2340, avatar: '🏔️', badge: 'Mountain Explorer' },
    { rank: 3, name: 'Jordan Sky', coins: 1892, avatar: '🌊', badge: 'Ocean Walker' },
    { rank: 4, name: 'You', coins: 247, avatar: '🌱', badge: 'Nature Seeker', isUser: true },
    { rank: 5, name: 'Riley Stone', coins: 156, avatar: '🦋', badge: 'Butterfly Friend' }
  ];

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
        {leaderboardData.map((user) => (
          <div 
            key={user.rank}
            className={`flex items-center justify-between p-4 rounded-2xl ${
              user.isUser 
                ? 'bg-gradient-to-r from-yellow-accent to-orange-accent border-4 border-forest-green' 
                : 'bg-light-green'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center">
                {getRankIcon(user.rank)}
              </div>
              
              <div className="text-3xl">{user.avatar}</div>
              
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
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-text-dark">
          🎯 <span className="font-bold">2,600 coins</span> to next rank!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
