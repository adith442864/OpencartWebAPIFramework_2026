
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { HomePage } from '../src/pages/HomePage.js';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  homePage = new HomePage(page);
});


test('login page title test', async ({ }) => {
  const pageTitle = await loginPage.goToLoginPage();
  console.log(`Login page title is: ${pageTitle}`);
  expect(pageTitle).toBe('Account Login');

});

test('forgot password link test', async ({  }) => {
  expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('verify login test', async ({  }) => {
  await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
  //one expect is pending.
  expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
  expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

});