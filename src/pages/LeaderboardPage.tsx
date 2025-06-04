
import React, { useState } from 'react';
import { Trophy, Crown, Medal, Star, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  coins: number;
  streak: number;
  sessions: number;
  distance: number;
  photos: number;
  location: string;
  badges: string[];
}

const LeaderboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const leaderboardData: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Maya Forest',
      avatar: '🌳',
      coins: 1250,
      streak: 12,
      sessions: 34,
      distance: 127.5,
      photos: 89,
      location: 'Central Park, NY',
      badges: ['🏆', '🌟', '📸', '🥇']
    },
    {
      rank: 2,
      name: 'Alex Green',
      avatar: '🌿',
      coins: 1180,
      streak: 8,
      sessions: 28,
      distance: 98.2,
      photos: 67,
      location: 'Golden Gate Park, SF',
      badges: ['🥈', '🌟', '📸']
    },
    {
      rank: 3,
      name: 'Leo Sunshine',
      avatar: '☀️',
      coins: 1050,
      streak: 15,
      sessions: 31,
      distance: 112.8,
      photos: 74,
      location: 'Hyde Park, London',
      badges: ['🥉', '🔥', '🌟']
    },
    {
      rank: 4,
      name: 'Luna Star',
      avatar: '⭐',
      coins: 890,
      streak: 6,
      sessions: 22,
      distance: 76.4,
      photos: 45,
      location: 'Parc Güell, Barcelona',
      badges: ['🌟', '📸']
    },
    {
      rank: 5,
      name: 'River Flow',
      avatar: '🌊',
      coins: 750,
      streak: 4,
      sessions: 18,
      distance: 54.7,
      photos: 32,
      location: 'Riverside Trail, Portland',
      badges: ['🌟']
    },
    {
      rank: 6,
      name: 'You',
      avatar: '🍃',
      coins: 247,
      streak: 7,
      sessions: 23,
      distance: 45.2,
      photos: 28,
      location: 'Local Park',
      badges: ['🔥']
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-black text-bright-green">{rank}</span>;
    }
  };

  const getRankGradient = (rank: number, isCurrentUser: boolean = false) => {
    if (isCurrentUser) {
      return 'bg-gradient-to-r from-blue-400 to-purple-500';
    }
    
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-orange-600';
      default:
        return 'bg-gradient-to-r from-forest-green to-bright-green';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <h1 className="text-4xl font-nunito font-black text-white mb-2">🏆 Leaderboard 🏆</h1>
          <p className="text-light-green font-bold">🌟 See how you rank among nature explorers! 🌟</p>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-2 shadow-xl border-2 border-forest-green">
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'weekly', label: '📅 Weekly', emoji: '🗓️' },
              { key: 'monthly', label: '📆 Monthly', emoji: '🗓️' },
              { key: 'allTime', label: '🏆 All Time', emoji: '♾️' }
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`font-black py-3 rounded-2xl transition-all transform hover:scale-105 ${
                  selectedTab === tab.key
                    ? 'bg-forest-green text-white shadow-lg'
                    : 'bg-light-green text-bright-green hover:bg-bright-green hover:text-white'
                }`}
              >
                <span className="mr-1">{tab.emoji}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Current User Highlight */}
      <div className="px-4 mb-6">
        <div className={`${getRankGradient(6, true)} rounded-3xl p-4 shadow-xl border-4 border-white text-white`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🍃</span>
              </div>
              <div>
                <h3 className="text-xl font-black">Your Rank: #6</h3>
                <p className="font-bold opacity-90">Keep exploring to climb higher! 🚀</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">🪙 247</div>
              <div className="text-sm font-bold opacity-90">NatureCoins</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-white/20 rounded-xl p-2">
              <div className="text-lg font-black">🔥 7</div>
              <div className="text-xs font-bold">Streak</div>
            </div>
            <div className="bg-white/20 rounded-xl p-2">
              <div className="text-lg font-black">📊 23</div>
              <div className="text-xs font-bold">Sessions</div>
            </div>
            <div className="bg-white/20 rounded-xl p-2">
              <div className="text-lg font-black">📍 45km</div>
              <div className="text-xs font-bold">Distance</div>
            </div>
            <div className="bg-white/20 rounded-xl p-2">
              <div className="text-lg font-black">📸 28</div>
              <div className="text-xs font-bold">Photos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="px-4 space-y-3">
        {leaderboardData.map((user, index) => {
          const isCurrentUser = user.name === 'You';
          
          return (
            <div
              key={index}
              className={`bg-white rounded-3xl p-4 shadow-xl border-2 transition-all transform hover:scale-102 ${
                isCurrentUser 
                  ? 'border-blue-500 bg-blue-50' 
                  : user.rank <= 3 
                    ? 'border-yellow-accent' 
                    : 'border-light-green'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${getRankGradient(user.rank, isCurrentUser)} rounded-full flex items-center justify-center shadow-lg`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{user.avatar}</div>
                      <div className="flex justify-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-bright-green">
                      {user.name} {isCurrentUser && '(You)'}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-bold text-gray-600">{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {user.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="text-lg">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-bright-green">🪙 {user.coins}</div>
                  <div className="text-sm font-bold text-gray-600">NatureCoins</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-light-green rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-bright-green">🔥 {user.streak}</div>
                  <div className="text-xs font-bold text-gray-600">Day Streak</div>
                </div>
                <div className="bg-light-green rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-bright-green">📊 {user.sessions}</div>
                  <div className="text-xs font-bold text-gray-600">Sessions</div>
                </div>
                <div className="bg-light-green rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-bright-green">📍 {user.distance}km</div>
                  <div className="text-xs font-bold text-gray-600">Distance</div>
                </div>
                <div className="bg-light-green rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-bright-green">📸 {user.photos}</div>
                  <div className="text-xs font-bold text-gray-600">Photos</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Tips */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-forest-green">
          <h2 className="text-xl font-black text-bright-green mb-4 text-center">🌟 Climb the Leaderboard! 🌟</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">🚶‍♂️</span>
              <div>
                <p className="font-black text-bright-green text-sm">Daily Sessions</p>
                <p className="text-xs text-gray-600 font-bold">Complete outdoor activities daily for bonus coins!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">📸</span>
              <div>
                <p className="font-black text-bright-green text-sm">Nature Photography</p>
                <p className="text-xs text-gray-600 font-bold">Capture moments to earn extra points and badges!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-black text-bright-green text-sm">Maintain Streaks</p>
                <p className="text-xs text-gray-600 font-bold">Consistent activity brings multiplier bonuses!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
