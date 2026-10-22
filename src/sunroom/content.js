import original from "../data.json";

export const picture = (name) => `/images/sunroom/${name}.webp`;
export const destinations = [
  {
    slug: "kerala",
    name: "Kerala",
    country: "India",
    region: "india",
    image: "/images/kerala.webp",
    mood: "Slow escapes",
    line: "A slower pace, a deeper you.",
    description:
      "Backwater mornings, tea-scented hills, and little moments that ask nothing of you. Let Kerala set a gentler rhythm.",
    experiences: [
      "Drift along the backwaters",
      "Walk through green hill country",
      "Make time for a coastal pause",
    ],
    note: "Life moves a little softer here.",
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "international",
    image: picture("bali"),
    mood: "Nature & culture",
    line: "Green horizons. Golden little moments.",
    description:
      "Follow the paths between rice terraces, find a quiet temple courtyard, and leave a little time for the ocean. This is Bali, at your own pace.",
    experiences: [
      "Wander the terraces of Ubud",
      "Discover the island’s cultural side",
      "Slow down by the sea",
    ],
    note: "Different horizons. Same beautiful you.",
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "international",
    image: picture("maldives"),
    mood: "Beaches & islands",
    line: "Clearer waters, brighter days.",
    description:
      "Bare feet, blue horizons, and nowhere you need to rush. Make room for a few beautifully unhurried days in the Maldives.",
    experiences: [
      "Wake up beside the lagoon",
      "Spend a day on the water",
      "Find your favourite sunset spot",
    ],
    note: "Some days are made for doing less.",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    region: "international",
    image: picture("switzerland"),
    mood: "Mountains & nature",
    line: "Take the long, scenic way.",
    description:
      "Alpine air, lakeside villages, and the kind of views that make you pause mid-sentence. Find your own little corner of Switzerland.",
    experiences: [
      "Take a scenic journey through the Alps",
      "Pause in a lakeside village",
      "Follow a trail into mountain air",
    ],
    note: "The view is part of the journey.",
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "international",
    image: picture("santorini"),
    mood: "Beaches & islands",
    line: "A little blue. A little beautiful.",
    description:
      "Whitewashed lanes, sea-blue horizons, and long lunches with nowhere else to be. Discover a slower side of the Greek islands.",
    experiences: [
      "Wander the whitewashed lanes",
      "Find a quiet sea view",
      "Linger a little longer over dinner",
    ],
    note: "Let the day unfold.",
  },
  {
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    region: "international",
    image: picture("thailand"),
    mood: "Beaches & islands",
    line: "Slower days. Brighter you.",
    description:
      "Island mornings, limestone coastlines, and plenty of little discoveries along the way. Make your Thailand journey as lively or as laid-back as you like.",
    experiences: [
      "Explore the limestone coastline",
      "Find an island escape",
      "Make room for local flavours",
    ],
    note: "A brighter kind of everyday.",
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    region: "india",
    image: picture("kashmir"),
    mood: "Mountains & nature",
    line: "Where the mountains breathe.",
    description:
      "A quiet shikara ride, a mountain morning, a conversation over a warm cup. Kashmir is full of moments you’ll want to hold on to.",
    experiences: [
      "Slow down on Dal Lake",
      "Head into the mountain valleys",
      "Share a warm cup and a local story",
    ],
    note: "A little closer to wonder.",
  },
  {
    slug: "goa",
    name: "Goa",
    country: "India",
    region: "india",
    image: "/images/goa.webp",
    mood: "Beaches & islands",
    line: "Sun, sea, and slower days.",
    description:
      "Beach walks, colourful lanes, and a little more time for the things you love. There’s a Goa for every kind of getaway.",
    experiences: [
      "Find your stretch of coastline",
      "Explore the quieter lanes",
      "Let the evening find its own rhythm",
    ],
    note: "Leave room for a little sunshine.",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "india",
    image: "/images/rajasthan.webp",
    mood: "Nature & culture",
    line: "Stories in every shade.",
    description:
      "Palace courtyards, old-city lanes, and desert skies. Travel through Rajasthan with time to notice the details.",
    experiences: [
      "Discover the old cities",
      "Take in the palace architecture",
      "Find a moment under the desert sky",
    ],
    note: "Some stories stay with you.",
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    country: "India",
    region: "india",
    image: "/images/trekking.webp",
    mood: "Mountains & nature",
    line: "A little higher. A little happier.",
    description:
      "Pine-scented air, winding roads, and mountain towns with stories to share. Let the Himalayas change your perspective.",
    experiences: [
      "Walk into mountain air",
      "Pause in a hill town",
      "Take the road with the better view",
    ],
    note: "The mountains are calling softly.",
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    country: "India",
    region: "india",
    image: "/images/trekking.webp",
    mood: "Mountains & nature",
    line: "Follow your sense of wonder.",
    description:
      "A journey through hill country, riverside pauses, and moments that bring you a little closer to the outdoors.",
    experiences: [
      "Follow a mountain trail",
      "Pause beside the river",
      "Explore at your own pace",
    ],
    note: "Take a breath. Take it in.",
  },
];
export const moods = [
  "Beaches & islands",
  "Mountains & nature",
  "Nature & culture",
  "Time together",
];
export const sourceJourneys = original.trips.map((t) => ({
  ...t,
  slug: t.id,
  region: "india",
  image:
    destinations.find((d) => d.name === t.destination)?.image ||
    "/images/trekking.webp",
  mood:
    destinations.find((d) => d.name === t.destination)?.mood ||
    "Mountains & nature",
  kind: "A Skyna journey",
  summary: t.overview,
  bespoke: false,
}));
export const bespokeJourneys = destinations
  .filter((d) => d.region === "international")
  .map((d) => ({
    slug: `${d.slug}-at-your-pace`,
    title: `${d.name}, at your pace`,
    destination: d.name,
    region: d.region,
    image: d.image,
    mood: d.mood,
    kind: "A tailor-made escape",
    summary: d.description,
    bespoke: true,
    itinerary: d.experiences.map((description, i) => ({
      heading: [
        "Arrive & settle in",
        "Explore a little deeper",
        "Follow your own rhythm",
      ][i],
      description,
    })),
    facts: [],
    price: null,
  }));
export const journeys = [...bespokeJourneys, ...sourceJourneys];
export const testimonials = original.testimonials;
export const money = (n) => `₹${n.toLocaleString("en-IN")}`;
