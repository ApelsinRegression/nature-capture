import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Pause, MapPin, Activity, Wind, Thermometer, Eye, MessageSquare, Camera, Star, Send } from 'lucide-react';
import RealTimeMap from '../components/RealTimeMap';
import AirQualityMonitor from '../components/AirQualityMonitor';
import WeatherMonitor from '../components/WeatherMonitor';
import ExtendedWeatherInfo from '../components/ExtendedWeatherInfo';
import DateTimeDisplay from '../components/DateTimeDisplay';

interface Position {
  lat: number;
  lng: number;
}

interface SessionPhoto {
  id: string;
  url: string;
  timestamp: number;
}

interface SessionComment {
  id: string;
  text: string;
  timestamp: number;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [location, setLocation] = useState<{granted: boolean}>({ granted: false });
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [sessionRoute, setSessionRoute] = useState<Position[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [showFriendMessage, setShowFriendMessage] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sessionPhotos, setSessionPhotos] = useState<SessionPhoto[]>([]);
  const [sessionComments, setSessionComments] = useState<SessionComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [feelingRating, setFeelingRating] = useState<number>(0);
  const [showPhotoComment, setShowPhotoComment] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);
  const [suggestedActivities, setSuggestedActivities] = useState<string[]>([]);

  const environmentalData = {
    airQuality: 42,
    temperature: 22,
    humidity: 65,
    windSpeed: 8,
    uvIndex: 4
  };

  const allActivities = [
    { name: 'Morning Walk', icon: '🚶', duration: '30 min', calories: '120 cal', difficulty: 'Easy', coins: 30 },
    { name: 'Park Yoga', icon: '🧘', duration: '45 min', calories: '180 cal', difficulty: 'Medium', coins: 45 },
    { name: 'Nature Photography', icon: '📸', duration: '60 min', calories: '90 cal', difficulty: 'Easy', coins: 35 },
    { name: 'Tree Meditation', icon: '🌳', duration: '20 min', calories: '50 cal', difficulty: 'Easy', coins: 25 },
    { name: 'Bird Watching', icon: '🦅', duration: '40 min', calories: '80 cal', difficulty: 'Easy', coins: 40 },
  ];

  const nearbyParks = [
    { name: 'Central Green Park', distance: '0.3 km', rating: 4.8, type: 'Urban Park' },
    { name: 'Riverside Trail', distance: '0.8 km', rating: 4.9, type: 'Nature Trail' },
    { name: 'Sunset Hill', distance: '1.2 km', rating: 4.7, type: 'Hiking' },
  ];

  const healthBenefits = [
    { name: 'Cognitive Boost', icon: '🧠', description: '+15% focus improvement' },
    { name: 'Vitamin D', icon: '☀️', description: '+25% daily requirement' },
    { name: 'Stress Relief', icon: '😌', description: '-30% cortisol levels' },
    { name: 'Mood Enhancement', icon: '😊', description: '+20% serotonin production' },
  ];

  const friends = [
    { name: 'Alex Green', avatar: '🌿' },
    { name: 'Maya Forest', avatar: '🌳' },
    { name: 'Leo Sunshine', avatar: '☀️' },
    { name: 'Luna Star', avatar: '⭐' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  useEffect(() => {
    // Auto-request location permission on component mount
    if (!locationPermissionRequested) {
      requestLocationPermission();
      setLocationPermissionRequested(true);
    }
    
    // Cleanup location watch when component unmounts
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId, locationPermissionRequested]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startLocationTracking = () => {
    if ('geolocation' in navigator) {
      console.log('Starting location tracking...');
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('Location updated:', newPos);
          setCurrentPosition(newPos);
          setLocation({ granted: true });
          
          // Add to route if session is active
          if (isSessionActive) {
            setSessionRoute(prev => [...prev, newPos]);
          }
        },
        (error) => {
          console.error('Location tracking error:', error);
          // Don't set granted to false here, just log the error
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000
        }
      );
      
      setWatchId(id);
    }
  };

  const requestLocationPermission = () => {
    console.log('Requesting location permission...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log('Location permission granted:', newPos);
          setCurrentPosition(newPos);
          setLocation({ granted: true });
          
          // Start continuous tracking
          startLocationTracking();
        },
        (error) => {
          console.error('Location permission error:', error);
          setLocation({ granted: false });
          // Show user-friendly message
          alert('📍 Location access is needed to track your outdoor sessions. Please enable location in your browser settings and refresh the page.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      alert('❌ Geolocation is not supported by this browser.');
    }
  };

  const handleStartStop = () => {
    console.log('Handle start/stop clicked. Location granted:', location.granted, 'Session active:', isSessionActive);
    
    if (!location.granted && !isSessionActive) {
      // Request location first
      console.log('Requesting location permission...');
      requestLocationPermission();
      return;
    }
    
    if (isSessionActive) {
      console.log('Stopping session...');
      setIsSessionActive(false);
      // Save session data
      const sessionData = {
        date: new Date().toDateString(),
        distance: calculateDistance(),
        time: sessionTime,
        route: sessionRoute,
        photos: sessionPhotos,
        comments: sessionComments,
        feeling: feelingRating,
        activities: completedActivities
      };
      
      // Store in localStorage for calendar
      const existingSessions = JSON.parse(localStorage.getItem('walkingSessions') || '[]');
      existingSessions.push(sessionData);
      localStorage.setItem('walkingSessions', JSON.stringify(existingSessions));
      
      setShowSessionComplete(true);
      setTimeout(() => {
        setShowSessionComplete(false);
        setSessionTime(0);
        setCompletedActivities([]);
        setSessionRoute([]);
        setSessionPhotos([]);
        setSessionComments([]);
        setFeelingRating(0);
        setSuggestedActivities([]);
      }, 15000);
    } else {
      // Start session with suggested activities
      console.log('Starting session...');
      setIsSessionActive(true);
      if (currentPosition) {
        setSessionRoute([currentPosition]);
      }
    }
  };

  const handleActivityComplete = (activityName: string) => {
    if (!completedActivities.includes(activityName)) {
      setCompletedActivities([...completedActivities, activityName]);
    }
  };

  const handleTryActivity = (activityName: string) => {
    if (!suggestedActivities.includes(activityName)) {
      setSuggestedActivities([...suggestedActivities, activityName]);
    }
    alert(`✅ ${activityName} added to your session suggestions! Start your session to track this activity.`);
  };

  const calculateTotalCoins = () => {
    const baseCoins = Math.floor(sessionTime / 60);
    const activityCoins = completedActivities.reduce((total, activityName) => {
      const activity = allActivities.find(a => a.name === activityName);
      return total + (activity?.coins || 0);
    }, 0);
    return baseCoins + activityCoins;
  };

  const handleStreakClick = () => {
    navigate('/profile');
  };

  const handlePositionUpdate = (position: Position) => {
    setCurrentPosition(position);
    setSessionRoute(prev => [...prev, position]);
  };

  const handleSendMessage = () => {
    if (selectedFriend && messageText.trim()) {
      alert(`✅ Message sent to ${selectedFriend}: "${messageText}"`);
      setShowMessaging(false);
      setMessageText('');
      setSelectedFriend('');
    } else {
      alert('❌ Please select a friend and write a message!');
    }
  };

  const calculateDistance = () => {
    if (sessionRoute.length < 2) return 0;
    let distance = 0;
    for (let i = 1; i < sessionRoute.length; i++) {
      const prev = sessionRoute[i - 1];
      const curr = sessionRoute[i];
      const R = 6371;
      const dLat = (curr.lat - prev.lat) * Math.PI / 180;
      const dLon = (curr.lng - prev.lng) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      distance += R * c;
    }
    return distance;
  };

  const handleTakePhoto = () => {
    // Simulate taking a photo
    const newPhoto: SessionPhoto = {
      id: Date.now().toString(),
      url: `📸 Photo taken at ${formatTime(sessionTime)}`,
      timestamp: Date.now()
    };
    setSessionPhotos([...sessionPhotos, newPhoto]);
    alert('📸 Photo captured! ✨');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: SessionComment = {
        id: Date.now().toString(),
        text: newComment,
        timestamp: Date.now()
      };
      setSessionComments([...sessionComments, comment]);
      setNewComment('');
      alert('💬 Comment added! ✨');
    }
  };

  // Messaging Component
  if (showMessaging) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
          <h2 className="text-2xl font-black text-bright-green mb-6 text-center">💬 Send Message 💬</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-bright-green mb-3">👥 Select Friend:</label>
              <div className="grid grid-cols-2 gap-3">
                {friends.map((friend, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFriend(friend.name)}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      selectedFriend === friend.name
                        ? 'bg-forest-green text-white border-forest-green'
                        : 'bg-light-green border-bright-green text-bright-green hover:bg-bright-green hover:text-white'
                    }`}
                  >
                    <div className="text-2xl mb-1">{friend.avatar}</div>
                    <div className="text-sm font-bold">{friend.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">💬 Your Message:</label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Hey! Want to go for a nature walk together? 🌿"
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSendMessage}
                className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
              >
                <Send className="w-5 h-5 mr-2" />
                ✅ Send Message
              </Button>
              <Button
                onClick={() => setShowMessaging(false)}
                className="bg-gray-500 text-white font-black py-3 rounded-2xl hover:bg-gray-600 transition-all"
              >
                ❌ Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPhotoComment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-forest-green">
          <h2 className="text-2xl font-black text-bright-green mb-6 text-center">📸 Add Photo & Comment 📸</h2>
          
          <div className="space-y-6">
            <Button
              onClick={handleTakePhoto}
              className="w-full bg-yellow-accent text-bright-green font-black py-4 rounded-2xl text-lg hover:bg-bright-green hover:text-white transition-all"
            >
              <Camera className="w-6 h-6 mr-3" />
              📸 Take Photo
            </Button>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">💬 Add Comment:</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Beautiful sunset by the lake! 🌅"
                className="w-full p-3 rounded-2xl border-2 border-light-green font-bold text-bright-green resize-none"
                rows={3}
              />
              <Button
                onClick={handleAddComment}
                className="mt-2 bg-forest-green text-white font-black py-2 rounded-2xl hover:bg-bright-green transition-all"
              >
                ✅ Add Comment
              </Button>
            </div>

            <div>
              <label className="block text-lg font-bold text-bright-green mb-2">⭐ How do you feel? (1-5 stars)</label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeelingRating(star)}
                    className={`text-3xl transition-all hover:scale-110 ${
                      star <= feelingRating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setShowPhotoComment(false)}
                className="bg-forest-green text-white font-black py-3 rounded-2xl hover:bg-bright-green transition-all"
              >
                ✅ Done
              </Button>
              <Button
                onClick={() => setShowPhotoComment(false)}
                className="bg-gray-500 text-white font-black py-3 rounded-2xl hover:bg-gray-600 transition-all"
              >
                ❌ Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green to-bright-green flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-accent text-center max-w-md w-full">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-black text-bright-green mb-6">✨ Session Complete! ✨</h2>
          
          {/* Route Summary */}
          {sessionRoute.length > 1 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-bright-green mb-3">🗺️ Your Route 🗺️</h3>
              <div className="bg-light-green rounded-2xl p-4 border-2 border-forest-green">
                <div className="text-center">
                  <div className="text-4xl mb-2">🛤️</div>
                  <p className="font-bold text-bright-green">Distance: {calculateDistance().toFixed(2)} km</p>
                  <p className="text-sm font-bold text-text-dark">Route tracked with GPS</p>
                </div>
              </div>
            </div>
          )}

          {/* Health Benefits */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-bright-green mb-4">🌟 Benefits Gained 🌟</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-light-green rounded-2xl p-3">
                <div className="text-2xl mb-1">🧠</div>
                <p className="font-bold text-bright-green text-sm">Cognitive Boost</p>
                <p className="text-xs text-text-dark">+15% focus improvement</p>
              </div>
              <div className="bg-light-green rounded-2xl p-3">
                <div className="text-2xl mb-1">☀️</div>
                <p className="font-bold text-bright-green text-sm">Vitamin D</p>
                <p className="text-xs text-text-dark">+25% daily requirement</p>
              </div>
              <div className="bg-light-green rounded-2xl p-3">
                <div className="text-2xl mb-1">😌</div>
                <p className="font-bold text-bright-green text-sm">Stress Relief</p>
                <p className="text-xs text-text-dark">-30% cortisol levels</p>
              </div>
              <div className="bg-light-green rounded-2xl p-3">
                <div className="text-2xl mb-1">😊</div>
                <p className="font-bold text-bright-green text-sm">Mood Enhancement</p>
                <p className="text-xs text-text-dark">+20% serotonin production</p>
              </div>
            </div>
          </div>

          {/* Activity Tracking */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-bright-green mb-3">🎯 What did you do? 🎯</h3>
            <div className="space-y-2">
              {allActivities.slice(0, 3).map((activity, index) => (
                <button
                  key={index}
                  onClick={() => handleActivityComplete(activity.name)}
                  className={`w-full p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                    completedActivities.includes(activity.name)
                      ? 'bg-yellow-accent border-bright-green text-bright-green'
                      : 'bg-white border-light-green text-text-dark hover:border-bright-green'
                  }`}
                >
                  <span className="mr-2">{activity.icon}</span>
                  <span className="font-bold">{activity.name}</span>
                  <span className="ml-2 text-sm">🪙 +{activity.coins}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Coins and Streak */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-accent to-orange-accent rounded-2xl p-4 text-white">
              <p className="font-black text-xl">🪙 +{calculateTotalCoins()} NatureCoins</p>
              <p className="font-bold">💰 Base: {Math.floor(sessionTime / 60)} + Activities: {calculateTotalCoins() - Math.floor(sessionTime / 60)}</p>
            </div>
            
            <div className="bg-light-green rounded-2xl p-4">
              <p className="font-black text-bright-green text-lg">🔥 Streak: 7 days! 🔥</p>
            </div>
          </div>

          {/* Did You Know */}
          <div className="bg-forest-green rounded-2xl p-4 text-white mb-6">
            <p className="font-bold text-sm mb-2">🌱 Did you know? 🌱</p>
            <p className="font-bold">Spending just 20 minutes in nature can significantly reduce stress hormones and boost your mood! 🧠✨</p>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">⏰ Time Outside</p>
              <p className="font-bold text-text-dark">{formatTime(sessionTime)}</p>
            </div>
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">🔥 Calories</p>
              <p className="font-bold text-text-dark">{Math.floor(sessionTime / 2)} cal</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Improved Header with better date/time positioning */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-4 shadow-xl">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
                alt="Leaf" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-nunito font-black text-white">NatureCapture</h1>
                <p className="text-light-green font-bold text-xs">Ready for adventure? 🌟</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full px-3 py-2 shadow-lg border-2 border-white">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-yellow-500 text-xs font-black">🪙</span>
                </div>
                <span className="font-black text-white text-sm">247</span>
              </div>
            </div>
          </div>
          
          {/* Date and Time - Better positioned */}
          <div className="flex justify-center mb-2">
            <DateTimeDisplay />
          </div>
        </div>
      </div>

      {/* Location Display - Compact single line */}
      {currentPosition && (
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-2 shadow-md border border-bright-green">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4 text-forest-green" />
              <p className="font-bold text-forest-green text-xs">
                📍 {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Map View - Full Leaflet implementation */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-forest-green">
          <h2 className="text-lg font-black text-bright-green mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            🗺️ Live Map 🗺️
          </h2>
          <RealTimeMap 
            isActive={true}
            onPositionUpdate={handlePositionUpdate}
            route={sessionRoute}
          />
        </div>
      </div>

      {/* Environmental Data - Aligned conditions */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green">
          <h2 className="text-lg font-black text-bright-green mb-3 flex items-center">
            <Wind className="w-4 h-4 mr-2" />
            🌤️ Conditions 🌤️
          </h2>
          
          {/* Aligned grid layout for conditions */}
          <div className="grid grid-cols-3 gap-3">
            {/* Temperature */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-3 text-white text-center">
              <Thermometer className="w-5 h-5 mx-auto mb-1" />
              <p className="font-black text-lg">22°C</p>
              <p className="font-bold text-xs">Temperature</p>
            </div>

            {/* Wind Speed */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 text-white text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <p className="font-black text-lg">8 km/h</p>
              <p className="font-bold text-xs">Wind Speed</p>
            </div>

            {/* AQI - Compact size */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-3 text-white text-center">
              <Eye className="w-5 h-5 mx-auto mb-1" />
              <p className="font-black text-lg">42</p>
              <p className="font-bold text-xs">AQI Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Weather Information - More compact */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
          <h2 className="text-lg font-black text-bright-green mb-3">🌈 Weather Details 🌈</h2>
          <ExtendedWeatherInfo position={currentPosition} />
        </div>
      </div>

      {/* Suggested Activities during session */}
      {isSessionActive && suggestedActivities.length > 0 && (
        <div className="px-4 mb-6">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
            <h2 className="text-lg font-black text-bright-green mb-3">🎯 Your Activities</h2>
            <div className="space-y-3">
              {suggestedActivities.map((activityName, index) => {
                const activity = allActivities.find(a => a.name === activityName);
                if (!activity) return null;
                return (
                  <div key={index} className="bg-gradient-to-r from-light-green to-white rounded-2xl p-3 border border-forest-green">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                          <p className="font-black text-bright-green text-sm">{activity.name}</p>
                          <p className="text-xs font-bold text-text-dark">{activity.duration} • {activity.calories}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleActivityComplete(activity.name)}
                        className={`font-black rounded-full px-3 py-1 text-xs transition-all ${
                          completedActivities.includes(activity.name)
                            ? 'bg-green-500 text-white'
                            : 'bg-forest-green text-white hover:bg-bright-green'
                        }`}
                      >
                        {completedActivities.includes(activity.name) ? '✅' : 'Complete'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Timer Section - Cleaner design */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-forest-green relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img 
              src="/lovable-uploads/32708266-d62b-4f42-a05b-822c91a021a8.png" 
              alt="Nature" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 text-center">
            {isSessionActive ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-forest-green rounded-full mx-auto flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-nunito font-black text-bright-green">
                  🌟 Active Session! 🌟
                </h2>
                <div className="text-5xl font-black text-forest-green">
                  {formatTime(sessionTime)}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-yellow-accent rounded-2xl p-3">
                    <p className="text-bright-green font-black text-sm">📍 Distance</p>
                    <p className="text-xl font-black">{calculateDistance().toFixed(1)} km</p>
                  </div>
                  <div className="bg-orange-accent rounded-2xl p-3 text-white">
                    <p className="font-black text-sm">🔥 Calories</p>
                    <p className="text-xl font-black">{Math.floor(sessionTime / 2)}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPhotoComment(true)}
                  className="w-full bg-yellow-accent text-bright-green font-black py-2 rounded-2xl hover:bg-bright-green hover:text-white transition-all"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  📸 Add Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <img 
                    src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
                    alt="Trees" 
                    className="w-12 h-12"
                  />
                  <img 
                    src="/lovable-uploads/55626c2e-ff58-47bb-bdcb-ea80a1c497bc.png" 
                    alt="Footprints" 
                    className="w-12 h-12"
                  />
                </div>
                <h2 className="text-2xl font-nunito font-black text-bright-green">
                  🌈 Ready to Explore? 🌈
                </h2>
                <p className="text-text-dark font-bold">
                  Start your nature time and earn NatureCoins! 🪙✨
                </p>
              </div>
            )}
            
            <Button
              onClick={handleStartStop}
              className={`w-full mt-6 text-lg font-black py-6 rounded-3xl shadow-lg transform transition-all hover:scale-105 ${
                isSessionActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-forest-green to-bright-green text-white'
              }`}
            >
              {isSessionActive ? (
                <>
                  <Pause className="w-6 h-6 mr-2" />
                  🛑 Stop Adventure
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  🚀 Start Nature Time
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested Activities - Cleaner design */}
      {!isSessionActive && (
        <div className="px-4 mb-6">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
            <h2 className="text-lg font-black text-bright-green mb-3">🎯 Suggested for You</h2>
            <div className="space-y-2">
              {allActivities.map((activity, index) => (
                <div key={index} className="bg-gradient-to-r from-light-green to-white rounded-2xl p-3 border border-forest-green">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div>
                        <p className="font-black text-bright-green text-sm">{activity.name}</p>
                        <p className="text-xs font-bold text-text-dark">{activity.duration} • {activity.calories}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleTryActivity(activity.name)}
                      className="bg-forest-green text-white font-black rounded-full px-3 py-1 text-xs hover:bg-bright-green transition-all"
                    >
                      Try
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nearby Parks */}
      {isSessionActive && (
        <div className="px-4 mb-6">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-forest-green">
            <h2 className="text-lg font-black text-bright-green mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              🌳 Parks Nearby
            </h2>
            <div className="space-y-2">
              {nearbyParks.map((park, index) => (
                <div key={index} className="bg-light-green rounded-2xl p-3 border border-forest-green">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-bright-green text-sm">{park.name}</p>
                      <p className="text-xs font-bold text-text-dark">📍 {park.distance} • ⭐ {park.rating}</p>
                    </div>
                    <Button className="bg-yellow-accent text-bright-green font-black rounded-full px-3 py-1 text-xs hover:bg-bright-green hover:text-white transition-all">
                      Go
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3 border-2 border-light-green">
            <div className="text-center">
              <div className="w-10 h-10 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-black text-sm">23</span>
              </div>
              <p className="font-black text-text-dark text-sm">📊 Sessions</p>
            </div>
          </div>
          <div 
            className="bg-white rounded-2xl p-3 border-2 border-light-green cursor-pointer"
            onClick={handleStreakClick}
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-bright-green font-black text-sm">7</span>
              </div>
              <p className="font-black text-text-dark text-sm">🔥 Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messaging Button */}
      <div className="px-4 mb-6">
        <Button 
          onClick={() => setShowMessaging(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black py-3 rounded-2xl hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          💬 Message Friends
        </Button>
      </div>

      {/* Location Status */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-2xl p-3 border-2 border-light-green flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${location.granted ? 'bg-forest-green' : 'bg-orange-accent'}`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <p className="font-black text-text-dark text-sm">
              {location.granted ? '✅ Location Active' : '📍 Enable Location'}
            </p>
          </div>
          {!location.granted && (
            <Button 
              onClick={requestLocationPermission}
              className="bg-gradient-to-r from-forest-green to-bright-green text-white font-black rounded-full px-4 py-1 text-xs hover:scale-105 transition-transform"
            >
              Enable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
