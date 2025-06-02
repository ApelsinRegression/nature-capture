
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface EventCreatorProps {
  onBack: () => void;
}

const EventCreator: React.FC<EventCreatorProps> = ({ onBack }) => {
  const [eventData, setEventData] = useState({
    title: '',
    type: 'Nature Walk',
    difficulty: 'Easy',
    location: '',
    date: '',
    time: '',
    description: ''
  });

  const handleCreateEvent = () => {
    if (!eventData.title || !eventData.location || !eventData.date || !eventData.time) {
      alert('Please fill in all required fields!');
      return;
    }

    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdBy: 'current-user',
      participants: ['current-user'],
      createdAt: new Date()
    };

    // Save to localStorage
    const existingEvents = JSON.parse(localStorage.getItem('createdEvents') || '[]');
    existingEvents.push(newEvent);
    localStorage.setItem('createdEvents', JSON.stringify(existingEvents));

    alert('Event created successfully! 🎉');
    onBack();
  };

  const eventTypes = ['Nature Walk', 'Hiking', 'Bird Watching', 'Photography', 'Meditation'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            className="bg-forest-green text-white rounded-full p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-black text-bright-green">🌿 Create Event</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-bright-green mb-2">📝 Event Title:</label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Morning Nature Walk"
              className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">🚶 Type:</label>
              <select
                value={eventData.type}
                onChange={(e) => setEventData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">💪 Difficulty:</label>
              <select
                value={eventData.difficulty}
                onChange={(e) => setEventData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-bright-green mb-2">📍 Location:</label>
            <input
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Central Park, New York"
              className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">📅 Date:</label>
              <input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">⏰ Time:</label>
              <input
                type="time"
                value={eventData.time}
                onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-bright-green mb-2">📄 Description:</label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Join us for a peaceful morning walk through the park..."
              className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleCreateEvent}
              className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
            >
              ✅ Create Event
            </Button>
            <Button
              onClick={onBack}
              className="bg-gray-500 text-white font-black py-3 rounded-2xl hover:bg-gray-600 transition-all"
            >
              ❌ Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreator;
