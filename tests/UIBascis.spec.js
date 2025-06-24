const {test, expect} = require('@playwright/test')

test('Page fixture', async({page})=>{
    await page.goto("https:\\google.com");
    await expect(page).toHaveTitle("Google")
})

test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle'); This will not  work for old slow machines
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })