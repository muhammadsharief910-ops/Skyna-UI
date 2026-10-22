import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  Search,
  X,
  Check,
  ChevronDown,
  Plus,
  Minus,
  Star,
  Mail,
  Phone,
  Leaf,
  Compass,
} from "lucide-react";
import {
  destinations,
  journeys,
  moods,
  testimonials,
  picture,
  money,
} from "./content";
import {
  NavigationContext,
  useNavigation,
  Link,
  Logo,
  Button,
  Header,
  Footer,
  ArrowDoodle,
  Sprig,
  Stamp,
  SearchBar,
  DestinationCard,
  JourneyCard,
  MoodIcon,
  PageIntro,
  SoftCTA,
} from "./ui";
import useMotion from "./useMotion";
import useSmoothScroll from "./useSmoothScroll";
import { flushSync } from "react-dom";
import { AnimatedGrid, PlanSnapshot, DestinationTransition } from "./LivingUI";
import { FlightPath, HomeEdgeAccents, SouvenirCard } from "./HomeDetails";
import DiscoveryBalloon from "./DiscoveryBalloon";
import ExperienceKite, { ExperienceKiteCord } from "./ExperienceKite";
import "./sunroom.css";

function readLocation() {
  return {
    pathname: window.location.pathname.replace(/\/$/, "") || "/",
    search: window.location.search,
    hash: window.location.hash,
  };
}
function Home() {
  return (
    <>
      <section className="sr-hero" aria-labelledby="sr-hero-title">
        <div className="sr-room" />
        <div className="sr-leaf-shadow" aria-hidden="true">
          <div className="sr-shadow-breeze" />
        </div>
        <div className="sr-sunbeam" aria-hidden="true" />
        <Sprig className="sr-branch-top" />
        <Sprig className="sr-branch-right" />
        <div className="sr-hero-copy">
          <p className="sr-eyebrow">TRAVEL BRINGS YOU</p>
          <h1 id="sr-hero-title">
            A little closer
            <br />
            to feeling alive.
          </h1>
          <p className="sr-hero-subtitle">
            Extraordinary places, meaningful experiences
            <br className="sr-desktop-break" /> in India and around the world.
          </p>
          <Button to="/2/destinations">Find my escape</Button>
        </div>
        <div className="sr-handwritten sr-hero-message" aria-hidden="true">
          Different
          <br />
          <span>horizons.</span>
          <br />
          <span>Same you.</span>
          <i />
        </div>
        <div className="sr-arch sr-arch-bali">
          <div className="sr-arch-depth" data-depth="0.65">
            <div className="sr-scene-arrival" data-arrival="bali">
              <img
                src={picture("bali")}
                fetchPriority="high"
                alt="A traveler in a flowing orange dress walking through the sunlit rice terraces of Bali"
              />
            </div>
          </div>
        </div>
        <div className="sr-arch sr-arch-santorini">
          <div className="sr-arch-depth" data-depth="0.4">
            <div className="sr-scene-arrival" data-arrival="santorini">
              <img
                src={picture("santorini")}
                alt="The blue domes and whitewashed architecture of Santorini"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className="sr-photo-label sr-bali-label" aria-hidden="true">
          Bali
          <ArrowDoodle />
        </div>
        <div className="sr-photo-label sr-santorini-label" aria-hidden="true">
          Santorini
          <ArrowDoodle />
        </div>
        <div className="sr-kashmir-print">
          <div className="sr-print-arrival" data-arrival="print">
            <Link
              to="/2/destinations/kashmir"
              className="sr-print-inner"
              data-depth="0.8"
              aria-label="Discover Kashmir"
            >
              <div className="sr-scene-arrival">
                <img
                  src={picture("kashmir")}
                  alt="A shikara on a peaceful Kashmir lake, beneath the Himalayas"
                />
              </div>
              <span>A little closer to wonder.</span>
            </Link>
          </div>
        </div>
        <div className="sr-photo-label sr-kashmir-label" aria-hidden="true">
          Kashmir
          <ArrowDoodle />
        </div>
        <div className="sr-hero-stamp">
          <Stamp />
        </div>
        <div className="sr-ledge" aria-hidden="true" />
        <div className="sr-scroll-invitation" aria-hidden="true">
          <span>Wander a little</span>
          <i />
        </div>
      </section>
      <div className="sr-home-search">
        <SearchBar />
      </div>
      <section
        className="sr-home-destination-scene"
        aria-labelledby="sr-places-title"
      >
        <HomeEdgeAccents />
        <div className="sr-home-destinations sr-container">
        <Sprig className="sr-destinations-sprig sr-floating-sprig" />
        <div className="sr-section-heading" data-reveal>
          <h2 id="sr-places-title">
            Places to slow down.
            <br />
            And open up.
          </h2>
          <p>
            From timeless traditions to new horizons,
            <br />
            handpicked destinations for a more meaningful way to travel.
          </p>
        </div>
        <FlightPath />
        <div className="sr-destination-grid" data-stagger>
          {destinations.slice(0, 4).map((d) => (
            <SouvenirCard key={d.slug} destination={d} />
          ))}
        </div>
        <div className="sr-collection-link">
          <span>Near, far, and wonderfully you.</span>
          <Link to="/2/destinations">
            Explore all destinations <ArrowUpRight size={16} />
          </Link>
        </div>
        </div>
      </section>
      <section
        className="sr-home-experiences"
        aria-labelledby="sr-experiences-title"
      >
        <div className="sr-experience-copy" data-reveal>
          <p className="sr-eyebrow">EXPERIENCES</p>
          <h2 id="sr-experiences-title">
            Your pace.
            <br />
            Your kind of place.
          </h2>
          <p>
            Be it sunlit shores, misty mountains or
            <br className="sr-desktop-break" /> vibrant cultures — craft a
            journey that
            <br className="sr-desktop-break" /> feels like you.
          </p>
        </div>
        <Link
          to="/2/destinations/thailand"
          className="sr-experience-panorama"
          data-image-drift
          aria-label="Explore Thailand"
        >
          <img
            src={picture("thailand")}
            alt="Longtail boats on a turquoise beach in Thailand"
            loading="lazy"
          />
        </Link>
        <Sprig className="sr-experience-sprig sr-floating-sprig" />
        <div className="sr-paper-note" aria-hidden="true">
          <span>Thailand</span>
          <p>
            Slower days.
            <br />
            Brighter you.
          </p>
          <Leaf size={45} strokeWidth={0.7} />
        </div>
        <div className="sr-experience-links">
          {moods.slice(0, 3).map((m) => (
            <Link to={`/2/journeys?mood=${encodeURIComponent(m)}`} key={m}>
              <MoodIcon mood={m} size={30} />
              <span>{m === "Nature & culture" ? "Culture & heritage" : m}</span>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function DestinationsPage() {
  const { location, collectionMemory } = useNavigation();
  const params = new URLSearchParams(location.search);
  const memoryKey = window.history.state?.srKey;
  const saved = collectionMemory.current.get(memoryKey);
  const [region, setRegion] = useState(
    saved?.region || params.get("region") || "all",
  );
  const [query, setQuery] = useState(saved?.query || "");
  const [mood, setMood] = useState(saved?.mood || "");
  useEffect(() => {
    collectionMemory.current.set(memoryKey, { region, query, mood });
  }, [region, query, mood, memoryKey, collectionMemory]);
  const shown = destinations.filter(
    (d) =>
      (region === "all" || d.region === region) &&
      (!mood || d.mood === mood) &&
      (d.name + " " + d.country).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="sr-container sr-collection-page">
        <div className="sr-discover-intro">
        <PageIntro
          eyebrow="NEAR, FAR & WONDERFULLY YOU"
          title={
            <>
              Where does your
              <br />
              <em>heart wander?</em>
            </>
          }
        >
          A green horizon. A little island. A city with a story.
          <br />
          Find a place that feels like the beginning of something.
        </PageIntro>
        <DiscoveryBalloon />
        </div>
        <div className="sr-browse-toolbar">
          <div className="sr-tabs" role="group" aria-label="Destination region">
            {[
              ["all", "Everywhere"],
              ["india", "India"],
              ["international", "International"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={region === value}
                className={region === value ? "is-active" : ""}
                onClick={() => setRegion(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="sr-search-input">
            <Search size={17} />
            <input
              aria-label="Search destinations"
              placeholder="Somewhere in mind?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label="Clear destination search"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
        <div className="sr-filter-line">
          <label>
            Go by feeling{" "}
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              aria-label="Filter destinations by travel mood"
            >
              <option value="">A little of everything</option>
              {moods.slice(0, 3).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <span aria-live="polite">{shown.length} places to fall for</span>
        </div>
        <AnimatedGrid
          className="sr-collection-grid"
          signature={shown.map((d) => d.slug).join(",")}
        >
          {shown.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </AnimatedGrid>
        {!shown.length && (
          <EmptyState
            title="Somewhere a little different?"
            onClear={() => {
              setRegion("all");
              setQuery("");
              setMood("");
            }}
          />
        )}
      </section>
      <SoftCTA />
    </>
  );
}
function EmptyState({ title, onClear }) {
  return (
    <div className="sr-empty">
      <Compass size={38} strokeWidth={1} />
      <h3>{title}</h3>
      <p>Tell us what you’re dreaming of. We’ll help you find your way.</p>
      <Button to="/2/plan">Create my journey</Button>
      {onClear && (
        <button className="sr-text-link" onClick={onClear}>
          Show me everything <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

function DestinationPage({ slug }) {
  const d = destinations.find((d) => d.slug === slug);
  if (!d) return <NotFound />;
  const related = journeys.filter((j) => j.destination === d.name);
  return (
    <>
      <section className="sr-container sr-destination-story">
        <div className="sr-destination-story-copy" data-reveal>
          <Link className="sr-back-link" to="/2/destinations">
            <ArrowLeft size={14} />
            All the places we love
          </Link>
          <p className="sr-eyebrow">
            {d.country} ·{" "}
            {d.region === "india" ? "A LITTLE CLOSER TO HOME" : "A WORLD AWAY"}
          </p>
          <h1>
            A little closer
            <br />
            to <em>{d.name}.</em>
          </h1>
          <p className="sr-destination-lead">{d.description}</p>
          <div className="sr-destination-mood">
            <MoodIcon mood={d.mood} />
            <span>{d.mood}</span>
          </div>
          <Button to={`/2/plan?destination=${d.slug}`}>Take me there</Button>
          <span className="sr-handwritten sr-destination-note">{d.note}</span>
        </div>
        <div className="sr-destination-story-image">
          <img src={d.image} alt={`${d.name}, ${d.country}`} />
        </div>
      </section>
      <section className="sr-quiet-section">
        <div className="sr-container">
          <p className="sr-eyebrow" data-reveal>
            A FEW LITTLE POSSIBILITIES
          </p>
          <h2 data-reveal>
            Less ticking boxes.
            <br />
            More <em>being there.</em>
          </h2>
          <div className="sr-possibility-grid" data-stagger>
            {d.experiences.map((e, i) => (
              <div key={e}>
                <span>0{i + 1}</span>
                <h3>{e}</h3>
                <p>
                  {
                    [
                      "A little space to arrive, take a breath, and settle into a new rhythm.",
                      "The moments between the landmarks can be the ones you remember most.",
                      "Leave room for a local recommendation, a happy detour, or a slower afternoon.",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sr-container sr-related">
        <div className="sr-section-heading" data-reveal>
          <h2>
            Your next chapter
            <br />
            in {d.name}.
          </h2>
          <p>
            A starting point for your own story.
            <br />
            We’ll shape the details around you.
          </p>
        </div>
        <div className="sr-journey-grid">
          {related.length ? (
            related.map((j) => <JourneyCard journey={j} key={j.slug} />)
          ) : (
            <EmptyState title="Make a little room for your own story." />
          )}
        </div>
      </section>
      <SoftCTA destination={d.slug} title={`Let’s find your ${d.name}.`} />
    </>
  );
}

function JourneysPage() {
  const { location, collectionMemory } = useNavigation();
  const params = new URLSearchParams(location.search);
  const memoryKey = window.history.state?.srKey;
  const saved = collectionMemory.current.get(memoryKey);
  const [place, setPlace] = useState(
    saved?.place ?? params.get("destination") ?? "",
  );
  const [mood, setMood] = useState(saved?.mood ?? params.get("mood") ?? "");
  const [region, setRegion] = useState(saved?.region || "all");
  useEffect(() => {
    collectionMemory.current.set(memoryKey, { place, mood, region });
  }, [place, mood, region, memoryKey, collectionMemory]);
  const when = params.get("when") || "";
  const d = destinations.find((d) => d.slug === place);
  const shown = journeys.filter(
    (j) =>
      (!d || j.destination === d.name) &&
      (!mood || mood === "Time together" || j.mood === mood) &&
      (region === "all" || region === j.region),
  );
  return (
    <>
      <section className="sr-container sr-journeys-page">
        <PageIntro
          eyebrow="GOOD PLACES. THOUGHTFUL LITTLE PLANS."
          title={
            <>
              Your next chapter,
              <br />
              <em>perhaps?</em>
            </>
          }
        >
          Every journey starts with a little curiosity.
          <br />
          These are a few ideas to make your own.
        </PageIntro>
        <div className="sr-browse-toolbar">
          <div className="sr-tabs" role="group" aria-label="Journey region">
            {[
              ["all", "All journeys"],
              ["india", "India"],
              ["international", "International"],
            ].map(([v, l]) => (
              <button
                key={v}
                aria-pressed={region === v}
                className={region === v ? "is-active" : ""}
                onClick={() => setRegion(v)}
              >
                {l}
              </button>
            ))}
          </div>
          <Link to={`/2/plan${location.search}`} className="sr-text-link">
            Create something just for me <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="sr-journey-filters">
          <label>
            Where to?
            <select
              aria-label="Filter journeys by destination"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              <option value="">Anywhere lovely</option>
              {destinations.map((d) => (
                <option value={d.slug} key={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Travel style
            <select
              aria-label="Filter journeys by mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">A little of everything</option>
              {moods.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <span aria-live="polite">
            {shown.length} {shown.length === 1 ? "journey" : "journeys"} to
            discover{when && <small>Preferred: {when}</small>}
          </span>
        </div>
        <AnimatedGrid
          className="sr-journey-grid"
          signature={shown.map((j) => j.slug).join(",")}
        >
          {shown.map((j) => (
            <JourneyCard journey={j} key={j.slug} />
          ))}
        </AnimatedGrid>
        {!shown.length && (
          <EmptyState
            title="A journey all your own?"
            onClear={() => {
              setPlace("");
              setMood("");
              setRegion("all");
            }}
          />
        )}
        <p className="sr-pricing-note">
          A little inspiration, not a fixed departure. We’ll confirm the
          itinerary, stays, and quote around your dates.
        </p>
      </section>
      <SoftCTA />
    </>
  );
}
function JourneyPage({ slug }) {
  const { location } = useNavigation();
  const when = new URLSearchParams(location.search).get("when");
  const j = journeys.find((j) => j.slug === slug);
  const [open, setOpen] = useState(0);
  if (!j) return <NotFound />;
  const d = destinations.find((d) => d.name === j.destination);
  return (
    <>
      <section className="sr-container sr-journey-story">
        <Link to="/2/journeys" className="sr-back-link">
          <ArrowLeft size={14} />
          All our journeys
        </Link>
        <div className="sr-journey-story-heading" data-reveal>
          <div>
            <p className="sr-eyebrow">
              {j.destination} · {j.kind}
            </p>
            <h1>{j.title}</h1>
          </div>
          <span className="sr-handwritten">
            Go a little further.
            <br />
            Feel a little more.
          </span>
        </div>
        <div className="sr-journey-cover" data-image-drift>
          <img src={j.image} alt={`${j.destination} journey`} />
        </div>
        <div className="sr-journey-detail-grid">
          <div>
            <p className="sr-eyebrow">YOUR JOURNEY BEGINS HERE</p>
            <h2>
              A little closer
              <br />
              to <em>{j.destination}.</em>
            </h2>
            <p className="sr-detail-overview">{j.summary}</p>
            <h2 className="sr-itinerary-heading">
              {j.bespoke
                ? "A few lovely possibilities."
                : "The journey, day by day."}
            </h2>
            <p className="sr-itinerary-intro">
              {j.bespoke
                ? "A little inspiration for a trip we’ll shape around you."
                : "A starting point for your plans, with room to make it your own."}
            </p>
            <div className="sr-itinerary">
              {j.itinerary.map((day, i) => (
                <div
                  className={`sr-itinerary-row ${open === i ? "is-open" : ""}`}
                  key={i}
                >
                  <button
                    id={`day-button-${i}`}
                    aria-controls={`day-panel-${i}`}
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span>{day.heading || `Day ${i + 1}`}</span>
                    {open === i ? <Minus size={17} /> : <Plus size={17} />}
                  </button>
                  <div
                    className="sr-itinerary-body"
                    id={`day-panel-${i}`}
                    role="region"
                    aria-labelledby={`day-button-${i}`}
                    aria-hidden={open !== i}
                    inert={open !== i}
                  >
                    <div>
                      <p>{day.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="sr-journey-summary">
            <span className="sr-eyebrow">MAKE IT YOURS</span>
            <h3>
              {j.bespoke
                ? "Your dates. Your pace."
                : `${j.days} days of discovery.`}
            </h3>
            <div>
              <MapPin size={17} />
              {j.destination}
            </div>
            <div>
              <MoodIcon mood={j.mood} size={18} />
              {j.mood}
            </div>
            {j.price && (
              <p className="sr-summary-price">
                <span>Starting from</span>
                <strong>
                  {money(j.price)}
                  <small> / person</small>
                </strong>
              </p>
            )}
            <Button
              to={`/2/plan?destination=${d?.slug || ""}&journey=${j.slug}${when ? `&when=${encodeURIComponent(when)}` : ""}`}
            >
              Plan this journey
            </Button>
            <p>
              We’ll talk through the details and tailor a quote for your dates,
              stays, and travel style.
            </p>
            <a href="tel:+919599387900">
              <Phone size={14} /> +91 95993 87900
            </a>
          </aside>
        </div>
      </section>
      <SoftCTA
        destination={d?.slug}
        title="Your journey. Your little details."
      />
    </>
  );
}

function ExperiencesPage() {
  const cards = [
    {
      name: "Beaches & islands",
      title: "A little less rush.\nA little more blue.",
      image: picture("thailand"),
      copy: "Salt in the air, sand between your toes, and a day that unfolds on its own. From Goa to the Maldives, find your kind of coast.",
    },
    {
      name: "Mountains & nature",
      title: "Change your view.\nFind your breathing room.",
      image: picture("switzerland"),
      copy: "Pine-scented mornings, scenic roads, and a sky that seems a little bigger. Let the mountains give you a new perspective.",
    },
    {
      name: "Nature & culture",
      title: "Follow a story.\nFind a connection.",
      image: picture("bali"),
      copy: "Old lanes, local flavours, and little traditions. Get closer to the places you visit, one curious moment at a time.",
    },
    {
      name: "Time together",
      title: "Somewhere new.\nTogether with you.",
      image: picture("santorini"),
      copy: "A honeymoon, a family escape, or a little time away with your favourite people. Make memories that feel entirely your own.",
    },
  ];
  return (
    <>
      <div className="sr-experiences-scene">
      <section className="sr-container sr-experiences-intro">
        <PageIntro
          eyebrow="DIFFERENT PATHS. THE SAME CURIOSITY."
          title={
            <>
              Your pace.
              <br />
              <em>Your kind of place.</em>
            </>
          }
        >
          Go by feeling. We’ll help you find the places, people,
          <br />
          and little moments that bring it to life.
        </PageIntro>
        <ExperienceKite />
      </section>
      <div className="sr-experience-stories">
        {cards.map((c, i) => (
          <section
            className={`sr-experience-story ${i % 2 ? "sr-experience-reverse" : ""}`}
            key={c.name}
          >
            <div className="sr-container">
              <div className="sr-experience-story-photo" data-image-drift>
                <img src={c.image} alt={c.name} loading="lazy" />
              </div>
              <div className="sr-experience-story-copy" data-reveal>
                <span className="sr-story-chapter" aria-hidden="true">
                  0{i + 1} <i /> 04
                </span>
                <MoodIcon mood={c.name} size={35} />
                <p className="sr-eyebrow">{c.name}</p>
                <h2>
                  {c.title.split("\n").map((line, j) => (
                    <React.Fragment key={line}>
                      {j > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h2>
                <p>{c.copy}</p>
                <Link
                  to={`/2/journeys?mood=${encodeURIComponent(c.name)}`}
                  className="sr-text-link"
                >
                  Find my kind of journey <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
      <ExperienceKiteCord />
      </div>
      <SoftCTA />
    </>
  );
}

function AboutPage() {
  const reviews = [testimonials[1], testimonials[4], testimonials[5]];
  return (
    <>
      <section className="sr-container sr-about-hero">
        <PageIntro
          eyebrow="A LITTLE ABOUT SKYNA"
          title={
            <>
              Travel further.
              <br />
              <em>Come closer.</em>
            </>
          }
        >
          Closer to a place. Closer to the people you’re with.
          <br />
          And a little closer to yourself.
        </PageIntro>
        <div className="sr-about-image" data-image-drift>
          <img
            src="/images/kerala.webp"
            alt="A peaceful morning on the Kerala backwaters"
          />
          <span className="sr-handwritten">
            The little moments
            <br />
            are the whole point.
          </span>
        </div>
      </section>
      <section className="sr-container sr-about-copy">
        <p className="sr-eyebrow" data-reveal>
          THOUGHTFULLY PLANNED. PERSONALLY YOURS.
        </p>
        <h2 data-reveal>
          We take care of the details.
          <br />
          You take in <em>the moment.</em>
        </h2>
        <p data-reveal>
          At Skyna, we believe a great journey has room for you. Your pace, your
          interests, your favourite kind of day. We bring together thoughtful
          itineraries, local knowledge, and support along the way — so you can
          be fully there for the places and people you came to see.
        </p>
        <div className="sr-values-grid" data-stagger>
          {[
            [
              "Made around you",
              "Personalised itineraries, with space for the things that matter to you.",
            ],
            [
              "Closer to a place",
              "Local knowledge that helps you see a little beyond the obvious.",
            ],
            [
              "Care at every step",
              "Thoughtful support, from the first idea to the journey home.",
            ],
          ].map(([t, c], i) => (
            <div key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="sr-review-section">
        <div className="sr-container">
          <p className="sr-eyebrow">LITTLE NOTES FROM REAL TRAVELERS</p>
          <h2>
            Good journeys.
            <br />
            <em>Happy hearts.</em>
          </h2>
          <div className="sr-reviews-grid" data-stagger>
            {reviews.map((r) => (
              <article key={r.name}>
                <div
                  className="sr-review-stars"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }, (_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <blockquote>“{r.text}”</blockquote>
                <div>
                  <span>{r.name[0].toUpperCase()}</span>
                  <p>
                    {r.name}
                    <small>Shared on Google</small>
                  </p>
                  <Check size={14} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SoftCTA title="A little daydream. A great beginning." />
    </>
  );
}

function PlanPage() {
  const { location } = useNavigation();
  const params = new URLSearchParams(location.search);
  const preset = destinations.find((d) => d.slug === params.get("destination"));
  const sourceJourney = journeys.find((j) => j.slug === params.get("journey"));
  const [form, setForm] = useState({
    name: "",
    destination: preset?.slug || "",
    when: params.get("when") || "",
    travelers: "2",
    style: params.get("mood") || "",
    note: "",
  });
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);
  const contentRef = useRef(null);
  const previousStep = useRef(1);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    contentRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    contentRef.current?.querySelector("h1")?.focus({ preventScroll: true });
  }, [step]);
  const destination = destinations.find((d) => d.slug === form.destination);
  const tripName =
    sourceJourney &&
    destination &&
    sourceJourney.destination === destination.name
      ? sourceJourney.title
      : "";
  const months = Array.from({ length: 12 }, (_, i) => {
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth() + i,
      1,
    ).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const message = `Hi Skyna! I’m ${form.name.trim()}. I’d love to plan ${tripName ? "the " + tripName + " journey" : `a trip to ${destination?.name || "somewhere lovely"}`}${form.when ? " in " + form.when : ""} for ${form.travelers} ${form.travelers === "1" ? "traveler" : "travelers"}${form.style ? ", with a " + form.style.toLowerCase() + " travel style" : ""}.${form.note ? "\n\n" + form.note.trim() : ""}\n\nCould you help me shape the details?`;
  return (
    <section className="sr-container sr-plan-page">
      <div className="sr-plan-art">
        <div className="sr-plan-arch" data-image-drift>
          <img
            key={form.destination}
            className="sr-plan-photo"
            src={destination?.image || picture("bali")}
            alt={destination?.name || "Sunlit Bali rice terraces"}
          />
        </div>
        <Sprig className="sr-plan-sprig sr-floating-sprig" />
        <span className="sr-handwritten">
          Your next chapter
          <br />
          starts with a little
          <br />
          daydream.
        </span>
        <PlanSnapshot
          destination={destination?.name}
          when={form.when}
          travelers={form.travelers}
          style={form.style}
        />
        <div className="sr-plan-contact">
          <a href="mailto:info@skyna.in">
            <Mail size={15} />
            info@skyna.in
          </a>
          <a href="tel:+919599387900">
            <Phone size={15} />
            +91 95993 87900
          </a>
        </div>
      </div>
      <div className="sr-plan-content" ref={contentRef}>
        <div className="sr-plan-step">
          <span className={step === 1 ? "is-active" : ""}>
            01 · A LITTLE ABOUT YOU
          </span>
          <i />
          <span className={step === 2 ? "is-active" : ""}>
            02 · YOUR LITTLE PLAN
          </span>
        </div>
        {step === 1 ? (
          <>
            <p className="sr-eyebrow">LET’S MAKE IT PERSONAL</p>
            <h1 tabIndex={-1}>
              A little daydream.
              <br />
              <em>A great beginning.</em>
            </h1>
            <p className="sr-plan-intro">
              Tell us what’s on your mind. We’ll help bring the lovely little
              details together.
            </p>
            {tripName && (
              <p className="sr-selected-trip">
                <Compass size={15} />
                {tripName}
              </p>
            )}
            <form
              className="sr-plan-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.name.trim()) {
                  setTouched(true);
                  return;
                }
                setStep(2);
              }}
            >
              <label>
                Your name
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  autoComplete="given-name"
                  placeholder="What should we call you?"
                  required
                  maxLength={80}
                  aria-invalid={(touched && !form.name.trim()) || undefined}
                />
                {touched && !form.name.trim() && (
                  <span className="sr-field-error" role="alert">
                    Please enter your name.
                  </span>
                )}
              </label>
              <label>
                Where are you dreaming of?
                <select
                  name="destination"
                  value={form.destination}
                  onChange={update}
                >
                  <option value="">Somewhere lovely — help me decide</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="sr-form-row">
                <label>
                  When?
                  <select name="when" value={form.when} onChange={update}>
                    <option value="">I’m beautifully flexible</option>
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Travelers
                  <select
                    name="travelers"
                    value={form.travelers}
                    onChange={update}
                  >
                    {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Your kind of journey
                <select name="style" value={form.style} onChange={update}>
                  <option value="">A little of everything</option>
                  {moods.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <label>
                Any little wishes?
                <textarea
                  name="note"
                  rows={3}
                  value={form.note}
                  onChange={update}
                  placeholder="A honeymoon? A favourite place? A little adventure?"
                  maxLength={1200}
                />
              </label>
              <Button type="submit">Bring my little plan together</Button>
              <p className="sr-form-footnote">
                No fixed plans needed. Just a little curiosity.
              </p>
            </form>
          </>
        ) : (
          <div className="sr-plan-review" aria-live="polite">
            <span className="sr-review-check">
              <Check size={27} />
            </span>
            <p className="sr-eyebrow">A LITTLE CLOSER TO YOUR NEXT CHAPTER</p>
            <h1 tabIndex={-1}>
              Hello, {form.name.trim().split(" ")[0]}.<br />
              <em>Let’s go somewhere.</em>
            </h1>
            <p>
              Here’s the little plan you can share with the Skyna team. We’ll
              take it from here, together.
            </p>
            <dl>
              <div>
                <dt>YOUR SOMEWHERE</dt>
                <dd>{destination?.name || "A little help deciding"}</dd>
              </div>
              <div>
                <dt>YOUR WHEN</dt>
                <dd>{form.when || "Beautifully flexible"}</dd>
              </div>
              <div>
                <dt>YOUR PEOPLE</dt>
                <dd>
                  {form.travelers}{" "}
                  {form.travelers === "1" ? "traveler" : "travelers"}
                </dd>
              </div>
              <div>
                <dt>YOUR PACE</dt>
                <dd>{form.style || "A little of everything"}</dd>
              </div>
            </dl>
            {form.note && (
              <div className="sr-review-wishes">
                <span>A LITTLE WISH</span>
                <p>{form.note}</p>
              </div>
            )}
            <a
              className="sr-button"
              href={`https://wa.me/919599387900?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              Continue on WhatsApp
              <ArrowUpRight size={19} />
            </a>
            <a
              className="sr-plan-email"
              href={`mailto:info@skyna.in?subject=${encodeURIComponent("A little trip idea from " + form.name.trim())}&body=${encodeURIComponent(message)}`}
            >
              Or send your idea by email <Mail size={15} />
            </a>
            <button className="sr-text-link" onClick={() => setStep(1)}>
              <ArrowLeft size={15} />
              Edit my little plan
            </button>
            <p className="sr-form-footnote">
              You’ll review your message before sending it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
function NotFound() {
  return (
    <section className="sr-container sr-not-found">
      <p className="sr-eyebrow">A HAPPY LITTLE DETOUR</p>
      <h1>
        Let’s find your
        <br />
        <em>way back.</em>
      </h1>
      <p>This path hasn’t been mapped yet. There’s plenty more to discover.</p>
      <Button to="/2">Back to somewhere lovely</Button>
    </section>
  );
}

export default function SunroomApp() {
  const root = useRef(null);
  const [location, setLocation] = useState(readLocation);
  const scrollToPosition = useSmoothScroll(location.pathname + location.search);
  const positions = useRef(new Map());
  const historyKey = useRef(window.history.state?.srKey || crypto.randomUUID());
  const collectionMemory = useRef(new Map());
  const [imageTransition, setImageTransition] = useState(null);
  const finishImageTransition = useCallback(() => setImageTransition(null), []);
  const navigate = (to, source) => {
    if (to === window.location.pathname + window.location.search) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const sourceImage = source?.querySelector?.(".sr-destination-photo img");
    const sourceRect = sourceImage?.parentElement.getBoundingClientRect();
    const frame =
      !reduced &&
      sourceImage &&
      sourceImage.complete &&
      sourceImage.naturalWidth &&
      /^\/2\/destinations\/[^/]+$/.test(to)
        ? {
            src: sourceImage.currentSrc,
            left: sourceRect.left,
            top: sourceRect.top,
            width: sourceRect.width,
            height: sourceRect.height,
            naturalWidth: sourceImage.naturalWidth,
            naturalHeight: sourceImage.naturalHeight,
            objectPosition: getComputedStyle(sourceImage).objectPosition,
          }
        : null;
    positions.current.set(historyKey.current, window.scrollY);
    const update = () => {
      historyKey.current = crypto.randomUUID();
      window.history.pushState({ srKey: historyKey.current }, "", to);
      // The destination frame must be measured in the new page's scroll space.
      scrollToPosition(0);
      flushSync(() => {
        setLocation(readLocation());
        setImageTransition(frame);
      });
    };
    update();
  };
  useEffect(() => {
    window.history.replaceState(
      { ...window.history.state, srKey: historyKey.current },
      "",
    );
    const oldRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const listener = () => {
      setImageTransition(null);
      positions.current.set(historyKey.current, window.scrollY);
      historyKey.current = window.history.state?.srKey;
      flushSync(() => setLocation(readLocation()));
      requestAnimationFrame(() =>
        scrollToPosition(positions.current.get(historyKey.current) || 0),
      );
    };
    window.addEventListener("popstate", listener);
    document.body.classList.add("sunroom-mode");
    document.documentElement.classList.add("sr-html");
    return () => {
      window.removeEventListener("popstate", listener);
      document.body.classList.remove("sunroom-mode");
      document.documentElement.classList.remove("sr-html");
      window.history.scrollRestoration = oldRestoration;
    };
  }, []);
  useEffect(() => {
    document.title = "Skyna — A little closer to feeling alive";
  }, [location.pathname]);
  const path = location.pathname;
  const isHome = path === "/2";
  let page;
  if (isHome) page = <Home />;
  else if (path === "/2/destinations") page = <DestinationsPage />;
  else if (path.startsWith("/2/destinations/"))
    page = <DestinationPage slug={path.split("/")[3]} />;
  else if (path === "/2/journeys") page = <JourneysPage />;
  else if (path.startsWith("/2/journeys/"))
    page = <JourneyPage slug={path.split("/")[3]} />;
  else if (path === "/2/experiences") page = <ExperiencesPage />;
  else if (path === "/2/about") page = <AboutPage />;
  else if (path === "/2/plan") page = <PlanPage />;
  else page = <NotFound />;
  const key = path + location.search;
  useMotion(root, key);
  return (
    <NavigationContext.Provider
      value={{ location, navigate, collectionMemory }}
    >
      <div
        ref={root}
        className={`sunroom-app ${isHome ? "sr-is-home" : "sr-inner-page"}`}
      >
        <a className="sr-skip-link" href="#sunroom-main">
          Skip to content
        </a>
        <Header key={`header-${path}`} />
        <main id="sunroom-main" key={`page-${key}`}>
          {page}
        </main>
        <Footer />
        {imageTransition && (
          <DestinationTransition
            frame={imageTransition}
            onDone={finishImageTransition}
          />
        )}
      </div>
    </NavigationContext.Provider>
  );
}
