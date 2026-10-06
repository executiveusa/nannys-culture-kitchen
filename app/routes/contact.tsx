import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';
import { WorksiteLeadForm } from '~/components/nanny/public/WorksiteLeadForm';

export const meta: MetaFunction = () => [
  { title: "Contact | Nanny's Culture Kitchen" },
  { name: 'description', content: "Send a planning request to Nanny's Culture Kitchen." },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function ContactPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-page-hero">
        <p className="nck-eyebrow">Contact</p>
        <h1>Start with the job you need done.</h1>
        <p>For worksite lunches, pop-ups, events, or another request, send the basics below. We are not publishing unverified phone numbers, social handles, or addresses.</p>
      </section>
      <WorksiteLeadForm
        leadType="general"
        id="contact-nannys"
        title="Send a planning request"
        intro="Tell us what you need, where it is, and how to reach you."
      />
    </NannyPublicLayout>
  );
}
