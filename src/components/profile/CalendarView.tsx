
import React from 'react';
import { Button } from '@/components/ui/button';

interface WalkingSession {
  date: string;
  distance: number;
  time: number;
  route: any[];
  photos: any[];
  comments: any[];
  feeling: number;
  activities: string[];
}

interface CalendarDay {
  day: number;
  distance: number;
  hasActivity: boolean;
  session: WalkingSession | null;
  isCurrentMonth: boolean;
}

interface CalendarViewProps {
  calendarData: CalendarDay[];
  onBackClick: () => void;
  onSessionClick: (session: WalkingSession) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  calendarData, 
  onBackClick, 
  onSessionClick 
}) => {
  const getDistanceColor = (distance: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return 'bg-gray-50 text-gray-300';
    if (distance === 0) return 'bg-gray-100';
    if (distance < 1) return 'bg-green-200';
    if (distance < 3) return 'bg-green-400';
    if (distance < 5) return 'bg-green-600';
    return 'bg-green-800';
  };

  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-bright-green">📅 {monthName} Walking Calendar 📅</h2>
          <Button 
            onClick={onBackClick}
            className="bg-forest-green text-white rounded-full px-4 py-2"
          >
            ← Back
          </Button>
        </div>
        
        <div className="mb-4">
          <p className="text-base font-bold text-bright-green text-center">🚶 Daily Walking Distances 🚶</p>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center font-bold text-bright-green p-2 text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((day, index) => (
            <div
              key={index}
              onClick={() => day.session && onSessionClick(day.session)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold cursor-pointer transition-all hover:scale-105 ${getDistanceColor(day.distance, day.isCurrentMonth)}`}
            >
              <span className={`text-xs ${day.isCurrentMonth ? 'text-white' : 'text-gray-400'}`}>{day.day}</span>
              {day.distance > 0 && day.isCurrentMonth && (
                <span className="text-xs text-white">{day.distance.toFixed(1)}km</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <span className="font-bold">Less than 1km</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="font-bold">1-3km</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span className="font-bold">3-5km</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-800 rounded"></div>
            <span className="font-bold">5km+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
