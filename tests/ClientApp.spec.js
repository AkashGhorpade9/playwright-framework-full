const {test, expect} = require('@playwright/test')

test('Page fixture', async({page})=>{
    await page.goto("https:\\google.com");
    await expect(page).toHaveTitle("Google")
})

test('Browser Context - validating error login', async({page})=>{
  
})

test.only('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle'); This will not  work for old slow machines
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 

    const count = await products.count();

    for (let i=0; i < count ; i++){
      if (await products.nth(i).locator("b").textContent() === productName){
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }
    // await page.pause()

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const isProductAddedToCart = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect (isProductAddedToCart).toBeTruthy();
    
    await page.locator("button:has-text('Checkout')").click();
    await page.locator(".details__user [type='text']").first().waitFor();

    await page.locator("[placeholder='Select Country']").pressSequentially("india");
    const dropDown = page.locator(".ta-results").first();
    await dropDown.waitFor();

    const optionCount = dropDown.locator("button").count();
    let text;
    for(let i=0; i < optionCount; i++){
      text = await dropDown.locator("button").textContent();
      if(text === " India"){
        await dropDown.locator("button").nth(i).click();
      }
    } 
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    expect(await page.locator(".hero-primary").textContent()).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
 
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
 })