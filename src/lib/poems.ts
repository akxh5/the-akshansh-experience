export type Mood = "SOLITUDE" | "WINTER" | "DISTANCE" | "LONGING" | "INSOMNIA" | "MELANCHOLIC" | "NOCTURNAL" | "VISCERAL";

export type CollectionSlug = "winter" | "collapse" | "distance" | "midnight";

export interface Poem {
  slug: string;
  title: string;
  excerpt: string;
  body: string[]; // stanzas, each can have line breaks via \n
  moods: Mood[];
  collection: CollectionSlug;
  date: string;
  author: string;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  description: string;
  wash: string;
  excerpt: string;
}

export const collections: Collection[] = [
  {
    slug: "winter",
    name: "Winter",
    description: "Poems written in the long hush between snowfalls — where memory and cold become the same weather.",
    wash: "#1a2535",
    excerpt: "The cold does not arrive. It remembers you.",
  },
  {
    slug: "collapse",
    name: "Collapse",
    description: "Notes on the quiet undoing — the architecture of things falling away without sound.",
    wash: "#1a1a1f",
    excerpt: "Some endings refuse the courtesy of a sound.",
  },
  {
    slug: "distance",
    name: "Distance",
    description: "The geography between two people who once shared a single silence.",
    wash: "#1e1a2a",
    excerpt: "Distance is the only honest measurement of love.",
  },
  {
    slug: "midnight",
    name: "Midnight",
    description: "Hours that belong to no one — the small theatre of the wakeful mind.",
    wash: "#131320",
    excerpt: "Midnight is a country with no flag.",
  },
];

export const poems: Poem[] = [
  {
    slug: "the-space-between-snowfall",
    title: "The Space Between Snowfall",
    excerpt: "There is a kind of quiet that only snow understands — the way it covers everything without asking permission.",
    body: [
      "There is a kind of quiet\nthat only snow understands —\nthe way it covers everything\nwithout asking permission.",
      "I have learned to live\nin the spaces between things:\nbetween the last word\nand the door closing.",
      "The window holds the cold\nlike a confession.\nI keep meaning to answer\nbut the morning never asks twice.",
    ],
    moods: ["SOLITUDE", "WINTER"],
    collection: "winter",
    date: "December 14",
    author: "Akshansh",
  },
  {
    slug: "winter-memory",
    title: "Winter Memory",
    excerpt: "I found your name written in the frost—",
    body: [
      "I found your name written in the frost\non a window I do not remember closing.",
      "The handwriting was mine.\nThe hand was not.",
      "Some mornings the cold\nremembers more of you than I do.",
    ],
    moods: ["DISTANCE", "WINTER"],
    collection: "winter",
    date: "December 09",
    author: "Akshansh",
  },
  {
    slug: "void-between-stars",
    title: "Void Between Stars",
    excerpt: "The silence between us has its own gravity.",
    body: [
      "The silence between us\nhas its own gravity.",
      "It pulls the small things first —\nthe way you said my name in passing,\nthe weight of an unfinished sentence.",
      "I have stopped reaching for the light.\nThe dark is more honest\nabout what it keeps.",
    ],
    moods: ["LONGING", "DISTANCE"],
    collection: "distance",
    date: "November 28",
    author: "Akshansh",
  },
  {
    slug: "3am-cartography",
    title: "3am Cartography",
    excerpt: "I map the ceiling like I might find an exit.",
    body: [
      "I map the ceiling\nlike I might find an exit.",
      "Every crack is a river\nI have not learned to cross.",
      "The hours pass in a language\nthat refuses translation.\nI listen anyway.",
    ],
    moods: ["INSOMNIA", "NOCTURNAL"],
    collection: "midnight",
    date: "November 21",
    author: "Akshansh",
  },
  {
    slug: "the-architecture-of-leaving",
    title: "The Architecture of Leaving",
    excerpt: "You did not leave so much as become a room I no longer entered.",
    body: [
      "You did not leave\nso much as become\na room I no longer entered.",
      "The door stayed open\nfor a long time.\nI watched it from the hallway,\nrehearsing entrances\nfor a play that had ended.",
    ],
    moods: ["MELANCHOLIC", "DISTANCE"],
    collection: "collapse",
    date: "November 03",
    author: "Akshansh",
  },
  {
    slug: "small-weather",
    title: "Small Weather",
    excerpt: "Some griefs are climates. Some are only the weather of an afternoon.",
    body: [
      "Some griefs are climates.\nSome are only the weather\nof an afternoon.",
      "I am learning the difference\nby standing still\nlong enough to feel the wind change.",
    ],
    moods: ["SOLITUDE", "MELANCHOLIC"],
    collection: "collapse",
    date: "October 22",
    author: "Akshansh",
  },
];

export const getPoem = (slug: string) => poems.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const poemsByCollection = (slug: string) => poems.filter((p) => p.collection === slug);
