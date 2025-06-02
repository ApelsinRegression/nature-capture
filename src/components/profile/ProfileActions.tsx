
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, Calendar } from 'lucide-react';

interface ProfileActionsProps {
  onCalendarClick: () => void;
  onLogout: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onCalendarClick, onLogout }) => {
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
          
          <Button className="w-full bg-gradient-to-r from-yellow-accent to-orange-accent text-bright-green font-bold py-4 rounded-2xl text-base shadow-lg">
            <Settings className="w-5 h-5 mr-3" />
            ⚙️ Settings
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
