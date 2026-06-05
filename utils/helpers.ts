import { Page } from '@playwright/test';

/**
 * Sorts an array of strings alphabetically A→Z
 */
export function sortAlphaAsc(arr: string[]): string[] {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

/**
 * Sorts an array of strings alphabetically Z→A
 */
export function sortAlphaDesc(arr: string[]): string[] {
  return [...arr].sort((a, b) => b.localeCompare(a));
}

/**
 * Sorts an array of numbers ascending
 */
export function sortNumericAsc(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

/**
 * Sorts an array of numbers descending
 */
export function sortNumericDesc(arr: number[]): number[] {
  return [...arr].sort((a, b) => b - a);
}

/**
 * Formats price to two decimals
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Performs a login via localStorage injection (faster than UI login)
 * Useful for tests that don't test login itself
 */
export async function loginViaStorage(
  page: Page,
  username: string
): Promise<void> {
  await page.goto('/');
  await page.evaluate((user) => {
    (window as Window & typeof globalThis).localStorage.setItem(
      'react-hydratable-storage',
      JSON.stringify({
        username: user,
        cart_contents: {},
        orders: {},
      })
    );
  }, username);
  // Fallback: use the UI login if storage injection doesn't work
}

/**
 * Generates a random string
 */
export function randomString(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Waits for a network response containing a specific URL pattern
 */
export async function waitForResponse(
  page: Page,
  urlPattern: string | RegExp
): Promise<void> {
  await page.waitForResponse(urlPattern);
}
