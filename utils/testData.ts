import * as dotenv from 'dotenv';
dotenv.config();

export const TestUsers = {
  standard: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USER ?? 'locked_out_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  problem: {
    username: process.env.PROBLEM_USER ?? 'problem_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  performance: {
    username: process.env.PERF_USER ?? 'performance_glitch_user',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  invalid: {
    username: process.env.INVALID_USER ?? 'invalid_user',
    password: process.env.INVALID_PASSWORD ?? 'wrong_password',
  },
  emptyUsername: {
    username: '',
    password: process.env.PASSWORD ?? 'secret_sauce',
  },
  emptyPassword: {
    username: process.env.STANDARD_USER ?? 'standard_user',
    password: '',
  },
};

export const CheckoutData = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  emptyFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  },
  emptyLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  },
  emptyPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
};

export const ApiEndpoints = {
  baseUrl: process.env.API_BASE_URL ?? 'https://reqres.in/api',
  users: '/users',
  login: '/login',
  register: '/register',
};

export const ErrorMessages = {
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials:
    "Epic sadface: Username and password do not match any user in this service",
  emptyUsername: 'Epic sadface: Username is required',
  emptyPassword: 'Epic sadface: Password is required',
  emptyFirstName: 'Error: First Name is required',
  emptyLastName: 'Error: Last Name is required',
  emptyPostalCode: 'Error: Postal Code is required',
};

export const Products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redShirt: 'Test.allTheThings() T-Shirt (Red)',
};
