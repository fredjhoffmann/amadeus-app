import { useState, useCallback } from 'react';
import { Track } from '@/data/tracks';
import { RunwareService } from '@/lib/runware';

interface TrackBackground {
  trackId: string;
  imageUrl: string;
  prompt: string;
}

export const useTrackBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);

  // Load cached backgrounds from localStorage
  const loadCachedBackgrounds = useCallback(() => {
    try {
      const cached = localStorage.getItem('track-backgrounds');
      if (cached) {
        const parsed: TrackBackground[] = JSON.parse(cached);
        const backgroundMap = new Map(parsed.map(bg => [bg.trackId, bg.imageUrl]));
        setBackgrounds(backgroundMap);
      }
    } catch (error) {
      console.error('Failed to load cached backgrounds:', error);
    }
  }, []);

  // Save backgrounds to localStorage
  const saveCachedBackgrounds = useCallback((newBackgrounds: Map<string, string>) => {
    try {
      const backgroundArray: TrackBackground[] = Array.from(newBackgrounds.entries()).map(([trackId, imageUrl]) => ({
        trackId,
        imageUrl,
        prompt: getPromptForTrack(trackId)
      }));
      localStorage.setItem('track-backgrounds', JSON.stringify(backgroundArray));
    } catch (error) {
      console.error('Failed to save cached backgrounds:', error);
    }
  }, []);

  // Generate prompt for each track
  const getPromptForTrack = (trackId: string): string => {
    const prompts: Record<string, string> = {
      'satie-gymnopedie-1': 'Cozy night scene with soft moonlight filtering through bedroom curtains, warm golden tones, peaceful atmosphere, dreamy and ethereal, ultra high resolution',
      'beethoven-moonlight': 'Serene moonlit landscape with a calm lake reflecting starlight, cozy cabin lights in distance, warm amber glow, peaceful night sky, ultra high resolution',
      'chopin-prelude-e-minor': 'Intimate candlelit room with soft shadows, warm fireplace glow, cozy armchair, books and classical music sheets, peaceful evening atmosphere, ultra high resolution',
      'mendelssohn-song-without-words': 'Gentle twilight garden with fairy lights, cozy reading nook, soft purple and golden sky, peaceful and romantic, ultra high resolution',
      'beethoven-fur-elise': 'Cozy vintage music room with piano, warm lamplight, soft textures, peaceful evening scene with classical elements, ultra high resolution',
      'bach-prelude-c-major': 'Peaceful morning scene with soft golden sunlight, cozy breakfast nook, warm colors, serene and uplifting atmosphere, ultra high resolution',
      'schumann-traumerei': 'Dreamy bedroom scene with soft pillows, warm blankets, gentle starlight through window, cozy and tranquil, ultra high resolution',
      'koto-shamisen': 'Peaceful Japanese garden at night with lanterns, cozy traditional setting, warm golden light, serene zen atmosphere, ultra high resolution',
      'koto-improvisation': 'Tranquil Japanese tea house with soft lighting, cozy tatami mats, peaceful night scene with traditional elements, ultra high resolution'
    };

    return prompts[trackId] || 'Cozy peaceful night scene with warm lighting, serene atmosphere, comforting and dreamy, ultra high resolution';
  };

  // Generate background for single track
  const generateBackground = useCallback(async (track: Track, apiKey: string): Promise<string | null> => {
    try {
      const service = new RunwareService(apiKey);
      const prompt = getPromptForTrack(track.id);
      const result = await service.generateImage({ positivePrompt: prompt });
      return result.imageURL;
    } catch (error) {
      console.error(`Failed to generate background for ${track.id}:`, error);
      return null;
    }
  }, []);

  // Generate all backgrounds
  const generateAllBackgrounds = useCallback(async (tracks: Track[], apiKey: string, onProgress?: (current: number, total: number) => void) => {
    setLoading(true);
    const newBackgrounds = new Map(backgrounds);
    
    try {
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        onProgress?.(i + 1, tracks.length);
        
        // Skip if already have background
        if (newBackgrounds.has(track.id)) continue;
        
        const imageUrl = await generateBackground(track, apiKey);
        if (imageUrl) {
          newBackgrounds.set(track.id, imageUrl);
          setBackgrounds(new Map(newBackgrounds));
          saveCachedBackgrounds(newBackgrounds);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [backgrounds, generateBackground, saveCachedBackgrounds]);

  // Get background for track (with fallback)
  const getBackgroundForTrack = useCallback((trackId: string): string => {
    const generated = backgrounds.get(trackId);
    if (generated) return generated;

    // Fallback to static images
    if (trackId.includes('koto') || trackId.includes('shamisen')) {
      return '/src/assets/japanese-garden-koto.jpg';
    } else {
      return '/src/assets/classical-piano-ambient.jpg';
    }
  }, [backgrounds]);

  return {
    backgrounds,
    loading,
    loadCachedBackgrounds,
    generateAllBackgrounds,
    getBackgroundForTrack
  };
};