import type { CSSProperties } from 'react';

const FIREFLIES = [
  [12, 18, 0.4, 7],
  [22, 38, 1.8, 9],
  [31, 24, 2.9, 8],
  [46, 52, 0.9, 10],
  [57, 34, 3.4, 7.5],
  [66, 19, 1.3, 9.4],
  [72, 62, 4.1, 8.8],
  [82, 44, 2.2, 10.5],
  [88, 26, 0.6, 7.8],
  [38, 69, 3.8, 9.8],
  [18, 73, 2.7, 8.6],
  [61, 76, 1.1, 10.2],
] as const;

export function NannyHero() {
  const heroVideo = import.meta.env.VITE_NANNY_HERO_VIDEO_URL as string | undefined;

  return (
    <section className="nck-hero" aria-labelledby="nck-hero-title">
      <div className="nck-hero-copy">
        <p className="nck-eyebrow">Puerto Vallarta · 100% plant-based</p>
        <h1 id="nck-hero-title">Plant-based comfort food, brought to the crew.</h1>
        <p className="nck-hero-summary">
          Nanny’s Culture Kitchen is named for Nanny, our founder’s mother from Washington, Louisiana. We cook
          across cultures with a few New Orleans notes, fresh juices, worksite lunches, pop-ups, and events.
        </p>
        <div className="nck-hero-actions">
          <a className="nck-button nck-button-primary" href="/worksites#book-worksite">
            Book a worksite lunch
          </a>
          <a className="nck-button nck-button-secondary" href="/menu">
            See the sample menu
          </a>
        </div>
        <p className="nck-hero-footnote">Worksites first. Pop-ups and events by request.</p>
      </div>

      <div className="nck-hero-media" aria-label="Nanny's Culture Kitchen geodesic dome garden concept">
        {heroVideo ? (
          <video className="nck-hero-image" autoPlay muted loop playsInline poster="/nannys/hero-dome.webp">
            <source src={heroVideo} />
          </video>
        ) : (
          <img
            className="nck-hero-image"
            src="/nannys/hero-dome.webp"
            alt="Concept image of Nanny's Culture Kitchen inside a tropical geodesic dome with vertical growing towers and a working kitchen"
            width="1200"
            height="1800"
            fetchPriority="high"
          />
        )}
        <div className="nck-hero-glow nck-hero-glow-one" aria-hidden="true" />
        <div className="nck-hero-glow nck-hero-glow-two" aria-hidden="true" />
        <div className="nck-steam nck-steam-one" aria-hidden="true" />
        <div className="nck-steam nck-steam-two" aria-hidden="true" />
        <div className="nck-fireflies" aria-hidden="true">
          {FIREFLIES.map(([left, top, delay, duration]) => (
            <span
              key={`${left}-${top}`}
              className="nck-firefly"
              style={
                {
                  '--nck-left': `${left}%`,
                  '--nck-top': `${top}%`,
                  '--nck-delay': `${delay}s`,
                  '--nck-duration': `${duration}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <p className="nck-concept-label">Dome vision · Puerto Vallarta</p>
      </div>
    </section>
  );
}
