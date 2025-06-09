
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, Medal, Trophy, MapPin, Users, Globe } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  city: string;
  isFriend: boolean;
  rank: number;
}

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'local' | 'global' | 'friends'>('local');

  const currentUserCity = localStorage.getItem('userCity') || 'New York';

  const generateLeaderboardData = (type: 'local' | 'global' | 'friends'): LeaderboardEntry[] => {
    const baseData = [
      { name: 'Alex Green', avatar: '🌿', city: 'New York', isFriend: true },
      { name: 'Maya Forest', avatar: '🌳', city: 'New York', isFriend: true },
      { name: 'Leo Sunshine', avatar: '☀️', city: 'San Francisco', isFriend: true },
      { name: 'Luna Star', avatar: '⭐', city: 'New York', isFriend: true },
      { name: 'River Blue', avatar: '🌊', city: 'Boston', isFriend: false },
      { name: 'Ocean Breeze', avatar: '🌊', city: 'Miami', isFriend: false },
      { name: 'Mountain Peak', avatar: '⛰️', city: 'Denver', isFriend: false },
      { name: 'Forest Walker', avatar: '🌲', city: 'Seattle', isFriend: false },
      { name: 'Sky Runner', avatar: '☁️', city: 'Portland', isFriend: false },
      { name: 'Earth Keeper', avatar: '🌍', city: 'Austin', isFriend: false },
      { name: 'Nature Lover', avatar: '🍃', city: 'Chicago', isFriend: false },
      { name: 'Sunset Chaser', avatar: '🌅', city: 'Los Angeles', isFriend: false },
      { name: 'Morning Dew', avatar: '💧', city: 'Atlanta', isFriend: false },
      { name: 'Wind Dancer', avatar: '💨', city: 'Phoenix', isFriend: false },
      { name: 'Rain Walker', avatar: '🌧️', city: 'Seattle', isFriend: false },
      { name: 'Sun Beam', avatar: '☀️', city: 'Miami', isFriend: false },
      { name: 'Moon Light', avatar: '🌙', city: 'Las Vegas', isFriend: false },
      { name: 'Star Gazer', avatar: '✨', city: 'Denver', isFriend: false },
      { name: 'Cloud Surfer', avatar: '☁️', city: 'San Francisco', isFriend: false },
      { name: 'Wave Rider', avatar: '🌊', city: 'San Diego', isFriend: false },
    ];

    let filteredData = [...baseData];

    if (type === 'local') {
      filteredData = baseData.filter(user => user.city === currentUserCity);
    } else if (type === 'friends') {
      filteredData = baseData.filter(user => user.isFriend);
    }

    // Generate random distances and sort
    const withDistances = filteredData.map((user, index) => ({
      ...user,
      id: `user-${index}`,
      distance: Math.random() * 50 + 10, // 10-60 km
      rank: 0
    }));

    // Sort by distance and assign ranks
    withDistances.sort((a, b) => b.distance - a.distance);
    withDistances.forEach((user, index) => {
      user.rank = index + 1;
    });

    return withDistances.slice(0, 20); // Return top 20
  };

  const leaderboardData = generateLeaderboardData(activeTab);

  const handleUserClick = (user: LeaderboardEntry) => {
    // Navigate to user profile with limited access
    navigate('/profile', { 
      state: { 
        viewingUser: user,
        isPublicView: !user.isFriend 
      } 
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="text-lg font-black text-forest-green">#{rank}</span>;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'local':
        return <MapPin className="w-4 h-4" />;
      case 'global':
        return <Globe className="w-4 h-4" />;
      case 'friends':
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              onClick={() => navigate('/')}
              className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-nunito font-black text-white">🏆 Leaderboard 🏆</h1>
              <p className="text-light-green font-bold text-sm">See who's leading the nature adventure!</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-3 gap-2 bg-white/20 rounded-2xl p-2">
            {(['local', 'global', 'friends'] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-black py-2 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  activeTab === tab
                    ? 'bg-white text-bright-green shadow-lg'
                    : 'bg-transparent text-white hover:bg-white/10'
                }`}
              >
                {getTabIcon(tab)}
                <span className="capitalize">
                  {tab === 'local' ? `🏙️ ${currentUserCity}` : 
                   tab === 'global' ? '🌍 Global' : '👥 Friends'}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-bright-green">
          <div className="space-y-3">
            {leaderboardData.map((user, index) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                  index < 3
                    ? 'bg-gradient-to-r from-yellow-accent to-orange-accent text-white'
                    : 'bg-light-green hover:bg-bright-green hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="text-3xl">{user.avatar}</div>
                  <div>
                    <p className="font-black text-lg">{user.name}</p>
                    <div className="flex items-center space-x-2 text-sm font-bold opacity-80">
                      <MapPin className="w-3 h-3" />
                      <span>{user.city}</span>
                      {user.isFriend && <span className="text-green-600">👥 Friend</span>}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-black text-lg">{user.distance.toFixed(1)}</p>
                  <p className="text-xs font-bold opacity-80">km walked</p>
                </div>
              </div>
            ))}
          </div>

          {leaderboardData.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-bright-green font-bold text-lg">No data available</p>
              <p className="text-text-dark font-bold">
                {activeTab === 'local' 
                  ? `No users found in ${currentUserCity}` 
                  : activeTab === 'friends' 
                    ? 'Add some friends to see their progress!' 
                    : 'Loading global leaderboard...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
