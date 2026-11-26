

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {

  //data provider for product search key and results count
  private readonly searchData = [
    { searchkey: 'macbook', resultscount: 3 },
    { searchkey: 'samsung', resultscount: 2 },
    { searchkey: 'imac', resultscount: 1 },
    {searchkey: 'canon', resultscount: 1},
    {searchkey: 'Dummy', resultscount: 0},

];

  

  //private Locators:

  private readonly searchResults: Locator;

 

  //2. const..of the class: init the locators
  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator('div.product-layout');
  }

  //3. Methods to interact with the page elements
  async getProductSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async selectProduct(productName: string): Promise<void> {
    const product = this.page.getByRole('link', { name: productName,exact: true });
    await product.first().click();
    //confirm navigation to the product page before page objects start reading it
    await this.page.waitForURL(/route=product\/product/);
  }


}