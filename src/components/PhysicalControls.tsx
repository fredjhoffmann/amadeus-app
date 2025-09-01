import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Volume2, Zap, Smartphone } from 'lucide-react';

interface PhysicalControlsProps {
  onActionButtonPress?: () => void;
}

export const PhysicalControls: React.FC<PhysicalControlsProps> = ({ onActionButtonPress }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser behavior for volume keys
      if (e.key === 'AudioVolumeUp' || e.key === 'AudioVolumeDown' || e.key === 'AudioVolumeMute') {
        e.preventDefault();
      }
      
      // Handle action button (mapped to specific key or custom event)
      if (e.key === 'F1' || e.code === 'F1') {
        e.preventDefault();
        onActionButtonPress?.();
      }
    };

    // Listen for hardware button events
    window.addEventListener('keydown', handleKeyDown);
    
    // Listen for custom action button events (if supported by PWA)
    const handleActionButton = () => {
      onActionButtonPress?.();
    };
    
    // Custom event for action button
    window.addEventListener('actionbutton', handleActionButton);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('actionbutton', handleActionButton);
    };
  }, [onActionButtonPress]);

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
            <Zap className="h-3 w-3" />
            <span>Action button: Play/Pause music</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Smartphone className="h-3 w-3" />
            <span>Screen stays dim to preserve sleep</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/10">
          <p className="text-xs text-muted-foreground/60 text-center">
            iPhone 15 Pro: Customize Action Button in Settings → Action Button → Shortcuts
          </p>
        </div>
      </div>
    </Card>
  );
};