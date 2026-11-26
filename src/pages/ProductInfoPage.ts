
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductInfoPage extends BasePage {
  

  //private Locators:
  private readonly header:Locator;
  private readonly productImages: Locator;
  private readonly productMetaData:Locator;
  private readonly productPricing: Locator;
  private map:Map<string, string | Number>;

 

  //2. const..of the class: init the locators
  constructor(page: Page) {
    super(page);
    this.header = page.getByRole('heading', { level: 1 });
    this.productImages = page.locator('div#content img');
    this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
    this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
    this.map = new Map<string, string | Number>();
  }

  //3. Methods to interact with the page elements
  async getProductInfo(): Promise<Map<string, string | Number>> {
    this.map.set('ProductHeader', await this.getProductHeader());
    this.map.set('ProductImagesCount', await this.getProductImagesCount());
    await this.getProductMetaData();
    await this.getProductPricingData();
    return this.map;
  }

  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    //await this.page.waitForTimeout(5000);
    await this.productImages.first().waitFor({ state: 'visible' });
    const count = await this.productImages.count();
    console.log(`Product count: ${count}`);
    return count;
 
  }

  // Brand: Apple
  // Product Code: Product 18
  // Reward Points: 800
  // Availability: Out Of Stock
  
 private async getProductMetaData(): Promise<void> {
    const metaData = await this.productMetaData.allInnerTexts();
    for(let data of metaData) {
      const meta = data.split(':');
      const metaKey = meta[0].trim();
      const metaValue = meta[1].trim();
      this.map.set(metaKey, metaValue);
    }
  }

  // $2,000.00
  // Ex Tax: $2,000.00
    private async getProductPricingData(): Promise<void> {
    const priceData = await this.productPricing.allInnerTexts();
    const productPrice = priceData[0].trim(); 
    const exTaxPrice = priceData[1].split(':')[1].trim();
    this.map.set('ProductPrice', productPrice);
    this.map.set('ExTaxPrice', exTaxPrice);

    
  }


}
