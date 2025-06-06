import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import GroupActivities from '../components/profile/GroupActivities';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileBadges from '../components/profile/ProfileBadges';
import ProfileActions from '../components/profile/ProfileActions';
import CalendarView from '../components/profile/CalendarView';
import SessionDetails from '../components/profile/SessionDetails';
import MessagingSystem from '../components/messaging/MessagingSystem';
import FriendsManager from '../components/friends/FriendsManager';
import EventCreator from '../components/events/EventCreator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus, MessageSquare } from 'lucide-react';

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

interface Friend {
  name: string;
  emoji: string;
  status: string;
  lastSeen: string;
}

interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const location = useLocation();
  const { viewingUser, isPublicView, openMessaging } = location.state || {};
  
  const [userName, setUserName] = useState(
    viewingUser?.name || localStorage.getItem('userName') || 'amirdayirov09'
  );
  const [userCity, setUserCity] = useState(
    viewingUser?.city || localStorage.getItem('userCity') || 'New York'
  );
  const [selectedEmoji, setSelectedEmoji] = useState(viewingUser?.avatar || '🌱');
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMessaging, setShowMessaging] = useState(openMessaging || false);
  const [showFriendsManager, setShowFriendsManager] = useState(false);
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [joinedActivities, setJoinedActivities] = useState<any[]>([]);
  const [walkingSessions, setWalkingSessions] = useState<WalkingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<WalkingSession | null>(null);
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempUserCity, setTempUserCity] = useState(userCity);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const userStats = {
    totalSessions: 23,
    totalHours: 12.5,
    currentStreak: 7,
    badges: 8,
    level: 'Nature Seeker',
    nextLevel: 'Forest Friend',
    coins: 247,
    rank: viewingUser?.rank || 4
  };

  const natureEmojis = ['🌱', '🌿', '🌳', '🍃', '🌺', '🌻', '🌷', '🌸', '🌼', '🌹', '🦋', '🐝', '🐞', '🦅', '🐿️', '🍄', '⭐', '🌙', '☀️', '🌈'];

  const cities = [
    'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Boston', 
    'Washington DC', 'Denver', 'Portland', 'Austin', 'Atlanta', 'Phoenix', 'Las Vegas',
    'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Berlin', 'Barcelona', 'Amsterdam'
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
    if (!isPublicView) {
      const activities = JSON.parse(localStorage.getItem('joinedActivities') || '[]');
      const sessions = JSON.parse(localStorage.getItem('walkingSessions') || '[]');
      const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      setJoinedActivities(activities);
      setWalkingSessions(sessions);
      setMessages(savedMessages);
    }
  }, [isPublicView]);

  const handleSaveProfile = () => {
    setUserName(tempUserName);
    setUserCity(tempUserCity);
    localStorage.setItem('userName', tempUserName);
    localStorage.setItem('userCity', tempUserCity);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempUserName(userName);
    setTempUserCity(userCity);
    setIsEditing(false);
  };

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowMessaging(false);
  };

  const handleSendFriendRequest = () => {
    if (viewingUser) {
      alert(`Friend request sent to ${viewingUser.name}! 👥✨`);
    }
  };

  const handleBackToLeaderboard = () => {
    window.history.back();
  };

  if (selectedSession) {
    return (
      <SessionDetails 
        session={selectedSession} 
        onClose={() => setSelectedSession(null)} 
      />
    );
  }

  if (showCalendar && !isPublicView) {
    return (
      <CalendarView 
        calendarData={calendarData}
        onBackClick={() => setShowCalendar(false)}
        onSessionClick={setSelectedSession}
      />
    );
  }

  if (showMessaging && !isPublicView) {
    return (
      <MessagingSystem 
        onBack={() => setShowMessaging(false)}
      />
    );
  }

  if (showFriendsManager && !isPublicView) {
    return (
      <FriendsManager 
        onBack={() => setShowFriendsManager(false)}
      />
    );
  }

  if (showEventCreator && !isPublicView) {
    return (
      <EventCreator 
        onBack={() => setShowEventCreator(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      {/* Back button for public profiles */}
      {isPublicView && (
        <div className="p-4">
          <Button
            onClick={handleBackToLeaderboard}
            className="bg-forest-green text-white rounded-full p-2 hover:bg-bright-green transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}

      <ProfileHeader
        userName={userName}
        userCity={userCity}
        selectedEmoji={selectedEmoji}
        userStats={userStats}
        isEditing={isEditing && !isPublicView}
        onEditClick={!isPublicView ? () => setIsEditing(!isEditing) : undefined}
      />

      {isEditing && !isPublicView && (
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-3xl">
            <div className="space-y-4">
              <div>
                <label className="block text-white font-bold mb-2">👤 Username</label>
                <input
                  type="text"
                  value={tempUserName}
                  onChange={(e) => setTempUserName(e.target.value)}
                  className="w-full p-3 rounded-2xl font-bold text-bright-green"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <label className="block text-white font-bold mb-2">🏙️ City</label>
                <select
                  value={tempUserCity}
                  onChange={(e) => setTempUserCity(e.target.value)}
                  className="w-full p-3 rounded-2xl font-bold text-bright-green"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-bold mb-2">😊 Choose Your Avatar</label>
                <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                  {natureEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`p-3 rounded-xl text-2xl transition-all hover:scale-110 ${
                        selectedEmoji === emoji
                          ? 'bg-white text-bright-green shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-white text-bright-green font-black py-3 rounded-2xl hover:bg-light-green transition-all"
                >
                  ✅ Save Changes
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white font-black py-3 rounded-2xl hover:bg-red-600 transition-all"
                >
                  ❌ Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Public profile actions */}
      {isPublicView && (
        <div className="px-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-bright-green">
            <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center">
              🤝 Connect with {userName}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSendFriendRequest}
                className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                👥 Add Friend
              </Button>
              <Button
                onClick={() => alert('Send a friend request to message!')}
                className="bg-blue-500 text-white font-black py-3 rounded-2xl hover:bg-blue-600 transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                💬 Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isPublicView && (
        <GroupActivities joinedActivities={joinedActivities} />
      )}
      
      <ProfileStats userStats={userStats} />
      <ProfileBadges badges={badges} />

      {/* Show message history for own profile */}
      {!isPublicView && messages.length > 0 && (
        <div className="px-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-500">
            <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center">
              💬 Recent Messages 💬
            </h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {messages.slice(-5).reverse().map((message) => (
                <div key={message.id} className="bg-light-green rounded-2xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-bright-green text-sm">To: {message.to}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-text-dark">{message.text}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowMessaging(true)}
              className="w-full mt-4 bg-blue-500 text-white font-black py-2 rounded-2xl hover:bg-blue-600 transition-all"
            >
              📱 View All Messages
            </Button>
          </div>
        </div>
      )}
      
      {!isPublicView && (
        <ProfileActions 
          onCalendarClick={() => setShowCalendar(true)}
          onMessageHistoryClick={() => setShowMessaging(true)}
          onMessageFriendsClick={() => setShowMessaging(true)}
          onCreateEventClick={() => setShowEventCreator(true)}
          onFriendsManagerClick={() => setShowFriendsManager(true)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default ProfilePage;
