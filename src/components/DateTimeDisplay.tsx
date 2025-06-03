
import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const DateTimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-2xl p-4 text-white mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6" />
          <div>
            <p className="font-bold text-sm">📅 Today</p>
            <p className="font-black text-lg">{formatDate(currentTime)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-bold text-sm">🕐 Time</p>
            <p className="font-black text-xl">{formatTime(currentTime)}</p>
          </div>
          <Clock className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
