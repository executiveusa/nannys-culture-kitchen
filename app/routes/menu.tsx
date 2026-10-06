import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';

const ITEMS = [
  {
    group: 'Signature',
    title: 'Healthy egg rolls',
    detail: 'A crisp, portable plant-based format designed for worksite service and pop-ups.',
  },
  {
    group: 'New Orleans note',
    title: 'Rotating Louisiana-inspired special',
    detail: 'A plant-based special that can pull from New Orleans and Louisiana food traditions without turning the full menu into a theme park.',
  },
  {
    group: 'Culture kitchen',
    title: 'Rotating global plate or bowl',
    detail: 'The culture-kitchen slot changes with the service, guest chef, and ingredients available.',
  },
  {
    group: 'Fresh',
    title: 'Juices and bright drinks',
    detail: 'Fresh juice is part of the food direction for worksite lunches, pop-ups, and events.',
  },
];

export const meta: MetaFunction = () => [
  { title: "Sample Menu | Nanny's Culture Kitchen" },
  {
    name: 'description',
    content: "See the sample menu direction for Nanny's Culture Kitchen. Final dishes and pricing vary by service.",
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function MenuPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-page-hero">
        <p className="nck-eyebrow">Sample menu direction</p>
        <h1>Plant-based food that travels well and still feels like lunch.</h1>
        <p>
          This is a direction, not a published daily menu. Final dishes, pricing, allergens, and availability are locked per
          service before they are presented as orderable.
        </p>
      </section>

      <section className="nck-menu-page" aria-label="Sample menu items">
        {ITEMS.map((item) => (
          <article key={item.title} className="nck-menu-row">
            <p>{item.group}</p>
            <h2>{item.title}</h2>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>

      <section className="nck-simple-cta">
        <div>
          <p className="nck-eyebrow">Need lunch for a crew?</p>
          <h2>Start with the site, headcount, and lunch window.</h2>
        </div>
        <a className="nck-button nck-button-primary" href="/worksites#book-worksite">
          Request a worksite lunch
        </a>
      </section>
    </NannyPublicLayout>
  );
}
