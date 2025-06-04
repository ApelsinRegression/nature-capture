
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, MessageCircle, Users, LogOut, UserPlus, Plus } from 'lucide-react';

interface ProfileActionsProps {
  onCalendarClick: () => void;
  onMessageHistoryClick: () => void;
  onMessageFriendsClick: () => void;
  onCreateEventClick: () => void;
  onFriendsManagerClick?: () => void;
  onLogout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ 
  onCalendarClick,
  onMessageHistoryClick,
  onMessageFriendsClick,
  onCreateEventClick,
  onFriendsManagerClick,
  onLogout
}) => {
  return (
    <div className="px-6 space-y-4">
      {/* Main Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-bright-green">
        <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center">
          🎯 Quick Actions 🎯
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onCalendarClick}
            className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all transform hover:scale-105"
          >
            <Calendar className="w-5 h-5 mr-2" />
            📅 Calendar
          </Button>
          <Button
            onClick={onMessageFriendsClick}
            className="bg-blue-500 text-white font-black py-3 rounded-2xl hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            💬 Messages
          </Button>
          <Button
            onClick={onCreateEventClick}
            className="bg-yellow-accent text-bright-green font-black py-3 rounded-2xl hover:bg-bright-green hover:text-white transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            📅 Create Event
          </Button>
          {onFriendsManagerClick && (
            <Button
              onClick={onFriendsManagerClick}
              className="bg-purple-500 text-white font-black py-3 rounded-2xl hover:bg-purple-600 transition-all transform hover:scale-105"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              👥 Friends
            </Button>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-red-300">
        <Button
          onClick={onLogout}
          className="w-full bg-red-500 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all transform hover:scale-105"
        >
          <LogOut className="w-6 h-6 mr-2" />
          🚪 Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileActions;
