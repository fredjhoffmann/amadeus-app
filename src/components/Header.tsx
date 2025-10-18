import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center space-y-6 mb-12">
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-primary tracking-tight animate-fade-in">
          Amadeus
        </h1>
        <p className="text-muted-foreground font-medium text-base">
          Classical music & meditation for peaceful bedtime moments
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2 font-medium">
          Demo version • 3 tracks ready • Add classical audio files for full experience
        </p>
      </div>
      
      <div className="w-32 h-0.5 bg-gradient-primary mx-auto opacity-50 rounded-full"></div>
    </header>
  );
};