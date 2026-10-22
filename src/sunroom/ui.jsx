import React, { createContext, useContext, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Instagram,
  Linkedin,
  Mail,
  Compass,
  CalendarDays,
  MapPin,
  ChevronDown,
  Heart,
  Waves,
  Mountain,
  Landmark,
  Leaf,
} from "lucide-react";
import { destinations, moods, picture, money } from "./content";

export const NavigationContext = createContext(null);
export function useNavigation() {
  return useContext(NavigationContext);
}
export function Link({ to, children, onClick, ...props }) {
  const { navigate } = useNavigation();
  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (
          !e.defaultPrevented &&
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          to.startsWith("/2")
        ) {
          e.preventDefault();
          navigate(to, e.currentTarget);
        }
      }}
    >
      {children}
    </a>
  );
}
export function Logo() {
  return (
    <Link to="/2" className="sr-logo" aria-label="Skyna Sunroom home">
      <span>Skyna</span>
      <svg viewBox="0 0 62 20" aria-hidden="true">
        <path
          d="M2 14c13-1 18-15 30-11 9 3 10 8 26 1M13 17c16-11 26 9 46-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
export function Button({
  to,
  children,
  variant = "",
  className = "",
  ...props
}) {
  const cls = `sr-button ${variant ? `sr-button-${variant}` : ""} ${className}`;
  return to ? (
    <Link to={to} className={cls} {...props}>
      {children}
      <ArrowRight size={20} />
    </Link>
  ) : (
    <button className={cls} {...props}>
      {children}
      <ArrowRight size={20} />
    </button>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const { location } = useNavigation();
  return (
    <header className="sr-header">
      <div className="sr-header-inner">
        <Logo />
        <nav aria-label="Sunroom navigation" className="sr-nav">
          {[
            ["Discover", "/2/destinations"],
            ["Experiences", "/2/experiences"],
            ["Our story", "/2/about"],
          ].map(([label, to]) => (
            <Link
              to={to}
              key={to}
              aria-current={location.pathname === to ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="sr-header-right">
          <Button to="/2/plan" className="sr-header-plan">
            Plan a trip
          </Button>
          <button
            className="sr-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Sunroom mobile navigation" className="sr-mobile-nav">
          {[
            ["Discover", "/2/destinations"],
            ["Journeys", "/2/journeys"],
            ["Experiences", "/2/experiences"],
            ["Our story", "/2/about"],
            ["Plan a trip", "/2/plan"],
          ].map(([label, to]) => (
            <Link to={to} key={to} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="sr-footer">
      <div className="sr-footer-inner">
        <Logo />
        <nav aria-label="Footer navigation">
          <Link to="/2/destinations">Discover</Link>
          <Link to="/2/experiences">Experiences</Link>
          <Link to="/2/about">Our story</Link>
          <Link to="/2/plan">Let’s talk</Link>
        </nav>
        <div className="sr-footer-social">
          <a
            href="https://www.instagram.com/skyna.in/"
            target="_blank"
            rel="noreferrer"
            aria-label="Skyna Instagram"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/skyna-company-66778237b/"
            target="_blank"
            rel="noreferrer"
            aria-label="Skyna LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a href="mailto:info@skyna.in" aria-label="Email Skyna">
            <Mail size={18} />
          </a>
        </div>
        <span className="sr-footer-signature">
          Travel further within.
          <Leaf size={21} />
        </span>
      </div>
    </footer>
  );
}
export function ArrowDoodle({ className = "" }) {
  return (
    <svg
      className={`sr-arrow-doodle ${className}`}
      viewBox="0 0 55 65"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4C1 37 23 48 43 50m-8-11 10 11-13 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Sprig({ className = "" }) {
  return (
    <span className={`sr-sprig ${className}`} aria-hidden="true">
      <img
        src="/images/sunroom/olive-branch.png"
        className="sr-sprig-leaf"
        alt=""
        width="1448"
        height="1086"
        loading={className.includes("sr-branch-") ? "eager" : "lazy"}
      />
    </span>
  );
}
export function Stamp() {
  return (
    <div className="sr-stamp" aria-hidden="true">
      <span>GOOD</span>
      <span>PLACES,</span>
      <span>BRIGHTER</span>
      <span>PEOPLE</span>
    </div>
  );
}
export function SearchBar({ className = "" }) {
  const { navigate } = useNavigation();
  const [place, setPlace] = useState(""),
    [mood, setMood] = useState(""),
    [when, setWhen] = useState("");
  const dates = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth() + i,
      1,
    ).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  });
  return (
    <form
      className={`sr-search ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (place) params.set("destination", place);
        if (mood) params.set("mood", mood);
        if (when) params.set("when", when);
        navigate(`/2/journeys${params.size ? "?" + params : ""}`);
      }}
      aria-label="Find your Sunroom journey"
    >
      <label>
        <MapPin className="sr-search-icon" />
        <span>
          <strong>Where to?</strong>
          <select
            aria-label="Choose a destination"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          >
            <option value="">India or anywhere in the world</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </span>
        <ChevronDown className="sr-select-arrow" size={15} />
      </label>
      <label>
        <Compass className="sr-search-icon" />
        <span>
          <strong>Travel style</strong>
          <select
            aria-label="Choose a travel style"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Beaches, mountains, culture...</option>
            {moods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </span>
        <ChevronDown className="sr-select-arrow" size={15} />
      </label>
      <label>
        <CalendarDays className="sr-search-icon" />
        <span>
          <strong>When?</strong>
          <select
            aria-label="Choose a preferred month"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          >
            <option value="">Any time</option>
            {dates.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </span>
        <ChevronDown className="sr-select-arrow" size={15} />
      </label>
      <button className="sr-search-submit" aria-label="Find journeys">
        <ArrowRight size={26} />
        <span>Find my escape</span>
      </button>
    </form>
  );
}
export function DestinationCard({ destination: d, compact = false }) {
  return (
    <Link
      to={`/2/destinations/${d.slug}`}
      className={`sr-destination-card ${compact ? "sr-destination-compact" : ""}`}
      data-motion-key={d.slug}
      aria-label={`Discover ${d.name}`}
    >
      <div className="sr-destination-photo">
        <img src={d.image} alt={`${d.name} — ${d.line}`} loading="lazy" />
      </div>
      <div className="sr-destination-caption">
        <div>
          <span>{d.country}</span>
          <h3>{d.name}</h3>
        </div>
        <ArrowRight size={21} />
      </div>
      {!compact && <p>{d.line}</p>}
    </Link>
  );
}
export function JourneyCard({ journey: j }) {
  const { location } = useNavigation();
  const when = new URLSearchParams(location.search).get("when");
  const journeyURL = `/2/journeys/${j.slug}${when ? `?when=${encodeURIComponent(when)}` : ""}`;
  return (
    <article className="sr-journey-card" data-motion-key={j.slug}>
      <Link
        to={journeyURL}
        className="sr-journey-photo"
        data-image-drift
        aria-label={`Explore ${j.title}`}
      >
        <img
          src={j.image}
          alt={`${j.destination} travel landscape`}
          loading="lazy"
        />
        <span>{j.bespoke ? "TAILOR-MADE" : "SKYNA JOURNEY"}</span>
      </Link>
      <div className="sr-journey-meta">
        <span>{j.destination}</span>
        <span>{j.days ? `${j.days} days` : "Your dates. Your pace."}</span>
      </div>
      <Link to={journeyURL}>
        <h3>{j.title}</h3>
      </Link>
      <div className="sr-journey-bottom">
        <span>
          {j.price ? (
            <>
              <small>From </small>
              {money(j.price)}
              <small> / person</small>
            </>
          ) : (
            "A journey made around you"
          )}
        </span>
        <Link to={journeyURL} aria-label={`View ${j.title}`}>
          <ArrowUpRight size={21} />
        </Link>
      </div>
    </article>
  );
}
export function MoodIcon({ mood, size = 24 }) {
  const Icon =
    mood === "Beaches & islands"
      ? Waves
      : mood === "Mountains & nature"
        ? Mountain
        : mood === "Nature & culture"
          ? Landmark
          : Heart;
  return <Icon size={size} strokeWidth={1.3} />;
}
export function PageIntro({ eyebrow, title, children }) {
  return (
    <div className="sr-page-intro" data-reveal>
      <p className="sr-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <p className="sr-intro-text">{children}</p>}
    </div>
  );
}
export function SoftCTA({
  title = "A journey with your name on it.",
  copy = "A few daydreams. A little local knowledge. A trip that feels entirely like you.",
  destination = "",
}) {
  return (
    <section className="sr-soft-cta">
      <div className="sr-container">
        <p className="sr-eyebrow">YOUR JOURNEY, YOUR WAY</p>
        <h2>{title}</h2>
        <p>{copy}</p>
        <Button
          to={`/2/plan${destination ? "?destination=" + encodeURIComponent(destination) : ""}`}
        >
          Let’s make it yours
        </Button>
      </div>
      <Sprig className="sr-floating-sprig" />
    </section>
  );
}
