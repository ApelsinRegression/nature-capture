
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, Medal, Trophy, MapPin, Users, Globe } from 'lucide-react';
import { userManager } from '../utils/userManager';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  city: string;
  isFriend: boolean;
  rank: number;
}

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'local' | 'global' | 'friends'>('local');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  const currentUser = userManager.getCurrentUser();
  const currentUserCity = currentUser?.city || 'New York';

  useEffect(() => {
    generateLeaderboardData();
  }, [activeTab]);

  const generateLeaderboardData = (): void => {
    let users = userManager.getAllUsers();
    const currentUserFriends = userManager.getFriends();
    const friendIds = currentUserFriends.map(f => f.id);

    if (activeTab === 'local') {
      users = userManager.getUsersByCity(currentUserCity);
    } else if (activeTab === 'friends') {
      users = currentUserFriends;
    }

    // Convert to leaderboard entries and sort by coins (highest first)
    const entries: LeaderboardEntry[] = users
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        coins: user.coins,
        city: user.city,
        isFriend: friendIds.includes(user.id),
        rank: 0
      }))
      .sort((a, b) => b.coins - a.coins) // Sort by coins descending
      .map((entry, index) => ({
        ...entry,
        rank: index + 1 // Assign rank based on sorted position
      }));

    console.log('Users before sorting:', users.map(u => ({ name: u.name, coins: u.coins })));
    console.log('Final leaderboard data (sorted by coins):', entries.map(e => ({ name: e.name, coins: e.coins, rank: e.rank })));
    setLeaderboardData(entries);
  };

  const handleUserClick = (user: LeaderboardEntry) => {
    // Navigate to user profile
    navigate('/profile', { 
      state: { 
        viewingUser: user,
        isPublicView: user.id !== currentUser?.id 
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
              <p className="text-light-green font-bold text-sm">See who has the most coins!</p>
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
                  {tab === 'local' ? currentUserCity : 
                   tab === 'global' ? 'Global' : 'Friends'}
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
                  <p className="font-black text-lg">
                    🪙 {user.coins}
                  </p>
                  <p className="text-xs font-bold opacity-80">coins</p>
                </div>
              </div>
            ))}
          </div>

          {leaderboardData.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏆</div>
              <p className="text-bright-green font-bold text-lg">No users yet</p>
              <p className="text-text-dark font-bold">
                {activeTab === 'local' 
                  ? `No users found in ${currentUserCity}` 
                  : activeTab === 'friends' 
                    ? 'Add some friends to see their progress!' 
                    : 'Be the first to join the leaderboard!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const handleUserClick = (user: LeaderboardEntry) => {
  const navigate = useNavigate();
  const currentUser = userManager.getCurrentUser();
  // Navigate to user profile
  navigate('/profile', { 
    state: { 
      viewingUser: user,
      isPublicView: user.id !== currentUser?.id 
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

export default LeaderboardPage;
