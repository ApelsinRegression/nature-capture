
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';

interface Friend {
  name: string;
  emoji: string;
  status: string;
  lastSeen: string;
}

interface MessagingInterfaceProps {
  friends: Friend[];
  onBack: () => void;
  onSelectFriend: (friend: Friend) => void;
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({ 
  friends, 
  onBack, 
  onSelectFriend 
}) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!selectedFriend || !message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      receiverId: selectedFriend.name.toLowerCase().replace(' ', '-'),
      receiverName: selectedFriend.name,
      content: message.trim(),
      timestamp: new Date(),
      isRead: false
    };

    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    existingMessages.push(newMessage);
    localStorage.setItem('messageHistory', JSON.stringify(existingMessages));

    setMessage('');
    alert(`Message sent to ${selectedFriend.name}! 💬`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            className="bg-forest-green text-white rounded-full p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-black text-bright-green">💬 Send Message</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-bright-green mb-3">👥 Select Friend:</label>
            <div className="grid grid-cols-2 gap-3">
              {friends.map((friend, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFriend(friend)}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    selectedFriend?.name === friend.name
                      ? 'bg-bright-green text-white border-bright-green'
                      : 'bg-light-green border-bright-green text-bright-green hover:bg-bright-green hover:text-white'
                  }`}
                >
                  <div className="text-2xl mb-1">{friend.emoji}</div>
                  <div className="text-sm font-bold">{friend.name}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFriend(friend);
                    }}
                    className="mt-2 text-xs bg-white text-bright-green px-2 py-1 rounded-full"
                  >
                    View Chat
                  </button>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-bright-green mb-2">💬 Your Message:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hey! Want to go for a nature walk together? 🌿"
              className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green resize-none"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleSendMessage}
              disabled={!selectedFriend || !message.trim()}
              className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5 mr-2" />
              ✅ Send Message
            </Button>
            <Button
              onClick={onBack}
              className="bg-gray-500 text-white font-black py-3 rounded-2xl hover:bg-gray-600 transition-all"
            >
              ❌ Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;
