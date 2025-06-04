
import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Playlist {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tracks: Track[];
  color: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const MusicPage: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlists: Playlist[] = [
    {
      id: 'friendly',
      name: 'Friendly',
      emoji: '😊',
      description: 'Upbeat tunes for walking with friends',
      color: 'from-yellow-400 to-orange-500',
      tracks: [
        { id: '1', title: 'Walking on Sunshine', artist: 'Nature Sounds', duration: '3:24' },
        { id: '2', title: 'Happy Trails', artist: 'Forest Vibes', duration: '2:58' },
        { id: '3', title: 'Friend Like Me', artist: 'Outdoor Collective', duration: '4:12' },
        { id: '4', title: 'Together We Walk', artist: 'Nature Harmony', duration: '3:45' },
        { id: '5', title: 'Sunny Day Stroll', artist: 'Green Path', duration: '3:18' }
      ]
    },
    {
      id: 'calm',
      name: 'Calm',
      emoji: '🧘',
      description: 'Peaceful sounds for meditation and relaxation',
      color: 'from-blue-400 to-purple-500',
      tracks: [
        { id: '6', title: 'Forest Whispers', artist: 'Zen Nature', duration: '5:30' },
        { id: '7', title: 'Flowing River', artist: 'Peaceful Mind', duration: '4:45' },
        { id: '8', title: 'Mountain Breeze', artist: 'Tranquil Sounds', duration: '6:12' },
        { id: '9', title: 'Evening Meditation', artist: 'Calm Collective', duration: '8:00' },
        { id: '10', title: 'Inner Peace', artist: 'Serenity Now', duration: '4:20' }
      ]
    },
    {
      id: 'autumn',
      name: 'Autumn',
      emoji: '🍂',
      description: 'Cozy vibes for crisp autumn walks',
      color: 'from-orange-400 to-red-500',
      tracks: [
        { id: '11', title: 'Falling Leaves', artist: 'Seasonal Sounds', duration: '3:56' },
        { id: '12', title: 'Autumn Breeze', artist: 'Golden Hour', duration: '4:23' },
        { id: '13', title: 'Harvest Moon', artist: 'Fall Collective', duration: '5:10' },
        { id: '14', title: 'Crunching Steps', artist: 'Nature Walk', duration: '3:34' },
        { id: '15', title: 'Cozy Trail', artist: 'Autumn Vibes', duration: '4:18' }
      ]
    },
    {
      id: 'energetic',
      name: 'Energetic',
      emoji: '⚡',
      description: 'High-energy beats for active adventures',
      color: 'from-green-400 to-blue-500',
      tracks: [
        { id: '16', title: 'Power Walk', artist: 'Energy Boost', duration: '3:42' },
        { id: '17', title: 'Trail Runner', artist: 'Active Life', duration: '4:05' },
        { id: '18', title: 'Mountain Climber', artist: 'Peak Performance', duration: '3:28' },
        { id: '19', title: 'Adventure Time', artist: 'Outdoor Energy', duration: '4:15' },
        { id: '20', title: 'Nature Boost', artist: 'Dynamic Flow', duration: '3:52' }
      ]
    },
    {
      id: 'birds',
      name: 'Bird Songs',
      emoji: '🐦',
      description: 'Natural bird sounds for peaceful walks',
      color: 'from-emerald-400 to-teal-500',
      tracks: [
        { id: '21', title: 'Morning Chorus', artist: 'Dawn Birds', duration: '6:30' },
        { id: '22', title: 'Robin\'s Song', artist: 'Garden Birds', duration: '4:12' },
        { id: '23', title: 'Forest Symphony', artist: 'Wild Birds', duration: '7:45' },
        { id: '24', title: 'Sparrow Dance', artist: 'Chirping Collective', duration: '3:58' },
        { id: '25', title: 'Owl\'s Lullaby', artist: 'Night Birds', duration: '5:22' }
      ]
    },
    {
      id: 'rain',
      name: 'Rain Sounds',
      emoji: '🌧️',
      description: 'Gentle rain for cozy indoor vibes',
      color: 'from-gray-400 to-blue-600',
      tracks: [
        { id: '26', title: 'Gentle Rain', artist: 'Weather Sounds', duration: '10:00' },
        { id: '27', title: 'Thunderstorm', artist: 'Storm Collective', duration: '8:30' },
        { id: '28', title: 'Raindrops on Leaves', artist: 'Nature Rain', duration: '12:15' },
        { id: '29', title: 'Cozy Cabin Rain', artist: 'Indoor Comfort', duration: '15:00' },
        { id: '30', title: 'Spring Shower', artist: 'Fresh Rain', duration: '6:45' }
      ]
    }
  ];

  const selectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentTrack(playlist.tracks[0]);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!selectedPlaylist) return;
    const nextIndex = (currentTrackIndex + 1) % selectedPlaylist.tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(selectedPlaylist.tracks[nextIndex]);
  };

  const previousTrack = () => {
    if (!selectedPlaylist) return;
    const prevIndex = currentTrackIndex === 0 ? selectedPlaylist.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(selectedPlaylist.tracks[prevIndex]);
  };

  const selectTrack = (track: Track, index: number) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  if (selectedPlaylist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedPlaylist.color} rounded-b-3xl mx-4 mb-6 shadow-xl`}>
          <div className="p-6 text-center text-white">
            <Button
              onClick={() => setSelectedPlaylist(null)}
              className="absolute left-6 top-6 bg-white/20 hover:bg-white/30 text-white border-none"
            >
              ← Back
            </Button>
            <div className="text-6xl mb-4">{selectedPlaylist.emoji}</div>
            <h1 className="text-4xl font-nunito font-black mb-2">{selectedPlaylist.name}</h1>
            <p className="text-white/90 font-bold">{selectedPlaylist.description}</p>
          </div>
        </div>

        {/* Current Player */}
        {currentTrack && (
          <div className="px-4 mb-6">
            <div className={`bg-gradient-to-r ${selectedPlaylist.color} rounded-3xl p-6 shadow-xl text-white`}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎵</div>
                <h2 className="text-2xl font-black mb-2">{currentTrack.title}</h2>
                <p className="text-white/90 font-bold">{currentTrack.artist}</p>
                <p className="text-white/80 text-sm">{currentTrack.duration}</p>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <Button
                  onClick={previousTrack}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button
                  onClick={togglePlayPause}
                  className="bg-white text-black hover:bg-white/90 p-4 rounded-full"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                <Button
                  onClick={nextTrack}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>
              
              {isPlaying && (
                <div className="mt-4 text-center">
                  <div className="text-green-300 font-bold text-sm animate-pulse">♪ Now Playing ♪</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Track List */}
        <div className="px-4">
          <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-forest-green">
            <h3 className="text-lg font-black text-bright-green mb-4">🎵 Tracks ({selectedPlaylist.tracks.length})</h3>
            <div className="space-y-2">
              {selectedPlaylist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => selectTrack(track, index)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all hover:scale-102 ${
                    currentTrack?.id === track.id
                      ? `bg-gradient-to-r ${selectedPlaylist.color} text-white`
                      : 'bg-light-green hover:bg-bright-green hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentTrack?.id === track.id ? 'bg-white/20' : 'bg-white'
                      }`}>
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className={`w-4 h-4 ${currentTrack?.id === track.id ? 'text-white' : 'text-bright-green'}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-sm">{track.title}</p>
                        <p className={`text-xs font-bold ${
                          currentTrack?.id === track.id ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          {track.artist}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${
                      currentTrack?.id === track.id ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {track.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6 text-center text-white">
          <Music className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-nunito font-black mb-2">🎵 Nature Music 🎵</h1>
          <p className="text-white/90 font-bold">🌿 Perfect soundtracks for your outdoor adventures! 🌿</p>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="px-4 space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => selectPlaylist(playlist)}
            className="bg-white rounded-3xl p-4 shadow-xl border-2 border-light-green cursor-pointer transition-all transform hover:scale-102 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${playlist.color} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-3xl">{playlist.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-bright-green">{playlist.name}</h3>
                <p className="text-gray-600 font-bold text-sm mb-2">{playlist.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 font-bold">
                  <span>🎵 {playlist.tracks.length} tracks</span>
                  <span>⏱️ {Math.floor(playlist.tracks.length * 4.5)} min</span>
                </div>
              </div>
              <div className="text-bright-green">
                <Play className="w-8 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-forest-green">
          <h2 className="text-xl font-black text-bright-green mb-4 text-center">🌟 Music Features 🌟</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">🎧</span>
              <div>
                <p className="font-black text-bright-green text-sm">Session Continuity</p>
                <p className="text-xs text-gray-600 font-bold">Music keeps playing during your nature sessions!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="font-black text-bright-green text-sm">Nature-Focused</p>
                <p className="text-xs text-gray-600 font-bold">Curated playlists designed for outdoor activities!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-light-green rounded-2xl p-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-black text-bright-green text-sm">Cross-Page Playback</p>
                <p className="text-xs text-gray-600 font-bold">Navigate between pages while music continues!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
