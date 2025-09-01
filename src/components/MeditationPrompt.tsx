import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface TrackLite {
  id: string;
  title: string;
  composer: string;
}

const basePrompts = [
  // Presence & Mindfulness
  "Embrace this quiet moment and let go of the day's worries.",
  "Allow yourself to be present in this tender bedtime ritual.",
  "Breathe deeply and appreciate the gift of these precious moments together.",
  "Let this moment be exactly what it is, without needing anything more.",
];

const promptsByTrack: Record<string, string[]> = {
  // Classical Piano
  'satie-gymnopedie-1': [
    "Allow simplicity to hold you; let every note untie a small knot of the day.",
    "Rest in the spacious quiet between the notes.",
  ],
  'beethoven-moonlight': [
    "Follow the slow arc of the melody and let thoughts dim like starlight.",
    "Let steady calm rise and fall like waves under a quiet moon.",
  ],
  'chopin-prelude-e-minor': [
    "Let this gentle prelude soften your thoughts like morning mist.",
    "Breathe with Chopin's tender melancholy and find peace in transition.",
  ],
  'mendelssohn-song-without-words': [
    "Let music speak what words cannot; find rest in unspoken understanding.",
    "Allow this wordless song to carry away the day's unfinished conversations.",
  ],
  'beethoven-fur-elise': [
    "Rest in the familiar embrace of this beloved melody.",
    "Let cherished music wrap around you like a gentle lullaby.",
  ],
  'bach-prelude-c-major': [
    "Find clarity in Bach's perfect architecture of sound.",
    "Breathe with the mathematical beauty that brings order to chaos.",
  ],
  'schumann-traumerei': [
    "Drift into the dreaming space where music and sleep gently meet.",
    "Let Schumann's reverie guide you toward peaceful rest.",
  ],
  
  // Worldwide Bedtime
  'rokudan-no-shirabe': [
    "Let the koto's ancient strings guide you through six steps toward inner stillness.",
    "Find harmony in the traditional rhythms that have soothed souls for centuries.",
  ],
  'high-mountains-flowing-water': [
    "Breathe with the mountain's wisdom and flow like gentle water finding its way.",
    "Let the guqin's voice carry you to peaks of tranquility and valleys of rest.",
  ],
  'raga-yaman': [
    "Rest in the evening raga's embrace as day melts into peaceful night.",
    "Allow the sitar's contemplative notes to guide your spirit homeward.",
  ],
  'oud-maqam-bayati': [
    "Let the oud's warm resonance envelop you like desert starlight.",
    "Find refuge in the ancient maqam's timeless patterns of beauty.",
  ],
  'arirang-gayageum': [
    "Rest in the folk song's gentle longing and find peace in its familiar comfort.",
    "Let the gayageum's delicate plucking soothe your heart like falling petals.",
  ],
  'temple-life': [
    "Breathe with the temple's rhythm and find sanctuary in sacred stillness.",
    "Let monastic tranquility wash over your day's accumulated tensions.",
  ],
};

const promptsByComposer: Record<string, string[]> = {
  'Claude Debussy': [
    "Let the music paint gentle light across your evening.",
  ],
  'Ludwig van Beethoven': [
    "Trust the strength in calm; breathe with grounded patience.",
  ],
  'Erik Satie': [
    "Embrace the beauty of simplicity and quiet presence.",
  ],
  'Frédéric Chopin': [
    "Let tenderness guide your breath and soften the day.",
  ],
};

export const MeditationPrompt: React.FC<{ track?: TrackLite }> = ({ track }) => {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const choosePrompt = () => {
    let pool: string[] = [];
    if (track?.id && promptsByTrack[track.id]) pool = promptsByTrack[track.id];
    else if (track?.composer && promptsByComposer[track.composer]) pool = promptsByComposer[track.composer];
    else pool = basePrompts;

    const idx = Math.floor(Math.random() * pool.length);
    setCurrentPrompt(pool[idx]);
  };

  useEffect(() => {
    choosePrompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id]);

  return (
    <div className="text-center space-y-6 mb-8 animate-fade-in">
      <div className="space-y-4">
        <div className="min-h-[100px] flex items-center justify-center">
          <p className="text-xl font-serif italic leading-relaxed text-foreground/90 px-4">
            "{currentPrompt}"
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <p className="text-sm text-muted-foreground font-serif">
            — A moment of reflection for {track?.title || 'this piece'}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={choosePrompt}
            className="text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100 h-8 w-8 p-0"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="w-24 h-px bg-gradient-primary mx-auto opacity-60"></div>
    </div>
  );
};