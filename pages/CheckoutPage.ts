import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2 (Overview)
  readonly finishButton: Locator;
  readonly summaryTotal: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryItems: Locator;

  // Step 3 (Complete)
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryItems = page.locator('.cart_item');

    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    await this.fillInput(this.firstNameInput, info.firstName);
    await this.fillInput(this.lastNameInput, info.lastName);
    await this.fillInput(this.postalCodeInput, info.postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton);
  }

  async clickFinish(): Promise<void> {
    await this.clickElement(this.finishButton);
  }

  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async getTotalPrice(): Promise<number> {
    const text = await this.getText(this.summaryTotal);
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async getSubtotalPrice(): Promise<number> {
    const text = await this.getText(this.summarySubtotal);
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async isOrderComplete(): Promise<boolean> {
    await this.completeHeader.waitFor({ state: 'visible' });
    const text = await this.completeHeader.textContent();
    return text?.includes('Thank you') ?? false;
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }
}
