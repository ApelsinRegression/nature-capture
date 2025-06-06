
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck, ArrowLeft, Search } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
  isFriend: boolean;
}

interface FriendsManagerProps {
  onBack: () => void;
}

const FriendsManager: React.FC<FriendsManagerProps> = ({ onBack }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddFriends, setShowAddFriends] = useState(false);

  // No default users - completely empty
  const allUsers: Friend[] = [];

  useEffect(() => {
    // Start with no friends
    setFriends([]);
    localStorage.removeItem('friends');
  }, []);

  const addFriend = (user: Friend) => {
    const newFriend = { ...user, isFriend: true };
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
  };

  const removeFriend = (userId: string) => {
    const updatedFriends = friends.filter(friend => friend.id !== userId);
    setFriends(updatedFriends);
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !friends.some(friend => friend.id === user.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      <div className="bg-white rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onBack}
              className="bg-forest-green text-white rounded-full p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-black text-bright-green">👥 Friends Manager</h2>
              <p className="text-sm text-gray-600">Manage your nature buddy network</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Current Friends */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-bright-green">🌟 Your Friends ({friends.length})</h3>
            <Button
              onClick={() => setShowAddFriends(!showAddFriends)}
              className="bg-forest-green text-white rounded-full px-4 py-2 text-sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friends
            </Button>
          </div>
          
          <div className="text-center py-8">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-gray-500 font-bold">No friends yet! Start your journey and connect with other nature enthusiasts.</p>
          </div>
        </div>

        {/* Add Friends Section */}
        {showAddFriends && (
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
            <h3 className="text-lg font-black text-bright-green mb-4">🔍 Discover New Friends</h3>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 bg-light-green rounded-2xl p-3">
                <Search className="w-5 h-5 text-forest-green" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for nature enthusiasts..."
                  className="flex-1 bg-transparent font-bold text-bright-green placeholder-forest-green outline-none"
                />
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-gray-500 font-bold">
                No users available yet. As more people join NatureCapture, they'll appear here!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsManager;
