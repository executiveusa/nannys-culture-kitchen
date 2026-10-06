export const PUBLIC_LEAD_TYPES = ['worksite', 'event', 'popup', 'general'] as const;
export type PublicLeadType = (typeof PUBLIC_LEAD_TYPES)[number];

export interface PublicLeadInput {
  leadType: PublicLeadType;
  organization?: string;
  contactName: string;
  email?: string;
  phone?: string;
  location: string;
  headCount?: number;
  serviceDate?: string;
  serviceWindow?: string;
  notes?: string;
  source: string;
}

const MAX = {
  organization: 160,
  contactName: 120,
  email: 180,
  phone: 40,
  location: 220,
  serviceDate: 20,
  serviceWindow: 120,
  notes: 1200,
  source: 120,
} as const;

function cleanOptional(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.trim();
  if (!cleaned) return undefined;
  if (cleaned.length > max) throw new Error('One of the fields is too long.');
  return cleaned;
}

function cleanRequired(value: unknown, max: number, label: string): string {
  const cleaned = cleanOptional(value, max);
  if (!cleaned) throw new Error(`${label} is required.`);
  return cleaned;
}

export function validatePublicLead(body: unknown): PublicLeadInput {
  if (!body || typeof body !== 'object') throw new Error('Invalid request.');
  const value = body as Record<string, unknown>;

  if (typeof value.leadType !== 'string' || !PUBLIC_LEAD_TYPES.includes(value.leadType as PublicLeadType)) {
    throw new Error('Invalid request type.');
  }

  const email = cleanOptional(value.email, MAX.email);
  const phone = cleanOptional(value.phone, MAX.phone);
  if (!email && !phone) throw new Error('Add an email or phone number so we know how to reach you.');

  let headCount: number | undefined;
  if (value.headCount !== undefined && value.headCount !== null && value.headCount !== '') {
    if (
      typeof value.headCount !== 'number' ||
      !Number.isInteger(value.headCount) ||
      value.headCount < 1 ||
      value.headCount > 5000
    ) {
      throw new Error('Crew size must be between 1 and 5000.');
    }
    headCount = value.headCount;
  }

  return {
    leadType: value.leadType as PublicLeadType,
    organization: cleanOptional(value.organization, MAX.organization),
    contactName: cleanRequired(value.contactName, MAX.contactName, 'Contact name'),
    email,
    phone,
    location: cleanRequired(value.location, MAX.location, 'Location'),
    headCount,
    serviceDate: cleanOptional(value.serviceDate, MAX.serviceDate),
    serviceWindow: cleanOptional(value.serviceWindow, MAX.serviceWindow),
    notes: cleanOptional(value.notes, MAX.notes),
    source: cleanRequired(value.source, MAX.source, 'Source'),
  };
}
