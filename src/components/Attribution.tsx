import React from 'react';
import { Card } from '@/components/ui/card';

export const Attribution: React.FC = () => {
  return (
    <Card className="bg-card/10 border border-border/5 backdrop-blur-sm mt-4">
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-serif text-muted-foreground text-center">Music Attribution</h4>
        
        <div className="text-xs text-muted-foreground/80 space-y-2">
          <div>
            <p className="font-medium">Chopin - Nocturne Op. 9, No. 2</p>
            <p>Source: Pixabay.com • License: Royalty-free</p>
          </div>
          
          <div>
            <p className="font-medium">Satie - Gymnopédie No. 1</p>
            <p>Source: Pixabay.com • License: Royalty-free</p>
          </div>
          
          <div>
            <p className="font-medium">Debussy - Clair de Lune</p>
            <p>Source: FreePD.com • License: Public Domain</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/10">
          <p className="text-xs text-muted-foreground/60 text-center">
            All recordings used with permission under royalty-free licenses
          </p>
        </div>
      </div>
    </Card>
  );
};