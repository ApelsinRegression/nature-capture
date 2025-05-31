
import React from 'react';
import { Beaker, Droplets, Wind, Microscope } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  granted: boolean;
}

interface EnvironmentalDataProps {
  location: LocationData | null;
}

const EnvironmentalData: React.FC<EnvironmentalDataProps> = ({ location }) => {
  const scienceData = {
    airQuality: { value: 42, status: 'Good', color: 'bg-forest-green' },
    waterQuality: { value: 7.2, status: 'Clean', color: 'bg-bright-green' },
    biodiversity: { value: 85, status: 'Rich', color: 'bg-yellow-accent' },
    carbonOffset: { value: 12, status: 'kg CO₂', color: 'bg-orange-accent' }
  };

  return (
    <div className="duolingo-card">
      <h2 className="text-2xl font-nunito font-bold text-bright-green mb-6 text-center">
        🧪 Environmental Science
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className={`circle-stat ${scienceData.airQuality.color} text-white mx-auto mb-2`}>
            <Wind className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{scienceData.airQuality.value}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Air Quality</div>
          <div className="text-xs text-bright-green">{scienceData.airQuality.status}</div>
        </div>

        <div className="text-center">
          <div className={`circle-stat ${scienceData.waterQuality.color} text-white mx-auto mb-2`}>
            <Droplets className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{scienceData.waterQuality.value}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Water pH</div>
          <div className="text-xs text-bright-green">{scienceData.waterQuality.status}</div>
        </div>

        <div className="text-center">
          <div className={`circle-stat ${scienceData.biodiversity.color} text-bright-green mx-auto mb-2`}>
            <Microscope className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{scienceData.biodiversity.value}%</div>
          </div>
          <div className="text-sm font-bold text-text-dark">Biodiversity</div>
          <div className="text-xs text-bright-green">{scienceData.biodiversity.status}</div>
        </div>

        <div className="text-center">
          <div className={`circle-stat ${scienceData.carbonOffset.color} text-white mx-auto mb-2`}>
            <Beaker className="w-6 h-6 mb-1" />
            <div className="text-lg font-bold">{scienceData.carbonOffset.value}</div>
          </div>
          <div className="text-sm font-bold text-text-dark">CO₂ Offset</div>
          <div className="text-xs text-bright-green">{scienceData.carbonOffset.status}</div>
        </div>
      </div>

      <div className="mt-6 bg-light-green rounded-2xl p-4">
        <div className="text-center">
          <p className="font-bold text-bright-green text-lg">🌱 Today's Impact</p>
          <p className="text-sm text-text-dark mt-2">
            Your 30 minutes outdoors helped offset 12kg of CO₂ and supported local biodiversity! 
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalData;
