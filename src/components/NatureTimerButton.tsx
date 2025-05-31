
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-playfair font-semibold text-forest-green">
              Ready for Nature?
            </h2>
            <p className="text-sm text-slate-gray">
              Track your outdoor time and earn rewards
            </p>
          </div>
          
          <Button
            onClick={onStart}
            disabled={isActive || !locationGranted}
            className={`
              w-full h-16 text-lg font-semibold rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-gray-400 cursor-not-allowed' 
                : locationGranted
                  ? 'bg-forest-green hover:bg-green-700 animate-pulse-glow shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Play className="w-6 h-6 mr-2" />
            {isActive ? 'Session Active' : 'Start Nature Time'}
          </Button>
          
          {!locationGranted && (
            <div className="flex items-center justify-center space-x-2 text-red-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Location access required</span>
            </div>
          )}
          
          <div className="text-xs text-slate-gray">
            Earn 1 NatureCoin per minute outdoors
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NatureTimerButton;
