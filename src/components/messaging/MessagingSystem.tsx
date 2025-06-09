
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, ArrowLeft, MessageSquare, User, Clock, MapPin } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  timestamp: number;
  type: 'invitation' | 'regular';
  place?: string;
  time?: string;
}

interface MessagingSystemProps {
  onBack: () => void;
}

const MessagingSystem: React.FC<MessagingSystemProps> = ({ onBack }) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const [invitationPlace, setInvitationPlace] = useState('');
  const [invitationTime, setInvitationTime] = useState('');

  const friends: Friend[] = [
    { id: '1', name: 'Alex Green', avatar: '🌿', status: 'online', lastSeen: 'Active now' },
    { id: '2', name: 'Maya Forest', avatar: '🌳', status: 'offline', lastSeen: '2 hours ago' },
    { id: '3', name: 'Leo Sunshine', avatar: '☀️', status: 'online', lastSeen: 'Active now' },
    { id: '4', name: 'Luna Star', avatar: '⭐', status: 'offline', lastSeen: '1 day ago' },
    { id: '5', name: 'River Blue', avatar: '🌊', status: 'online', lastSeen: 'Active now' },
  ];

  const quickMessageTemplates = [
    { text: "Hey! Want to go for a nature walk?", type: 'regular' },
    { text: "Let's meet for a stroll at", type: 'invitation' },
    { text: "How about some outdoor time together?", type: 'regular' },
    { text: "Perfect weather for a walk! Join me?", type: 'regular' },
    { text: "I found a beautiful trail! Want to explore?", type: 'regular' }
  ];

  const sendMessage = (text: string, type: 'regular' | 'invitation' = 'regular') => {
    if (!selectedFriend) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      recipientId: selectedFriend.id,
      text: text,
      timestamp: Date.now(),
      type: type,
      place: type === 'invitation' ? invitationPlace : undefined,
      time: type === 'invitation' ? invitationTime : undefined
    };

    setMessages([...messages, message]);
    setMessageText('');
    setInvitationPlace('');
    setInvitationTime('');
    
    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    existingMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(existingMessages));
  };

  const sendInvitation = () => {
    if (!invitationPlace || !invitationTime) {
      alert('Please fill in both place and time!');
      return;
    }
    
    const invitationText = `Hello, let's go for a stroll at ${invitationPlace} at ${invitationTime}! 🌿`;
    sendMessage(invitationText, 'invitation');
    setShowQuickMessages(false);
  };

  if (selectedFriend) {
    const friendMessages = messages.filter(
      msg => msg.recipientId === selectedFriend.id || msg.senderId === selectedFriend.id
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
        <div className="bg-white rounded-b-3xl mx-4 mb-6 shadow-xl">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setSelectedFriend(null)}
                className="bg-forest-green text-white rounded-full p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-3xl">{selectedFriend.avatar}</div>
              <div>
                <h2 className="text-xl font-black text-bright-green">{selectedFriend.name}</h2>
                <p className="text-sm text-gray-600 flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedFriend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  {selectedFriend.lastSeen}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green min-h-96">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              {friendMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-gray-500 font-bold">Start a conversation!</p>
                </div>
              ) : (
                friendMessages.map((message) => (
                  <div key={message.id} className="bg-forest-green text-white rounded-2xl p-3 ml-8">
                    <p className="font-bold">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-2xl border-2 border-light-green font-bold"
                  onKeyPress={(e) => e.key === 'Enter' && messageText.trim() && sendMessage(messageText)}
                />
                <Button
                  onClick={() => messageText.trim() && sendMessage(messageText)}
                  className="bg-forest-green text-white rounded-2xl px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <Button
                onClick={() => setShowQuickMessages(!showQuickMessages)}
                className="w-full bg-yellow-accent text-bright-green font-black py-3 rounded-2xl"
              >
                📋 Quick Messages
              </Button>

              {showQuickMessages && (
                <div className="bg-light-green rounded-2xl p-4 space-y-3">
                  <h3 className="font-black text-bright-green">Quick Message Templates:</h3>
                  
                  {quickMessageTemplates.map((template, index) => (
                    <div key={index}>
                      {template.type === 'regular' ? (
                        <Button
                          onClick={() => sendMessage(template.text)}
                          className="w-full bg-white text-bright-green font-bold py-2 rounded-xl text-left justify-start"
                        >
                          {template.text}
                        </Button>
                      ) : (
                        <div className="bg-white rounded-xl p-3">
                          <p className="font-bold text-bright-green mb-2">Send Nature Walk Invitation:</p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-forest-green" />
                              <input
                                type="text"
                                value={invitationPlace}
                                onChange={(e) => setInvitationPlace(e.target.value)}
                                placeholder="Place (e.g., Central Park)"
                                className="flex-1 p-2 rounded-lg border border-light-green"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-forest-green" />
                              <input
                                type="text"
                                value={invitationTime}
                                onChange={(e) => setInvitationTime(e.target.value)}
                                placeholder="Time (e.g., 3:00 PM tomorrow)"
                                className="flex-1 p-2 rounded-lg border border-light-green"
                              />
                            </div>
                            <Button
                              onClick={sendInvitation}
                              className="w-full bg-forest-green text-white font-bold py-2 rounded-lg"
                            >
                              Send Invitation 🌿
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <h2 className="text-2xl font-black text-bright-green">💬 Messages 💬</h2>
              <p className="text-sm text-gray-600">Chat with your nature friends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green">
          <h3 className="text-lg font-black text-bright-green mb-4">👥 Your Friends</h3>
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                className="flex items-center justify-between p-3 bg-light-green rounded-2xl cursor-pointer hover:bg-bright-green hover:text-white transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{friend.avatar}</div>
                  <div>
                    <p className="font-bold text-sm">{friend.name}</p>
                    <p className="text-xs flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      {friend.lastSeen}
                    </p>
                  </div>
                </div>
                <MessageSquare className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
