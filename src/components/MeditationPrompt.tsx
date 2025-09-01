import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const meditationPrompts = [
  "Take a moment to feel grateful for this peaceful time with your little one.",
  "Notice the gentle rhythm of your child's breathing as they settle into sleep.",
  "Embrace this quiet moment and let go of the day's worries.",
  "Feel the love flowing between you and your child in this serene space.",
  "Allow yourself to be present in this tender bedtime ritual.",
  "Breathe deeply and appreciate the gift of these precious moments together.",
  "Let the soft music carry away any tension from your day.",
  "Focus on the warmth and safety you're creating for your child.",
  "Feel your heart slow and sync with the peaceful energy around you.",
  "Cherish this sacred time of connection and calm.",
  "Notice how your presence brings comfort and security to your little one.",
  "Let yourself rest in the beauty of this nighttime journey together."
];

export const MeditationPrompt: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * meditationPrompts.length);
    setCurrentPrompt(meditationPrompts[randomIndex]);
  };

  useEffect(() => {
    getRandomPrompt();
  }, []);

  return (
    <Card className="bg-card/20 border border-border/10 backdrop-blur-sm shadow-card">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-foreground">Peaceful Reflection</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={getRandomPrompt}
            className="text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="min-h-[80px] flex items-center">
          <p className="text-muted-foreground font-serif italic leading-relaxed text-center">
            "{currentPrompt}"
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground/60">
            Tap the refresh icon for a new reflection
          </p>
        </div>
      </div>
    </Card>
  );
};