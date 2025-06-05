import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Pause, MapPin, Activity, Wind, Thermometer, Eye, MessageSquare, Camera, Star, Send, RefreshCw, Locate } from 'lucide-react';
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
  comment?: string;
}

interface SessionComment {
  id: string;
  text: string;
  timestamp: number;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(() => {
    return localStorage.getItem('sessionActive') === 'true';
  });
  const [sessionTime, setSessionTime] = useState(() => {
    return parseInt(localStorage.getItem('sessionTime') || '0');
  });
  const [locationGranted, setLocationGranted] = useState(() => {
    return localStorage.getItem('locationGranted') === 'true';
  });
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('sessionCompletedActivities') || '[]');
  });
  const [sessionRoute, setSessionRoute] = useState<Position[]>(() => {
    return JSON.parse(localStorage.getItem('sessionRoute') || '[]');
  });
  const [currentPosition, setCurrentPosition] = useState<Position | null>(() => {
    const saved = localStorage.getItem('currentPosition');
    return saved ? JSON.parse(saved) : null;
  });
  const [showFriendMessage, setShowFriendMessage] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sessionPhotos, setSessionPhotos] = useState<SessionPhoto[]>(() => {
    return JSON.parse(localStorage.getItem('sessionPhotos') || '[]');
  });
  const [sessionComments, setSessionComments] = useState<SessionComment[]>(() => {
    return JSON.parse(localStorage.getItem('sessionComments') || '[]');
  });
  const [newComment, setNewComment] = useState('');
  const [feelingRating, setFeelingRating] = useState<number>(() => {
    return parseInt(localStorage.getItem('sessionFeeling') || '0');
  });
  const [showPhotoComment, setShowPhotoComment] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [suggestedActivities, setSuggestedActivities] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('suggestedActivities') || '[]');
  });
  const [addedActivities, setAddedActivities] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('addedActivities') || '[]');
  });
  const [mapKey, setMapKey] = useState(0); // Force map re-render
  const [shouldCenterMap, setShouldCenterMap] = useState(false);

  const allActivities = [
    { name: 'Morning Walk', icon: '🚶', duration: '30 min', calories: '120 cal', difficulty: 'Easy', coins: 30 },
    { name: 'Park Yoga', icon: '🧘', duration: '45 min', calories: '180 cal', difficulty: 'Medium', coins: 45 },
    { name: 'Nature Photography', icon: '📸', duration: '60 min', calories: '90 cal', difficulty: 'Easy', coins: 35 },
    { name: 'Tree Meditation', icon: '🌳', duration: '20 min', calories: '50 cal', difficulty: 'Easy', coins: 25 },
    { name: 'Bird Watching', icon: '🦅', duration: '40 min', calories: '80 cal', difficulty: 'Easy', coins: 40 },
  ];

  const friends = [
    { name: 'Alex Green', avatar: '🌿' },
    { name: 'Maya Forest', avatar: '🌳' },
    { name: 'Leo Sunshine', avatar: '☀️' },
    { name: 'Luna Star', avatar: '⭐' },
  ];

  // Load persisted data on component mount
  useEffect(() => {
    // Load walking sessions history
    const savedSessions = localStorage.getItem('walkingSessions');
    if (savedSessions) {
      console.log('Loaded walking history:', JSON.parse(savedSessions));
    }

    // Load messages history
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      console.log('Loaded messages history:', JSON.parse(savedMessages));
    }

    console.log('Component mounted, data loaded from localStorage');
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('sessionActive', isSessionActive.toString());
  }, [isSessionActive]);

  useEffect(() => {
    localStorage.setItem('sessionTime', sessionTime.toString());
  }, [sessionTime]);

  useEffect(() => {
    localStorage.setItem('locationGranted', locationGranted.toString());
  }, [locationGranted]);

  useEffect(() => {
    localStorage.setItem('sessionCompletedActivities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  useEffect(() => {
    localStorage.setItem('sessionRoute', JSON.stringify(sessionRoute));
  }, [sessionRoute]);

  useEffect(() => {
    if (currentPosition) {
      localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
    }
  }, [currentPosition]);

  useEffect(() => {
    localStorage.setItem('sessionPhotos', JSON.stringify(sessionPhotos));
  }, [sessionPhotos]);

  useEffect(() => {
    localStorage.setItem('sessionComments', JSON.stringify(sessionComments));
  }, [sessionComments]);

  useEffect(() => {
    localStorage.setItem('sessionFeeling', feelingRating.toString());
  }, [feelingRating]);

  useEffect(() => {
    localStorage.setItem('suggestedActivities', JSON.stringify(suggestedActivities));
  }, [suggestedActivities]);

  useEffect(() => {
    localStorage.setItem('addedActivities', JSON.stringify(addedActivities));
  }, [addedActivities]);

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
    // Check location permission on load and start tracking if already granted
    if (locationGranted) {
      startLocationTracking();
    }
    
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [locationGranted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    console.log('Getting current location...');
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('Location permission granted:', newPos);
        setCurrentPosition(newPos);
        setLocationGranted(true);
        setLocationError(null);
        
        // Update route with current position
        setSessionRoute([newPos]);
        
        startLocationTracking();
      },
      (error) => {
        console.error('Location permission error:', error);
        setLocationGranted(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access was denied. Please enable location in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable. Please try again.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  };

  const requestLocationPermission = () => {
    console.log('Requesting location permission...');
    getCurrentLocation();
  };

  const refreshLocation = () => {
    console.log('Refreshing location...');
    setLocationError(null);
    
    // Stop existing watch
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    
    // Get fresh location
    getCurrentLocation();
  };

  const centerOnMyLocation = () => {
    console.log('Centering on my location...');
    
    if (!currentPosition) {
      console.log('No current position, getting location...');
      getCurrentLocation();
      return;
    }
    
    // Trigger map centering
    setShouldCenterMap(true);
    console.log('Requesting map to center on:', currentPosition);
  };

  const handleCenteringComplete = () => {
    setShouldCenterMap(false);
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation || watchId !== null) return;
    
    console.log('Starting location tracking...');
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('Location updated:', newPos);
        setCurrentPosition(newPos);
        
        // Update route with latest position only
        setSessionRoute([newPos]);
      },
      (error) => {
        console.error('Location tracking error:', error);
        setLocationError('Error tracking location. Please check your settings.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
    
    setWatchId(id);
  };

  const handleStartStop = () => {
    console.log('Handle start/stop clicked. LocationGranted:', locationGranted, 'IsActive:', isSessionActive);
    
    if (!locationGranted && !isSessionActive) {
      console.log('No location permission, requesting...');
      requestLocationPermission();
      return;
    }
    
    if (isSessionActive) {
      console.log('Stopping session...');
      setIsSessionActive(false);
      
      const sessionData = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        distance: 0, // Remove distance calculation since we're not tracking route
        time: sessionTime,
        route: [], // Empty route since we're not tracking
        photos: sessionPhotos,
        comments: sessionComments,
        feeling: feelingRating,
        activities: completedActivities,
        location: currentPosition
      };
      
      const existingSessions = JSON.parse(localStorage.getItem('walkingSessions') || '[]');
      existingSessions.push(sessionData);
      localStorage.setItem('walkingSessions', JSON.stringify(existingSessions));
      console.log('Session saved:', sessionData);
      
      setShowSessionComplete(true);
      setTimeout(() => {
        handleBackToHome();
      }, 15000);
    } else {
      console.log('Starting session...');
      setIsSessionActive(true);
      if (currentPosition) {
        setSessionRoute([currentPosition]);
        console.log('Session started with position:', currentPosition);
      } else {
        console.log('No current position for session start');
      }
    }
  };

  const handleActivityComplete = (activityName: string) => {
    if (!completedActivities.includes(activityName)) {
      setCompletedActivities([...completedActivities, activityName]);
      console.log('Activity completed:', activityName);
    }
  };

  const handleTryActivity = (activityName: string) => {
    if (addedActivities.includes(activityName)) {
      // Remove from added activities (unclick)
      setAddedActivities(addedActivities.filter(activity => activity !== activityName));
      setSuggestedActivities(suggestedActivities.filter(activity => activity !== activityName));
      console.log('Activity removed:', activityName);
    } else {
      // Add to added activities
      setAddedActivities([...addedActivities, activityName]);
      setSuggestedActivities([...suggestedActivities, activityName]);
      console.log('Activity added:', activityName);
    }
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
    console.log('Position update received:', position);
    setCurrentPosition(position);
    // Only update route with current position, no tracking of path
    setSessionRoute([position]);
  };

  const calculateDistance = () => {
    // Return 0 since we're not tracking route anymore
    return 0;
  };

  const handleTakePhoto = async () => {
    try {
      console.log('Requesting camera access...');
      
      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log('Camera access granted, creating video element...');
      
      // Create video element
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      
      // Wait for video to be ready
      await new Promise((resolve) => {
        video.addEventListener('loadedmetadata', resolve);
      });
      
      await video.play();
      
      console.log('Video playing, capturing photo...');
      
      // Wait a moment for the camera to adjust
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create canvas and capture frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const newPhoto: SessionPhoto = {
              id: Date.now().toString(),
              url: url,
              timestamp: Date.now(),
              comment: newComment
            };
            
            setSessionPhotos(prev => {
              const updated = [...prev, newPhoto];
              localStorage.setItem('sessionPhotos', JSON.stringify(updated));
              return updated;
            });
            
            setNewComment('');
            console.log('Photo captured successfully:', newPhoto);
            alert('📸 Photo captured successfully! ✨');
          }
        }, 'image/jpeg', 0.9);
      }
      
      // Stop camera stream
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      // Enhanced fallback with better placeholder
      const newPhoto: SessionPhoto = {
        id: Date.now().toString(),
        url: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%234ade80"/><text x="200" y="140" text-anchor="middle" fill="white" font-size="18" font-weight="bold">📸 Photo Placeholder</text><text x="200" y="170" text-anchor="middle" fill="white" font-size="14">Taken at ${formatTime(sessionTime)}</text></svg>`,
        timestamp: Date.now(),
        comment: newComment
      };
      
      setSessionPhotos(prev => {
        const updated = [...prev, newPhoto];
        localStorage.setItem('sessionPhotos', JSON.stringify(updated));
        return updated;
      });
      
      setNewComment('');
      alert('📸 Camera not available, but photo placeholder created! ✨');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: SessionComment = {
        id: Date.now().toString(),
        text: newComment,
        timestamp: Date.now()
      };
      
      setSessionComments(prev => {
        const updated = [...prev, comment];
        localStorage.setItem('sessionComments', JSON.stringify(updated));
        return updated;
      });
      
      setNewComment('');
      console.log('Comment added and saved:', comment);
      alert('💬 Comment added successfully! ✨');
    }
  };

  const handleMessagingClick = () => {
    navigate('/profile', { state: { openMessaging: true } });
  };

  const handleBackToHome = () => {
    console.log('Going back to home...');
    setShowSessionComplete(false);
    setSessionTime(0);
    setCompletedActivities([]);
    setSessionPhotos([]);
    setSessionComments([]);
    setFeelingRating(0);
    setSuggestedActivities([]);
    setAddedActivities([]);
    localStorage.removeItem('sessionCompletedActivities');
    localStorage.removeItem('sessionPhotos');
    localStorage.removeItem('sessionComments');
    localStorage.removeItem('sessionFeeling');
    localStorage.removeItem('suggestedActivities');
    localStorage.removeItem('addedActivities');
    localStorage.setItem('sessionTime', '0');
    localStorage.setItem('sessionActive', 'false');
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
                onClick={() => {
                  if (selectedFriend && messageText.trim()) {
                    const newMessage = {
                      id: Date.now().toString(),
                      to: selectedFriend,
                      text: messageText,
                      timestamp: Date.now(),
                      from: 'You'
                    };
                    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
                    existingMessages.push(newMessage);
                    localStorage.setItem('messages', JSON.stringify(existingMessages));
                    
                    console.log('Message sent:', newMessage);
                    alert(`✅ Message sent to ${selectedFriend}: "${messageText}"`);
                    setShowMessaging(false);
                    setMessageText('');
                    setSelectedFriend('');
                  } else {
                    alert('❌ Please select a friend and write a message!');
                  }
                }}
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

          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-accent to-orange-accent rounded-2xl p-4 text-white">
              <p className="font-black text-xl">🪙 +{calculateTotalCoins()} NatureCoins</p>
              <p className="font-bold">💰 Base: {Math.floor(sessionTime / 60)} + Activities: {calculateTotalCoins() - Math.floor(sessionTime / 60)}</p>
            </div>
            
            <div className="bg-light-green rounded-2xl p-4">
              <p className="font-black text-bright-green text-lg">🔥 Streak: 7 days! 🔥</p>
            </div>
          </div>

          <div className="bg-forest-green rounded-2xl p-4 text-white mb-6">
            <p className="font-bold text-sm mb-2">🌱 Did you know? 🌱</p>
            <p className="font-bold">Spending just 20 minutes in nature can significantly reduce stress hormones and boost your mood! 🧠✨</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">⏰ Time Outside</p>
              <p className="font-bold text-text-dark">{formatTime(sessionTime)}</p>
            </div>
            <div className="bg-light-green rounded-xl p-3">
              <p className="font-black text-bright-green">🔥 Calories</p>
              <p className="font-bold text-text-dark">{Math.floor(sessionTime / 2)} cal</p>
            </div>
          </div>

          <Button
            onClick={handleBackToHome}
            className="w-full bg-forest-green text-white font-black py-4 rounded-2xl hover:bg-bright-green transition-all"
          >
            🏠 Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header with improved layout */}
      <div className="bg-gradient-to-r from-forest-green to-bright-green rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
                alt="Leaf" 
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-sm font-nunito font-black text-white mb-1">NatureCapture</h1>
                <p className="text-light-green font-bold text-xs">Ready for your next adventure? ⭐</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Refresh button */}
              <Button
                onClick={refreshLocation}
                className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition-all"
                title="Refresh location"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              
              {/* Coins display */}
              <div className="bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full px-3 py-1 shadow-lg border border-white">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 text-xs font-black">🪙</span>
                  </div>
                  <span className="font-black text-white text-xs">247</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Date, Time and Location */}
          <div className="flex items-center justify-center space-x-6 text-white mb-2">
            <DateTimeDisplay />
          </div>
          
          {currentPosition && (
            <div className="flex justify-center">
              <div className="text-white text-xs font-bold">
                📍 {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Map */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-forest-green">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-bright-green flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              🗺️ Live Map 🗺️
            </h2>
            <Button
              onClick={centerOnMyLocation}
              className="bg-forest-green text-white rounded-full p-2 text-xs hover:bg-bright-green transition-all"
              title="Show my location"
            >
              <Locate className="w-4 h-4" />
            </Button>
          </div>
          <RealTimeMap 
            key={mapKey}
            isActive={isSessionActive}
            onPositionUpdate={handlePositionUpdate}
            route={sessionRoute}
            shouldCenterOnUser={shouldCenterMap}
            onCenteringComplete={handleCenteringComplete}
          />
        </div>
      </div>

      {/* Environmental Conditions - Made equal frames */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green">
          <h2 className="text-lg font-black text-bright-green mb-3 flex items-center">
            <Wind className="w-4 h-4 mr-2" />
            🌤️ Current Conditions 🌤️
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {/* AQI */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-3 text-white text-center">
              <Eye className="w-5 h-5 mx-auto mb-1" />
              <AirQualityMonitor position={currentPosition} />
            </div>

            {/* Weather Conditions */}
            <WeatherMonitor position={currentPosition} />
          </div>
        </div>
      </div>

      {/* Extended Weather Information */}
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

      {/* Main Start/Stop Button */}
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
                <div className="w-16 h-16 bg-forest-green rounded-full mx-auto flex items-center justify-center animate-pulse">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-nunito font-black text-bright-green">
                  🌟 Session Active! 🌟
                </h2>
                <div className="text-5xl font-black text-forest-green mb-4">
                  {formatTime(sessionTime)}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-yellow-accent rounded-2xl p-3">
                    <p className="text-bright-green font-black text-sm">⏰ Time</p>
                    <p className="text-xl font-black">{formatTime(sessionTime)}</p>
                  </div>
                  <div className="bg-orange-accent rounded-2xl p-3 text-white">
                    <p className="font-black text-sm">🔥 Calories</p>
                    <p className="text-xl font-black">{Math.floor(sessionTime / 2)}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPhotoComment(true)}
                  className="w-full bg-yellow-accent text-bright-green font-black py-3 rounded-2xl hover:bg-bright-green hover:text-white transition-all transform hover:scale-105"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  📸 Add Photo & Comment
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 mb-4">
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
                  🌈 Ready for Nature Time?
                </h2>
                <p className="text-text-dark font-bold mb-4">
                  Start your outdoor adventure and earn NatureCoins! 🪙✨
                </p>
                
                {!locationGranted && (
                  <div className="bg-orange-100 border-2 border-orange-accent rounded-2xl p-3 mb-4">
                    <div className="flex items-center justify-center space-x-2 text-orange-600">
                      <MapPin className="w-5 h-5" />
                      <span className="font-bold">📍 Location access needed to track your adventure</span>
                    </div>
                    {locationError && (
                      <p className="text-red-600 text-sm mt-2 font-bold">{locationError}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <Button
              onClick={handleStartStop}
              disabled={!locationGranted && !isSessionActive}
              className={`w-full mt-6 text-xl font-black py-6 rounded-3xl shadow-lg transform transition-all ${
                isSessionActive
                  ? 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'
                  : locationGranted
                    ? 'bg-gradient-to-r from-forest-green to-bright-green text-white hover:scale-105'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
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

      {/* Suggested Activities - Updated with toggle functionality */}
      {!isSessionActive && (
        <div className="px-4 mb-6">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-yellow-accent">
            <h2 className="text-lg font-black text-bright-green mb-3">🎯 Suggested Activities</h2>
            <div className="space-y-2">
              {allActivities.map((activity, index) => (
                <div key={index} className="bg-gradient-to-r from-light-green to-white rounded-2xl p-3 border border-forest-green">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div>
                        <p className="font-black text-bright-green text-sm">{activity.name}</p>
                        <p className="text-xs font-bold text-text-dark">{activity.duration} • {activity.calories} • 🪙 {activity.coins}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleTryActivity(activity.name)}
                      className={`font-black rounded-full px-4 py-2 text-xs transition-all transform hover:scale-105 ${
                        addedActivities.includes(activity.name)
                          ? 'bg-green-500 text-white'
                          : 'bg-forest-green text-white hover:bg-bright-green'
                      }`}
                    >
                      {addedActivities.includes(activity.name) ? 'Added ✅' : 'Try'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats and Messaging */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-3 border-2 border-light-green text-center">
            <div className="w-10 h-10 bg-forest-green rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-black text-sm">23</span>
            </div>
            <p className="font-black text-text-dark text-sm">📊 Sessions</p>
          </div>
          <div 
            className="bg-white rounded-2xl p-3 border-2 border-light-green text-center cursor-pointer hover:scale-105 transition-transform"
            onClick={handleStreakClick}
          >
            <div className="w-10 h-10 bg-yellow-accent rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-bright-green font-black text-sm">7</span>
            </div>
            <p className="font-black text-text-dark text-sm">🔥 Streak</p>
          </div>
          <div className="bg-white rounded-2xl p-3 border-2 border-light-green text-center">
            <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center ${locationGranted ? 'bg-forest-green' : 'bg-orange-accent'}`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <p className="font-black text-text-dark text-xs">
              {locationGranted ? '✅ GPS' : '📍 Enable'}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleMessagingClick}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black py-3 rounded-2xl hover:scale-105 transition-transform"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          💬 Message Friends
        </Button>
      </div>

      {/* Location Enable Button */}
      {!locationGranted && (
        <div className="px-4 pb-6">
          <Button 
            onClick={requestLocationPermission}
            className="w-full bg-gradient-to-r from-orange-accent to-red-500 text-white font-black py-4 rounded-2xl hover:scale-105 transition-transform"
          >
            <MapPin className="w-6 h-6 mr-2" />
            🌍 Enable Location Access
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
