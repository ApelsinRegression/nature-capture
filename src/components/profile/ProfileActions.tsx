
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar, MessageSquare, Send } from 'lucide-react';

interface ProfileActionsProps {
  onCalendarClick: () => void;
  onMessageHistoryClick: () => void;
  onMessageFriendsClick: () => void;
  onLogout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ 
  onCalendarClick, 
  onMessageHistoryClick,
  onMessageFriendsClick,
  onLogout 
}) => {
  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
        <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center">
          ⚙️ Profile Actions ⚙️
        </h2>
        <div className="space-y-3">
          <Button
            onClick={onCalendarClick}
            className="w-full bg-gradient-to-r from-light-green to-bright-green text-white font-bold py-4 rounded-2xl text-base shadow-lg"
          >
            <Calendar className="w-5 h-5 mr-3" />
            📅 View Walking Calendar
          </Button>

          <Button
            onClick={onMessageHistoryClick}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 rounded-2xl text-base shadow-lg"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            📨 Message History
          </Button>

          <Button
            onClick={onMessageFriendsClick}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-2xl text-base shadow-lg"
          >
            <Send className="w-5 h-5 mr-3" />
            💬 Send Message to Friends
          </Button>
          
          <Button
            onClick={onLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-2xl text-base shadow-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            🚪 Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
