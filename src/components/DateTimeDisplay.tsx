
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
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white/20 rounded-xl px-3 py-2 backdrop-blur-sm">
        <Calendar className="w-4 h-4" />
        <span className="font-bold text-sm">{formatDate(currentTime)}</span>
      </div>
      <div className="flex items-center space-x-2 bg-white/20 rounded-xl px-3 py-2 backdrop-blur-sm">
        <Clock className="w-4 h-4" />
        <span className="font-bold text-sm">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
