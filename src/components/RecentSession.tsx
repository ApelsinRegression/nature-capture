
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Route, Activity, Heart } from 'lucide-react';

const RecentSession = () => {
  // Mock data for the most recent session
  const recentSession = {
    date: 'Yesterday',
    duration: '23 min',
    distance: '1.2 km',
    calories: 89,
    moodRating: 4,
    location: 'Central Park Trail',
    coinsEarned: 46
  };

  const getMoodEmoji = (rating: number) => {
    const moods = ['😰', '😕', '😐', '😊', '😄'];
    return moods[rating - 1] || '😐';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-playfair text-forest-green flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Recent Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-earth-brown">{recentSession.location}</h3>
            <Badge variant="secondary" className="bg-sunlight-yellow text-earth-brown">
              +{recentSession.coinsEarned} coins
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Duration */}
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-forest-green" />
              <div className="font-semibold text-forest-green">{recentSession.duration}</div>
              <div className="text-xs text-slate-gray">Duration</div>
            </div>

            {/* Distance */}
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Route className="w-5 h-5 mx-auto mb-1 text-sky-blue" />
              <div className="font-semibold text-sky-blue">{recentSession.distance}</div>
              <div className="text-xs text-slate-gray">Distance</div>
            </div>

            {/* Calories */}
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Activity className="w-5 h-5 mx-auto mb-1 text-orange-500" />
              <div className="font-semibold text-orange-500">{recentSession.calories}</div>
              <div className="text-xs text-slate-gray">Calories</div>
            </div>

            {/* Mood */}
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <div className="text-xl mb-1">{getMoodEmoji(recentSession.moodRating)}</div>
              <div className="font-semibold text-pink-600">Mood</div>
              <div className="text-xs text-slate-gray">{recentSession.moodRating}/5</div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-gray">{recentSession.date}</span>
              <div className="flex items-center space-x-4">
                <span className="text-slate-gray">Benefits:</span>
                <Badge variant="outline" className="text-xs">+15 IU Vitamin D</Badge>
                <Badge variant="outline" className="text-xs">-12% Stress</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSession;
