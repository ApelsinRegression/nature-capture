
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import GroupActivities from '../components/profile/GroupActivities';
import FriendsSection from '../components/profile/FriendsSection';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileBadges from '../components/profile/ProfileBadges';
import ProfileActions from '../components/profile/ProfileActions';
import CalendarView from '../components/profile/CalendarView';
import SessionDetails from '../components/profile/SessionDetails';
import MessagingSystem from '../components/messaging/MessagingSystem';
import FriendsManager from '../components/friends/FriendsManager';
import EventCreator from '../components/events/EventCreator';
import { Button } from '@/components/ui/button';

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

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'amirdayirov09');
  const [userCity, setUserCity] = useState(localStorage.getItem('userCity') || 'New York');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showFriendsManager, setShowFriendsManager] = useState(false);
  const [showEventCreator, setShowEventCreator] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [joinedActivities, setJoinedActivities] = useState<any[]>([]);
  const [walkingSessions, setWalkingSessions] = useState<WalkingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<WalkingSession | null>(null);
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempUserCity, setTempUserCity] = useState(userCity);
  
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

  const cities = [
    'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Boston', 
    'Washington DC', 'Denver', 'Portland', 'Austin', 'Atlanta', 'Phoenix', 'Las Vegas',
    'London', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Berlin', 'Barcelona', 'Amsterdam'
  ];

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
    const activities = JSON.parse(localStorage.getItem('joinedActivities') || '[]');
    const sessions = JSON.parse(localStorage.getItem('walkingSessions') || '[]');
    setJoinedActivities(activities);
    setWalkingSessions(sessions);
  }, []);

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

  if (selectedSession) {
    return (
      <SessionDetails 
        session={selectedSession} 
        onClose={() => setSelectedSession(null)} 
      />
    );
  }

  if (showCalendar) {
    return (
      <CalendarView 
        calendarData={calendarData}
        onBackClick={() => setShowCalendar(false)}
        onSessionClick={setSelectedSession}
      />
    );
  }

  if (showMessaging) {
    return (
      <MessagingSystem 
        onBack={() => setShowMessaging(false)}
      />
    );
  }

  if (showFriendsManager) {
    return (
      <FriendsManager 
        onBack={() => setShowFriendsManager(false)}
      />
    );
  }

  if (showEventCreator) {
    return (
      <EventCreator 
        onBack={() => setShowEventCreator(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      <ProfileHeader
        userName={userName}
        userCity={userCity}
        selectedEmoji={selectedEmoji}
        userStats={userStats}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(!isEditing)}
      />

      {isEditing && (
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

      <GroupActivities joinedActivities={joinedActivities} />
      
      <FriendsSection 
        friends={friends} 
        onMessageClick={handleSelectFriend}
      />
      
      <ProfileStats userStats={userStats} />
      
      <ProfileBadges badges={badges} />
      
      <ProfileActions 
        onCalendarClick={() => setShowCalendar(true)}
        onMessageHistoryClick={() => setShowMessaging(true)}
        onMessageFriendsClick={() => setShowMessaging(true)}
        onCreateEventClick={() => setShowEventCreator(true)}
        onFriendsManagerClick={() => setShowFriendsManager(true)}
        onLogout={onLogout}
      />
    </div>
  );
};

export default ProfilePage;
