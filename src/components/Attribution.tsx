import React from 'react';
import { Card } from '@/components/ui/card';
import { musicCollections } from '@/data/tracks';

export const Attribution: React.FC = () => {
  return (
    <Card className="bg-card/10 border border-border/5 backdrop-blur-sm mt-4">
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-serif text-muted-foreground text-center">Music Attribution</h4>
        
        <div className="text-xs text-muted-foreground/80 space-y-2 max-h-48 overflow-y-auto">
          {musicCollections.map((collection) =>
            collection.tracks.map((track) => (
              <div key={track.id}>
                <p className="font-medium">{track.composer} - {track.title}</p>
                <p>
                  {track.performer && `Performer: ${track.performer} • `}
                  {track.source && `Source: ${track.source}`}
                  {track.license && ` • License: ${track.license}`}
                </p>
              </div>
            ))
          )}
        </div>
        
        <div className="pt-2 border-t border-border/10">
          <p className="text-xs text-muted-foreground/60 text-center">
            All recordings used with permission under public domain or royalty-free licenses
          </p>
        </div>
      </div>
    </Card>
  );
};