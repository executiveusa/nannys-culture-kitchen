import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyHome } from '~/components/nanny/public/NannyHome';

export const meta: MetaFunction = () => [
  { title: "Nanny's Culture Kitchen | Plant-Based Worksite Lunches in Puerto Vallarta" },
  {
    name: 'description',
    content:
      "Nanny's Culture Kitchen is a 100% plant-based culture kitchen in Puerto Vallarta focused on worksite lunches, pop-ups, and events.",
  },
  { property: 'og:title', content: "Nanny's Culture Kitchen" },
  {
    property: 'og:description',
    content: 'Plant-based comfort food brought to worksites, pop-ups, and events in Puerto Vallarta.',
  },
  { property: 'og:image', content: '/nannys/hero-dome.webp' },
  { name: 'theme-color', content: '#071a2d' },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function Index() {
  return <NannyHome />;
}
