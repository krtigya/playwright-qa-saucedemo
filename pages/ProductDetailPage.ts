import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductName(): Promise<string> {
    return this.getText(this.productName);
  }

  async getProductPrice(): Promise<number> {
    const text = await this.getText(this.productPrice);
    return parseFloat(text.replace('$', ''));
  }

  async addToCart(): Promise<void> {
    await this.clickElement(this.addToCartButton);
  }

  async removeFromCart(): Promise<void> {
    await this.clickElement(this.removeButton);
  }

  async goBack(): Promise<void> {
    await this.clickElement(this.backButton);
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.addToCartButton.isVisible();
  }

  async isRemoveVisible(): Promise<boolean> {
    return this.removeButton.isVisible();
  }
}
