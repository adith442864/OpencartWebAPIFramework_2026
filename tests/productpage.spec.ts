
import { test, expect } from '../src/fixtures/pagefixtures';
import { JsonHelper } from '../src/utils/JsonHelper';

//schema of the product test data stored in data/productinfo.json
type ProductData = {
  searchkey: string;
  productname: string;
  imagecount: number;
  expectedInfo: Record<string, string | number>;
};

//data provider: search key, product name, image count and expected product info
const search = JsonHelper.readJsonAs<ProductData[]>('data/productinfo.json');


test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
 
});

test('verify product images count', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  const imgCount = await productInfoPage.getProductImagesCount();
  console.log('total images:', imgCount);
  expect(imgCount).toBe(4);
});


test('verify product information', async ({ homePage, searchResultsPage, productInfoPage }) => {
  await homePage.doSearch('macbook');
  await searchResultsPage.selectProduct('MacBook Pro');
  const actualProductInfoMap = await productInfoPage.getProductInfo();
  console.log('Actual Product Info:', actualProductInfoMap);
  //Assertions
  expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
  expect.soft(actualProductInfoMap.get('ProductImagesCount')).toBe(4);
  expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
  expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
  expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
  expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
   expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
   expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

});

//can you covert the above tests to use the data provider 'search' array
for (const product of search) {
  test(`verify product images count for ${product.productname}`, async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch(product.searchkey);
    await searchResultsPage.selectProduct(product.productname);
    const imgCount = await productInfoPage.getProductImagesCount();
    console.log('total images:', imgCount);
    expect(imgCount).toBe(product.imagecount);
  });
}


for (const product of search) {
  test(`verify product information for ${product.productname}`, async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch(product.searchkey);
    await searchResultsPage.selectProduct(product.productname);
    const actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Info:', actualProductInfoMap);
    //Assertions: dynamically verify every expected key/value for this product
    for (const [key, expectedValue] of Object.entries(product.expectedInfo)) {
      expect.soft(actualProductInfoMap.get(key), `product info mismatch for '${key}'`).toBe(expectedValue);
    }
  });
}
