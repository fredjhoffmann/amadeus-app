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
  'clair-de-lune': [
    "Let moonlight soften the room as your breath settles into calm.",
    "Breathe with the gentleness of moonlit water and quiet skies.",
  ],
  'beethoven-moonlight': [
    "Follow the slow arc of the melody and let thoughts dim like starlight.",
    "Let steady calm rise and fall like waves under a quiet moon.",
  ],
  'satie-gymnopedie': [
    "Allow simplicity to hold you; let every note untie a small knot of the day.",
    "Rest in the spacious quiet between the notes.",
  ],
  'chopin-nocturne-op9': [
    "Invite tenderness into the room; let warm tone and breath cradle the moment.",
    "Let this nocturne bathe the space in softness and care.",
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