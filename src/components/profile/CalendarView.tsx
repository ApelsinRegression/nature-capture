
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { userManager } from '@/utils/userManager';

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

  // Get current user's walking sessions directly from userManager
  const currentUser = userManager.getCurrentUser();
  const walkingSessions = currentUser?.walkingSessions || [];

  console.log('Walking sessions:', walkingSessions);
  console.log('Current user coins:', currentUser?.coins);

  // Calculate coins from distance (same formula as in the app)
  const calculateCoinsFromDistance = (distance: number) => {
    return Math.floor(distance * 10);
  };

  // Find session for selected date and calculate coins earned that day
  const getCoinsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    console.log('Looking for session on date:', dateStr);
    
    const session = walkingSessions.find(session => {
      const sessionDate = new Date(session.date).toISOString().split('T')[0];
      console.log('Comparing with session date:', sessionDate);
      return sessionDate === dateStr;
    });
    
    if (session && session.distance > 0) {
      const coins = calculateCoinsFromDistance(session.distance);
      console.log('Found session with distance:', session.distance, 'coins:', coins);
      return coins;
    }
    
    console.log('No session found for date:', dateStr);
    return 0;
  };

  // Find session for selected date
  const findSessionForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return walkingSessions.find(session => {
      const sessionDate = new Date(session.date).toISOString().split('T')[0];
      return sessionDate === dateStr;
    });
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

  // Get color based on coins earned with brown-orange-yellow progression
  const getCoinColor = (coins: number) => {
    if (coins === 0) return 'bg-gray-200';
    if (coins >= 1 && coins <= 50) return 'bg-amber-800'; // Brown
    if (coins >= 51 && coins <= 150) return 'bg-orange-500'; // Orange
    if (coins >= 151) return 'bg-yellow-400'; // Yellow
    return 'bg-gray-200';
  };

  // Custom day content to show coins earned
  const customDayContent = (date: Date) => {
    const coins = getCoinsForDate(date);
    const colorClass = getCoinColor(coins);
    
    console.log('Rendering day:', date.getDate(), 'with coins:', coins, 'color:', colorClass);
    
    if (coins > 0) {
      return (
        <div className={`relative w-full h-full rounded-full flex flex-col items-center justify-center ${colorClass} min-h-[32px]`}>
          <div className="text-xs font-bold text-white">{date.getDate()}</div>
          <div className="text-xs text-white font-bold">
            {coins}🪙
          </div>
        </div>
      );
    }
    return (
      <div className="relative w-full h-full rounded-full flex items-center justify-center bg-gray-200 min-h-[32px]">
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
          <p className="text-sm text-gray-600 text-center">Total coins: {currentUser?.coins || 0} 🪙</p>
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
              hasCoins: (date) => getCoinsForDate(date) > 0
            }}
            modifiersStyles={{
              hasCoins: { backgroundColor: 'transparent' }
            }}
          />
        </div>

        <div className="mt-6 flex justify-center flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span className="font-bold">No coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-amber-800 rounded"></div>
            <span className="font-bold">1-50 coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="font-bold">51-150 coins</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="font-bold">151+ coins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
