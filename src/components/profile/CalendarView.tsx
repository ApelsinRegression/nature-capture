
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

  // Calculate coins from distance (same formula as in the app)
  const calculateCoinsFromDistance = (distance: number) => {
    return Math.floor(distance * 10);
  };

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

  // Get color based on coins earned with new categories
  const getCoinColor = (coins: number) => {
    if (coins === 0) return 'bg-gray-200';
    if (coins >= 1 && coins <= 50) return 'bg-yellow-200';
    if (coins >= 51 && coins <= 150) return 'bg-yellow-500';
    if (coins >= 151) return 'bg-yellow-700';
    return 'bg-gray-200';
  };

  // Custom day content to show coins earned
  const customDayContent = (date: Date) => {
    const session = findSessionForDate(date);
    if (session && session.distance > 0) {
      const coins = calculateCoinsFromDistance(session.distance);
      const colorClass = getCoinColor(coins);
      
      return (
        <div className={`relative w-full h-full rounded-full flex flex-col items-center justify-center ${colorClass} min-h-[32px]`}>
          <div className="text-xs font-bold text-gray-800">{date.getDate()}</div>
          <div className="text-xs text-gray-800 font-bold">
            {coins}🪙
          </div>
        </div>
      );
    }
    return (
      <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gray-100 min-h-[32px]">
        <div className="text-sm text-gray-600">{date.getDate()}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-bright-green">🪙 {monthName} Coin Calendar 🪙</h2>
          <Button 
            onClick={onBackClick}
            className="bg-forest-green text-white rounded-full px-4 py-2"
          >
            ← Back
          </Button>
        </div>
        
        <div className="mb-4">
          <p className="text-base font-bold text-bright-green text-center">💰 Daily Coins Earned 💰</p>
        </div>

        <div className="flex justify-center mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className={cn("p-3 pointer-events-auto border rounded-lg")}
            components={{
              Day: ({ date, ...props }) => (
                <div className="relative p-1 hover:bg-green-100 rounded cursor-pointer w-9 h-9 flex items-center justify-center">
                  {customDayContent(date)}
                </div>
              )
            }}
            modifiers={{
              hasSession: (date) => !!findSessionForDate(date)
            }}
            modifiersStyles={{
              hasSession: { backgroundColor: 'transparent' }
            }}
          />
        </div>

        <div className="mt-6 flex justify-center flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="font-bold">No coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-200 rounded"></div>
            <span className="font-bold">1-50 coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="font-bold">51-150 coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-700 rounded"></div>
            <span className="font-bold">151+ coins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
