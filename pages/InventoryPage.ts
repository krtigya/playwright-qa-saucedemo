import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productList: Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenu: Locator;
  readonly menuLogout: Locator;
  readonly menuAllItems: Locator;
  readonly menuAbout: Locator;
  readonly menuResetApp: Locator;
  readonly closeMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.productList = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.menuLogout = page.locator('#logout_sidebar_link');
    this.menuAllItems = page.locator('#inventory_sidebar_link');
    this.menuAbout = page.locator('#about_sidebar_link');
    this.menuResetApp = page.locator('#reset_sidebar_link');
    this.closeMenu = page.locator('#react-burger-cross-btn');
  }

  async isOnInventoryPage(): Promise<boolean> {
    await this.pageTitle.waitFor({ state: 'visible' });
    return (await this.pageTitle.textContent()) === 'Products';
  }

  async getProductCount(): Promise<number> {
    return this.productList.count();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productList.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productList
      .locator('.inventory_item_price')
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    const buttons = this.productList.locator('[data-test^="add-to-cart"]');
    await buttons.nth(index).click();
  }

  async addItemToCartByName(name: string): Promise<void> {
    const item = this.productList.filter({ hasText: name });
    await item.locator('[data-test^="add-to-cart"]').click();
  }

  async removeItemFromCartByName(name: string): Promise<void> {
    const item = this.productList.filter({ hasText: name });
    await item.locator('[data-test^="remove"]').click();
  }

  async getCartBadgeCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0');
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
  }

  async openMenu(): Promise<void> {
    await this.clickElement(this.burgerMenu);
    await this.page.waitForTimeout(300); // wait for menu animation
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.clickElement(this.menuLogout);
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.clickElement(this.menuResetApp);
    await this.clickElement(this.closeMenu);
  }

  async clickProductByName(name: string): Promise<void> {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }
}
