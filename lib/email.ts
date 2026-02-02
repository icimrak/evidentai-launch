export function isValidEmail(email: string): boolean {
  // Simple, practical validation.
  // If you need stricter rules later, we can replace this.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
