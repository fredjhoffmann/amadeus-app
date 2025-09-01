import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center space-y-4 mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif text-primary font-light tracking-wide">
          Amadeus
        </h1>
        <p className="text-muted-foreground font-serif italic">
          A companion for peaceful bedtime moments
        </p>
      </div>
      
      <div className="w-24 h-px bg-gradient-primary mx-auto opacity-60"></div>
    </header>
  );
};