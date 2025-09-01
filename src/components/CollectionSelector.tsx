import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Music } from 'lucide-react';

interface MusicCollection {
  id: string;
  name: string;
  tracks: any[];
}

interface CollectionSelectorProps {
  collections: MusicCollection[];
  currentCollectionIndex: number;
  onCollectionChange: (index: number) => void;
}

export const CollectionSelector: React.FC<CollectionSelectorProps> = ({
  collections,
  currentCollectionIndex,
  onCollectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentCollection = collections[currentCollectionIndex];

  return (
    <Card className="bg-card/20 border border-border/10 backdrop-blur-sm">
      <div className="p-4">
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-muted-foreground hover:text-foreground flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="text-sm font-medium">{currentCollection.name}</span>
              <span className="text-xs opacity-60">({currentCollection.tracks.length} tracks)</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border/20 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="py-2">
                {collections.map((collection, index) => (
                  <button
                    key={collection.id}
                    onClick={() => {
                      onCollectionChange(index);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      index === currentCollectionIndex
                        ? 'bg-primary/20 text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{collection.name}</span>
                      <span className="text-xs opacity-60">{collection.tracks.length} tracks</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};