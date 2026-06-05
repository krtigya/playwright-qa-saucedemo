import { test, expect } from '../../fixtures/pageFixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { Products } from '../../utils/testData';

test.describe('Shopping Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    cartPage = new CartPage(authenticatedPage);
    await authenticatedPage.goto('/inventory.html');
    // Reset app state to clear any items from previous tests
    await inventoryPage.resetAppState();
  });

  test('TC-011: Add single item to cart updates badge', async () => {
    await inventoryPage.addItemToCartByName(Products.backpack);
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(1);
  });

  test('TC-012: Add multiple items to cart', async () => {
    await inventoryPage.addItemToCartByName(Products.backpack);
    await inventoryPage.addItemToCartByName(Products.bikeLight);
    await inventoryPage.addItemToCartByName(Products.boltShirt);
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(3);
  });

  test('TC-013: Remove item from inventory page', async () => {
    await inventoryPage.addItemToCartByName(Products.backpack);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await inventoryPage.removeItemFromCartByName(Products.backpack);
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  });

  test('TC-014: Cart page shows correct items', async () => {
    await inventoryPage.addItemToCartByName(Products.backpack);
    await inventoryPage.addItemToCartByName(Products.bikeLight);
    await inventoryPage.goToCart();

    expect(await cartPage.isOnCartPage()).toBe(true);
    const items = await cartPage.getCartItemNames();
    expect(items).toContain(Products.backpack);
    expect(items).toContain(Products.bikeLight);
  });

  test('TC-015: Remove item from cart page', async () => {
    await inventoryPage.addItemToCartByName(Products.backpack);
    await inventoryPage.goToCart();
    await cartPage.removeItemByName(Products.backpack);
    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  test('TC-016: Continue shopping returns to inventory', async ({
    authenticatedPage,
  }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(authenticatedPage).toHaveURL(/inventory\.html/);
  });
});
