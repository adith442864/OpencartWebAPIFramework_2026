

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  

  //private Locators:
  private readonly logoutLink: Locator;
  private readonly headers:Locator;
  private readonly search: Locator;
  private readonly searchIcon: Locator;
 

  //2. const..of the class: init the locators
  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.headers = page.getByRole('heading',{level: 2});
    this.search = page.getByRole('textbox', { name: 'Search' });
    this.searchIcon = page.locator('div#search button');
  }

  //3. Methods to interact with the page elements

  async getHomePageTitle(): Promise<string> {
  return this.page.title();
  }

  async isLogoutLinkExist(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageHeaders(): Promise<string[]> {
  return await this.headers.allInnerTexts();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    await this.search.waitFor({ state: 'visible' });
    return await this.search.isVisible();
  }

  async doSearch(searchKey:string):Promise<void> {
    console.log(`Searching for: ${searchKey}`);
    await this.search.fill(searchKey);
    await this.searchIcon.click();
  }


}