import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Volume2, Power, Smartphone } from 'lucide-react';

export const PhysicalControls: React.FC = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser behavior for volume keys
      if (e.key === 'AudioVolumeUp' || e.key === 'AudioVolumeDown' || e.key === 'AudioVolumeMute') {
        e.preventDefault();
      }
    };

    // Listen for hardware button events
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Card className="bg-card/10 border border-border/5 backdrop-blur-sm">
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-serif text-muted-foreground text-center">Physical Controls</h4>
        
        <div className="space-y-2 text-xs text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <Volume2 className="h-3 w-3" />
            <span>Volume buttons: Adjust music volume</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Power className="h-3 w-3" />
            <span>Power button: Stop/Start music</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Smartphone className="h-3 w-3" />
            <span>Screen stays dim to preserve sleep</span>
          </div>
        </div>
      </div>
    </Card>
  );
};