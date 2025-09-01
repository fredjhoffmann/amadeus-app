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

// Worldwide bedtime tracks with non-western instruments
const worldwideTracks: Track[] = [
  {
    id: "rokudan-no-shirabe",
    title: "Rokudan no Shirabe (Six Steps)",
    composer: "Yatsuhashi Kengyo",
    duration: "8:45",
    url: "/audio/rokudan-no-shirabe.mp3",
    performer: "Traditional Koto",
    source: "archive.org",
    license: "Public Domain"
  },
  {
    id: "high-mountains-flowing-water",
    title: "High Mountains, Flowing Water",
    composer: "Traditional Chinese",
    duration: "7:20",
    url: "/audio/high-mountains-flowing-water.mp3", 
    performer: "Traditional Guqin",
    source: "archive.org",
    license: "Public Domain"
  },
  {
    id: "raga-yaman",
    title: "Raga Yaman (Evening)",
    composer: "Traditional Indian",
    duration: "12:30",
    url: "/audio/raga-yaman.mp3",
    performer: "Traditional Sitar", 
    source: "archive.org",
    license: "Public Domain"
  },
  {
    id: "oud-maqam-bayati",
    title: "Maqam Bayati Taqsim",
    composer: "Traditional Arabic",
    duration: "6:15",
    url: "/audio/oud-maqam-bayati.mp3",
    performer: "Traditional Oud",
    source: "archive.org", 
    license: "Public Domain"
  },
  {
    id: "arirang-gayageum",
    title: "Arirang",
    composer: "Traditional Korean",
    duration: "4:50",
    url: "/audio/arirang-gayageum.mp3",
    performer: "Traditional Gayageum",
    source: "archive.org",
    license: "Public Domain"
  },
  {
    id: "temple-life",
    title: "Temple Life",
    composer: "Shaolin Dub",
    duration: "3:42",
    url: "/audio/temple-life.mp3",
    performer: "Shaolin Dub",
    source: "freemusicarchive.org",
    license: "Creative Commons BY-NC-ND"
  }
];

export const musicCollections: MusicCollection[] = [
  {
    id: "classical",
    name: "Classical Piano",
    tracks: classicalTracks
  },
  {
    id: "worldwide",
    name: "Worldwide Bedtime",
    tracks: worldwideTracks
  }
];