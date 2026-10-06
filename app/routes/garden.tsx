import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';

export const meta: MetaFunction = () => [
  { title: "The Dome Vision | Nanny's Culture Kitchen" },
  {
    name: 'description',
    content: "See the geodesic growing-dome vision for Nanny's Culture Kitchen in Puerto Vallarta.",
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function GardenPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-garden-hero">
        <img
          src="/nannys/hero-dome.webp"
          width="1200"
          height="1800"
          alt="Concept image of Nanny's Culture Kitchen geodesic dome with tropical planting and vertical growing towers"
        />
        <div>
          <p className="nck-eyebrow">Concept direction</p>
          <h1>The kitchen and the growing space should feel like one place.</h1>
          <p>
            The dome is the future-facing spatial idea for Puerto Vallarta: tropical plants, vertical growing towers, food,
            light, and service sharing the same visual world.
          </p>
          <p className="nck-proof-label">This page describes a design vision, not a claim that the growing system is operating today.</p>
        </div>
      </section>

      <section className="nck-garden-principles">
        <article>
          <span>01</span>
          <h2>Visible growing</h2>
          <p>Ingredients should not disappear behind the kitchen. The growing environment is part of what guests can see.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Tropical first</h2>
          <p>The Puerto Vallarta environment leads. New Orleans arrives through food, music, material, and details rather than fake bayou scenery.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Future without gimmicks</h2>
          <p>Vertical towers and a geodesic shell are useful only if they support real growing, shade, service, or learning.</p>
        </article>
      </section>
    </NannyPublicLayout>
  );
}
