
import React, { useState } from 'react';
import { Trophy, Crown, Medal, Star, MapPin, Camera, ArrowLeft, UserPlus } from 'lucide-react';
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
  city: string;
  badges: string[];
  isFriend: boolean;
}

interface UserProfile {
  name: string;
  avatar: string;
  city: string;
  coins: number;
  streak: number;
  sessions: number;
  distance: number;
  photos: number;
  badges: string[];
  isFriend: boolean;
  joinDate: string;
  level: string;
}

const LeaderboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'local' | 'global' | 'friends'>('global');
  const [viewingProfile, setViewingProfile] = useState<UserProfile | null>(null);
  const [friends, setFriends] = useState<string[]>(() => {
    const savedFriends = JSON.parse(localStorage.getItem('friends') || '[]');
    return savedFriends.map((f: any) => f.name);
  });

  const currentUserCity = localStorage.getItem('userCity') || 'New York';
  
  // Extended leaderboard data with 20 users
  const allUsers: LeaderboardUser[] = [
    { rank: 1, name: 'Maya Forest', avatar: '🌳', coins: 1250, streak: 12, sessions: 34, distance: 127.5, photos: 89, location: 'Central Park, NY', city: 'New York', badges: ['🏆', '🌟', '📸', '🥇'], isFriend: true },
    { rank: 2, name: 'Alex Green', avatar: '🌿', coins: 1180, streak: 8, sessions: 28, distance: 98.2, photos: 67, location: 'Golden Gate Park, SF', city: 'San Francisco', badges: ['🥈', '🌟', '📸'], isFriend: true },
    { rank: 3, name: 'Leo Sunshine', avatar: '☀️', coins: 1050, streak: 15, sessions: 31, distance: 112.8, photos: 74, location: 'Hyde Park, London', city: 'London', badges: ['🥉', '🔥', '🌟'], isFriend: true },
    { rank: 4, name: 'Luna Star', avatar: '⭐', coins: 890, streak: 6, sessions: 22, distance: 76.4, photos: 45, location: 'Parc Güell, Barcelona', city: 'Barcelona', badges: ['🌟', '📸'], isFriend: true },
    { rank: 5, name: 'River Flow', avatar: '🌊', coins: 750, streak: 4, sessions: 18, distance: 54.7, photos: 32, location: 'Riverside Trail, Portland', city: 'Portland', badges: ['🌟'], isFriend: false },
    { rank: 6, name: 'You', avatar: '🍃', coins: 247, streak: 7, sessions: 23, distance: 45.2, photos: 28, location: 'Local Park', city: currentUserCity, badges: ['🔥'], isFriend: false },
    { rank: 7, name: 'Ocean Wave', avatar: '🌊', coins: 720, streak: 9, sessions: 25, distance: 89.3, photos: 56, location: 'Santa Monica Beach, CA', city: 'Los Angeles', badges: ['🌟', '📸'], isFriend: false },
    { rank: 8, name: 'Mountain Peak', avatar: '⛰️', coins: 680, streak: 11, sessions: 19, distance: 95.1, photos: 42, location: 'Rocky Mountain Trail, CO', city: 'Denver', badges: ['🏔️', '🌟'], isFriend: false },
    { rank: 9, name: 'Forest Walker', avatar: '🌲', coins: 650, streak: 5, sessions: 21, distance: 67.8, photos: 38, location: 'Redwood Forest, CA', city: 'San Francisco', badges: ['🌲'], isFriend: true },
    { rank: 10, name: 'Sky Dancer', avatar: '☁️', coins: 620, streak: 8, sessions: 17, distance: 52.4, photos: 29, location: 'Empire State Building, NY', city: 'New York', badges: ['☁️'], isFriend: false },
    { rank: 11, name: 'Earth Guardian', avatar: '🌍', coins: 590, streak: 12, sessions: 20, distance: 78.9, photos: 51, location: 'Central Park, NY', city: 'New York', badges: ['🌍', '🌟'], isFriend: false },
    { rank: 12, name: 'Wind Dancer', avatar: '💨', coins: 560, streak: 6, sessions: 16, distance: 43.7, photos: 24, location: 'Brooklyn Bridge, NY', city: 'New York', badges: ['💨'], isFriend: false },
    { rank: 13, name: 'Sun Chaser', avatar: '🌞', coins: 530, streak: 10, sessions: 18, distance: 61.2, photos: 35, location: 'Golden Gate Bridge, SF', city: 'San Francisco', badges: ['🌞'], isFriend: false },
    { rank: 14, name: 'Moon Walker', avatar: '🌙', coins: 500, streak: 4, sessions: 15, distance: 38.6, photos: 21, location: 'Times Square, NY', city: 'New York', badges: ['🌙'], isFriend: false },
    { rank: 15, name: 'Star Gazer', avatar: '✨', coins: 470, streak: 7, sessions: 14, distance: 45.3, photos: 27, location: 'Prospect Park, NY', city: 'New York', badges: ['✨'], isFriend: false },
    { rank: 16, name: 'Cloud Surfer', avatar: '⛅', coins: 440, streak: 5, sessions: 12, distance: 34.8, photos: 18, location: 'High Line, NY', city: 'New York', badges: ['⛅'], isFriend: false },
    { rank: 17, name: 'Rain Walker', avatar: '🌧️', coins: 410, streak: 8, sessions: 13, distance: 41.2, photos: 22, location: 'Battery Park, NY', city: 'New York', badges: ['🌧️'], isFriend: false },
    { rank: 18, name: 'Snow Explorer', avatar: '❄️', coins: 380, streak: 3, sessions: 11, distance: 29.7, photos: 15, location: 'Madison Square Park, NY', city: 'New York', badges: ['❄️'], isFriend: false },
    { rank: 19, name: 'Fire Spirit', avatar: '🔥', coins: 350, streak: 6, sessions: 10, distance: 32.4, photos: 17, location: 'Washington Square Park, NY', city: 'New York', badges: ['🔥'], isFriend: false },
    { rank: 20, name: 'Ice Crystal', avatar: '💎', coins: 320, streak: 4, sessions: 9, distance: 26.1, photos: 12, location: 'Union Square, NY', city: 'New York', badges: ['💎'], isFriend: false },
  ];

  const getFilteredUsers = () => {
    let filtered = [...allUsers];
    
    switch (selectedTab) {
      case 'local':
        filtered = filtered.filter(user => user.city === currentUserCity);
        break;
      case 'friends':
        filtered = filtered.filter(user => friends.includes(user.name) || user.name === 'You');
        break;
      case 'global':
      default:
        // Show all users
        break;
    }
    
    // Re-rank after filtering
    return filtered.map((user, index) => ({ ...user, rank: index + 1 })).slice(0, 20);
  };

  const leaderboardData = getFilteredUsers();

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

  const handleUserClick = (user: LeaderboardUser) => {
    if (user.name === 'You') return; // Don't show profile for current user
    
    const profile: UserProfile = {
      name: user.name,
      avatar: user.avatar,
      city: user.city,
      coins: user.coins,
      streak: user.streak,
      sessions: user.sessions,
      distance: user.distance,
      photos: user.photos,
      badges: user.badges,
      isFriend: user.isFriend,
      joinDate: 'March 2024',
      level: user.coins > 1000 ? 'Nature Master' : user.coins > 500 ? 'Forest Friend' : 'Nature Seeker'
    };
    
    setViewingProfile(profile);
  };

  const sendFriendRequest = (userName: string) => {
    alert(`🌟 Friend request sent to ${userName}! 🌟`);
  };

  const addFriend = (userName: string) => {
    const updatedFriends = [...friends, userName];
    setFriends(updatedFriends);
    
    // Update localStorage
    const savedFriends = JSON.parse(localStorage.getItem('friends') || '[]');
    const newFriend = allUsers.find(u => u.name === userName);
    if (newFriend) {
      savedFriends.push({
        id: Date.now().toString(),
        name: newFriend.name,
        avatar: newFriend.avatar,
        status: 'online',
        lastSeen: 'Active now',
        isFriend: true
      });
      localStorage.setItem('friends', JSON.stringify(savedFriends));
    }
    
    alert(`🎉 ${userName} is now your friend! 🎉`);
    setViewingProfile(null);
  };

  if (viewingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
        <div className="bg-white rounded-b-3xl mx-4 mb-6 shadow-xl">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button 
                onClick={() => setViewingProfile(null)}
                className="bg-forest-green text-white rounded-full p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-black text-bright-green">{viewingProfile.name}'s Profile</h2>
                <p className="text-sm text-gray-600">📍 {viewingProfile.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
                {viewingProfile.avatar}
              </div>
              <div>
                <h3 className="text-2xl font-black">{viewingProfile.name}</h3>
                <p className="font-bold opacity-90">{viewingProfile.level}</p>
                <p className="text-sm opacity-75">Joined {viewingProfile.joinDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-black">🪙 {viewingProfile.coins}</div>
                <div className="text-sm font-bold">NatureCoins</div>
              </div>
              <div className="bg-white/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-black">📍 {viewingProfile.city}</div>
                <div className="text-sm font-bold">Home City</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green">
            <h3 className="text-lg font-black text-bright-green mb-4">📊 Activity Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-light-green rounded-xl p-3 text-center">
                <div className="text-lg font-black text-bright-green">🔥 {viewingProfile.streak}</div>
                <div className="text-xs font-bold text-gray-600">Day Streak</div>
              </div>
              <div className="bg-light-green rounded-xl p-3 text-center">
                <div className="text-lg font-black text-bright-green">📊 {viewingProfile.sessions}</div>
                <div className="text-xs font-bold text-gray-600">Sessions</div>
              </div>
              <div className="bg-light-green rounded-xl p-3 text-center">
                <div className="text-lg font-black text-bright-green">📍 {viewingProfile.distance}km</div>
                <div className="text-xs font-bold text-gray-600">Distance</div>
              </div>
              <div className="bg-light-green rounded-xl p-3 text-center">
                <div className="text-lg font-black text-bright-green">📸 {viewingProfile.photos}</div>
                <div className="text-xs font-bold text-gray-600">Photos</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
            <h3 className="text-lg font-black text-bright-green mb-4">🏆 Badges</h3>
            <div className="flex flex-wrap gap-2">
              {viewingProfile.badges.map((badge, index) => (
                <div key={index} className="bg-light-green rounded-full px-3 py-2">
                  <span className="text-2xl">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Friend Actions */}
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-forest-green">
            <h3 className="text-lg font-black text-bright-green mb-4">👥 Connect</h3>
            {viewingProfile.isFriend ? (
              <div className="text-center py-4">
                <p className="text-bright-green font-bold mb-4">🎉 You are friends! 🎉</p>
                <p className="text-gray-600 text-sm">You can view their full activity history and send messages.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm text-center">
                  Add {viewingProfile.name} as a friend to see their calendar, walking history, and photos!
                </p>
                <Button
                  onClick={() => addFriend(viewingProfile.name)}
                  className="w-full bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Friend
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              { key: 'local', label: '🏘️ Local', emoji: '🏘️' },
              { key: 'global', label: '🌍 Global', emoji: '🌍' },
              { key: 'friends', label: '👥 Friends', emoji: '👥' }
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
      {leaderboardData.find(user => user.name === 'You') && (
        <div className="px-4 mb-6">
          <div className={`${getRankGradient(6, true)} rounded-3xl p-4 shadow-xl border-4 border-white text-white`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍃</span>
                </div>
                <div>
                  <h3 className="text-xl font-black">Your Rank: #{leaderboardData.find(user => user.name === 'You')?.rank}</h3>
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
      )}

      {/* Leaderboard List */}
      <div className="px-4 space-y-3">
        {leaderboardData.map((user, index) => {
          const isCurrentUser = user.name === 'You';
          
          return (
            <div
              key={index}
              onClick={() => handleUserClick(user)}
              className={`bg-white rounded-3xl p-4 shadow-xl border-2 transition-all transform ${
                isCurrentUser 
                  ? 'border-blue-500 bg-blue-50' 
                  : user.rank <= 3 
                    ? 'border-yellow-accent hover:scale-102 cursor-pointer' 
                    : 'border-light-green hover:scale-102 cursor-pointer'
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
                      <span className="font-bold text-gray-600">{user.city}</span>
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
