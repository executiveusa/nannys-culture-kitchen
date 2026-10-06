import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';
import { WorksiteLeadForm } from '~/components/nanny/public/WorksiteLeadForm';

export const meta: MetaFunction = () => [
  { title: "Pop-Ups & Events | Nanny's Culture Kitchen" },
  {
    name: 'description',
    content: "Ask Nanny's Culture Kitchen about a plant-based pop-up or event in Puerto Vallarta.",
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function EventsPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-page-hero">
        <p className="nck-eyebrow">Pop-ups & events</p>
        <h1>Bring the culture kitchen into the room.</h1>
        <p>
          Events are the second operating lane after worksites. Tell us the date, place, headcount, and what kind of gathering
          it is. The menu can then be shaped around the service instead of pretending one package fits everything.
        </p>
      </section>

      <section className="nck-event-types">
        <article>
          <p className="nck-eyebrow">Pop-up</p>
          <h2>Short-run service</h2>
          <p>A focused menu in a borrowed or temporary setting.</p>
        </article>
        <article>
          <p className="nck-eyebrow">Event</p>
          <h2>Planned hospitality</h2>
          <p>A defined guest count, service window, menu, and production plan.</p>
        </article>
      </section>

      <WorksiteLeadForm
        leadType="event"
        id="request-event"
        title="Tell us about the event"
        intro="Give us the date, location, headcount, and the kind of experience you need. This saves a planning request; it does not create a contract or take payment."
      />
    </NannyPublicLayout>
  );
}
