export type Mood = 
  | "LONGING" 
  | "LOVE" 
  | "ABSENCE" 
  | "SOLITUDE" 
  | "INSOMNIA" 
  | "MELANCHOLY" 
  | "CATHARSIS" 
  | "NOSTALGIA" 
  | "DEVOTION" 
  | "WONDER" 
  | "HOPE" 
  | "PHILOSOPHY" 
  | "RESILIENCE" 
  | "INTROSPECTION" 
  | "TIME" 
  | "MEMORY" 
  | "WARMTH";

export interface Poem {
  title: string;
  slug: string;
  date: string;
  author: string;
  mood: Mood[];
  collection: string;
  featured: boolean;
  excerpt: string;
  coverImage: string;
  content: string;
  isSubmission?: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  excerpt: string;
}

export const collections: Collection[] = [
  {
    slug: "winter",
    name: "Winter",
    description: "Poems written in the long hush between snowfalls — where memory and cold become the same weather.",
    excerpt: "The cold does not arrive. It remembers you.",
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    description: "Hours that belong to no one — the small theatre of the wakeful mind.",
    excerpt: "Midnight is a country with no flag.",
  },
  {
    slug: "constellations",
    name: "Constellations",
    description: "Map-making through the stars — finding geometry in the distance between us.",
    excerpt: "We are all just tracing patterns in the dark.",
  },
  {
    slug: "small-eternities",
    name: "Small Eternities",
    description: "Moments that refuse to end — the briefest intersections that last a lifetime.",
    excerpt: "Some seconds are built to hold the weight of years.",
  },
  {
    slug: "architecture-of-leaving",
    name: "Architecture of Leaving",
    description: "Notes on the quiet undoing — the way rooms change when they are no longer entered.",
    excerpt: "Some endings refuse the courtesy of a sound.",
  },
  {
    slug: "observations",
    name: "Observations",
    description: "The philosophy of the mundane — seeing the world exactly as it is, without apology.",
    excerpt: "The truth is often quieter than the lie.",
  },
];

