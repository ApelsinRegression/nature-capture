
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, Star, Calendar, Target, Trophy, Edit, MessageSquare, Users, X } from 'lucide-react';

interface ProfilePageProps {
  onLogout: () => void;
}

interface WalkingSession {
  date: string;
  distance: number;
  time: number;
  route: any[];
  photos: any[];
  comments: any[];
  feeling: number;
  activities: string[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Nature Explorer');
  const [userBio, setUserBio] = useState('🌱 Nature enthusiast spreading green vibes! 🌿');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [joinedActivities, setJoinedActivities] = useState<any[]>([]);
  const [walkingSessions, setWalkingSessions] = useState<WalkingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<WalkingSession | null>(null);
  const [tempUserName, setTempUserName] = useState(userName);
  
  const userStats = {
    totalSessions: 23,
    totalHours: 12.5,
    currentStreak: 7,
    badges: 8,
    level: 'Nature Seeker',
    nextLevel: 'Forest Friend',
    coins: 247,
    rank: 4
  };

  const natureEmojis = ['🌱', '🌿', '🌳', '🍃', '🌺', '🌻', '🌷', '🌸', '🌼', '🌹', '🦋', '🐝', '🐞', '🦅', '🐿️', '🍄', '⭐', '🌙', '☀️', '🌈'];

  const friends = [
    { name: 'Alex Green', emoji: '🌿', status: 'online', lastSeen: 'Active now 🟢' },
    { name: 'Maya Forest', emoji: '🌳', status: 'offline', lastSeen: '2 hours ago 🟡' },
    { name: 'Leo Sunshine', emoji: '☀️', status: 'online', lastSeen: 'Active now 🟢' },
    { name: 'Luna Star', emoji: '⭐', status: 'offline', lastSeen: '1 day ago 🔴' },
    { name: 'River Blue', emoji: '🌊', status: 'online', lastSeen: 'Active now 🟢' },
  ];

  const calendarData = Array.from({ length: 30 }, (_, i) => {
    const session = walkingSessions.find(s => {
      const sessionDate = new Date(s.date);
      const calendarDate = new Date();
      calendarDate.setDate(calendarDate.getDate() - (29 - i));
      return sessionDate.toDateString() === calendarDate.toDateString();
    });
    
    return {
      day: i + 1,
      distance: session?.distance || 0,
      hasActivity: !!session,
      session: session || null
    };
  });

  const badges = [
    { name: 'First Steps', emoji: '👣', unlocked: true },
    { name: 'Early Bird', emoji: '🌅', unlocked: true },
    { name: 'Tree Hugger', emoji: '🌳', unlocked: true },
    { name: 'Rain Walker', emoji: '🌧️', unlocked: true },
    { name: 'Sunset Chaser', emoji: '🌅', unlocked: true },
    { name: 'Mountain Climber', emoji: '⛰️', unlocked: false },
    { name: 'Ocean Explorer', emoji: '🌊', unlocked: false },
    { name: 'Star Gazer', emoji: '⭐', unlocked: false },
  ];

  useEffect(() => {
    // Load joined activities and walking sessions from localStorage
    const activities = JSON.parse(localStorage.getItem('joinedActivities') || '[]');
    const sessions = JSON.parse(localStorage.getItem('walkingSessions') || '[]');
    setJoinedActivities(activities);
    setWalkingSessions(sessions);
  }, []);

  const handleSaveProfile = () => {
    setUserName(tempUserName);
    localStorage.setItem('userName', tempUserName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempUserName(userName);
    setIsEditing(false);
  };

  const getDistanceColor = (distance: number) => {
    if (distance === 0) return 'bg-gray-100';
    if (distance < 1) return 'bg-green-200';
    if (distance < 3) return 'bg-green-400';
    if (distance < 5) return 'bg-green-600';
    return 'bg-green-800';
  };

  if (selectedSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-bright-green">📅 Session Details 📅</h2>
            <Button 
              onClick={() => setSelectedSession(null)}
              className="bg-forest-green text-white rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-light-green rounded-2xl p-4">
              <h3 className="font-black text-bright-green text-lg mb-2">🗺️ Session Summary 🗺️</h3>
              <p className="font-bold text-text-dark">📅 Date: {selectedSession.date}</p>
              <p className="font-bold text-text-dark">📏 Distance: {selectedSession.distance.toFixed(2)} km</p>
              <p className="font-bold text-text-dark">⏰ Time: {Math.floor(selectedSession.time / 60)}:{(selectedSession.time % 60).toString().padStart(2, '0')}</p>
              {selectedSession.feeling > 0 && (
                <p className="font-bold text-text-dark">
                  ⭐ Feeling: {Array(selectedSession.feeling).fill('⭐').join('')}
                </p>
              )}
            </div>

            {selectedSession.route.length > 1 && (
              <div className="bg-light-green rounded-2xl p-4">
                <h3 className="font-black text-bright-green text-lg mb-2">🗺️ Route Map 🗺️</h3>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-4 text-center">
                  <div className="text-4xl mb-2">📍➡️📍</div>
                  <p className="font-bold text-bright-green">Route with {selectedSession.route.length} GPS points</p>
                  <p className="text-sm text-text-dark">Start → Journey → Finish</p>
                </div>
              </div>
            )}

            {selectedSession.photos.length > 0 && (
              <div className="bg-light-green rounded-2xl p-4">
                <h3 className="font-black text-bright-green text-lg mb-2">📸 Photos 📸</h3>
                <div className="space-y-2">
                  {selectedSession.photos.map((photo, index) => (
                    <div key={index} className="bg-white rounded-xl p-3">
                      <p className="font-bold text-text-dark">{photo.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.comments.length > 0 && (
              <div className="bg-light-green rounded-2xl p-4">
                <h3 className="font-black text-bright-green text-lg mb-2">💬 Comments 💬</h3>
                <div className="space-y-2">
                  {selectedSession.comments.map((comment, index) => (
                    <div key={index} className="bg-white rounded-xl p-3">
                      <p className="font-bold text-text-dark">"{comment.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSession.activities.length > 0 && (
              <div className="bg-light-green rounded-2xl p-4">
                <h3 className="font-black text-bright-green text-lg mb-2">🎯 Activities 🎯</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.activities.map((activity, index) => (
                    <span key={index} className="bg-forest-green text-white px-3 py-1 rounded-full text-sm font-bold">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showCalendar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-bright-green">📅 Walking Calendar 📅</h2>
            <Button 
              onClick={() => setShowCalendar(false)}
              className="bg-forest-green text-white rounded-full px-4 py-2"
            >
              ← Back
            </Button>
          </div>
          
          <div className="mb-4">
            <p className="text-lg font-bold text-bright-green text-center">🚶 Daily Walking Distances 🚶</p>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center font-bold text-bright-green p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((day, index) => (
              <div
                key={index}
                onClick={() => day.session && setSelectedSession(day.session)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold transition-all hover:scale-110 cursor-pointer ${getDistanceColor(day.distance)}`}
              >
                <span className="text-white">{day.day}</span>
                {day.distance > 0 && (
                  <span className="text-xs text-white">{day.distance.toFixed(1)}km</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span className="font-bold">Less than 1km</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="font-bold">1-3km</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="font-bold">3-5km</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-800 rounded"></div>
              <span className="font-bold">5km+</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-yellow-accent">
              <span className="text-4xl">{selectedEmoji}</span>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute -bottom-2 right-1/2 transform translate-x-1/2 bg-yellow-accent text-bright-green rounded-full p-2 hover:scale-110 transition-transform"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                className="text-2xl font-bold text-center bg-white rounded-2xl px-4 py-2 text-bright-green border-2 border-yellow-accent"
                placeholder="Enter your name"
              />
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="w-full text-center bg-white rounded-2xl px-4 py-2 text-bright-green border-2 border-yellow-accent resize-none"
                rows={2}
              />
              <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
                {natureEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-full transition-all hover:scale-110 ${
                      selectedEmoji === emoji ? 'bg-yellow-accent scale-125' : 'bg-white'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3 justify-center">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-yellow-accent text-bright-green font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  ✅ Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  ❌ Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-nunito font-bold text-white mb-2">
                {userName} ✨
              </h1>
              <p className="text-light-green text-lg mb-2">{userStats.level} 🎯</p>
              <p className="text-white text-sm font-semibold">{userBio}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="bg-yellow-accent rounded-full px-4 py-2">
                  <span className="font-bold text-bright-green">🪙 {userStats.coins}</span>
                </div>
                <div className="bg-white rounded-full px-4 py-2">
                  <span className="font-bold text-forest-green">#{userStats.rank} 🏆</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Joined Group Activities */}
      {joinedActivities.length > 0 && (
        <div className="px-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
            <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center flex items-center justify-center">
              <Users className="w-6 h-6 mr-2" />
              🚶 My Group Activities 🚶
            </h2>
            <div className="space-y-3">
              {joinedActivities.map((activity, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-accent to-light-green rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="bg-bright-green text-white px-2 py-1 rounded-full text-xs font-black">
                          {activity.type}
                        </span>
                        <span className="text-xs font-bold text-text-dark">{activity.difficulty}</span>
                      </div>
                      <p className="font-bold text-bright-green">{activity.title}</p>
                      <p className="text-xs text-text-dark">📍 {activity.location} • ⏰ {activity.time}</p>
                    </div>
                    <div className="bg-white rounded-full px-3 py-1">
                      <span className="text-xs font-bold text-bright-green">✅ Joined</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Friends Section */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
          <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center flex items-center justify-center">
            <Users className="w-6 h-6 mr-2" />
            👥 Your Nature Squad 👥
          </h2>
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center justify-between bg-light-green rounded-2xl p-3 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">{friend.emoji}</span>
                  </div>
                  <div>
                    <p className="font-bold text-bright-green">{friend.name}</p>
                    <p className="text-xs text-text-dark">{friend.lastSeen}</p>
                  </div>
                </div>
                <Button className="bg-forest-green text-white rounded-full px-3 py-1 text-sm hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  💬
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
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
              <div className="text-2xl font-bold text-bright-green">{userStats.totalSessions}</div>
              <div className="text-sm font-bold text-text-dark">Sessions 📈</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bright-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{userStats.totalHours}</span>
              </div>
              <div className="text-2xl font-bold text-bright-green">Hours ⏰</div>
              <div className="text-sm font-bold text-text-dark">Outside 🌿</div>
            </div>

            <div 
              className="text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowCalendar(true)}
            >
              <div className="w-16 h-16 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <Target className="w-8 h-8 text-bright-green" />
              </div>
              <div className="text-2xl font-bold text-bright-green">{userStats.currentStreak}</div>
              <div className="text-sm font-bold text-text-dark">Day Streak 🔥</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-bright-green">{userStats.badges}</div>
              <div className="text-sm font-bold text-text-dark">Badges 🏅</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-bright-green text-lg">🎯 Next Level 🎯</span>
            <span className="text-sm font-bold text-text-dark">{userStats.nextLevel} ⬆️</span>
          </div>
          <div className="w-full bg-light-green rounded-full h-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-forest-green to-bright-green h-6 rounded-full transition-all duration-1000" 
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-sm text-text-dark mt-2 text-center">
            🪙 1,753 more coins needed ✨
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
          <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center">
            🏆 Achievement Badges 🏆
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl hover:scale-110 transition-transform ${
                  badge.unlocked 
                    ? 'bg-gradient-to-br from-yellow-accent to-orange-accent shadow-lg' 
                    : 'bg-gray-200'
                }`}>
                  <span className={badge.unlocked ? '' : 'grayscale'}>{badge.emoji}</span>
                </div>
                <p className={`text-xs font-bold ${badge.unlocked ? 'text-bright-green' : 'text-gray-400'}`}>
                  {badge.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="px-6">
        <div className="space-y-3">
          <Button className="w-full bg-light-green text-bright-green font-bold py-4 rounded-2xl text-lg hover:bg-bright-green hover:text-white transition-all hover:scale-105">
            <Settings className="w-6 h-6 mr-3" />
            ⚙️ Settings
          </Button>
          
          <Button className="w-full bg-yellow-accent text-bright-green font-bold py-4 rounded-2xl text-lg hover:bg-bright-green hover:text-white transition-all hover:scale-105">
            <Trophy className="w-6 h-6 mr-3" />
            🏆 View Achievements
          </Button>
          
          <Button 
            onClick={onLogout}
            className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-red-600 transition-all hover:scale-105"
          >
            <LogOut className="w-6 h-6 mr-3" />
            🚪 Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
