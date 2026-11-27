
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
 
});

const productData = CsvHelper.readCsv('data/product.csv');

for(const row of productData) {
  test(`verify search with product: ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage }) => {
    await homePage.doSearch(row.searchkey);
    const resultsCount = await searchResultsPage.getProductSearchResultsCount();
    expect(resultsCount).toBe(Number(row.resultcount));
  });
}


for(const row of productData) {
  test(`verify user is able to land on the product page with search key: ${row.searchkey} - ${row.productname}`, async ({ homePage, searchResultsPage, page}) => {
    await homePage.doSearch(row.searchkey);
    const resultsCount = await searchResultsPage.getProductSearchResultsCount();
    await searchResultsPage.selectProduct(row.productname);
    // some demo products (e.g. Canon EOS 5D) have a custom SEO page title, so assert on the product heading
    await expect(page.getByRole('heading', { level: 1, name: row.productname })).toBeVisible();
  });
}
