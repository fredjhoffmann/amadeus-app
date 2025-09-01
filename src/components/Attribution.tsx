import React from 'react';
import { Card } from '@/components/ui/card';

export const Attribution: React.FC = () => {
  return (
    <Card className="bg-card/10 border border-border/5 backdrop-blur-sm mt-4">
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-serif text-muted-foreground text-center">Music Attribution</h4>
        
        <div className="text-xs text-muted-foreground/80 space-y-2 max-h-48 overflow-y-auto">
          <div>
            <p className="font-medium">Debussy - Clair de Lune</p>
            <p>Performer: François-Joël Thiollier • Source: YourClassical.org</p>
          </div>
          
          <div>
            <p className="font-medium">Chopin - Nocturne Op. 9, No. 2</p>
            <p>Performer: Denes Varjon • Source: YourClassical.org</p>
          </div>
          
          <div>
            <p className="font-medium">Satie - Gymnopédie No. 1</p>
            <p>Source: Wikimedia Commons • License: Public Domain</p>
          </div>
          
          <div>
            <p className="font-medium">Chopin - Nocturne in C-sharp minor, Op. Posth.</p>
            <p>Performer: Randolph Hokanson • Source: Wikimedia Commons</p>
          </div>
          
          <div>
            <p className="font-medium">Debussy - Rêverie, L. 68</p>
            <p>Source: Free Music Archive • License: Public Domain</p>
          </div>
          
          <div>
            <p className="font-medium">Schumann - Träumerei, Op. 15 No. 7</p>
            <p>Source: Wikimedia Commons • License: Public Domain</p>
          </div>
          
          <div>
            <p className="font-medium">Ravel - Pavane pour une infante défunte</p>
            <p>Performer: Vadim Chaimovich • Source: Wikimedia Commons</p>
          </div>
          
          <div>
            <p className="font-medium">Field - Nocturne No. 5 in B-flat major</p>
            <p>Source: Free Music Archive • License: Public Domain</p>
          </div>
          
          <div>
            <p className="font-medium">Liszt - Consolation No. 3 in D-flat major</p>
            <p>Performer: Martha Goldstein • Source: Wikimedia Commons</p>
          </div>
          
          <div>
            <p className="font-medium">Beethoven - Moonlight Sonata (1st Movement)</p>
            <p>Performer: Paul Pitman • Source: Wikimedia Commons</p>
          </div>
          
          <div>
            <p className="font-medium">Mendelssohn - Song Without Words, Op. 30 No. 6</p>
            <p>Performer: Gregor Quendel • Source: Free Music Archive</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/10">
          <p className="text-xs text-muted-foreground/60 text-center">
            Western Classical collection • All recordings used with permission under public domain or royalty-free licenses
          </p>
        </div>
      </div>
    </Card>
  );
};