import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';
import { WorksiteLeadForm } from '~/components/nanny/public/WorksiteLeadForm';

export const meta: MetaFunction = () => [
  { title: "Worksite Lunches | Nanny's Culture Kitchen" },
  {
    name: 'description',
    content: "Request a plant-based worksite lunch from Nanny's Culture Kitchen in Puerto Vallarta.",
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function WorksitesPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-page-hero nck-page-hero-worksite">
        <p className="nck-eyebrow">Primary service</p>
        <h1>Keep the crew onsite. Bring lunch to them.</h1>
        <p>
          Nanny’s worksite model starts with the basics: where the crew is, how many people are eating, and when lunch needs
          to land. We use that request to plan service rather than forcing every worksite into the same package.
        </p>
      </section>

      <section className="nck-worksite-details">
        <div>
          <span>01</span>
          <h2>Morning planning</h2>
          <p>Confirm the site, headcount, timing, and food direction before production.</p>
        </div>
        <div>
          <span>02</span>
          <h2>Built for the break</h2>
          <p>Portable food, straightforward pickup, and a service window that respects the crew’s schedule.</p>
        </div>
        <div>
          <span>03</span>
          <h2>Onsite handoff</h2>
          <p>The goal is to arrive where people already are so lunch does not require leaving the worksite.</p>
        </div>
      </section>

      <section className="nck-truth-note">
        <p className="nck-eyebrow">What is not being claimed yet</p>
        <h2>No fake route map. No invented fleet partners. No made-up delivery times.</h2>
        <p>Those become public only after the first routes and operating windows are verified.</p>
      </section>

      <WorksiteLeadForm />
    </NannyPublicLayout>
  );
}
