
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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

interface SessionDetailsProps {
  session: WalkingSession;
  onClose: () => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session, onClose }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-accent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-bright-green">📅 Session Details 📅</h2>
          <Button 
            onClick={onClose}
            className="bg-forest-green text-white rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-light-green rounded-2xl p-4">
            <h3 className="font-black text-bright-green text-base mb-2">🗺️ Session Summary 🗺️</h3>
            <p className="font-bold text-text-dark text-sm">📅 Date: {session.date}</p>
            <p className="font-bold text-text-dark text-sm">📏 Distance: {session.distance.toFixed(2)} km</p>
            <p className="font-bold text-text-dark text-sm">⏰ Time: {Math.floor(session.time / 60)}:{(session.time % 60).toString().padStart(2, '0')}</p>
            {session.feeling > 0 && (
              <p className="font-bold text-text-dark text-sm">
                ⭐ Feeling: {Array(session.feeling).fill('⭐').join('')}
              </p>
            )}
          </div>

          {session.route.length > 1 && (
            <div className="bg-light-green rounded-2xl p-4">
              <h3 className="font-black text-bright-green text-base mb-2">🗺️ Route Map 🗺️</h3>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">📍➡️📍</div>
                <p className="font-bold text-bright-green text-sm">Route with {session.route.length} GPS points</p>
                <p className="text-xs text-text-dark">Start → Journey → Finish</p>
              </div>
            </div>
          )}

          {session.photos.length > 0 && (
            <div className="bg-light-green rounded-2xl p-4">
              <h3 className="font-black text-bright-green text-base mb-2">📸 Photos 📸</h3>
              <div className="space-y-2">
                {session.photos.map((photo, index) => (
                  <div key={index} className="bg-white rounded-xl p-3">
                    <p className="font-bold text-text-dark text-sm break-all">{photo.url}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {session.comments.length > 0 && (
            <div className="bg-light-green rounded-2xl p-4">
              <h3 className="font-black text-bright-green text-base mb-2">💬 Comments 💬</h3>
              <div className="space-y-2">
                {session.comments.map((comment, index) => (
                  <div key={index} className="bg-white rounded-xl p-3">
                    <p className="font-bold text-text-dark text-sm break-words">"{comment.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {session.activities.length > 0 && (
            <div className="bg-light-green rounded-2xl p-4">
              <h3 className="font-black text-bright-green text-base mb-2">🎯 Activities 🎯</h3>
              <div className="flex flex-wrap gap-2">
                {session.activities.map((activity, index) => (
                  <span key={index} className="bg-forest-green text-white px-3 py-1 rounded-full text-xs font-bold">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
