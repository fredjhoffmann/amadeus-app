export interface Track {
  id: string;
  title: string;
  composer: string;
  duration: string;
  url: string;
  sources?: { type: string; src: string }[];
  performer?: string;
  source?: string;
  license?: string;
}

export interface MusicCollection {
  id: string;
  name: string;
  tracks: Track[];
}

const westClassicalTracks: Track[] = [
  {
    id: 'debussy-reverie',
    title: 'Rêverie, L. 68',
    composer: 'Claude Debussy',
    duration: '4:20',
    url: '/audio/debussy-reverie.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/debussy-reverie.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Archive.org Performance',
    source: 'Archive.org (Debussy Collection)',
    license: 'Public Domain'
  },
  {
    id: 'chopin-nocturne-op9',
    title: 'Nocturne in E-flat major, Op. 9, No. 2',
    composer: 'Frédéric Chopin',
    duration: '4:30',
    url: '/audio/chopin-nocturne-op9-no2.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/chopin-nocturne-op9-no2.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Wikimedia Commons Performance',
    source: 'Wikimedia Commons',
    license: 'Public Domain'
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    duration: '3:33',
    url: '/audio/satie-gymnopedie-1.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/satie-gymnopedie-1.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Kevin MacLeod',
    source: 'Free Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'chopin-nocturne-cs-minor',
    title: 'Nocturne in C-sharp minor, Op. Posth.',
    composer: 'Frédéric Chopin',
    duration: '4:45',
    url: '/audio/chopin-nocturne-cs-minor.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/chopin-nocturne-cs-minor.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'schumann-traumerei',
    title: 'Träumerei, Op. 15 No. 7',
    composer: 'Robert Schumann',
    duration: '2:30',
    url: '/audio/schumann-traumerei.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/schumann-traumerei.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'ravel-pavane',
    title: 'Pavane pour une infante défunte',
    composer: 'Maurice Ravel',
    duration: '6:30',
    url: '/audio/ravel-pavane.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ravel-pavane.mp3' },
      { type: 'audio/mpeg', src: '/audio/demo-track.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'field-nocturne-5',
    title: 'Nocturne No. 5 in B-flat major',
    composer: 'John Field',
    duration: '4:15',
    url: '/audio/field-nocturne-5.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/field-nocturne-5.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'liszt-consolation-3',
    title: 'Consolation No. 3 in D-flat major',
    composer: 'Franz Liszt',
    duration: '4:00',
    url: '/audio/liszt-consolation-3.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/liszt-consolation-3.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  },
  {
    id: 'beethoven-moonlight',
    title: 'Moonlight Sonata (1st Movement), Op. 27 No. 2',
    composer: 'Ludwig van Beethoven',
    duration: '5:30',
    url: '/audio/beethoven-moonlight.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/beethoven-moonlight.mp3' }
    ],
    performer: 'Paul Pitman',
    source: 'Archive.org',
    license: 'Public Domain'
  },
  {
    id: 'mendelssohn-song-without-words',
    title: 'Song Without Words, Op. 30 No. 6 (Venetian Boat Song)',
    composer: 'Felix Mendelssohn',
    duration: '2:45',
    url: '/audio/mendelssohn-song-without-words.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/mendelssohn-song-without-words.mp3' }
    ],
    performer: 'Public Domain Performance',
    source: 'Classical Music Archive',
    license: 'Public Domain'
  }
];

const worldwideBedtimeTracks: Track[] = [
  {
    id: 'rokudan-no-shirabe',
    title: 'Rokudan no Shirabe',
    composer: 'Yatsuhashi Kengyō (Traditional Japanese)',
    duration: '6:00',
    url: '/audio/rokudan-no-shirabe.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/rokudan-no-shirabe.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'high-mountains-flowing-water',
    title: 'High Mountains and Flowing Water (Gao Shan Liu Shui)',
    composer: 'Bo Ya (Traditional Chinese)',
    duration: '5:30',
    url: '/audio/high-mountains-flowing-water.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/high-mountains-flowing-water.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'raga-yaman',
    title: 'Raga Yaman',
    composer: 'Traditional Indian Classical',
    duration: '8:00',
    url: '/audio/raga-yaman.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/raga-yaman.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'shur-santur',
    title: 'Shur (Dastgah-e Shur)',
    composer: 'Traditional Persian',
    duration: '6:45',
    url: '/audio/shur-santur.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/shur-santur.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'alf-leila-wa-leila',
    title: 'Alf Leila Wa Leila (One Thousand and One Nights)',
    composer: 'Traditional Arabic',
    duration: '5:15',
    url: '/audio/alf-leila-wa-leila.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/alf-leila-wa-leila.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'ney-taksimi',
    title: 'Ney Taksimi (Improvisation)',
    composer: 'Traditional Turkish',
    duration: '4:30',
    url: '/audio/ney-taksimi.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ney-taksimi.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'arirang',
    title: 'Arirang',
    composer: 'Traditional Korean',
    duration: '4:00',
    url: '/audio/arirang.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/arirang.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'puspanjali',
    title: 'Puspanjali',
    composer: 'Traditional Balinese',
    duration: '7:00',
    url: '/audio/puspanjali.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/puspanjali.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'lao-duang-duean',
    title: 'Lao Duang Duean',
    composer: 'H.R.H. Prince Benbhadanabhongse (Traditional Thai)',
    duration: '5:45',
    url: '/audio/lao-duang-duean.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/lao-duang-duean.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  },
  {
    id: 'ladrang-wilujeng',
    title: 'Ladrang Wilujeng',
    composer: 'Traditional Javanese',
    duration: '6:30',
    url: '/audio/ladrang-wilujeng.mp3',
    sources: [
      { type: 'audio/mpeg', src: '/audio/ladrang-wilujeng.mp3' }
    ],
    performer: 'Traditional Performance',
    source: 'World Music Archive',
    license: 'Traditional/Public Domain'
  }
];

export const musicCollections: MusicCollection[] = [
  {
    id: 'western-classical',
    name: 'Western Classical',
    tracks: westClassicalTracks,
  },
  {
    id: 'worldwide-bedtime',
    name: 'Worldwide Bedtime',
    tracks: worldwideBedtimeTracks,
  },
];