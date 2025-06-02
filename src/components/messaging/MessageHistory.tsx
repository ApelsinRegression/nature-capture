
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';

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

interface MessageHistoryProps {
  onBack: () => void;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load message history from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    const parsedMessages = savedMessages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
    setMessages(parsedMessages.sort((a: Message, b: Message) => b.timestamp.getTime() - a.timestamp.getTime()));
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green p-4 rounded-b-3xl mb-6">
        <div className="flex items-center mb-4">
          <Button
            onClick={onBack}
            className="bg-white text-forest-green rounded-full p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">📨 Message History</h1>
        </div>
      </div>

      {/* Message History */}
      <div className="px-4 pb-20">
        {Object.keys(messageGroups).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-forest-green font-semibold">No messages yet</p>
            <p className="text-sm text-text-dark">Start a conversation to see your message history here</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
            <div key={dateKey} className="mb-6">
              {/* Date Header */}
              <div className="text-center mb-4">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-forest-green border-2 border-light-green">
                  {new Date(dateKey).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              {/* Messages for this date */}
              <div className="space-y-3">
                {dayMessages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white rounded-2xl p-4 shadow-lg border-2 border-light-green"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">💬</span>
                        <div>
                          <p className="font-bold text-forest-green text-sm">
                            {message.senderId === 'current-user' ? 'You' : message.senderName}
                          </p>
                          <p className="text-xs text-text-dark">
                            to {message.receiverId === 'current-user' ? 'You' : message.receiverName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-text-dark" />
                        <span className="text-xs text-text-dark">
                          {formatDateTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-bright-green bg-light-green rounded-lg p-2">
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageHistory;
