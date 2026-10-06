import { useMemo, useState, type FormEvent } from 'react';

type LeadType = 'worksite' | 'event' | 'popup' | 'general';

interface WorksiteLeadFormProps {
  leadType?: LeadType;
  id?: string;
  title?: string;
  intro?: string;
}

export function WorksiteLeadForm({
  leadType = 'worksite',
  id = 'book-worksite',
  title = 'Bring Nanny’s to your worksite',
  intro = 'Tell us where the crew is, roughly how many people you feed, and the lunch window. We’ll use that to plan the next step.',
}: WorksiteLeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submitLabel = useMemo(() => {
    if (leadType === 'event') return 'Request an event';
    if (leadType === 'popup') return 'Request a pop-up';
    if (leadType === 'general') return 'Send request';
    return 'Request a worksite lunch';
  }, [leadType]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const honeypot = String(data.get('companyWebsite') ?? '').trim();

    if (honeypot) {
      setStatus('saved');
      setMessage('Request received.');
      return;
    }

    if (!email && !phone) {
      setStatus('error');
      setMessage('Add an email or phone number so we know how to reach you.');
      return;
    }

    setStatus('saving');
    setMessage('Saving your request…');

    try {
      const rawHeadCount = String(data.get('headCount') ?? '').trim();
      const response = await fetch('/api/nanny/public-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType,
          organization: String(data.get('organization') ?? '').trim() || undefined,
          contactName: String(data.get('contactName') ?? '').trim(),
          email: email || undefined,
          phone: phone || undefined,
          location: String(data.get('location') ?? '').trim(),
          headCount: rawHeadCount ? Number(rawHeadCount) : undefined,
          serviceDate: String(data.get('serviceDate') ?? '').trim() || undefined,
          serviceWindow: String(data.get('serviceWindow') ?? '').trim() || undefined,
          notes: String(data.get('notes') ?? '').trim() || undefined,
          source: 'nannys-culture-kitchen-web',
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'We could not save your request.');
      }

      form.reset();
      setStatus('saved');
      setMessage('Request saved. We’ll use the contact information you provided to follow up.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not save your request. Please try again.');
    }
  }

  return (
    <section id={id} className="nck-form-section" aria-labelledby={`${id}-title`}>
      <div className="nck-form-copy">
        <p className="nck-eyebrow">Next move</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
      </div>

      <form className="nck-lead-form" onSubmit={handleSubmit}>
        <div className="nck-form-grid">
          <label>
            <span>Contact name</span>
            <input name="contactName" autoComplete="name" required maxLength={120} />
          </label>
          <label>
            <span>Company or crew</span>
            <input name="organization" autoComplete="organization" maxLength={160} />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" inputMode="email" maxLength={180} />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} />
          </label>
          <label className="nck-form-wide">
            <span>Where should we come?</span>
            <input name="location" autoComplete="street-address" required maxLength={220} />
          </label>
          <label>
            <span>About how many people?</span>
            <input name="headCount" type="number" min="1" max="5000" inputMode="numeric" />
          </label>
          <label>
            <span>Preferred date</span>
            <input name="serviceDate" type="date" />
          </label>
          <label className="nck-form-wide">
            <span>Lunch window or event time</span>
            <input name="serviceWindow" placeholder="Example: 12:00–1:00 PM" maxLength={120} />
          </label>
          <label className="nck-form-wide">
            <span>Anything we should know?</span>
            <textarea name="notes" rows={4} maxLength={1200} />
          </label>
          <label className="nck-honeypot" aria-hidden="true">
            <span>Company website</span>
            <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="nck-form-submit-row">
          <button className="nck-button nck-button-primary" type="submit" disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : submitLabel}
          </button>
          <p className="nck-form-note">No payment is taken here. This saves a planning request.</p>
        </div>

        {message && (
          <p className={`nck-form-status nck-form-status-${status}`} role="status" aria-live="polite">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
