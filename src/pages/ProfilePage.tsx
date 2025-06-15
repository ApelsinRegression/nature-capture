import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { ArrowLeft, UserPlus, MessageSquare } from 'lucide-react';
import { userManager } from '../utils/userManager';

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
  
  const currentUser = userManager.getCurrentUser();
  const profileUser = viewingUser || currentUser;
  
  const [userName, setUserName] = useState(profileUser?.name || 'User');
  const [userCity, setUserCity] = useState(profileUser?.city || 'New York');
  const [selectedEmoji, setSelectedEmoji] = useState(profileUser?.avatar || '🌱');
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
    totalSessions: profileUser?.totalSessions || 0,
    totalHours: profileUser?.totalHours || 0,
    currentStreak: profileUser?.currentStreak || 0,
    badges: profileUser?.badges || 0,
    level: profileUser?.level || 'Beginner',
    nextLevel: profileUser?.nextLevel || 'Nature Seeker',
    coins: profileUser?.coins || 0,
    rank: 1 // Calculate rank based on all users
  };

  const natureEmojis = ['🌱', '🌿', '🌳', '🍃', '🌺', '🌻', '🌷', '🌸', '🌼', '🌹', '🦋', '🐝', '🐞', '🦅', '🐿️', '🍄', '⭐', '🌙', '☀️', '🌈'];

  const cities = [
    // North America
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington DC',
    'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore',
    'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Mesa', 'Sacramento', 'Atlanta', 'Kansas City', 'Colorado Springs', 'Miami',
    'Raleigh', 'Omaha', 'Long Beach', 'Virginia Beach', 'Oakland', 'Minneapolis', 'Tampa', 'Arlington', 'New Orleans', 'Wichita',
    
    // Canada
    'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener',
    
    // Kazakhstan
    'Astana', 'Almaty', 'Shymkent', 'Karaganda', 'Aktobe', 'Taraz', 'Pavlodar', 'Oskemen', 'Semey', 'Atyrau',
    
    // Europe
    'London', 'Berlin', 'Madrid', 'Rome', 'Paris', 'Bucharest', 'Vienna', 'Hamburg', 'Warsaw', 'Budapest',
    'Barcelona', 'Munich', 'Milan', 'Prague', 'Sofia', 'Brussels', 'Birmingham', 'Cologne', 'Naples', 'Turin',
    
    // Asia
    'Tokyo', 'Delhi', 'Shanghai', 'Dhaka', 'São Paulo', 'Cairo', 'Mexico City', 'Beijing', 'Mumbai', 'Osaka',
    'Karachi', 'Chongqing', 'Istanbul', 'Buenos Aires', 'Kolkata', 'Lagos', 'Kinshasa', 'Manila', 'Tianjin', 'Guangzhou',
    'Rio de Janeiro', 'Lahore', 'Bangalore', 'Moscow', 'Shenzhen', 'Jakarta', 'Seoul', 'Lima', 'London', 'Tehran',
    'Bogotá', 'Hong Kong', 'Ho Chi Minh City', 'Hyderabad', 'Chennai', 'Luanda', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur',
    
    // Australia & Oceania
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong',
    'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga',
    
    // South America
    'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá', 'Santiago', 'Caracas', 'Salvador', 'Brasília', 'Fortaleza',
    'Guayaquil', 'Quito', 'Cali', 'Medellín', 'Córdoba', 'Montevideo', 'La Paz', 'Santa Cruz', 'Asunción', 'Recife',
    
    // Africa
    'Lagos', 'Cairo', 'Kinshasa', 'Luanda', 'Nairobi', 'Casablanca', 'Alexandria', 'Abidjan', 'Kano', 'Ibadan',
    'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Pietermaritzburg'
  ];

  const friends = userManager.getFriends().map(friend => ({
    name: friend.name,
    emoji: friend.avatar,
    status: 'offline',
    lastSeen: '1 day ago 🔴'
  }));

  useEffect(() => {
    if (!isPublicView && currentUser) {
      setJoinedActivities([]);
      setWalkingSessions(currentUser.walkingSessions.map(session => ({
        date: session.date,
        distance: session.distance,
        time: session.time,
        route: session.route,
        photos: session.photos,
        comments: session.comments,
        feeling: session.feeling,
        activities: session.activities
      })));
      setMessages([]);
    }
  }, [isPublicView, currentUser]);

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
    { name: 'First Steps', emoji: '👣', unlocked: userStats.totalSessions > 0 },
    { name: 'Early Bird', emoji: '🌅', unlocked: userStats.coins > 50 },
    { name: 'Tree Hugger', emoji: '🌳', unlocked: userStats.coins > 100 },
    { name: 'Rain Walker', emoji: '🌧️', unlocked: userStats.coins > 200 },
    { name: 'Sunset Chaser', emoji: '🌅', unlocked: userStats.coins > 500 },
    { name: 'Mountain Climber', emoji: '⛰️', unlocked: userStats.coins > 1000 },
    { name: 'Ocean Explorer', emoji: '🌊', unlocked: userStats.coins > 1500 },
    { name: 'Star Gazer', emoji: '⭐', unlocked: userStats.coins > 2000 },
  ];

  const handleSaveProfile = () => {
    if (!isPublicView && currentUser) {
      userManager.updateUser({
        name: tempUserName,
        city: tempUserCity,
        avatar: selectedEmoji
      });
      setUserName(tempUserName);
      setUserCity(tempUserCity);
    }
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
        <>
          <GroupActivities joinedActivities={joinedActivities} />
          <FriendsSection 
            friends={friends} 
            onMessageClick={handleSelectFriend}
          />
        </>
      )}
      
      <ProfileStats userStats={userStats} />
      <ProfileBadges badges={badges} />
      
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
