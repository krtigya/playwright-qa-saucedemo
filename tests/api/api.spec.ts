import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.API_BASE_URL ?? 'https://reqres.in/api';
const API_KEY = process.env.REQRES_API_KEY ?? '';


const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

test.describe('API Tests — User Management (reqres.in)', () => {


  test('API-001: GET /users returns paginated user list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=1`, { headers });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('page', 1);
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

  
    const user = body.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
  });

  test('API-002: GET /users/:id returns single user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`, { headers });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
    expect(body.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('API-003: GET /users/:id returns 404 for non-existent user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/9999`, { headers });
    expect(response.status()).toBe(404);
  });

  

  test('API-004: POST /users creates a new user', async ({ request }) => {
    const newUser = { name: 'Jane QA', job: 'Automation Engineer' };

    const response = await request.post(`${BASE_URL}/users`, {
      headers,
      data: newUser,
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body).toHaveProperty('name', newUser.name);
    expect(body).toHaveProperty('job', newUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('API-005: POST /register with valid data returns token', async ({ request }) => {
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };

    const response = await request.post(`${BASE_URL}/register`, {
      headers,
      data: credentials,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('API-006: POST /login with valid credentials returns token', async ({ request }) => {
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };

    const response = await request.post(`${BASE_URL}/login`, {
      headers,
      data: credentials,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  

  test('API-007: PUT /users/:id updates user completely', async ({ request }) => {
    const updatedUser = { name: 'Updated Name', job: 'Senior QA' };

    const response = await request.put(`${BASE_URL}/users/2`, {
      headers,
      data: updatedUser,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('name', updatedUser.name);
    expect(body).toHaveProperty('job', updatedUser.job);
    expect(body).toHaveProperty('updatedAt');
  });

  test('API-008: PATCH /users/:id partially updates user', async ({ request }) => {
    const partialUpdate = { job: 'Lead Automation Engineer' };

    const response = await request.patch(`${BASE_URL}/users/2`, {
      headers,
      data: partialUpdate,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('job', partialUpdate.job);
    expect(body).toHaveProperty('updatedAt');
  });

  test('API-009: DELETE /users/:id returns 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`, { headers });
    expect(response.status()).toBe(204);
  });

  

  test('API-NEG-001: POST /register without password returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      headers,
      data: { email: 'sydney@fife' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toContain('Missing password');
  });

  test('API-NEG-002: POST /login without password returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      headers,
      data: { email: 'peter@klaven' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toContain('Missing password');
  });

  test('API-NEG-003: GET /users with invalid page returns empty data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=999`, { headers });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(0);
  });

  

  test('API-010: Response has correct Content-Type header', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, { headers });
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  

  test('API-011: GET /users page 2 returns different data than page 1', async ({ request }) => {
    const res1 = await request.get(`${BASE_URL}/users?page=1`, { headers });
    const res2 = await request.get(`${BASE_URL}/users?page=2`, { headers });

    expect(res1.status()).toBe(200);
    expect(res2.status()).toBe(200);

    const page1 = await res1.json();
    const page2 = await res2.json();

    expect(page1.page).toBe(1);
    expect(page2.page).toBe(2);

    
    const page1Ids = page1.data.map((u: { id: number }) => u.id);
    const page2Ids = page2.data.map((u: { id: number }) => u.id);
    const overlap = page1Ids.filter((id: number) => page2Ids.includes(id));
    expect(overlap.length).toBe(0);
  });

});
