
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
  userName: string;
  selectedEmoji: string;
  userStats: {
    level: string;
    coins: number;
    rank: number;
  };
  isEditing: boolean;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  selectedEmoji,
  userStats,
  isEditing,
  onEditClick
}) => {
  return (
    <div className="bg-gradient-to-r from-forest-green to-bright-green p-6 rounded-b-3xl mb-6">
      <div className="text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-yellow-accent">
            <span className="text-4xl">{selectedEmoji}</span>
          </div>
          <Button
            onClick={onEditClick}
            className="absolute -bottom-2 right-1/2 transform translate-x-1/2 bg-yellow-accent text-bright-green rounded-full p-2"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        
        {!isEditing && (
          <>
            <h1 className="text-2xl font-nunito font-bold text-white mb-2 break-words">
              {userName} ✨
            </h1>
            <p className="text-light-green text-base mb-4">{userStats.level} 🎯</p>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="bg-yellow-accent rounded-full px-3 py-1">
                <span className="font-bold text-bright-green text-sm">🪙 {userStats.coins}</span>
              </div>
              <div className="bg-white rounded-full px-3 py-1">
                <span className="font-bold text-forest-green text-sm">#{userStats.rank} 🏆</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
