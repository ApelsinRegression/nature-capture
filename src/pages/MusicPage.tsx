import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
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
  audioUrl: string;
}

const MusicPage: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlists: Playlist[] = [
    {
      id: 'calm-piano',
      name: 'Calm Piano',
      emoji: '🎼',
      description: 'Gentle, reflective piano ideal for quiet walks.',
      color: 'from-blue-400 to-purple-500',
      tracks: [
        { id: 'cp1', title: 'Morning in the Forest', artist: 'Grand_Project', duration: '10:55', audioUrl: 'https://pixabay.com/music/download/347089/' },
        { id: 'cp2', title: 'Silent Evening (Calm Piano)', artist: 'Grand_Project', duration: '5:10', audioUrl: 'https://pixabay.com/music/download/335749/' },
      ]
    },
    {
      id: 'ambient-nature',
      name: 'Ambient Nature',
      emoji: '🌿',
      description: 'Ethereal ambient textures with subtle forest tones.',
      color: 'from-green-400 to-blue-500',
      tracks: [
        { id: 'an1', title: 'Nature Dreamscape', artist: 'Universfield', duration: '3:00', audioUrl: 'https://pixabay.com/music/download/350256/' },
        { id: 'an2', title: 'Ambient Nature Landscape Music', artist: 'HitsLab', duration: '2:33', audioUrl: 'https://pixabay.com/music/download/15494/' },
      ]
    },
    {
      id: 'meditation-spa',
      name: 'Meditation / Spa',
      emoji: '🧘',
      description: 'Spacious, calming ambient atmospheres for relaxation.',
      color: 'from-purple-400 to-pink-500',
      tracks: [
        { id: 'ms1', title: 'Inner Peace', artist: 'Grand_Project', duration: '10:28', audioUrl: 'https://pixabay.com/music/download/339640/' },
        { id: 'ms2', title: 'Beautiful Ambient Nature', artist: 'Michael-X_Studio', duration: '9:44', audioUrl: 'https://pixabay.com/music/download/217407/' },
      ]
    },
    {
      id: 'water-air',
      name: 'Water & Air Soundscapes',
      emoji: '🌊',
      description: 'Breezy, water-like textures and rich natural soundscapes.',
      color: 'from-cyan-400 to-blue-600',
      tracks: [
        { id: 'wa1', title: 'Calm And Beautiful Nature', artist: 'lvymusic', duration: '3:22', audioUrl: 'https://pixabay.com/music/download/202322/' },
        { id: 'wa2', title: 'Ambient nature soundscape', artist: 'Surprising_Media', duration: '9:49', audioUrl: 'https://pixabay.com/music/download/171422/' },
      ]
    },
    {
      id: 'acoustic-folk',
      name: 'Relaxing Acoustic & Folk',
      emoji: '🌟',
      description: 'Gentle acoustic guitar with natural ambiance.',
      color: 'from-yellow-400 to-orange-500',
      tracks: [
        { id: 'af1', title: 'Nature Calls', artist: 'folk_acoustic', duration: '3:00', audioUrl: 'https://pixabay.com/music/download/347264/' },
        { id: 'af2', title: 'The Beat of Nature', artist: 'folk_acoustic', duration: '2:53', audioUrl: 'https://pixabay.com/music/download/347265/' },
      ]
    },
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

  const nextTrack = useCallback(() => {
    if (!selectedPlaylist) return;
    const nextIndex = (currentTrackIndex + 1) % selectedPlaylist.tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(selectedPlaylist.tracks[nextIndex]);
  }, [selectedPlaylist, currentTrackIndex]);

  const previousTrack = useCallback(() => {
    if (!selectedPlaylist) return;
    const prevIndex = currentTrackIndex === 0 ? selectedPlaylist.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(selectedPlaylist.tracks[prevIndex]);
  }, [selectedPlaylist, currentTrackIndex]);

  const selectTrack = (track: Track, index: number) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
        const audio = audioRef.current;
        if (audio.src !== currentTrack.audioUrl) {
            audio.src = currentTrack.audioUrl;
            audio.load();
        }
        if (isPlaying) {
            audio.play().catch(e => {
                console.error("Error playing audio:", e)
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
          const handleEnded = () => nextTrack();
          audio.addEventListener('ended', handleEnded);
          return () => {
              audio.removeEventListener('ended', handleEnded);
          };
      }
  }, [nextTrack]);

  if (selectedPlaylist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white to-light-green">
        <audio ref={audioRef} />
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
      <audio ref={audioRef} />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-3xl mx-4 mb-6 shadow-xl">
        <div className="p-6 text-center text-white">
          <Music className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl font-nunito font-black mb-2">🎵 Nature Music 🎵</h1>
          <p className="text-white/90 font-bold">🌿 Perfect soundtracks for your outdoor adventures! 🌿</p>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="px-4 space-y-4 pb-6">
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
                  <span>⏱️ {Math.floor(playlist.tracks.reduce((acc, track) => {
                    const [min, sec] = track.duration.split(':');
                    return acc + parseInt(min, 10) * 60 + parseInt(sec, 10);
                  }, 0) / 60)} min</span>
                </div>
              </div>
              <div className="text-bright-green">
                <Play className="w-8 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
