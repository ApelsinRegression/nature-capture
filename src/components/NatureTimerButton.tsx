
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, MapPin } from 'lucide-react';

interface NatureTimerButtonProps {
  isActive: boolean;
  onStart: () => void;
  locationGranted: boolean;
}

const NatureTimerButton: React.FC<NatureTimerButtonProps> = ({ 
  isActive, 
  onStart, 
  locationGranted 
}) => {
  return (
    <div className="duolingo-card text-center space-y-6">
      <div className="space-y-3">
        <div className="w-16 h-16 bg-forest-green rounded-full mx-auto flex items-center justify-center bounce-in">
          <Play className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-nunito font-bold text-bright-green">
          Ready for Nature?
        </h2>
        <p className="text-lg text-text-dark font-semibold">
          Track your outdoor time and earn rewards! 🌿
        </p>
      </div>
      
      <Button
        onClick={onStart}
        disabled={isActive || !locationGranted}
        className={`
          duolingo-button w-full h-16 text-xl 
          ${isActive 
            ? 'bg-gray-400 cursor-not-allowed hover:scale-100' 
            : locationGranted
              ? 'pulse-green' 
              : 'bg-gray-400 cursor-not-allowed hover:scale-100'
          }
        `}
      >
        <Play className="w-6 h-6 mr-3" />
        {isActive ? '🏃 Session Active!' : '🌱 Start Nature Time'}
      </Button>
      
      {!locationGranted && (
        <div className="flex items-center justify-center space-x-2 bg-orange-accent rounded-full py-3 px-4 text-white font-bold">
          <MapPin className="w-5 h-5" />
          <span>📍 Location access required</span>
        </div>
      )}
      
      <div className="bg-yellow-accent rounded-full py-2 px-4 text-bright-green font-bold text-sm">
        🪙 Earn 1 NatureCoin per minute outdoors!
      </div>
    </div>
  );
};

export default NatureTimerButton;
