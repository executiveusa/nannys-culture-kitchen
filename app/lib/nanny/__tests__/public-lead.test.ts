import { describe, expect, it } from 'vitest';
import { validatePublicLead } from '../public-lead';

describe('validatePublicLead', () => {
  it('accepts a valid worksite request', () => {
    expect(
      validatePublicLead({
        leadType: 'worksite',
        contactName: 'Maria',
        email: 'maria@example.com',
        location: 'Puerto Vallarta',
        headCount: 24,
        source: 'nannys-culture-kitchen-web',
      }),
    ).toEqual({
      leadType: 'worksite',
      contactName: 'Maria',
      email: 'maria@example.com',
      location: 'Puerto Vallarta',
      headCount: 24,
      source: 'nannys-culture-kitchen-web',
      organization: undefined,
      phone: undefined,
      serviceDate: undefined,
      serviceWindow: undefined,
      notes: undefined,
    });
  });

  it('requires a contact path', () => {
    expect(() =>
      validatePublicLead({
        leadType: 'worksite',
        contactName: 'Maria',
        location: 'Puerto Vallarta',
        source: 'nannys-culture-kitchen-web',
      }),
    ).toThrow(/email or phone/i);
  });

  it('rejects an unreasonable head count', () => {
    expect(() =>
      validatePublicLead({
        leadType: 'worksite',
        contactName: 'Maria',
        phone: '555-0100',
        location: 'Puerto Vallarta',
        headCount: 5001,
        source: 'nannys-culture-kitchen-web',
      }),
    ).toThrow(/between 1 and 5000/i);
  });
});
