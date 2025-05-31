
import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, Users, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LeaderboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'friends' | 'local' | 'global'>('global');
  const [showProfile, setShowProfile] = useState<number | null>(null);

  const leaderboardData = [
    { rank: 1, name: 'Alex Green', coins: 2847, avatar: '🌿', badge: 'Forest Guardian', isTop: true, location: '0.5km away', status: 'online' },
    { rank: 2, name: 'Sam Rivers', coins: 2340, avatar: '🏔️', badge: 'Mountain Explorer', isTop: true, location: '1.2km away', status: 'online' },
    { rank: 3, name: 'Jordan Sky', coins: 1892, avatar: '🌊', badge: 'Ocean Walker', isTop: true, location: '2.1km away', status: 'offline' },
    { rank: 4, name: 'You', coins: 247, avatar: '🌱', badge: 'Nature Seeker', isUser: true, location: 'Current', status: 'online' },
    { rank: 5, name: 'Riley Stone', coins: 156, avatar: '🦋', badge: 'Butterfly Friend', location: '0.8km away', status: 'walking' },
    { rank: 6, name: 'Casey Dawn', coins: 98, avatar: '🌸', badge: 'Flower Finder', location: '3.5km away', status: 'online' },
  ];

  const groupActivities = [
    { id: 1, type: 'Hiking', title: 'Morning Mountain Trail', time: '8:00 AM', participants: 12, difficulty: 'Medium', location: 'Green Valley Park' },
    { id: 2, type: 'Yoga', title: 'Sunrise Yoga in Park', time: '6:30 AM', participants: 8, difficulty: 'Easy', location: 'Central Park' },
    { id: 3, type: 'Jogging', title: 'Evening River Run', time: '6:00 PM', participants: 15, difficulty: 'Hard', location: 'Riverside Trail' },
  ];

  const filterLabels = {
    friends: '👥 Friends',
    local: '📍 Local',
    global: '🌍 Global'
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'walking': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  if (showProfile) {
    const user = leaderboardData.find(u => u.rank === showProfile);
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
        <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
          <Button 
            onClick={() => setShowProfile(null)}
            className="mb-4 bg-white text-forest-green hover:bg-light-green font-bold rounded-full px-6 py-2"
          >
            ← Back
          </Button>
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-yellow-accent relative">
              <span className="text-4xl">{user?.avatar}</span>
              <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${getStatusColor(user?.status || '')}`}></div>
            </div>
            <h1 className="text-3xl font-nunito font-black text-white mb-2 animate-bounce-in">
              {user?.name}
            </h1>
            <p className="text-light-green text-lg font-bold">{user?.badge}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="bg-yellow-accent rounded-full px-4 py-2">
                <span className="font-black text-bright-green">🪙 {user?.coins}</span>
              </div>
              <div className="bg-white rounded-full px-4 py-2">
                <span className="font-black text-forest-green">#{user?.rank}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-4">
          <Button className="w-full bg-gradient-to-r from-yellow-accent to-orange-accent text-white font-black py-4 rounded-3xl text-xl shadow-xl transform transition-all hover:scale-105 animate-pulse">
            <Calendar className="w-6 h-6 mr-3" />
            Invite for Nature Walk
          </Button>
          
          <Button className="w-full bg-light-green text-bright-green font-black py-4 rounded-3xl text-xl hover:bg-bright-green hover:text-white transition-all">
            <MessageCircle className="w-6 h-6 mr-3" />
            Send Message
          </Button>

          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
            <h3 className="text-xl font-black text-bright-green mb-4">📊 Their Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-forest-green">47</div>
                <div className="text-sm font-bold text-text-dark">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-forest-green">23.5h</div>
                <div className="text-sm font-bold text-text-dark">Outside Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
              alt="Trees" 
              className="w-16 h-16 animate-bounce"
            />
          </div>
          <h1 className="text-4xl font-nunito font-black text-white mb-2 animate-fade-in">
            🏆 Nature Champions
          </h1>
          <p className="text-light-green font-bold text-lg">Connect & Compete!</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-2 shadow-xl border-4 border-light-green">
          <div className="flex space-x-1">
            {Object.entries(filterLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key as any)}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-lg transition-all transform ${
                  activeFilter === key
                    ? 'bg-gradient-to-r from-forest-green to-bright-green text-white shadow-lg scale-105'
                    : 'text-forest-green hover:bg-light-green hover:scale-102'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Group Activities */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <h2 className="text-2xl font-black text-bright-green mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            🚶 Group Activities
          </h2>
          <div className="space-y-3">
            {groupActivities.map((activity) => (
              <div key={activity.id} className="bg-gradient-to-r from-light-green to-white rounded-2xl p-4 border-3 border-forest-green">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-forest-green text-white px-3 py-1 rounded-full text-sm font-black">
                        {activity.type}
                      </span>
                      <span className="text-sm font-bold text-text-dark">{activity.difficulty}</span>
                    </div>
                    <h3 className="font-black text-bright-green text-lg">{activity.title}</h3>
                    <p className="text-sm font-bold text-text-dark">📍 {activity.location}</p>
                    <p className="text-sm font-bold text-forest-green">⏰ {activity.time} • 👥 {activity.participants} joined</p>
                  </div>
                  <Button className="bg-yellow-accent text-bright-green font-black rounded-full px-6 py-2 hover:bg-bright-green hover:text-white transition-all transform hover:scale-105">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-end justify-center space-x-4">
            {/* 2nd Place */}
            <div className="text-center animate-scale-in">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-2 relative">
                <span className="text-2xl">{leaderboardData[1].avatar}</span>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(leaderboardData[1].status)}`}></div>
              </div>
              <div className="bg-gray-400 rounded-t-2xl px-4 py-6 h-20">
                <Medal className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white font-black text-sm">2nd</p>
              </div>
              <p className="font-black text-sm mt-2">{leaderboardData[1].name}</p>
            </div>

            {/* 1st Place */}
            <div className="text-center animate-bounce-in">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-2 border-4 border-yellow-accent relative">
                <span className="text-3xl">{leaderboardData[0].avatar}</span>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(leaderboardData[0].status)}`}></div>
              </div>
              <div className="bg-yellow-500 rounded-t-2xl px-6 py-8 h-24">
                <Crown className="w-8 h-8 text-white mx-auto mb-1" />
                <p className="text-white font-black">1st</p>
              </div>
              <p className="font-black mt-2">{leaderboardData[0].name}</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center animate-scale-in">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-2 relative">
                <span className="text-2xl">{leaderboardData[2].avatar}</span>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(leaderboardData[2].status)}`}></div>
              </div>
              <div className="bg-orange-400 rounded-t-2xl px-4 py-6 h-16">
                <Award className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white font-black text-sm">3rd</p>
              </div>
              <p className="font-black text-sm mt-2">{leaderboardData[2].name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="px-6">
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div 
              key={user.rank}
              onClick={() => !user.isUser && setShowProfile(user.rank)}
              className={`rounded-3xl p-4 border-3 transition-all transform hover:scale-102 cursor-pointer animate-fade-in ${
                user.isUser 
                  ? 'bg-gradient-to-r from-yellow-accent to-orange-accent border-forest-green shadow-xl' 
                  : user.isTop
                  ? 'bg-white border-yellow-accent shadow-lg hover:shadow-xl'
                  : 'bg-white border-light-green hover:border-forest-green'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className={`text-4xl p-2 rounded-full relative ${user.isUser ? 'bg-white' : 'bg-light-green'}`}>
                    {user.avatar}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
                  </div>
                  
                  <div>
                    <p className={`font-black text-xl ${user.isUser ? 'text-white' : 'text-bright-green'}`}>
                      {user.name}
                    </p>
                    <p className={`text-sm font-bold ${user.isUser ? 'text-white' : 'text-text-dark'}`}>
                      {user.badge}
                    </p>
                    <p className={`text-xs font-bold ${user.isUser ? 'text-white' : 'text-forest-green'}`}>
                      📍 {user.location}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-black text-xl ${user.isUser ? 'text-white' : 'text-forest-green'}`}>
                    🪙 {user.coins.toLocaleString()}
                  </div>
                  {!user.isUser && (
                    <div className="flex space-x-1 mt-2">
                      <button className="bg-forest-green text-white rounded-full p-2 hover:scale-110 transition-transform">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="bg-yellow-accent text-bright-green rounded-full p-2 hover:scale-110 transition-transform">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="bg-white rounded-2xl p-4 border-3 border-light-green">
            <p className="text-text-dark font-bold text-lg">
              🎯 <span className="font-black text-forest-green text-xl">2,600 coins</span> to next rank!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
