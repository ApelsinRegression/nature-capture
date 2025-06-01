
import React from 'react';
import { Users } from 'lucide-react';

interface Activity {
  type: string;
  difficulty: string;
  title: string;
  location: string;
  time: string;
}

interface GroupActivitiesProps {
  joinedActivities: Activity[];
}

const GroupActivities: React.FC<GroupActivitiesProps> = ({ joinedActivities }) => {
  if (joinedActivities.length === 0) return null;

  return (
    <div className="px-6 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
        <h2 className="text-xl font-nunito font-bold text-bright-green mb-4 text-center flex items-center justify-center">
          <Users className="w-6 h-6 mr-2" />
          🚶 My Group Activities 🚶
        </h2>
        <div className="space-y-3">
          {joinedActivities.map((activity, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-accent to-light-green rounded-2xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-bright-green text-white px-2 py-1 rounded-full text-xs font-black">
                      {activity.type}
                    </span>
                    <span className="text-xs font-bold text-text-dark">{activity.difficulty}</span>
                  </div>
                  <p className="font-bold text-bright-green">{activity.title}</p>
                  <p className="text-xs text-text-dark">📍 {activity.location} • ⏰ {activity.time}</p>
                </div>
                <div className="bg-white rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-bright-green">✅ Joined</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupActivities;
