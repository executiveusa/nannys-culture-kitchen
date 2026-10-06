import { json, type ActionFunctionArgs } from '@vercel/remix';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@convex/_generated/api';
import { validatePublicLead } from '~/lib/nanny/public-lead';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
  }

  try {
    const payload = validatePublicLead(await request.json());
    const convexUrl = globalThis.process.env.CONVEX_URL || globalThis.process.env.VITE_CONVEX_URL;
    if (!convexUrl) {
      return json({ ok: false, error: 'Lead storage is not configured.' }, { status: 503 });
    }

    const client = new ConvexHttpClient(convexUrl);
    const id = await client.mutation(api.nanny.submitPublicLead, payload);
    return json({ ok: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'We could not save your request.';
    const isValidation = /required|invalid|between|email or phone|too long/i.test(message);
    return json({ ok: false, error: message }, { status: isValidation ? 400 : 500 });
  }
};
