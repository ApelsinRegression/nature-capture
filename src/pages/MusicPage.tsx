
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
        { id: 'cp1', title: 'Morning in the Forest', artist: 'Grand_Project', duration: '10:55', audioUrl: 'https://pixabay.com/music/download/music-104382.mp3' },
        { id: 'cp2', title: 'Silent Evening (Calm Piano)', artist: 'Grand_Project', duration: '5:10', audioUrl: 'https://pixabay.com/music/download/music-112193.mp3' },
        { id: 'cp3', title: 'Soft Piano Rain', artist: 'DmitriyTaras', duration: '3:11', audioUrl: 'https://pixabay.com/music/download/music-113164.mp3' },
        { id: 'cp4', title: 'Sleepy Piano', artist: 'ZakharValaha', duration: '3:01', audioUrl: 'https://pixabay.com/music/download/music-120195.mp3' },
        { id: 'cp5', title: 'Relax Piano', artist: 'Olexy', duration: '1:51', audioUrl: 'https://pixabay.com/music/download/music-112207.mp3' },
        { id: 'cp6', title: 'Dreamy Piano', artist: 'Lesfm', duration: '1:59', audioUrl: 'https://pixabay.com/music/download/music-110660.mp3' },
        { id: 'cp7', title: 'Tender Feelings', artist: 'Keys of Moon', duration: '2:28', audioUrl: 'https://pixabay.com/music/download/music-110382.mp3' },
        { id: 'cp8', title: 'Calm Piano Theme', artist: 'Lesfm', duration: '2:18', audioUrl: 'https://pixabay.com/music/download/music-112418.mp3' },
        { id: 'cp9', title: 'Inspiring Piano', artist: 'Olexy', duration: '1:49', audioUrl: 'https://pixabay.com/music/download/music-112194.mp3' },
        { id: 'cp10', title: 'Gentle Piano', artist: 'Music_Unlimited', duration: '2:25', audioUrl: 'https://pixabay.com/music/download/music-115691.mp3' },
        { id: 'cp11', title: 'Light of Hope', artist: 'Purrple Cat', duration: '2:34', audioUrl: 'https://pixabay.com/music/download/music-112201.mp3' },
        { id: 'cp12', title: 'Cinematic Calm Piano', artist: 'Daddy_s_Music', duration: '1:58', audioUrl: 'https://pixabay.com/music/download/music-112195.mp3' },
        { id: 'cp13', title: 'Piano Relaxation', artist: 'QubeSounds', duration: '2:38', audioUrl: 'https://pixabay.com/music/download/music-120515.mp3' },
        { id: 'cp14', title: 'Reflections', artist: 'Olexy', duration: '1:59', audioUrl: 'https://pixabay.com/music/download/music-111723.mp3' },
        { id: 'cp15', title: 'Ambient Piano Background', artist: 'LiteSaturation', duration: '2:18', audioUrl: 'https://pixabay.com/music/download/music-117218.mp3' },
      ]
    },
    {
      id: 'ambient-nature',
      name: 'Ambient Nature',
      emoji: '🌿',
      description: 'Ethereal ambient textures with subtle forest tones.',
      color: 'from-green-400 to-blue-500',
      tracks: [
        { id: 'an1', title: 'Nature Dreamscape', artist: 'Universfield', duration: '3:00', audioUrl: 'https://pixabay.com/music/download/music-109444.mp3' },
        { id: 'an2', title: 'Ambient Nature Landscape Music', artist: 'HitsLab', duration: '2:33', audioUrl: 'https://pixabay.com/music/download/music-112456.mp3' },
        { id: 'an3', title: 'Forest Ambience', artist: 'Meditative_Soundscape', duration: '2:57', audioUrl: 'https://pixabay.com/music/download/music-116624.mp3' },
        { id: 'an4', title: 'Serenity in the Woods', artist: 'SpaRelaxMusic', duration: '3:22', audioUrl: 'https://pixabay.com/music/download/music-112482.mp3' },
        { id: 'an5', title: 'Morning Forest Ambience', artist: 'Lesfm', duration: '2:34', audioUrl: 'https://pixabay.com/music/download/music-110421.mp3' },
        { id: 'an6', title: 'Deep Forest', artist: 'Rnd_Tunes', duration: '2:14', audioUrl: 'https://pixabay.com/music/download/music-111855.mp3' },
        { id: 'an7', title: 'Magic Tree', artist: 'Musictown', duration: '2:43', audioUrl: 'https://pixabay.com/music/download/music-112705.mp3' },
        { id: 'an8', title: 'Ambient Fantasy Landscape', artist: 'AlexiAction', duration: '3:23', audioUrl: 'https://pixabay.com/music/download/music-119620.mp3' },
        { id: 'an9', title: 'Nature Flow', artist: 'DreamSounds', duration: '2:44', audioUrl: 'https://pixabay.com/music/download/music-113059.mp3' },
        { id: 'an10', title: 'Peaceful Forest', artist: 'NatureAmbience', duration: '2:51', audioUrl: 'https://pixabay.com/music/download/music-110403.mp3' },
        { id: 'an11', title: 'Whispering Trees', artist: 'EtherealHarmony', duration: '3:07', audioUrl: 'https://pixabay.com/music/download/music-110497.mp3' },
        { id: 'an12', title: 'Gentle Forest Light', artist: 'Olexy', duration: '2:05', audioUrl: 'https://pixabay.com/music/download/music-117273.mp3' },
        { id: 'an13', title: 'Nature Scenery Ambience', artist: 'RelaxingSoundscape', duration: '2:30', audioUrl: 'https://pixabay.com/music/download/music-113187.mp3' },
        { id: 'an14', title: 'Windy Meadow', artist: 'AlexGrohl', duration: '2:22', audioUrl: 'https://pixabay.com/music/download/music-114643.mp3' },
        { id: 'an15', title: 'Natural Calm Background', artist: 'WinnieTheMoog', duration: '2:11', audioUrl: 'https://pixabay.com/music/download/music-119250.mp3' },
      ]
    },
    {
      id: 'meditation-spa',
      name: 'Meditation / Spa',
      emoji: '🧘',
      description: 'Spacious, calming ambient atmospheres for relaxation.',
      color: 'from-purple-400 to-pink-500',
      tracks: [
        { id: 'ms1', title: 'Inner Peace', artist: 'Grand_Project', duration: '10:28', audioUrl: 'https://pixabay.com/music/download/music-108235.mp3' },
        { id: 'ms2', title: 'Beautiful Ambient Nature', artist: 'Michael_X_Studio', duration: '9:44', audioUrl: 'https://pixabay.com/music/download/music-111142.mp3' },
        { id: 'ms3', title: 'Spa Massage', artist: 'SpaRelaxMusic', duration: '4:10', audioUrl: 'https://pixabay.com/music/download/music-108926.mp3' },
        { id: 'ms4', title: 'Light Meditation', artist: 'Light_Music', duration: '22:13', audioUrl: 'https://pixabay.com/music/download/music-111433.mp3' },
        { id: 'ms5', title: 'Healing Soundscape', artist: 'DreamSounds', duration: '3:45', audioUrl: 'https://pixabay.com/music/download/music-111804.mp3' },
        { id: 'ms6', title: 'Deep Focus', artist: 'Lesfm', duration: '2:51', audioUrl: 'https://pixabay.com/music/download/music-111322.mp3' },
        { id: 'ms7', title: 'Calm Spirit', artist: 'Music_Unlimited', duration: '3:33', audioUrl: 'https://pixabay.com/music/download/music-116119.mp3' },
        { id: 'ms8', title: 'Soulful Wind', artist: 'Lexin_Music', duration: '3:29', audioUrl: 'https://pixabay.com/music/download/music-119227.mp3' },
        { id: 'ms9', title: 'Spa Background', artist: 'SpaRelaxMusic', duration: '3:54', audioUrl: 'https://pixabay.com/music/download/music-112716.mp3' },
        { id: 'ms10', title: 'Zen Garden', artist: 'AlexiAction', duration: '2:53', audioUrl: 'https://pixabay.com/music/download/music-113984.mp3' },
        { id: 'ms11', title: 'Relaxation Flow', artist: 'ZakharValaha', duration: '3:21', audioUrl: 'https://pixabay.com/music/download/music-110344.mp3' },
        { id: 'ms12', title: 'Chakra Alignment', artist: 'Meditative_Soundscape', duration: '3:01', audioUrl: 'https://pixabay.com/music/download/music-113016.mp3' },
        { id: 'ms13', title: 'Emotional Healing', artist: 'SpaBackground', duration: '2:38', audioUrl: 'https://pixabay.com/music/download/music-116722.mp3' },
        { id: 'ms14', title: 'Ocean Healing', artist: 'Ashot_Danielyan_Official', duration: '3:10', audioUrl: 'https://pixabay.com/music/download/music-120472.mp3' },
        { id: 'ms15', title: 'Meditation Soundscape', artist: 'LiteSaturation', duration: '2:18', audioUrl: 'https://pixabay.com/music/download/music-120498.mp3' },
      ]
    },
    {
      id: 'water-air',
      name: 'Water & Air Soundscapes',
      emoji: '🌊',
      description: 'Breezy, water-like textures and rich natural soundscapes.',
      color: 'from-cyan-400 to-blue-600',
      tracks: [
        { id: 'wa1', title: 'Calm And Beautiful Nature', artist: 'lvymusic', duration: '3:22', audioUrl: 'https://pixabay.com/music/download/music-103109.mp3' },
        { id: 'wa2', title: 'Ambient Nature Soundscape', artist: 'Surprising_Media', duration: '9:49', audioUrl: 'https://pixabay.com/music/download/music-106295.mp3' },
        { id: 'wa3', title: 'Flowing River', artist: 'SoundsForYou', duration: '3:14', audioUrl: 'https://pixabay.com/music/download/music-106572.mp3' },
        { id: 'wa4', title: 'Rain Meditation', artist: 'Lesfm', duration: '3:45', audioUrl: 'https://pixabay.com/music/download/music-106821.mp3' },
        { id: 'wa5', title: 'Sea Breeze', artist: 'DreamSounds', duration: '3:28', audioUrl: 'https://pixabay.com/music/download/music-106492.mp3' },
        { id: 'wa6', title: 'Wind in the Trees', artist: 'Ashot_Danielyan_Official', duration: '3:01', audioUrl: 'https://pixabay.com/music/download/music-108701.mp3' },
        { id: 'wa7', title: 'Ocean Relaxation', artist: 'Meditative_Soundscape', duration: '3:15', audioUrl: 'https://pixabay.com/music/download/music-107663.mp3' },
        { id: 'wa8', title: 'Gentle Rainfall', artist: 'WinnieTheMoog', duration: '2:43', audioUrl: 'https://pixabay.com/music/download/music-109001.mp3' },
        { id: 'wa9', title: 'Tranquil Forest Stream', artist: 'NatureAmbience', duration: '3:12', audioUrl: 'https://pixabay.com/music/download/music-108928.mp3' },
        { id: 'wa10', title: 'Water Meditation Background', artist: 'SpaRelaxMusic', duration: '2:49', audioUrl: 'https://pixabay.com/music/download/music-109862.mp3' },
        { id: 'wa11', title: 'Deep Ocean Ambience', artist: 'AudioCoffee', duration: '4:00', audioUrl: 'https://pixabay.com/music/download/music-110206.mp3' },
        { id: 'wa12', title: 'Rain and Thunder', artist: 'JuliusH', duration: '3:35', audioUrl: 'https://pixabay.com/music/download/music-110705.mp3' },
        { id: 'wa13', title: 'Underwater Serenity', artist: 'SpaBackground', duration: '3:03', audioUrl: 'https://pixabay.com/music/download/music-111801.mp3' },
        { id: 'wa14', title: 'Seaside Peace', artist: 'Rnd_Tunes', duration: '2:53', audioUrl: 'https://pixabay.com/music/download/music-113039.mp3' },
        { id: 'wa15', title: 'Whispering Rain', artist: 'Ashot_Danielyan_Official', duration: '2:51', audioUrl: 'https://pixabay.com/music/download/music-117090.mp3' },
      ]
    },
    {
      id: 'acoustic-folk',
      name: 'Relaxing Acoustic & Folk',
      emoji: '🌟',
      description: 'Gentle acoustic guitar with natural ambiance.',
      color: 'from-yellow-400 to-orange-500',
      tracks: [
        { id: 'af1', title: 'Nature Calls', artist: 'folk_acoustic', duration: '3:00', audioUrl: 'https://pixabay.com/music/download/music-102466.mp3' },
        { id: 'af2', title: 'The Beat of Nature', artist: 'folk_acoustic', duration: '2:53', audioUrl: 'https://pixabay.com/music/download/music-102465.mp3' },
        { id: 'af3', title: 'Guitar in Nature', artist: 'ZakharValaha', duration: '2:47', audioUrl: 'https://pixabay.com/music/download/music-104435.mp3' },
        { id: 'af4', title: 'Acoustic Folk Theme', artist: 'Musictown', duration: '2:33', audioUrl: 'https://pixabay.com/music/download/music-102370.mp3' },
        { id: 'af5', title: 'Campfire Vibes', artist: 'JuliusH', duration: '3:07', audioUrl: 'https://pixabay.com/music/download/music-102976.mp3' },
        { id: 'af6', title: 'Relaxing Guitar', artist: 'Olexy', duration: '2:21', audioUrl: 'https://pixabay.com/music/download/music-103359.mp3' },
        { id: 'af7', title: 'Sunday Acoustic', artist: 'AlexGrohl', duration: '2:30', audioUrl: 'https://pixabay.com/music/download/music-103692.mp3' },
        { id: 'af8', title: 'Peaceful Acoustic', artist: 'Musictown', duration: '2:41', audioUrl: 'https://pixabay.com/music/download/music-102460.mp3' },
        { id: 'af9', title: 'Warm Forest Folk', artist: 'Sonicon', duration: '2:59', audioUrl: 'https://pixabay.com/music/download/music-105436.mp3' },
        { id: 'af10', title: 'Acoustic Morning Light', artist: 'lemonmusicstudio', duration: '2:11', audioUrl: 'https://pixabay.com/music/download/music-106186.mp3' },
        { id: 'af11', title: 'Walk in the Woods', artist: 'GeoffHarvey', duration: '2:36', audioUrl: 'https://pixabay.com/music/download/music-105630.mp3' },
        { id: 'af12', title: 'Woodland Guitar', artist: 'AlexiAction', duration: '2:53', audioUrl: 'https://pixabay.com/music/download/music-103215.mp3' },
        { id: 'af13', title: 'Gentle Folk Guitar', artist: 'WinnieTheMoog', duration: '2:40', audioUrl: 'https://pixabay.com/music/download/music-103319.mp3' },
        { id: 'af14', title: 'Nature Spirit Guitar', artist: 'VGM_Production', duration: '2:59', audioUrl: 'https://pixabay.com/music/download/music-106003.mp3' },
        { id: 'af15', title: 'Open Fields Acoustic', artist: 'Lesfm', duration: '2:44', audioUrl: 'https://pixabay.com/music/download/music-105243.mp3' },
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
