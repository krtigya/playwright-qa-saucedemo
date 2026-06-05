# TEST PLAN — SauceDemo Automation Suite

**Project:** QA Automation Engineer Interview Task  
**Target Application:** [SauceDemo](https://www.saucedemo.com)  
**Framework:** Playwright + TypeScript  
**Prepared by:** QA Automation Engineer  
**Date:** 2024

---

## 1. Scope

### In Scope
- User authentication (login / logout)
- Product inventory display and sorting
- Shopping cart (add, remove, persist)
- Product detail page navigation
- End-to-end checkout flow (Step 1 → Step 2 → Order Complete)
- REST API testing via reqres.in (CRUD + Auth)
- Negative / edge case validation

### Out of Scope
- Payment gateway integration (not present in demo)
- Mobile device testing
- Cross-browser testing beyond Chromium (extendable)
- Performance / load testing

---

## 2. Test Environment

| Item | Value |
|---|---|
| Target URL | https://www.saucedemo.com |
| API URL | https://reqres.in/api |
| Browser | Chromium (headless) |
| Node.js | ≥ 18 |
| Playwright | ≥ 1.44 |
| CI | GitHub Actions |

---

## 3. Test Cases

### 3.1 Authentication

| ID | Title | Priority | Type |
|---|---|---|---|
| TC-001 | Successful login with standard user | High | Positive |
| TC-002 | Login page displays all required elements | Medium | UI |
| TC-003 | Successful logout returns to login page | High | Positive |
| TC-004 | Performance glitch user can login (slow response) | Medium | Positive |
| NEG-001 | Login with invalid credentials shows error | High | Negative |
| NEG-002 | Login with empty username shows error | High | Negative |
| NEG-003 | Login with empty password shows error | High | Negative |
| NEG-004 | Locked out user cannot login | High | Negative |
| NEG-005 | Empty form submission shows username error first | Medium | Negative |

### 3.2 Inventory & Sorting

| ID | Title | Priority | Type |
|---|---|---|---|
| TC-005 | Inventory page shows 6 products | High | Positive |
| TC-006 | Sort products A → Z | High | Positive |
| TC-007 | Sort products Z → A | High | Positive |
| TC-008 | Sort products price low → high | High | Positive |
| TC-009 | Sort products price high → low | High | Positive |
| TC-010 | Navigate to product detail page | Medium | Positive |

### 3.3 Shopping Cart

| ID | Title | Priority | Type |
|---|---|---|---|
| TC-011 | Add single item to cart updates badge | High | Positive |
| TC-012 | Add multiple items to cart | High | Positive |
| TC-013 | Remove item from inventory page | High | Positive |
| TC-014 | Cart page shows correct items | High | Positive |
| TC-015 | Remove item from cart page | High | Positive |
| TC-016 | Continue shopping returns to inventory | Medium | Positive |

### 3.4 Checkout

| ID | Title | Priority | Type |
|---|---|---|---|
| TC-017 | Complete checkout with valid information | High | Positive |
| TC-018 | Checkout overview shows correct pricing | High | Positive |
| TC-019 | Cancel checkout returns to cart | Medium | Positive |
| NEG-006 | Checkout with empty first name shows error | High | Negative |
| NEG-007 | Checkout with empty last name shows error | High | Negative |
| NEG-008 | Checkout with empty postal code shows error | High | Negative |

### 3.5 Unauthorized Access

| ID | Title | Priority | Type |
|---|---|---|---|
| NEG-009 | Direct access to inventory without login redirects | High | Negative |
| NEG-010 | Direct access to cart without login redirects | High | Negative |

### 3.6 API Tests (reqres.in)

| ID | Title | Priority | Type |
|---|---|---|---|
| API-001 | GET /users returns paginated user list | High | API |
| API-002 | GET /users/:id returns single user | High | API |
| API-003 | GET /users/:id returns 404 for non-existent user | High | API |
| API-004 | POST /users creates a new user | High | API |
| API-005 | POST /register with valid data returns token | High | API |
| API-006 | POST /login with valid credentials returns token | High | API |
| API-007 | PUT /users/:id updates user completely | Medium | API |
| API-008 | PATCH /users/:id partially updates user | Medium | API |
| API-009 | DELETE /users/:id returns 204 | Medium | API |
| API-010 | Response has correct Content-Type header | Low | API |
| API-011 | GET /users page 2 returns different data than page 1 | Medium | API |
| API-NEG-001 | POST /register without password returns 400 | High | API Negative |
| API-NEG-002 | POST /login without password returns 400 | High | API Negative |
| API-NEG-003 | GET /users with invalid page returns empty data | Medium | API Negative |

---

## 4. Edge Cases

1. **Concurrent cart modifications** — Adding the same item multiple times (SauceDemo only allows one of each)
2. **Sort stability** — Products with the same price should maintain relative order
3. **Empty cart checkout** — Navigating to checkout with empty cart
4. **Direct URL access** — Bypassing UI flow by manually entering URLs while unauthenticated
5. **Session persistence** — Cart contents surviving a page refresh
6. **Special characters in form fields** — Postal code with letters, names with special chars
7. **API rate limiting** — reqres.in has a simulated delay feature (page=0 query)
8. **Non-existent resource** — API 404 for invalid user IDs (e.g., 9999)
9. **Partial update vs full update** — PATCH vs PUT behaving differently
10. **Password masking** — Password field should be of type `password` (not visible)

---

## 5. Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| SauceDemo site downtime | High | Low | Add retry logic; run against backup mirror |
| reqres.in rate limiting | Medium | Medium | Use test fixtures / mock server for CI |
| Flaky async operations | Medium | Medium | Use `waitFor` assertions, avoid hard waits |
| Stale DOM after cart update | Medium | Medium | Re-fetch locators after mutations |
| `problem_user` broken images | Low | High | Explicitly out-of-scope for this suite |
| CI environment differences | Medium | Low | Lock Playwright + browser versions in CI |

---

## 6. Test Execution Strategy

- **Local:** `npm test` for full suite, `npm run test:ui` / `test:api` for targeted runs
- **CI:** GitHub Actions on every push/PR with 2 parallel shards
- **Retries:** 1 retry locally, 2 retries on CI
- **Reporting:** HTML report + JSON results + trace viewer on failure

---

## 7. Pass / Fail Criteria

- **Pass:** All high-priority tests green; < 5% flakiness rate over 3 consecutive runs
- **Fail:** Any high-priority test consistently fails; critical user flows broken
