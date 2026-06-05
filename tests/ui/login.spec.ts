import { test, expect } from '../../fixtures/pageFixtures';
import { TestUsers, ErrorMessages } from '../../utils/testData';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-001: Successful login with standard user', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-002: Login page displays all required elements', async ({
    loginPage,
  }) => {
    await expect(loginPage.loginLogo).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC-003: Successful logout returns to login page', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(TestUsers.standard.username, TestUsers.standard.password);
    await page.waitForURL(/inventory\.html/);
    await inventoryPage.logout();
    await expect(page).toHaveURL(/\/$/);
    expect(await loginPage.isOnLoginPage()).toBe(true);
  });

  test('TC-004: Performance glitch user can login (may be slow)', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(
      TestUsers.performance.username,
      TestUsers.performance.password
    );
    await expect(page).toHaveURL(/inventory\.html/, { timeout: 15_000 });
  });
});
