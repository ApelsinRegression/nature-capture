
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

  const allUsers: Friend[] = [
    { id: '1', name: 'Alex Green', avatar: '🌿', status: 'online', lastSeen: 'Active now', isFriend: true },
    { id: '2', name: 'Maya Forest', avatar: '🌳', status: 'offline', lastSeen: '2 hours ago', isFriend: true },
    { id: '3', name: 'Leo Sunshine', avatar: '☀️', status: 'online', lastSeen: 'Active now', isFriend: true },
    { id: '4', name: 'Luna Star', avatar: '⭐', status: 'offline', lastSeen: '1 day ago', isFriend: true },
    { id: '5', name: 'River Blue', avatar: '🌊', status: 'online', lastSeen: 'Active now', isFriend: true },
    { id: '6', name: 'Ocean Wave', avatar: '🌊', status: 'online', lastSeen: 'Active now', isFriend: false },
    { id: '7', name: 'Mountain Peak', avatar: '⛰️', status: 'offline', lastSeen: '3 hours ago', isFriend: false },
    { id: '8', name: 'Sky Walker', avatar: '☁️', status: 'online', lastSeen: 'Active now', isFriend: false },
    { id: '9', name: 'Earth Guardian', avatar: '🌍', status: 'offline', lastSeen: '5 minutes ago', isFriend: false },
    { id: '10', name: 'Wind Dancer', avatar: '💨', status: 'online', lastSeen: 'Active now', isFriend: false },
  ];

  useEffect(() => {
    const savedFriends = JSON.parse(localStorage.getItem('friends') || '[]');
    if (savedFriends.length === 0) {
      // Initialize with default friends
      const defaultFriends = allUsers.filter(user => user.isFriend);
      setFriends(defaultFriends);
      localStorage.setItem('friends', JSON.stringify(defaultFriends));
    } else {
      setFriends(savedFriends);
    }
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
          
          {friends.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-gray-500 font-bold">No friends yet! Add some nature buddies.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-3 bg-light-green rounded-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{friend.avatar}</div>
                    <div>
                      <p className="font-bold text-bright-green text-sm">{friend.name}</p>
                      <p className="text-xs text-forest-green flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        {friend.lastSeen}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFriend(friend.id)}
                    className="bg-red-500 text-white rounded-full px-3 py-1 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
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

            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 font-bold">
                    {searchTerm ? 'No users found with that name' : 'All available users are already your friends!'}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-light-green rounded-2xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <p className="font-bold text-bright-green text-sm">{user.name}</p>
                        <p className="text-xs text-forest-green flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          {user.lastSeen}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => addFriend(user)}
                      className="bg-forest-green text-white rounded-full px-3 py-1 text-xs hover:bg-bright-green transition-all"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsManager;
