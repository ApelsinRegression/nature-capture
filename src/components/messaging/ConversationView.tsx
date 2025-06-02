
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Clock } from 'lucide-react';

interface Friend {
  name: string;
  emoji: string;
  status: string;
  lastSeen: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ConversationViewProps {
  friend: Friend;
  onBack: () => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({ friend, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const friendId = friend.name.toLowerCase().replace(' ', '-');

  useEffect(() => {
    // Load conversation history
    const savedMessages = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    const conversationMessages = savedMessages
      .map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      .filter((msg: Message) => 
        (msg.senderId === 'current-user' && msg.receiverId === friendId) ||
        (msg.senderId === friendId && msg.receiverId === 'current-user')
      )
      .sort((a: Message, b: Message) => a.timestamp.getTime() - b.timestamp.getTime());
    
    setMessages(conversationMessages);
  }, [friendId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      receiverId: friendId,
      receiverName: friend.name,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false
    };

    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    existingMessages.push(message);
    localStorage.setItem('messageHistory', JSON.stringify(existingMessages));

    // Update local state
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-4 rounded-b-3xl mb-6">
        <div className="flex items-center">
          <Button
            onClick={onBack}
            className="bg-white text-forest-green rounded-full p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <div className="text-3xl mr-3">{friend.emoji}</div>
            <div>
              <h1 className="text-xl font-bold text-white">{friend.name}</h1>
              <p className="text-sm text-white opacity-80">{friend.lastSeen}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 mb-24">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">👋</div>
            <p className="text-forest-green font-semibold">No messages yet</p>
            <p className="text-sm text-text-dark">Start a conversation with {friend.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.senderId === 'current-user'
                      ? 'bg-bright-green text-white'
                      : 'bg-white border-2 border-light-green text-bright-green'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <Clock className="w-3 h-3 opacity-60" />
                    <span className="text-xs opacity-60">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-light-green p-4">
        <div className="flex space-x-3">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-2xl border-2 border-light-green resize-none"
            rows={2}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-bright-green text-white rounded-2xl px-6 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
