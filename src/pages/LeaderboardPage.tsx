
import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'Alex Green', coins: 2847, avatar: '🌿', badge: 'Forest Guardian', isTop: true },
    { rank: 2, name: 'Sam Rivers', coins: 2340, avatar: '🏔️', badge: 'Mountain Explorer', isTop: true },
    { rank: 3, name: 'Jordan Sky', coins: 1892, avatar: '🌊', badge: 'Ocean Walker', isTop: true },
    { rank: 4, name: 'You', coins: 247, avatar: '🌱', badge: 'Nature Seeker', isUser: true },
    { rank: 5, name: 'Riley Stone', coins: 156, avatar: '🦋', badge: 'Butterfly Friend' },
    { rank: 6, name: 'Casey Dawn', coins: 98, avatar: '🌸', badge: 'Flower Finder' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2: return <Medal className="w-7 h-7 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return (
        <div className="w-8 h-8 rounded-full bg-forest-green text-white flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
              alt="Trees" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-3xl font-nunito font-bold text-white mb-2">
            🏆 Nature Champions
          </h1>
          <p className="text-light-green">See who's leading the pack!</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-end justify-center space-x-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">{leaderboardData[1].avatar}</span>
              </div>
              <div className="bg-gray-400 rounded-t-2xl px-4 py-6 h-20">
                <Medal className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white font-bold text-sm">2nd</p>
              </div>
              <p className="font-bold text-sm mt-2">{leaderboardData[1].name}</p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2 border-4 border-yellow-accent">
                <span className="text-3xl">{leaderboardData[0].avatar}</span>
              </div>
              <div className="bg-yellow-500 rounded-t-2xl px-6 py-8 h-24">
                <Crown className="w-8 h-8 text-white mx-auto mb-1" />
                <p className="text-white font-bold">1st</p>
              </div>
              <p className="font-bold mt-2">{leaderboardData[0].name}</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">{leaderboardData[2].avatar}</span>
              </div>
              <div className="bg-orange-400 rounded-t-2xl px-4 py-6 h-16">
                <Award className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white font-bold text-sm">3rd</p>
              </div>
              <p className="font-bold text-sm mt-2">{leaderboardData[2].name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="px-6">
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div 
              key={user.rank}
              className={`rounded-3xl p-4 border-3 transition-all ${
                user.isUser 
                  ? 'bg-gradient-to-r from-yellow-accent to-orange-accent border-forest-green shadow-xl' 
                  : user.isTop
                  ? 'bg-white border-yellow-accent shadow-lg'
                  : 'bg-white border-light-green'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className={`text-4xl p-2 rounded-full ${user.isUser ? 'bg-white' : 'bg-light-green'}`}>
                    {user.avatar}
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
                  🪙 {user.coins.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green">
            <p className="text-text-dark">
              🎯 <span className="font-bold text-forest-green">2,600 coins</span> to next rank!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
