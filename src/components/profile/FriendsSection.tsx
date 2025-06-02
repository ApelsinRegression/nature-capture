
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';

interface Friend {
  name: string;
  emoji: string;
  status: string;
  lastSeen: string;
}

interface FriendsSectionProps {
  friends: Friend[];
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ friends }) => {
  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-light-green">
        <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center flex items-center justify-center">
          <Users className="w-5 h-5 mr-2" />
          👥 Your Nature Squad 👥
        </h2>
        <div className="space-y-3">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center justify-between bg-light-green rounded-2xl p-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">{friend.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-bright-green text-sm truncate">{friend.name}</p>
                  <p className="text-xs text-text-dark truncate">{friend.lastSeen}</p>
                </div>
              </div>
              <Button className="bg-forest-green text-white rounded-full px-3 py-1 text-sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                💬
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSection;
