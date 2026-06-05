import { test, expect } from '../../fixtures/pageFixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import {
  TestUsers,
  ErrorMessages,
  CheckoutData,
  Products,
} from '../../utils/testData';

test.describe('Negative Test Cases', () => {
  // ── Auth Negative Tests ──────────────────────────────────────────────────────

  test.describe('Invalid Login Scenarios', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goto();
    });

    test('NEG-001: Login with invalid username and password shows error', async ({
      loginPage,
    }) => {
      await loginPage.login(TestUsers.invalid.username, TestUsers.invalid.password);
      expect(await loginPage.isErrorVisible()).toBe(true);
      const msg = await loginPage.getErrorMessage();
      expect(msg).toContain('Username and password do not match');
    });

    test('NEG-002: Login with empty username shows error', async ({
      loginPage,
    }) => {
      await loginPage.login(
        TestUsers.emptyUsername.username,
        TestUsers.emptyUsername.password
      );
      expect(await loginPage.isErrorVisible()).toBe(true);
      const msg = await loginPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyUsername);
    });

    test('NEG-003: Login with empty password shows error', async ({
      loginPage,
    }) => {
      await loginPage.login(
        TestUsers.emptyPassword.username,
        TestUsers.emptyPassword.password
      );
      expect(await loginPage.isErrorVisible()).toBe(true);
      const msg = await loginPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyPassword);
    });

    test('NEG-004: Locked out user cannot login', async ({ loginPage }) => {
      await loginPage.login(TestUsers.locked.username, TestUsers.locked.password);
      expect(await loginPage.isErrorVisible()).toBe(true);
      const msg = await loginPage.getErrorMessage();
      expect(msg).toContain('locked out');
    });

    test('NEG-005: Empty form submission shows username error first', async ({
      loginPage,
    }) => {
      await loginPage.login('', '');
      expect(await loginPage.isErrorVisible()).toBe(true);
      const msg = await loginPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyUsername);
    });
  });

  // ── Checkout Negative Tests ──────────────────────────────────────────────────

  test.describe('Invalid Checkout Form', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
      const inventoryPage = new InventoryPage(authenticatedPage);
      const cartPage = new CartPage(authenticatedPage);

      await authenticatedPage.goto('/inventory.html');
      await inventoryPage.resetAppState();
      await inventoryPage.addItemToCartByName(Products.backpack);
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
    });

    test('NEG-006: Checkout with empty first name shows error', async ({
      authenticatedPage,
    }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.fillCheckoutInfo(CheckoutData.emptyFirstName);
      await checkoutPage.clickContinue();
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const msg = await checkoutPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyFirstName);
    });

    test('NEG-007: Checkout with empty last name shows error', async ({
      authenticatedPage,
    }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.fillCheckoutInfo(CheckoutData.emptyLastName);
      await checkoutPage.clickContinue();
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const msg = await checkoutPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyLastName);
    });

    test('NEG-008: Checkout with empty postal code shows error', async ({
      authenticatedPage,
    }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.fillCheckoutInfo(CheckoutData.emptyPostalCode);
      await checkoutPage.clickContinue();
      expect(await checkoutPage.isErrorVisible()).toBe(true);
      const msg = await checkoutPage.getErrorMessage();
      expect(msg).toContain(ErrorMessages.emptyPostalCode);
    });
  });

  // ── Direct URL Access Without Auth ──────────────────────────────────────────

  test.describe('Unauthorized Access', () => {
    test('NEG-009: Direct access to inventory without login redirects', async ({
      page,
    }) => {
      await page.goto('/inventory.html');
      // Should redirect to login or show an error
      const url = page.url();
      const isRedirectedToLogin =
        url.endsWith('/') ||
        url.includes('index.html') ||
        (await page.locator('.error-message-container').isVisible());
      expect(isRedirectedToLogin).toBe(true);
    });

    test('NEG-010: Direct access to cart without login redirects', async ({
      page,
    }) => {
      await page.goto('/cart.html');
      const url = page.url();
      const isRedirectedToLogin =
        url.endsWith('/') || url.includes('index.html');
      expect(isRedirectedToLogin).toBe(true);
    });
  });
});
