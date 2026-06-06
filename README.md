# Playwright QA Automation Suite — SauceDemo

A production-ready end-to-end test automation framework built as part of a QA Automation Engineer interview task. The suite targets **saucedemo.com** for UI testing and **reqres.in** for REST API testing, implementing industry best practices including Page Object Model, custom fixtures, environment configuration, and CI/CD integration.

> ✅ **57 / 57 tests passing** in ~34s

---

## What This Project Covers

- **UI Automation** — Login, inventory browsing, product sorting, shopping cart management, and complete end-to-end checkout flow
- **API Testing** — Full CRUD operations, authentication, pagination, and error handling against a live REST API
- **Negative Testing** — Invalid credentials, empty form submissions, locked accounts, and unauthorized direct URL access
- **Page Object Model** — Clean separation between test logic and UI selectors across 6 page classes
- **CI/CD Pipeline** — GitHub Actions with parallel sharding, automatic retries, and merged HTML reports

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Test runner, browser automation, API testing |
| TypeScript | Type-safe test authoring |
| Page Object Model | Maintainable UI abstraction |
| dotenv | Environment configuration |
| GitHub Actions | CI/CD with parallel test sharding |

---

## Project Structure

```
playwright-qa/
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts        # Authentication flows
│   │   ├── inventory.spec.ts    # Product listing & sorting
│   │   ├── cart.spec.ts         # Cart management
│   │   └── checkout.spec.ts     # End-to-end checkout
│   ├── api/
│   │   └── api.spec.ts          # REST API tests (reqres.in)
│   └── negative/
│       └── negative.spec.ts     # Negative / edge case tests
├── pages/
│   ├── BasePage.ts              # Abstract base with shared helpers
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDetailPage.ts
├── fixtures/
│   └── pageFixtures.ts          # Custom Playwright fixtures
├── utils/
│   ├── testData.ts              # Test data & constants
│   └── helpers.ts               # Utility functions
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline
├── .env.example                 # Template for environment setup
├── playwright.config.ts
├── tsconfig.json
├── TEST_PLAN.md
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18 ([download](https://nodejs.org))
- npm ≥ 9

### 1. Clone the repository

```bash
git clone https://github.com/krtigya/playwright-qa-saucedemo.git
cd playwright-qa-saucedemo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps chromium
```

### 4. Configure environment

```bash
cp .env.example .env
# .env is pre-filled with saucedemo defaults — no changes needed for local runs
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run only negative tests
npm run test:negative

# Run in headed mode (see the browser)
npm run test:headed

# Debug mode (step through tests)
npm run test:debug

# Open HTML report after run
npm run report
```

---

## Test Coverage Summary

| Category | Tests | Type |
|---|---|---|
| Authentication | 4 | UI - Positive |
| Inventory & Sorting | 6 | UI - Positive |
| Shopping Cart | 6 | UI - Positive |
| Checkout Flow | 3 | UI - Positive |
| Negative Cases | 10 | UI - Negative |
| API Tests | 14 | API (reqres.in) |
| **Total** | **57** | **All passing** |

---

## Reports

After a test run, Playwright generates:

- **HTML Report** → `playwright-report/index.html` (open with `npm run report`)
- **JSON Results** → `test-results/results.json`
- **Traces** → `test-results/` (auto-captured on failure, open with `npx playwright show-trace`)
- **Screenshots** → Captured automatically on failure

---

## CI/CD

Tests run automatically on GitHub Actions:
- On every push to `main` or `develop`
- On every pull request targeting `main`
- Nightly at 2 AM UTC

The pipeline uses **2 parallel shards** to speed up execution and merges results into a single HTML report artifact.

---

## Design Decisions

- **No hard waits** — All synchronization via Playwright's `waitFor` and `expect` assertions
- **Fixture-based auth** — `authenticatedPage` fixture handles login once per test, avoiding repetition
- **POM encapsulation** — Selectors live only in page objects; tests never touch raw locators
- **`data-test` attributes** — All selectors use stable `data-test` attributes where available
- **Environment variables** — All credentials and URLs in `.env`; never hardcoded in test files
- **Fail-safe reporting** — Screenshots, video, and trace files auto-captured on every failure
