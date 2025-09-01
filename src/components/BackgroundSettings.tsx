import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Palette, Sparkles } from 'lucide-react';
import { Track } from '@/data/tracks';
import { useTrackBackgrounds } from '@/hooks/useTrackBackgrounds';

interface BackgroundSettingsProps {
  allTracks: Track[];
}

export const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ allTracks }) => {
  const [apiKey, setApiKey] = useState('');
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { loading, generateAllBackgrounds } = useTrackBackgrounds();

  const handleGenerate = async () => {
    if (!apiKey.trim()) return;
    
    await generateAllBackgrounds(allTracks, apiKey, (current, total) => {
      setProgress((current / total) * 100);
    });
    
    setProgress(0);
  };

  if (!isExpanded) {
    return (
      <Card className="bg-card/20 border border-border/10 backdrop-blur-sm">
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="w-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <Palette className="h-4 w-4 mr-2" />
            Generate Custom Backgrounds
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-card/20 border border-border/10 backdrop-blur-sm">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Background Generator</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </Button>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="api-key" className="text-xs text-muted-foreground">
              Runware API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Runware API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground/60 mt-1">
              Get your API key from{' '}
              <a 
                href="https://runware.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                runware.ai
              </a>
            </p>
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Generating cozy backgrounds...
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!apiKey.trim() || loading}
            className="w-full"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate All Backgrounds ({allTracks.length} tracks)
          </Button>
        </div>
      </div>
    </Card>
  );
};