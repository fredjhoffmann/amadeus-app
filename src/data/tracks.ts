export interface Track {
  id: string;
  title: string;
  composer: string;
  duration: string;
  url: string;
  performer?: string;
  source?: string;
  license?: string;
}

export interface MusicCollection {
  id: string;
  name: string;
  tracks: Track[];
}

// Simplified collection with verified working audio files
const classicalTracks: Track[] = [
  {
    id: "satie-gymnopedie-1",
    title: "Gymnopédie No. 1",
    composer: "Erik Satie",
    duration: "3:32",
    url: "/audio/satie-gymnopedie-1.mp3",
    performer: "A-M Classical",
    source: "amclassical.com",
    license: "Creative Commons Attribution"
  },
  {
    id: "beethoven-moonlight",
    title: "Moonlight Sonata, 1st Movement",
    composer: "Ludwig van Beethoven",
    duration: "5:02",
    url: "/audio/beethoven-moonlight.mp3",
    performer: "A-M Classical", 
    source: "amclassical.com",
    license: "Creative Commons Attribution"
  },
  {
    id: "chopin-prelude-e-minor", 
    title: "Prelude in E minor, Op. 28 No. 4",
    composer: "Frédéric Chopin",
    duration: "2:07",
    url: "/audio/chopin-prelude-e-minor.mp3",
    performer: "A-M Classical",
    source: "amclassical.com", 
    license: "Creative Commons Attribution"
  },
  {
    id: "mendelssohn-song-without-words",
    title: "Song Without Words",
    composer: "Fanny Mendelssohn-Hensel",
    duration: "2:58",
    url: "/audio/mendelssohn-song-without-words.mp3",
    performer: "A-M Classical",
    source: "amclassical.com",
    license: "Creative Commons Attribution"
  },
  {
    id: "beethoven-fur-elise",
    title: "Für Elise",
    composer: "Ludwig van Beethoven", 
    duration: "3:25",
    url: "/audio/beethoven-fur-elise.mp3",
    performer: "A-M Classical",
    source: "amclassical.com",
    license: "Creative Commons Attribution"
  },
  {
    id: "bach-prelude-c-major",
    title: "Prelude in C major, BWV 846a",
    composer: "Johann Sebastian Bach",
    duration: "2:24",
    url: "/audio/bach-prelude-c-major.mp3",
    performer: "A-M Classical",
    source: "amclassical.com",
    license: "Creative Commons Attribution"
  },
  {
    id: "schumann-traumerei",
    title: "Träumerei (Dreaming)",
    composer: "Robert Schumann",
    duration: "2:30",
    url: "/audio/schumann-traumerei.mp3",
    performer: "Public Domain",
    source: "archive.org",
    license: "Public Domain"
  }
];

// Simple worldwide collection with verified working audio files
const worldwideTracks: Track[] = [
  {
    id: "koto-shamisen",
    title: "Koto and Shamisen Traditional",
    composer: "Traditional Japanese",
    duration: "0:30",
    url: "/audio/koto-shamisen.mp3",
    performer: "zagi2",
    source: "freesound.org",
    license: "Creative Commons"
  },
  {
    id: "koto-improvisation",
    title: "Koto Improvisation Session",
    composer: "Traditional Japanese",
    duration: "1:45",
    url: "/audio/koto-improvisation.mp3",
    performer: "RutgerMuller",
    source: "freesound.org",
    license: "Creative Commons"
  }
];

export const musicCollections: MusicCollection[] = [
  {
    id: "classical",
    name: "Western Bedtime",
    tracks: classicalTracks
  },
  {
    id: "worldwide",
    name: "Worldwide Bedtime",
    tracks: worldwideTracks
  }
];