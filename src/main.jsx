import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  ChevronDown,
  CalendarDays,
  Mountain,
  Menu,
  X,
  Compass,
  Leaf,
  Heart,
  Clock3,
  Check,
  Plus,
  Minus,
  Star,
  SlidersHorizontal,
  Instagram,
} from "lucide-react";
import data from "./data.json";
import "./fonts.css";
import "./styles.css";

const money = (value) => `₹${value.toLocaleString("en-IN")}`;
const image = (name) => `/images/${name}.webp`;
const months = Array.from({ length: 12 }, (_, offset) => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(now.getFullYear(), now.getMonth() + offset, 1));
});
const destinationNotes = {
  Goa: "The coastal soul",
  Kerala: "Nature’s rhythm",
  Rajasthan: "Royal stories",
  Kashmir: "A little closer to wonder",
  "Himachal Pradesh": "Into the mountains",
  Uttarakhand: "Follow the wild",
  "Ooty & Mysore": "Take the scenic route",
};
const destinationImages = {
  Goa: "goa",
  Kerala: "kerala",
  Rajasthan: "rajasthan",
  Kashmir: "kashmir-hero",
  "Himachal Pradesh": "trekking",
  Uttarakhand: "trekking",
  "Ooty & Mysore": "kerala",
};

function Brand({ light = false }) {
  return (
    <a
      href="#home"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Skyna home"
    >
      <svg
        width="58"
        height="35"
        viewBox="0 0 70 42"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 34C17 34 24 7 34 6c10-1 14 23 32 22-15 6-24-9-31-9S18 36 2 34Z"
          fill="currentColor"
        />
        <path
          d="M19 35c10-4 17-11 24-9 7 3 12 12 25 9-13 9-22-2-29-3-6-1-11 3-20 3Z"
          fill="#2B8B9B"
        />
      </svg>
      <span>
        Skyna<span className="brand-dot">.</span>
      </span>
    </a>
  );
}
function MountainSketch({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m1 36 17-7 11-13 8 8L56 3l20 23 9-9 17 15 17 4M29 16l1 12 7-4m19-21-1 17 6-6 8 15M14 36l22-5 9-11 13 14 10 3m9-11 9 10"
        stroke="currentColor"
        strokeWidth=".9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SectionHeading({ eyebrow, title, children, side, id }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {children && <p className="section-copy">{children}</p>}
      </div>
      {side}
    </div>
  );
}
function Modal({ children, label, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="modal-close circle-button"
        onClick={onClose}
        aria-label="Close dialog"
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}
function PlanForm({
  onClose,
  initialDestination = "",
  initialMonth = "",
  initialStyle = "",
}) {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({
    name: "",
    destination: initialDestination,
    month: initialMonth,
    travelers: "2",
    style: initialStyle,
  });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const message = `Hi Skyna! I’m ${form.name}. I’d love to plan a trip to ${form.destination || "India"} for ${form.travelers} travelers${form.month ? ` in ${form.month}` : ""}${form.style ? `, with a ${form.style.toLowerCase()} travel style` : ""}. Could you help me plan it?`;
  return (
    <Modal label="Plan your trip" onClose={onClose}>
      {ready ? (
        <div className="plan-ready">
          <span className="success-icon">
            <Check size={28} />
          </span>
          <p className="eyebrow">A LITTLE CLOSER TO YOUR NEXT ADVENTURE</p>
          <h2>
            Your journey starts
            <br />
            with a hello.
          </h2>
          <p>
            Here’s your trip idea, {form.name}. Share it with the Skyna team to
            start planning together.
          </p>
          <div className="enquiry-summary">
            <span>
              <MapPin size={16} />
              {form.destination || "Somewhere in India"}
            </span>
            <span>
              <CalendarDays size={16} />
              {form.month || "Flexible dates"}
            </span>
            <span>
              <Heart size={16} />
              {form.travelers} travelers{form.style ? ` · ${form.style}` : ""}
            </span>
          </div>
          <a
            className="button button-green"
            href={`https://wa.me/919599387900?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
          >
            Continue on WhatsApp <ArrowUpRight size={18} />
          </a>
          <button className="text-button" onClick={() => setReady(false)}>
            Edit trip details
          </button>
          <p className="form-note">
            Your message is ready to review. Nothing has been sent yet.
          </p>
        </div>
      ) : (
        <>
          <p className="eyebrow">LET’S MAKE IT YOURS</p>
          <h2>
            A little daydream.
            <br />A great beginning.
          </h2>
          <p className="modal-intro">
            Tell us what you have in mind. We’ll help you find your kind of
            somewhere.
          </p>
          <form
            className="plan-form"
            onSubmit={(e) => {
              e.preventDefault();
              setReady(true);
            }}
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="given-name"
                value={form.name}
                onChange={update}
                placeholder="What should we call you?"
                required
                maxLength={80}
              />
            </label>
            <label>
              Where are you dreaming of?
              <select
                name="destination"
                value={form.destination}
                onChange={update}
              >
                <option value="">Help me decide</option>
                {data.destinations.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                When?
                <select name="month" value={form.month} onChange={update}>
                  <option value="">I’m flexible</option>
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
              Your travel style
              <select name="style" value={form.style} onChange={update}>
                <option value="">A little of everything</option>
                {data.styles.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <button className="button button-green" type="submit">
              Let’s plan something lovely <ArrowRight size={18} />
            </button>
            <p className="form-note">
              A conversation, a few ideas, and a trip that feels like you.
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
function TripDetails({ trip, onClose, onPlan }) {
  const [day, setDay] = useState(0);
  return (
    <Modal label={trip.title} onClose={onClose} wide>
      <img
        className="detail-image"
        src={image(trip.image)}
        alt={`${trip.destination} landscape`}
      />
      <div className="detail-content">
        <p className="eyebrow">{trip.destination} · A SKYNA JOURNEY</p>
        <h2>{trip.title}</h2>
        <p className="detail-overview">{trip.overview}</p>
        <div className="detail-facts">
          {trip.facts.slice(0, 4).map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>
        {trip.itinerary.length > 0 && (
          <div className="itinerary">
            <h3>A peek at your journey</h3>
            {trip.itinerary.map((item, i) => (
              <div className="itinerary-item" key={i}>
                <button
                  aria-expanded={day === i}
                  onClick={() => setDay(day === i ? -1 : i)}
                >
                  {item.heading || `Day ${i + 1}`}
                  {day === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                {day === i && <p>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
        <div className="detail-bottom">
          <div>
            <span className="small-label">STARTING FROM</span>
            <strong>
              {money(trip.price)}
              <small> / person</small>
            </strong>
            <p className="form-note">
              Final quote depends on your dates and preferences.
            </p>
          </div>
          <button
            className="button button-green"
            onClick={() => onPlan(trip.destination)}
          >
            Make it my journey <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
function App() {
  const [menu, setMenu] = useState(false),
    [plan, setPlan] = useState(null),
    [trip, setTrip] = useState(null),
    [allDestinations, setAllDestinations] = useState(false),
    [allActivities, setAllActivities] = useState(false);
  const [destination, setDestination] = useState(""),
    [style, setStyle] = useState(""),
    [month, setMonth] = useState(""),
    [filter, setFilter] = useState({ destination: "", style: "" });
  const [reviewIndex, setReviewIndex] = useState(0);
  const journeyRef = useRef(null);
  const reviews = [
    data.testimonials[1],
    data.testimonials[4],
    data.testimonials[5],
    data.testimonials[0],
    data.testimonials[3],
  ];
  const filtered = data.trips.filter(
    (t) =>
      (!filter.destination || t.destination === filter.destination) &&
      (!filter.style || t.styles.includes(filter.style)),
  );
  const openPlan = (d = destination) => {
    setTrip(null);
    setAllDestinations(false);
    setPlan({ destination: typeof d === "string" ? d : "" });
  };
  const browse = (d) => {
    setDestination(d);
    setFilter({ destination: d, style: "" });
    setAllDestinations(false);
    setTimeout(
      () =>
        journeyRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      20,
    );
  };
  const submitSearch = (e) => {
    e.preventDefault();
    setFilter({ destination, style });
    journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const activities = [
    {
      name: "Trekking",
      tag: "HIGHER PERSPECTIVES",
      img: "trekking",
      destination: "Himachal Pradesh",
    },
    {
      name: "Paragliding",
      tag: "A DIFFERENT KIND OF HIGH",
      img: "paragliding",
      destination: "Himachal Pradesh",
    },
    {
      name: "Boating",
      tag: "TAKE THE SLOW WAY",
      img: "kerala",
      destination: "Kerala",
    },
    {
      name: "Desert Safari",
      tag: "FOLLOW THE GOLDEN HOUR",
      img: "rajasthan",
      destination: "Rajasthan",
    },
    {
      name: "Hiking",
      tag: "A LITTLE OFF THE BEATEN PATH",
      img: "trekking",
      destination: "Uttarakhand",
    },
    {
      name: "Cycling",
      tag: "FIND YOUR OWN PACE",
      img: "goa",
      destination: "Goa",
    },
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header" id="home">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#destinations">
              Discover <ChevronDown size={12} />
            </a>
            <a href="#experiences">Experiences</a>
            <a href="#our-story">Our story</a>
          </nav>
          <div className="header-actions">
            <div className="brand-promise">
              <MountainSketch />
              <span>
                INDIA AND BEYOND
                <br />
                CURATED WITH CARE
              </span>
            </div>
            <button
              className="button button-green nav-cta"
              onClick={() => openPlan()}
            >
              Plan a trip <ArrowUpRight size={17} />
            </button>
            <button
              className="menu-button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["Discover", "#destinations"],
              ["Experiences", "#experiences"],
              ["Our story", "#our-story"],
              ["Traveler stories", "#stories"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <button
              className="button button-green"
              onClick={() => {
                setMenu(false);
                openPlan();
              }}
            >
              Plan a trip <ArrowRight size={17} />
            </button>
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero-wrap" aria-labelledby="hero-heading">
          <div className="hero">
            <img
              className="hero-image"
              src={image("kashmir-hero")}
              alt="A shikara on a tranquil Kashmir lake beneath the Himalayan mountains at sunrise"
              fetchPriority="high"
            />
            <div className="hero-shade" />
            <div className="hero-content">
              <div className="hero-topline">
                <span className="little-star">✧</span> A WORLD OF LITTLE WONDERS
              </div>
              <h1 id="hero-heading">
                Somewhere new.
                <br />
                Something <em>you.</em>
              </h1>
              <p>
                Thoughtfully planned journeys.
                <br className="mobile-break" /> Unforgettable little moments.
              </p>
              <a
                className="hero-explore"
                href="#destinations"
                aria-label="Explore destinations"
              >
                <ArrowRight size={26} />
              </a>
            </div>
            <div className="hero-caption">
              <MapPin size={14} />
              <span>
                THE QUIETER SIDE OF KASHMIR
                <br />
                <small>34.0837° N, 74.7973° E</small>
              </span>
            </div>
            <span className="hero-index">
              01 <span>/</span> A NEW PERSPECTIVE
            </span>
          </div>
          <form
            className="discovery-bar"
            onSubmit={submitSearch}
            aria-label="Find your journey"
          >
            <label className="discovery-field">
              <MapPin />
              <span>
                <span className="field-title">Where to?</span>
                <select
                  aria-label="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Destinations, regions or daydreams</option>
                  {data.destinations.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </span>
              <ChevronDown className="field-chevron" size={14} />
            </label>
            <label className="discovery-field">
              <Mountain />
              <span>
                <span className="field-title">Your travel style</span>
                <select
                  aria-label="Travel style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="">A little adventure, a little you</option>
                  {data.styles.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </span>
              <ChevronDown className="field-chevron" size={14} />
            </label>
            <label className="discovery-field discovery-date">
              <CalendarDays />
              <span>
                <span className="field-title">When?</span>
                <select
                  aria-label="Preferred departure"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Beautifully flexible</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </span>
              <ChevronDown className="field-chevron" size={14} />
            </label>
            <button
              className="search-button"
              aria-label="Find journeys"
              type="submit"
            >
              <ArrowRight size={25} />
              <span>Find my journey</span>
            </button>
          </form>
        </section>
        <section
          className="section destinations-section"
          id="destinations"
          aria-labelledby="destinations-heading"
        >
          <SectionHeading
            eyebrow="THE PLACES WE LOVE"
            title="A place for every feeling."
            id="destinations-heading"
            side={
              <div className="destination-aside">
                <div className="handwritten">
                  Different landscapes.
                  <br />
                  Same beautiful you.
                </div>
                <svg viewBox="0 0 130 45" aria-hidden="true">
                  <path d="M1 38c35-35 47 19 83-4 14-9 14-19 32-26" />
                  <path d="m106 8 12-2-4 12" />
                </svg>
                <div className="place-words">
                  MOUNTAINS
                  <br />
                  BEACHES
                  <br />
                  BACKWATERS
                  <br />
                  AND BEYOND
                </div>
              </div>
            }
          />
          <div className="destination-grid">
            {["Goa", "Kerala", "Rajasthan"].map((d, i) => (
              <button
                className={`destination-card destination-${i}`}
                key={d}
                onClick={() => browse(d)}
                aria-label={`Explore ${d} trips`}
              >
                <img
                  src={image(destinationImages[d])}
                  alt={
                    d === "Goa"
                      ? "Palm-fringed coastline in golden light"
                      : d === "Kerala"
                        ? "Traditional Kerala houseboat on the backwaters"
                        : "The pink sandstone arches of Hawa Mahal"
                  }
                  loading="lazy"
                />
                <div className="card-gradient" />
                <div className="destination-title">
                  <span>{d}</span>
                  <small>{destinationNotes[d]}</small>
                  <i />
                </div>
                <div className="destination-bottom">
                  <span>
                    {
                      [
                        "SUN, SEA AND\nSLOWER DAYS",
                        "BACKWATERS,\nBEAUTIFUL LITTLE PAUSES",
                        "PALACES, CULTURE\nAND TIMELESS BEAUTY",
                      ][i]
                    }
                  </span>
                  <span className="circle-button">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="section-footnote">
            <span>From mountain mornings to barefoot evenings.</span>
            <button
              className="text-link"
              onClick={() => setAllDestinations(true)}
            >
              Find your somewhere <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
        <section
          className="section experiences-section"
          id="experiences"
          aria-labelledby="experiences-heading"
        >
          <SectionHeading
            eyebrow="EXPERIENCES FOR CURIOUS SOULS"
            title="Go a little further."
            id="experiences-heading"
            side={
              <div className="side-note">
                BIGGER STORIES.
                <br />
                BRIGHTER PERSPECTIVES.
              </div>
            }
          />
          <div className="experience-grid">
            {activities.slice(0, allActivities ? 6 : 3).map((a) => (
              <button
                className="experience-card"
                key={a.name}
                onClick={() => {
                  setDestination(a.destination);
                  setPlan({ destination: a.destination });
                }}
              >
                <img
                  src={image(a.img)}
                  alt={`${a.name} travel experience`}
                  loading="lazy"
                />
                <div className="card-gradient" />
                <div className="experience-caption">
                  <div>
                    <h3>{a.name}</h3>
                    <span>{a.tag}</span>
                  </div>
                  <span className="circle-button">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="experience-bottom">
            <span>For the stories you’ll tell long after you’re home.</span>
            <button
              className="text-link"
              onClick={() => setAllActivities(!allActivities)}
            >
              {allActivities ? "A little less" : "More ways to wander"}
              {allActivities ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          </div>
          <div className="care-strip">
            <div>
              <span className="care-icon">
                <Leaf />
              </span>
              <div>
                <h3>Made around you</h3>
                <p>Personalised itineraries for what matters most.</p>
              </div>
            </div>
            <div>
              <span className="care-icon">
                <Compass />
              </span>
              <div>
                <h3>Local knowledge</h3>
                <p>Real people. A deeper connection to a place.</p>
              </div>
            </div>
            <div>
              <span className="care-icon">
                <Heart />
              </span>
              <div>
                <h3>Care at every step</h3>
                <p>Thoughtful support, wherever you go.</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="journeys-section"
          id="journeys"
          ref={journeyRef}
          aria-labelledby="journeys-heading"
        >
          <div className="section">
            <SectionHeading
              eyebrow="GOOD PLACES. GREAT LITTLE PLANS."
              title="Your next chapter, perhaps?"
              id="journeys-heading"
              side={
                <p className="journey-intro">
                  A few of our favourite journeys.
                  <br />
                  Each one, a starting point for yours.
                </p>
              }
            />
            <div className="journey-toolbar">
              <div
                className="filter-tabs"
                role="group"
                aria-label="Filter journeys by destination"
              >
                {["", "Goa", "Kerala", "Kashmir", "Rajasthan"].map((d) => (
                  <button
                    className={filter.destination === d ? "active" : ""}
                    aria-pressed={filter.destination === d}
                    key={d}
                    onClick={() => {
                      setFilter({ ...filter, destination: d });
                      setDestination(d);
                    }}
                  >
                    {d || "All journeys"}
                  </button>
                ))}
              </div>
              <span className="journey-count">
                {filtered.length}{" "}
                {filtered.length === 1 ? "journey" : "journeys"} to fall for
              </span>
            </div>
            {(filter.style ||
              !["", "Goa", "Kerala", "Kashmir", "Rajasthan"].includes(
                filter.destination,
              ) ||
              month) && (
              <div className="filter-summary">
                <SlidersHorizontal size={14} />
                <span>
                  {[
                    filter.destination,
                    filter.style,
                    month && `Preferred: ${month}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <button
                  onClick={() => {
                    setFilter({ destination: "", style: "" });
                    setDestination("");
                    setStyle("");
                    setMonth("");
                  }}
                >
                  Clear filters <X size={13} />
                </button>
              </div>
            )}
            <div className="trip-grid">
              {filtered.map((t) => (
                <article className="trip-card" key={t.id}>
                  <button
                    className="trip-photo"
                    onClick={() => setTrip(t)}
                    aria-label={`View ${t.title}`}
                  >
                    <img
                      src={image(t.image)}
                      alt={`${t.destination} travel landscape`}
                      loading="lazy"
                    />
                    <span className="trip-location">
                      <MapPin size={12} />
                      {t.destination}
                    </span>
                    {t.featured && (
                      <span className="curated-badge">SKYNA PICK</span>
                    )}
                  </button>
                  <div className="trip-info">
                    <div className="trip-duration">
                      <Clock3 size={13} />
                      {t.days} days of discovery
                    </div>
                    <button className="trip-title" onClick={() => setTrip(t)}>
                      <h3>{t.title}</h3>
                    </button>
                    <div className="trip-bottom">
                      <div>
                        <span className="from-label">FROM</span>
                        <strong>{money(t.price)}</strong>
                        <span className="per-person"> / person</span>
                      </div>
                      <button
                        className="circle-button"
                        onClick={() => setTrip(t)}
                        aria-label={`Details for ${t.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <MountainSketch />
                <h3>A different kind of adventure?</h3>
                <p>
                  We can shape a trip around your plans. Tell us what you’re
                  dreaming of.
                </p>
                <button
                  className="button button-green"
                  onClick={() => openPlan()}
                >
                  Create my journey <ArrowRight size={18} />
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setFilter({ destination: "", style: "" });
                    setStyle("");
                    setDestination("");
                  }}
                >
                  See all journeys
                </button>
              </div>
            )}
            <p className="price-note">
              A little inspiration to get you started. Prices vary with dates,
              stays, and your personal itinerary.
            </p>
          </div>
        </section>
        <section
          className="section story-section"
          id="our-story"
          aria-labelledby="story-heading"
        >
          <div className="story-image">
            <img
              src={image("kerala")}
              alt="A peaceful morning on the Kerala backwaters"
              loading="lazy"
            />
            <div className="story-image-caption">
              LESS RUSH.
              <br />
              MORE REMEMBER.
            </div>
            <span className="story-stamp">
              TAKE THE
              <br />
              <em>scenic</em>
              <br />
              ROUTE <ArrowUpRight size={18} />
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2 id="story-heading">
              It’s the little things
              <br />
              that take you
              <br />
              <em>somewhere.</em>
            </h2>
            <p>
              The unplanned stop. The local recommendation. The moment you put
              your phone away and just look.
            </p>
            <p>
              At Skyna, we bring the details together so you can be there for it
              all. Thoughtfully planned holidays, shaped around the way you love
              to travel.
            </p>
            <button className="text-link" onClick={() => openPlan()}>
              Let’s find your kind of journey <ArrowUpRight size={18} />
            </button>
            <div className="story-signoff">
              <MountainSketch />
              <span>
                With a little wonder,
                <br />
                <em>The Skyna team</em>
              </span>
            </div>
          </div>
        </section>
        <section
          className="testimonials-section"
          id="stories"
          aria-labelledby="stories-heading"
        >
          <div className="section">
            <SectionHeading
              eyebrow="THE BEST SOUVENIRS ARE STORIES"
              title="Good trips. Happy hearts."
              id="stories-heading"
              side={
                <div className="review-controls">
                  <button
                    className="circle-button"
                    aria-label="Previous traveler stories"
                    onClick={() =>
                      setReviewIndex(
                        (reviewIndex - 1 + reviews.length) % reviews.length,
                      )
                    }
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="circle-button"
                    aria-label="Next traveler stories"
                    onClick={() =>
                      setReviewIndex((reviewIndex + 1) % reviews.length)
                    }
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              }
            />
            <div className="review-grid" aria-live="polite">
              {[0, 1, 2].map((offset) => {
                const review = reviews[(reviewIndex + offset) % reviews.length];
                return (
                  <article className="review-card" key={review.name}>
                    <div className="review-card-top">
                      <div
                        className="stars"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={i < review.rating ? "currentColor" : "none"}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span className="google-g" aria-label="Google review">
                        G
                      </span>
                    </div>
                    <blockquote>“{review.text}”</blockquote>
                    <div className="review-author">
                      <span className="avatar">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                      <div>
                        <strong>{review.name}</strong>
                        <span>A SKYNA TRAVELER</span>
                      </div>
                      <Check size={14} />
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="review-note">
              Little notes from real travelers. Reviews shared on Google.
            </p>
          </div>
        </section>
        <section className="section closing-section">
          <div className="closing-copy">
            <p className="eyebrow">THERE’S A WHOLE WORLD WAITING</p>
            <h2>
              Go on.
              <br />
              Make a little <em>room for wonder.</em>
            </h2>
            <button className="button button-orange" onClick={() => openPlan()}>
              Let’s plan your next chapter <ArrowUpRight size={19} />
            </button>
          </div>
          <MountainSketch className="closing-mountains" />
          <div className="closing-note">
            The best part?
            <br />
            <span>It starts with you.</span>
            <svg viewBox="0 0 100 65" fill="none" aria-hidden="true">
              <path
                d="M90 4C36 6 7 33 16 57m-8-8 8 10 7-11"
                stroke="currentColor"
                strokeDasharray="3 4"
              />
            </svg>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="section footer-main">
          <div className="footer-brand">
            <Brand light />
            <p>
              Thoughtful journeys.
              <br />
              Extraordinary little moments.
            </p>
            <a
              className="social-link"
              href="https://www.instagram.com/skyna.in/"
              target="_blank"
              rel="noreferrer"
              aria-label="Skyna on Instagram"
            >
              <Instagram size={18} />
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-links">
            <span className="eyebrow">FIND YOUR SOMEWHERE</span>
            {["Goa", "Kerala", "Kashmir", "Himachal Pradesh"].map((d) => (
              <button key={d} onClick={() => browse(d)}>
                {d}
              </button>
            ))}
          </div>
          <div className="footer-links">
            <span className="eyebrow">A LITTLE MORE SKYNA</span>
            <a href="#experiences">Experiences</a>
            <a href="#journeys">Our journeys</a>
            <a href="#our-story">Our story</a>
            <a href="#stories">Traveler stories</a>
          </div>
          <div className="footer-contact">
            <span className="eyebrow">LET’S TALK DAYDREAMS</span>
            <a href="mailto:info@skyna.in">
              info@skyna.in <ArrowUpRight size={16} />
            </a>
            <a href="tel:+919599387900">+91 95993 87900</a>
            <p>
              Your next adventure is a<br />
              conversation away.
            </p>
          </div>
        </div>
        <div className="footer-bottom section">
          <span>
            © {new Date().getFullYear()} Skyna. Made for the way you wander.
          </span>
          <span>
            INDIA, WITH A LITTLE EXTRA HEART <Heart size={12} />
          </span>
        </div>
      </footer>
      {allDestinations && (
        <Modal
          label="Explore all destinations"
          onClose={() => setAllDestinations(false)}
          wide
        >
          <div className="all-destinations">
            <p className="eyebrow">SEVEN WAYS TO FALL IN LOVE WITH INDIA</p>
            <h2>Where does your heart go?</h2>
            <div className="all-destination-grid">
              {data.destinations.map((d) => (
                <button key={d} onClick={() => browse(d)}>
                  <img
                    src={image(destinationImages[d])}
                    alt={`${d} landscape`}
                  />
                  <div>
                    <strong>{d}</strong>
                    <span>{destinationNotes[d]}</span>
                  </div>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {trip && (
        <TripDetails
          trip={trip}
          onClose={() => setTrip(null)}
          onPlan={openPlan}
        />
      )}
      {plan && (
        <PlanForm
          onClose={() => setPlan(null)}
          initialDestination={plan.destination}
          initialMonth={month}
          initialStyle={style}
        />
      )}
    </>
  );
}

const SunroomApp = React.lazy(() => import("./sunroom/SunroomApp.jsx"));
const isSunroom = /^\/2(?:\/|$)/.test(window.location.pathname);
createRoot(document.getElementById("root")).render(
  isSunroom ? (
    <React.Suspense
      fallback={<div style={{ minHeight: "100vh", background: "#f8f6ed" }} />}
    >
      <SunroomApp />
    </React.Suspense>
  ) : (
    <App />
  ),
);
