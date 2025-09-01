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
  'koto-shamisen': [
    "The ancient sounds of koto and shamisen carry the wisdom of countless generations. Let their resonance connect you to this timeless flow.",
    "Feel how these traditional instruments speak directly to something ancient within you, beyond words or concepts.",
  ],
  'koto-improvisation': [
    "In this spontaneous koto performance, notice how beauty emerges from the moment itself. Trust your own natural rhythms.",
    "Each plucked string is a meditation, each phrase a breath. Let yourself be as present as this musician was in creating these sounds.",
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
        
        <div className="flex items-center justify-center">
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