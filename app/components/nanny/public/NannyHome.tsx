import { NannyHero } from './NannyHero';
import { NannyPublicLayout } from './NannyPublicLayout';
import { WorksiteLeadForm } from './WorksiteLeadForm';

const MENU_NOTES = [
  {
    title: 'Healthy egg rolls',
    text: 'The signature format: crisp, portable, plant-based, and built for a lunch break.',
  },
  {
    title: 'Rotating culture plates',
    text: 'Global plant-based food with occasional New Orleans-inspired specials rather than one fixed cuisine.',
  },
  {
    title: 'Fresh juices',
    text: 'Cold, bright drinks that work with a worksite lunch, a pop-up, or an event.',
  },
];

export function NannyHome() {
  return (
    <NannyPublicLayout>
      <NannyHero />

      <section className="nck-statement" aria-labelledby="what-is-nannys">
        <p className="nck-eyebrow">What it is</p>
        <h2 id="what-is-nannys">A culture kitchen with one rule: everything on the food side is plant-based.</h2>
        <p>
          The menu can move across cultures. The operating model stays simple: feed people where they already are,
          starting with worksites in Puerto Vallarta, then pop-ups and events.
        </p>
      </section>

      <section className="nck-process" aria-labelledby="worksite-process-title">
        <div className="nck-section-heading">
          <p className="nck-eyebrow">Worksites first</p>
          <h2 id="worksite-process-title">Lunch comes to the crew.</h2>
          <a href="/worksites">See the worksite plan →</a>
        </div>
        <ol className="nck-process-list">
          <li>
            <span>01</span>
            <h3>Tell us the site</h3>
            <p>Location, crew size, and the lunch window.</p>
          </li>
          <li>
            <span>02</span>
            <h3>We plan the service</h3>
            <p>Menu and quantities are matched to the crew and event format.</p>
          </li>
          <li>
            <span>03</span>
            <h3>We meet you there</h3>
            <p>The goal is simple: people eat without leaving the site.</p>
          </li>
        </ol>
      </section>

      <section className="nck-menu-preview" aria-labelledby="menu-preview-title">
        <div className="nck-section-heading nck-section-heading-light">
          <p className="nck-eyebrow">Sample menu direction</p>
          <h2 id="menu-preview-title">Portable comfort food. Fresh ingredients. Built to travel.</h2>
          <p>Availability and final dishes change by service. Prices are not published until the operating menu is locked.</p>
        </div>
        <div className="nck-menu-lines">
          {MENU_NOTES.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <a className="nck-text-link" href="/menu">
          See the sample menu →
        </a>
      </section>

      <section className="nck-dome-story" aria-labelledby="dome-title">
        <div className="nck-dome-image-wrap">
          <img
            src="/nannys/hero-dome.webp"
            alt="Concept image of a tropical geodesic growing dome for Nanny's Culture Kitchen"
            loading="lazy"
            width="1200"
            height="1800"
          />
        </div>
        <div className="nck-dome-copy">
          <p className="nck-eyebrow">The Dome Vision</p>
          <h2 id="dome-title">Grow where we cook.</h2>
          <p>
            The geodesic dome is the long-term growing and hospitality vision for the Puerto Vallarta location: tropical
            planting, vertical towers, herbs, greens, fruit, and a kitchen connected visually to where ingredients grow.
          </p>
          <p className="nck-proof-label">Status: concept direction, not yet presented as an operating farm.</p>
          <a className="nck-text-link" href="/garden">
            See the dome plan →
          </a>
        </div>
      </section>

      <section className="nck-nanny-story" aria-labelledby="nanny-story-title">
        <p className="nck-eyebrow">Why the name</p>
        <h2 id="nanny-story-title">Nanny is family, not a mascot.</h2>
        <p>
          Nanny’s Culture Kitchen is named for the founder’s mother, Nanny, from Washington, Louisiana. That fact stays
          simple on purpose. We will not invent a family legend to make the brand sound older or more romantic than it is.
        </p>
        <a className="nck-text-link" href="/story">
          Read the story →
        </a>
      </section>

      <section className="nck-events-band" aria-labelledby="events-title">
        <div>
          <p className="nck-eyebrow">Second lane</p>
          <h2 id="events-title">Pop-ups and events when the fit is right.</h2>
        </div>
        <a className="nck-button nck-button-secondary-light" href="/events">
          Ask about an event
        </a>
      </section>

      <WorksiteLeadForm />
    </NannyPublicLayout>
  );
}
