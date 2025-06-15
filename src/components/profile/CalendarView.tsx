
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

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

interface CalendarViewProps {
  calendarData: any[];
  onBackClick: () => void;
  onSessionClick: (session: WalkingSession) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  calendarData, 
  onBackClick, 
  onSessionClick 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Find session for selected date
  const findSessionForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarData.find(day => {
      if (!day.session) return false;
      const sessionDate = new Date(day.session.date).toISOString().split('T')[0];
      return sessionDate === dateStr;
    })?.session;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const session = findSessionForDate(date);
      if (session) {
        onSessionClick(session);
      }
    }
  };

  // Custom day content to show walking distances
  const customDayContent = (date: Date) => {
    const session = findSessionForDate(date);
    if (session && session.distance > 0) {
      return (
        <div className="relative">
          <div className="text-xs font-bold">{date.getDate()}</div>
          <div className="text-xs text-green-600 font-bold">
            {session.distance.toFixed(1)}km
          </div>
        </div>
      );
    }
    return <div className="text-sm">{date.getDate()}</div>;
  };

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

        <div className="flex justify-center mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className={cn("p-3 pointer-events-auto border rounded-lg")}
            components={{
              Day: ({ date, ...props }) => (
                <div className="relative p-2 hover:bg-green-100 rounded cursor-pointer">
                  {customDayContent(date)}
                </div>
              )
            }}
            modifiers={{
              hasSession: (date) => !!findSessionForDate(date)
            }}
            modifiersStyles={{
              hasSession: { backgroundColor: '#dcfce7', fontWeight: 'bold' }
            }}
          />
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
