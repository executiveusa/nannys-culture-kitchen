import type { LinksFunction, MetaFunction } from '@vercel/remix';
import publicStyles from '~/styles/nannys-culture-kitchen.css?url';
import { NannyPublicLayout } from '~/components/nanny/public/NannyPublicLayout';

export const meta: MetaFunction = () => [
  { title: "Our Story | Nanny's Culture Kitchen" },
  {
    name: 'description',
    content: "Nanny's Culture Kitchen is named for the founder's mother, Nanny, from Washington, Louisiana.",
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: publicStyles },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
  },
];

export default function StoryPage() {
  return (
    <NannyPublicLayout>
      <section className="nck-story-page">
        <p className="nck-eyebrow">The name</p>
        <h1>Nanny is the founder’s mother.</h1>
        <p className="nck-story-lede">She is from Washington, Louisiana. The kitchen carries her name.</p>
        <p>
          That is the part we know and can say plainly. We are not filling the gaps with a manufactured origin story. As the
          family chooses what else belongs here—photographs, memories, sayings, recipes, or places—we can add them with the same
          rule: real before romantic.
        </p>
      </section>

      <section className="nck-story-bridge">
        <div>
          <p className="nck-eyebrow">Louisiana → Puerto Vallarta</p>
          <h2>A few New Orleans notes. A much wider table.</h2>
        </div>
        <p>
          Nanny’s is a culture kitchen, not a New Orleans replica. Louisiana is part of the emotional and culinary language;
          Puerto Vallarta is the place; plant-based food is the operating rule; guest cultures can change the menu without
          erasing the identity.
        </p>
      </section>
    </NannyPublicLayout>
  );
}
