import { describe, it, expect } from 'vitest';
import { generateUUID } from '../src/tool.ts';

describe('generateUUID', () => {
  it('returns a string matching RFC4122 v4 format', () => {
    const uuid = generateUUID();
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(regex);
  });

  it('generates unique UUIDs on subsequent calls', () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    expect(uuid1).not.toBe(uuid2);
  });

  it('has correct version and variant bits', () => {
    const uuid = generateUUID();
    const parts = uuid.split('-');
    // Version is the first character of the third group (should be '4')
    expect(parts[2][0]).toBe('4');
    // Variant is the first character of the fourth group (should be 8, 9, a, or b)
    expect('89ab').toContain(parts[3][0].toLowerCase());
  });
});

