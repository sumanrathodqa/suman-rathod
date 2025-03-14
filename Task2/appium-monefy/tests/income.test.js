import { getDriver, closeDriver } from "../utils/driver.js";
import TransactionPage from "../pages/TransactionPage.js";
import HomePage from "../pages/HomePage.js";
import { expect } from "chai";
import { allure } from "allure-mocha/runtime";


describe("Transaction Tests - Add income", function () {
  let driver;
  let transactionPage;
  let homePage;
  this.timeout(60000); // Increase timeout to 60 seconds

  before(async function () {
    driver = await getDriver();
    transactionPage = new TransactionPage(driver);
    homePage = new HomePage(driver);
  });

  after(async function () {
    if (driver) {
      await closeDriver(driver);
    }
  });

  beforeEach(async function () {
    console.log("Restarting app before test...");
    await driver.terminateApp("com.monefy.app.lite"); // Close app
    await driver.activateApp("com.monefy.app.lite"); // Open app fresh
    await driver.pause(3000); 
    await homePage.closePaymentOfferIfPresent();
    await driver.pause(2000); 
  });

  it("Should add an Income amount and select 'Deposits' category", async function () {
    allure.feature("Income Transaction");
    allure.story("User adds an income amount and verifies balance");
    allure.severity("critical");

    console.log(
      "Starting test: Adding income amount and selecting 'Deposits' category"
    );

    // Get initial balance
    await driver.pause(2000); 
    const balanceBefore = await homePage.getBalance();
    console.log(`Balance before adding income: ${balanceBefore}`);

    // Step 1: Navigate to expense page
    await homePage.clickAddIncomeButton();
    console.log("Navigating to income page");
    await driver.pause(2000); 

    // Step 2: Add amount (10) and navigate to category selection
    await transactionPage.addIncomeAmount();
    console.log("Added amount and Navigating to income categories page");

    // Step 3: Select 'Deposits' category
    await transactionPage.addTransactionCategory("Deposits");
    console.log("Selected 'Deposits' category successfully");

    // Get updated balance
    const balanceAfter = await homePage.getBalance();


    // Step 4: Validate that balance increased by 100
    expect(balanceAfter).to.equal(balanceBefore + 100);
    console.log(`Balance before adding income: ${balanceBefore}`);
    console.log(`Balance after adding income: ${balanceAfter}`);
    console.log("Balance correctly increased by 100 after adding income.");
  });
});
