
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
    <div className="bg-white/20 rounded-2xl p-3 text-white backdrop-blur-sm shadow-lg">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Calendar className="w-4 h-4" />
          <p className="font-bold text-sm">{formatDate(currentTime)}</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4" />
          <p className="font-bold text-sm">{formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
