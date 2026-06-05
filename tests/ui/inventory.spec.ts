import { test, expect } from '../../fixtures/pageFixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import { sortAlphaAsc, sortAlphaDesc, sortNumericAsc, sortNumericDesc } from '../../utils/helpers';

test.describe('Inventory & Product Sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    await authenticatedPage.goto('/inventory.html');
  });

  test('TC-005: Inventory page shows 6 products', async () => {
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('TC-006: Sort products A to Z', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(sortAlphaAsc(names));
  });

  test('TC-007: Sort products Z to A', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(sortAlphaDesc(names));
  });

  test('TC-008: Sort products price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual(sortNumericAsc(prices));
  });

  test('TC-009: Sort products price high to low', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices).toEqual(sortNumericDesc(prices));
  });

  test('TC-010: Navigate to product detail page', async ({
    authenticatedPage,
  }) => {
    const productDetailPage = inventoryPage;
    const names = await inventoryPage.getProductNames();
    const firstProduct = names[0];

    await inventoryPage.clickProductByName(firstProduct);
    await expect(authenticatedPage.locator('.inventory_details_name')).toBeVisible();
    await expect(authenticatedPage.locator('.inventory_details_name')).toHaveText(firstProduct);
  });
});
