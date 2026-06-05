import { test, expect } from '../../fixtures/pageFixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { Products, CheckoutData } from '../../utils/testData';

test.describe('Checkout Flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    cartPage = new CartPage(authenticatedPage);
    checkoutPage = new CheckoutPage(authenticatedPage);

    await authenticatedPage.goto('/inventory.html');
    await inventoryPage.resetAppState();

    // Add item and navigate to checkout
    await inventoryPage.addItemToCartByName(Products.backpack);
    await inventoryPage.addItemToCartByName(Products.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC-017: Complete checkout with valid information', async ({
    authenticatedPage,
  }) => {
    await checkoutPage.fillCheckoutInfo(CheckoutData.valid);
    await checkoutPage.clickContinue();

    // Step 2: Overview
    expect(await checkoutPage.getPageTitle()).toBe('Checkout: Overview');
    const subtotal = await checkoutPage.getSubtotalPrice();
    expect(subtotal).toBeGreaterThan(0);

    await checkoutPage.clickFinish();

    // Step 3: Complete
    expect(await checkoutPage.isOrderComplete()).toBe(true);
  });

  test('TC-018: Checkout overview shows correct pricing', async () => {
    await checkoutPage.fillCheckoutInfo(CheckoutData.valid);
    await checkoutPage.clickContinue();

    const subtotal = await checkoutPage.getSubtotalPrice();
    const total = await checkoutPage.getTotalPrice();

    // Total should be greater than subtotal (tax included)
    expect(total).toBeGreaterThan(subtotal);
  });

  test('TC-019: Cancel checkout returns to cart', async ({
    authenticatedPage,
  }) => {
    await checkoutPage.clickCancel();
    await expect(authenticatedPage).toHaveURL(/cart\.html/);
  });
});
