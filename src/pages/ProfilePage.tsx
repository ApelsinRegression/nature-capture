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
import MessageHistory from '../components/messaging/MessageHistory';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

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
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'amirdayirov09');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMessageHistory, setShowMessageHistory] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
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

  if (showMessageHistory) {
    return (
      <MessageHistory 
        onBack={() => setShowMessageHistory(false)}
      />
    );
  }

  if (showMessaging) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
          <h2 className="text-2xl font-black text-bright-green mb-6 text-center">💬 Send Message 💬</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-bright-green mb-3">👥 Select Friend:</label>
              <div className="grid grid-cols-2 gap-3">
                {friends.map((friend, index) => (
                  <button
                    key={index}
                    className="p-3 rounded-2xl border-2 bg-light-green border-bright-green text-bright-green hover:bg-bright-green hover:text-white transition-all"
                  >
                    <div className="text-2xl mb-1">{friend.emoji}</div>
                    <div className="text-sm font-bold">{friend.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">💬 Your Message:</label>
              <textarea
                placeholder="Hey! Want to go for a nature walk together? 🌿"
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
              >
                <Send className="w-5 h-5 mr-2" />
                ✅ Send Message
              </Button>
              <Button
                onClick={() => setShowMessaging(false)}
                className="bg-gray-500 text-white font-black py-3 rounded-2xl hover:bg-gray-600 transition-all"
              >
                ❌ Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      <ProfileHeader
        userName={userName}
        selectedEmoji={selectedEmoji}
        userStats={userStats}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(!isEditing)}
      />

      {isEditing && (
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-3xl">
            <ProfileEditForm
              tempUserName={tempUserName}
              selectedEmoji={selectedEmoji}
              natureEmojis={natureEmojis}
              onNameChange={setTempUserName}
              onEmojiSelect={setSelectedEmoji}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      <GroupActivities joinedActivities={joinedActivities} />
      
      <FriendsSection friends={friends} />
      
      <ProfileStats userStats={userStats} />
      
      <ProfileBadges badges={badges} />
      
      <ProfileActions 
        onCalendarClick={() => setShowCalendar(true)}
        onMessageHistoryClick={() => setShowMessageHistory(true)}
        onMessageFriendsClick={() => setShowMessaging(true)}
        onLogout={onLogout}
      />
    </div>
  );
};

export default ProfilePage;
