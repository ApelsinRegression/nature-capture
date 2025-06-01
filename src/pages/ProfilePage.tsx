
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green pb-6">
      <ProfileHeader
        userName={userName}
        selectedEmoji={selectedEmoji}
        userBio={userBio}
        userStats={userStats}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(!isEditing)}
      />

      {isEditing && (
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-3xl">
            <ProfileEditForm
              tempUserName={tempUserName}
              userBio={userBio}
              selectedEmoji={selectedEmoji}
              natureEmojis={natureEmojis}
              onNameChange={setTempUserName}
              onBioChange={setUserBio}
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
        onLogout={onLogout}
      />
    </div>
  );
};

export default ProfilePage;