export const poems: Poem[] = [
  {
    title: "A Home in My Heart",
    slug: "a-home-in-my-heart",
    date: "2022-02-14",
    author: "Akshansh",
    mood: ["LOVE", "MEMORY", "DEVOTION"],
    collection: "small-eternities",
    featured: false,
    excerpt: "every little word you've said to me, has made a home.",
    coverImage: "",
    content: `In the deepest corners of my heart,  
every little word you've said to me,  
has made a home.`
  },
  {
    title: "In Unity",
    slug: "in-unity",
    date: "2022-04-12",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "HOPE"],
    collection: "small-eternities",
    featured: false,
    excerpt: "Forever bound, in unity.",
    coverImage: "",
    content: `In twilight's glow,  
our spirits free,  

Entwined in dreams,  
a symphony.  

Through whispered winds,  
a destiny,  

Forever bound,  
in unity.`
  },
  {
    title: "I Agreed",
    slug: "i-agreed",
    date: "2022-06-21",
    author: "Akshansh",
    mood: ["LOVE", "WONDER"],
    collection: "small-eternities",
    featured: false,
    excerpt: "She wished for me to embrace enchanting thoughts gazing at her.",
    coverImage: "",
    content: `She wished for me  
to embrace enchanting thoughts  
gazing at her,  
I agreed.`
  },
  {
    title: "The Classic One",
    slug: "the-classic-one",
    date: "2022-08-30",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "NOSTALGIA"],
    collection: "small-eternities",
    featured: false,
    excerpt: "She's my Music (the classic one)",
    coverImage: "",
    content: `she's like a Continuum  

She's my Music  
(the classic one)`
  },
  {
    title: "If You're All Mine",
    slug: "if-youre-all-mine",
    date: "2022-10-15",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION"],
    collection: "small-eternities",
    featured: false,
    excerpt: "I'm all yours if you're all mine.",
    coverImage: "",
    content: `And I don't mind  
if we take our time  
'cause I'm all yours  
if you're all mine`
  },
  {
    title: "Outrunning Fate",
    slug: "outrunning-fate",
    date: "2023-03-20",
    author: "Akshansh",
    mood: ["LONGING", "WONDER", "DEVOTION"],
    collection: "constellations",
    featured: false,
    excerpt: "A glow of distant memory, outrunning fate across the sky.",
    coverImage: "",
    content: `May we be the fidien dreams,  
Who on some distant world still soar,  
A glow of distant memory,  
Outrunning fate across the sky.`
  },
  {
    title: "A Celestial Decree",
    slug: "a-celestial-decree",
    date: "2023-05-18",
    author: "Akshansh",
    mood: ["LOVE", "WONDER", "DEVOTION"],
    collection: "constellations",
    featured: false,
    excerpt: "for you and me in silent glee.",
    coverImage: "",
    content: `Bathed in lunar glow,  
tonight unfurls.  
the moon's soft touch,  
a dance of pearls.  

More light it weaves,  
a celestial decree,  
for you and me  
in silent glee.`
  },
  {
    title: "Celestial Whispers",
    slug: "celestial-whispers",
    date: "2023-07-04",
    author: "Akshansh",
    mood: ["LOVE", "WONDER"],
    collection: "constellations",
    featured: false,
    excerpt: "A stardust symphony, where secrets confide.",
    coverImage: "",
    content: `in her eyes,  
celestial whispers reside  

A stardust symphony,  
where secrets confide,  

Lost in divine echoes,  
a soul untethered.`
  },
  {
    title: "You Outshine the Stars",
    slug: "you-outshine-the-stars",
    date: "2023-11-30",
    author: "Akshansh",
    mood: ["LOVE", "WONDER"],
    collection: "constellations",
    featured: false,
    excerpt: "you outshine those stars.",
    coverImage: "",
    content: `Like confetti,  
the stars drizzle from the sky  
when I stand beside you,  
mesmerized by your smile.  

And even though in reality,  
you outshine those stars.  
I can't deny the magic.....  
you make me feel inside my heart!`
  },
  {
    title: "Reason or Remedy",
    slug: "reason-or-remedy",
    date: "2023-09-12",
    author: "Akshansh",
    mood: ["LOVE", "INTROSPECTION"],
    collection: "observations",
    featured: false,
    excerpt: "You are the reason for it. Or you are the solution for it.",
    coverImage: "",
    content: `When someone says  
They are sad  
And don't know why  

Then either  
You are the reason for it  
Or  
You are the solution for it`
  },
  {
    title: "Words That Wound",
    slug: "words-that-wound",
    date: "2024-03-15",
    author: "Akshansh",
    mood: ["ABSENCE", "MELANCHOLY", "PHILOSOPHY"],
    collection: "architecture-of-leaving",
    featured: false,
    excerpt: "Words, sharp knives, in hearts do seep.",
    coverImage: "",
    content: `In silence deep,  
where echoes creep,  
Words, sharp knives,  
in hearts do seep.`
  },
  {
    title: "The Carpet of Silence",
    slug: "the-carpet-of-silence",
    date: "2024-05-22",
    author: "Akshansh",
    mood: ["SOLITUDE", "MELANCHOLY", "ABSENCE"],
    collection: "architecture-of-leaving",
    featured: false,
    excerpt: "His sufferings were brushed under the carpet of his silence.",
    coverImage: "",
    content: `His sufferings were brushed  
Under the carpet of his silence`
  },
  {
    title: "If There Is No You",
    slug: "if-there-is-no-you",
    date: "2024-08-27",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "LONGING"],
    collection: "constellations",
    featured: false,
    excerpt: "For if there is no you There is no me",
    coverImage: "",
    content: `Now I'm looking, searching for  
A single grain of sand,  

Amidst the sea of souls,  
Stretching out into Infinity.  

For if there is no you  
There is no me`
  },
  {
    title: "The Maze of Memory",
    slug: "the-maze-of-memory",
    date: "2024-10-10",
    author: "Akshansh",
    mood: ["MEMORY", "NOSTALGIA", "INTROSPECTION"],
    collection: "architecture-of-leaving",
    featured: false,
    excerpt: "But memories aren't a way out. They're a maze.",
    coverImage: "",
    content: `We feel Memories as  
An escape from our reality  
But Memories aren't a way out  
Its a Maze`
  },
  {
    title: "Entropy",
    slug: "entropy",
    date: "2024-11-05",
    author: "Akshansh",
    mood: ["PHILOSOPHY", "TIME"],
    collection: "observations",
    featured: false,
    excerpt: "Everything Changes. Just in different ways.",
    coverImage: "",
    content: `Some things breaks,  
Some fades,  
Some melts,  
Some vaporize  
Everything Changes  
Just in different ways  
On its own terms`
  },
  {
    title: "My Ruins",
    slug: "my-ruins",
    date: "2024-12-14",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "RESILIENCE"],
    collection: "winter",
    featured: false,
    excerpt: "but in you I found someone who loved my ruins",
    coverImage: "",
    content: `my heart  
was a wreck  

but in you  
I found someone who loved  
my ruins`
  },
  {
    title: "A Little Sunshine",
    slug: "a-little-sunshine",
    date: "2025-01-12",
    author: "Akshansh",
    mood: ["LOVE", "WARMTH", "HOPE"],
    collection: "winter",
    featured: false,
    excerpt: "And you smiling like I thought no one could smile.",
    coverImage: "",
    content: `On a slow monsoon afternoon  
all i need is  
a little sunshine  
and you smiling like  
I thought no one could smile`
  },
  {
    title: "A Beautiful Chaos",
    slug: "a-beautiful-chaos",
    date: "2025-03-17",
    author: "Akshansh",
    mood: ["INTROSPECTION", "MELANCHOLY"],
    collection: "observations",
    featured: false,
    excerpt: "Heart is obsessed with Chaos.",
    coverImage: "",
    content: `Brain begged for Peace  
Heart is obsessed with Chaos  
Wanted something peaceful  
It's a never ending chaos`
  },
  {
    title: "Dawn to Their Dusk",
    slug: "dawn-to-their-dusk",
    date: "2025-05-22",
    author: "Akshansh",
    mood: ["HOPE", "LOVE"],
    collection: "observations",
    featured: false,
    excerpt: "Be Dawn to their Dusk.",
    coverImage: "",
    content: `Be Calm to their Chaos  
Be Dawn to their Dusk`
  },
  {
    title: "More Than Our Scars",
    slug: "more-than-our-scars",
    date: "2025-07-05",
    author: "Akshansh",
    mood: ["RESILIENCE", "PHILOSOPHY"],
    collection: "observations",
    featured: false,
    excerpt: "Don't let your tragedy define you.",
    coverImage: "",
    content: `"These scars we have, make us who we are."  
"We're not meant to go back and fix them. Don't let your tragedy define you."  
Batman`
  },
  {
    title: "Sleeping Through Life",
    slug: "sleeping-through-life",
    date: "2025-08-14",
    author: "Akshansh",
    mood: ["PHILOSOPHY", "TIME", "INTROSPECTION"],
    collection: "observations",
    featured: false,
    excerpt: "Sleeping through Life. Will wake up on death.",
    coverImage: "",
    content: `Dreams and nightmares  
Having no control over both....  

Sleeping through Life  
Will wake up on death`
  },
  {
    title: "Eye Contact with the Devil",
    slug: "eye-contact-with-the-devil",
    date: "2025-09-18",
    author: "Akshansh",
    mood: ["INTROSPECTION", "MELANCHOLY"],
    collection: "observations",
    featured: false,
    excerpt: "It looks straight into your eyes.",
    coverImage: "",
    content: `When the devil arrives,  
It doesn't look for  
Options or alternatives  

It looks straight  
Into your eyes`
  },
  {
    title: "Before Light",
    slug: "before-light",
    date: "2025-10-02",
    author: "Akshansh",
    mood: ["PHILOSOPHY", "HOPE"],
    collection: "observations",
    featured: false,
    excerpt: "darkness came before light.",
    coverImage: "",
    content: `Remember before we even existed,  
darkness came before light,  
blindness existed before sight,`
  },
  {
    title: "Blessed",
    slug: "blessed",
    date: "2025-11-23",
    author: "Akshansh",
    mood: ["HOPE", "PHILOSOPHY"],
    collection: "observations",
    featured: false,
    excerpt: "That beat you feel. It means you're blessed.",
    coverImage: "",
    content: `Put your hand  
Upon your chest  
That beat you feel  
It means you're blessed`
  },
  {
    title: "My Favourite Song",
    slug: "my-favourite-song",
    date: "2025-12-18",
    author: "Akshansh",
    mood: ["LOVE", "MEMORY", "NOSTALGIA"],
    collection: "winter",
    featured: false,
    excerpt: "I secretly hope that it always reminds you of me.",
    coverImage: "",
    content: `If I tell you about my favourite song,  
I secretly hope that it always reminds you of me,  
from that moment to forever.`
  },
  {
    title: "December Doesn't Feel So Cold Anymore",
    slug: "december-doesnt-feel-so-cold-anymore",
    date: "2025-12-28",
    author: "Akshansh",
    mood: ["LOVE", "WARMTH", "HOPE"],
    collection: "winter",
    featured: false,
    excerpt: "And suddenly December doesn't feel so cold anymore.",
    coverImage: "",
    content: `Sometimes  
you come across  

Like sunlight on a winter day  

Like grass breathing under snow  

Like a blanket tucked right  

And suddenly  
December doesn't feel so cold anymore.`
  },
  {
    title: "The Reversed Hourglass",
    slug: "the-reversed-hourglass",
    date: "2026-01-02",
    author: "Akshansh",
    mood: ["LOVE", "TIME", "DEVOTION"],
    collection: "small-eternities",
    featured: false,
    excerpt: "I want the hourglass to reverse.",
    coverImage: "",
    content: `I want seconds to turn into hours,  
Days into years,  
Years into a lifetime.  

I want the hourglass to reverse,  
Everyday. Everynight. Everytime  
spent by your side.`
  },
  {
    title: "Every Sunrise",
    slug: "every-sunrise",
    date: "2026-01-05",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "HOPE"],
    collection: "winter",
    featured: false,
    excerpt: "I want you in the moonlight as much as I want you every sunrise.",
    coverImage: "",
    content: `What a privilege it is  
To lose myself in your eyes.  
I want you in the moonlight as much  
As I want you every sunrise.`
  },
  {
    title: "Vulnerable",
    slug: "vulnerable",
    date: "2026-01-19",
    author: "Akshansh",
    mood: ["INSOMNIA", "SOLITUDE", "CATHARSIS"],
    collection: "nocturne",
    featured: false,
    excerpt: "Through my poetry I stand vulnerable.",
    coverImage: "",
    content: `I live more by night......  

The world leaves me alone  
Let me be my own  

Through my poetry I stand  
Vulnerable`
  },
  {
    title: "Something's Changed",
    slug: "somethings-changed",
    date: "2026-02-21",
    author: "Akshansh",
    mood: ["INTROSPECTION", "MELANCHOLY", "TIME"],
    collection: "nocturne",
    featured: false,
    excerpt: "the flow of time is not the same",
    coverImage: "",
    content: `Something's changed.  

the flow of time,  
is not the same,  

sometimes I sit  
and the day passes me by,  

and sometimes  
even seconds slowly drift  
in front my eyes  

Something's changed.  

the sky is not the same,  

sometimes it ceases  
to exist for me.  

sometime it's deep  
matching the shade of me.`
  },
  {
    title: "Us",
    slug: "us",
    date: "2026-03-31",
    author: "Akshansh",
    mood: ["LOVE", "DEVOTION", "HOPE"],
    collection: "small-eternities",
    featured: false,
    excerpt: "That is all I can ask from a promise of forever.",
    coverImage: "",
    content: `I want us to be us  
While me being me  
And you being you  

So will you spend time with me?  
Because that is all I can ask  
From a promise of forever`
  },
  {
    title: "Solitude's Retreat",
    slug: "solitudes-retreat",
    date: "2026-05-07",
    author: "Akshansh",
    mood: ["SOLITUDE", "CATHARSIS"],
    collection: "nocturne",
    featured: false,
    excerpt: "in quietude peace will find me",
    coverImage: "",
    content: `emptiness embraced me  
on my journey  
to solitude's retreat  

in quietude  
peace will find me  
and rest  
in its eternal seat`
  },
  {
    title: "The Night",
    slug: "the-night",
    date: "2026-05-20",
    author: "Akshansh",
    mood: ["LONGING", "WONDER", "ABSENCE"],
    collection: "constellations",
    featured: false,
    excerpt: "I was too fond of her, and became the night.",
    coverImage: "",
    content: `she was fond of the sky,  
so she became a star.  

I was too fond of her,  
and became the night.`
  },
  {
    title: "The Lighthouse",
    slug: "the-lighthouse",
    date: "2026-06-01",
    author: "Akshansh",
    mood: ["SOLITUDE", "INSOMNIA", "CATHARSIS"],
    collection: "nocturne",
    featured: true,
    excerpt: "Tonight I'm the lighthouse: at the edge, alone, and burning.",
    coverImage: "",
    content: `Some days I'm the ocean.  
Some days I'm the ship.  

Tonight I'm the lighthouse:  
at the edge,  
alone,  
and burning.`
  },
  {
    slug: "among-the-stars",
    title: "Among the Stars",
    author: "Sahaj",
    excerpt: "The stars don't shine by chance alone,",
    content: `The stars don't shine by chance alone,

They burn through darkness on their own.

Like every dream within your heart,

Great galaxies begin with a spark.`,
    mood: ["WONDER", "HOPE"],
    collection: "constellations",
    date: "2026-06-04",
    featured: false,
    coverImage: "",
    isSubmission: true
  }
];

export const getFeaturedPoem = () => poems.find(p => p.featured) || poems[0];
export const getAllPoems = () => poems;
export const getPoemBySlug = (slug: string) => poems.find(p => p.slug === slug) || null;
export const getPoemsByCollection = (collection: string) => poems.filter(p => p.collection === collection);
export const getCollections = () => collections;
export const getCollectionBySlug = (slug: string) => collections.find(c => c.slug === slug) || null;

