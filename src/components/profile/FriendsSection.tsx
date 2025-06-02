
import React from 'react';

interface Friend {
  name: string;
  emoji: string;
  status: string;
  lastSeen: string;
}

interface FriendsSectionProps {
  friends: Friend[];
  onMessageClick?: (friend: Friend) => void;
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ friends, onMessageClick }) => {
  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-bright-green">
        <h2 className="text-lg font-nunito font-bold text-bright-green mb-4 text-center">
          👥 Nature Friends 👥
        </h2>
        <div className="space-y-3">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-light-green rounded-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{friend.emoji}</div>
                <div>
                  <p className="font-bold text-bright-green text-sm">{friend.name}</p>
                  <p className="text-xs text-forest-green">{friend.lastSeen}</p>
                </div>
              </div>
              <button 
                onClick={() => onMessageClick?.(friend)}
                className="bg-forest-green text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-bright-green transition-all"
              >
                💬 Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSection;
