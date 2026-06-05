# playwright-qa-saucedemo
# Playwright QA Automation Suite — SauceDemo

A production-ready end-to-end test automation framework built as part of a 
QA Automation Engineer interview task. The suite targets **saucedemo.com** 
for UI testing and **reqres.in** for REST API testing, implementing industry 
best practices including Page Object Model, custom fixtures, environment 
configuration, and CI/CD integration.

## Test Results
> **57 / 57 tests passing** in 34.3s

## What This Project Covers

This project demonstrates real-world QA automation skills across:

- **UI Automation** — Login, inventory browsing, product sorting, 
  shopping cart management, and complete end-to-end checkout flow
- **API Testing** — Full CRUD operations, authentication, pagination, 
  and error handling against a live REST API
- **Negative Testing** — Invalid credentials, empty form submissions, 
  locked accounts, and unauthorized direct URL access
- **Page Object Model** — Clean separation between test logic and 
  UI selectors across 6 page classes
- **CI/CD Pipeline** — GitHub Actions with parallel sharding, 
  automatic retries, and merged HTML reports

## Architecture Highlights

- **Zero hard waits** — all synchronization via Playwright's built-in 
  `waitFor` and `expect` assertions
- **Stable selectors** — uses `data-test` attributes throughout, 
  resistant to CSS/layout changes
- **Custom fixtures** — `authenticatedPage` fixture handles login 
  setup automatically for tests that don't test auth itself
- **Environment-driven** — all credentials and URLs live in `.env`, 
  never hardcoded in test files
- **Fail-safe reporting** — screenshots, video, and trace files 
  auto-captured on every failure

##  Test Coverage Summary

| Category            | Tests | Type              |
|---------------------|-------|-------------------|
| Authentication      | 4     | UI - Positive     |
| Inventory & Sorting | 6     | UI - Positive     |
| Shopping Cart       | 6     | UI - Positive     |
| Checkout Flow       | 3     | UI - Positive     |
| Negative Cases      | 10    | UI - Negative     |
| API Tests           | 14    | API (reqres.in)   |
| **Total**           | **57**| **All passing** |

##  Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Test runner, browser automation, API testing |
| TypeScript | Type-safe test authoring |
| Page Object Model | Maintainable UI abstraction |
| dotenv | Environment configuration |
| GitHub Actions | CI/CD with parallel test sharding |

##  Target Applications

| App | URL | Purpose |
|-----|-----|---------|
| SauceDemo | https://www.saucedemo.com | UI test target |
| ReqRes | https://reqres.in | REST API test target |
