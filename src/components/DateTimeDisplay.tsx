
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
    <div className="bg-white/20 rounded-lg p-2 text-white backdrop-blur-sm">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1 mb-1">
          <Calendar className="w-3 h-3" />
          <p className="font-bold text-xs">{formatDate(currentTime)}</p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Clock className="w-3 h-3" />
          <p className="font-bold text-xs">{formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
