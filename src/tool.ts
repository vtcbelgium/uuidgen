export function generateUUID(): string {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID();
  }
  // Fallback for environments without randomUUID
  const array = new Uint8Array(16);
  cryptoObj.getRandomValues(array);
  // Set version to 4 (bits 12-15 of the 7th byte)
  array[6] = (array[6] & 0x0f) | 0x40;
  // Set variant to RFC4122 (bits 6-7 of the 9th byte)
  array[8] = (array[8] & 0x3f) | 0x80;
  // Convert to hex string with hyphens
  const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  return hex.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
}

