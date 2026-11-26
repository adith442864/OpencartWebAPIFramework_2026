
import { test, expect } from '../src/fixtures/pagefixtures.js';


test.beforeEach(async ({ loginPage, homePage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
});


test('home page title test', async ({ homePage }) => {
  const pageTitle = await homePage.getPageTitle();
  console.log(`Home page title is: ${pageTitle}`);
  expect(pageTitle).toBe('My Account');

});


test('logout link exists test', async ({ homePage }) => {
  const isLogoutLinkVisible = await homePage.isLogoutLinkExist();
  expect(isLogoutLinkVisible).toBeTruthy();

});

test('home page headers test', async ({ homePage }) => { 
  const headers = await homePage.getHomePageHeaders();
  console.log(`Home page headers are: ${headers}`);
  expect.soft(headers).toHaveLength(4);
  expect.soft(headers).toEqual(
    ['My Account', 
    'My Orders', 
    'My Affiliate Account', 
    'Newsletter']);
});